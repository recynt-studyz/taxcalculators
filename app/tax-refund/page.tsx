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
          {/* How It Works */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">How Your Tax Refund Is Calculated</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              A tax refund is not a windfall from the government — it is your own money returned to you after you overpaid throughout the year. The fundamental formula is: <strong className="text-gray-900 dark:text-white">Refund = Tax Payments − Tax Liability</strong>. If payments exceed liability, you receive a refund. If liability exceeds payments, you owe the difference.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Tax payments include federal income tax withheld from W-2 wages (Box 2), estimated tax payments made quarterly, and any credit payments from prior year. Tax liability is your federal income tax on taxable income, reduced by tax credits. Three types of credits work differently: <strong className="text-gray-900 dark:text-white">nonrefundable credits</strong> (like Saver&apos;s Credit or Child and Dependent Care Credit) can reduce tax to zero but no further. <strong className="text-gray-900 dark:text-white">Partially refundable credits</strong> (Child Tax Credit: $2,200/child, up to $1,700/child refundable as Additional Child Tax Credit) can generate a refund beyond zero up to their refundable limit. <strong className="text-gray-900 dark:text-white">Fully refundable credits</strong> (Earned Income Tax Credit, up to $8,231) are paid out in full regardless of tax liability — this is why many low-income families receive refunds far exceeding their withholding.
            </p>
            <div className="bg-gray-100 dark:bg-gray-800 rounded-xl px-4 py-3 mb-4 text-sm font-mono text-gray-800 dark:text-gray-200">
              Refund = (W-2 Box 2 Withholding + Estimated Payments) − (Federal Tax on Taxable Income − Nonrefundable Credits − Refundable Credits)
            </div>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              The optimal refund is $0 — meaning withholding matched your liability perfectly throughout the year. A large refund means you gave the government an interest-free loan of your own money. A tax bill means you under-withheld and potentially owe an underpayment penalty. Understanding this formula helps you configure your W-4 for accurate withholding year-round.
            </p>
          </div>

          {/* Worked Example */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Worked Example: Family of Five, $68,000 Income</h2>
            <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-100 dark:border-amber-900/40 rounded-2xl p-6">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                Marcus and Elena file Married Filing Jointly with $68,000 combined W-2 wages and three children under 17. Their employers withheld $7,400 in federal income tax across both W-2s.
              </p>
              <div className="space-y-1 text-sm text-gray-700 dark:text-gray-300 mb-4 font-mono bg-white/60 dark:bg-black/20 rounded-xl px-4 py-3">
                <div>Gross income (MFJ):               $68,000</div>
                <div>Standard deduction (MFJ):         −$31,500</div>
                <div>Taxable income:                   $36,500</div>
                <div className="pt-2">Federal income tax:</div>
                <div>  10% × $23,850:                  $2,385</div>
                <div>  12% × $12,650:                  $1,518</div>
                <div>  Gross tax:                       $3,903</div>
                <div className="pt-2">Child Tax Credit (3 × $2,200):    −$6,600</div>
                <div>Tax after CTC (nonrefundable):        $0 (tax zeroed out)</div>
                <div>Additional CTC (refundable, 15% of earned income above $2,500 floor):</div>
                <div>  15% × ($68,000 − $2,500) = $9,825, capped at $1,700 × 3 = $5,100</div>
                <div className="font-bold pt-1">Total refund: $7,400 withheld + $5,100 ACTC − $3,903 tax = ~$8,597</div>
              </div>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
                This family receives a refund larger than their total withholding because the refundable Additional Child Tax Credit ($5,100) creates a direct payment from the IRS — even after their entire tax liability has been eliminated by the nonrefundable portion of the CTC. The refund is not just "getting their money back" — $5,100 of it is a net transfer from the federal government.
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                If their fourth child were 17 or older, that child&apos;s $2,200 CTC would not apply (the credit requires the child to be under 17 at year-end). Their refund would drop by approximately $2,200 — illustrating why tracking dependent ages and updating your W-4 accordingly is important.
              </p>
            </div>
          </div>

          {/* Key Factors */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Key Factors That Determine Your Refund</h2>
            <ul className="space-y-5">
              <li>
                <p className="font-semibold text-gray-900 dark:text-white mb-1">W-4 withholding accuracy</p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">Your refund amount is driven almost entirely by how your W-4 was configured relative to your actual tax liability. Over-withholding (too many taxes taken out each check) produces a large refund at filing. Under-withholding produces a tax bill. The W-4 redesign was specifically intended to make withholding more accurate — employees who complete it correctly with actual dollar amounts rather than guessing at allowances typically see much smaller refund swings year over year.</p>
              </li>
              <li>
                <p className="font-semibold text-gray-900 dark:text-white mb-1">Child Tax Credit and Additional Child Tax Credit</p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">The 2026 Child Tax Credit ($2,200 per qualifying child under 17) is the single largest tax benefit for most families. The nonrefundable portion can wipe out your entire tax liability; the refundable Additional Child Tax Credit (up to $1,700 per child) can generate a cash payment even when tax liability reaches zero. Families with three children under 17 can receive up to $5,100 in refundable ACTC on top of any withholding overpayment. Tracking when each child turns 17 and updating your W-4 is essential.</p>
              </li>
              <li>
                <p className="font-semibold text-gray-900 dark:text-white mb-1">Earned Income Tax Credit (EITC)</p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">The EITC is the most powerful fully refundable credit, worth up to $8,231 for taxpayers with three or more children in 2026. Unlike the CTC, the EITC phases in (it increases with earned income up to a peak) and then phases out at higher income levels. A single parent with two children earning $25,000 might receive an EITC of approximately $5,500 — more than double their federal income tax liability. The EITC is often unclaimed by eligible taxpayers who don&apos;t realize they qualify.</p>
              </li>
              <li>
                <p className="font-semibold text-gray-900 dark:text-white mb-1">Income changes and life events</p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">Income increases during the year — a raise, bonus, or new freelance income — can significantly reduce your expected refund if withholding wasn&apos;t adjusted. Similarly, losing a job mid-year typically produces a large refund because full-year withholding was computed on a higher expected salary. Marriage, divorce, a new child, or a child aging out of the CTC can swing your refund by thousands of dollars. These events should trigger a new W-4 to bring withholding back into alignment.</p>
              </li>
              <li>
                <p className="font-semibold text-gray-900 dark:text-white mb-1">Education credits and other refundable credits</p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">The American Opportunity Tax Credit (AOTC) provides up to $2,500 per student for the first four years of college, with 40% ($1,000) refundable. Families with college students who claim the AOTC regularly see their refund increase by $1,000 per eligible student even if they owed no tax. Energy credits (solar panels, EV purchases, heat pumps) are nonrefundable but reduce tax liability significantly, allowing withholding overpayments to become refunds for homeowners who invest in clean energy.</p>
              </li>
            </ul>
          </div>

          <div className="pb-10"><FAQ questions={faqs} /></div>
          <div className="pb-6"><AdBanner slot="3333333333" /></div>
        </div>
      </section>

      <Footer />
    </>
  )
}
