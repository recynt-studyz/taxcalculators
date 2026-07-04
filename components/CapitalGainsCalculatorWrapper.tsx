'use client'

import dynamic from 'next/dynamic'

const CapitalGainsCalculator = dynamic(() => import('./CapitalGainsCalculator'), { ssr: false })

export default function CapitalGainsCalculatorWrapper() {
  return <CapitalGainsCalculator />
}
