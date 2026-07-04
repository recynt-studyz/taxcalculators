'use client'

import dynamic from 'next/dynamic'

const W4Calculator = dynamic(() => import('./W4Calculator'), { ssr: false })

export default function W4CalculatorWrapper() {
  return <W4Calculator />
}
