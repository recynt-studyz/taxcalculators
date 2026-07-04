import type { Metadata } from 'next'
import ToolHeader from '@/components/ToolHeader'
import StateTaxCalculatorWrapper from '@/components/StateTaxCalculatorWrapper'
import AdBanner from '@/components/AdBanner'
import FAQ from '@/components/FAQ'
import type { FaqItem } from '@/components/FAQ'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Florida Income Tax Calculator 2026',
  description: 'Calculate your Florida state income tax for 2026. Free FL tax calculator with No income tax and combined federal + state income tax estimate.',
  alternates: { canonical: 'https://taxcalculators.app/florida-tax-calculator' },
  robots: { index: true, follow: true },
}

const faqs: FaqItem[] = [
  {
    q: 'What is the Florida income tax rate for 2026?',
    a: 'Florida has no state income tax in 2026 — residents pay zero state income tax on wages, salary, and most investment income. Florida has no state income tax, making it one of the most tax-friendly states. Florida funds state services primarily through sales tax (6% base rate). Florida\'s lack of income tax is a major draw for retirees and high-income earners relocating from high-tax states like New York and California.',
  },
  {
    q: 'Does Florida have a standard deduction?',
    a: 'Florida does not have a state income tax standard deduction since there is no state income tax system. The federal standard deduction ($15,750 single, $31,500 MFJ in 2026) still applies to your federal return filed with the IRS.',
  },
  {
    q: 'What taxes do Florida residents pay instead of income tax?',
    a: 'Florida has no state income tax, making it one of the most tax-friendly states. Florida funds state services primarily through sales tax (6% base rate). Florida\'s lack of income tax is a major draw for retirees and high-income earners relocating from high-tax states like New York and California. State and local government funding in Florida comes from other sources including sales taxes, property taxes, excise taxes, and in some cases natural resource revenues. Understanding your total tax burden including these taxes gives a complete picture.',
  },
  {
    q: 'Is Florida a good state for high earners from a tax perspective?',
    a: 'Yes — with no state income tax, Florida is very favorable for high earners. A person earning $200,000 saves $8,000-$20,000 per year in state income taxes compared to living in a state with a 4-10% income tax. This makes Florida attractive for executives, business owners, high-income professionals, and retirees relocating from high-tax states.',
  },
  {
    q: 'How do I calculate my combined federal and Florida state income tax?',
    a: 'Use the calculator above. Enter your income and FL is pre-selected as your state. The calculator computes your 2026 federal income tax using the One Big Beautiful Bill Act brackets (10%-37%), adds your estimated Florida state income tax (No income tax simplified), and displays your total tax burden, combined effective rate, and annual take-home pay. All calculations happen instantly in your browser.',
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
  name: 'Florida Income Tax Calculator 2026',
  url: 'https://taxcalculators.app/florida-tax-calculator',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
}

const trustSignals = ['📋 2026 Updated', '⚡ Instant', '🔒 Private', '✓ Free']

export default function FloridaTaxCalculatorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema).replace(/</g, '\\u003c') }} />

      <section className="relative bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/herobgtc.webp')" }}>
        <div className="absolute inset-0 bg-black/55" />
        <div className="relative z-10 pb-10">
          <ToolHeader />
          <div className="text-center text-white px-4 py-8">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 leading-tight">
              Florida Income Tax Calculator 2026
            </h1>
            <p className="text-lg sm:text-xl text-white/80 mb-6 max-w-2xl mx-auto">
              Estimate your Florida state income tax plus combined federal and FL state tax for 2026. No income tax.
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
              <StateTaxCalculatorWrapper defaultState="FL" />
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
              Florida State Income Tax 2026
            </h2>
            <p className="text-sm text-blue-800 dark:text-blue-400 leading-relaxed">
              Florida has no state income tax, making it one of the most tax-friendly states. Florida funds state services primarily through sales tax (6% base rate). Florida's lack of income tax is a major draw for retirees and high-income earners relocating from high-tax states like New York and California. Use the calculator above to estimate your combined federal and Florida state income tax for 2026. State tax figures use a simplified rate — for precise Florida state tax calculations, consult the Florida Department of Revenue or a licensed tax professional.
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
