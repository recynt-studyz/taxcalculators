import type { MetadataRoute } from 'next'

const BASE = 'https://taxcalculators.app'

const STATE_SLUGS = [
  'alabama', 'alaska', 'arizona', 'arkansas', 'california',
  'colorado', 'connecticut', 'delaware', 'florida', 'georgia',
  'hawaii', 'idaho', 'illinois', 'indiana', 'iowa',
  'kansas', 'kentucky', 'louisiana', 'maine', 'maryland',
  'massachusetts', 'michigan', 'minnesota', 'mississippi', 'missouri',
  'montana', 'nebraska', 'nevada', 'new-hampshire', 'new-jersey',
  'new-mexico', 'new-york', 'north-carolina', 'north-dakota', 'ohio',
  'oklahoma', 'oregon', 'pennsylvania', 'rhode-island', 'south-carolina',
  'south-dakota', 'tennessee', 'texas', 'utah', 'vermont',
  'virginia', 'washington', 'west-virginia', 'wisconsin', 'wyoming',
]

export default function sitemap(): MetadataRoute.Sitemap {
  const statePages: MetadataRoute.Sitemap = STATE_SLUGS.map(slug => ({
    url: `${BASE}/${slug}-tax-calculator`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  return [
    { url: BASE,                              lastModified: new Date(), changeFrequency: 'weekly', priority: 1.0 },
    { url: `${BASE}/paycheck`,                lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE}/self-employed`,           lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE}/capital-gains`,           lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE}/tax-bracket`,             lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE}/w4-withholding`,          lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE}/tax-refund`,              lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE}/state-tax`,               lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    ...statePages,
    { url: `${BASE}/about`,                   lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE}/privacy`,                 lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
  ]
}
