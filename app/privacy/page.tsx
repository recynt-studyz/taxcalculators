import type { Metadata } from 'next'
import ToolHeader from '@/components/ToolHeader'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Privacy Policy — taxcalculators.app',
  description: 'Privacy policy for taxcalculators.app. All calculations are done locally in your browser. No personal financial data is collected or transmitted.',
  alternates: { canonical: 'https://taxcalculators.app/privacy' },
  robots: { index: true, follow: true },
}

const webAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'taxcalculators.app',
  url: 'https://taxcalculators.app',
  description: 'Free 2026 tax calculators for federal income tax, paycheck, self-employment, capital gains, W-4 withholding, and all 50 state income taxes.',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
}

export default function PrivacyPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema).replace(/</g, '\\u003c') }} />
      <section className="relative bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/herobgtc.webp')" }}>
        <div className="absolute inset-0 bg-black/55" />
        <div className="relative z-10 pb-10">
          <ToolHeader />
          <div className="text-center text-white px-4 py-8">
            <h1 className="text-3xl sm:text-4xl font-bold mb-3">Privacy Policy</h1>
            <p className="text-lg text-white/80 max-w-xl mx-auto">Your financial data never leaves your device</p>
          </div>
        </div>
        <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-white dark:from-[#0f172a] to-transparent pointer-events-none" />
      </section>

      <section className="bg-white dark:bg-[#0f172a] pt-6">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 pb-16 space-y-6 text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
          <p className="text-xs text-gray-400 dark:text-gray-500">Last updated: July 2026</p>

          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No personal financial data collected</h2>
            <p>All tax calculations on taxcalculators.app are performed entirely within your web browser using JavaScript. Your income, deductions, credits, and other financial information are <strong>never transmitted to our servers</strong>. We have no access to your financial data.</p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">localStorage</h2>
            <p>We use your browser&apos;s localStorage to save your calculator inputs so they persist across page reloads on the same device. This data is stored only on your device and is never sent to any server. You can clear this data at any time by clearing your browser&apos;s site data or localStorage.</p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Google AdSense</h2>
            <p>We display advertisements through Google AdSense (publisher ID: ca-pub-8792838105001561). Google may use cookies and similar technologies to show you relevant ads based on your browsing activity. Google&apos;s privacy policy governs this data use. You can opt out of personalized ads through Google&apos;s ad settings.</p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Analytics</h2>
            <p>We may use standard web analytics (such as page view counts) to understand how our tools are used. Analytics data is aggregated and does not identify individual users or contain financial information.</p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Cookies</h2>
            <p>We use a single cookie/localStorage key (&quot;tc-theme&quot;) to remember your dark mode preference. Advertising partners may set their own cookies in accordance with their privacy policies.</p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Contact</h2>
            <p>For privacy-related questions, please contact us through the Contact link in the footer.</p>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
