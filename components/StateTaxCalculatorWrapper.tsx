'use client'

import dynamic from 'next/dynamic'

const StateTaxCalculator = dynamic(() => import('./StateTaxCalculator'), { ssr: false })

export default function StateTaxCalculatorWrapper({ defaultState }: { defaultState?: string }) {
  return <StateTaxCalculator defaultState={defaultState} />
}
