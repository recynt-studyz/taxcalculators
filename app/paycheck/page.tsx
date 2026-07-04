import type { Metadata } from 'next'
import ToolHeader from '@/components/ToolHeader'
import PaycheckCalculatorWrapper from '@/components/PaycheckCalculatorWrapper'
import AdBanner from '@/components/AdBanner'
import FAQ from '@/components/FAQ'
import type { FaqItem } from '@/components/FAQ'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Paycheck Calculator 2026 — Take Home Pay After Taxes',
  description:
    'Calculate your exact take-home pay after federal tax, state tax, Social Security and Medicare. Free 2026 paycheck calculator for all 50 states.',
  alternates: { canonical: 'https://taxcalculators.app/paycheck' },
  robots: { index: true, follow: true },
}

const faqs: FaqItem[] = [
  {
    q: 'How is federal income tax withheld from my paycheck?',
    a: 'Federal income tax withholding is calculated by annualizing your paycheck gross pay, subtracting your standard deduction and W-4 Step 3 credits, computing the federal income tax on that annualized taxable income, then dividing by your pay periods. Your W-4 form elections (filing status, dependents, extra withholding) directly control how much federal income tax is withheld. Using the 2026 paycheck calculator shows you exactly how changes to your W-4 affect each paycheck.',
  },
  {
    q: 'What is FICA tax and how much is withheld?',
    a: 'FICA (Federal Insurance Contributions Act) tax funds Social Security and Medicare. For 2026, Social Security tax is 6.2% on wages up to the $184,500 wage base. Medicare tax is 1.45% on all wages with no cap. High earners also pay an additional 0.9% Medicare surcharge on wages over $200,000 (single) or $250,000 (married). Your employer matches your FICA contributions, paying another 7.65% on top. FICA taxes appear on your W-2 in Boxes 4 and 6.',
  },
  {
    q: 'How do I increase my take-home pay?',
    a: 'To increase your take-home pay: (1) Maximize pre-tax deductions — 401(k) contributions up to $23,500, HSA contributions up to $4,300, and health insurance premiums all reduce taxable income. (2) Update your W-4 to claim eligible dependents in Step 3 ($2,200 per child under 17). (3) Use a Health FSA for medical expenses. (4) Check if you qualify for commuter benefits. Note: reducing withholding increases take-home pay but may result in a smaller refund or tax owed at filing.',
  },
  {
    q: 'What is the Social Security wage base for 2026?',
    a: 'The Social Security wage base for 2026 is $184,500. This means Social Security tax (6.2%) is only withheld on the first $184,500 of your wages. Once your cumulative wages exceed $184,500 for the year, Social Security withholding stops for the remainder of the year. Medicare tax (1.45%), however, has no wage cap and is withheld on all wages throughout the year.',
  },
  {
    q: 'How does my 401k contribution affect my paycheck?',
    a: 'Traditional 401(k) contributions are pre-tax, reducing your federal and state taxable income each paycheck. For example, a $500 biweekly 401(k) contribution reduces your taxable wages by $500, saving you roughly $110–$185 in federal income tax (depending on your bracket) plus state income tax savings. Your net take-home reduction is only $315–$390 per paycheck, while $500 goes into your retirement account. The 2026 401(k) contribution limit is $23,500 ($31,000 if age 50+).',
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
  name: 'Paycheck Calculator 2026',
  url: 'https://taxcalculators.app/paycheck',
  description: 'Free 2026 paycheck calculator showing take-home pay after federal tax, state tax, Social Security, and Medicare.',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
}

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Calculate Your Take-Home Paycheck',
  step: [
    { '@type': 'HowToStep', name: 'Enter your salary or hourly rate', text: 'Select hourly or salary pay type. For salary, enter your annual amount. For hourly, enter your rate and hours per week. Then choose your pay frequency (weekly, biweekly, semimonthly, or monthly).' },
    { '@type': 'HowToStep', name: 'Add filing status and deductions', text: 'Select your W-4 filing status and state. Enter pre-tax deductions (401k, health insurance, FSA/HSA). Add W-4 Step 3 child credit amount if applicable.' },
    { '@type': 'HowToStep', name: 'View your net paycheck breakdown', text: 'See your gross pay, federal and state withholding, Social Security, Medicare, and all deductions. Your net take-home pay appears instantly along with annual totals.' },
  ],
}

const trustSignals = ['📋 2026 Updated', '⚡ Instant', '🔒 Private', '✓ Free']

export default function PaycheckPage() {
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
              Paycheck Calculator 2026
            </h1>
            <p className="text-lg sm:text-xl text-white/80 mb-6 max-w-2xl mx-auto">
              Calculate your exact take-home pay after federal income tax, state tax, Social Security, and Medicare withholding. Updated for 2026 tax law.
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
              <PaycheckCalculatorWrapper />
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-white dark:from-[#0f172a] to-transparent pointer-events-none" />
      </section>

      <section className="bg-white dark:bg-[#0f172a] pt-6">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="pb-4"><AdBanner slot="2222222222" /></div>
          <div className="rounded-2xl bg-blue-50 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/50 px-6 py-5 mb-10">
            <h2 className="text-base font-bold text-blue-900 dark:text-blue-300 mb-2">Understanding your paycheck withholding in 2026</h2>
            <p className="text-sm text-blue-800 dark:text-blue-400 leading-relaxed">
              Your paycheck withholding for 2026 is governed by the One Big Beautiful Bill Act and your W-4 elections. Federal income tax withholding is estimated by annualizing each paycheck, applying the 2026 tax brackets, and dividing by pay periods. FICA taxes include Social Security (6.2% up to $184,500) and Medicare (1.45% on all wages). Pre-tax deductions like 401(k) contributions and health insurance premiums reduce your taxable wages, effectively giving you a tax break. State income tax withholding varies by state — nine states have no income tax at all. Understanding your paycheck breakdown helps you optimize W-4 withholding to avoid owing taxes or receiving a large refund.
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
