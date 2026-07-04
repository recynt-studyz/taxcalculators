'use client'

import dynamic from 'next/dynamic'

const SelfEmployedCalculator = dynamic(() => import('./SelfEmployedCalculator'), { ssr: false })

export default function SelfEmployedCalculatorWrapper() {
  return <SelfEmployedCalculator />
}
