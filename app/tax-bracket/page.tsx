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
          {/* How It Works */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">How Tax Bracket Stacking Works</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              The most widespread misconception in personal finance is that moving into a higher tax bracket taxes all your income at the new rate. In reality, the U.S. uses a marginal system where each bracket only taxes the income within that bracket&apos;s range. The process is called bracket stacking: you fill each bracket from the bottom up, paying that bracket&apos;s rate only on the income within it, and carrying any overflow to the next bracket.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              For each bracket, the formula is: <strong className="text-gray-900 dark:text-white">Tax from bracket = (Amount of taxable income that falls within the bracket) × Bracket rate</strong>. Sum the tax from all applicable brackets to get your total federal income tax. Note that "taxable income" is your gross income minus above-the-line deductions minus your standard or itemized deduction — not your salary.
            </p>
            <div className="bg-gray-100 dark:bg-gray-800 rounded-xl px-4 py-3 mb-4 text-sm font-mono text-gray-800 dark:text-gray-200">
              Total Tax = (min(taxable income, $11,925) × 10%) + (max(0, min(taxable income, $48,475) − $11,925) × 12%) + (max(0, min(taxable income, $103,350) − $48,475) × 22%) + ...
            </div>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Two numbers matter most: your <strong className="text-gray-900 dark:text-white">marginal rate</strong> (the bracket rate applied to your last dollar of income — the highest bracket you reach) and your <strong className="text-gray-900 dark:text-white">effective rate</strong> (total federal tax divided by total gross income). The marginal rate tells you what it costs to earn additional income; the effective rate tells you your overall tax burden. For most taxpayers, the effective rate is 5–15 percentage points below the marginal rate.
            </p>
          </div>

          {/* Worked Example */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Worked Example: Married Couple, $230,000 Combined Income</h2>
            <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-100 dark:border-amber-900/40 rounded-2xl p-6">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                Michael earns $160,000 and Lisa earns $70,000 — $230,000 combined. They file Married Filing Jointly and take the $31,500 standard deduction, resulting in $198,500 of taxable income.
              </p>
              <div className="space-y-1 text-sm text-gray-700 dark:text-gray-300 mb-4 font-mono bg-white/60 dark:bg-black/20 rounded-xl px-4 py-3">
                <div>Gross income:                    $230,000</div>
                <div>Standard deduction (MFJ):        −$31,500</div>
                <div>Taxable income:                  $198,500</div>
                <div className="pt-2">10% × $23,850 (fills 10% bracket):  $2,385</div>
                <div>12% × $73,100 ($23,851–$96,950): $8,772</div>
                <div>22% × $101,550 ($96,951–$198,500):$22,341</div>
                <div className="font-bold pt-1">Total federal tax:               $33,498</div>
                <div>Marginal rate:                       22%</div>
                <div>Effective rate ($33,498÷$230,000):  14.6%</div>
              </div>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
                Notice that even though their combined income of $230,000 is solidly in the 22% bracket, their effective rate is only 14.6% — because $96,950 of their taxable income was taxed at 10% and 12%. The "22% bracket" label describes only the rate on income above $96,950, not the average rate on all income.
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                If Michael contributed $20,000 more to his 401(k) (bringing contributions to $23,500 total), taxable income would fall to $178,500. All of that $20,000 reduction comes from the 22% bracket — saving $4,400 in federal taxes. Their effective rate would drop to 13.6%. This illustrates why marginal rate matters for financial decisions: it tells you the exact savings from each additional deduction.
              </p>
            </div>
          </div>

          {/* Key Factors */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Key Factors That Determine Your Tax Bracket</h2>
            <ul className="space-y-5">
              <li>
                <p className="font-semibold text-gray-900 dark:text-white mb-1">Filing status and its effect on bracket thresholds</p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">Married Filing Jointly bracket thresholds are roughly double single filer thresholds, creating a "marriage bonus" for couples with unequal incomes. A spouse earning $200,000 filing jointly with a non-working partner stays in the 22% bracket; the same person filing single would be in the 32% bracket. Head of Household filers get slightly wider brackets than single filers. The filing status selection is the first and most impactful lever in bracket determination.</p>
              </li>
              <li>
                <p className="font-semibold text-gray-900 dark:text-white mb-1">Standard vs. itemized deduction choice</p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">The standard deduction is applied before any bracket calculation, so it directly determines your starting taxable income. In 2026, the standard deduction is $15,750 (single) or $31,500 (MFJ). Taxpayers age 65+ receive an additional $2,000 (single) or $1,600 per spouse. The senior bonus deduction of $6,000 under OBBBA further reduces taxable income for qualifying older Americans. If your itemized deductions exceed the standard amount, using them instead can push you into a lower bracket.</p>
              </li>
              <li>
                <p className="font-semibold text-gray-900 dark:text-white mb-1">Pre-tax contributions that shift your bracket</p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">Traditional 401(k) and IRA contributions are subtracted from taxable income, potentially moving income from a higher bracket to a lower one. A single filer with $55,000 taxable income in the 22% bracket who contributes $7,000 to a traditional IRA reduces taxable income to $48,000, dropping below the $48,475 threshold — shifting all of that $7,000 from the 22% bracket to the 12% bracket and saving $700 more than the straight deduction value.</p>
              </li>
              <li>
                <p className="font-semibold text-gray-900 dark:text-white mb-1">Capital gains stacking above ordinary income</p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">Long-term capital gains don&apos;t use ordinary income brackets — they use separate preferential rate tiers. But they are conceptually "stacked" on top of ordinary income. Your ordinary income fills the lower income ranges first; your long-term gains sit above, determining which preferential rate (0%, 15%, or 20%) applies. This means high ordinary income can push all long-term gains into the 15% or 20% tier even if the gains themselves are modest in amount.</p>
              </li>
              <li>
                <p className="font-semibold text-gray-900 dark:text-white mb-1">Bracket inflation adjustments</p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">The IRS adjusts tax bracket thresholds annually for inflation using the Chained CPI. Without these adjustments, "bracket creep" — where raises that don&apos;t keep pace with inflation nonetheless push taxpayers into higher brackets — would erode real purchasing power. The 2026 OBBBA made additional changes beyond standard inflation indexing, including raising the standard deduction and the Child Tax Credit, which effectively widened the 12% and lower brackets for most households.</p>
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
