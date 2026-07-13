import type { Metadata } from 'next'
import ToolHeader from '@/components/ToolHeader'
import StateTaxCalculatorWrapper from '@/components/StateTaxCalculatorWrapper'
import AdBanner from '@/components/AdBanner'
import FAQ from '@/components/FAQ'
import type { FaqItem } from '@/components/FAQ'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'State Income Tax Calculator 2026 — All 50 States',
  description:
    'Calculate state income tax for all 50 states in 2026. Free state tax calculator showing rates, estimates and comparison with no-tax states.',
  alternates: { canonical: 'https://taxcalculators.app/state-tax' },
  robots: { index: true, follow: true },
}

const faqs: FaqItem[] = [
  {
    q: 'Which states have no income tax?',
    a: 'Nine states have no state income tax as of 2026: Alaska, Florida, Nevada, New Hampshire, South Dakota, Tennessee, Texas, Washington, and Wyoming. Residents of these states pay no state income tax on wages and salary. However, some of these states have higher property taxes or sales taxes to compensate. New Hampshire taxes interest and dividend income at 3% (though this is being phased out). Washington imposes a capital gains tax on gains over $250,000.',
  },
  {
    q: 'How do state income taxes work?',
    a: 'Most states with income taxes use progressive tax brackets similar to the federal system, though some states use a flat rate. State income tax is calculated separately from federal income tax, typically starting with your federal AGI or taxable income and applying state-specific adjustments. State taxes are paid through payroll withholding (employer deducts state tax each paycheck) or quarterly estimated payments for self-employed individuals. State income taxes paid are deductible on federal Schedule A (up to the $40,400 SALT cap in 2026).',
  },
  {
    q: 'Do I pay taxes in both my home state and work state?',
    a: 'If you live and work in different states, you may owe taxes in both. Most states have reciprocity agreements with neighboring states, allowing residents to pay taxes only in their home state. Without a reciprocity agreement, you would file in both states — paying your work state tax and receiving a credit in your home state to avoid double taxation. Remote workers who work entirely from home generally only owe taxes to their home state. Consult a tax professional if you work in multiple states.',
  },
  {
    q: 'How does state tax affect my take-home pay?',
    a: 'State income tax directly reduces your take-home pay through paycheck withholding. States with high income tax rates (like California at 13.3% top rate, Hawaii at 11%, or New Jersey at 10.75%) significantly reduce net pay for high earners. For example, someone earning $100,000 in California pays roughly $7,000–$9,000 in state income tax annually, reducing take-home pay by about $600–$750/month. In contrast, residents of no-income-tax states like Texas or Florida keep all of that as take-home pay.',
  },
  {
    q: 'Which state has the highest income tax?',
    a: 'California has the highest top marginal state income tax rate at 13.3%, applying to incomes over $1 million. Other high-rate states include Hawaii (11% top rate), New Jersey (10.75%), Oregon (9.9%), Minnesota (9.85%), and New York (10.9% top rate). However, top marginal rates only affect the highest earners. Effective state income tax rates for average earners in these states are typically 4-7%. States like Pennsylvania (3.07% flat), Indiana (3.05%), and Michigan (4.25%) have lower flat rates.',
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
  name: 'State Income Tax Calculator 2026',
  url: 'https://taxcalculators.app/state-tax',
  description: 'Free 2026 state income tax calculator for all 50 states with comparison to no-tax states.',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
}

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Calculate State Income Tax',
  step: [
    { '@type': 'HowToStep', name: 'Select your state', text: 'Choose your state from the dropdown or click one of the nine no-income-tax states. See the state\'s tax rate immediately.' },
    { '@type': 'HowToStep', name: 'Enter your income and filing status', text: 'Enter your annual income and select your federal filing status. The calculator computes both state and federal tax.' },
    { '@type': 'HowToStep', name: 'View state tax and comparison', text: 'See your estimated state income tax, combined federal + state effective rate, and how your state compares to others including no-tax states.' },
  ],
}

const trustSignals = ['📋 2026 Updated', '⚡ Instant', '🔒 Private', '✓ Free']

export default function StateTaxPage() {
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
              State Income Tax Calculator 2026
            </h1>
            <p className="text-lg sm:text-xl text-white/80 mb-6 max-w-2xl mx-auto">
              Calculate state income tax for all 50 states. Compare state tax rates and see how much you would save in a no-income-tax state.
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
              <StateTaxCalculatorWrapper />
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-white dark:from-[#0f172a] to-transparent pointer-events-none" />
      </section>

      <section className="bg-white dark:bg-[#0f172a] pt-6">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="pb-4"><AdBanner slot="2222222222" /></div>
          <div className="rounded-2xl bg-blue-50 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/50 px-6 py-5 mb-10">
            <h2 className="text-base font-bold text-blue-900 dark:text-blue-300 mb-2">State income taxes in 2026</h2>
            <p className="text-sm text-blue-800 dark:text-blue-400 leading-relaxed">
              State income taxes vary dramatically across the United States in 2026. Nine states have no income tax at all (Alaska, Florida, Nevada, New Hampshire, South Dakota, Tennessee, Texas, Washington, and Wyoming), while California has the nation&apos;s highest top marginal rate at 13.3%. Most states with income taxes use progressive bracket systems similar to the federal government, though some use flat rates. The state income tax you pay is partially deductible on your federal return via the SALT (State and Local Tax) deduction, capped at $40,400 in 2026. For individual state calculators with state-specific brackets, deductions, and tax credits, see the state-specific pages linked below.
            </p>
          </div>
          {/* How It Works */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">How State Income Tax Is Calculated</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              State income tax is calculated completely separately from federal income tax, though the two systems are interconnected. Most states begin their calculation with your federal Adjusted Gross Income (AGI) — the number from Line 11 of your federal Form 1040 — and then apply state-specific adjustments. Some states add back income that is federally excluded (like some municipal bond interest). Most states subtract income they choose not to tax, such as Social Security benefits, military retirement pay, or public pension income.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              After adjustments, you subtract your state standard deduction (which is different from the federal deduction and varies widely by state) or state itemized deductions. The resulting state taxable income is then taxed using either a flat rate or progressive brackets specific to your state. States with flat rates (like Illinois at 4.95%, Pennsylvania at 3.07%, and Colorado at 4.4%) tax all income at one rate. States with progressive brackets (like California with 10 brackets up to 13.3%, or New York with brackets up to 10.9%) tax higher income at progressively higher rates.
            </p>
            <div className="bg-gray-100 dark:bg-gray-800 rounded-xl px-4 py-3 mb-4 text-sm font-mono text-gray-800 dark:text-gray-200">
              State Tax = (Federal AGI ± State Adjustments − State Standard Deduction) × State Rate(s) − State Credits
            </div>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Your state taxes paid are deductible on your federal Schedule A as part of the SALT (State and Local Tax) deduction, capped at $40,400 in 2026 under OBBBA. At the 22% federal bracket, paying $8,000 in state income tax generates $1,760 in federal tax savings, reducing the true net cost of state taxes by about 22%.
            </p>
          </div>

          {/* Worked Example */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Worked Example: Comparing State Tax Across Three States</h2>
            <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-100 dark:border-amber-900/40 rounded-2xl p-6">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                Emma is a single filer earning $80,000 as a remote software developer who can live anywhere. Here is how her state income tax differs across three states, with the same federal tax of approximately $9,155 in each scenario (federal is identical regardless of state).
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-gray-700 dark:text-gray-300 mb-4">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-gray-700">
                      <th className="text-left py-2 pr-4 font-semibold text-gray-900 dark:text-white">State</th>
                      <th className="text-right py-2 pr-4 font-semibold text-gray-900 dark:text-white">State Rate</th>
                      <th className="text-right py-2 pr-4 font-semibold text-gray-900 dark:text-white">Est. State Tax</th>
                      <th className="text-right py-2 font-semibold text-gray-900 dark:text-white">Combined Eff. Rate</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                    <tr>
                      <td className="py-2 pr-4">Texas</td>
                      <td className="text-right py-2 pr-4">0% (no income tax)</td>
                      <td className="text-right py-2 pr-4">$0</td>
                      <td className="text-right py-2">11.4%</td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-4">Colorado</td>
                      <td className="text-right py-2 pr-4">4.4% flat</td>
                      <td className="text-right py-2 pr-4">~$2,833</td>
                      <td className="text-right py-2">15.0%</td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-4">California</td>
                      <td className="text-right py-2 pr-4">~6% effective</td>
                      <td className="text-right py-2 pr-4">~$4,800</td>
                      <td className="text-right py-2">17.4%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
                Moving from California to Texas saves Emma approximately $4,800/year in state income taxes — or $400/month. Over 10 years (not accounting for investment growth), that&apos;s $48,000 in additional take-home pay. However, Texas has higher property taxes (averaging 1.6% vs. California&apos;s 0.73% effective rate), so homeowners must factor property tax into the real comparison.
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                The federal SALT deduction partially offsets Emma&apos;s California state tax. At the 22% federal bracket, her $4,800 state tax reduces federal tax by $1,056 — so the net cost of California state tax is about $3,744, not $4,800. This SALT offset makes high-tax states slightly less disadvantageous for federal itemizers.
              </p>
            </div>
          </div>

          {/* Key Factors */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Key Factors That Affect Your State Tax Bill</h2>
            <ul className="space-y-5">
              <li>
                <p className="font-semibold text-gray-900 dark:text-white mb-1">Tax structure: flat rate vs. progressive brackets</p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">Flat-rate states apply one rate to all taxable income, making the calculation predictable: Pennsylvania at 3.07% means every dollar of taxable income is taxed at 3.07%. Progressive states like California and New York use multiple brackets where only income above each threshold is taxed at the higher rate — similar to federal brackets. For middle-income earners, many progressive-bracket states have effective rates well below their top marginal rate.</p>
              </li>
              <li>
                <p className="font-semibold text-gray-900 dark:text-white mb-1">Social Security and retirement income exclusions</p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">Many states provide valuable exemptions that make them far more favorable for retirees than their headline rate suggests. Pennsylvania (3.07%) exempts all Social Security, pension income, and retirement account distributions — making it effectively a zero-income-tax state for most retirees despite its nominal rate. Illinois (4.95%) also exempts Social Security and most retirement income. This is why effective state tax rates for retirees can differ dramatically from the rates paid during working years in the same state.</p>
              </li>
              <li>
                <p className="font-semibold text-gray-900 dark:text-white mb-1">Local income taxes stacked on state rates</p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">Several states allow municipalities to impose local income taxes on top of state rates. New York City residents pay up to 3.876% city tax in addition to New York State&apos;s 4%–10.9%, creating a combined state+local rate up to 14.776% for high earners. Maryland counties add 2.25%–3.2% to the state rate. Indiana counties add 1%–2%. When comparing states, the combined state+local rate is the number that matters for take-home pay calculations.</p>
              </li>
              <li>
                <p className="font-semibold text-gray-900 dark:text-white mb-1">Federal SALT deduction offset</p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">The federal deduction for State and Local Taxes (SALT) is capped at $40,400 in 2026 under OBBBA — a significant increase from the prior $10,000 cap. For taxpayers who itemize, this deduction reduces federal taxable income by the amount of state income and property taxes paid, up to the cap. At the 22% federal bracket, each $1 of state tax paid generates 22 cents in federal tax savings — reducing the effective cost of state taxes meaningfully for federal itemizers.</p>
              </li>
              <li>
                <p className="font-semibold text-gray-900 dark:text-white mb-1">Total tax burden beyond income tax</p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">No-income-tax states are not necessarily low-tax states overall. Texas and Florida offset income tax revenue with high property taxes and sales taxes. Texas property taxes average 1.6%–2% of home value annually — significantly higher than California&apos;s Prop 13-capped rates. Washington has a 6.5% sales tax and a 7% capital gains excise tax on gains over $262,000. Tennessee has a 7% state sales tax. Evaluating the full tax environment — income, property, sales, and estate taxes — gives a complete picture of living costs in any state.</p>
              </li>
            </ul>
          </div>

          <div className="pb-10"><FAQ questions={faqs} /></div>

          <div className="mb-10">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">State income tax calculators — all 50 states</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
              {[
                ['Alabama','alabama'],['Alaska','alaska'],['Arizona','arizona'],['Arkansas','arkansas'],['California','california'],
                ['Colorado','colorado'],['Connecticut','connecticut'],['Delaware','delaware'],['Florida','florida'],['Georgia','georgia'],
                ['Hawaii','hawaii'],['Idaho','idaho'],['Illinois','illinois'],['Indiana','indiana'],['Iowa','iowa'],
                ['Kansas','kansas'],['Kentucky','kentucky'],['Louisiana','louisiana'],['Maine','maine'],['Maryland','maryland'],
                ['Massachusetts','massachusetts'],['Michigan','michigan'],['Minnesota','minnesota'],['Mississippi','mississippi'],['Missouri','missouri'],
                ['Montana','montana'],['Nebraska','nebraska'],['Nevada','nevada'],['New Hampshire','new-hampshire'],['New Jersey','new-jersey'],
                ['New Mexico','new-mexico'],['New York','new-york'],['North Carolina','north-carolina'],['North Dakota','north-dakota'],['Ohio','ohio'],
                ['Oklahoma','oklahoma'],['Oregon','oregon'],['Pennsylvania','pennsylvania'],['Rhode Island','rhode-island'],['South Carolina','south-carolina'],
                ['South Dakota','south-dakota'],['Tennessee','tennessee'],['Texas','texas'],['Utah','utah'],['Vermont','vermont'],
                ['Virginia','virginia'],['Washington','washington'],['West Virginia','west-virginia'],['Wisconsin','wisconsin'],['Wyoming','wyoming'],
              ].map(([name, slug]) => (
                <a
                  key={slug}
                  href={`/${slug}-tax-calculator`}
                  className="text-xs text-center px-2 py-2 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-[#1e3a5f] hover:text-[#1e3a5f] dark:hover:text-blue-400 transition-colors"
                >
                  {name}
                </a>
              ))}
            </div>
          </div>

          <div className="pb-6"><AdBanner slot="3333333333" /></div>
        </div>
      </section>

      <Footer />
    </>
  )
}
