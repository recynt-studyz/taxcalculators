#!/usr/bin/env python3
import os

STATES = [
    ("alabama", "Alabama", "AL", 5.0, True, "5% top rate", "Alabama has progressive income tax rates from 2% to 5%. The top 5% rate applies to income over $3,000 (single). Alabama uniquely allows a deduction for federal income taxes paid, which reduces state taxable income."),
    ("alaska", "Alaska", "AK", 0, False, "No income tax", "Alaska is one of nine states with no state income tax. Alaska residents pay zero state income tax on wages and investment income. Alaska also pays annual Permanent Fund Dividends to residents funded by oil revenues."),
    ("arizona", "Arizona", "AZ", 2.5, True, "2.5% flat rate", "Arizona has a 2.5% flat income tax rate — one of the lowest flat rates in the nation. This simplified structure means all Arizona taxable income is taxed at the same rate regardless of income level, making Arizona attractive for high earners relocating from higher-tax states."),
    ("arkansas", "Arkansas", "AR", 4.4, True, "4.4% top rate", "Arkansas has progressive income tax brackets with a top rate of 4.4%. Arkansas has been actively reducing income tax rates in recent years as part of ongoing tax reform legislation."),
    ("california", "California", "CA", 13.3, True, "13.3% top rate", "California has the highest top marginal state income tax rate in the nation at 13.3%, applying to income over $1 million. For most middle-income earners, the effective California tax rate is 4-7%. California also charges 1.1% SDI (State Disability Insurance) on all wages."),
    ("colorado", "Colorado", "CO", 4.4, True, "4.4% flat rate", "Colorado has a flat income tax rate of 4.4% on all taxable income. Colorado's TABOR (Taxpayer's Bill of Rights) limits state revenue growth and can result in refunds to taxpayers. Colorado recently reduced its flat rate from 4.55%."),
    ("connecticut", "Connecticut", "CT", 6.99, True, "6.99% top rate", "Connecticut has progressive income tax rates from 3% to 6.99%. The top 6.99% rate applies to income over $500,000 (single) or $1 million (married). Connecticut does not tax Social Security income for most residents."),
    ("delaware", "Delaware", "DE", 6.6, True, "6.6% top rate", "Delaware has progressive income tax brackets with a top rate of 6.6% on income over $60,000. Delaware has no state sales tax, which partially offsets its income tax burden. Delaware is known as a business-friendly state."),
    ("florida", "Florida", "FL", 0, False, "No income tax", "Florida has no state income tax, making it one of the most tax-friendly states. Florida funds state services primarily through sales tax (6% base rate). Florida's lack of income tax is a major draw for retirees and high-income earners relocating from high-tax states like New York and California."),
    ("georgia", "Georgia", "GA", 5.39, True, "5.39% flat rate", "Georgia is transitioning to a flat income tax. The 2026 rate is 5.39%, continuing scheduled reductions toward 4.99% by 2029. Georgia recently moved from a progressive bracket system to a flat rate structure, simplifying state tax calculations."),
    ("hawaii", "Hawaii", "HI", 11.0, True, "11% top rate", "Hawaii has one of the nation's highest state income tax rates with 12 progressive brackets topping out at 11% on income over $200,000 (single). Hawaii's high cost of living combined with high income taxes creates one of the highest overall tax burdens nationally."),
    ("idaho", "Idaho", "ID", 5.8, True, "5.8% top rate", "Idaho has progressive income tax with a top rate of 5.8%. Idaho recently simplified its tax structure and reduced rates. Idaho does not tax Social Security benefits for lower-income residents and offers a grocery credit to offset sales tax on food."),
    ("illinois", "Illinois", "IL", 4.95, True, "4.95% flat rate", "Illinois has a constitutionally mandated flat income tax rate of 4.95% on all taxable income. Illinois cannot implement a graduated income tax without a constitutional amendment. Illinois residents often face high property taxes alongside the flat income tax."),
    ("indiana", "Indiana", "IN", 3.05, True, "3.05% flat rate", "Indiana has a flat income tax rate of 3.05%, one of the lowest flat rates in the nation. Indiana counties also impose local income taxes averaging 1.5-2%, bringing the combined effective rate for most residents to roughly 4.5-5%."),
    ("iowa", "Iowa", "IA", 3.8, True, "3.8% top rate", "Iowa has been aggressively cutting income taxes with a flat 3.8% rate for 2026, with further reductions planned. Iowa does not tax Social Security benefits and offers retirement income exclusions for residents over 55."),
    ("kansas", "Kansas", "KS", 5.7, True, "5.7% top rate", "Kansas has progressive income tax with a top rate of 5.7% on income over $30,000 (single). Kansas recently restructured its brackets. Kansas allows a deduction for Social Security income for qualifying residents."),
    ("kentucky", "Kentucky", "KY", 4.0, True, "4% flat rate", "Kentucky has a flat income tax rate of 4%, reduced from 4.5% as part of ongoing tax reform. Kentucky plans additional reductions if revenue targets are met. Kentucky does not tax Social Security benefits and offers a pension income exclusion."),
    ("louisiana", "Louisiana", "LA", 3.0, True, "3% top rate", "Louisiana significantly reduced its income tax with a top rate of 3% in 2025. Louisiana eliminated lower tax brackets and simplified its structure. Louisiana also eliminated its corporate income tax in the same reform package."),
    ("maine", "Maine", "ME", 7.15, True, "7.15% top rate", "Maine has progressive income tax rates from 5.8% to 7.15%. The top 7.15% rate applies to taxable income over $23,000 (single). Maine does not tax Social Security benefits for residents below certain income limits."),
    ("maryland", "Maryland", "MD", 5.75, True, "5.75% top rate", "Maryland has progressive income tax from 2% to 5.75%. Maryland counties also impose local income taxes ranging from 2.25% to 3.2%, making the combined state and local rate one of the highest in the mid-Atlantic region."),
    ("massachusetts", "Massachusetts", "MA", 5.0, True, "5% flat rate", "Massachusetts has a flat income tax rate of 5% on most income, plus a 4% surtax on income over $1 million (the 'Millionaire's Tax') for an effective top rate of 9%. Massachusetts does not tax Social Security benefits or most pension income."),
    ("michigan", "Michigan", "MI", 4.25, True, "4.25% flat rate", "Michigan has a flat income tax rate of 4.25%. Michigan cities may impose local income taxes — Detroit charges 2.4% for residents. Michigan offers retirement income deductions and does not tax Social Security benefits for most residents."),
    ("minnesota", "Minnesota", "MN", 9.85, True, "9.85% top rate", "Minnesota has progressive income tax from 5.35% to 9.85%, with the top rate on income over $164,400 (single). Minnesota recently eliminated Social Security benefit taxation for most residents and offers substantial earned income and working family credits."),
    ("mississippi", "Mississippi", "MS", 4.7, True, "4.7% flat rate", "Mississippi is transitioning to a flat income tax rate of 4.7% in 2026 with further reductions planned. Mississippi exempts the first $10,000 of income from state tax. Mississippi does not tax Social Security benefits or retirement income for most residents."),
    ("missouri", "Missouri", "MO", 4.7, True, "4.7% top rate", "Missouri has a top income tax rate of 4.7% for 2026, down from prior years as part of ongoing reductions. Missouri allows a federal income tax deduction on state returns and does not tax Social Security benefits for qualifying residents."),
    ("montana", "Montana", "MT", 6.75, True, "6.75% top rate", "Montana has progressive income tax with a top rate of 6.75% on income over $20,500. Montana has no state sales tax, one of only five states without one, which helps offset the income tax burden."),
    ("nebraska", "Nebraska", "NE", 5.84, True, "5.84% top rate", "Nebraska has progressive income tax from 2.46% to 5.84%. Nebraska has been reducing its top rate over several years. Nebraska does not tax Social Security benefits for most residents and offers a state child tax credit of up to $2,000 per qualifying child."),
    ("nevada", "Nevada", "NV", 0, False, "No income tax", "Nevada has no state income tax. Nevada funds state government primarily through gaming taxes and a 6.85% sales tax. Nevada's lack of income tax makes it popular for retirees and remote workers relocating from California and other high-tax western states."),
    ("new-hampshire", "New Hampshire", "NH", 0, False, "No earned income tax", "New Hampshire has no tax on earned income (wages and salary). New Hampshire previously taxed interest and dividend income but eliminated that tax. New Hampshire funds state government through high property taxes and fees, resulting in some of the highest property taxes nationally."),
    ("new-jersey", "New Jersey", "NJ", 10.75, True, "10.75% top rate", "New Jersey has progressive income tax from 1.4% to 10.75%, with the top rate on income over $1 million. New Jersey exempts Social Security benefits and offers significant pension income exclusions. New Jersey's combined tax burden is among the highest nationally."),
    ("new-mexico", "New Mexico", "NM", 5.9, True, "5.9% top rate", "New Mexico has progressive income tax from 1.7% to 5.9%. New Mexico does not tax Social Security benefits for residents below certain income levels. New Mexico offers a child tax credit and working families tax credit on state returns."),
    ("new-york", "New York", "NY", 10.9, True, "10.9% top rate", "New York has progressive income tax from 4% to 10.9%, with the top rate on income over $25 million. New York City residents pay an additional city income tax up to 3.876%. New York does not tax Social Security benefits."),
    ("north-carolina", "North Carolina", "NC", 4.25, True, "4.25% flat rate", "North Carolina has a flat income tax rate of 4.25% for 2026, continuing annual reductions toward 2.49% by 2030. North Carolina has been among the most aggressive states in cutting income taxes. Social Security is not taxed."),
    ("north-dakota", "North Dakota", "ND", 2.5, True, "2.5% top rate", "North Dakota has very low income tax with a top rate of just 2.5%. North Dakota recently eliminated income taxes entirely for lower-income filers. North Dakota's income tax is one of the most favorable nationally for all income levels."),
    ("ohio", "Ohio", "OH", 3.75, True, "3.75% top rate", "Ohio has a simplified income tax with a top rate of 3.75% on income over $26,050. Ohio eliminated its lowest income tax bracket — income below $26,050 is not taxed at the state level. Ohio cities impose local income taxes ranging from 0% to 3%."),
    ("oklahoma", "Oklahoma", "OK", 4.75, True, "4.75% top rate", "Oklahoma has progressive income tax with a top rate of 4.75% on income over $7,200 (single). Oklahoma does not tax Social Security benefits and offers an earned income credit equal to 5% of the federal EITC."),
    ("oregon", "Oregon", "OR", 9.9, True, "9.9% top rate", "Oregon has progressive income tax from 4.75% to 9.9%, with the top rate on income over $125,000 (single). Oregon has no state sales tax, which partially offsets its high income tax. Oregon's unique kicker credit rebates excess revenue to taxpayers."),
    ("pennsylvania", "Pennsylvania", "PA", 3.07, True, "3.07% flat rate", "Pennsylvania has one of the lowest flat income tax rates at 3.07%. Philadelphia charges 3.75% local earned income tax for residents. Pennsylvania does not tax pension income, Social Security, or retirement distributions — making it very retiree-friendly."),
    ("rhode-island", "Rhode Island", "RI", 5.99, True, "5.99% top rate", "Rhode Island has progressive income tax from 3.75% to 5.99%, with the top rate on income over $176,050. Rhode Island offers an earned income credit equal to 15% of the federal EITC and does not tax Social Security for most residents."),
    ("south-carolina", "South Carolina", "SC", 6.4, True, "6.4% top rate", "South Carolina has progressive income tax with a top rate of 6.4% on income over $17,330. South Carolina offers substantial retirement income deductions up to $10,000 annually for taxpayers 65+. Social Security is not taxed."),
    ("south-dakota", "South Dakota", "SD", 0, False, "No income tax", "South Dakota has no state income tax. South Dakota funds state government through sales taxes and other fees. South Dakota's favorable tax environment makes it popular for trust and estate planning and attracts businesses and retirees."),
    ("tennessee", "Tennessee", "TN", 0, False, "No earned income tax", "Tennessee has no tax on earned income. Tennessee fully eliminated its Hall Tax on interest and dividends in 2022. Tennessee's 7% state sales tax (among the highest nationally) compensates for the lack of income tax. Tennessee is popular with retirees from high-tax states."),
    ("texas", "Texas", "TX", 0, False, "No income tax", "Texas has no state income tax, funded instead by high property taxes and a 6.25% state sales tax (up to 8.25% with local taxes). Texas is one of the top destinations for interstate migration due to its lack of income tax and business-friendly environment."),
    ("utah", "Utah", "UT", 4.55, True, "4.55% flat rate", "Utah has a flat income tax rate of 4.55% on all taxable income. Utah offers a non-refundable taxpayer tax credit for lower-income residents. Utah does not tax Social Security benefits for most residents."),
    ("vermont", "Vermont", "VT", 8.75, True, "8.75% top rate", "Vermont has progressive income tax from 3.35% to 8.75%, with the top rate on income over $229,550 (single). Vermont taxes Social Security benefits with exemptions for lower-income residents. Vermont offers a renter rebate credit for qualifying lower-income renters."),
    ("virginia", "Virginia", "VA", 5.75, True, "5.75% top rate", "Virginia has progressive income tax from 2% to 5.75% on income over $17,000. Virginia's relatively low standard deduction ($8,000 single) means more income is subject to state tax. Virginia taxes Social Security benefits for higher-income residents."),
    ("washington", "Washington", "WA", 0, False, "No earned income tax", "Washington has no state income tax on earned income. Washington imposes a 7% capital gains tax on long-term gains over $262,000. Washington's 6.5% sales tax helps fund state government. Washington is popular with tech workers seeking lower tax burden than California."),
    ("west-virginia", "West Virginia", "WV", 4.82, True, "4.82% top rate", "West Virginia has progressive income tax with a top rate of 4.82% for 2026. West Virginia has been reducing its income tax rates through recent legislation with further reductions planned. West Virginia does not tax Social Security benefits."),
    ("wisconsin", "Wisconsin", "WI", 7.65, True, "7.65% top rate", "Wisconsin has progressive income tax from 3.54% to 7.65%, with the top rate on income over $263,480 (single). Wisconsin taxes capital gains at the same rates as ordinary income. Wisconsin offers a homestead credit for lower-income residents."),
    ("wyoming", "Wyoming", "WY", 0, False, "No income tax", "Wyoming has no state income tax, no corporate income tax, and relatively low property taxes. Wyoming funds state government primarily through mineral extraction revenues. Wyoming is popular for trust and estate planning and attracts businesses and retirees seeking low-tax environments."),
]

def make_func_name(name):
    return ''.join(c for c in name.title() if c.isalpha()) + 'TaxCalculatorPage'

for slug, name, abbr, rate, has_tax, rate_display, blurb in STATES:
    dir_path = f"app/{slug}-tax-calculator"
    os.makedirs(dir_path, exist_ok=True)

    if has_tax:
        faq1_a = f"{name} has a {rate_display} state income tax for 2026. {blurb} The state income tax is calculated separately from federal income tax and is paid through payroll withholding or quarterly estimated payments."
        faq2_a = f"{name} has its own state standard deduction separate from the federal standard deduction ($15,750 single, $31,500 MFJ in 2026). For precise {name} state deduction amounts, consult the {name} Department of Revenue or a state tax professional."
        faq3_q = f"How does {name} income tax compare to other states?"
        faq3_a = f"{name}'s {rate_display} state income tax can be compared to other states using our state tax calculator above. The U.S. average top marginal state income tax rate is approximately 5-6%. Nine states have no income tax at all (Alaska, Florida, Nevada, New Hampshire, South Dakota, Tennessee, Texas, Washington, Wyoming), while California has the highest at 13.3%."
        faq4_q = f"Are there {name} state tax credits or deductions I should know about?"
        faq4_a = f"{name} offers state tax credits and deductions that may reduce your state tax liability. Common state credits include earned income credits, child tax credits, and credits for the elderly. Consult the {name} Department of Revenue website or a licensed tax professional for credits specific to your situation and income level."
    else:
        faq1_a = f"{name} has no state income tax in 2026 — residents pay zero state income tax on wages, salary, and most investment income. {blurb}"
        faq2_a = f"{name} does not have a state income tax standard deduction since there is no state income tax system. The federal standard deduction ($15,750 single, $31,500 MFJ in 2026) still applies to your federal return filed with the IRS."
        faq3_q = f"What taxes do {name} residents pay instead of income tax?"
        faq3_a = f"{blurb} State and local government funding in {name} comes from other sources including sales taxes, property taxes, excise taxes, and in some cases natural resource revenues. Understanding your total tax burden including these taxes gives a complete picture."
        faq4_q = f"Is {name} a good state for high earners from a tax perspective?"
        faq4_a = f"Yes — with no state income tax, {name} is very favorable for high earners. A person earning $200,000 saves $8,000-$20,000 per year in state income taxes compared to living in a state with a 4-10% income tax. This makes {name} attractive for executives, business owners, high-income professionals, and retirees relocating from high-tax states."

    func_name = make_func_name(name)

    content = f'''import type {{ Metadata }} from 'next'
import ToolHeader from '@/components/ToolHeader'
import StateTaxCalculatorWrapper from '@/components/StateTaxCalculatorWrapper'
import AdBanner from '@/components/AdBanner'
import FAQ from '@/components/FAQ'
import type {{ FaqItem }} from '@/components/FAQ'
import Footer from '@/components/Footer'

export const metadata: Metadata = {{
  title: '{name} Income Tax Calculator 2026',
  description: 'Calculate your {name} state income tax for 2026. Free {abbr} tax calculator with {rate_display} and combined federal + state income tax estimate.',
  alternates: {{ canonical: 'https://taxcalculators.app/{slug}-tax-calculator' }},
  robots: {{ index: true, follow: true }},
}}

const faqs: FaqItem[] = [
  {{
    q: 'What is the {name} income tax rate for 2026?',
    a: '{faq1_a.replace(chr(39), chr(92)+chr(39))}',
  }},
  {{
    q: 'Does {name} have a standard deduction?',
    a: '{faq2_a.replace(chr(39), chr(92)+chr(39))}',
  }},
  {{
    q: '{faq3_q}',
    a: '{faq3_a.replace(chr(39), chr(92)+chr(39))}',
  }},
  {{
    q: '{faq4_q}',
    a: '{faq4_a.replace(chr(39), chr(92)+chr(39))}',
  }},
  {{
    q: 'How do I calculate my combined federal and {name} state income tax?',
    a: 'Use the calculator above. Enter your income and {abbr} is pre-selected as your state. The calculator computes your 2026 federal income tax using the One Big Beautiful Bill Act brackets (10%-37%), adds your estimated {name} state income tax ({rate_display} simplified), and displays your total tax burden, combined effective rate, and annual take-home pay. All calculations happen instantly in your browser.',
  }},
]

const jsonLd = {{
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map(f => ({{
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: {{ '@type': 'Answer', text: f.a }},
  }})),
}}

const webAppSchema = {{
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: '{name} Income Tax Calculator 2026',
  url: 'https://taxcalculators.app/{slug}-tax-calculator',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Any',
  offers: {{ '@type': 'Offer', price: '0', priceCurrency: 'USD' }},
}}

const howToSchema = {{
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Calculate {name} State Income Tax',
  step: [
    {{ '@type': 'HowToStep', name: 'Enter your income and filing status', text: '{name} is pre-selected as your state. Enter your annual income and select your federal filing status (Single, Married Jointly, Head of Household).' }},
    {{ '@type': 'HowToStep', name: 'View your {name} state tax estimate', text: 'See your estimated {name} state income tax ({rate_display}), your federal income tax under 2026 OBBBA brackets, and your combined effective tax rate.' }},
    {{ '@type': 'HowToStep', name: 'Compare with other states', text: 'The calculator shows how your {name} tax compares to no-income-tax states and the national average, helping you understand your total tax burden.' }},
  ],
}}

const trustSignals = ['📋 2026 Updated', '⚡ Instant', '🔒 Private', '✓ Free']

export default function {func_name}() {{
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{{{ __html: JSON.stringify(jsonLd).replace(/</g, '\\\\u003c') }}}} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{{{ __html: JSON.stringify(webAppSchema).replace(/</g, '\\\\u003c') }}}} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{{{ __html: JSON.stringify(howToSchema).replace(/</g, '\\\\u003c') }}}} />

      <section className="relative bg-cover bg-center bg-no-repeat" style={{{{ backgroundImage: "url('/herobgtc.webp')" }}}}>
        <div className="absolute inset-0 bg-black/55" />
        <div className="relative z-10 pb-10">
          <ToolHeader />
          <div className="text-center text-white px-4 py-8">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 leading-tight">
              {name} Income Tax Calculator 2026
            </h1>
            <p className="text-lg sm:text-xl text-white/80 mb-6 max-w-2xl mx-auto">
              Estimate your {name} state income tax plus combined federal and {abbr} state tax for 2026. {rate_display}.
            </p>
            <div className="flex flex-wrap justify-center gap-3 text-sm">
              {{trustSignals.map(t => (
                <span key={{t}} className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-1.5 text-white font-medium">{{t}}</span>
              ))}}
            </div>
          </div>
          <div className="max-w-4xl mx-auto px-4 mb-4"><AdBanner slot="1111111111" /></div>
          <div className="max-w-5xl mx-auto px-4">
            <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm shadow-2xl rounded-2xl overflow-hidden">
              <StateTaxCalculatorWrapper defaultState="{abbr}" />
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-white dark:from-[#0f172a] to-transparent pointer-events-none" />
      </section>

      <section className="bg-white dark:bg-[#0f172a] pt-6">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="pb-4"><AdBanner slot="2222222222" /></div>

          <div className="rounded-2xl bg-blue-50 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/50 px-6 py-5 mb-10">
            <h2 className="text-base font-bold text-blue-900 dark:text-blue-300 mb-2">
              {name} State Income Tax 2026
            </h2>
            <p className="text-sm text-blue-800 dark:text-blue-400 leading-relaxed">
              {blurb} Use the calculator above to estimate your combined federal and {name} state income tax for 2026. State tax figures use a simplified rate — for precise {name} state tax calculations, consult the {name} Department of Revenue or a licensed tax professional.
            </p>
          </div>

          <div className="mb-4 text-center">
            <a href="/state-tax" className="text-sm text-[#1e3a5f] dark:text-blue-400 hover:underline">
              ← Compare all 50 state income tax rates
            </a>
          </div>

          <div className="pb-10">
            <FAQ questions={{faqs}} />
          </div>

          <div className="pb-6"><AdBanner slot="3333333333" /></div>
        </div>
      </section>

      <Footer />
    </>
  )
}}
'''

    with open(f"{dir_path}/page.tsx", 'w') as f:
        f.write(content)
    print(f"  Created: {slug}-tax-calculator/page.tsx")

print(f"\nDone! Created {len(STATES)} state pages.")
