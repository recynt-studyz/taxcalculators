import type { Metadata } from 'next'
import ToolHeader from '@/components/ToolHeader'
import W4CalculatorWrapper from '@/components/W4CalculatorWrapper'
import AdBanner from '@/components/AdBanner'
import FAQ from '@/components/FAQ'
import type { FaqItem } from '@/components/FAQ'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'W-4 Withholding Calculator 2026 — Avoid Owing Taxes',
  description:
    'Calculate the right W-4 withholding to avoid owing taxes or get the right refund. Free 2026 W-4 calculator with line-by-line recommendations.',
  alternates: { canonical: 'https://taxcalculators.app/w4-withholding' },
  robots: { index: true, follow: true },
}

const faqs: FaqItem[] = [
  {
    q: 'How do I fill out the 2026 W-4 form?',
    a: 'The 2026 W-4 form has five steps: Step 1 (required) — enter personal information and filing status. Step 2 (if applicable) — check the box if you have multiple jobs or your spouse works. Step 3 (optional) — claim dependent credits: $2,200 per qualifying child under 17, $500 per other dependent. Step 4 (optional) — enter other income not from jobs (4a), deductions if itemizing (4b), and extra withholding per paycheck (4c). Step 5 — sign and date. Only Steps 1 and 5 are required for most single-job taxpayers.',
  },
  {
    q: 'What happens if too little is withheld from my paycheck?',
    a: 'If your employer withholds too little federal income tax, you will owe the difference when you file your tax return. If you owe more than $1,000 and did not pay at least 90% of current year tax or 100% of prior year tax through withholding or estimated payments, the IRS may assess an underpayment penalty. To correct under-withholding, submit a new W-4 to your employer increasing withholding in Step 4c, or make estimated tax payments. Our W-4 calculator shows you exactly how much extra withholding per paycheck is needed.',
  },
  {
    q: 'How do I claim dependents on my W-4?',
    a: 'On the 2020+ W-4, dependents are claimed in Step 3 using dollar amounts rather than allowances. For each qualifying child under 17, enter $2,200. For each other dependent (parent, older child, etc.), enter $500. Add these amounts together and enter the total in Step 3. This reduces your annual withholding by the total Step 3 amount spread across your paychecks. You must meet IRS dependency requirements for each person you claim.',
  },
  {
    q: 'Should I claim 0 or 1 on my W-4?',
    a: 'The 2020+ W-4 no longer uses allowances (0 or 1 system) — that was eliminated with the redesigned form. Today you use dollar amounts in Step 3 for dependents. If you leave Step 3 blank (effectively claiming zero), more tax is withheld and you are more likely to receive a refund. If you complete Step 3 accurately, withholding is calibrated to your actual tax liability. For the most accurate withholding, use the IRS Tax Withholding Estimator or our W-4 calculator.',
  },
  {
    q: 'How often can I update my W-4?',
    a: 'You can submit a new W-4 to your employer at any time — there is no limit. Major life events that warrant a W-4 update include: marriage or divorce, birth or adoption of a child, taking a second job or having your spouse start/stop working, significant income changes, purchasing a home (higher mortgage interest deduction), or receiving a large tax refund or unexpectedly owing taxes. Employers must implement new W-4 changes within their next payroll cycle after receiving the form.',
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
  name: 'W-4 Withholding Calculator 2026',
  url: 'https://taxcalculators.app/w4-withholding',
  description: 'Free 2026 W-4 calculator with line-by-line recommendations to optimize federal tax withholding.',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
}

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Calculate W-4 Withholding',
  step: [
    { '@type': 'HowToStep', name: 'Enter salary and filing information', text: 'Enter your annual salary, pay frequency, and W-4 filing status. Indicate if you have multiple jobs.' },
    { '@type': 'HowToStep', name: 'Add dependents and other adjustments', text: 'Enter children under 17 (for Step 3 credit), other income (Step 4a), and whether you itemize (Step 4b).' },
    { '@type': 'HowToStep', name: 'View W-4 recommendations', text: 'See your estimated annual tax, current withholding, and expected refund or amount owed. Get specific W-4 Step 3 and Step 4c recommendations.' },
  ],
}

const trustSignals = ['📋 2026 Updated', '⚡ Instant', '🔒 Private', '✓ Free']

export default function W4WithholdingPage() {
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
              W-4 Withholding Calculator 2026
            </h1>
            <p className="text-lg sm:text-xl text-white/80 mb-6 max-w-2xl mx-auto">
              Calculate the right federal tax withholding for your W-4 form. Avoid owing at tax time or over-withholding throughout the year.
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
              <W4CalculatorWrapper />
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-white dark:from-[#0f172a] to-transparent pointer-events-none" />
      </section>

      <section className="bg-white dark:bg-[#0f172a] pt-6">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="pb-4"><AdBanner slot="2222222222" /></div>
          <div className="rounded-2xl bg-blue-50 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/50 px-6 py-5 mb-10">
            <h2 className="text-base font-bold text-blue-900 dark:text-blue-300 mb-2">W-4 withholding in 2026</h2>
            <p className="text-sm text-blue-800 dark:text-blue-400 leading-relaxed">
              The W-4 form controls how much federal income tax your employer withholds from each paycheck. Getting the withholding right means you neither owe a large amount at tax time nor give the government an interest-free loan all year. The redesigned W-4 (post-2020) uses a five-step system rather than allowances. Key factors: your filing status affects the standard withholding amount; Step 3 dependents credits directly reduce withholding by the credit amount; Step 4c extra withholding per paycheck covers other income or underwithholding; and itemized deductions above the standard deduction can be entered in Step 4b. The 2026 Child Tax Credit is $2,200 per qualifying child — entering this in Step 3 correctly calibrates withholding.
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
