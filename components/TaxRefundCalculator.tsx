'use client'

import { useState, useEffect } from 'react'
import { STANDARD_DEDUCTIONS, FilingStatus } from '@/lib/taxData'
import { calcFederalTax, calcChildTaxCredit, calcEITC } from '@/lib/taxCalc'

const fmt = (v: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(v)

const STORAGE_KEY = 'tc-taxrefund'

const STATUS_OPTIONS: { value: FilingStatus; label: string }[] = [
  { value: 'single', label: 'Single' },
  { value: 'mfj', label: 'Married Jointly' },
  { value: 'mfs', label: 'Married Separately' },
  { value: 'hoh', label: 'Head of Household' },
]

export default function TaxRefundCalculator() {
  const [filingStatus, setFilingStatus] = useState<FilingStatus>('single')
  const [grossIncome, setGrossIncome] = useState('75000')
  const [federalWithheld, setFederalWithheld] = useState('8000')
  const [useItemized, setUseItemized] = useState(false)
  const [itemizedAmt, setItemizedAmt] = useState('0')
  const [childrenUnder17, setChildrenUnder17] = useState(0)
  const [educationCredit, setEducationCredit] = useState('0')
  const [evCredit, setEvCredit] = useState('0')
  const [energyCredit, setEnergyCredit] = useState('0')
  const [otherCredits, setOtherCredits] = useState('0')

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        const p = JSON.parse(saved)
        if (p.filingStatus) setFilingStatus(p.filingStatus)
        if (p.grossIncome) setGrossIncome(p.grossIncome)
        if (p.federalWithheld) setFederalWithheld(p.federalWithheld)
        if (p.useItemized !== undefined) setUseItemized(p.useItemized)
        if (p.itemizedAmt) setItemizedAmt(p.itemizedAmt)
        if (p.childrenUnder17 !== undefined) setChildrenUnder17(p.childrenUnder17)
        if (p.educationCredit) setEducationCredit(p.educationCredit)
        if (p.evCredit) setEvCredit(p.evCredit)
        if (p.energyCredit) setEnergyCredit(p.energyCredit)
        if (p.otherCredits) setOtherCredits(p.otherCredits)
      }
    } catch { /* ignore */ }
  }, [])

  const save = (updates: Record<string, unknown>) => {
    try {
      const cur = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...cur, ...updates }))
    } catch { /* ignore */ }
  }

  const income = parseFloat(grossIncome) || 0
  const withheld = parseFloat(federalWithheld) || 0
  const stdDed = STANDARD_DEDUCTIONS[filingStatus]
  const itemized = parseFloat(itemizedAmt) || 0
  const deduction = useItemized ? Math.max(0, itemized) : stdDed
  const taxableIncome = Math.max(0, income - deduction)

  const federalTaxRaw = calcFederalTax(taxableIncome, filingStatus)
  const ctc = calcChildTaxCredit(childrenUnder17, income, filingStatus)
  const eitc = income < 65000 ? calcEITC(income, childrenUnder17, filingStatus) : 0
  const eduCredit = parseFloat(educationCredit) || 0
  const evCreditAmt = Math.min(parseFloat(evCredit) || 0, 7500)
  const energyCreditAmt = Math.min(parseFloat(energyCredit) || 0, 3200)
  const otherCreditAmt = parseFloat(otherCredits) || 0

  const totalCredits = ctc + eitc + eduCredit + evCreditAmt + energyCreditAmt + otherCreditAmt
  const taxLiability = Math.max(0, federalTaxRaw - totalCredits)
  const refundOrOwed = withheld - taxLiability

  const inputCls =
    'w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-[#1e293b] text-gray-900 dark:text-[#e2e8f0] text-sm focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]'
  const labelCls = 'block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'
  const smallInputCls = 'w-full pl-6 pr-2 py-1.5 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-[#1e293b] text-sm focus:outline-none focus:ring-1 focus:ring-[#1e3a5f] text-gray-900 dark:text-[#e2e8f0]'

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* INPUTS */}
        <div className="space-y-4">
          <div>
            <label className={labelCls}>Filing Status</label>
            <div className="grid grid-cols-2 gap-2">
              {STATUS_OPTIONS.map(opt => (
                <button key={opt.value} onClick={() => { setFilingStatus(opt.value); save({ filingStatus: opt.value }) }}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${filingStatus === opt.value ? 'bg-[#1e3a5f] text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200'}`}>
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className={labelCls}>Gross Annual Income</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
              <input type="number" value={grossIncome} onChange={e => { setGrossIncome(e.target.value); save({ grossIncome: e.target.value }) }} className={`${inputCls} pl-7`} min="0" />
            </div>
          </div>

          <div>
            <label className={labelCls}>Federal Taxes Withheld (from W-2 Box 2)</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
              <input type="number" value={federalWithheld} onChange={e => { setFederalWithheld(e.target.value); save({ federalWithheld: e.target.value }) }} className={`${inputCls} pl-7`} min="0" />
            </div>
          </div>

          {/* Deduction */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Deduction</label>
              <div className="flex rounded-lg overflow-hidden border border-gray-200 dark:border-gray-600 text-sm">
                <button onClick={() => { setUseItemized(false); save({ useItemized: false }) }} className={`px-3 py-1.5 transition-colors ${!useItemized ? 'bg-[#1e3a5f] text-white' : 'bg-white dark:bg-[#1e293b] text-gray-700 dark:text-gray-300'}`}>Standard</button>
                <button onClick={() => { setUseItemized(true); save({ useItemized: true }) }} className={`px-3 py-1.5 transition-colors ${useItemized ? 'bg-[#1e3a5f] text-white' : 'bg-white dark:bg-[#1e293b] text-gray-700 dark:text-gray-300'}`}>Itemized</button>
              </div>
            </div>
            {useItemized ? (
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
                <input type="number" value={itemizedAmt} onChange={e => { setItemizedAmt(e.target.value); save({ itemizedAmt: e.target.value }) }} className={`${inputCls} pl-7`} min="0" />
              </div>
            ) : (
              <div className="px-3 py-2 rounded-lg border border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-[#0f172a] text-gray-700 dark:text-gray-300 text-sm">
                Standard deduction: {fmt(stdDed)}
              </div>
            )}
          </div>

          {/* Dependents */}
          <div>
            <label className={labelCls}>Children Under 17 (Child Tax Credit)</label>
            <div className="flex items-center gap-3">
              <button onClick={() => { const v = Math.max(0, childrenUnder17 - 1); setChildrenUnder17(v); save({ childrenUnder17: v }) }} className="w-9 h-9 rounded-lg bg-gray-100 dark:bg-gray-700 font-bold text-lg text-gray-700 dark:text-gray-300 hover:bg-gray-200 transition">−</button>
              <span className="w-8 text-center font-bold text-lg text-gray-800 dark:text-[#e2e8f0]">{childrenUnder17}</span>
              <button onClick={() => { const v = childrenUnder17 + 1; setChildrenUnder17(v); save({ childrenUnder17: v }) }} className="w-9 h-9 rounded-lg bg-gray-100 dark:bg-gray-700 font-bold text-lg text-gray-700 dark:text-gray-300 hover:bg-gray-200 transition">+</button>
              {childrenUnder17 > 0 && <span className="text-xs text-gray-500 dark:text-gray-400">Credit: {fmt(ctc)}</span>}
            </div>
          </div>

          {/* Credits */}
          <div className="rounded-xl border border-gray-100 dark:border-gray-700 p-4 space-y-3">
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">Other Tax Credits</p>
            {[
              { label: 'American Opportunity / Lifetime Learning', value: educationCredit, setter: setEducationCredit, key: 'educationCredit', max: 2500 },
              { label: 'EV Credit (max $7,500)', value: evCredit, setter: setEvCredit, key: 'evCredit', max: 7500 },
              { label: 'Energy Credits (max $3,200)', value: energyCredit, setter: setEnergyCredit, key: 'energyCredit', max: 3200 },
              { label: 'Other Credits', value: otherCredits, setter: setOtherCredits, key: 'otherCredits', max: undefined },
            ].map(({ label, value, setter, key }) => (
              <div key={key}>
                <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">{label}</label>
                <div className="relative">
                  <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400 text-xs">$</span>
                  <input type="number" value={value} onChange={e => { setter(e.target.value); save({ [key]: e.target.value }) }} className={smallInputCls} min="0" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RESULTS */}
        <div className="space-y-4">
          <div className={`rounded-xl border p-5 ${refundOrOwed >= 0 ? 'bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-900' : 'bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-900'}`}>
            <p className={`text-sm font-medium mb-1 ${refundOrOwed >= 0 ? 'text-green-800 dark:text-green-300' : 'text-red-800 dark:text-red-300'}`}>
              {refundOrOwed >= 0 ? 'Estimated Refund' : 'Estimated Amount Owed'}
            </p>
            <p className={`text-5xl font-bold ${refundOrOwed >= 0 ? 'text-green-700 dark:text-green-200' : 'text-red-700 dark:text-red-200'}`}>
              {fmt(Math.abs(refundOrOwed))}
            </p>
            <p className="text-xs mt-2 text-gray-500 dark:text-gray-400">
              The average federal tax refund in 2026 is approximately $3,804
            </p>
          </div>

          <div className="rounded-xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-[#1e293b] p-4">
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Refund Calculation Breakdown</p>
            <div className="space-y-2">
              {[
                { label: 'Gross Income', val: fmt(income) },
                { label: useItemized ? 'Itemized Deduction' : 'Standard Deduction', val: `−${fmt(deduction)}` },
                { label: 'Taxable Income', val: fmt(taxableIncome), bold: true },
                { label: 'Tax Liability (before credits)', val: fmt(federalTaxRaw) },
                ...(ctc > 0 ? [{ label: `Child Tax Credit (${childrenUnder17}×$2,200)`, val: `−${fmt(ctc)}` }] : []),
                ...(eitc > 0 ? [{ label: 'EITC Estimate', val: `−${fmt(eitc)}` }] : []),
                ...(eduCredit > 0 ? [{ label: 'Education Credit', val: `−${fmt(eduCredit)}` }] : []),
                ...(evCreditAmt > 0 ? [{ label: 'EV Credit', val: `−${fmt(evCreditAmt)}` }] : []),
                ...(energyCreditAmt > 0 ? [{ label: 'Energy Credit', val: `−${fmt(energyCreditAmt)}` }] : []),
                ...(otherCreditAmt > 0 ? [{ label: 'Other Credits', val: `−${fmt(otherCreditAmt)}` }] : []),
                { label: 'Total Tax Liability', val: fmt(taxLiability), bold: true, highlight: true },
                { label: 'Federal Taxes Withheld', val: `−${fmt(withheld)}` },
                { label: refundOrOwed >= 0 ? 'Estimated Refund' : 'Estimated Owed', val: fmt(Math.abs(refundOrOwed)), bold: true, green: refundOrOwed >= 0 },
              ].map(({ label, val, bold, highlight, green }) => (
                <div key={label} className={`flex justify-between text-sm ${bold ? 'border-t border-gray-100 dark:border-gray-600 pt-2 mt-1' : ''}`}>
                  <span className={bold ? 'font-semibold text-gray-800 dark:text-[#e2e8f0]' : 'text-gray-600 dark:text-gray-400'}>{label}</span>
                  <span className={`font-medium ${highlight ? 'font-bold text-[#1e3a5f] dark:text-blue-300' : green !== undefined ? (green ? 'font-bold text-green-700 dark:text-green-400' : 'font-bold text-red-600 dark:text-red-400') : 'text-gray-800 dark:text-[#e2e8f0]'}`}>{val}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl bg-blue-50 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/50 p-4">
            <p className="text-sm font-semibold text-blue-800 dark:text-blue-300 mb-2">Tax Refund Tips</p>
            <ul className="text-xs text-blue-700 dark:text-blue-400 space-y-1.5 leading-relaxed">
              <li>• File early to receive your refund faster — IRS typically issues refunds within 21 days of e-file</li>
              <li>• Choose direct deposit for the fastest refund delivery</li>
              <li>• Claim all eligible credits — Child Tax Credit, EITC, education credits, and energy credits</li>
              <li>• Contribute to an IRA before April 15 to reduce your 2026 tax liability</li>
            </ul>
          </div>
        </div>
      </div>

      <p className="mt-6 text-xs text-gray-400 dark:text-gray-500 leading-relaxed">
        Tax refund estimates are for educational purposes based on 2026 tax law. Actual refunds depend on all income sources, deductions, credits, and IRS processing. Consult a licensed tax professional or CPA for personalized advice. See IRS.gov for official refund status information.
      </p>
    </div>
  )
}
