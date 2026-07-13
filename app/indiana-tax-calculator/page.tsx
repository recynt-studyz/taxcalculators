import type { Metadata } from 'next'
import ToolHeader from '@/components/ToolHeader'
import StateTaxCalculatorWrapper from '@/components/StateTaxCalculatorWrapper'
import AdBanner from '@/components/AdBanner'
import FAQ from '@/components/FAQ'
import type { FaqItem } from '@/components/FAQ'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Indiana Income Tax Calculator 2026',
  description: 'Calculate your Indiana state income tax for 2026. Free IN tax calculator with 3.05% flat rate and combined federal + state income tax estimate.',
  alternates: { canonical: 'https://taxcalculators.app/indiana-tax-calculator' },
  robots: { index: true, follow: true },
}

const faqs: FaqItem[] = [
  {
    q: 'What is the Indiana income tax rate for 2026?',
    a: 'Indiana has a 3.05% flat rate state income tax for 2026. Indiana has a flat income tax rate of 3.05%, one of the lowest flat rates in the nation. Indiana counties also impose local income taxes averaging 1.5-2%, bringing the combined effective rate for most residents to roughly 4.5-5%. The state income tax is calculated separately from federal income tax and is paid through payroll withholding or quarterly estimated payments.',
  },
  {
    q: 'Does Indiana have a standard deduction?',
    a: 'Indiana has its own state standard deduction separate from the federal standard deduction ($15,750 single, $31,500 MFJ in 2026). For precise Indiana state deduction amounts, consult the Indiana Department of Revenue or a state tax professional.',
  },
  {
    q: 'How does Indiana income tax compare to other states?',
    a: 'Indiana\'s 3.05% flat rate state income tax can be compared to other states using our state tax calculator above. The U.S. average top marginal state income tax rate is approximately 5-6%. Nine states have no income tax at all (Alaska, Florida, Nevada, New Hampshire, South Dakota, Tennessee, Texas, Washington, Wyoming), while California has the highest at 13.3%.',
  },
  {
    q: 'Are there Indiana state tax credits or deductions I should know about?',
    a: 'Indiana offers state tax credits and deductions that may reduce your state tax liability. Common state credits include earned income credits, child tax credits, and credits for the elderly. Consult the Indiana Department of Revenue website or a licensed tax professional for credits specific to your situation and income level.',
  },
  {
    q: 'How do I calculate my combined federal and Indiana state income tax?',
    a: 'Use the calculator above. Enter your income and IN is pre-selected as your state. The calculator computes your 2026 federal income tax using the One Big Beautiful Bill Act brackets (10%-37%), adds your estimated Indiana state income tax (3.05% flat rate simplified), and displays your total tax burden, combined effective rate, and annual take-home pay. All calculations happen instantly in your browser.',
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
  name: 'Indiana Income Tax Calculator 2026',
  url: 'https://taxcalculators.app/indiana-tax-calculator',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
}

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Calculate Indiana State Income Tax',
  step: [
    { '@type': 'HowToStep', name: 'Enter your income and filing status', text: 'Indiana is pre-selected as your state. Enter your annual income and select your federal filing status (Single, Married Jointly, Head of Household).' },
    { '@type': 'HowToStep', name: 'View your Indiana state tax estimate', text: 'See your estimated Indiana state income tax (3.05% flat rate), your federal income tax under 2026 OBBBA brackets, and your combined effective tax rate.' },
    { '@type': 'HowToStep', name: 'Compare with other states', text: 'The calculator shows how your Indiana tax compares to no-income-tax states and the national average, helping you understand your total tax burden.' },
  ],
}

const trustSignals = ['📋 2026 Updated', '⚡ Instant', '🔒 Private', '✓ Free']

export default function IndianaTaxCalculatorPage() {
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
              Indiana Income Tax Calculator 2026
            </h1>
            <p className="text-lg sm:text-xl text-white/80 mb-6 max-w-2xl mx-auto">
              Estimate your Indiana state income tax plus combined federal and IN state tax for 2026. 3.05% flat rate.
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
              <StateTaxCalculatorWrapper defaultState="IN" />
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
              Indiana State Income Tax 2026
            </h2>
            <p className="text-sm text-blue-800 dark:text-blue-400 leading-relaxed">
              Indiana has a flat income tax rate of 3.05%, one of the lowest flat rates in the nation. Indiana counties also impose local income taxes averaging 1.5-2%, bringing the combined effective rate for most residents to roughly 4.5-5%. Use the calculator above to estimate your combined federal and Indiana state income tax for 2026. State tax figures use a simplified rate — for precise Indiana state tax calculations, consult the Indiana Department of Revenue or a licensed tax professional.
            </p>
          </div>

          <div className="mb-4 text-center">
            <a href="/state-tax" className="text-sm text-[#1e3a5f] dark:text-blue-400 hover:underline">
              ← Compare all 50 state income tax rates
            </a>
          </div>

          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">How Indiana State Income Tax Works</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Indiana uses a 3.05% flat rate state income tax structure. Like most states, Indiana starts its calculation from your federal Adjusted Gross Income (AGI), then applies state-specific adjustments — subtracting income Indiana excludes from taxation (such as certain pension or Social Security income) and adding back any income Indiana taxes that the federal government does not. After adjustments, the Indiana standard deduction is applied, then the 3.05% flat rate is applied to arrive at state taxable income.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Indiana income tax is collected through employer paycheck withholding for W-2 employees and through quarterly estimated payments for self-employed residents and those with significant non-wage income. The Indiana state return is generally due April 15, aligned with federal returns. Part-year residents and nonresidents who earn income sourced in Indiana must also file a Indiana return for that income portion.
            </p>
            <div className="bg-gray-100 dark:bg-gray-800 rounded-xl px-4 py-3 mb-4 text-sm font-mono text-gray-800 dark:text-gray-200">
              State Tax = (Indiana taxable income) x 3.05% flat rate - State credits
            </div>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Your Indiana state income taxes are deductible on your federal Schedule A as part of the SALT (State and Local Tax) deduction, capped at $40,400 in 2026 under OBBBA. At the 22% federal bracket, paying $1,807 in Indiana state income tax generates approximately $397 in federal tax savings, reducing the true net cost of your Indiana taxes to about $1,410 for itemizing taxpayers.
            </p>
          </div>

          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Worked Example: $75,000 Income in Indiana</h2>
            <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-100 dark:border-amber-900/40 rounded-2xl p-6">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                Jordan is a single filer earning $75,000 in Indiana. This shows how federal and Indiana state income tax are calculated together.
              </p>
              <div className="space-y-1 text-sm text-gray-700 dark:text-gray-300 mb-4 font-mono bg-white/60 dark:bg-black/20 rounded-xl px-4 py-3">
                <div>Gross income:                         $75,000</div>
                <div>Federal standard deduction:          -$15,750</div>
                <div>Federal taxable income:               $59,250</div>
                <div>Federal income tax:                    $7,949</div>
                <div>Indiana state tax (at 3.05% flat rate):  $1,807</div>
                <div className="font-bold pt-1">Total (federal + Indiana state):        $9,756</div>
                <div>Combined effective rate:                13.0%</div>
              </div>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Moving to a no-income-tax state (Texas, Florida, Nevada, or Wyoming) would save Jordan approximately $1,807/year ($150/month) in state income taxes. However, no-income-tax states often fund services through higher property taxes, sales taxes, or other fees, so a complete comparison requires evaluating all taxes together, not just income tax.
              </p>
            </div>
          </div>

          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Key Factors That Affect Your Indiana Tax</h2>
            <ul className="space-y-5">
              <li>
                <p className="font-semibold text-gray-900 dark:text-white mb-1">Indiana Tax Rate and Annual Filing</p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">Indiana residents earning above the state filing threshold must file a Indiana income tax return annually, typically due April 15. The 3.05% flat rate applies after Indiana-specific deductions and any state tax credits. Employers withhold Indiana state income tax from employee paychecks throughout the year using Indiana withholding tables, and any balance owed or refund due is settled when the annual state return is filed. Self-employed Indiana residents make quarterly estimated payments to the state in addition to their federal quarterly estimated tax payments.</p>
              </li>
              <li>
                <p className="font-semibold text-gray-900 dark:text-white mb-1">Federal SALT Deduction Reduces Net State Tax Cost</p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">State income taxes paid in Indiana reduce your federal taxable income through the SALT deduction (capped at $40,400 in 2026 under OBBBA). For a Indiana resident in the 22% federal bracket paying $1,807 in state income tax, the SALT deduction recovers approximately $397 in federal taxes, so the true after-federal-benefit cost of Indiana state income tax is about $1,410. This offset only benefits taxpayers who itemize deductions on federal Schedule A rather than taking the standard deduction.</p>
              </li>
              <li>
                <p className="font-semibold text-gray-900 dark:text-white mb-1">Total Tax Burden: State Income Tax Is One Piece</p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">State income tax is one component of your total tax burden in Indiana. Property taxes, local income taxes (in some Indiana cities and counties), and state and local sales taxes also contribute to your overall cost of living. When comparing Indiana to other states, evaluate all tax types together rather than income tax in isolation. Use the calculator above to see your combined federal and Indiana state effective rate at your specific income level.</p>
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
