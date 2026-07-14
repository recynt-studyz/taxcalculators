import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Script from 'next/script'
import './globals.css'

const inter = Inter({ variable: '--font-inter', subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Tax Calculators 2026 — Free Federal & State Tax Tools',
  description:
    'Free 2026 tax calculators for income tax, paycheck, self-employment, capital gains, W-4 withholding and all 50 state income taxes. Updated for OBBBA.',
  keywords: [
    'tax calculator',
    'income tax calculator 2026',
    'paycheck calculator',
    'self employment tax calculator',
    'capital gains tax calculator',
    'w4 calculator',
    'tax refund calculator',
    'state income tax calculator',
    'federal tax calculator',
    'tax bracket calculator 2026',
  ],
  metadataBase: new URL('https://taxcalculators.app'),
  alternates: { canonical: 'https://taxcalculators.app' },
  openGraph: {
    title: 'Tax Calculators 2026 — Free Federal & State Tax Tools',
    description:
      'Free 2026 tax calculators for federal income tax, paycheck, self-employment, capital gains and all 50 state income taxes.',
    url: 'https://taxcalculators.app',
    siteName: 'taxcalculators.app',
    type: 'website',
    images: [{ url: '/opengraph-image.png', width: 1200, height: 630, alt: 'Free Tax Calculators 2026' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tax Calculators 2026 — Free Federal & State Tax Tools',
    description: 'Free 2026 tax calculators for income tax, paycheck, self-employment, capital gains and all 50 states.',
    images: ['/twitter-image.png'],
  },
  robots: { index: true, follow: true },
  verification: { google: 'PLACEHOLDER_GOOGLE_SITE_VERIFICATION' },
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <head>
        <meta name="google-adsense-account" content="ca-pub-5035661017594256" />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{if(localStorage.getItem('tc-theme')==='dark'){document.documentElement.classList.add('dark')}}catch(e){}})()`,
          }}
        />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-F6X3FSBBZS"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-F6X3FSBBZS');
          `}
        </Script>
      </head>
      <body
        className="min-h-full flex flex-col bg-white dark:bg-[#0f172a] text-gray-900 dark:text-[#e2e8f0]"
        style={{ fontFamily: 'var(--font-inter), sans-serif' }}
      >
        {children}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5035661017594256"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </body>
    </html>
  )
}
