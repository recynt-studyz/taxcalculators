import type { Metadata } from 'next'
import ToolHeader from '@/components/ToolHeader'
import IncomeTaxCalculatorWrapper from '@/components/IncomeTaxCalculatorWrapper'
import AdBanner from '@/components/AdBanner'
import FAQ from '@/components/FAQ'
import type { FaqItem } from '@/components/FAQ'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Income Tax Calculator 2026 — Federal Tax Estimate',
  description:
    'Calculate your 2026 federal income tax with updated OBBBA tax brackets. Free income tax calculator with standard deductions, credits and state tax.',
  alternates: { canonical: 'https://taxcalculators.app' },
  robots: { index: true, follow: true },
}

const faqs: FaqItem[] = [
  {
    q: 'How do I calculate my federal income tax for 2026?',
    a: 'To calculate your 2026 federal income tax: (1) Start with your gross income from all sources (wages, salary, self-employment, investments). (2) Subtract above-the-line deductions like 401(k) contributions, IRA contributions, student loan interest, and HSA contributions to get your Adjusted Gross Income (AGI). (3) Subtract your standard deduction ($15,750 for single filers in 2026) or itemized deductions. (4) Apply the 2026 progressive tax brackets to your taxable income. (5) Subtract tax credits like the Child Tax Credit. Our income tax calculator performs all these steps automatically with 2026 One Big Beautiful Bill Act tax law.',
  },
  {
    q: 'What are the 2026 federal income tax brackets?',
    a: 'The 2026 federal income tax brackets for single filers under the One Big Beautiful Bill Act are: 10% on income up to $11,925; 12% on $11,926–$48,475; 22% on $48,476–$103,350; 24% on $103,351–$197,300; 32% on $197,301–$250,525; 35% on $250,526–$626,350; and 37% on income over $626,350. Married filing jointly brackets are roughly double the single brackets. The U.S. uses a progressive tax system, so only the income within each bracket is taxed at that rate.',
  },
  {
    q: 'What is the standard deduction for 2026?',
    a: 'The 2026 standard deductions are: Single filers — $15,750; Married Filing Jointly — $31,500; Head of Household — $23,625; Married Filing Separately — $15,750. Taxpayers age 65 or older receive an additional standard deduction of $2,000 (single) or $1,600 per spouse (married), plus a new $6,000 OBBBA senior bonus deduction. The standard deduction reduces your taxable income dollar-for-dollar and is taken by most taxpayers since it exceeds itemized deductions for the majority of filers.',
  },
  {
    q: 'What changed in the 2026 tax law (OBBBA)?',
    a: 'The One Big Beautiful Bill Act (OBBBA) made several significant changes for 2026: the standard deduction increased substantially (single filers: $15,750, MFJ: $31,500), new senior bonus deduction of $6,000 for taxpayers 65+, the Child Tax Credit increased to $2,200 per qualifying child (up from $2,000), the SALT deduction cap increased to $40,400, and the Social Security wage base for FICA taxes increased to $184,500. These changes affect income tax calculations, paycheck withholding, and tax refunds for 2026 filing.',
  },
  {
    q: 'What is the difference between marginal and effective tax rate?',
    a: 'Your marginal tax rate is the rate applied to your last dollar of taxable income — the highest bracket you reach. Your effective tax rate is your total federal tax divided by your total income — a lower blended average rate. For example, a single filer with $75,000 gross income and $59,250 taxable income has a 22% marginal rate (top bracket reached) but only about a 10-11% effective tax rate because most income is taxed at lower 10% and 12% rates. Understanding this distinction is critical for tax planning and estimating your federal income tax liability.',
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
  name: 'Income Tax Calculator 2026',
  url: 'https://taxcalculators.app',
  description: 'Free 2026 federal income tax calculator with OBBBA tax brackets, standard deduction, credits, and state tax.',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
}

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Calculate Your 2026 Federal Income Tax',
  step: [
    { '@type': 'HowToStep', name: 'Enter your filing status and income', text: 'Select your filing status (Single, Married Jointly, etc.) and enter your gross annual income. Add any above-the-line deductions like 401(k), IRA, student loan interest, and HSA contributions.' },
    { '@type': 'HowToStep', name: 'Choose standard or itemized deduction', text: 'Select the standard deduction ($15,750 for single filers in 2026) or enter your itemized deductions. Add dependents to apply the Child Tax Credit ($2,200 per child).' },
    { '@type': 'HowToStep', name: 'View your federal tax and bracket breakdown', text: 'Your estimated 2026 federal income tax, effective rate, and marginal rate appear instantly. The tax bracket visualization shows exactly how much income falls in each bracket.' },
  ],
}

const trustSignals = ['📋 2026 Updated', '⚡ Instant', '🔒 Private', '✓ Free']

export default function Home() {
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
              Free Income Tax Calculator 2026
            </h1>
            <p className="text-lg sm:text-xl text-white/80 mb-6 max-w-2xl mx-auto">
              Estimate your 2026 federal income tax using the latest One Big Beautiful Bill Act brackets. Includes standard deduction, credits, and state tax. Instant results.
            </p>
            <div className="flex flex-wrap justify-center gap-3 text-sm">
              {trustSignals.map(t => (
                <span key={t} className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-1.5 text-white font-medium">{t}</span>
              ))}
            </div>
          </div>

          <div className="max-w-4xl mx-auto px-4 mb-4">
            <AdBanner slot="1111111111" />
          </div>

          <div className="max-w-5xl mx-auto px-4">
            <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm shadow-2xl rounded-2xl overflow-hidden">
              <IncomeTaxCalculatorWrapper />
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-white dark:from-[#0f172a] to-transparent pointer-events-none" />
      </section>

      <section className="bg-white dark:bg-[#0f172a] pt-6">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="pb-4">
            <AdBanner slot="2222222222" />
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 mb-10">
            {[
              { icon: '🔒', label: 'Private', sub: 'Calculations stay in your browser' },
              { icon: '⚡', label: 'Instant', sub: 'Results update as you type' },
              { icon: '📋', label: '2026 Updated', sub: 'OBBBA tax law included' },
              { icon: '✓', label: 'Free', sub: 'No signup, no limits' },
            ].map(t => (
              <div key={t.label} className="flex flex-col items-center rounded-xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-[#1e293b] p-4 text-center shadow-sm">
                <span className="text-2xl mb-1">{t.icon}</span>
                <span className="text-sm font-semibold text-gray-800 dark:text-[#e2e8f0]">{t.label}</span>
                <span className="text-xs text-gray-400 mt-0.5">{t.sub}</span>
              </div>
            ))}
          </div>

          <div className="rounded-2xl bg-blue-50 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/50 px-6 py-5 mb-10">
            <h2 className="text-base font-bold text-blue-900 dark:text-blue-300 mb-2">
              How federal income tax works in 2026
            </h2>
            <p className="text-sm text-blue-800 dark:text-blue-400 leading-relaxed">
              The U.S. federal income tax system uses progressive tax brackets — only the income within each bracket is taxed at that rate, not your entire income. For 2026 under the One Big Beautiful Bill Act, the seven tax brackets range from 10% to 37%. Before calculating tax, you reduce your gross income by above-the-line deductions (401k, IRA, HSA, student loan interest) to get your AGI, then subtract your standard deduction or itemized deductions to get taxable income. Credits like the Child Tax Credit ($2,200 per child in 2026) and EITC directly reduce your tax liability. Our income tax calculator performs all these calculations instantly, showing your effective and marginal tax rates alongside a bracket visualization. All calculations run in your browser — your financial data never leaves your device.
            </p>
          </div>

          {/* How It Works */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">How Federal Income Tax Is Calculated</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              The U.S. federal income tax system uses a progressive bracket structure — meaning different portions of your income are taxed at different rates, not your entire income at one flat rate. The calculation follows five steps. First, add all gross income from every source: wages, salary, self-employment income, interest, dividends, capital gains, and rental income. Second, subtract above-the-line deductions to reach your Adjusted Gross Income (AGI): traditional 401(k) contributions (up to $23,500 in 2026), IRA deductions (up to $7,000), HSA contributions (up to $4,300), student loan interest (up to $2,500), and self-employed health insurance premiums. Third, subtract either the 2026 standard deduction ($15,750 single, $31,500 married filing jointly, $23,625 head of household) or your total itemized deductions — whichever is larger — to arrive at taxable income. Fourth, apply each bracket rate only to the income within that bracket's range. Fifth, subtract tax credits directly from your tax liability.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              The core formula is: <strong className="text-gray-900 dark:text-white">Tax = Sum of (income in each bracket × bracket rate) − tax credits</strong>. Credits are more powerful than deductions because they reduce tax dollar-for-dollar rather than reducing the income that gets taxed. A $2,200 Child Tax Credit saves exactly $2,200 in tax, while a $2,200 deduction saves only $484 for someone in the 22% bracket.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              The 2026 single filer brackets under the One Big Beautiful Bill Act: 10% on $0–$11,925 | 12% on $11,926–$48,475 | 22% on $48,476–$103,350 | 24% on $103,351–$197,300 | 32% on $197,301–$250,525 | 35% on $250,526–$626,350 | 37% above $626,350. Married filing jointly brackets are approximately double these thresholds, which is why joint filers with similar combined income often pay less than two single filers with the same individual incomes.
            </p>
          </div>

          {/* Worked Example */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Worked Example: Single Filer, $85,000 Salary</h2>
            <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-100 dark:border-amber-900/40 rounded-2xl p-6">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                Sarah is a software engineer in Denver earning $85,000 annually as a single filer. She contributes $10,000/year to her traditional 401(k) and pays $3,600/year in student loan interest.
              </p>
              <div className="space-y-1 text-sm text-gray-700 dark:text-gray-300 mb-4 font-mono bg-white/60 dark:bg-black/20 rounded-xl px-4 py-3">
                <div>Gross income:                  $85,000</div>
                <div>401(k) deduction:             −$10,000</div>
                <div>Student loan interest:          −$3,600</div>
                <div>AGI:                           $71,400</div>
                <div>Standard deduction:            −$15,750</div>
                <div>Taxable income:                $55,650</div>
                <div className="pt-2">10% × $11,925 =              $1,192.50</div>
                <div>12% × $36,550 =              $4,386.00</div>
                <div>22% × $7,175 =               $1,578.50</div>
                <div className="font-bold pt-1">Federal income tax:           $7,157</div>
              </div>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
                Sarah&apos;s effective tax rate is $7,157 ÷ $85,000 = <strong className="text-gray-900 dark:text-white">8.4%</strong>, even though her marginal rate is <strong className="text-gray-900 dark:text-white">22%</strong>. Without the $10,000 401(k) contribution, her taxable income rises to $65,650 and her federal tax increases to $9,353 — a $2,196 difference. That $10,000 contribution only reduces take-home pay by about $7,804 because $2,196 of it came from tax savings.
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                If Sarah adds two qualifying children to her situation, the $4,400 in Child Tax Credits would bring her tax down from $7,157 to $2,757 — a 61% reduction in her federal tax bill. This illustrates why credits are so much more powerful than equivalent deductions.
              </p>
            </div>
          </div>

          {/* Key Factors */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Key Factors That Affect Your Federal Tax</h2>
            <ul className="space-y-5">
              <li>
                <p className="font-semibold text-gray-900 dark:text-white mb-1">Filing status</p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">Married Filing Jointly brackets are roughly double single filer brackets, so spouses with significantly different incomes often see a "marriage bonus" — lower combined tax than filing as two singles. Head of Household filers get wider brackets than single filers. If you qualify for Head of Household (unmarried with a qualifying dependent), it can save $1,000–$3,000+ annually compared to single status.</p>
              </li>
              <li>
                <p className="font-semibold text-gray-900 dark:text-white mb-1">Standard deduction vs. itemized deductions</p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">The 2026 standard deduction ($15,750 single, $31,500 MFJ) is high enough that roughly 90% of filers take it. If you own a home with significant mortgage interest, pay high state and local taxes (SALT, capped at $40,400 in 2026), or make large charitable contributions, your itemized deductions may exceed the standard deduction. The calculator lets you compare both options.</p>
              </li>
              <li>
                <p className="font-semibold text-gray-900 dark:text-white mb-1">Pre-tax retirement and HSA contributions</p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">Every dollar contributed to a traditional 401(k) or IRA reduces taxable income dollar-for-dollar. At the 22% bracket, a $10,000 401(k) contribution saves $2,200 in federal income tax — and typically reduces state income tax as well. HSA contributions (up to $4,300 single / $8,550 family in 2026) are triple-tax-advantaged: pre-tax contribution, tax-free growth, tax-free withdrawal for medical expenses.</p>
              </li>
              <li>
                <p className="font-semibold text-gray-900 dark:text-white mb-1">Tax credits vs. deductions</p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">Credits reduce your tax liability directly, making them worth far more than equivalent deductions. The Child Tax Credit ($2,200 per qualifying child in 2026, up to $1,700 refundable), EITC (up to $8,231 for three or more children), and education credits can dramatically change your net tax owed. Refundable credits can even generate a refund beyond your total withholding.</p>
              </li>
              <li>
                <p className="font-semibold text-gray-900 dark:text-white mb-1">Capital gains and other income types</p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">Long-term capital gains (assets held over one year) are taxed at preferential 0%, 15%, or 20% rates — significantly lower than ordinary income rates. Self-employment income carries an additional 15.3% self-employment tax. Dividend income is taxed at qualified dividend rates (same as long-term capital gains). Each income type has its own rules, and combining them can affect which brackets your ordinary income reaches.</p>
              </li>
            </ul>
          </div>

          <div className="pb-10">
            <FAQ questions={faqs} />
          </div>

          <div className="pb-6">
            <AdBanner slot="3333333333" />
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
