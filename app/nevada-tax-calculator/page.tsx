import type { Metadata } from 'next'
import ToolHeader from '@/components/ToolHeader'
import StateTaxCalculatorWrapper from '@/components/StateTaxCalculatorWrapper'
import AdBanner from '@/components/AdBanner'
import FAQ from '@/components/FAQ'
import type { FaqItem } from '@/components/FAQ'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Nevada Income Tax Calculator 2026',
  description: 'Calculate your Nevada state income tax for 2026. Free NV tax calculator with No income tax and combined federal + state income tax estimate.',
  alternates: { canonical: 'https://taxcalculators.app/nevada-tax-calculator' },
  robots: { index: true, follow: true },
}

const faqs: FaqItem[] = [
  {
    q: 'What is the Nevada income tax rate for 2026?',
    a: 'Nevada has no state income tax in 2026 — residents pay zero state income tax on wages, salary, and most investment income. Nevada has no state income tax. Nevada funds state government primarily through gaming taxes and a 6.85% sales tax. Nevada\'s lack of income tax makes it popular for retirees and remote workers relocating from California and other high-tax western states.',
  },
  {
    q: 'Does Nevada have a standard deduction?',
    a: 'Nevada does not have a state income tax standard deduction since there is no state income tax system. The federal standard deduction ($15,750 single, $31,500 MFJ in 2026) still applies to your federal return filed with the IRS.',
  },
  {
    q: 'What taxes do Nevada residents pay instead of income tax?',
    a: 'Nevada has no state income tax. Nevada funds state government primarily through gaming taxes and a 6.85% sales tax. Nevada\'s lack of income tax makes it popular for retirees and remote workers relocating from California and other high-tax western states. State and local government funding in Nevada comes from other sources including sales taxes, property taxes, excise taxes, and in some cases natural resource revenues. Understanding your total tax burden including these taxes gives a complete picture.',
  },
  {
    q: 'Is Nevada a good state for high earners from a tax perspective?',
    a: 'Yes — with no state income tax, Nevada is very favorable for high earners. A person earning $200,000 saves $8,000-$20,000 per year in state income taxes compared to living in a state with a 4-10% income tax. This makes Nevada attractive for executives, business owners, high-income professionals, and retirees relocating from high-tax states.',
  },
  {
    q: 'How do I calculate my combined federal and Nevada state income tax?',
    a: 'Use the calculator above. Enter your income and NV is pre-selected as your state. The calculator computes your 2026 federal income tax using the One Big Beautiful Bill Act brackets (10%-37%), adds your estimated Nevada state income tax (No income tax simplified), and displays your total tax burden, combined effective rate, and annual take-home pay. All calculations happen instantly in your browser.',
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
  name: 'Nevada Income Tax Calculator 2026',
  url: 'https://taxcalculators.app/nevada-tax-calculator',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
}

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Calculate Nevada State Income Tax',
  step: [
    { '@type': 'HowToStep', name: 'Enter your income and filing status', text: 'Nevada is pre-selected as your state. Enter your annual income and select your federal filing status (Single, Married Jointly, Head of Household).' },
    { '@type': 'HowToStep', name: 'View your Nevada state tax estimate', text: 'See your estimated Nevada state income tax (No income tax), your federal income tax under 2026 OBBBA brackets, and your combined effective tax rate.' },
    { '@type': 'HowToStep', name: 'Compare with other states', text: 'The calculator shows how your Nevada tax compares to no-income-tax states and the national average, helping you understand your total tax burden.' },
  ],
}

const trustSignals = ['📋 2026 Updated', '⚡ Instant', '🔒 Private', '✓ Free']

export default function NevadaTaxCalculatorPage() {
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
              Nevada Income Tax Calculator 2026
            </h1>
            <p className="text-lg sm:text-xl text-white/80 mb-6 max-w-2xl mx-auto">
              Estimate your Nevada state income tax plus combined federal and NV state tax for 2026. No income tax.
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
              <StateTaxCalculatorWrapper defaultState="NV" />
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
              Nevada State Income Tax 2026
            </h2>
            <p className="text-sm text-blue-800 dark:text-blue-400 leading-relaxed">
              Nevada has no state income tax. Nevada funds state government primarily through gaming taxes and a 6.85% sales tax. Nevada's lack of income tax makes it popular for retirees and remote workers relocating from California and other high-tax western states. Use the calculator above to estimate your combined federal and Nevada state income tax for 2026. State tax figures use a simplified rate — for precise Nevada state tax calculations, consult the Nevada Department of Revenue or a licensed tax professional.
            </p>
          </div>

          <div className="mb-4 text-center">
            <a href="/state-tax" className="text-sm text-[#1e3a5f] dark:text-blue-400 hover:underline">
              ← Compare all 50 state income tax rates
            </a>
          </div>

          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">How Nevada State Income Tax Works</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Nevada is one of nine states with no state income tax. Residents pay zero state income tax on wages, salary, self-employment income, or most investment income. There is no Nevada state income tax withholding from employee paychecks, no Nevada income tax return to file for wages and salary, and no quarterly estimated state income tax payments required for Nevada-source income.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Nevada residents experience no state income tax withholding from their paychecks — employers only withhold federal income tax and FICA taxes (Social Security and Medicare). There is no Nevada income tax return, no Nevada tax account to manage, and no state income tax compliance burden for most Nevada residents. Filing means one return only: your federal Form 1040 with the IRS.
            </p>
            <div className="bg-gray-100 dark:bg-gray-800 rounded-xl px-4 py-3 mb-4 text-sm font-mono text-gray-800 dark:text-gray-200">
              Income Tax in Nevada = Federal Income Tax only (State Income Tax = $0)
            </div>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Because Nevada residents have no state income tax, the SALT deduction on federal Schedule A for Nevada residents consists primarily of property taxes rather than state income taxes. The $40,400 SALT cap (2026) is therefore less likely to be a binding constraint for Nevada residents compared to high-income-tax states. For Nevada itemizers, deductible SALT is primarily property taxes and potentially general sales taxes.
            </p>
          </div>

          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Worked Example: $75,000 Income in Nevada</h2>
            <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-100 dark:border-amber-900/40 rounded-2xl p-6">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                Jordan is a single filer earning $75,000 in Nevada. Since Nevada has no state income tax, Jordan pays federal income tax only.
              </p>
              <div className="space-y-1 text-sm text-gray-700 dark:text-gray-300 mb-4 font-mono bg-white/60 dark:bg-black/20 rounded-xl px-4 py-3">
                <div>Gross income:                         $75,000</div>
                <div>Federal standard deduction:          -$15,750</div>
                <div>Federal taxable income:               $59,250</div>
                <div>Federal income tax:                    $7,949</div>
                <div>Nevada state income tax:                      $0</div>
                <div className="font-bold pt-1">Total income tax (federal only):          $7,949</div>
                <div>Effective rate:                              10.6%</div>
              </div>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                For comparison, a $75,000 earner in California pays approximately $3,259/year in state income taxes ($271/month extra). In Oregon or Minnesota, state taxes add $3,000-$4,500+/year at this income level. Nevada's zero income tax saves residents these amounts annually, though property taxes, sales taxes, and cost of living differ between states and factor into a complete financial comparison.
              </p>
            </div>
          </div>

          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Key Factors That Affect Your Nevada Tax</h2>
            <ul className="space-y-5">
              <li>
                <p className="font-semibold text-gray-900 dark:text-white mb-1">How Nevada Funds Government Without Income Tax</p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">Nevada funds state services through revenue sources other than income taxes, such as sales taxes, property taxes, excise taxes, and fees. This means Nevada residents avoid the income tax compliance burden entirely for state purposes. However, evaluating your total tax burden in Nevada requires looking at all tax types together — property taxes in some no-income-tax states are among the highest in the nation, and high sales taxes can offset income tax savings for lower-income households.</p>
              </li>
              <li>
                <p className="font-semibold text-gray-900 dark:text-white mb-1">Federal Taxes Are Your Only Income Tax Obligation</p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">As a Nevada resident, your only income tax filing is your federal Form 1040. You use the same 2026 federal brackets (10%-37%), the same standard deduction ($15,750 single, $31,500 MFJ), and the same federal credits as all Americans. Nevada residency does not affect any federal tax calculation. There is no state return to file, no state withholding to reconcile, and no state tax agency interaction for income tax purposes for most Nevada residents.</p>
              </li>
              <li>
                <p className="font-semibold text-gray-900 dark:text-white mb-1">Evaluate Your Complete Tax Burden, Not Just Income Tax</p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">While Nevada's zero income tax is a genuine financial benefit, it is only part of the total tax picture. Property taxes, sales taxes, and the cost of state services vary significantly. When comparing Nevada to states with income tax for financial planning or relocation decisions, factor all major tax types and the cost of living together for the most accurate after-tax comparison at your specific income level and lifestyle.</p>
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
