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
          {/* How It Works */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">How W-4 Withholding Is Calculated</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              The W-4 form controls how much federal income tax your employer withholds from each paycheck. The IRS Percentage Method (Publication 15-T) governs the calculation. Your employer follows this sequence every pay period: (1) annualize your gross wages (multiply by pay periods per year); (2) apply the Adjusted Annual Wage Amount lookup based on your W-4 Step 1 filing status and whether Step 2&apos;s multiple jobs box is checked; (3) compute the tentative annual federal income tax from the IRS withholding tables; (4) subtract your annual Step 3 dependent credits ($2,200 per qualifying child, $500 per other dependent); (5) add any Step 4a other income or adjust for Step 4b extra deductions; (6) add Step 4c extra per-period withholding; (7) divide the annual figure by the number of pay periods to get the per-check withholding.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              A key insight about Step 3: the credits entered there reduce annual withholding <strong className="text-gray-900 dark:text-white">dollar-for-dollar</strong>, not by a percentage. Entering $2,200 for one child reduces annual withholding by exactly $2,200, spread equally across your remaining paychecks for the year. This is very different from a deduction, which only reduces withholding by the credit amount times your marginal rate.
            </p>
            <div className="bg-gray-100 dark:bg-gray-800 rounded-xl px-4 py-3 mb-4 text-sm font-mono text-gray-800 dark:text-gray-200">
              Per-check withholding = ((Annual tentative tax − Step 3 credits + Step 4c × periods) ÷ pay periods) + (Step 4c extra per check)
            </div>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              The goal of a properly completed W-4 is to have withholding match your actual tax liability as closely as possible — neither receiving a large refund (over-withholding) nor owing a significant amount at filing (under-withholding). The redesigned W-4 (in use since 2020) replaced the old allowance system with dollar-amount entries, making it far more accurate when filled out correctly.
            </p>
          </div>

          {/* Worked Example */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Worked Example: Head of Household, Two Children</h2>
            <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-100 dark:border-amber-900/40 rounded-2xl p-6">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                Priya earns $95,000 as a school counselor, paid biweekly (26 periods), filing as Head of Household. She has two children under 17 and enters $4,400 in W-4 Step 3. She has one job and does not check Step 2.
              </p>
              <div className="space-y-1 text-sm text-gray-700 dark:text-gray-300 mb-4 font-mono bg-white/60 dark:bg-black/20 rounded-xl px-4 py-3">
                <div>Annual wages:                     $95,000</div>
                <div>HoH standard deduction:          −$23,625</div>
                <div>Taxable income (approx):          $71,375</div>
                <div className="pt-2">10% × $16,550:                    $1,655</div>
                <div>12% × ($55,900−$16,550):          $4,722</div>
                <div>22% × ($71,375−$55,900):          $3,405</div>
                <div>Gross annual tax:                  $9,782</div>
                <div>Less Step 3 credits:              −$4,400</div>
                <div className="font-bold pt-1">Annual withholding:               $5,382</div>
                <div>Per paycheck ($5,382÷26):           $207</div>
              </div>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
                If Priya did not enter her children in Step 3, her withholding would be about $376/check — over-withholding by $169 per paycheck ($4,394/year). That excess money sits with the IRS interest-free until she files. Completing Step 3 puts $169 more in each paycheck without changing her actual tax liability at all.
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                If Priya also takes on a $20,000/year side consulting gig, she should either enter $20,000 in Step 4a (other income) or check Step 2 (multiple income sources). Without doing so, the consulting income would generate a $4,400 tax bill at filing — plus a potential underpayment penalty if it exceeds $1,000 of under-withholding.
              </p>
            </div>
          </div>

          {/* Key Factors */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Key Factors That Affect Your W-4 Withholding</h2>
            <ul className="space-y-5">
              <li>
                <p className="font-semibold text-gray-900 dark:text-white mb-1">Step 2 multiple jobs checkbox</p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">The Step 2 checkbox is the most commonly missed W-4 entry and the most costly omission. When you have two jobs simultaneously — or when both you and your spouse work — each employer withholds as if theirs is your only income. Combined, both jobs under-withhold substantially because your total income pushes you into higher brackets that neither job accounts for. Checking Step 2 on the higher-paying job&apos;s W-4 corrects for this, ensuring withholding reflects your true combined marginal bracket.</p>
              </li>
              <li>
                <p className="font-semibold text-gray-900 dark:text-white mb-1">Step 3 dependent credits ($2,200 per child)</p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">Each qualifying child under 17 entered in Step 3 reduces annual withholding by exactly $2,200. For two children, that is $4,400 less withheld annually — spread as $169 more per biweekly paycheck. The 2026 Child Tax Credit is $2,200/child, so entering the correct Step 3 amount ensures the credit is effectively delivered throughout the year in your paycheck rather than as a refund. Each other dependent (college-age child, elderly parent) adds $500 to Step 3.</p>
              </li>
              <li>
                <p className="font-semibold text-gray-900 dark:text-white mb-1">Step 4a — other income not subject to withholding</p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">Freelance income, rental income, investment income, and alimony are all sources that have no withholding. Entering the estimated annual amount of this income in Step 4a causes your employer to withhold extra from your paycheck to cover the tax on that other income. This prevents a large tax bill at filing and avoids the underpayment penalty that applies when you owe more than $1,000 without having paid 90% of your current year tax through withholding or estimated payments.</p>
              </li>
              <li>
                <p className="font-semibold text-gray-900 dark:text-white mb-1">Step 4b — extra deductions beyond the standard</p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">If you itemize deductions and your total itemized deductions (mortgage interest, SALT up to $40,400, charitable contributions) are significantly above the standard deduction, enter the excess in Step 4b. This reduces withholding to reflect lower taxable income. For example, if your itemized deductions are $40,000 and your standard deduction is $15,750, enter $24,250 in Step 4b. Your employer reduces annual withholding by the 4b amount times your estimated bracket rate.</p>
              </li>
              <li>
                <p className="font-semibold text-gray-900 dark:text-white mb-1">Life events requiring W-4 updates</p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">Major life changes can make your current W-4 significantly inaccurate within months. Events that warrant a new W-4: marriage or divorce, birth or adoption of a child, a child turning 17 (loses CTC eligibility), starting or stopping a second job, your spouse starting or stopping work, buying a home, starting a side business, receiving a large investment gain, or getting a major raise. There is no penalty for submitting a new W-4 at any time, and your employer must implement changes within the next payroll cycle.</p>
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
