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
          {/* How It Works */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">How Paycheck Withholding Is Calculated</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Paycheck withholding is calculated using the IRS Percentage Method from Publication 15-T, applied every pay period. Your employer follows a precise sequence. First, gross wages are determined for the pay period — annual salary divided by the number of pay periods (26 for biweekly, 24 for semimonthly, 12 for monthly, 52 for weekly). Second, pre-tax deductions are subtracted from gross wages: 401(k) contributions, health insurance premiums, HSA and FSA contributions, and commuter benefits all reduce the taxable wage base before any tax is computed. Third, the remaining wages are annualized and the W-4 Step 3 dependent credits are applied annually. Fourth, the IRS withholding tax tables are applied to compute estimated annual federal income tax, which is then divided by pay periods to get the per-check withholding amount.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              FICA taxes are computed separately and are straightforward percentages: Social Security at 6.2% on cumulative wages up to the $184,500 wage base, and Medicare at 1.45% on all wages with no cap. State income tax withholding follows each state&apos;s own withholding tables. The full formula is:
            </p>
            <div className="bg-gray-100 dark:bg-gray-800 rounded-xl px-4 py-3 mb-4 text-sm font-mono text-gray-800 dark:text-gray-200">
              Net Pay = Gross Pay − Pre-Tax Deductions − Federal Withholding − Social Security (6.2%) − Medicare (1.45%) − State Tax − Post-Tax Deductions
            </div>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              A critical distinction: pre-tax deductions reduce your taxable wages before withholding is calculated, so a $500 401(k) contribution does not reduce take-home pay by $500. At the 22% bracket, it reduces take-home by roughly $355 because $145 of that $500 would have gone to taxes anyway.
            </p>
          </div>

          {/* Worked Example */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Worked Example: $75,000 Salary, Biweekly Pay</h2>
            <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-100 dark:border-amber-900/40 rounded-2xl p-6">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                Marcus earns $75,000 annually, paid biweekly (26 pay periods), single filer, contributes $500 per paycheck to a traditional 401(k), and claims two children under 17 on his W-4 Step 3 ($4,400 total).
              </p>
              <div className="space-y-1 text-sm text-gray-700 dark:text-gray-300 mb-4 font-mono bg-white/60 dark:bg-black/20 rounded-xl px-4 py-3">
                <div>Gross per paycheck ($75k ÷ 26):   $2,884.62</div>
                <div>Pre-tax 401(k):                     −$500.00</div>
                <div>Taxable wages:                    $2,384.62</div>
                <div>Annualized taxable wages:           $61,999</div>
                <div>Less standard deduction:           −$15,750</div>
                <div>Less Step 3 credit (annual):        −$4,400</div>
                <div>Annualized withholding base:        $41,849</div>
                <div className="pt-2">Federal withholding per check:       $177</div>
                <div>Social Security (6.2%):             $179</div>
                <div>Medicare (1.45%):                    $42</div>
                <div className="font-bold pt-1">Estimated net take-home:         ~$1,987</div>
              </div>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
                The $500 biweekly 401(k) contribution only reduces Marcus&apos;s take-home by about $355 — not $500 — because $145 of that $500 would have been paid in federal and state taxes anyway. His annual 401(k) savings of $13,000 costs him only about $9,230 in actual take-home pay reduction.
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                If Marcus forgot to enter his two children on W-4 Step 3, his federal withholding would be about $346/check instead of $177/check — he&apos;d over-withhold by $4,394 annually and receive a large refund instead of having that money each paycheck throughout the year.
              </p>
            </div>
          </div>

          {/* Key Factors */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Key Factors That Affect Your Take-Home Pay</h2>
            <ul className="space-y-5">
              <li>
                <p className="font-semibold text-gray-900 dark:text-white mb-1">Pre-tax deductions (401k, HSA, health insurance)</p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">Every dollar contributed pre-tax to a 401(k), HSA, or employer health insurance reduces both federal and state taxable wages. The 2026 401(k) limit is $23,500 ($31,000 if age 50+). At the 22% federal bracket plus a 5% state rate, maximizing the 401(k) saves roughly $6,345 in combined income taxes — meaning $23,500 in retirement savings only reduces take-home pay by about $17,155.</p>
              </li>
              <li>
                <p className="font-semibold text-gray-900 dark:text-white mb-1">W-4 Step 3 dependent credits</p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">The W-4 Step 3 child credit ($2,200 per qualifying child under 17 in 2026) directly reduces annual withholding dollar-for-dollar. For each child entered, your employer reduces your annual withholding by $2,200, spread evenly across your paychecks. With two children, that&apos;s $169 more per biweekly paycheck throughout the year rather than waiting for a lump-sum refund at tax time.</p>
              </li>
              <li>
                <p className="font-semibold text-gray-900 dark:text-white mb-1">Pay frequency</p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">Pay frequency affects paycheck size but not annual take-home. Biweekly (26 checks/year) results in smaller individual checks than semimonthly (24 checks), but two months per year have three biweekly checks. Monthly pay (12 checks) gives the largest individual checks but requires more careful monthly budgeting. Your annual net pay is the same regardless of frequency for identical withholding elections.</p>
              </li>
              <li>
                <p className="font-semibold text-gray-900 dark:text-white mb-1">Social Security wage base cap</p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">The 2026 Social Security wage base is $184,500. Once your cumulative wages for the year cross this threshold, the 6.2% Social Security withholding stops for all remaining paychecks. For an employee earning $220,000, this means paychecks from October onward are $11,439 higher annually than if Social Security continued — a meaningful boost in second-half take-home pay for high earners.</p>
              </li>
              <li>
                <p className="font-semibold text-gray-900 dark:text-white mb-1">State income tax</p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">Nine states have zero income tax withholding (Alaska, Florida, Nevada, New Hampshire, South Dakota, Tennessee, Texas, Washington, Wyoming). High-tax states like California (up to 13.3%) and New York (up to 10.9%) can reduce monthly take-home pay by $600–$1,500+ for middle and high earners compared to living in a no-income-tax state with otherwise identical circumstances.</p>
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
