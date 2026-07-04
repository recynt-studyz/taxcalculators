import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Free Tax Calculators 2026'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function TwitterImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #0f172a 0%, #1e3a5f 50%, #1e3a8a 100%)',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ fontSize: 96, fontWeight: 900, color: '#93c5fd', marginBottom: 24, lineHeight: 1 }}>
          $
        </div>
        <div
          style={{
            fontSize: 52,
            fontWeight: 800,
            color: 'white',
            textAlign: 'center',
            lineHeight: 1.15,
            marginBottom: 20,
            maxWidth: 900,
          }}
        >
          Free Tax Calculators 2026
        </div>
        <div
          style={{
            fontSize: 24,
            color: 'rgba(255,255,255,0.75)',
            textAlign: 'center',
            marginBottom: 40,
            maxWidth: 800,
          }}
        >
          Income tax, paycheck, self-employed, capital gains and all 50 state calculators. Updated for 2026 tax law.
        </div>
        <div style={{ display: 'flex', gap: 16 }}>
          {['Free', '2026 Updated', 'Private', 'No Signup'].map((label) => (
            <div
              key={label}
              style={{
                background: 'rgba(255,255,255,0.12)',
                border: '1px solid rgba(255,255,255,0.25)',
                borderRadius: 100,
                padding: '8px 22px',
                color: 'white',
                fontSize: 18,
                fontWeight: 500,
              }}
            >
              {label}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  )
}
