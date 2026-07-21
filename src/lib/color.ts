// Color helpers for custom backgrounds + "match to screenshot".

export function rgbToHex(r: number, g: number, b: number): string {
  return (
    '#' +
    [r, g, b]
      .map((v) => Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, '0'))
      .join('')
  )
}

interface Hsl {
  h: number // 0..360
  s: number // 0..1
  l: number // 0..1
}

export function hexToHsl(hex: string): Hsl {
  const m = hex.replace('#', '')
  const r = parseInt(m.slice(0, 2), 16) / 255
  const g = parseInt(m.slice(2, 4), 16) / 255
  const b = parseInt(m.slice(4, 6), 16) / 255
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  const l = (max + min) / 2
  let h = 0
  let s = 0
  const d = max - min
  if (d !== 0) {
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) * 60
        break
      case g:
        h = ((b - r) / d + 2) * 60
        break
      default:
        h = ((r - g) / d + 4) * 60
    }
  }
  return { h, s, l }
}

export function hslToHex(h: number, s: number, l: number): string {
  h = ((h % 360) + 360) % 360
  s = Math.max(0, Math.min(1, s))
  l = Math.max(0, Math.min(1, l))
  const c = (1 - Math.abs(2 * l - 1)) * s
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1))
  const mm = l - c / 2
  let r = 0
  let g = 0
  let b = 0
  if (h < 60) [r, g, b] = [c, x, 0]
  else if (h < 120) [r, g, b] = [x, c, 0]
  else if (h < 180) [r, g, b] = [0, c, x]
  else if (h < 240) [r, g, b] = [0, x, c]
  else if (h < 300) [r, g, b] = [x, 0, c]
  else [r, g, b] = [c, 0, x]
  return rgbToHex((r + mm) * 255, (g + mm) * 255, (b + mm) * 255)
}

function hueDist(a: number, b: number): number {
  const d = Math.abs(a - b) % 360
  return d > 180 ? 360 - d : d
}

/** Sample the image and return its most common colors (approx, as hex). */
export async function extractPalette(src: string, sampleCount = 6): Promise<string[]> {
  const img = new Image()
  img.src = src
  try {
    await img.decode()
  } catch {
    return []
  }
  const size = 72
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext('2d', { willReadFrequently: true })
  if (!ctx) return []
  ctx.drawImage(img, 0, 0, size, size)
  let data: Uint8ClampedArray
  try {
    data = ctx.getImageData(0, 0, size, size).data
  } catch {
    return []
  }

  const buckets = new Map<string, { n: number; r: number; g: number; b: number }>()
  for (let i = 0; i < data.length; i += 4) {
    if (data[i + 3] < 128) continue
    const r = data[i]
    const g = data[i + 1]
    const b = data[i + 2]
    const key = `${r >> 4}-${g >> 4}-${b >> 4}`
    const e = buckets.get(key)
    if (e) {
      e.n++
      e.r += r
      e.g += g
      e.b += b
    } else {
      buckets.set(key, { n: 1, r, g, b })
    }
  }

  return [...buckets.values()]
    .map((e) => ({ n: e.n, r: e.r / e.n, g: e.g / e.n, b: e.b / e.n }))
    .sort((a, b) => b.n - a.n)
    .slice(0, sampleCount)
    .map((c) => rgbToHex(c.r, c.g, c.b))
}

/** Build a pleasing two-color gradient that matches the screenshot's palette. */
export async function matchGradient(src: string): Promise<[string, string]> {
  const fallback: [string, string] = ['#667eea', '#764ba2']
  const pal = await extractPalette(src, 8)
  if (pal.length === 0) return fallback

  const withHsl = pal.map((hex) => ({ hex, hsl: hexToHsl(hex) }))
  const colorful = withHsl.filter((x) => x.hsl.s > 0.18 && x.hsl.l > 0.12 && x.hsl.l < 0.92)
  const pool = colorful.length ? colorful : withHsl

  const primary = pool[0]
  const secondary = pool.slice(1).find((x) => hueDist(x.hsl.h, primary.hsl.h) > 30)

  // Nudge the primary toward a richer, display-friendly tone.
  const pHsl = primary.hsl
  const a = hslToHex(pHsl.h, Math.min(1, pHsl.s * 1.05 + 0.08), Math.min(0.68, Math.max(0.42, pHsl.l)))

  let b: string
  if (secondary) {
    const s = secondary.hsl
    b = hslToHex(s.h, Math.min(1, s.s * 1.05 + 0.08), Math.min(0.7, Math.max(0.4, s.l)))
  } else {
    // Derive a harmonious second stop by rotating hue + shifting lightness.
    b = hslToHex(pHsl.h + 35, Math.min(1, pHsl.s * 0.95 + 0.1), Math.min(0.82, pHsl.l + 0.2))
  }

  return [a, b]
}

export function buildGradient(a: string, b: string, angle: number): string {
  return `linear-gradient(${angle}deg, ${a} 0%, ${b} 100%)`
}
