import type { Metadata } from 'next'
import ToolHeader from '@/components/ToolHeader'
import IncomeTaxCalculatorWrapper from '@/components/IncomeTaxCalculatorWrapper'
import AdBanner from '@/components/AdBanner'
import FAQ from '@/components/FAQ'
import type { FaqItem } from '@/components/FAQ'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Income Tax Calculator 2026 — Federal Tax Estimate',
  description:
    'Calculate your 2026 federal income tax with updated OBBBA tax brackets. Free income tax calculator with standard deductions, credits and state tax.',
  alternates: { canonical: 'https://taxcalculators.app' },
  robots: { index: true, follow: true },
}

const faqs: FaqItem[] = [
  {
    q: 'How do I calculate my federal income tax for 2026?',
    a: 'To calculate your 2026 federal income tax: (1) Start with your gross income from all sources (wages, salary, self-employment, investments). (2) Subtract above-the-line deductions like 401(k) contributions, IRA contributions, student loan interest, and HSA contributions to get your Adjusted Gross Income (AGI). (3) Subtract your standard deduction ($15,750 for single filers in 2026) or itemized deductions. (4) Apply the 2026 progressive tax brackets to your taxable income. (5) Subtract tax credits like the Child Tax Credit. Our income tax calculator performs all these steps automatically with 2026 One Big Beautiful Bill Act tax law.',
  },
  {
    q: 'What are the 2026 federal income tax brackets?',
    a: 'The 2026 federal income tax brackets for single filers under the One Big Beautiful Bill Act are: 10% on income up to $11,925; 12% on $11,926–$48,475; 22% on $48,476–$103,350; 24% on $103,351–$197,300; 32% on $197,301–$250,525; 35% on $250,526–$626,350; and 37% on income over $626,350. Married filing jointly brackets are roughly double the single brackets. The U.S. uses a progressive tax system, so only the income within each bracket is taxed at that rate.',
  },
  {
    q: 'What is the standard deduction for 2026?',
    a: 'The 2026 standard deductions are: Single filers — $15,750; Married Filing Jointly — $31,500; Head of Household — $23,625; Married Filing Separately — $15,750. Taxpayers age 65 or older receive an additional standard deduction of $2,000 (single) or $1,600 per spouse (married), plus a new $6,000 OBBBA senior bonus deduction. The standard deduction reduces your taxable income dollar-for-dollar and is taken by most taxpayers since it exceeds itemized deductions for the majority of filers.',
  },
  {
    q: 'What changed in the 2026 tax law (OBBBA)?',
    a: 'The One Big Beautiful Bill Act (OBBBA) made several significant changes for 2026: the standard deduction increased substantially (single filers: $15,750, MFJ: $31,500), new senior bonus deduction of $6,000 for taxpayers 65+, the Child Tax Credit increased to $2,200 per qualifying child (up from $2,000), the SALT deduction cap increased to $40,400, and the Social Security wage base for FICA taxes increased to $184,500. These changes affect income tax calculations, paycheck withholding, and tax refunds for 2026 filing.',
  },
  {
    q: 'What is the difference between marginal and effective tax rate?',
    a: 'Your marginal tax rate is the rate applied to your last dollar of taxable income — the highest bracket you reach. Your effective tax rate is your total federal tax divided by your total income — a lower blended average rate. For example, a single filer with $75,000 gross income and $59,250 taxable income has a 22% marginal rate (top bracket reached) but only about a 10-11% effective tax rate because most income is taxed at lower 10% and 12% rates. Understanding this distinction is critical for tax planning and estimating your federal income tax liability.',
  },
]

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
}

const webAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Income Tax Calculator 2026',
  url: 'https://taxcalculators.app',
  description: 'Free 2026 federal income tax calculator with OBBBA tax brackets, standard deduction, credits, and state tax.',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
}

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Calculate Your 2026 Federal Income Tax',
  step: [
    { '@type': 'HowToStep', name: 'Enter your filing status and income', text: 'Select your filing status (Single, Married Jointly, etc.) and enter your gross annual income. Add any above-the-line deductions like 401(k), IRA, student loan interest, and HSA contributions.' },
    { '@type': 'HowToStep', name: 'Choose standard or itemized deduction', text: 'Select the standard deduction ($15,750 for single filers in 2026) or enter your itemized deductions. Add dependents to apply the Child Tax Credit ($2,200 per child).' },
    { '@type': 'HowToStep', name: 'View your federal tax and bracket breakdown', text: 'Your estimated 2026 federal income tax, effective rate, and marginal rate appear instantly. The tax bracket visualization shows exactly how much income falls in each bracket.' },
  ],
}

const trustSignals = ['📋 2026 Updated', '⚡ Instant', '🔒 Private', '✓ Free']

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema).replace(/</g, '\\u003c') }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema).replace(/</g, '\\u003c') }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema).replace(/</g, '\\u003c') }} />

      <section className="relative bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/herobgtc.webp')" }}>
        <div className="absolute inset-0 bg-black/55" />
        <div className="relative z-10 pb-10">
          <ToolHeader />
          <div className="text-center text-white px-4 py-8">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 leading-tight">
              Free Income Tax Calculator 2026
            </h1>
            <p className="text-lg sm:text-xl text-white/80 mb-6 max-w-2xl mx-auto">
              Estimate your 2026 federal income tax using the latest One Big Beautiful Bill Act brackets. Includes standard deduction, credits, and state tax. Instant results.
            </p>
            <div className="flex flex-wrap justify-center gap-3 text-sm">
              {trustSignals.map(t => (
                <span key={t} className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-1.5 text-white font-medium">{t}</span>
              ))}
            </div>
          </div>

          <div className="max-w-4xl mx-auto px-4 mb-4">
            <AdBanner slot="1111111111" />
          </div>

          <div className="max-w-5xl mx-auto px-4">
            <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm shadow-2xl rounded-2xl overflow-hidden">
              <IncomeTaxCalculatorWrapper />
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-white dark:from-[#0f172a] to-transparent pointer-events-none" />
      </section>

      <section className="bg-white dark:bg-[#0f172a] pt-6">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="pb-4">
            <AdBanner slot="2222222222" />
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 mb-10">
            {[
              { icon: '🔒', label: 'Private', sub: 'Calculations stay in your browser' },
              { icon: '⚡', label: 'Instant', sub: 'Results update as you type' },
              { icon: '📋', label: '2026 Updated', sub: 'OBBBA tax law included' },
              { icon: '✓', label: 'Free', sub: 'No signup, no limits' },
            ].map(t => (
              <div key={t.label} className="flex flex-col items-center rounded-xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-[#1e293b] p-4 text-center shadow-sm">
                <span className="text-2xl mb-1">{t.icon}</span>
                <span className="text-sm font-semibold text-gray-800 dark:text-[#e2e8f0]">{t.label}</span>
                <span className="text-xs text-gray-400 mt-0.5">{t.sub}</span>
              </div>
            ))}
          </div>

          <div className="rounded-2xl bg-blue-50 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/50 px-6 py-5 mb-10">
            <h2 className="text-base font-bold text-blue-900 dark:text-blue-300 mb-2">
              How federal income tax works in 2026
            </h2>
            <p className="text-sm text-blue-800 dark:text-blue-400 leading-relaxed">
              The U.S. federal income tax system uses progressive tax brackets — only the income within each bracket is taxed at that rate, not your entire income. For 2026 under the One Big Beautiful Bill Act, the seven tax brackets range from 10% to 37%. Before calculating tax, you reduce your gross income by above-the-line deductions (401k, IRA, HSA, student loan interest) to get your AGI, then subtract your standard deduction or itemized deductions to get taxable income. Credits like the Child Tax Credit ($2,200 per child in 2026) and EITC directly reduce your tax liability. Our income tax calculator performs all these calculations instantly, showing your effective and marginal tax rates alongside a bracket visualization. All calculations run in your browser — your financial data never leaves your device.
            </p>
          </div>

          <div className="pb-10">
            <FAQ questions={faqs} />
          </div>

          <div className="pb-6">
            <AdBanner slot="3333333333" />
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
