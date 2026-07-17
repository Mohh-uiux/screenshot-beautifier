import type { Settings } from './types'

const BASE_MAX_WIDTH = 1400

export interface Layout {
  W: number
  H: number
  cardW: number
  cardH: number
  imgW: number
  imgH: number
  barH: number
  offsetX: number
  offsetY: number
}

export function computeLayout(
  naturalWidth: number,
  naturalHeight: number,
  settings: Settings,
  ratio: number | null,
): Layout {
  const imgW = Math.min(naturalWidth, BASE_MAX_WIDTH)
  const scale = imgW / naturalWidth
  const imgH = Math.round(naturalHeight * scale)

  const barH =
    settings.frame === 'none'
      ? 0
      : Math.round(Math.min(Math.max(imgW * 0.038, 28), 52))

  const cardW = imgW
  const cardH = imgH + barH

  const p = settings.padding
  const minW = cardW + p * 2
  const minH = cardH + p * 2

  let W: number
  let H: number
  if (ratio == null) {
    W = minW
    H = minH
  } else if (minW / minH >= ratio) {
    W = minW
    H = Math.round(W / ratio)
  } else {
    H = minH
    W = Math.round(H * ratio)
  }

  return {
    W,
    H,
    cardW,
    cardH,
    imgW,
    imgH,
    barH,
    offsetX: Math.round((W - cardW) / 2),
    offsetY: Math.round((H - cardH) / 2),
  }
}

export function shadowValue(intensity: number): string {
  if (intensity <= 0) return 'none'
  const y = Math.round(intensity * 0.45)
  const blur = Math.round(intensity * 1.15)
  const alpha = (0.1 + intensity * 0.0035).toFixed(3)
  return `0px ${y}px ${blur}px rgba(0, 0, 0, ${alpha})`
}
