'use client'

import { useState, useEffect } from 'react'
import { STATES, STANDARD_DEDUCTIONS, FilingStatus } from '@/lib/taxData'
import { calcFederalTax, calcSETax } from '@/lib/taxCalc'

const fmt = (v: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(v)
const fmtPct = (v: number) => `${v.toFixed(1)}%`

const STORAGE_KEY = 'tc-selfemployed'

const QUARTERLY_DATES = [
  { quarter: 'Q1 (Jan–Mar)', due: 'April 15, 2026' },
  { quarter: 'Q2 (Apr–May)', due: 'June 16, 2026' },
  { quarter: 'Q3 (Jun–Aug)', due: 'September 15, 2026' },
  { quarter: 'Q4 (Sep–Dec)', due: 'January 15, 2027' },
]

export default function SelfEmployedCalculator() {
  const [seIncome, setSeIncome] = useState('80000')
  const [w2Income, setW2Income] = useState('0')
  const [filingStatus, setFilingStatus] = useState<FilingStatus>('single')
  const [stateCode, setStateCode] = useState('')
  const [quarterlyPaid, setQuarterlyPaid] = useState('0')
  const [sepIra, setSepIra] = useState('0')
  const [solo401k, setSolo401k] = useState('0')

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        const p = JSON.parse(saved)
        if (p.seIncome) setSeIncome(p.seIncome)
        if (p.w2Income) setW2Income(p.w2Income)
        if (p.filingStatus) setFilingStatus(p.filingStatus)
        if (p.stateCode) setStateCode(p.stateCode)
        if (p.quarterlyPaid) setQuarterlyPaid(p.quarterlyPaid)
        if (p.sepIra) setSepIra(p.sepIra)
        if (p.solo401k) setSolo401k(p.solo401k)
      }
    } catch { /* ignore */ }
  }, [])

  const save = (updates: Record<string, unknown>) => {
    try {
      const cur = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...cur, ...updates }))
    } catch { /* ignore */ }
  }

  const seNet = parseFloat(seIncome) || 0
  const w2 = parseFloat(w2Income) || 0
  const paidSoFar = parseFloat(quarterlyPaid) || 0
  const sepIraAmt = Math.min(parseFloat(sepIra) || 0, Math.floor(seNet * 0.25))
  const solo401kAmt = Math.min(parseFloat(solo401k) || 0, 70000)

  const { seTax, seDeduction, netSE } = calcSETax(seNet)

  const totalIncome = seNet + w2
  const retirementDeductions = sepIraAmt + solo401kAmt
  const agi = Math.max(0, totalIncome - seDeduction - retirementDeductions)
  const stdDed = STANDARD_DEDUCTIONS[filingStatus]
  const taxableIncome = Math.max(0, agi - stdDed)

  const federalIncomeTax = calcFederalTax(taxableIncome, filingStatus)

  const stateInfo = stateCode ? STATES[stateCode] : null
  const stateTax = stateInfo ? totalIncome * stateInfo.rate : 0

  const totalTaxDue = seTax + federalIncomeTax + stateTax
  const remainingDue = Math.max(0, totalTaxDue - paidSoFar)
  const quarterlyRecommended = totalTaxDue / 4

  const seEffectiveRate = totalIncome > 0 ? (totalTaxDue / totalIncome) * 100 : 0

  const inputCls =
    'w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-[#1e293b] text-gray-900 dark:text-[#e2e8f0] text-sm focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]'
  const labelCls = 'block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'

  const STATUS_OPTIONS: { value: FilingStatus; label: string }[] = [
    { value: 'single', label: 'Single' },
    { value: 'mfj', label: 'Married Jointly' },
    { value: 'mfs', label: 'Married Separately' },
    { value: 'hoh', label: 'Head of Household' },
  ]

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* INPUTS */}
        <div className="space-y-4">
          <div>
            <label className={labelCls}>Net Self-Employment Income</label>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">After business expenses, before SE tax</p>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
              <input type="number" value={seIncome} onChange={e => { setSeIncome(e.target.value); save({ seIncome: e.target.value }) }} className={`${inputCls} pl-7`} min="0" />
            </div>
          </div>

          <div>
            <label className={labelCls}>Other W-2 / Wages Income</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
              <input type="number" value={w2Income} onChange={e => { setW2Income(e.target.value); save({ w2Income: e.target.value }) }} className={`${inputCls} pl-7`} min="0" />
            </div>
          </div>

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
            <label className={labelCls}>State</label>
            <select value={stateCode} onChange={e => { setStateCode(e.target.value); save({ stateCode: e.target.value }) }} className={inputCls}>
              <option value="">No state / Not selected</option>
              {Object.entries(STATES).sort((a, b) => a[1].name.localeCompare(b[1].name)).map(([code, info]) => (
                <option key={code} value={code}>{info.name}{!info.hasIncomeTax ? ' — No income tax' : ` — ${(info.rate * 100).toFixed(2)}%`}</option>
              ))}
            </select>
          </div>

          <div className="rounded-xl border border-gray-100 dark:border-gray-700 p-4 space-y-3">
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">Retirement Contributions (reduce taxable income)</p>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">SEP-IRA</label>
                <div className="relative">
                  <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400 text-xs">$</span>
                  <input type="number" value={sepIra} onChange={e => { setSepIra(e.target.value); save({ sepIra: e.target.value }) }} className="w-full pl-6 pr-2 py-1.5 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-[#1e293b] text-sm focus:outline-none focus:ring-1 focus:ring-[#1e3a5f] text-gray-900 dark:text-[#e2e8f0]" min="0" />
                </div>
                <p className="text-xs text-gray-400 mt-0.5">Max 25% of net SE income</p>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Solo 401(k)</label>
                <div className="relative">
                  <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400 text-xs">$</span>
                  <input type="number" value={solo401k} onChange={e => { setSolo401k(e.target.value); save({ solo401k: e.target.value }) }} className="w-full pl-6 pr-2 py-1.5 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-[#1e293b] text-sm focus:outline-none focus:ring-1 focus:ring-[#1e3a5f] text-gray-900 dark:text-[#e2e8f0]" min="0" />
                </div>
                <p className="text-xs text-gray-400 mt-0.5">Max $70,000 (2026)</p>
              </div>
            </div>
          </div>

          <div>
            <label className={labelCls}>Quarterly Estimated Payments Already Made</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
              <input type="number" value={quarterlyPaid} onChange={e => { setQuarterlyPaid(e.target.value); save({ quarterlyPaid: e.target.value }) }} className={`${inputCls} pl-7`} min="0" />
            </div>
          </div>
        </div>

        {/* RESULTS */}
        <div className="space-y-4">
          <div className="rounded-xl bg-[#1e3a5f]/10 dark:bg-[#1e3a5f]/20 border border-[#1e3a5f]/30 p-5">
            <p className="text-sm text-[#1e3a5f] dark:text-blue-300 font-medium mb-1">Total Tax Due</p>
            <p className="text-4xl font-bold text-[#1e3a5f] dark:text-blue-200">{fmt(totalTaxDue)}</p>
            {paidSoFar > 0 && (
              <p className="text-sm text-[#1e3a5f]/80 dark:text-blue-300 mt-1">
                Remaining after payments: {fmt(remainingDue)}
              </p>
            )}
            <p className="text-xs text-[#1e3a5f]/60 dark:text-blue-400 mt-1">
              Effective rate: {fmtPct(seEffectiveRate)}
            </p>
          </div>

          <div className="rounded-xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-[#1e293b] p-4">
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">SE Tax Calculation</p>
            <div className="space-y-2">
              {[
                { label: 'Net SE Income', val: fmt(seNet) },
                { label: 'Net SE (×92.35% adjustment)', val: fmt(netSE) },
                { label: 'SE Tax (15.3%)', val: fmt(seTax), bold: true },
                { label: 'SE Tax Deduction (half)', val: `−${fmt(seDeduction)}` },
                { label: 'Retirement Deductions', val: retirementDeductions > 0 ? `−${fmt(retirementDeductions)}` : '—' },
                { label: 'Total Income', val: fmt(totalIncome) },
                { label: 'Adjusted Gross Income', val: fmt(agi), bold: true },
                { label: 'Standard Deduction', val: `−${fmt(stdDed)}` },
                { label: 'Taxable Income', val: fmt(taxableIncome), bold: true },
                { label: 'Federal Income Tax', val: fmt(federalIncomeTax), bold: true },
                { label: 'Self-Employment Tax', val: fmt(seTax) },
                ...(stateInfo ? [{ label: `${stateInfo.name} State Tax`, val: fmt(stateTax) }] : []),
                { label: 'Total Tax Due', val: fmt(totalTaxDue), bold: true, highlight: true },
              ].map(({ label, val, bold, highlight }) => (
                <div key={label} className={`flex justify-between text-sm ${bold ? 'border-t border-gray-100 dark:border-gray-600 pt-2 mt-1' : ''}`}>
                  <span className={bold ? 'font-semibold text-gray-800 dark:text-[#e2e8f0]' : 'text-gray-600 dark:text-gray-400'}>{label}</span>
                  <span className={`font-medium ${highlight ? 'font-bold text-[#1e3a5f] dark:text-blue-300' : 'text-gray-800 dark:text-[#e2e8f0]'}`}>{val}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quarterly payment schedule */}
          <div className="rounded-xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-[#1e293b] p-4">
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
              2026 Quarterly Estimated Payments
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
              Recommended: {fmt(quarterlyRecommended)}/quarter
            </p>
            <div className="space-y-2">
              {QUARTERLY_DATES.map(({ quarter, due }) => (
                <div key={quarter} className="flex justify-between items-center text-sm">
                  <span className="text-gray-600 dark:text-gray-400">{quarter}</span>
                  <div className="text-right">
                    <span className="font-medium text-gray-800 dark:text-[#e2e8f0] block">{fmt(quarterlyRecommended)}</span>
                    <span className="text-xs text-gray-400">Due {due}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <p className="mt-6 text-xs text-gray-400 dark:text-gray-500 leading-relaxed">
        Self-employment tax estimates are for educational purposes based on 2026 tax law. SE tax is 15.3% (12.4% Social Security + 2.9% Medicare) on 92.35% of net SE income. Consult a licensed CPA or tax professional for personalized advice. See IRS Schedule SE for official calculations.
      </p>
    </div>
  )
}
