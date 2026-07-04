'use client'

import { useState, useEffect } from 'react'
import { BRACKETS, BRACKET_COLORS, FilingStatus } from '@/lib/taxData'
import { calcFederalTax, getMarginalRate, getBracketBreakdown } from '@/lib/taxCalc'

const fmt = (v: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(v)
const fmtPct = (v: number) => `${v.toFixed(1)}%`

const STORAGE_KEY = 'tc-taxbracket'

const STATUS_OPTIONS: { value: FilingStatus; label: string }[] = [
  { value: 'single', label: 'Single' },
  { value: 'mfj', label: 'Married Jointly' },
  { value: 'mfs', label: 'Married Separately' },
  { value: 'hoh', label: 'Head of Household' },
]

export default function TaxBracketCalculator() {
  const [filingStatus, setFilingStatus] = useState<FilingStatus>('single')
  const [taxableIncome, setTaxableIncome] = useState('75000')

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        const p = JSON.parse(saved)
        if (p.filingStatus) setFilingStatus(p.filingStatus)
        if (p.taxableIncome) setTaxableIncome(p.taxableIncome)
      }
    } catch { /* ignore */ }
  }, [])

  const save = (updates: Record<string, unknown>) => {
    try {
      const cur = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...cur, ...updates }))
    } catch { /* ignore */ }
  }

  const income = parseFloat(taxableIncome) || 0
  const federalTax = calcFederalTax(income, filingStatus)
  const marginalRate = getMarginalRate(income, filingStatus)
  const effectiveRate = income > 0 ? (federalTax / income) * 100 : 0
  const breakdown = getBracketBreakdown(income, filingStatus)
  const allBrackets = BRACKETS[filingStatus]
  const totalBracketIncome = breakdown.reduce((s, b) => s + b.amount, 0)

  const inputCls =
    'w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-[#1e293b] text-gray-900 dark:text-[#e2e8f0] text-sm focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]'
  const labelCls = 'block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'

  return (
    <div className="p-6">
      {/* Inputs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
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
          <label className={labelCls}>Taxable Income (after deductions)</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
            <input type="number" value={taxableIncome} onChange={e => { setTaxableIncome(e.target.value); save({ taxableIncome: e.target.value }) }} className={`${inputCls} pl-7`} min="0" />
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Tip: subtract your standard deduction first (Single: $15,750; MFJ: $31,500)</p>
        </div>
      </div>

      {/* Key metrics */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { label: 'Federal Tax', val: fmt(federalTax), color: 'text-[#1e3a5f] dark:text-blue-300' },
          { label: 'Effective Rate', val: fmtPct(effectiveRate), color: 'text-emerald-700 dark:text-emerald-400' },
          { label: 'Marginal Rate', val: `${(marginalRate * 100).toFixed(0)}%`, color: 'text-amber-700 dark:text-amber-400' },
        ].map(({ label, val, color }) => (
          <div key={label} className="rounded-xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-[#1e293b] p-4 text-center">
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">{label}</p>
            <p className={`text-2xl font-bold ${color}`}>{val}</p>
          </div>
        ))}
      </div>

      {/* Bracket visualization */}
      {breakdown.length > 0 && totalBracketIncome > 0 && (
        <div className="mb-6">
          <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Income Distribution Across Brackets</p>
          <div className="flex h-8 rounded-xl overflow-hidden mb-2 shadow-inner">
            {breakdown.map((b, i) => (
              <div
                key={i}
                style={{ width: `${(b.amount / totalBracketIncome) * 100}%`, backgroundColor: BRACKET_COLORS[i] }}
                title={`${(b.rate * 100).toFixed(0)}%: ${fmt(b.amount)}`}
              />
            ))}
          </div>
          <div className="flex flex-wrap gap-3">
            {breakdown.map((b, i) => (
              <div key={i} className="flex items-center gap-1.5 text-xs text-gray-600 dark:text-gray-400">
                <span className="w-3 h-3 rounded-sm shrink-0" style={{ backgroundColor: BRACKET_COLORS[i] }} />
                <span>{(b.rate * 100).toFixed(0)}%: {fmt(b.amount)}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Full bracket table */}
      <div className="rounded-xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-[#1e293b] overflow-hidden">
        <div className="bg-gray-50 dark:bg-[#0f172a] px-4 py-2.5 border-b border-gray-100 dark:border-gray-700">
          <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">
            2026 Federal Tax Brackets — {STATUS_OPTIONS.find(s => s.value === filingStatus)?.label}
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 dark:border-gray-700">
                <th className="text-left px-4 py-2.5 text-xs font-semibold text-gray-500 dark:text-gray-400">Rate</th>
                <th className="text-left px-4 py-2.5 text-xs font-semibold text-gray-500 dark:text-gray-400">Income Range</th>
                <th className="text-right px-4 py-2.5 text-xs font-semibold text-gray-500 dark:text-gray-400">Your Income in Bracket</th>
                <th className="text-right px-4 py-2.5 text-xs font-semibold text-gray-500 dark:text-gray-400">Tax in Bracket</th>
                <th className="text-right px-4 py-2.5 text-xs font-semibold text-gray-500 dark:text-gray-400">Cumulative Tax</th>
              </tr>
            </thead>
            <tbody>
              {allBrackets.map((bracket, i) => {
                const bd = breakdown.find(b => b.rate === bracket.rate)
                const inBracket = bd ? bd.amount : 0
                const taxInBracket = bd ? bd.tax : 0
                const cumulativeTax = breakdown.slice(0, breakdown.findIndex(b => b.rate === bracket.rate) + 1).reduce((s, b) => s + b.tax, 0)
                const isActive = income > bracket.min && (income <= bracket.max || bracket.max === Infinity)
                const isPast = income > bracket.max && bracket.max !== Infinity
                return (
                  <tr
                    key={i}
                    className={`border-b border-gray-50 dark:border-gray-700/50 ${
                      isActive ? 'bg-[#1e3a5f]/5 dark:bg-[#1e3a5f]/10' : ''
                    }`}
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-sm shrink-0" style={{ backgroundColor: BRACKET_COLORS[i] }} />
                        <span className={`font-bold ${isActive ? 'text-[#1e3a5f] dark:text-blue-300' : 'text-gray-700 dark:text-gray-300'}`}>
                          {(bracket.rate * 100).toFixed(0)}%
                        </span>
                        {isActive && <span className="text-xs bg-[#1e3a5f] text-white px-1.5 py-0.5 rounded-full">Your Rate</span>}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-gray-600 dark:text-gray-400">
                      {fmt(bracket.min)} – {bracket.max === Infinity ? '∞' : fmt(bracket.max)}
                    </td>
                    <td className="px-4 py-3 text-right">
                      {(isPast || isActive) && inBracket > 0 ? (
                        <span className="font-medium text-gray-800 dark:text-[#e2e8f0]">{fmt(inBracket)}</span>
                      ) : (
                        <span className="text-gray-300 dark:text-gray-600">—</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-right">
                      {taxInBracket > 0 ? (
                        <span className="font-medium text-gray-800 dark:text-[#e2e8f0]">{fmt(taxInBracket)}</span>
                      ) : (
                        <span className="text-gray-300 dark:text-gray-600">—</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-right">
                      {cumulativeTax > 0 ? (
                        <span className={`font-medium ${isActive ? 'text-[#1e3a5f] dark:text-blue-300 font-bold' : 'text-gray-800 dark:text-[#e2e8f0]'}`}>{fmt(cumulativeTax)}</span>
                      ) : (
                        <span className="text-gray-300 dark:text-gray-600">—</span>
                      )}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {income > 0 && (
        <div className="mt-4 rounded-xl bg-blue-50 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/50 px-5 py-4">
          <p className="text-sm text-blue-800 dark:text-blue-300 leading-relaxed">
            <strong>Understanding your rates:</strong> Your marginal rate is{' '}
            <strong>{(marginalRate * 100).toFixed(0)}%</strong>, meaning your next dollar of income is taxed at that
            rate. But your effective rate is only <strong>{fmtPct(effectiveRate)}</strong> — because the U.S. uses a
            progressive system where each bracket only applies to the income within that range, not all your income.
          </p>
        </div>
      )}

      <p className="mt-4 text-xs text-gray-400 dark:text-gray-500 leading-relaxed">
        Tax bracket estimates for educational purposes based on 2026 One Big Beautiful Bill Act tax law. Enter your taxable income (after standard or itemized deductions). Consult a licensed tax professional for personalized advice.
      </p>
    </div>
  )
}
