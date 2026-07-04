'use client'

import { useState, useEffect } from 'react'
import { STATES, STANDARD_DEDUCTIONS, FilingStatus } from '@/lib/taxData'
import { calcFederalTax, getMarginalRate, calcLTCGTax, calcNIIT } from '@/lib/taxCalc'

const fmt = (v: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(v)

const STORAGE_KEY = 'tc-capitalgains'

const RESIDENCE_EXCLUSION = { single: 250000, mfj: 500000, mfs: 250000, hoh: 250000 }

export default function CapitalGainsCalculator() {
  const [filingStatus, setFilingStatus] = useState<FilingStatus>('single')
  const [ordinaryIncome, setOrdinaryIncome] = useState('75000')
  const [shortTermGains, setShortTermGains] = useState('0')
  const [longTermGains, setLongTermGains] = useState('10000')
  const [investmentLosses, setInvestmentLosses] = useState('0')
  const [stateCode, setStateCode] = useState('')
  const [isPrimaryResidence, setIsPrimaryResidence] = useState(false)
  const [homeSaleGain, setHomeSaleGain] = useState('0')

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        const p = JSON.parse(saved)
        if (p.filingStatus) setFilingStatus(p.filingStatus)
        if (p.ordinaryIncome) setOrdinaryIncome(p.ordinaryIncome)
        if (p.shortTermGains) setShortTermGains(p.shortTermGains)
        if (p.longTermGains) setLongTermGains(p.longTermGains)
        if (p.investmentLosses) setInvestmentLosses(p.investmentLosses)
        if (p.stateCode) setStateCode(p.stateCode)
        if (p.isPrimaryResidence !== undefined) setIsPrimaryResidence(p.isPrimaryResidence)
        if (p.homeSaleGain) setHomeSaleGain(p.homeSaleGain)
      }
    } catch { /* ignore */ }
  }, [])

  const save = (updates: Record<string, unknown>) => {
    try {
      const cur = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...cur, ...updates }))
    } catch { /* ignore */ }
  }

  const income = parseFloat(ordinaryIncome) || 0
  const stg = parseFloat(shortTermGains) || 0
  const ltg = parseFloat(longTermGains) || 0
  const losses = parseFloat(investmentLosses) || 0
  const homeSale = isPrimaryResidence ? parseFloat(homeSaleGain) || 0 : 0
  const exclusion = RESIDENCE_EXCLUSION[filingStatus]
  const taxableHomeSaleGain = Math.max(0, homeSale - exclusion)

  // Net gains after losses (loss cap: $3,000/yr)
  const totalLTG = ltg + taxableHomeSaleGain
  const netGains = stg + totalLTG - losses
  const lossCarryover = netGains < 0 ? Math.min(Math.abs(netGains), 3000) : 0

  const netSTG = Math.max(0, stg - Math.max(0, losses - totalLTG))
  const netLTG = Math.max(0, totalLTG - Math.max(0, losses - stg))

  // Ordinary income including short-term gains
  const stdDed = STANDARD_DEDUCTIONS[filingStatus]
  const totalOrdinaryIncome = income + netSTG
  const ordinaryTaxableIncome = Math.max(0, totalOrdinaryIncome - stdDed)

  // Short-term taxed as ordinary income
  const ordinaryTaxWithSTG = calcFederalTax(ordinaryTaxableIncome, filingStatus)
  const ordinaryTaxWithoutSTG = calcFederalTax(Math.max(0, income - stdDed), filingStatus)
  const shortTermTax = ordinaryTaxWithSTG - ordinaryTaxWithoutSTG
  const shortTermRate = getMarginalRate(ordinaryTaxableIncome, filingStatus)

  // Long-term capital gains tax
  const longTermTax = calcLTCGTax(ordinaryTaxableIncome, netLTG, filingStatus)

  // NIIT
  const totalInvestmentIncome = netSTG + netLTG
  const niit = calcNIIT(ordinaryTaxableIncome, totalInvestmentIncome, filingStatus)

  // State capital gains tax (most states tax same as ordinary income)
  const stateInfo = stateCode ? STATES[stateCode] : null
  const stateCGTax = stateInfo ? (netSTG + netLTG) * stateInfo.rate : 0

  const totalCGTax = shortTermTax + longTermTax + niit + stateCGTax

  // Holding period comparison
  const whatIfShortTerm = longTermTax > 0 ? calcFederalTax(Math.max(0, ordinaryTaxableIncome + netLTG), filingStatus) - ordinaryTaxWithSTG : 0
  const holdingSavings = whatIfShortTerm - longTermTax

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
            <label className={labelCls}>Annual Ordinary Income (wages, salary)</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
              <input type="number" value={ordinaryIncome} onChange={e => { setOrdinaryIncome(e.target.value); save({ ordinaryIncome: e.target.value }) }} className={`${inputCls} pl-7`} min="0" />
            </div>
          </div>

          <div>
            <label className={labelCls}>Short-Term Capital Gains (held &lt; 1 year)</label>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Taxed as ordinary income at your marginal rate</p>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
              <input type="number" value={shortTermGains} onChange={e => { setShortTermGains(e.target.value); save({ shortTermGains: e.target.value }) }} className={`${inputCls} pl-7`} min="0" />
            </div>
          </div>

          <div>
            <label className={labelCls}>Long-Term Capital Gains (held &gt; 1 year)</label>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Taxed at preferential 0%, 15%, or 20% rates</p>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
              <input type="number" value={longTermGains} onChange={e => { setLongTermGains(e.target.value); save({ longTermGains: e.target.value }) }} className={`${inputCls} pl-7`} min="0" />
            </div>
          </div>

          <div>
            <label className={labelCls}>Capital Losses</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
              <input type="number" value={investmentLosses} onChange={e => { setInvestmentLosses(e.target.value); save({ investmentLosses: e.target.value }) }} className={`${inputCls} pl-7`} min="0" />
            </div>
            {lossCarryover > 0 && (
              <p className="text-xs text-amber-600 dark:text-amber-400 mt-1">Net loss exceeds gains — up to ${lossCarryover.toLocaleString()} deductible against ordinary income; excess carries forward.</p>
            )}
          </div>

          {/* Primary residence */}
          <div className="rounded-xl border border-gray-100 dark:border-gray-700 p-4 space-y-3">
            <div className="flex items-center gap-2">
              <input type="checkbox" id="primaryRes" checked={isPrimaryResidence} onChange={e => { setIsPrimaryResidence(e.target.checked); save({ isPrimaryResidence: e.target.checked }) }} className="rounded border-gray-300 w-4 h-4 accent-[#1e3a5f]" />
              <label htmlFor="primaryRes" className="text-sm font-medium text-gray-700 dark:text-gray-300 cursor-pointer">
                Include primary residence sale
              </label>
            </div>
            {isPrimaryResidence && (
              <>
                <div>
                  <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                    Gain on home sale (before exclusion)
                  </label>
                  <div className="relative">
                    <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400 text-xs">$</span>
                    <input type="number" value={homeSaleGain} onChange={e => { setHomeSaleGain(e.target.value); save({ homeSaleGain: e.target.value }) }} className="w-full pl-6 pr-2 py-1.5 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-[#1e293b] text-sm focus:outline-none focus:ring-1 focus:ring-[#1e3a5f] text-gray-900 dark:text-[#e2e8f0]" min="0" />
                  </div>
                </div>
                <p className="text-xs text-green-700 dark:text-green-400">
                  Section 121 exclusion: {fmt(exclusion)} ({filingStatus === 'mfj' ? 'married' : 'single'}). Taxable gain: {fmt(taxableHomeSaleGain)}.
                </p>
              </>
            )}
          </div>

          <div>
            <label className={labelCls}>State</label>
            <select value={stateCode} onChange={e => { setStateCode(e.target.value); save({ stateCode: e.target.value }) }} className={inputCls}>
              <option value="">No state / Not selected</option>
              {Object.entries(STATES).sort((a, b) => a[1].name.localeCompare(b[1].name)).map(([code, info]) => (
                <option key={code} value={code}>{info.name}{!info.hasIncomeTax ? ' — No capital gains tax' : ` — ${(info.rate * 100).toFixed(2)}%`}</option>
              ))}
            </select>
          </div>
        </div>

        {/* RESULTS */}
        <div className="space-y-4">
          <div className="rounded-xl bg-[#1e3a5f]/10 dark:bg-[#1e3a5f]/20 border border-[#1e3a5f]/30 p-5">
            <p className="text-sm text-[#1e3a5f] dark:text-blue-300 font-medium mb-1">Total Capital Gains Tax</p>
            <p className="text-4xl font-bold text-[#1e3a5f] dark:text-blue-200">{fmt(totalCGTax)}</p>
          </div>

          <div className="rounded-xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-[#1e293b] p-4">
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Capital Gains Tax Breakdown</p>
            <div className="space-y-2">
              {[
                { label: `Short-Term Rate (marginal ${(shortTermRate*100).toFixed(0)}%)`, val: fmt(shortTermTax) },
                { label: 'Long-Term Capital Gains Tax', val: fmt(longTermTax) },
                ...(niit > 0 ? [{ label: 'Net Investment Income Tax (3.8%)', val: fmt(niit) }] : []),
                ...(stateInfo ? [{ label: `${stateInfo.name} State Capital Gains Tax`, val: fmt(stateCGTax) }] : []),
                { label: 'Total Capital Gains Tax', val: fmt(totalCGTax), bold: true, highlight: true },
              ].map(({ label, val, bold, highlight }) => (
                <div key={label} className={`flex justify-between text-sm ${bold ? 'border-t border-gray-100 dark:border-gray-600 pt-2 mt-1' : ''}`}>
                  <span className={bold ? 'font-semibold text-gray-800 dark:text-[#e2e8f0]' : 'text-gray-600 dark:text-gray-400'}>{label}</span>
                  <span className={`font-medium ${highlight ? 'font-bold text-[#1e3a5f] dark:text-blue-300' : 'text-gray-800 dark:text-[#e2e8f0]'}`}>{val}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-[#1e293b] p-4">
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">2026 Long-Term Capital Gains Rates</p>
            <div className="space-y-1.5 text-sm">
              <div className="flex justify-between"><span className="text-gray-600 dark:text-gray-400">0% rate (Single)</span><span className="font-medium text-gray-800 dark:text-[#e2e8f0]">Up to $48,350</span></div>
              <div className="flex justify-between"><span className="text-gray-600 dark:text-gray-400">15% rate (Single)</span><span className="font-medium text-gray-800 dark:text-[#e2e8f0]">$48,351 – $533,400</span></div>
              <div className="flex justify-between"><span className="text-gray-600 dark:text-gray-400">20% rate (Single)</span><span className="font-medium text-gray-800 dark:text-[#e2e8f0]">Over $533,400</span></div>
            </div>
          </div>

          {holdingSavings > 0 && (
            <div className="rounded-xl bg-green-50 dark:bg-green-950/30 border border-green-100 dark:border-green-900/50 p-4">
              <p className="text-sm font-semibold text-green-800 dark:text-green-300 mb-1">
                Holding Period Benefit
              </p>
              <p className="text-sm text-green-700 dark:text-green-400">
                By holding assets over 1 year (long-term vs short-term), you save approximately{' '}
                <strong>{fmt(holdingSavings)}</strong> in federal capital gains tax.
              </p>
            </div>
          )}
        </div>
      </div>

      <p className="mt-6 text-xs text-gray-400 dark:text-gray-500 leading-relaxed">
        Capital gains tax estimates are for educational purposes based on 2026 tax law. NIIT applies to high-income taxpayers. State capital gains tax uses simplified rate. Consult a tax professional or CPA before making investment decisions. See IRS Publication 550 for official guidance.
      </p>
    </div>
  )
}
