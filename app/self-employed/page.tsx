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
          {/* How It Works */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">How Self-Employment Tax Is Calculated</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Self-employed individuals face a two-layer tax system: self-employment (SE) tax on net business income, plus regular federal income tax on taxable income. Understanding both layers — and the deductions that reduce each — is essential for accurate tax planning.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              <strong className="text-gray-900 dark:text-white">Layer 1 — SE tax:</strong> Net self-employment income (total business revenue minus all allowable business expenses) is multiplied by 0.9235 to arrive at the SE tax base. The 0.9235 factor (92.35%) accounts for the "employer half" of FICA — regular employees only pay 7.65% because their employer pays the other 7.65%. SE tax = SE tax base × 15.3% (12.4% Social Security on income up to $184,500 + 2.9% Medicare on all income). The IRS then allows a deduction of 50% of SE tax as an above-the-line deduction, reducing your AGI.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              <strong className="text-gray-900 dark:text-white">Layer 2 — Federal income tax:</strong> AGI = Net SE income − SE deduction (50% of SE tax) − retirement contributions (SEP-IRA, Solo 401k) − self-employed health insurance premiums. Subtract the standard deduction or itemized deductions to get taxable income. Apply 2026 federal brackets.
            </p>
            <div className="bg-gray-100 dark:bg-gray-800 rounded-xl px-4 py-3 mb-4 text-sm font-mono text-gray-800 dark:text-gray-200">
              Total Tax = (Net SE Income × 0.9235 × 15.3%) + Federal Income Tax on (Net SE Income − SE Deduction − Retirement − Std. Deduction)
            </div>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Quarterly estimated payments are required when you expect to owe $1,000+ in federal taxes. The 2026 due dates are April 15, June 16, September 15, and January 15, 2027. Underpaying by more than $1,000 triggers an IRS underpayment penalty based on the federal short-term interest rate plus 3 percentage points, applied to each quarter individually.
            </p>
          </div>

          {/* Worked Example */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Worked Example: Freelance Designer, $90,000 Net Income</h2>
            <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-100 dark:border-amber-900/40 rounded-2xl p-6">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                Jennifer is a freelance UX designer earning $90,000 in net profit (after business expenses like software subscriptions, home office, and equipment). She contributes $20,000 to a SEP-IRA and is a single filer with no other income.
              </p>
              <div className="space-y-1 text-sm text-gray-700 dark:text-gray-300 mb-4 font-mono bg-white/60 dark:bg-black/20 rounded-xl px-4 py-3">
                <div>Net SE income:                     $90,000</div>
                <div>SE tax base ($90k × 0.9235):       $83,115</div>
                <div>SE tax ($83,115 × 15.3%):          $12,717</div>
                <div>SE deduction (50%):                −$6,358</div>
                <div>SEP-IRA contribution:             −$20,000</div>
                <div>AGI:                              $63,642</div>
                <div>Standard deduction:               −$15,750</div>
                <div>Taxable income:                   $47,892</div>
                <div className="pt-2">Federal income tax (10/12%):         $5,370</div>
                <div>SE tax:                           $12,717</div>
                <div className="font-bold pt-1">Total tax:                        $18,087</div>
                <div>Quarterly payment (÷4):            $4,522</div>
              </div>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
                Jennifer&apos;s effective total tax rate is $18,087 ÷ $90,000 = <strong className="text-gray-900 dark:text-white">20.1%</strong>. Without the $20,000 SEP-IRA contribution, her taxable income would be $67,892 and income tax would jump to $9,997 — the SEP-IRA saves $4,627 in federal income tax alone (at 22% marginal rate × $20,000 × 1.054 compounding effect from AGI reduction).
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                The $12,717 SE tax cannot be avoided (it replaces employer FICA), but the 50% SE deduction reduces Jennifer&apos;s income tax by $1,399 ($6,358 × 22%). She also saves $800/month in health insurance premiums, which are 100% deductible as self-employed health insurance — another $9,600 in above-the-line deductions she could take, further reducing both layers.
              </p>
            </div>
          </div>

          {/* Key Factors */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Key Factors That Affect Your Self-Employment Tax</h2>
            <ul className="space-y-5">
              <li>
                <p className="font-semibold text-gray-900 dark:text-white mb-1">Business expense deductions</p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">Only net self-employment income (after all ordinary and necessary business expenses) is subject to SE tax. This makes business deductions doubly valuable — they reduce both SE tax and income tax simultaneously. Home office (exclusive use, regular basis), equipment, software, professional development, business mileage (70 cents/mile in 2026), and business travel all reduce net SE income before either tax is computed. A $10,000 reduction in net SE income saves $1,530 in SE tax plus additional income tax savings.</p>
              </li>
              <li>
                <p className="font-semibold text-gray-900 dark:text-white mb-1">Retirement plan contributions</p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">A SEP-IRA allows contributions up to 25% of net SE income, up to $70,000 in 2026. A Solo 401(k) allows up to $23,500 as the employee contribution plus 25% as the employer contribution (up to $70,000 combined). These contributions reduce AGI and income tax only — not SE tax — but the income tax savings are substantial. A self-employed person in the 22% bracket saves $2,200 in income tax for every $10,000 contributed to a SEP-IRA.</p>
              </li>
              <li>
                <p className="font-semibold text-gray-900 dark:text-white mb-1">Self-employed health insurance deduction</p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">If you are self-employed and not eligible for employer-subsidized health coverage through a spouse, you can deduct 100% of health insurance premiums for yourself and your family as an above-the-line deduction. This includes dental and long-term care insurance. For someone paying $1,000/month ($12,000/year) in premiums in the 22% bracket, this deduction saves $2,640 in federal income tax and reduces AGI, potentially triggering other income-based benefits.</p>
              </li>
              <li>
                <p className="font-semibold text-gray-900 dark:text-white mb-1">The SE tax rate and Social Security wage base</p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">The full 15.3% SE tax rate applies to SE income up to the $184,500 Social Security wage base. Income above $184,500 is only subject to the 2.9% Medicare portion (plus the 0.9% surtax above $200,000). A freelancer earning $200,000 net pays SE tax of $28,233 — about $14,100 for the Social Security portion (capped) plus $5,800 for Medicare plus $8,100 for the full SE calculation below the cap, plus any Medicare surtax on income over $200,000.</p>
              </li>
              <li>
                <p className="font-semibold text-gray-900 dark:text-white mb-1">Quarterly payment accuracy</p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">Missing or underpaying quarterly estimated taxes results in an IRS underpayment penalty calculated for each quarter individually — even if you pay in full at filing. The "safe harbor" rule protects you from penalties if your total payments equal at least 100% of prior-year tax (110% if AGI exceeded $150,000). Paying based on prior-year tax is often easier for variable-income freelancers than estimating current-year income precisely.</p>
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
