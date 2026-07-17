import type { FrameStyle } from '../lib/types'

interface Props {
  frame: FrameStyle
  barH: number
}

export function FrameBar({ frame, barH }: Props) {
  if (frame === 'none') return null

  const dot = Math.round(barH * 0.26)
  const gap = Math.round(dot * 0.7)
  const padX = Math.round(barH * 0.42)

  return (
    <div
      className="flex items-center bg-[#f6f6f6] border-b border-black/5"
      style={{ height: barH, paddingLeft: padX, paddingRight: padX, gap }}
    >
      <div className="flex" style={{ gap }}>
        <span style={{ width: dot, height: dot, background: '#ff5f57' }} className="rounded-full" />
        <span style={{ width: dot, height: dot, background: '#febc2e' }} className="rounded-full" />
        <span style={{ width: dot, height: dot, background: '#28c840' }} className="rounded-full" />
      </div>
      {frame === 'browser' && (
        <div
          className="ml-auto mr-auto rounded-full bg-black/[0.06]"
          style={{ height: Math.round(barH * 0.5), width: '46%' }}
        />
      )}
    </div>
  )
}
