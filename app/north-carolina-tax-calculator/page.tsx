import type { Metadata } from 'next'
import ToolHeader from '@/components/ToolHeader'
import StateTaxCalculatorWrapper from '@/components/StateTaxCalculatorWrapper'
import AdBanner from '@/components/AdBanner'
import FAQ from '@/components/FAQ'
import type { FaqItem } from '@/components/FAQ'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'North Carolina Income Tax Calculator 2026',
  description: 'Calculate your North Carolina state income tax for 2026. Free NC tax calculator with 4.25% flat rate and combined federal + state income tax estimate.',
  alternates: { canonical: 'https://taxcalculators.app/north-carolina-tax-calculator' },
  robots: { index: true, follow: true },
}

const faqs: FaqItem[] = [
  {
    q: 'What is the North Carolina income tax rate for 2026?',
    a: 'North Carolina has a 4.25% flat rate state income tax for 2026. North Carolina has a flat income tax rate of 4.25% for 2026, continuing annual reductions toward 2.49% by 2030. North Carolina has been among the most aggressive states in cutting income taxes. Social Security is not taxed. The state income tax is calculated separately from federal income tax and is paid through payroll withholding or quarterly estimated payments.',
  },
  {
    q: 'Does North Carolina have a standard deduction?',
    a: 'North Carolina has its own state standard deduction separate from the federal standard deduction ($15,750 single, $31,500 MFJ in 2026). For precise North Carolina state deduction amounts, consult the North Carolina Department of Revenue or a state tax professional.',
  },
  {
    q: 'How does North Carolina income tax compare to other states?',
    a: 'North Carolina\'s 4.25% flat rate state income tax can be compared to other states using our state tax calculator above. The U.S. average top marginal state income tax rate is approximately 5-6%. Nine states have no income tax at all (Alaska, Florida, Nevada, New Hampshire, South Dakota, Tennessee, Texas, Washington, Wyoming), while California has the highest at 13.3%.',
  },
  {
    q: 'Are there North Carolina state tax credits or deductions I should know about?',
    a: 'North Carolina offers state tax credits and deductions that may reduce your state tax liability. Common state credits include earned income credits, child tax credits, and credits for the elderly. Consult the North Carolina Department of Revenue website or a licensed tax professional for credits specific to your situation and income level.',
  },
  {
    q: 'How do I calculate my combined federal and North Carolina state income tax?',
    a: 'Use the calculator above. Enter your income and NC is pre-selected as your state. The calculator computes your 2026 federal income tax using the One Big Beautiful Bill Act brackets (10%-37%), adds your estimated North Carolina state income tax (4.25% flat rate simplified), and displays your total tax burden, combined effective rate, and annual take-home pay. All calculations happen instantly in your browser.',
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
  name: 'North Carolina Income Tax Calculator 2026',
  url: 'https://taxcalculators.app/north-carolina-tax-calculator',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
}

const trustSignals = ['📋 2026 Updated', '⚡ Instant', '🔒 Private', '✓ Free']

export default function NorthCarolinaTaxCalculatorPage() {
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
              North Carolina Income Tax Calculator 2026
            </h1>
            <p className="text-lg sm:text-xl text-white/80 mb-6 max-w-2xl mx-auto">
              Estimate your North Carolina state income tax plus combined federal and NC state tax for 2026. 4.25% flat rate.
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
              <StateTaxCalculatorWrapper defaultState="NC" />
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
              North Carolina State Income Tax 2026
            </h2>
            <p className="text-sm text-blue-800 dark:text-blue-400 leading-relaxed">
              North Carolina has a flat income tax rate of 4.25% for 2026, continuing annual reductions toward 2.49% by 2030. North Carolina has been among the most aggressive states in cutting income taxes. Social Security is not taxed. Use the calculator above to estimate your combined federal and North Carolina state income tax for 2026. State tax figures use a simplified rate — for precise North Carolina state tax calculations, consult the North Carolina Department of Revenue or a licensed tax professional.
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
