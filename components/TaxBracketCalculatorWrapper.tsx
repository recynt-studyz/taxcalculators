'use client'

import dynamic from 'next/dynamic'

const TaxBracketCalculator = dynamic(() => import('./TaxBracketCalculator'), { ssr: false })

export default function TaxBracketCalculatorWrapper() {
  return <TaxBracketCalculator />
}
