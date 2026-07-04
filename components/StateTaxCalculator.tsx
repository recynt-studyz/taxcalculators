'use client'

import { useState, useEffect } from 'react'
import { STATES, STANDARD_DEDUCTIONS, NO_TAX_STATES, FilingStatus } from '@/lib/taxData'
import { calcFederalTax } from '@/lib/taxCalc'

const fmt = (v: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(v)
const fmtPct = (v: number, d = 2) => `${v.toFixed(d)}%`

const STORAGE_KEY = 'tc-statetax'

const STATUS_OPTIONS: { value: FilingStatus; label: string }[] = [
  { value: 'single', label: 'Single' },
  { value: 'mfj', label: 'Married Jointly' },
  { value: 'mfs', label: 'Married Separately' },
  { value: 'hoh', label: 'Head of Household' },
]

export default function StateTaxCalculator({ defaultState = '' }: { defaultState?: string }) {
  const [stateCode, setStateCode] = useState(defaultState)
  const [annualIncome, setAnnualIncome] = useState('75000')
  const [filingStatus, setFilingStatus] = useState<FilingStatus>('single')

  useEffect(() => {
    const storageKey = defaultState ? `tc-${defaultState.toLowerCase()}` : STORAGE_KEY
    try {
      const saved = localStorage.getItem(storageKey)
      if (saved) {
        const p = JSON.parse(saved)
        if (!defaultState && p.stateCode) setStateCode(p.stateCode)
        if (p.annualIncome) setAnnualIncome(p.annualIncome)
        if (p.filingStatus) setFilingStatus(p.filingStatus)
      }
    } catch { /* ignore */ }
  }, [defaultState])

  const save = (updates: Record<string, unknown>) => {
    const storageKey = defaultState ? `tc-${defaultState.toLowerCase()}` : STORAGE_KEY
    try {
      const cur = JSON.parse(localStorage.getItem(storageKey) || '{}')
      localStorage.setItem(storageKey, JSON.stringify({ ...cur, ...updates }))
    } catch { /* ignore */ }
  }

  const income = parseFloat(annualIncome) || 0
  const stateInfo = stateCode ? STATES[stateCode] : null
  const stateTax = stateInfo ? income * stateInfo.rate : 0
  const stateEffectiveRate = income > 0 && stateInfo ? stateInfo.rate * 100 : 0

  const stdDed = STANDARD_DEDUCTIONS[filingStatus]
  const taxableIncome = Math.max(0, income - stdDed)
  const federalTax = calcFederalTax(taxableIncome, filingStatus)
  const federalEffectiveRate = income > 0 ? (federalTax / income) * 100 : 0

  const totalTax = federalTax + stateTax
  const totalEffectiveRate = income > 0 ? (totalTax / income) * 100 : 0
  const takehome = income - totalTax

  // Comparison with no-tax states
  const noTaxSavings = stateTax

  const inputCls =
    'w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-[#1e293b] text-gray-900 dark:text-[#e2e8f0] text-sm focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]'
  const labelCls = 'block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* INPUTS */}
        <div className="space-y-4">
          <div>
            <label className={labelCls}>State</label>
            <select
              value={stateCode}
              onChange={e => { setStateCode(e.target.value); save({ stateCode: e.target.value }) }}
              className={inputCls}
            >
              <option value="">Select a state</option>
              {Object.entries(STATES)
                .sort((a, b) => a[1].name.localeCompare(b[1].name))
                .map(([code, info]) => (
                  <option key={code} value={code}>
                    {info.name} — {!info.hasIncomeTax ? 'No income tax' : `${fmtPct(info.rate * 100)} top rate`}
                  </option>
                ))}
            </select>
          </div>

          <div>
            <label className={labelCls}>Annual Income</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
              <input
                type="number"
                value={annualIncome}
                onChange={e => { setAnnualIncome(e.target.value); save({ annualIncome: e.target.value }) }}
                className={`${inputCls} pl-7`}
                min="0"
              />
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

          {/* No-income-tax states */}
          <div className="rounded-xl bg-green-50 dark:bg-green-950/30 border border-green-100 dark:border-green-900/50 p-4">
            <p className="text-sm font-semibold text-green-800 dark:text-green-300 mb-2">States with No Income Tax</p>
            <div className="flex flex-wrap gap-2">
              {NO_TAX_STATES.map(code => (
                <button
                  key={code}
                  onClick={() => { setStateCode(code); save({ stateCode: code }) }}
                  className={`px-2.5 py-1 rounded-full text-xs font-medium transition-colors ${stateCode === code ? 'bg-green-700 text-white' : 'bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-300 hover:bg-green-200 dark:hover:bg-green-900'}`}
                >
                  {STATES[code].name}
                </button>
              ))}
            </div>
            {stateInfo && stateInfo.hasIncomeTax && noTaxSavings > 0 && (
              <p className="text-xs text-green-700 dark:text-green-400 mt-2">
                You would save {fmt(noTaxSavings)}/year in a no-income-tax state.
              </p>
            )}
          </div>
        </div>

        {/* RESULTS */}
        <div className="space-y-4">
          {stateInfo ? (
            <>
              <div className="rounded-xl bg-[#1e3a5f]/10 dark:bg-[#1e3a5f]/20 border border-[#1e3a5f]/30 p-5">
                <p className="text-sm text-[#1e3a5f] dark:text-blue-300 font-medium mb-1">
                  {stateInfo.name} State Tax
                </p>
                <p className="text-4xl font-bold text-[#1e3a5f] dark:text-blue-200">{fmt(stateTax)}</p>
                <p className="text-xs text-[#1e3a5f]/60 dark:text-blue-400 mt-1">
                  {stateInfo.hasIncomeTax ? `${fmtPct(stateEffectiveRate)} effective rate (simplified)` : 'No state income tax'}
                </p>
              </div>

              <div className="rounded-xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-[#1e293b] p-4">
                <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Full Tax Breakdown</p>
                <div className="space-y-2">
                  {[
                    { label: 'Gross Income', val: fmt(income) },
                    { label: 'Federal Standard Deduction', val: `−${fmt(stdDed)}` },
                    { label: 'Federal Taxable Income', val: fmt(taxableIncome), bold: true },
                    { label: 'Federal Income Tax', val: fmt(federalTax) },
                    { label: `${stateInfo.name} State Tax (est.)`, val: fmt(stateTax) },
                    { label: 'Total Tax', val: fmt(totalTax), bold: true, highlight: true },
                    { label: 'Annual Take-Home Pay', val: fmt(takehome), bold: true },
                    { label: 'Federal Effective Rate', val: fmtPct(federalEffectiveRate) },
                    { label: 'State Rate (simplified)', val: fmtPct(stateEffectiveRate) },
                    { label: 'Combined Effective Rate', val: fmtPct(totalEffectiveRate) },
                  ].map(({ label, val, bold, highlight }) => (
                    <div key={label} className={`flex justify-between text-sm ${bold ? 'border-t border-gray-100 dark:border-gray-600 pt-2 mt-1' : ''}`}>
                      <span className={bold ? 'font-semibold text-gray-800 dark:text-[#e2e8f0]' : 'text-gray-600 dark:text-gray-400'}>{label}</span>
                      <span className={`font-medium ${highlight ? 'font-bold text-[#1e3a5f] dark:text-blue-300' : 'text-gray-800 dark:text-[#e2e8f0]'}`}>{val}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* State comparison */}
              <div className="rounded-xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-[#1e293b] p-4">
                <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Neighboring High-Rate States vs No-Tax States</p>
                <div className="space-y-2">
                  {[
                    { code: stateCode, label: `${stateInfo.name} (your state)`, isCurrent: true },
                    { code: 'CA', label: 'California (13.3%)' },
                    { code: 'NY', label: 'New York (10.9%)' },
                    { code: 'OR', label: 'Oregon (9.9%)' },
                    { code: 'TX', label: 'Texas (0%)' },
                    { code: 'FL', label: 'Florida (0%)' },
                  ].filter((s, i, arr) => i === 0 || s.code !== stateCode).map(({ code, label, isCurrent }) => {
                    const si = STATES[code]
                    const sTax = income * (si?.rate || 0)
                    return (
                      <div key={code} className={`flex justify-between text-sm py-1 ${isCurrent ? 'font-semibold text-[#1e3a5f] dark:text-blue-300' : 'text-gray-600 dark:text-gray-400'}`}>
                        <span>{label}</span>
                        <span>{fmt(sTax)}</span>
                      </div>
                    )
                  })}
                </div>
              </div>
            </>
          ) : (
            <div className="rounded-xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-[#1e293b] p-8 text-center">
              <p className="text-gray-500 dark:text-gray-400">Select a state above to see your state income tax estimate.</p>
            </div>
          )}
        </div>
      </div>

      <p className="mt-6 text-xs text-gray-400 dark:text-gray-500 leading-relaxed">
        State income tax estimates use simplified flat rates and are for educational purposes. Actual state tax is calculated using state-specific progressive brackets and deductions. Consult a tax professional for accurate state tax calculations.
      </p>
    </div>
  )
}
