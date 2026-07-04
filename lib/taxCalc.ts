import { BRACKETS, LTCG_BRACKETS, NIIT_THRESHOLD, FilingStatus } from './taxData'

export function calcFederalTax(taxableIncome: number, filingStatus: FilingStatus): number {
  if (taxableIncome <= 0) return 0
  const brackets = BRACKETS[filingStatus]
  let tax = 0
  for (const b of brackets) {
    if (taxableIncome <= b.min) break
    tax += (Math.min(taxableIncome, b.max) - b.min) * b.rate
  }
  return tax
}

export function getMarginalRate(taxableIncome: number, filingStatus: FilingStatus): number {
  if (taxableIncome <= 0) return 0.10
  const brackets = BRACKETS[filingStatus]
  for (let i = brackets.length - 1; i >= 0; i--) {
    if (taxableIncome > brackets[i].min) return brackets[i].rate
  }
  return 0.10
}

export interface BracketLine {
  rate: number
  min: number
  max: number
  amount: number
  tax: number
}

export function getBracketBreakdown(taxableIncome: number, filingStatus: FilingStatus): BracketLine[] {
  if (taxableIncome <= 0) return []
  const brackets = BRACKETS[filingStatus]
  const result: BracketLine[] = []
  for (const b of brackets) {
    if (taxableIncome <= b.min) break
    const amount = Math.min(taxableIncome, b.max) - b.min
    result.push({ rate: b.rate, min: b.min, max: b.max, amount, tax: amount * b.rate })
  }
  return result
}

// 2026 Child Tax Credit: $2,200 per child, phases out at $200K single / $400K MFJ
export function calcChildTaxCredit(children: number, agi: number, filingStatus: FilingStatus): number {
  if (children <= 0) return 0
  const threshold = filingStatus === 'mfj' ? 400000 : 200000
  const excess = Math.max(0, agi - threshold)
  const reduction = Math.ceil(excess / 1000) * 50
  return Math.max(0, children * 2200 - reduction)
}

// Simplified EITC estimate for 2026
export function calcEITC(income: number, children: number, filingStatus: FilingStatus): number {
  if (income <= 0) return 0
  const maxCredits = [632, 4213, 6960, 8231]
  const phaseOutMFJ = [22600, 53120, 59478, 63398]
  const phaseOutOther = [18591, 49399, 55768, 59899]
  const limits = filingStatus === 'mfj' ? phaseOutMFJ : phaseOutOther
  const idx = Math.min(children, 3)
  if (income > limits[idx]) return 0
  return maxCredits[idx]
}

// Long-term capital gains tax (stacks on top of ordinary income)
export function calcLTCGTax(
  ordinaryTaxableIncome: number,
  ltcgAmount: number,
  filingStatus: FilingStatus
): number {
  if (ltcgAmount <= 0) return 0
  const brackets = LTCG_BRACKETS[filingStatus]
  let tax = 0
  let remaining = ltcgAmount
  let stackBase = ordinaryTaxableIncome

  for (const b of brackets) {
    if (stackBase >= b.max) continue
    const roomInBracket = b.max - stackBase
    const taxableInBracket = Math.min(remaining, roomInBracket)
    tax += taxableInBracket * b.rate
    remaining -= taxableInBracket
    stackBase = b.max
    if (remaining <= 0) break
  }
  return tax
}

// Net Investment Income Tax (NIIT): 3.8% on investment income above threshold
export function calcNIIT(
  ordinaryIncome: number,
  investmentIncome: number,
  filingStatus: FilingStatus
): number {
  const threshold = NIIT_THRESHOLD[filingStatus]
  if (ordinaryIncome + investmentIncome <= threshold) return 0
  const excess = Math.min(investmentIncome, ordinaryIncome + investmentIncome - threshold)
  return Math.max(0, excess) * 0.038
}

// Self-employment tax
export function calcSETax(netSEIncome: number): { seTax: number; seDeduction: number; netSE: number } {
  const netSE = netSEIncome * 0.9235
  const seTax = netSE * 0.153
  const seDeduction = seTax / 2
  return { seTax, seDeduction, netSE }
}

// Annualize, apply brackets, then divide — simplified paycheck withholding
export function calcFederalWithholding(
  grossPayPerPeriod: number,
  payPeriods: number,
  filingStatus: FilingStatus,
  step3Annual: number,
  preTaxAnnual: number
): number {
  const annualGross = grossPayPerPeriod * payPeriods
  const stdDed = filingStatus === 'mfj' ? 31500 : filingStatus === 'hoh' ? 23625 : 15750
  const taxableAnnual = Math.max(0, annualGross - preTaxAnnual - stdDed)
  const annualTax = Math.max(0, calcFederalTax(taxableAnnual, filingStatus) - step3Annual)
  return annualTax / payPeriods
}
