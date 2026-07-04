import type { Metadata } from 'next'
import ToolHeader from '@/components/ToolHeader'
import StateTaxCalculatorWrapper from '@/components/StateTaxCalculatorWrapper'
import AdBanner from '@/components/AdBanner'
import FAQ from '@/components/FAQ'
import type { FaqItem } from '@/components/FAQ'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'State Income Tax Calculator 2026 — All 50 States',
  description:
    'Calculate state income tax for all 50 states in 2026. Free state tax calculator showing rates, estimates and comparison with no-tax states.',
  alternates: { canonical: 'https://taxcalculators.app/state-tax' },
  robots: { index: true, follow: true },
}

const faqs: FaqItem[] = [
  {
    q: 'Which states have no income tax?',
    a: 'Nine states have no state income tax as of 2026: Alaska, Florida, Nevada, New Hampshire, South Dakota, Tennessee, Texas, Washington, and Wyoming. Residents of these states pay no state income tax on wages and salary. However, some of these states have higher property taxes or sales taxes to compensate. New Hampshire taxes interest and dividend income at 3% (though this is being phased out). Washington imposes a capital gains tax on gains over $250,000.',
  },
  {
    q: 'How do state income taxes work?',
    a: 'Most states with income taxes use progressive tax brackets similar to the federal system, though some states use a flat rate. State income tax is calculated separately from federal income tax, typically starting with your federal AGI or taxable income and applying state-specific adjustments. State taxes are paid through payroll withholding (employer deducts state tax each paycheck) or quarterly estimated payments for self-employed individuals. State income taxes paid are deductible on federal Schedule A (up to the $40,400 SALT cap in 2026).',
  },
  {
    q: 'Do I pay taxes in both my home state and work state?',
    a: 'If you live and work in different states, you may owe taxes in both. Most states have reciprocity agreements with neighboring states, allowing residents to pay taxes only in their home state. Without a reciprocity agreement, you would file in both states — paying your work state tax and receiving a credit in your home state to avoid double taxation. Remote workers who work entirely from home generally only owe taxes to their home state. Consult a tax professional if you work in multiple states.',
  },
  {
    q: 'How does state tax affect my take-home pay?',
    a: 'State income tax directly reduces your take-home pay through paycheck withholding. States with high income tax rates (like California at 13.3% top rate, Hawaii at 11%, or New Jersey at 10.75%) significantly reduce net pay for high earners. For example, someone earning $100,000 in California pays roughly $7,000–$9,000 in state income tax annually, reducing take-home pay by about $600–$750/month. In contrast, residents of no-income-tax states like Texas or Florida keep all of that as take-home pay.',
  },
  {
    q: 'Which state has the highest income tax?',
    a: 'California has the highest top marginal state income tax rate at 13.3%, applying to incomes over $1 million. Other high-rate states include Hawaii (11% top rate), New Jersey (10.75%), Oregon (9.9%), Minnesota (9.85%), and New York (10.9% top rate). However, top marginal rates only affect the highest earners. Effective state income tax rates for average earners in these states are typically 4-7%. States like Pennsylvania (3.07% flat), Indiana (3.05%), and Michigan (4.25%) have lower flat rates.',
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
  name: 'State Income Tax Calculator 2026',
  url: 'https://taxcalculators.app/state-tax',
  description: 'Free 2026 state income tax calculator for all 50 states with comparison to no-tax states.',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
}

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Calculate State Income Tax',
  step: [
    { '@type': 'HowToStep', name: 'Select your state', text: 'Choose your state from the dropdown or click one of the nine no-income-tax states. See the state\'s tax rate immediately.' },
    { '@type': 'HowToStep', name: 'Enter your income and filing status', text: 'Enter your annual income and select your federal filing status. The calculator computes both state and federal tax.' },
    { '@type': 'HowToStep', name: 'View state tax and comparison', text: 'See your estimated state income tax, combined federal + state effective rate, and how your state compares to others including no-tax states.' },
  ],
}

const trustSignals = ['📋 2026 Updated', '⚡ Instant', '🔒 Private', '✓ Free']

export default function StateTaxPage() {
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
              State Income Tax Calculator 2026
            </h1>
            <p className="text-lg sm:text-xl text-white/80 mb-6 max-w-2xl mx-auto">
              Calculate state income tax for all 50 states. Compare state tax rates and see how much you would save in a no-income-tax state.
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
              <StateTaxCalculatorWrapper />
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-white dark:from-[#0f172a] to-transparent pointer-events-none" />
      </section>

      <section className="bg-white dark:bg-[#0f172a] pt-6">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="pb-4"><AdBanner slot="2222222222" /></div>
          <div className="rounded-2xl bg-blue-50 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/50 px-6 py-5 mb-10">
            <h2 className="text-base font-bold text-blue-900 dark:text-blue-300 mb-2">State income taxes in 2026</h2>
            <p className="text-sm text-blue-800 dark:text-blue-400 leading-relaxed">
              State income taxes vary dramatically across the United States in 2026. Nine states have no income tax at all (Alaska, Florida, Nevada, New Hampshire, South Dakota, Tennessee, Texas, Washington, and Wyoming), while California has the nation&apos;s highest top marginal rate at 13.3%. Most states with income taxes use progressive bracket systems similar to the federal government, though some use flat rates. The state income tax you pay is partially deductible on your federal return via the SALT (State and Local Tax) deduction, capped at $40,400 in 2026. For individual state calculators with state-specific brackets, deductions, and tax credits, see the state-specific pages linked below.
            </p>
          </div>
          <div className="pb-10"><FAQ questions={faqs} /></div>

          <div className="mb-10">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">State income tax calculators — all 50 states</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
              {[
                ['Alabama','alabama'],['Alaska','alaska'],['Arizona','arizona'],['Arkansas','arkansas'],['California','california'],
                ['Colorado','colorado'],['Connecticut','connecticut'],['Delaware','delaware'],['Florida','florida'],['Georgia','georgia'],
                ['Hawaii','hawaii'],['Idaho','idaho'],['Illinois','illinois'],['Indiana','indiana'],['Iowa','iowa'],
                ['Kansas','kansas'],['Kentucky','kentucky'],['Louisiana','louisiana'],['Maine','maine'],['Maryland','maryland'],
                ['Massachusetts','massachusetts'],['Michigan','michigan'],['Minnesota','minnesota'],['Mississippi','mississippi'],['Missouri','missouri'],
                ['Montana','montana'],['Nebraska','nebraska'],['Nevada','nevada'],['New Hampshire','new-hampshire'],['New Jersey','new-jersey'],
                ['New Mexico','new-mexico'],['New York','new-york'],['North Carolina','north-carolina'],['North Dakota','north-dakota'],['Ohio','ohio'],
                ['Oklahoma','oklahoma'],['Oregon','oregon'],['Pennsylvania','pennsylvania'],['Rhode Island','rhode-island'],['South Carolina','south-carolina'],
                ['South Dakota','south-dakota'],['Tennessee','tennessee'],['Texas','texas'],['Utah','utah'],['Vermont','vermont'],
                ['Virginia','virginia'],['Washington','washington'],['West Virginia','west-virginia'],['Wisconsin','wisconsin'],['Wyoming','wyoming'],
              ].map(([name, slug]) => (
                <a
                  key={slug}
                  href={`/${slug}-tax-calculator`}
                  className="text-xs text-center px-2 py-2 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-[#1e3a5f] hover:text-[#1e3a5f] dark:hover:text-blue-400 transition-colors"
                >
                  {name}
                </a>
              ))}
            </div>
          </div>

          <div className="pb-6"><AdBanner slot="3333333333" /></div>
        </div>
      </section>

      <Footer />
    </>
  )
}
