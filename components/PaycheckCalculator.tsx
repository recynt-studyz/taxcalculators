'use client'

import { useState, useEffect } from 'react'
import { STATES, FilingStatus, SS_RATE, SS_WAGE_BASE, MEDICARE_RATE } from '@/lib/taxData'
import { calcFederalWithholding } from '@/lib/taxCalc'

const fmt = (v: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 2 }).format(v)
const fmt0 = (v: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(v)

const PAY_PERIODS: Record<string, number> = {
  weekly: 52,
  biweekly: 26,
  semimonthly: 24,
  monthly: 12,
}

const PAY_PERIOD_LABELS: Record<string, string> = {
  weekly: 'Weekly (52/yr)',
  biweekly: 'Biweekly (26/yr)',
  semimonthly: 'Semimonthly (24/yr)',
  monthly: 'Monthly (12/yr)',
}

const STORAGE_KEY = 'tc-paycheck'

export default function PaycheckCalculator() {
  const [payType, setPayType] = useState<'hourly' | 'salary'>('salary')
  const [hourlyRate, setHourlyRate] = useState('25')
  const [hoursPerWeek, setHoursPerWeek] = useState('40')
  const [annualSalary, setAnnualSalary] = useState('75000')
  const [payFrequency, setPayFrequency] = useState('biweekly')
  const [filingStatus, setFilingStatus] = useState<FilingStatus>('single')
  const [stateCode, setStateCode] = useState('')
  const [contrib401k, setContrib401k] = useState('0')
  const [healthIns, setHealthIns] = useState('0')
  const [fsaHsa, setFsaHsa] = useState('0')
  const [roth401k, setRoth401k] = useState('0')
  const [step3Amount, setStep3Amount] = useState('0')

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        const p = JSON.parse(saved)
        if (p.payType) setPayType(p.payType)
        if (p.hourlyRate) setHourlyRate(p.hourlyRate)
        if (p.hoursPerWeek) setHoursPerWeek(p.hoursPerWeek)
        if (p.annualSalary) setAnnualSalary(p.annualSalary)
        if (p.payFrequency) setPayFrequency(p.payFrequency)
        if (p.filingStatus) setFilingStatus(p.filingStatus)
        if (p.stateCode) setStateCode(p.stateCode)
        if (p.contrib401k) setContrib401k(p.contrib401k)
        if (p.healthIns) setHealthIns(p.healthIns)
        if (p.fsaHsa) setFsaHsa(p.fsaHsa)
        if (p.roth401k) setRoth401k(p.roth401k)
        if (p.step3Amount) setStep3Amount(p.step3Amount)
      }
    } catch { /* ignore */ }
  }, [])

  const save = (updates: Record<string, unknown>) => {
    try {
      const cur = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...cur, ...updates }))
    } catch { /* ignore */ }
  }

  // Derived values
  const periods = PAY_PERIODS[payFrequency] || 26

  let annualGross: number
  if (payType === 'hourly') {
    const hr = parseFloat(hourlyRate) || 0
    const hrs = parseFloat(hoursPerWeek) || 0
    annualGross = hr * hrs * 52
  } else {
    annualGross = parseFloat(annualSalary) || 0
  }

  const grossPay = annualGross / periods

  // Pre-tax deductions per period
  const k401PerPeriod = parseFloat(contrib401k) || 0
  const healthPerPeriod = parseFloat(healthIns) || 0
  const fsaPerPeriod = parseFloat(fsaHsa) || 0
  const preTaxPerPeriod = k401PerPeriod + healthPerPeriod + fsaPerPeriod
  const preTaxAnnual = preTaxPerPeriod * periods

  // Federal withholding
  const step3Annual = parseFloat(step3Amount) || 0
  const federalWithholding = calcFederalWithholding(grossPay, periods, filingStatus, step3Annual, preTaxAnnual)

  // State withholding
  const stateInfo = stateCode ? STATES[stateCode] : null
  const stateWithholding = stateInfo ? grossPay * stateInfo.rate : 0

  // FICA
  const ytdGross = grossPay // simplified — assumes first paycheck
  const ssCapped = Math.min(grossPay, SS_WAGE_BASE / periods)
  const socialSecurity = ssCapped * SS_RATE
  const medicare = grossPay * MEDICARE_RATE

  // Post-tax
  const roth401kPerPeriod = parseFloat(roth401k) || 0

  const totalDeductions = federalWithholding + stateWithholding + socialSecurity + medicare + preTaxPerPeriod + roth401kPerPeriod
  const netPay = grossPay - totalDeductions

  // Annuals
  const annualFederal = federalWithholding * periods
  const annualState = stateWithholding * periods
  const annualSS = socialSecurity * periods
  const annualMedicare = medicare * periods
  const annualNet = netPay * periods

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
        {/* === INPUTS === */}
        <div className="space-y-4">
          {/* Pay type */}
          <div>
            <label className={labelCls}>Pay Type</label>
            <div className="flex rounded-lg overflow-hidden border border-gray-200 dark:border-gray-600">
              {(['salary', 'hourly'] as const).map(pt => (
                <button
                  key={pt}
                  onClick={() => { setPayType(pt); save({ payType: pt }) }}
                  className={`flex-1 py-2 text-sm font-medium transition-colors capitalize ${
                    payType === pt
                      ? 'bg-[#1e3a5f] text-white'
                      : 'bg-white dark:bg-[#1e293b] text-gray-700 dark:text-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {pt}
                </button>
              ))}
            </div>
          </div>

          {payType === 'salary' ? (
            <div>
              <label className={labelCls}>Annual Salary</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
                <input
                  type="number"
                  value={annualSalary}
                  onChange={e => { setAnnualSalary(e.target.value); save({ annualSalary: e.target.value }) }}
                  className={`${inputCls} pl-7`}
                  min="0"
                />
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={labelCls}>Hourly Rate</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
                  <input
                    type="number"
                    value={hourlyRate}
                    onChange={e => { setHourlyRate(e.target.value); save({ hourlyRate: e.target.value }) }}
                    className={`${inputCls} pl-7`}
                    min="0"
                    step="0.25"
                  />
                </div>
              </div>
              <div>
                <label className={labelCls}>Hours/Week</label>
                <input
                  type="number"
                  value={hoursPerWeek}
                  onChange={e => { setHoursPerWeek(e.target.value); save({ hoursPerWeek: e.target.value }) }}
                  className={inputCls}
                  min="0"
                  max="80"
                />
              </div>
            </div>
          )}

          {/* Pay frequency */}
          <div>
            <label className={labelCls}>Pay Frequency</label>
            <select
              value={payFrequency}
              onChange={e => { setPayFrequency(e.target.value); save({ payFrequency: e.target.value }) }}
              className={inputCls}
            >
              {Object.entries(PAY_PERIOD_LABELS).map(([val, label]) => (
                <option key={val} value={val}>{label}</option>
              ))}
            </select>
          </div>

          {/* Filing status */}
          <div>
            <label className={labelCls}>Filing Status (W-4)</label>
            <div className="grid grid-cols-2 gap-2">
              {STATUS_OPTIONS.map(opt => (
                <button
                  key={opt.value}
                  onClick={() => { setFilingStatus(opt.value); save({ filingStatus: opt.value }) }}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    filingStatus === opt.value
                      ? 'bg-[#1e3a5f] text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* State */}
          <div>
            <label className={labelCls}>State</label>
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
                    {!info.hasIncomeTax ? ' — No income tax' : ` — ${(info.rate * 100).toFixed(2)}%`}
                  </option>
                ))}
            </select>
          </div>

          {/* Pre-tax deductions */}
          <div className="rounded-xl border border-gray-100 dark:border-gray-700 p-4 space-y-3">
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">Pre-Tax Deductions (per paycheck)</p>
            {[
              { label: '401(k)', value: contrib401k, setter: setContrib401k, key: 'contrib401k' },
              { label: 'Health Insurance', value: healthIns, setter: setHealthIns, key: 'healthIns' },
              { label: 'FSA / HSA', value: fsaHsa, setter: setFsaHsa, key: 'fsaHsa' },
            ].map(({ label, value, setter, key }) => (
              <div key={key} className="flex items-center gap-3">
                <label className="w-36 text-xs text-gray-600 dark:text-gray-400 shrink-0">{label}</label>
                <div className="relative flex-1">
                  <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400 text-xs">$</span>
                  <input
                    type="number"
                    value={value}
                    onChange={e => { setter(e.target.value); save({ [key]: e.target.value }) }}
                    className="w-full pl-6 pr-2 py-1.5 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-[#1e293b] text-sm focus:outline-none focus:ring-1 focus:ring-[#1e3a5f] text-gray-900 dark:text-[#e2e8f0]"
                    min="0"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Post-tax / W-4 step 3 */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelCls}>Roth 401(k) (per paycheck)</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
                <input type="number" value={roth401k} onChange={e => { setRoth401k(e.target.value); save({ roth401k: e.target.value }) }} className={`${inputCls} pl-7`} min="0" />
              </div>
            </div>
            <div>
              <label className={labelCls}>W-4 Step 3 Credit (annual)</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
                <input type="number" value={step3Amount} onChange={e => { setStep3Amount(e.target.value); save({ step3Amount: e.target.value }) }} className={`${inputCls} pl-7`} min="0" placeholder="e.g. 2200 per child" />
              </div>
            </div>
          </div>
        </div>

        {/* === RESULTS === */}
        <div className="space-y-4">
          {/* Per-paycheck result */}
          <div className="rounded-xl bg-[#1e3a5f]/10 dark:bg-[#1e3a5f]/20 border border-[#1e3a5f]/30 p-5">
            <p className="text-sm text-[#1e3a5f] dark:text-blue-300 font-medium mb-1 capitalize">
              {PAY_PERIOD_LABELS[payFrequency]?.split(' ')[0]} Net Pay
            </p>
            <p className="text-4xl font-bold text-[#1e3a5f] dark:text-blue-200">{fmt(Math.max(0, netPay))}</p>
            <p className="text-xs text-[#1e3a5f]/60 dark:text-blue-400 mt-1">
              Gross: {fmt(grossPay)} · Annual: {fmt0(annualGross)}
            </p>
          </div>

          {/* Per-paycheck breakdown */}
          <div className="rounded-xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-[#1e293b] p-4">
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Per Paycheck Breakdown</p>
            <div className="space-y-2">
              {[
                { label: 'Gross Pay', val: fmt(grossPay), bold: true },
                { label: 'Federal Income Tax', val: `−${fmt(federalWithholding)}`, red: true },
                ...(stateInfo ? [{ label: `${stateInfo.name} State Tax`, val: `−${fmt(stateWithholding)}`, red: true }] : []),
                { label: 'Social Security (6.2%)', val: `−${fmt(socialSecurity)}`, red: true },
                { label: 'Medicare (1.45%)', val: `−${fmt(medicare)}`, red: true },
                ...(k401PerPeriod > 0 ? [{ label: '401(k) Pre-Tax', val: `−${fmt(k401PerPeriod)}` }] : []),
                ...(healthPerPeriod > 0 ? [{ label: 'Health Insurance', val: `−${fmt(healthPerPeriod)}` }] : []),
                ...(fsaPerPeriod > 0 ? [{ label: 'FSA/HSA', val: `−${fmt(fsaPerPeriod)}` }] : []),
                ...(roth401kPerPeriod > 0 ? [{ label: 'Roth 401(k) Post-Tax', val: `−${fmt(roth401kPerPeriod)}` }] : []),
                { label: 'Net Pay', val: fmt(Math.max(0, netPay)), bold: true, highlight: true },
              ].map(({ label, val, bold, highlight, red }) => (
                <div
                  key={label}
                  className={`flex justify-between text-sm ${bold ? 'border-t border-gray-100 dark:border-gray-600 pt-2 mt-1' : ''}`}
                >
                  <span className={bold ? 'font-semibold text-gray-800 dark:text-[#e2e8f0]' : 'text-gray-600 dark:text-gray-400'}>{label}</span>
                  <span className={`font-medium ${highlight ? 'text-[#1e3a5f] dark:text-blue-300 font-bold' : red ? 'text-red-500 dark:text-red-400' : 'text-gray-800 dark:text-[#e2e8f0]'}`}>{val}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Annual summary */}
          <div className="rounded-xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-[#1e293b] p-4">
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Annual Totals</p>
            <div className="space-y-2">
              {[
                { label: 'Annual Gross', val: fmt0(annualGross) },
                { label: 'Federal Income Tax', val: fmt0(annualFederal) },
                ...(stateInfo ? [{ label: `${stateInfo.name} State Tax`, val: fmt0(annualState) }] : []),
                { label: 'Social Security', val: fmt0(annualSS) },
                { label: 'Medicare', val: fmt0(annualMedicare) },
                { label: 'Annual Net Pay', val: fmt0(annualNet), bold: true },
              ].map(({ label, val, bold }) => (
                <div key={label} className={`flex justify-between text-sm ${bold ? 'border-t border-gray-100 dark:border-gray-600 pt-2 mt-1' : ''}`}>
                  <span className={bold ? 'font-semibold text-gray-800 dark:text-[#e2e8f0]' : 'text-gray-600 dark:text-gray-400'}>{label}</span>
                  <span className={`${bold ? 'font-bold text-[#1e3a5f] dark:text-blue-300' : 'font-medium text-gray-800 dark:text-[#e2e8f0]'}`}>{val}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl bg-blue-50 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/50 p-3">
            <p className="text-xs text-blue-800 dark:text-blue-300">
              <strong>2026 FICA:</strong> Social Security at 6.2% on wages up to $184,500. Medicare at 1.45% on all wages. Additional 0.9% Medicare on wages over $200K (single) / $250K (MFJ).
            </p>
          </div>
        </div>
      </div>

      <p className="mt-6 text-xs text-gray-400 dark:text-gray-500 leading-relaxed">
        Paycheck estimates are for educational purposes based on 2026 tax law. Federal withholding uses simplified bracket method. Actual withholding may vary based on W-4 elections and employer payroll systems. Consult your payroll department or a tax professional for precise figures.
      </p>
    </div>
  )
}
