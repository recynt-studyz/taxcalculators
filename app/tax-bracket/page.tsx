import type { Metadata } from 'next'
import ToolHeader from '@/components/ToolHeader'
import TaxBracketCalculatorWrapper from '@/components/TaxBracketCalculatorWrapper'
import AdBanner from '@/components/AdBanner'
import FAQ from '@/components/FAQ'
import type { FaqItem } from '@/components/FAQ'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Tax Bracket Calculator 2026 — Federal Tax Brackets',
  description:
    'See exactly which 2026 federal tax brackets your income falls into. Free tax bracket visualizer showing marginal and effective tax rates.',
  alternates: { canonical: 'https://taxcalculators.app/tax-bracket' },
  robots: { index: true, follow: true },
}

const faqs: FaqItem[] = [
  {
    q: 'What are the 2026 federal tax brackets?',
    a: 'The 2026 federal income tax brackets for single filers under the One Big Beautiful Bill Act are: 10% ($0–$11,925), 12% ($11,926–$48,475), 22% ($48,476–$103,350), 24% ($103,351–$197,300), 32% ($197,301–$250,525), 35% ($250,526–$626,350), and 37% (over $626,350). For married filing jointly, brackets are approximately double: 10% ($0–$23,850), 12% ($23,851–$96,950), 22% ($96,951–$206,700), 24% ($206,701–$394,600), 32% ($394,601–$501,050), 35% ($501,051–$751,600), and 37% (over $751,600).',
  },
  {
    q: 'Does moving into a higher bracket mean all income is taxed at that rate?',
    a: 'No — this is one of the most common tax misconceptions. The U.S. uses a progressive tax system where each bracket only applies to income within that range. If a single filer has $55,000 of taxable income in 2026, only $6,525 is taxed at 22% (the amount above $48,475). The first $11,925 is taxed at 10%, the next $36,550 at 12%, and only the remaining $6,525 at 22%. Their effective tax rate is much lower than 22%.',
  },
  {
    q: 'What is a marginal tax rate?',
    a: 'Your marginal tax rate is the federal income tax rate applied to your last (or next) dollar of taxable income — the highest bracket you reach. It is the rate relevant for decisions about earning additional income, making deductible contributions, or converting a traditional IRA to a Roth IRA. For example, if you are in the 22% bracket, each additional $1,000 of income costs $220 in federal tax, and each additional $1,000 of deductions saves you $220.',
  },
  {
    q: 'What is an effective tax rate?',
    a: 'Your effective tax rate is your total federal income tax divided by your total gross income, expressed as a percentage. It represents the average rate at which all your income is taxed. Because the U.S. uses progressive brackets, your effective rate is always lower than your marginal rate (except at the 10% bracket). The effective rate is useful for comparing your overall tax burden year over year and understanding your true tax cost as a percentage of income.',
  },
  {
    q: 'How do deductions affect which tax bracket I am in?',
    a: 'Deductions reduce your taxable income, which can lower your marginal tax bracket and reduce your tax bill. For example, a single filer with $60,000 gross income is in the 22% bracket with $44,250 taxable income ($60,000 minus $15,750 standard deduction). If they contribute $10,000 to a 401(k), their taxable income drops to $34,250, which is in the 12% bracket. This saves them $750 in federal income tax beyond just the direct deduction benefit, because the marginal rate on that last $10,000 dropped from 22% to 12%.',
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
  name: 'Tax Bracket Calculator 2026',
  url: 'https://taxcalculators.app/tax-bracket',
  description: 'Free 2026 federal tax bracket visualizer showing which brackets your income falls into, marginal rate, and effective rate.',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
}

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Find Your Tax Bracket',
  step: [
    { '@type': 'HowToStep', name: 'Select your filing status', text: 'Choose Single, Married Filing Jointly, Married Filing Separately, or Head of Household. Each filing status has different 2026 tax bracket thresholds.' },
    { '@type': 'HowToStep', name: 'Enter your taxable income', text: 'Enter your taxable income — your gross income minus the standard deduction ($15,750 for single filers) or itemized deductions. The calculator shows all brackets for your filing status.' },
    { '@type': 'HowToStep', name: 'View your bracket breakdown', text: 'See which 2026 tax brackets apply to your income, highlighted in color. The table shows income in each bracket, tax owed, and cumulative tax. Your marginal and effective rates display prominently.' },
  ],
}

const trustSignals = ['📋 2026 Updated', '⚡ Instant', '🔒 Private', '✓ Free']

export default function TaxBracketPage() {
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
              Tax Bracket Calculator 2026
            </h1>
            <p className="text-lg sm:text-xl text-white/80 mb-6 max-w-2xl mx-auto">
              See exactly which 2026 federal tax brackets your income falls into. Visual breakdown of marginal vs effective tax rate.
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
              <TaxBracketCalculatorWrapper />
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-white dark:from-[#0f172a] to-transparent pointer-events-none" />
      </section>

      <section className="bg-white dark:bg-[#0f172a] pt-6">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="pb-4"><AdBanner slot="2222222222" /></div>
          <div className="rounded-2xl bg-blue-50 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/50 px-6 py-5 mb-10">
            <h2 className="text-base font-bold text-blue-900 dark:text-blue-300 mb-2">Understanding 2026 federal tax brackets</h2>
            <p className="text-sm text-blue-800 dark:text-blue-400 leading-relaxed">
              The 2026 federal income tax brackets under the One Big Beautiful Bill Act range from 10% to 37% across seven brackets. The most important thing to understand is that these are marginal brackets — not flat rates on your total income. A single filer earning $100,000 does not pay 22% on all $100,000. They pay 10% on the first $11,925, 12% on the next $36,550, and 22% only on the income above $48,475. This is why your effective tax rate (total tax / total income) is always lower than your marginal rate. Our tax bracket visualizer shows this graphically, helping you understand exactly where each dollar of income falls in the 2026 tax bracket structure.
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
