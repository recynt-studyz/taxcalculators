import type { Metadata } from 'next'
import ToolHeader from '@/components/ToolHeader'
import StateTaxCalculatorWrapper from '@/components/StateTaxCalculatorWrapper'
import AdBanner from '@/components/AdBanner'
import FAQ from '@/components/FAQ'
import type { FaqItem } from '@/components/FAQ'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Colorado Income Tax Calculator 2026',
  description: 'Calculate your Colorado state income tax for 2026. Free CO tax calculator with 4.4% flat rate and combined federal + state income tax estimate.',
  alternates: { canonical: 'https://taxcalculators.app/colorado-tax-calculator' },
  robots: { index: true, follow: true },
}

const faqs: FaqItem[] = [
  {
    q: 'What is the Colorado income tax rate for 2026?',
    a: 'Colorado has a 4.4% flat rate state income tax for 2026. Colorado has a flat income tax rate of 4.4% on all taxable income. Colorado\'s TABOR (Taxpayer\'s Bill of Rights) limits state revenue growth and can result in refunds to taxpayers. Colorado recently reduced its flat rate from 4.55%. The state income tax is calculated separately from federal income tax and is paid through payroll withholding or quarterly estimated payments.',
  },
  {
    q: 'Does Colorado have a standard deduction?',
    a: 'Colorado has its own state standard deduction separate from the federal standard deduction ($15,750 single, $31,500 MFJ in 2026). For precise Colorado state deduction amounts, consult the Colorado Department of Revenue or a state tax professional.',
  },
  {
    q: 'How does Colorado income tax compare to other states?',
    a: 'Colorado\'s 4.4% flat rate state income tax can be compared to other states using our state tax calculator above. The U.S. average top marginal state income tax rate is approximately 5-6%. Nine states have no income tax at all (Alaska, Florida, Nevada, New Hampshire, South Dakota, Tennessee, Texas, Washington, Wyoming), while California has the highest at 13.3%.',
  },
  {
    q: 'Are there Colorado state tax credits or deductions I should know about?',
    a: 'Colorado offers state tax credits and deductions that may reduce your state tax liability. Common state credits include earned income credits, child tax credits, and credits for the elderly. Consult the Colorado Department of Revenue website or a licensed tax professional for credits specific to your situation and income level.',
  },
  {
    q: 'How do I calculate my combined federal and Colorado state income tax?',
    a: 'Use the calculator above. Enter your income and CO is pre-selected as your state. The calculator computes your 2026 federal income tax using the One Big Beautiful Bill Act brackets (10%-37%), adds your estimated Colorado state income tax (4.4% flat rate simplified), and displays your total tax burden, combined effective rate, and annual take-home pay. All calculations happen instantly in your browser.',
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
  name: 'Colorado Income Tax Calculator 2026',
  url: 'https://taxcalculators.app/colorado-tax-calculator',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
}

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Calculate Colorado State Income Tax',
  step: [
    { '@type': 'HowToStep', name: 'Enter your income and filing status', text: 'Colorado is pre-selected as your state. Enter your annual income and select your federal filing status (Single, Married Jointly, Head of Household).' },
    { '@type': 'HowToStep', name: 'View your Colorado state tax estimate', text: 'See your estimated Colorado state income tax (4.4% flat rate), your federal income tax under 2026 OBBBA brackets, and your combined effective tax rate.' },
    { '@type': 'HowToStep', name: 'Compare with other states', text: 'The calculator shows how your Colorado tax compares to no-income-tax states and the national average, helping you understand your total tax burden.' },
  ],
}

const trustSignals = ['📋 2026 Updated', '⚡ Instant', '🔒 Private', '✓ Free']

export default function ColoradoTaxCalculatorPage() {
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
              Colorado Income Tax Calculator 2026
            </h1>
            <p className="text-lg sm:text-xl text-white/80 mb-6 max-w-2xl mx-auto">
              Estimate your Colorado state income tax plus combined federal and CO state tax for 2026. 4.4% flat rate.
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
              <StateTaxCalculatorWrapper defaultState="CO" />
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
              Colorado State Income Tax 2026
            </h2>
            <p className="text-sm text-blue-800 dark:text-blue-400 leading-relaxed">
              Colorado has a flat income tax rate of 4.4% on all taxable income. Colorado's TABOR (Taxpayer's Bill of Rights) limits state revenue growth and can result in refunds to taxpayers. Colorado recently reduced its flat rate from 4.55%. Use the calculator above to estimate your combined federal and Colorado state income tax for 2026. State tax figures use a simplified rate — for precise Colorado state tax calculations, consult the Colorado Department of Revenue or a licensed tax professional.
            </p>
          </div>

          <div className="mb-4 text-center">
            <a href="/state-tax" className="text-sm text-[#1e3a5f] dark:text-blue-400 hover:underline">
              ← Compare all 50 state income tax rates
            </a>
          </div>

          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">How Colorado State Income Tax Works</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Colorado uses a 4.4% flat rate state income tax structure. Like most states, Colorado starts its calculation from your federal Adjusted Gross Income (AGI), then applies state-specific adjustments — subtracting income Colorado excludes from taxation (such as certain pension or Social Security income) and adding back any income Colorado taxes that the federal government does not. After adjustments, the Colorado standard deduction is applied, then the 4.4% flat rate is applied to arrive at state taxable income.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Colorado income tax is collected through employer paycheck withholding for W-2 employees and through quarterly estimated payments for self-employed residents and those with significant non-wage income. The Colorado state return is generally due April 15, aligned with federal returns. Part-year residents and nonresidents who earn income sourced in Colorado must also file a Colorado return for that income portion.
            </p>
            <div className="bg-gray-100 dark:bg-gray-800 rounded-xl px-4 py-3 mb-4 text-sm font-mono text-gray-800 dark:text-gray-200">
              State Tax = (Colorado taxable income) x 4.4% flat rate - State credits
            </div>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Your Colorado state income taxes are deductible on your federal Schedule A as part of the SALT (State and Local Tax) deduction, capped at $40,400 in 2026 under OBBBA. At the 22% federal bracket, paying $2,607 in Colorado state income tax generates approximately $573 in federal tax savings, reducing the true net cost of your Colorado taxes to about $2,034 for itemizing taxpayers.
            </p>
          </div>

          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Worked Example: $75,000 Income in Colorado</h2>
            <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-100 dark:border-amber-900/40 rounded-2xl p-6">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                Jordan is a single filer earning $75,000 in Colorado. This shows how federal and Colorado state income tax are calculated together.
              </p>
              <div className="space-y-1 text-sm text-gray-700 dark:text-gray-300 mb-4 font-mono bg-white/60 dark:bg-black/20 rounded-xl px-4 py-3">
                <div>Gross income:                         $75,000</div>
                <div>Federal standard deduction:          -$15,750</div>
                <div>Federal taxable income:               $59,250</div>
                <div>Federal income tax:                    $7,949</div>
                <div>Colorado state tax (at 4.4% flat rate):  $2,607</div>
                <div className="font-bold pt-1">Total (federal + Colorado state):        $10,556</div>
                <div>Combined effective rate:                14.1%</div>
              </div>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Moving to a no-income-tax state (Texas, Florida, Nevada, or Wyoming) would save Jordan approximately $2,607/year ($217/month) in state income taxes. However, no-income-tax states often fund services through higher property taxes, sales taxes, or other fees, so a complete comparison requires evaluating all taxes together, not just income tax.
              </p>
            </div>
          </div>

          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Key Factors That Affect Your Colorado Tax</h2>
            <ul className="space-y-5">
              <li>
                <p className="font-semibold text-gray-900 dark:text-white mb-1">Colorado Tax Rate and Annual Filing</p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">Colorado residents earning above the state filing threshold must file a Colorado income tax return annually, typically due April 15. The 4.4% flat rate applies after Colorado-specific deductions and any state tax credits. Employers withhold Colorado state income tax from employee paychecks throughout the year using Colorado withholding tables, and any balance owed or refund due is settled when the annual state return is filed. Self-employed Colorado residents make quarterly estimated payments to the state in addition to their federal quarterly estimated tax payments.</p>
              </li>
              <li>
                <p className="font-semibold text-gray-900 dark:text-white mb-1">Federal SALT Deduction Reduces Net State Tax Cost</p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">State income taxes paid in Colorado reduce your federal taxable income through the SALT deduction (capped at $40,400 in 2026 under OBBBA). For a Colorado resident in the 22% federal bracket paying $2,607 in state income tax, the SALT deduction recovers approximately $573 in federal taxes, so the true after-federal-benefit cost of Colorado state income tax is about $2,034. This offset only benefits taxpayers who itemize deductions on federal Schedule A rather than taking the standard deduction.</p>
              </li>
              <li>
                <p className="font-semibold text-gray-900 dark:text-white mb-1">Total Tax Burden: State Income Tax Is One Piece</p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">State income tax is one component of your total tax burden in Colorado. Property taxes, local income taxes (in some Colorado cities and counties), and state and local sales taxes also contribute to your overall cost of living. When comparing Colorado to other states, evaluate all tax types together rather than income tax in isolation. Use the calculator above to see your combined federal and Colorado state effective rate at your specific income level.</p>
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
