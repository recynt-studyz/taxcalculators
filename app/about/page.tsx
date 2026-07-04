import type { Metadata } from 'next'
import ToolHeader from '@/components/ToolHeader'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'About — taxcalculators.app',
  description: 'About taxcalculators.app — free 2026 tax calculators for federal income tax, paycheck, self-employment, capital gains, and all 50 states.',
  alternates: { canonical: 'https://taxcalculators.app/about' },
  robots: { index: true, follow: true },
}

export default function AboutPage() {
  return (
    <>
      <section className="relative bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/herobgtc.webp')" }}>
        <div className="absolute inset-0 bg-black/55" />
        <div className="relative z-10 pb-10">
          <ToolHeader />
          <div className="text-center text-white px-4 py-8">
            <h1 className="text-3xl sm:text-4xl font-bold mb-3">About taxcalculators.app</h1>
            <p className="text-lg text-white/80 max-w-xl mx-auto">
              Free, private, and accurate tax calculators for 2026
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-white dark:from-[#0f172a] to-transparent pointer-events-none" />
      </section>

      <section className="bg-white dark:bg-[#0f172a] pt-6">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 pb-16">
          <div className="prose prose-gray dark:prose-invert max-w-none space-y-6 text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
            <div className="rounded-2xl bg-blue-50 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/50 px-6 py-5">
              <h2 className="text-lg font-bold text-blue-900 dark:text-blue-300 mb-2">Our mission</h2>
              <p className="text-blue-800 dark:text-blue-400">
                taxcalculators.app provides free, accurate, and private tax calculation tools for the 2026 tax year. Our calculators cover federal income tax, paycheck take-home pay, self-employment tax, capital gains tax, W-4 withholding, tax refund estimation, and state income taxes for all 50 states — all updated for the One Big Beautiful Bill Act (OBBBA) of 2026.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Educational purpose</h2>
              <p>
                All calculators on taxcalculators.app are provided for <strong>educational and informational purposes only</strong>. They are designed to help taxpayers understand approximately how federal and state income tax is calculated, how paycheck withholding works, and how different deductions and credits affect tax liability.
              </p>
              <p className="mt-3">
                <strong>These calculators do not constitute tax, legal, or financial advice.</strong> Individual tax situations vary significantly based on factors our calculators may not capture. Always consult a licensed tax professional, Certified Public Accountant (CPA), or enrolled agent for personalized tax advice. For official tax information, refer to the Internal Revenue Service at <a href="https://www.irs.gov" className="text-[#1e3a5f] dark:text-blue-400 underline" target="_blank" rel="noopener noreferrer">irs.gov</a>.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Privacy — your data stays with you</h2>
              <p>
                All calculations happen entirely in your browser using JavaScript. Your income, deductions, and other financial data are never sent to any server. We do not collect, store, or transmit any personal financial information. Input values are saved only to your browser&apos;s localStorage for convenience across sessions on the same device.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">2026 tax law accuracy</h2>
              <p>
                Our calculators are updated for 2026 tax law including the One Big Beautiful Bill Act (OBBBA). Key data points used: federal tax brackets, standard deductions, Child Tax Credit amounts, FICA wage base, EITC limits, long-term capital gains rates, and state income tax rates. While we strive for accuracy, tax law is complex and changes frequently. Always verify important calculations with a tax professional or the IRS.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Disclaimer</h2>
              <p className="text-amber-700 dark:text-amber-400 font-medium">
                This calculator provides estimates for educational purposes only based on 2026 tax law. Individual tax situations vary. Consult a licensed tax professional or CPA for personalized advice.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
