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
  const tabBg = dark ? 'rgba(255,255,255,0.14)' : '#ffffff'

  const isWindows = frame === 'windows'
  const isSafari = frame === 'safari'
  const isTabs = frame === 'tabs'
  const icon = Math.round(barH * 0.28)
  const chevron = Math.round(barH * 0.34)

  const dots = (
    <div className="flex shrink-0" style={{ gap }}>
      <span style={{ width: dot, height: dot, background: '#ff5f57' }} className="rounded-full" />
      <span style={{ width: dot, height: dot, background: '#febc2e' }} className="rounded-full" />
      <span style={{ width: dot, height: dot, background: '#28c840' }} className="rounded-full" />
    </div>
  )

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
      {!isWindows && dots}

      {/* browser: plain centered address pill */}
      {frame === 'browser' && (
        <div
          className="ml-auto mr-auto rounded-full"
          style={{ height: Math.round(barH * 0.5), width: '46%', background: pillBg }}
        />
      )}

      {/* safari: back/forward chevrons + centered address pill with a lock */}
      {isSafari && (
        <>
          <div className="flex items-center" style={{ gap: gap * 1.4, marginLeft: gap }}>
            <svg width={chevron} height={chevron} viewBox="0 0 24 24" fill="none" stroke={ctrl} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="m15 18-6-6 6-6" />
            </svg>
            <svg width={chevron} height={chevron} viewBox="0 0 24 24" fill="none" stroke={ctrl} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.45 }}>
              <path d="m9 18 6-6-6-6" />
            </svg>
          </div>
          <div
            className="ml-auto mr-auto flex items-center justify-center rounded-md"
            style={{ height: Math.round(barH * 0.52), width: '48%', background: pillBg, gap: gap }}
          >
            <svg width={Math.round(barH * 0.32)} height={Math.round(barH * 0.32)} viewBox="0 0 24 24" fill="none" stroke={ctrl} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="5" y="11" width="14" height="10" rx="2" />
              <path d="M8 11V7a4 4 0 0 1 8 0v4" />
            </svg>
          </div>
        </>
      )}

      {/* tabs: a browser tab + address line + new-tab plus */}
      {isTabs && (
        <>
          <div
            className="flex items-center rounded-t-md"
            style={{
              marginLeft: gap,
              height: Math.round(barH * 0.66),
              width: '34%',
              paddingLeft: padX * 0.7,
              paddingRight: padX * 0.7,
              gap,
              background: tabBg,
              alignSelf: 'flex-end',
            }}
          >
            <span style={{ width: dot, height: dot, background: '#38bdf8' }} className="shrink-0 rounded-full" />
            <span className="rounded-full" style={{ height: Math.round(barH * 0.14), flex: 1, background: pillBg }} />
          </div>
          <svg width={icon} height={icon} viewBox="0 0 24 24" fill="none" stroke={ctrl} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: gap }}>
            <path d="M12 5v14M5 12h14" />
          </svg>
        </>
      )}

      {/* windows: minimize / maximize / close */}
      {isWindows && (
        <div className="ml-auto flex items-center" style={{ gap: Math.round(barH * 0.5) }}>
          <span style={{ width: icon, height: 0, borderTop: `1.5px solid ${ctrl}` }} />
          <span style={{ width: icon, height: icon, border: `1.5px solid ${ctrl}` }} />
          <svg width={icon} height={icon} viewBox="0 0 10 10" fill="none" stroke={ctrl} strokeWidth="1.5">
            <path d="M1 1 L9 9 M9 1 L1 9" />
          </svg>
        </div>
      )}
    </div>
  )
}
