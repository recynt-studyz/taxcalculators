import type { Metadata } from 'next'
import ToolHeader from '@/components/ToolHeader'
import TaxRefundCalculatorWrapper from '@/components/TaxRefundCalculatorWrapper'
import AdBanner from '@/components/AdBanner'
import FAQ from '@/components/FAQ'
import type { FaqItem } from '@/components/FAQ'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Tax Refund Calculator 2026 — Estimate Your Refund',
  description:
    'Estimate your 2026 federal tax refund or amount owed. Free tax refund calculator with Child Tax Credit, EITC and other credits included.',
  alternates: { canonical: 'https://taxcalculators.app/tax-refund' },
  robots: { index: true, follow: true },
}

const faqs: FaqItem[] = [
  {
    q: 'When will I receive my 2026 tax refund?',
    a: 'The IRS typically issues tax refunds within 21 days for e-filed returns with direct deposit. Paper returns take 6–8 weeks. Filing early in the tax season (January–February) results in faster processing since the IRS is less backlogged. To check your refund status, use the IRS "Where\'s My Refund?" tool at irs.gov after your return has been accepted. State refunds typically arrive 5–14 business days after the state processes your return.',
  },
  {
    q: 'How do I get a bigger tax refund?',
    a: 'To maximize your 2026 tax refund: (1) Claim all eligible tax credits — Child Tax Credit ($2,200/child), EITC if you qualify, education credits, EV credit (up to $7,500), and energy efficiency credits (up to $3,200). (2) Maximize deductible retirement contributions (IRA, SEP-IRA). (3) Deduct eligible above-the-line deductions: student loan interest, HSA contributions, self-employed health insurance. (4) If you itemize, include mortgage interest, state taxes (up to $40,400 SALT cap in 2026), charitable donations. (5) Increase W-4 withholding so more is withheld each paycheck.',
  },
  {
    q: 'What is the average federal tax refund in 2026?',
    a: 'The average federal tax refund in 2026 is approximately $3,804, continuing the trend of refunds exceeding $3,000. Refund amounts vary significantly based on income, filing status, credits claimed, and withholding elections. Taxpayers who claim the Child Tax Credit and EITC tend to receive larger refunds. Note that a large refund means you over-withheld throughout the year — that money could have been in your paycheck earning interest instead.',
  },
  {
    q: 'Why is my refund smaller than last year?',
    a: 'Several factors can reduce your tax refund from year to year: (1) Income increased, pushing you into a higher bracket. (2) You received fewer credits — children aged out of the Child Tax Credit (age 17+), or income grew above EITC limits. (3) Withholding changed — employer updated W-4 calculations, or you submitted a new W-4 reducing withholding. (4) You had additional income sources not subject to withholding. (5) Tax law changes affected your deductions or credits. Comparing your prior year W-2 box 2 (federal withheld) to current year is a good starting point.',
  },
  {
    q: 'What credits increase my tax refund?',
    a: 'The most impactful tax credits for increasing your 2026 refund include: Child Tax Credit ($2,200 per qualifying child under 17, up to $1,700 refundable), Earned Income Tax Credit ($8,231 maximum for 3+ children), American Opportunity Credit ($2,500 per student for first 4 years of college, 40% refundable), Child and Dependent Care Credit (up to $1,050 for one child, $2,100 for two+), EV Tax Credit (up to $7,500 for new EVs, $4,000 for used), Residential Clean Energy Credit (30% for solar panels, heat pumps), and Energy Efficient Home Improvement Credit (30% up to $3,200 annually).',
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
  name: 'Tax Refund Calculator 2026',
  url: 'https://taxcalculators.app/tax-refund',
  description: 'Free 2026 tax refund estimator with Child Tax Credit, EITC, education credits, EV credit, and energy credits.',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
}

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Estimate Your Tax Refund',
  step: [
    { '@type': 'HowToStep', name: 'Enter your income and withholding', text: 'Enter your filing status, gross income, and total federal taxes withheld from your W-2 Box 2. Choose standard or itemized deduction.' },
    { '@type': 'HowToStep', name: 'Add credits', text: 'Enter children for Child Tax Credit ($2,200 each), education credits, EV credit, energy credits, and other credits.' },
    { '@type': 'HowToStep', name: 'View your refund or amount owed', text: 'See your estimated tax liability, total credits, taxes withheld, and calculated refund (green) or amount owed (red) with a full breakdown.' },
  ],
}

const trustSignals = ['📋 2026 Updated', '⚡ Instant', '🔒 Private', '✓ Free']

export default function TaxRefundPage() {
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
              Tax Refund Calculator 2026
            </h1>
            <p className="text-lg sm:text-xl text-white/80 mb-6 max-w-2xl mx-auto">
              Estimate your 2026 federal tax refund or amount owed. Includes Child Tax Credit, EITC, education credits, EV and energy credits.
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
              <TaxRefundCalculatorWrapper />
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-white dark:from-[#0f172a] to-transparent pointer-events-none" />
      </section>

      <section className="bg-white dark:bg-[#0f172a] pt-6">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="pb-4"><AdBanner slot="2222222222" /></div>
          <div className="rounded-2xl bg-blue-50 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/50 px-6 py-5 mb-10">
            <h2 className="text-base font-bold text-blue-900 dark:text-blue-300 mb-2">How your 2026 tax refund is calculated</h2>
            <p className="text-sm text-blue-800 dark:text-blue-400 leading-relaxed">
              Your federal tax refund is simply the difference between what you paid throughout the year (withholding from paychecks + estimated payments) and your actual tax liability. Tax liability = federal income tax on your taxable income minus all tax credits. The 2026 Child Tax Credit ($2,200 per child, up to $1,700 refundable) is one of the largest credits for families. The Earned Income Tax Credit (EITC) can be worth up to $8,231 for low-to-moderate income earners with three or more children. Filing your return accurately with all eligible credits is essential to receiving the full refund you are entitled to. File early, choose e-file with direct deposit, and check the IRS refund tracker for status updates.
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
