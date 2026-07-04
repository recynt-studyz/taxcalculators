'use client'

import { useState, useEffect } from 'react'
import { BRACKETS, STANDARD_DEDUCTIONS, SENIOR_EXTRA, STATES, BRACKET_COLORS, FilingStatus } from '@/lib/taxData'
import { calcFederalTax, getMarginalRate, getBracketBreakdown, calcChildTaxCredit, calcEITC } from '@/lib/taxCalc'

const fmt = (v: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(v)
const fmtPct = (v: number) => `${v.toFixed(1)}%`

const STORAGE_KEY = 'tc-income'

const STATUS_OPTIONS: { value: FilingStatus; label: string }[] = [
  { value: 'single', label: 'Single' },
  { value: 'mfj', label: 'Married Jointly' },
  { value: 'mfs', label: 'Married Separately' },
  { value: 'hoh', label: 'Head of Household' },
]

export default function IncomeTaxCalculator() {
  const [filingStatus, setFilingStatus] = useState<FilingStatus>('single')
  const [grossIncome, setGrossIncome] = useState('75000')
  const [contrib401k, setContrib401k] = useState('0')
  const [iraContrib, setIraContrib] = useState('0')
  const [studentLoan, setStudentLoan] = useState('0')
  const [hsaContrib, setHsaContrib] = useState('0')
  const [useItemized, setUseItemized] = useState(false)
  const [itemizedAmt, setItemizedAmt] = useState('0')
  const [isOver65, setIsOver65] = useState(false)
  const [dependents, setDependents] = useState(0)
  const [stateCode, setStateCode] = useState('')
  const [capitalGains, setCapitalGains] = useState('0')
  const [dividends, setDividends] = useState('0')

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        const p = JSON.parse(saved)
        if (p.filingStatus) setFilingStatus(p.filingStatus)
        if (p.grossIncome) setGrossIncome(p.grossIncome)
        if (p.contrib401k) setContrib401k(p.contrib401k)
        if (p.iraContrib) setIraContrib(p.iraContrib)
        if (p.studentLoan) setStudentLoan(p.studentLoan)
        if (p.hsaContrib) setHsaContrib(p.hsaContrib)
        if (p.useItemized !== undefined) setUseItemized(p.useItemized)
        if (p.itemizedAmt) setItemizedAmt(p.itemizedAmt)
        if (p.isOver65 !== undefined) setIsOver65(p.isOver65)
        if (p.dependents !== undefined) setDependents(p.dependents)
        if (p.stateCode) setStateCode(p.stateCode)
        if (p.capitalGains) setCapitalGains(p.capitalGains)
        if (p.dividends) setDividends(p.dividends)
      }
    } catch { /* ignore */ }
  }, [])

  const save = (updates: Record<string, unknown>) => {
    try {
      const cur = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...cur, ...updates }))
    } catch { /* ignore */ }
  }

  // Core calculations
  const income = parseFloat(grossIncome) || 0
  const k401 = Math.min(parseFloat(contrib401k) || 0, 23500)
  const ira = Math.min(parseFloat(iraContrib) || 0, 7000)
  const sloan = Math.min(parseFloat(studentLoan) || 0, 2500)
  const hsa = parseFloat(hsaContrib) || 0
  const cg = parseFloat(capitalGains) || 0
  const div = parseFloat(dividends) || 0

  const aboveLineDeductions = k401 + ira + sloan + hsa
  const grossTotal = income + cg + div
  const agi = Math.max(0, grossTotal - aboveLineDeductions)

  const baseDed = STANDARD_DEDUCTIONS[filingStatus]
  const seniorExtra = isOver65 ? SENIOR_EXTRA[filingStatus] : 0
  const stdDed = baseDed + seniorExtra
  const itemized = parseFloat(itemizedAmt) || 0
  const deduction = useItemized ? Math.max(0, itemized) : stdDed

  const taxableIncome = Math.max(0, agi - deduction)
  const federalTaxRaw = calcFederalTax(taxableIncome, filingStatus)
  const ctc = calcChildTaxCredit(dependents, agi, filingStatus)
  const eitc = income < 65000 ? calcEITC(income, dependents, filingStatus) : 0
  const totalCredits = ctc + eitc
  const federalTax = Math.max(0, federalTaxRaw - totalCredits)

  const stateInfo = stateCode ? STATES[stateCode] : null
  const stateTax = stateInfo ? income * stateInfo.rate : 0
  const totalTax = federalTax + stateTax

  const effectiveRate = grossTotal > 0 ? (federalTax / grossTotal) * 100 : 0
  const totalEffectiveRate = grossTotal > 0 ? (totalTax / grossTotal) * 100 : 0
  const marginalRate = getMarginalRate(taxableIncome, filingStatus)

  const bracketBreakdown = getBracketBreakdown(taxableIncome, filingStatus)
  const totalBracketIncome = bracketBreakdown.reduce((s, b) => s + b.amount, 0)

  const inputCls =
    'w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-[#1e293b] text-gray-900 dark:text-[#e2e8f0] text-sm focus:outline-none focus:ring-2 focus:ring-[#1e3a5f] dark:focus:ring-blue-500'
  const labelCls = 'block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'
  const smallInputCls =
    'w-full pl-6 pr-2 py-1.5 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-[#1e293b] text-gray-900 dark:text-[#e2e8f0] text-sm focus:outline-none focus:ring-1 focus:ring-[#1e3a5f]'

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* === INPUTS === */}
        <div className="space-y-4">
          {/* Filing Status */}
          <div>
            <label className={labelCls}>Filing Status</label>
            <div className="grid grid-cols-2 gap-2">
              {STATUS_OPTIONS.map(opt => (
                <button
                  key={opt.value}
                  onClick={() => { setFilingStatus(opt.value); save({ filingStatus: opt.value }) }}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    filingStatus === opt.value
                      ? 'bg-[#1e3a5f] text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Gross Income */}
          <div>
            <label className={labelCls}>Gross Annual Income (W-2 wages)</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
              <input
                type="number"
                value={grossIncome}
                onChange={e => { setGrossIncome(e.target.value); save({ grossIncome: e.target.value }) }}
                className={`${inputCls} pl-7`}
                min="0"
                placeholder="75000"
              />
            </div>
          </div>

          {/* Above-the-line deductions */}
          <div className="rounded-xl border border-gray-100 dark:border-gray-700 p-4 space-y-3">
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              Above-the-Line Deductions (reduce AGI)
            </p>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: '401(k) Contribution', value: contrib401k, setter: setContrib401k, key: 'contrib401k' },
                { label: 'IRA Contribution', value: iraContrib, setter: setIraContrib, key: 'iraContrib' },
                { label: 'Student Loan Interest', value: studentLoan, setter: setStudentLoan, key: 'studentLoan' },
                { label: 'HSA Contribution', value: hsaContrib, setter: setHsaContrib, key: 'hsaContrib' },
              ].map(({ label, value, setter, key }) => (
                <div key={key}>
                  <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">{label}</label>
                  <div className="relative">
                    <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400 text-xs">$</span>
                    <input
                      type="number"
                      value={value}
                      onChange={e => { setter(e.target.value); save({ [key]: e.target.value }) }}
                      className={smallInputCls}
                      min="0"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Deduction type */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Deduction</label>
              <div className="flex rounded-lg overflow-hidden border border-gray-200 dark:border-gray-600 text-sm">
                <button
                  onClick={() => { setUseItemized(false); save({ useItemized: false }) }}
                  className={`px-3 py-1.5 transition-colors ${
                    !useItemized ? 'bg-[#1e3a5f] text-white' : 'bg-white dark:bg-[#1e293b] text-gray-700 dark:text-gray-300 hover:bg-gray-50'
                  }`}
                >
                  Standard
                </button>
                <button
                  onClick={() => { setUseItemized(true); save({ useItemized: true }) }}
                  className={`px-3 py-1.5 transition-colors ${
                    useItemized ? 'bg-[#1e3a5f] text-white' : 'bg-white dark:bg-[#1e293b] text-gray-700 dark:text-gray-300 hover:bg-gray-50'
                  }`}
                >
                  Itemized
                </button>
              </div>
            </div>
            {useItemized ? (
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
                <input
                  type="number"
                  value={itemizedAmt}
                  onChange={e => { setItemizedAmt(e.target.value); save({ itemizedAmt: e.target.value }) }}
                  className={`${inputCls} pl-7`}
                  min="0"
                  placeholder="Total itemized deductions"
                />
              </div>
            ) : (
              <div className="px-3 py-2 rounded-lg border border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-[#0f172a] text-gray-700 dark:text-gray-300 text-sm">
                {isOver65 ? (
                  <>Standard: {fmt(baseDed)} + Age 65+ bonus: {fmt(seniorExtra)} = {fmt(stdDed)}</>
                ) : (
                  <>Standard deduction: {fmt(stdDed)}</>
                )}
              </div>
            )}
          </div>

          {/* Age 65+ */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="over65"
              checked={isOver65}
              onChange={e => { setIsOver65(e.target.checked); save({ isOver65: e.target.checked }) }}
              className="rounded border-gray-300 dark:border-gray-600 w-4 h-4 accent-[#1e3a5f]"
            />
            <label htmlFor="over65" className="text-sm text-gray-700 dark:text-gray-300 cursor-pointer">
              Age 65+ (additional standard deduction + OBBBA senior bonus)
            </label>
          </div>

          {/* Dependents */}
          <div>
            <label className={labelCls}>Children / Qualifying Dependents</label>
            <div className="flex items-center gap-3">
              <button
                onClick={() => { const v = Math.max(0, dependents - 1); setDependents(v); save({ dependents: v }) }}
                className="w-9 h-9 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-bold text-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition"
              >
                −
              </button>
              <span className="w-8 text-center font-bold text-lg text-gray-800 dark:text-[#e2e8f0]">{dependents}</span>
              <button
                onClick={() => { const v = Math.min(10, dependents + 1); setDependents(v); save({ dependents: v }) }}
                className="w-9 h-9 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-bold text-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition"
              >
                +
              </button>
              {dependents > 0 && (
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  Child Tax Credit: {fmt(ctc)}
                </span>
              )}
            </div>
          </div>

          {/* State */}
          <div>
            <label className={labelCls}>State (adds state income tax estimate)</label>
            <select
              value={stateCode}
              onChange={e => { setStateCode(e.target.value); save({ stateCode: e.target.value }) }}
              className={inputCls}
            >
              <option value="">No state / Not selected</option>
              {Object.entries(STATES)
                .sort((a, b) => a[1].name.localeCompare(b[1].name))
                .map(([code, info]) => (
                  <option key={code} value={code}>
                    {info.name}
                    {!info.hasIncomeTax ? ' — No income tax' : ` — ${(info.rate * 100).toFixed(2)}% top rate`}
                  </option>
                ))}
            </select>
          </div>

          {/* Other income */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                Capital Gains / Other
              </label>
              <div className="relative">
                <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400 text-xs">$</span>
                <input
                  type="number"
                  value={capitalGains}
                  onChange={e => { setCapitalGains(e.target.value); save({ capitalGains: e.target.value }) }}
                  className={smallInputCls}
                  min="0"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Dividends</label>
              <div className="relative">
                <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400 text-xs">$</span>
                <input
                  type="number"
                  value={dividends}
                  onChange={e => { setDividends(e.target.value); save({ dividends: e.target.value }) }}
                  className={smallInputCls}
                  min="0"
                />
              </div>
            </div>
          </div>
        </div>

        {/* === RESULTS === */}
        <div className="space-y-4">
          {/* Main result */}
          <div className="rounded-xl bg-[#1e3a5f]/10 dark:bg-[#1e3a5f]/20 border border-[#1e3a5f]/30 p-5">
            <p className="text-sm text-[#1e3a5f] dark:text-blue-300 font-medium mb-1">Federal Tax Owed</p>
            <p className="text-4xl font-bold text-[#1e3a5f] dark:text-blue-200">{fmt(federalTax)}</p>
            {stateInfo && (
              <div className="mt-3 pt-3 border-t border-[#1e3a5f]/20 space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="text-[#1e3a5f]/80 dark:text-blue-300">{stateInfo.name} State Tax (est.)</span>
                  <span className="font-semibold text-[#1e3a5f] dark:text-blue-200">{fmt(stateTax)}</span>
                </div>
                <div className="flex justify-between text-sm border-t border-[#1e3a5f]/20 pt-1">
                  <span className="font-bold text-[#1e3a5f] dark:text-blue-300">Total Tax</span>
                  <span className="font-bold text-[#1e3a5f] dark:text-blue-200">{fmt(totalTax)}</span>
                </div>
                <p className="text-xs text-[#1e3a5f]/60 dark:text-blue-400">
                  Combined effective rate: {fmtPct(totalEffectiveRate)}
                </p>
              </div>
            )}
          </div>

          {/* Detailed breakdown */}
          <div className="rounded-xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-[#1e293b] p-4">
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Tax Calculation Breakdown</p>
            <div className="space-y-2">
              {[
                { label: 'Gross Income', val: fmt(grossTotal) },
                { label: 'Above-the-Line Deductions', val: aboveLineDeductions > 0 ? `−${fmt(aboveLineDeductions)}` : '—' },
                { label: 'Adjusted Gross Income (AGI)', val: fmt(agi), bold: true },
                { label: useItemized ? 'Itemized Deduction' : 'Standard Deduction', val: `−${fmt(deduction)}` },
                { label: 'Taxable Income', val: fmt(taxableIncome), bold: true },
                { label: 'Federal Tax (before credits)', val: fmt(federalTaxRaw) },
                ...(ctc > 0 ? [{ label: `Child Tax Credit (${dependents}×$2,200)`, val: `−${fmt(ctc)}` }] : []),
                ...(eitc > 0 ? [{ label: 'EITC Estimate', val: `−${fmt(eitc)}` }] : []),
                { label: 'Federal Tax Owed', val: fmt(federalTax), bold: true, highlight: true },
                { label: 'Effective Federal Rate', val: fmtPct(effectiveRate) },
                { label: 'Marginal Rate', val: `${(marginalRate * 100).toFixed(0)}%` },
              ].map(({ label, val, bold, highlight }) => (
                <div
                  key={label}
                  className={`flex justify-between text-sm ${bold ? 'border-t border-gray-100 dark:border-gray-600 pt-2 mt-1' : ''}`}
                >
                  <span className={bold ? 'font-semibold text-gray-800 dark:text-[#e2e8f0]' : 'text-gray-600 dark:text-gray-400'}>
                    {label}
                  </span>
                  <span
                    className={`font-${bold ? 'bold' : 'medium'} ${
                      highlight ? 'text-[#1e3a5f] dark:text-blue-300' : 'text-gray-800 dark:text-[#e2e8f0]'
                    }`}
                  >
                    {val}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Bracket visualization */}
          <div className="rounded-xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-[#1e293b] p-4">
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
              2026 Tax Bracket Breakdown
            </p>
            {bracketBreakdown.length > 0 && totalBracketIncome > 0 ? (
              <>
                <div className="flex h-5 rounded-full overflow-hidden mb-3">
                  {bracketBreakdown.map((b, i) => (
                    <div
                      key={i}
                      style={{
                        width: `${(b.amount / totalBracketIncome) * 100}%`,
                        backgroundColor: BRACKET_COLORS[i],
                      }}
                      title={`${(b.rate * 100).toFixed(0)}%: ${fmt(b.amount)}`}
                    />
                  ))}
                </div>
                <div className="space-y-1.5">
                  {bracketBreakdown.map((b, i) => (
                    <div key={i} className="flex items-center justify-between text-xs text-gray-600 dark:text-gray-400">
                      <div className="flex items-center gap-1.5">
                        <span
                          className="w-3 h-3 rounded-sm inline-block shrink-0"
                          style={{ backgroundColor: BRACKET_COLORS[i] }}
                        />
                        <span>{(b.rate * 100).toFixed(0)}% bracket</span>
                      </div>
                      <div className="flex gap-3 text-right">
                        <span className="text-gray-500">{fmt(b.amount)}</span>
                        <span className="font-medium w-16 text-right">{fmt(b.tax)} tax</span>
                      </div>
                    </div>
                  ))}
                </div>
                <p className="mt-3 text-xs text-gray-500 dark:text-gray-400 italic leading-relaxed">
                  Your marginal rate is {(marginalRate * 100).toFixed(0)}% but your effective rate is only{' '}
                  {fmtPct(effectiveRate)} because the progressive tax system only taxes your last dollars at the
                  highest rate.
                </p>
              </>
            ) : (
              <p className="text-sm text-gray-400 dark:text-gray-500">
                Enter income above to see your 2026 tax bracket breakdown.
              </p>
            )}
          </div>
        </div>
      </div>

      <p className="mt-6 text-xs text-gray-400 dark:text-gray-500 leading-relaxed">
        This calculator provides estimates for educational purposes only based on 2026 federal tax law (One Big
        Beautiful Bill Act). Individual tax situations vary. Consult a licensed tax professional or CPA for
        personalized tax advice. State tax uses simplified flat rate — actual state tax may differ. See{' '}
        <a href="https://www.irs.gov" className="underline" target="_blank" rel="noopener noreferrer">IRS.gov</a> for
        official tax information.
      </p>
    </div>
  )
}
