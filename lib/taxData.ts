export type FilingStatus = 'single' | 'mfj' | 'mfs' | 'hoh'

export interface Bracket {
  min: number
  max: number
  rate: number
}

export const BRACKETS: Record<FilingStatus, Bracket[]> = {
  single: [
    { min: 0, max: 11925, rate: 0.10 },
    { min: 11925, max: 48475, rate: 0.12 },
    { min: 48475, max: 103350, rate: 0.22 },
    { min: 103350, max: 197300, rate: 0.24 },
    { min: 197300, max: 250525, rate: 0.32 },
    { min: 250525, max: 626350, rate: 0.35 },
    { min: 626350, max: Infinity, rate: 0.37 },
  ],
  mfj: [
    { min: 0, max: 23850, rate: 0.10 },
    { min: 23850, max: 96950, rate: 0.12 },
    { min: 96950, max: 206700, rate: 0.22 },
    { min: 206700, max: 394600, rate: 0.24 },
    { min: 394600, max: 501050, rate: 0.32 },
    { min: 501050, max: 751600, rate: 0.35 },
    { min: 751600, max: Infinity, rate: 0.37 },
  ],
  mfs: [
    { min: 0, max: 11925, rate: 0.10 },
    { min: 11925, max: 48475, rate: 0.12 },
    { min: 48475, max: 103350, rate: 0.22 },
    { min: 103350, max: 197300, rate: 0.24 },
    { min: 197300, max: 250525, rate: 0.32 },
    { min: 250525, max: 626350, rate: 0.35 },
    { min: 626350, max: Infinity, rate: 0.37 },
  ],
  hoh: [
    { min: 0, max: 17000, rate: 0.10 },
    { min: 17000, max: 64850, rate: 0.12 },
    { min: 64850, max: 103350, rate: 0.22 },
    { min: 103350, max: 197300, rate: 0.24 },
    { min: 197300, max: 250500, rate: 0.32 },
    { min: 250500, max: 626350, rate: 0.35 },
    { min: 626350, max: Infinity, rate: 0.37 },
  ],
}

export const STANDARD_DEDUCTIONS: Record<FilingStatus, number> = {
  single: 15750,
  mfj: 31500,
  mfs: 15750,
  hoh: 23625,
}

// Additional 65+ deduction (standard + OBBBA senior bonus)
export const SENIOR_EXTRA: Record<FilingStatus, number> = {
  single: 2000 + 6000,  // $8,000
  mfj: 1600 + 6000,     // $7,600 per spouse
  mfs: 2000 + 6000,
  hoh: 2000 + 6000,
}

// Long-term capital gains brackets 2026
export const LTCG_BRACKETS: Record<FilingStatus, { max: number; rate: number }[]> = {
  single: [
    { max: 48350, rate: 0 },
    { max: 533400, rate: 0.15 },
    { max: Infinity, rate: 0.20 },
  ],
  mfj: [
    { max: 96700, rate: 0 },
    { max: 600050, rate: 0.15 },
    { max: Infinity, rate: 0.20 },
  ],
  mfs: [
    { max: 48350, rate: 0 },
    { max: 300000, rate: 0.15 },
    { max: Infinity, rate: 0.20 },
  ],
  hoh: [
    { max: 64750, rate: 0 },
    { max: 566700, rate: 0.15 },
    { max: Infinity, rate: 0.20 },
  ],
}

export const NIIT_THRESHOLD: Record<FilingStatus, number> = {
  single: 200000,
  mfj: 250000,
  mfs: 125000,
  hoh: 200000,
}

// FICA 2026
export const SS_RATE = 0.062
export const SS_WAGE_BASE = 184500
export const MEDICARE_RATE = 0.0145
export const ADDL_MEDICARE_RATE = 0.009
export const ADDL_MEDICARE_THRESHOLD: Record<FilingStatus, number> = {
  single: 200000,
  mfj: 250000,
  mfs: 125000,
  hoh: 200000,
}

export interface StateInfo {
  name: string
  abbr: string
  rate: number
  hasIncomeTax: boolean
}

export const STATES: Record<string, StateInfo> = {
  AL: { name: 'Alabama', abbr: 'AL', rate: 0.05, hasIncomeTax: true },
  AK: { name: 'Alaska', abbr: 'AK', rate: 0, hasIncomeTax: false },
  AZ: { name: 'Arizona', abbr: 'AZ', rate: 0.025, hasIncomeTax: true },
  AR: { name: 'Arkansas', abbr: 'AR', rate: 0.044, hasIncomeTax: true },
  CA: { name: 'California', abbr: 'CA', rate: 0.133, hasIncomeTax: true },
  CO: { name: 'Colorado', abbr: 'CO', rate: 0.044, hasIncomeTax: true },
  CT: { name: 'Connecticut', abbr: 'CT', rate: 0.0699, hasIncomeTax: true },
  DE: { name: 'Delaware', abbr: 'DE', rate: 0.066, hasIncomeTax: true },
  FL: { name: 'Florida', abbr: 'FL', rate: 0, hasIncomeTax: false },
  GA: { name: 'Georgia', abbr: 'GA', rate: 0.0539, hasIncomeTax: true },
  HI: { name: 'Hawaii', abbr: 'HI', rate: 0.11, hasIncomeTax: true },
  ID: { name: 'Idaho', abbr: 'ID', rate: 0.058, hasIncomeTax: true },
  IL: { name: 'Illinois', abbr: 'IL', rate: 0.0495, hasIncomeTax: true },
  IN: { name: 'Indiana', abbr: 'IN', rate: 0.0305, hasIncomeTax: true },
  IA: { name: 'Iowa', abbr: 'IA', rate: 0.038, hasIncomeTax: true },
  KS: { name: 'Kansas', abbr: 'KS', rate: 0.057, hasIncomeTax: true },
  KY: { name: 'Kentucky', abbr: 'KY', rate: 0.04, hasIncomeTax: true },
  LA: { name: 'Louisiana', abbr: 'LA', rate: 0.03, hasIncomeTax: true },
  ME: { name: 'Maine', abbr: 'ME', rate: 0.0715, hasIncomeTax: true },
  MD: { name: 'Maryland', abbr: 'MD', rate: 0.0575, hasIncomeTax: true },
  MA: { name: 'Massachusetts', abbr: 'MA', rate: 0.05, hasIncomeTax: true },
  MI: { name: 'Michigan', abbr: 'MI', rate: 0.0425, hasIncomeTax: true },
  MN: { name: 'Minnesota', abbr: 'MN', rate: 0.0985, hasIncomeTax: true },
  MS: { name: 'Mississippi', abbr: 'MS', rate: 0.047, hasIncomeTax: true },
  MO: { name: 'Missouri', abbr: 'MO', rate: 0.047, hasIncomeTax: true },
  MT: { name: 'Montana', abbr: 'MT', rate: 0.0675, hasIncomeTax: true },
  NE: { name: 'Nebraska', abbr: 'NE', rate: 0.0584, hasIncomeTax: true },
  NV: { name: 'Nevada', abbr: 'NV', rate: 0, hasIncomeTax: false },
  NH: { name: 'New Hampshire', abbr: 'NH', rate: 0, hasIncomeTax: false },
  NJ: { name: 'New Jersey', abbr: 'NJ', rate: 0.1075, hasIncomeTax: true },
  NM: { name: 'New Mexico', abbr: 'NM', rate: 0.059, hasIncomeTax: true },
  NY: { name: 'New York', abbr: 'NY', rate: 0.109, hasIncomeTax: true },
  NC: { name: 'North Carolina', abbr: 'NC', rate: 0.0425, hasIncomeTax: true },
  ND: { name: 'North Dakota', abbr: 'ND', rate: 0.025, hasIncomeTax: true },
  OH: { name: 'Ohio', abbr: 'OH', rate: 0.0375, hasIncomeTax: true },
  OK: { name: 'Oklahoma', abbr: 'OK', rate: 0.0475, hasIncomeTax: true },
  OR: { name: 'Oregon', abbr: 'OR', rate: 0.099, hasIncomeTax: true },
  PA: { name: 'Pennsylvania', abbr: 'PA', rate: 0.0307, hasIncomeTax: true },
  RI: { name: 'Rhode Island', abbr: 'RI', rate: 0.0599, hasIncomeTax: true },
  SC: { name: 'South Carolina', abbr: 'SC', rate: 0.064, hasIncomeTax: true },
  SD: { name: 'South Dakota', abbr: 'SD', rate: 0, hasIncomeTax: false },
  TN: { name: 'Tennessee', abbr: 'TN', rate: 0, hasIncomeTax: false },
  TX: { name: 'Texas', abbr: 'TX', rate: 0, hasIncomeTax: false },
  UT: { name: 'Utah', abbr: 'UT', rate: 0.0455, hasIncomeTax: true },
  VT: { name: 'Vermont', abbr: 'VT', rate: 0.0875, hasIncomeTax: true },
  VA: { name: 'Virginia', abbr: 'VA', rate: 0.0575, hasIncomeTax: true },
  WA: { name: 'Washington', abbr: 'WA', rate: 0, hasIncomeTax: false },
  WV: { name: 'West Virginia', abbr: 'WV', rate: 0.0482, hasIncomeTax: true },
  WI: { name: 'Wisconsin', abbr: 'WI', rate: 0.0765, hasIncomeTax: true },
  WY: { name: 'Wyoming', abbr: 'WY', rate: 0, hasIncomeTax: false },
}

export const NO_TAX_STATES = ['AK', 'FL', 'NV', 'NH', 'SD', 'TN', 'TX', 'WA', 'WY']

export const FILING_STATUS_LABELS: Record<FilingStatus, string> = {
  single: 'Single',
  mfj: 'Married Filing Jointly',
  mfs: 'Married Filing Separately',
  hoh: 'Head of Household',
}

export const BRACKET_COLORS = ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#f97316', '#ef4444', '#7f1d1d']
