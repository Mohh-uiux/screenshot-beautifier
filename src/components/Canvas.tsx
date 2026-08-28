import { useLayoutEffect, useRef, useState, type RefObject } from 'react'
import type { ImageData, Settings } from '../lib/types'
import { ASPECT_RATIOS } from '../lib/presets'
import { computeLayout, shadowValue } from '../lib/layout'
import { FrameBar } from './WindowFrame'

interface Props {
  image: ImageData
  settings: Settings
  exportRef: RefObject<HTMLDivElement | null>
}

export function Canvas({ image, settings, exportRef }: Props) {
  const viewportRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(1)

  const ratio = ASPECT_RATIOS.find((r) => r.value === settings.aspectRatio)?.ratio ?? null
  const layout = computeLayout(image.naturalWidth, image.naturalHeight, settings, ratio)

  // A custom image background is stored as a CSS `url(...)` value; render it as
  // a dedicated layer so blur + dim can apply without affecting the screenshot.
  const isImageBg = settings.background.includes('url(')

  useLayoutEffect(() => {
    const el = viewportRef.current
    if (!el) return
    const update = () => {
      const availW = el.clientWidth - 64
      const availH = el.clientHeight - 64
      const s = Math.min(availW / layout.W, availH / layout.H, 1)
      setScale(s > 0 ? s : 1)
    }
    update()
    const ro = new ResizeObserver(update)
    ro.observe(el)
    return () => ro.disconnect()
  }, [layout.W, layout.H])

  return (
    <div
      ref={viewportRef}
      className="flex h-full w-full items-center justify-center overflow-hidden p-8"
    >
      <div
        style={{
          width: layout.W * scale,
          height: layout.H * scale,
        }}
      >
        <div style={{ transform: `scale(${scale})`, transformOrigin: 'top left' }}>
          <div
            ref={exportRef}
            className={`relative ${isImageBg ? 'overflow-hidden' : ''}`}
            style={{
              width: layout.W,
              height: layout.H,
              background: isImageBg ? '#0a0a0a' : settings.background,
              perspective: Math.max(layout.W, layout.H) * 1.8,
            }}
          >
            {isImageBg && (
              <>
                <div
                  className="absolute inset-0"
                  style={{
                    background: settings.background,
                    filter: settings.backgroundBlur > 0 ? `blur(${settings.backgroundBlur}px)` : undefined,
                    transform: settings.backgroundBlur > 0 ? 'scale(1.12)' : undefined,
                  }}
                />
                {settings.backgroundDim > 0 && (
                  <div
                    className="absolute inset-0"
                    style={{ background: `rgba(0,0,0,${settings.backgroundDim / 100})` }}
                  />
                )}
              </>
            )}
            {settings.noise > 0 && (
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  opacity: (settings.noise / 100) * 0.9,
                  backgroundImage:
                    "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
                }}
              />
            )}
            <div
              className="absolute overflow-hidden"
              style={{
                left: layout.offsetX,
                top: layout.offsetY,
                width: layout.cardW,
                height: layout.cardH,
                borderRadius: settings.cornerRadius,
                boxShadow: shadowValue(settings.shadow),
                transform: `rotateX(${settings.tiltX}deg) rotateY(${settings.tiltY}deg)`,
                transformStyle: 'preserve-3d',
                boxSizing: 'border-box',
                border:
                  settings.frame === 'custom'
                    ? `${settings.borderWidth}px solid ${settings.borderColor}`
                    : undefined,
              }}
            >
              <FrameBar frame={settings.frame} theme={settings.frameTheme} barH={layout.barH} />
              <img
                src={image.src}
                alt=""
                style={{ width: layout.imgW, height: layout.imgH, display: 'block' }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
