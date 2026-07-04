'use client'

import dynamic from 'next/dynamic'

const TaxRefundCalculator = dynamic(() => import('./TaxRefundCalculator'), { ssr: false })

export default function TaxRefundCalculatorWrapper() {
  return <TaxRefundCalculator />
}
