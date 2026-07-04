import type { Metadata } from 'next'
import ToolHeader from '@/components/ToolHeader'
import CapitalGainsCalculatorWrapper from '@/components/CapitalGainsCalculatorWrapper'
import AdBanner from '@/components/AdBanner'
import FAQ from '@/components/FAQ'
import type { FaqItem } from '@/components/FAQ'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Capital Gains Tax Calculator 2026',
  description:
    'Calculate short-term and long-term capital gains tax for 2026. Free capital gains calculator with state tax and net investment income tax.',
  alternates: { canonical: 'https://taxcalculators.app/capital-gains' },
  robots: { index: true, follow: true },
}

const faqs: FaqItem[] = [
  {
    q: 'What is the capital gains tax rate for 2026?',
    a: 'The 2026 long-term capital gains tax rates for single filers are: 0% on gains when total income is up to $48,350; 15% on gains when income is $48,351–$533,400; and 20% on gains when income exceeds $533,400. For married filing jointly: 0% up to $96,700; 15% up to $600,050; 20% above that. Short-term capital gains (assets held under one year) are taxed as ordinary income at your marginal tax bracket rate, which can be as high as 37%. High-income taxpayers also owe the 3.8% Net Investment Income Tax (NIIT).',
  },
  {
    q: 'What is the difference between short-term and long-term capital gains?',
    a: 'Short-term capital gains are profits from assets held for one year or less. These are taxed as ordinary income at your regular federal income tax bracket rates (10%–37%). Long-term capital gains come from assets held longer than one year and qualify for preferential tax rates of 0%, 15%, or 20% depending on your taxable income. The tax savings from holding an investment longer than one year can be substantial — for a taxpayer in the 22% bracket, long-term gains are taxed at just 15%, a savings of 7 percentage points.',
  },
  {
    q: 'How do I avoid capital gains tax on home sale?',
    a: 'Under Section 121 of the tax code, you can exclude up to $250,000 of capital gains from selling your primary residence ($500,000 for married filing jointly). To qualify, you must have owned the home and lived in it as your primary residence for at least 2 of the 5 years before the sale. This exclusion can be used once every 2 years. Any gain above the exclusion amount is taxed as long-term capital gains if you owned the home for more than one year.',
  },
  {
    q: 'What is net investment income tax?',
    a: 'The Net Investment Income Tax (NIIT) is an additional 3.8% tax on investment income for higher earners. It applies to the lesser of: your net investment income (capital gains, dividends, interest, rental income) or the amount by which your modified AGI exceeds the threshold ($200,000 for single filers, $250,000 for married filing jointly in 2026). This means high-income investors may effectively pay 23.8% on long-term capital gains (20% + 3.8% NIIT) or up to 40.8% on short-term gains (37% + 3.8% NIIT).',
  },
  {
    q: 'Can capital losses offset capital gains?',
    a: 'Yes. Capital losses can offset capital gains dollar-for-dollar. Short-term losses first offset short-term gains; long-term losses first offset long-term gains. Net remaining losses can offset the other type. If total capital losses exceed capital gains, you can deduct up to $3,000 of net capital losses against ordinary income per year. Any remaining losses carry forward to future tax years indefinitely. This strategy — called tax-loss harvesting — is commonly used to reduce capital gains tax liability.',
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
  name: 'Capital Gains Tax Calculator 2026',
  url: 'https://taxcalculators.app/capital-gains',
  description: 'Free 2026 capital gains tax calculator with short-term, long-term, NIIT, and state capital gains tax.',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
}

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Calculate Capital Gains Tax',
  step: [
    { '@type': 'HowToStep', name: 'Enter your income and capital gains', text: 'Select your filing status, enter your annual ordinary income, and enter your short-term gains (held under 1 year) and long-term gains (held over 1 year) separately.' },
    { '@type': 'HowToStep', name: 'Add losses and home sale info', text: 'Enter any capital losses to offset gains. Toggle primary residence sale to apply the Section 121 exclusion ($250K single, $500K married).' },
    { '@type': 'HowToStep', name: 'View your capital gains tax', text: 'See short-term tax (at your marginal rate), long-term tax (at preferential rates), NIIT if applicable, and state capital gains tax.' },
  ],
}

const trustSignals = ['📋 2026 Updated', '⚡ Instant', '🔒 Private', '✓ Free']

export default function CapitalGainsPage() {
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
              Capital Gains Tax Calculator 2026
            </h1>
            <p className="text-lg sm:text-xl text-white/80 mb-6 max-w-2xl mx-auto">
              Calculate your 2026 capital gains tax on stocks, real estate, and other investments. See short-term vs long-term rates and how much you save by holding longer.
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
              <CapitalGainsCalculatorWrapper />
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-white dark:from-[#0f172a] to-transparent pointer-events-none" />
      </section>

      <section className="bg-white dark:bg-[#0f172a] pt-6">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="pb-4"><AdBanner slot="2222222222" /></div>
          <div className="rounded-2xl bg-blue-50 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/50 px-6 py-5 mb-10">
            <h2 className="text-base font-bold text-blue-900 dark:text-blue-300 mb-2">Capital gains tax in 2026</h2>
            <p className="text-sm text-blue-800 dark:text-blue-400 leading-relaxed">
              Capital gains tax is one of the most impactful and misunderstood parts of the tax code for investors. In 2026, long-term capital gains on investments held over one year are taxed at preferential 0%, 15%, or 20% rates — significantly lower than ordinary income tax rates. Short-term gains on assets held less than one year are taxed at your ordinary income rate, which can be as high as 37%. High-income investors also owe the 3.8% Net Investment Income Tax (NIIT) on investment income. For home sellers, the Section 121 exclusion allows up to $250,000 (single) or $500,000 (married) of primary residence gains to be tax-free. Strategic tax-loss harvesting — selling losing positions to offset gains — is a key year-end tax planning tool.
            </p>
          </div>
          <div className="pb-10"><FAQ questions={faqs} /></div>
          <div className="pb-6"><AdBanner slot="3333333333" /></div>
        </div>
      </section>

      <Footer />
    </>
  )
}
