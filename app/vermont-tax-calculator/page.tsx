import type { Metadata } from 'next'
import ToolHeader from '@/components/ToolHeader'
import StateTaxCalculatorWrapper from '@/components/StateTaxCalculatorWrapper'
import AdBanner from '@/components/AdBanner'
import FAQ from '@/components/FAQ'
import type { FaqItem } from '@/components/FAQ'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Vermont Income Tax Calculator 2026',
  description: 'Calculate your Vermont state income tax for 2026. Free VT tax calculator with 8.75% top rate and combined federal + state income tax estimate.',
  alternates: { canonical: 'https://taxcalculators.app/vermont-tax-calculator' },
  robots: { index: true, follow: true },
}

const faqs: FaqItem[] = [
  {
    q: 'What is the Vermont income tax rate for 2026?',
    a: 'Vermont has a 8.75% top rate state income tax for 2026. Vermont has progressive income tax from 3.35% to 8.75%, with the top rate on income over $229,550 (single). Vermont taxes Social Security benefits with exemptions for lower-income residents. Vermont offers a renter rebate credit for qualifying lower-income renters. The state income tax is calculated separately from federal income tax and is paid through payroll withholding or quarterly estimated payments.',
  },
  {
    q: 'Does Vermont have a standard deduction?',
    a: 'Vermont has its own state standard deduction separate from the federal standard deduction ($15,750 single, $31,500 MFJ in 2026). For precise Vermont state deduction amounts, consult the Vermont Department of Revenue or a state tax professional.',
  },
  {
    q: 'How does Vermont income tax compare to other states?',
    a: 'Vermont\'s 8.75% top rate state income tax can be compared to other states using our state tax calculator above. The U.S. average top marginal state income tax rate is approximately 5-6%. Nine states have no income tax at all (Alaska, Florida, Nevada, New Hampshire, South Dakota, Tennessee, Texas, Washington, Wyoming), while California has the highest at 13.3%.',
  },
  {
    q: 'Are there Vermont state tax credits or deductions I should know about?',
    a: 'Vermont offers state tax credits and deductions that may reduce your state tax liability. Common state credits include earned income credits, child tax credits, and credits for the elderly. Consult the Vermont Department of Revenue website or a licensed tax professional for credits specific to your situation and income level.',
  },
  {
    q: 'How do I calculate my combined federal and Vermont state income tax?',
    a: 'Use the calculator above. Enter your income and VT is pre-selected as your state. The calculator computes your 2026 federal income tax using the One Big Beautiful Bill Act brackets (10%-37%), adds your estimated Vermont state income tax (8.75% top rate simplified), and displays your total tax burden, combined effective rate, and annual take-home pay. All calculations happen instantly in your browser.',
  },
]

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map(f => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
}

const webAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Vermont Income Tax Calculator 2026',
  url: 'https://taxcalculators.app/vermont-tax-calculator',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
}

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Calculate Vermont State Income Tax',
  step: [
    { '@type': 'HowToStep', name: 'Enter your income and filing status', text: 'Vermont is pre-selected as your state. Enter your annual income and select your federal filing status (Single, Married Jointly, Head of Household).' },
    { '@type': 'HowToStep', name: 'View your Vermont state tax estimate', text: 'See your estimated Vermont state income tax (8.75% top rate), your federal income tax under 2026 OBBBA brackets, and your combined effective tax rate.' },
    { '@type': 'HowToStep', name: 'Compare with other states', text: 'The calculator shows how your Vermont tax compares to no-income-tax states and the national average, helping you understand your total tax burden.' },
  ],
}

const trustSignals = ['📋 2026 Updated', '⚡ Instant', '🔒 Private', '✓ Free']

export default function VermontTaxCalculatorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema).replace(/</g, '\\u003c') }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema).replace(/</g, '\\u003c') }} />

      <section className="relative bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/herobgtc.webp')" }}>
        <div className="absolute inset-0 bg-black/55" />
        <div className="relative z-10 pb-10">
          <ToolHeader />
          <div className="text-center text-white px-4 py-8">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 leading-tight">
              Vermont Income Tax Calculator 2026
            </h1>
            <p className="text-lg sm:text-xl text-white/80 mb-6 max-w-2xl mx-auto">
              Estimate your Vermont state income tax plus combined federal and VT state tax for 2026. 8.75% top rate.
            </p>
            <div className="flex flex-wrap justify-center gap-3 text-sm">
              {trustSignals.map(t => (
                <span key={t} className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-1.5 text-white font-medium">{t}</span>
              ))}
            </div>
          </div>
          <div className="max-w-4xl mx-auto px-4 mb-4"><AdBanner slot="1111111111" /></div>
          <div className="max-w-5xl mx-auto px-4">
            <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm shadow-2xl rounded-2xl overflow-hidden">
              <StateTaxCalculatorWrapper defaultState="VT" />
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-white dark:from-[#0f172a] to-transparent pointer-events-none" />
      </section>

      <section className="bg-white dark:bg-[#0f172a] pt-6">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="pb-4"><AdBanner slot="2222222222" /></div>

          <div className="rounded-2xl bg-blue-50 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/50 px-6 py-5 mb-10">
            <h2 className="text-base font-bold text-blue-900 dark:text-blue-300 mb-2">
              Vermont State Income Tax 2026
            </h2>
            <p className="text-sm text-blue-800 dark:text-blue-400 leading-relaxed">
              Vermont has progressive income tax from 3.35% to 8.75%, with the top rate on income over $229,550 (single). Vermont taxes Social Security benefits with exemptions for lower-income residents. Vermont offers a renter rebate credit for qualifying lower-income renters. Use the calculator above to estimate your combined federal and Vermont state income tax for 2026. State tax figures use a simplified rate — for precise Vermont state tax calculations, consult the Vermont Department of Revenue or a licensed tax professional.
            </p>
          </div>

          <div className="mb-4 text-center">
            <a href="/state-tax" className="text-sm text-[#1e3a5f] dark:text-blue-400 hover:underline">
              ← Compare all 50 state income tax rates
            </a>
          </div>

          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">How Vermont State Income Tax Works</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Vermont uses a 8.75% top rate state income tax structure. Like most states, Vermont starts its calculation from your federal Adjusted Gross Income (AGI), then applies state-specific adjustments — subtracting income Vermont excludes from taxation (such as certain pension or Social Security income) and adding back any income Vermont taxes that the federal government does not. After adjustments, the Vermont standard deduction is applied, then the 8.75% top rate is applied to arrive at state taxable income.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Vermont income tax is collected through employer paycheck withholding for W-2 employees and through quarterly estimated payments for self-employed residents and those with significant non-wage income. The Vermont state return is generally due April 15, aligned with federal returns. Part-year residents and nonresidents who earn income sourced in Vermont must also file a Vermont return for that income portion.
            </p>
            <div className="bg-gray-100 dark:bg-gray-800 rounded-xl px-4 py-3 mb-4 text-sm font-mono text-gray-800 dark:text-gray-200">
              State Tax = (Vermont taxable income) x 8.75% top rate - State credits
            </div>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Your Vermont state income taxes are deductible on your federal Schedule A as part of the SALT (State and Local Tax) deduction, capped at $40,400 in 2026 under OBBBA. At the 22% federal bracket, paying $2,844 in Vermont state income tax generates approximately $625 in federal tax savings, reducing the true net cost of your Vermont taxes to about $2,219 for itemizing taxpayers.
            </p>
          </div>

          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Worked Example: $75,000 Income in Vermont</h2>
            <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-100 dark:border-amber-900/40 rounded-2xl p-6">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                Jordan is a single filer earning $75,000 in Vermont. This shows how federal and Vermont state income tax are calculated together.
              </p>
              <div className="space-y-1 text-sm text-gray-700 dark:text-gray-300 mb-4 font-mono bg-white/60 dark:bg-black/20 rounded-xl px-4 py-3">
                <div>Gross income:                         $75,000</div>
                <div>Federal standard deduction:          -$15,750</div>
                <div>Federal taxable income:               $59,250</div>
                <div>Federal income tax:                    $7,949</div>
                <div>Vermont state tax (estimated 4.8% effective rate (top bracket: 8.75%)):  $2,844</div>
                <div className="font-bold pt-1">Total (federal + Vermont state):        $10,793</div>
                <div>Combined effective rate:                14.4%</div>
              </div>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Moving to a no-income-tax state (Texas, Florida, Nevada, or Wyoming) would save Jordan approximately $2,844/year ($237/month) in state income taxes. However, no-income-tax states often fund services through higher property taxes, sales taxes, or other fees, so a complete comparison requires evaluating all taxes together, not just income tax.
              </p>
            </div>
          </div>

          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Key Factors That Affect Your Vermont Tax</h2>
            <ul className="space-y-5">
              <li>
                <p className="font-semibold text-gray-900 dark:text-white mb-1">Vermont Tax Rate and Annual Filing</p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">Vermont residents earning above the state filing threshold must file a Vermont income tax return annually, typically due April 15. The 8.75% top rate applies after Vermont-specific deductions and any state tax credits. Employers withhold Vermont state income tax from employee paychecks throughout the year using Vermont withholding tables, and any balance owed or refund due is settled when the annual state return is filed. Self-employed Vermont residents make quarterly estimated payments to the state in addition to their federal quarterly estimated tax payments.</p>
              </li>
              <li>
                <p className="font-semibold text-gray-900 dark:text-white mb-1">Federal SALT Deduction Reduces Net State Tax Cost</p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">State income taxes paid in Vermont reduce your federal taxable income through the SALT deduction (capped at $40,400 in 2026 under OBBBA). For a Vermont resident in the 22% federal bracket paying $2,844 in state income tax, the SALT deduction recovers approximately $625 in federal taxes, so the true after-federal-benefit cost of Vermont state income tax is about $2,219. This offset only benefits taxpayers who itemize deductions on federal Schedule A rather than taking the standard deduction.</p>
              </li>
              <li>
                <p className="font-semibold text-gray-900 dark:text-white mb-1">Total Tax Burden: State Income Tax Is One Piece</p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">State income tax is one component of your total tax burden in Vermont. Property taxes, local income taxes (in some Vermont cities and counties), and state and local sales taxes also contribute to your overall cost of living. When comparing Vermont to other states, evaluate all tax types together rather than income tax in isolation. Use the calculator above to see your combined federal and Vermont state effective rate at your specific income level.</p>
              </li>
            </ul>
          </div>

          <div className="pb-10">
            <FAQ questions={faqs} />
          </div>

          <div className="pb-6"><AdBanner slot="3333333333" /></div>
        </div>
      </section>

      <Footer />
    </>
  )
}
