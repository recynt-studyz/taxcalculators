import type { Metadata } from 'next'
import ToolHeader from '@/components/ToolHeader'
import StateTaxCalculatorWrapper from '@/components/StateTaxCalculatorWrapper'
import AdBanner from '@/components/AdBanner'
import FAQ from '@/components/FAQ'
import type { FaqItem } from '@/components/FAQ'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Texas Income Tax Calculator 2026',
  description: 'Calculate your Texas state income tax for 2026. Free TX tax calculator with No income tax and combined federal + state income tax estimate.',
  alternates: { canonical: 'https://taxcalculators.app/texas-tax-calculator' },
  robots: { index: true, follow: true },
}

const faqs: FaqItem[] = [
  {
    q: 'What is the Texas income tax rate for 2026?',
    a: 'Texas has no state income tax in 2026 — residents pay zero state income tax on wages, salary, and most investment income. Texas has no state income tax, funded instead by high property taxes and a 6.25% state sales tax (up to 8.25% with local taxes). Texas is one of the top destinations for interstate migration due to its lack of income tax and business-friendly environment.',
  },
  {
    q: 'Does Texas have a standard deduction?',
    a: 'Texas does not have a state income tax standard deduction since there is no state income tax system. The federal standard deduction ($15,750 single, $31,500 MFJ in 2026) still applies to your federal return filed with the IRS.',
  },
  {
    q: 'What taxes do Texas residents pay instead of income tax?',
    a: 'Texas has no state income tax, funded instead by high property taxes and a 6.25% state sales tax (up to 8.25% with local taxes). Texas is one of the top destinations for interstate migration due to its lack of income tax and business-friendly environment. State and local government funding in Texas comes from other sources including sales taxes, property taxes, excise taxes, and in some cases natural resource revenues. Understanding your total tax burden including these taxes gives a complete picture.',
  },
  {
    q: 'Is Texas a good state for high earners from a tax perspective?',
    a: 'Yes — with no state income tax, Texas is very favorable for high earners. A person earning $200,000 saves $8,000-$20,000 per year in state income taxes compared to living in a state with a 4-10% income tax. This makes Texas attractive for executives, business owners, high-income professionals, and retirees relocating from high-tax states.',
  },
  {
    q: 'How do I calculate my combined federal and Texas state income tax?',
    a: 'Use the calculator above. Enter your income and TX is pre-selected as your state. The calculator computes your 2026 federal income tax using the One Big Beautiful Bill Act brackets (10%-37%), adds your estimated Texas state income tax (No income tax simplified), and displays your total tax burden, combined effective rate, and annual take-home pay. All calculations happen instantly in your browser.',
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
  name: 'Texas Income Tax Calculator 2026',
  url: 'https://taxcalculators.app/texas-tax-calculator',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
}

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Calculate Texas State Income Tax',
  step: [
    { '@type': 'HowToStep', name: 'Enter your income and filing status', text: 'Texas is pre-selected as your state. Enter your annual income and select your federal filing status (Single, Married Jointly, Head of Household).' },
    { '@type': 'HowToStep', name: 'View your Texas state tax estimate', text: 'See your estimated Texas state income tax (No income tax), your federal income tax under 2026 OBBBA brackets, and your combined effective tax rate.' },
    { '@type': 'HowToStep', name: 'Compare with other states', text: 'The calculator shows how your Texas tax compares to no-income-tax states and the national average, helping you understand your total tax burden.' },
  ],
}

const trustSignals = ['📋 2026 Updated', '⚡ Instant', '🔒 Private', '✓ Free']

export default function TexasTaxCalculatorPage() {
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
              Texas Income Tax Calculator 2026
            </h1>
            <p className="text-lg sm:text-xl text-white/80 mb-6 max-w-2xl mx-auto">
              Estimate your Texas state income tax plus combined federal and TX state tax for 2026. No income tax.
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
              <StateTaxCalculatorWrapper defaultState="TX" />
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
              Texas State Income Tax 2026
            </h2>
            <p className="text-sm text-blue-800 dark:text-blue-400 leading-relaxed">
              Texas has no state income tax, funded instead by high property taxes and a 6.25% state sales tax (up to 8.25% with local taxes). Texas is one of the top destinations for interstate migration due to its lack of income tax and business-friendly environment. Use the calculator above to estimate your combined federal and Texas state income tax for 2026. State tax figures use a simplified rate — for precise Texas state tax calculations, consult the Texas Department of Revenue or a licensed tax professional.
            </p>
          </div>

          <div className="mb-4 text-center">
            <a href="/state-tax" className="text-sm text-[#1e3a5f] dark:text-blue-400 hover:underline">
              ← Compare all 50 state income tax rates
            </a>
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
