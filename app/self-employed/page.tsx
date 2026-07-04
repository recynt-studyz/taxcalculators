import type { Metadata } from 'next'
import ToolHeader from '@/components/ToolHeader'
import SelfEmployedCalculatorWrapper from '@/components/SelfEmployedCalculatorWrapper'
import AdBanner from '@/components/AdBanner'
import FAQ from '@/components/FAQ'
import type { FaqItem } from '@/components/FAQ'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Self-Employment Tax Calculator 2026',
  description:
    'Calculate self-employment tax, quarterly estimated payments, and SE deductions for 2026. Free freelancer and contractor tax calculator.',
  alternates: { canonical: 'https://taxcalculators.app/self-employed' },
  robots: { index: true, follow: true },
}

const faqs: FaqItem[] = [
  {
    q: 'What is self-employment tax and who pays it?',
    a: 'Self-employment (SE) tax is the equivalent of FICA taxes for self-employed individuals — freelancers, independent contractors, sole proprietors, and small business owners. SE tax is 15.3%: 12.4% for Social Security (on income up to the $184,500 wage base in 2026) and 2.9% for Medicare. Employees split this with their employer (each paying 7.65%), but self-employed individuals pay both halves. SE tax is calculated on 92.35% of net self-employment income — the IRS allows this adjustment since employees don\'t pay SE tax on the employer\'s share.',
  },
  {
    q: 'How do I calculate quarterly estimated tax payments?',
    a: 'Quarterly estimated tax payments are due when you expect to owe $1,000 or more in federal taxes. Calculate your estimated payment by: (1) estimating your total tax liability for the year (SE tax + federal income tax + state income tax), (2) dividing by 4, and (3) paying each quarter by the due date. For 2026, quarterly due dates are April 15, June 16, September 15, and January 15 (2027). Underpaying by more than $1,000 may result in an IRS underpayment penalty.',
  },
  {
    q: 'Can I deduct half of my self-employment tax?',
    a: 'Yes. The IRS allows self-employed taxpayers to deduct 50% of their SE tax as an above-the-line deduction on Form 1040, Schedule 1. This deduction reduces your Adjusted Gross Income (AGI) and therefore your federal income tax liability. For example, if your SE tax is $11,304, you can deduct $5,652, reducing your taxable income by that amount. This deduction is taken automatically — you don\'t need to itemize to claim it.',
  },
  {
    q: 'What business expenses can self-employed people deduct?',
    a: 'Self-employed individuals can deduct ordinary and necessary business expenses including: home office (if used exclusively for business), vehicle mileage (70 cents/mile in 2026) or actual vehicle expenses, health insurance premiums (100% deductible), retirement contributions (SEP-IRA up to 25% of net SE income, Solo 401k up to $70,000 in 2026), professional tools and software, business meals (50%), advertising, professional services, and business travel. These deductions reduce your net SE income before SE tax is calculated.',
  },
  {
    q: 'When are quarterly estimated tax payments due in 2026?',
    a: 'The 2026 quarterly estimated tax payment due dates are: Q1 (January–March income): April 15, 2026; Q2 (April–May income): June 16, 2026; Q3 (June–August income): September 15, 2026; Q4 (September–December income): January 15, 2027. Pay using IRS Direct Pay, EFTPS, or mail Form 1040-ES. If a due date falls on a weekend or federal holiday, the deadline moves to the next business day.',
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
  name: 'Self-Employment Tax Calculator 2026',
  url: 'https://taxcalculators.app/self-employed',
  description: 'Free 2026 self-employment tax calculator for freelancers and contractors. Calculates SE tax, federal income tax, and quarterly estimated payments.',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
}

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Calculate Self-Employment Tax',
  step: [
    { '@type': 'HowToStep', name: 'Enter your net self-employment income', text: 'Enter your net self-employment income after business expenses. Add any W-2 income from other jobs and select your filing status and state.' },
    { '@type': 'HowToStep', name: 'Add retirement contributions', text: 'Enter SEP-IRA or Solo 401(k) contributions to reduce your taxable income. Add any quarterly estimated tax payments already made.' },
    { '@type': 'HowToStep', name: 'View your SE tax, income tax, and quarterly payments', text: 'See your self-employment tax, deductible half, federal income tax, total tax due, and recommended quarterly estimated payment schedule.' },
  ],
}

const trustSignals = ['📋 2026 Updated', '⚡ Instant', '🔒 Private', '✓ Free']

export default function SelfEmployedPage() {
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
              Self-Employment Tax Calculator 2026
            </h1>
            <p className="text-lg sm:text-xl text-white/80 mb-6 max-w-2xl mx-auto">
              Calculate self-employment tax, federal income tax, and quarterly estimated payments for freelancers and contractors in 2026.
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
              <SelfEmployedCalculatorWrapper />
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-white dark:from-[#0f172a] to-transparent pointer-events-none" />
      </section>

      <section className="bg-white dark:bg-[#0f172a] pt-6">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="pb-4"><AdBanner slot="2222222222" /></div>
          <div className="rounded-2xl bg-blue-50 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/50 px-6 py-5 mb-10">
            <h2 className="text-base font-bold text-blue-900 dark:text-blue-300 mb-2">Self-employment taxes in 2026</h2>
            <p className="text-sm text-blue-800 dark:text-blue-400 leading-relaxed">
              Freelancers, independent contractors, gig workers, and small business owners all pay self-employment tax on their net self-employment income. Unlike W-2 employees who split FICA taxes with their employer, self-employed individuals pay the full 15.3% SE tax (12.4% Social Security + 2.9% Medicare). However, you can deduct half of your SE tax and contributions to SEP-IRA or Solo 401(k) retirement plans to reduce your federal income tax liability. Making quarterly estimated tax payments helps avoid IRS underpayment penalties — our self-employment tax calculator shows you exactly what to pay each quarter.
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
