import type { FrameStyle, FrameTheme } from '../lib/types'

interface Props {
  frame: FrameStyle
  theme: FrameTheme
  barH: number
}

export function FrameBar({ frame, theme, barH }: Props) {
  if (frame === 'none') return null

  const dark = theme === 'dark'
  const dot = Math.round(barH * 0.26)
  const gap = Math.round(dot * 0.7)
  const padX = Math.round(barH * 0.42)

  const barBg = dark ? '#2b2b2e' : '#f6f6f6'
  const borderColor = dark ? 'rgba(255,255,255,0.09)' : 'rgba(0,0,0,0.05)'
  const pillBg = dark ? 'rgba(255,255,255,0.10)' : 'rgba(0,0,0,0.06)'
  const ctrl = dark ? '#c7c7cc' : '#6b7280'

  const isWindows = frame === 'windows'
  const icon = Math.round(barH * 0.28)

  return (
    <div
      className="flex items-center"
      style={{
        height: barH,
        paddingLeft: padX,
        paddingRight: padX,
        gap,
        background: barBg,
        borderBottom: `1px solid ${borderColor}`,
      }}
    >
      {!isWindows && (
        <div className="flex" style={{ gap }}>
          <span style={{ width: dot, height: dot, background: '#ff5f57' }} className="rounded-full" />
          <span style={{ width: dot, height: dot, background: '#febc2e' }} className="rounded-full" />
          <span style={{ width: dot, height: dot, background: '#28c840' }} className="rounded-full" />
        </div>
      )}

      {frame === 'browser' && (
        <div
          className="ml-auto mr-auto rounded-full"
          style={{ height: Math.round(barH * 0.5), width: '46%', background: pillBg }}
        />
      )}

      {isWindows && (
        <div className="ml-auto flex items-center" style={{ gap: Math.round(barH * 0.5) }}>
          {/* minimize */}
          <span style={{ width: icon, height: 0, borderTop: `1.5px solid ${ctrl}` }} />
          {/* maximize */}
          <span style={{ width: icon, height: icon, border: `1.5px solid ${ctrl}` }} />
          {/* close */}
          <svg width={icon} height={icon} viewBox="0 0 10 10" fill="none" stroke={ctrl} strokeWidth="1.5">
            <path d="M1 1 L9 9 M9 1 L1 9" />
          </svg>
        </div>
      )}
    </div>
  )
}
