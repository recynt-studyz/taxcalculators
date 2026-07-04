'use client'

import { useState, useEffect } from 'react'
import { STANDARD_DEDUCTIONS, FilingStatus } from '@/lib/taxData'
import { calcFederalTax } from '@/lib/taxCalc'

const fmt = (v: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(v)
const fmt2 = (v: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 2 }).format(v)

const STORAGE_KEY = 'tc-w4'
const PAY_PERIODS: Record<string, number> = { weekly: 52, biweekly: 26, semimonthly: 24, monthly: 12 }

const STATUS_OPTIONS: { value: FilingStatus; label: string }[] = [
  { value: 'single', label: 'Single' },
  { value: 'mfj', label: 'Married Jointly' },
  { value: 'mfs', label: 'Married Separately' },
  { value: 'hoh', label: 'Head of Household' },
]

export default function W4Calculator() {
  const [filingStatus, setFilingStatus] = useState<FilingStatus>('single')
  const [annualSalary, setAnnualSalary] = useState('75000')
  const [payFrequency, setPayFrequency] = useState('biweekly')
  const [multipleJobs, setMultipleJobs] = useState(false)
  const [childrenUnder17, setChildrenUnder17] = useState(0)
  const [otherDependents, setOtherDependents] = useState(0)
  const [otherIncome, setOtherIncome] = useState('0')
  const [itemizedDeduction, setItemizedDeduction] = useState('0')
  const [useItemized, setUseItemized] = useState(false)
  const [extraWithholding, setExtraWithholding] = useState('0')
  const [currentWithheld, setCurrentWithheld] = useState('0')

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        const p = JSON.parse(saved)
        if (p.filingStatus) setFilingStatus(p.filingStatus)
        if (p.annualSalary) setAnnualSalary(p.annualSalary)
        if (p.payFrequency) setPayFrequency(p.payFrequency)
        if (p.multipleJobs !== undefined) setMultipleJobs(p.multipleJobs)
        if (p.childrenUnder17 !== undefined) setChildrenUnder17(p.childrenUnder17)
        if (p.otherDependents !== undefined) setOtherDependents(p.otherDependents)
        if (p.otherIncome) setOtherIncome(p.otherIncome)
        if (p.itemizedDeduction) setItemizedDeduction(p.itemizedDeduction)
        if (p.useItemized !== undefined) setUseItemized(p.useItemized)
        if (p.extraWithholding) setExtraWithholding(p.extraWithholding)
        if (p.currentWithheld) setCurrentWithheld(p.currentWithheld)
      }
    } catch { /* ignore */ }
  }, [])

  const save = (updates: Record<string, unknown>) => {
    try {
      const cur = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...cur, ...updates }))
    } catch { /* ignore */ }
  }

  const salary = parseFloat(annualSalary) || 0
  const extraIncome = parseFloat(otherIncome) || 0
  const periods = PAY_PERIODS[payFrequency] || 26
  const extra = (parseFloat(extraWithholding) || 0) * periods

  // Step 3: Child Tax Credit
  const step3 = childrenUnder17 * 2200 + otherDependents * 500

  // Deduction amount for Step 4b
  const stdDed = STANDARD_DEDUCTIONS[filingStatus]
  const itemized = parseFloat(itemizedDeduction) || 0
  const step4bDeduction = useItemized && itemized > stdDed ? itemized - stdDed : 0

  // Estimated annual tax
  const totalIncome = salary + extraIncome
  const deduction = useItemized ? Math.max(0, itemized) : stdDed
  const taxableIncome = Math.max(0, totalIncome - deduction)
  const annualTax = Math.max(0, calcFederalTax(taxableIncome, filingStatus) - step3)

  // Estimated withholding based on default W-4
  const baseTaxablePerPeriod = Math.max(0, (salary / periods) - (stdDed / periods))
  const estimatedWithholdingPerPeriod = calcFederalTax(baseTaxablePerPeriod * periods, filingStatus) / periods
  const estimatedAnnualWithholding = estimatedWithholdingPerPeriod * periods + extra

  const withheld = parseFloat(currentWithheld) || estimatedAnnualWithholding
  const refundOrOwed = withheld - annualTax
  const perPaycheckAdjustment = Math.abs(refundOrOwed) / periods

  const inputCls =
    'w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-[#1e293b] text-gray-900 dark:text-[#e2e8f0] text-sm focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]'
  const labelCls = 'block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'

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
            <label className={labelCls}>Annual Salary (primary job)</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
              <input type="number" value={annualSalary} onChange={e => { setAnnualSalary(e.target.value); save({ annualSalary: e.target.value }) }} className={`${inputCls} pl-7`} min="0" />
            </div>
          </div>

          <div>
            <label className={labelCls}>Pay Frequency</label>
            <select value={payFrequency} onChange={e => { setPayFrequency(e.target.value); save({ payFrequency: e.target.value }) }} className={inputCls}>
              <option value="weekly">Weekly (52/yr)</option>
              <option value="biweekly">Biweekly (26/yr)</option>
              <option value="semimonthly">Semimonthly (24/yr)</option>
              <option value="monthly">Monthly (12/yr)</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <input type="checkbox" id="multiJobs" checked={multipleJobs} onChange={e => { setMultipleJobs(e.target.checked); save({ multipleJobs: e.target.checked }) }} className="rounded border-gray-300 w-4 h-4 accent-[#1e3a5f]" />
            <label htmlFor="multiJobs" className="text-sm text-gray-700 dark:text-gray-300 cursor-pointer">Multiple jobs / spouse works (W-4 Step 2)</label>
          </div>

          {/* Step 3: Dependents */}
          <div className="rounded-xl border border-gray-100 dark:border-gray-700 p-4 space-y-3">
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">W-4 Step 3 — Dependents</p>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-gray-600 dark:text-gray-400 mb-1">Children under 17 (×$2,200)</label>
                <div className="flex items-center gap-2">
                  <button onClick={() => { const v = Math.max(0, childrenUnder17 - 1); setChildrenUnder17(v); save({ childrenUnder17: v }) }} className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-700 font-bold text-gray-700 dark:text-gray-300 hover:bg-gray-200 transition">−</button>
                  <span className="w-8 text-center font-bold text-gray-800 dark:text-[#e2e8f0]">{childrenUnder17}</span>
                  <button onClick={() => { const v = childrenUnder17 + 1; setChildrenUnder17(v); save({ childrenUnder17: v }) }} className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-700 font-bold text-gray-700 dark:text-gray-300 hover:bg-gray-200 transition">+</button>
                </div>
              </div>
              <div>
                <label className="block text-xs text-gray-600 dark:text-gray-400 mb-1">Other dependents (×$500)</label>
                <div className="flex items-center gap-2">
                  <button onClick={() => { const v = Math.max(0, otherDependents - 1); setOtherDependents(v); save({ otherDependents: v }) }} className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-700 font-bold text-gray-700 dark:text-gray-300 hover:bg-gray-200 transition">−</button>
                  <span className="w-8 text-center font-bold text-gray-800 dark:text-[#e2e8f0]">{otherDependents}</span>
                  <button onClick={() => { const v = otherDependents + 1; setOtherDependents(v); save({ otherDependents: v }) }} className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-700 font-bold text-gray-700 dark:text-gray-300 hover:bg-gray-200 transition">+</button>
                </div>
              </div>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400">Step 3 total: {fmt(step3)}</p>
          </div>

          {/* Step 4 */}
          <div className="rounded-xl border border-gray-100 dark:border-gray-700 p-4 space-y-3">
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">W-4 Step 4 — Other Adjustments</p>
            <div>
              <label className="block text-xs text-gray-600 dark:text-gray-400 mb-1">Other income (not from jobs): dividends, rental, freelance (annual)</label>
              <div className="relative">
                <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400 text-xs">$</span>
                <input type="number" value={otherIncome} onChange={e => { setOtherIncome(e.target.value); save({ otherIncome: e.target.value }) }} className="w-full pl-6 pr-2 py-1.5 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-[#1e293b] text-sm focus:outline-none focus:ring-1 focus:ring-[#1e3a5f] text-gray-900 dark:text-[#e2e8f0]" min="0" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-2">
                <input type="checkbox" id="useItemW4" checked={useItemized} onChange={e => { setUseItemized(e.target.checked); save({ useItemized: e.target.checked }) }} className="rounded border-gray-300 w-4 h-4 accent-[#1e3a5f]" />
                <label htmlFor="useItemW4" className="text-xs text-gray-600 dark:text-gray-400 cursor-pointer">I itemize deductions (Step 4b)</label>
              </div>
              {useItemized && (
                <div className="relative">
                  <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400 text-xs">$</span>
                  <input type="number" value={itemizedDeduction} onChange={e => { setItemizedDeduction(e.target.value); save({ itemizedDeduction: e.target.value }) }} className="w-full pl-6 pr-2 py-1.5 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-[#1e293b] text-sm focus:outline-none focus:ring-1 focus:ring-[#1e3a5f] text-gray-900 dark:text-[#e2e8f0]" min="0" placeholder="Total itemized deductions" />
                </div>
              )}
            </div>
            <div>
              <label className="block text-xs text-gray-600 dark:text-gray-400 mb-1">Extra withholding per paycheck (Step 4c)</label>
              <div className="relative">
                <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400 text-xs">$</span>
                <input type="number" value={extraWithholding} onChange={e => { setExtraWithholding(e.target.value); save({ extraWithholding: e.target.value }) }} className="w-full pl-6 pr-2 py-1.5 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-[#1e293b] text-sm focus:outline-none focus:ring-1 focus:ring-[#1e3a5f] text-gray-900 dark:text-[#e2e8f0]" min="0" />
              </div>
            </div>
          </div>

          <div>
            <label className={labelCls}>Current Annual Withholding (from pay stubs, optional)</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
              <input type="number" value={currentWithheld} onChange={e => { setCurrentWithheld(e.target.value); save({ currentWithheld: e.target.value }) }} className={`${inputCls} pl-7`} min="0" placeholder="Leave 0 to use estimate" />
            </div>
          </div>
        </div>

        {/* RESULTS */}
        <div className="space-y-4">
          <div className={`rounded-xl border p-5 ${refundOrOwed >= 0 ? 'bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-900' : 'bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-900'}`}>
            <p className={`text-sm font-medium mb-1 ${refundOrOwed >= 0 ? 'text-green-800 dark:text-green-300' : 'text-red-800 dark:text-red-300'}`}>
              {refundOrOwed >= 0 ? 'Estimated Refund' : 'Estimated Amount Owed'}
            </p>
            <p className={`text-4xl font-bold ${refundOrOwed >= 0 ? 'text-green-700 dark:text-green-200' : 'text-red-700 dark:text-red-200'}`}>
              {fmt(Math.abs(refundOrOwed))}
            </p>
          </div>

          <div className="rounded-xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-[#1e293b] p-4">
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Tax Estimate Summary</p>
            <div className="space-y-2">
              {[
                { label: 'Estimated Annual Tax', val: fmt(annualTax) },
                { label: 'Estimated Withholding', val: fmt(withheld) },
                { label: refundOrOwed >= 0 ? 'Expected Refund' : 'Expected Amount Owed', val: fmt(Math.abs(refundOrOwed)), bold: true, highlight: refundOrOwed >= 0 },
              ].map(({ label, val, bold, highlight }) => (
                <div key={label} className={`flex justify-between text-sm ${bold ? 'border-t border-gray-100 dark:border-gray-600 pt-2 mt-1' : ''}`}>
                  <span className={bold ? 'font-semibold text-gray-800 dark:text-[#e2e8f0]' : 'text-gray-600 dark:text-gray-400'}>{label}</span>
                  <span className={`font-medium ${highlight ? 'font-bold text-green-700 dark:text-green-400' : bold && !highlight ? 'font-bold text-red-600 dark:text-red-400' : 'text-gray-800 dark:text-[#e2e8f0]'}`}>{val}</span>
                </div>
              ))}
            </div>
          </div>

          {/* W-4 Recommendations */}
          <div className="rounded-xl border border-[#1e3a5f]/20 dark:border-blue-900/50 bg-[#1e3a5f]/5 dark:bg-[#1e3a5f]/10 p-4">
            <p className="text-sm font-semibold text-[#1e3a5f] dark:text-blue-300 mb-3">W-4 Recommendations</p>
            <div className="space-y-3 text-sm">
              <div>
                <p className="font-medium text-[#1e3a5f]/80 dark:text-blue-400">Step 2 — Multiple Jobs:</p>
                <p className="text-gray-700 dark:text-gray-300">{multipleJobs ? 'Check the box or use IRS withholding estimator' : 'Leave blank (single job)'}</p>
              </div>
              <div>
                <p className="font-medium text-[#1e3a5f]/80 dark:text-blue-400">Step 3 — Claim Dependents:</p>
                <p className="text-gray-700 dark:text-gray-300">{fmt(step3)}</p>
              </div>
              {step4bDeduction > 0 && (
                <div>
                  <p className="font-medium text-[#1e3a5f]/80 dark:text-blue-400">Step 4b — Deductions:</p>
                  <p className="text-gray-700 dark:text-gray-300">{fmt(step4bDeduction)} (excess over standard)</p>
                </div>
              )}
              {refundOrOwed < -500 && (
                <div className="rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900 p-3">
                  <p className="font-medium text-amber-800 dark:text-amber-300">Step 4c — Extra Withholding Recommended:</p>
                  <p className="text-amber-700 dark:text-amber-400">Add {fmt2(perPaycheckAdjustment)}/paycheck to avoid owing at filing time.</p>
                </div>
              )}
              {refundOrOwed > 2000 && (
                <div className="rounded-lg bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900 p-3">
                  <p className="font-medium text-blue-800 dark:text-blue-300">Large Refund — Consider Adjusting:</p>
                  <p className="text-blue-700 dark:text-blue-400">You may be over-withholding by {fmt2(perPaycheckAdjustment)}/paycheck. Increase Step 3 to keep more in each paycheck.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <p className="mt-6 text-xs text-gray-400 dark:text-gray-500 leading-relaxed">
        W-4 recommendations are estimates for educational purposes based on 2026 tax law. Actual withholding depends on your specific W-4 elections and employer payroll system. Use the IRS Tax Withholding Estimator at irs.gov for the most accurate W-4 guidance.
      </p>
    </div>
  )
}
