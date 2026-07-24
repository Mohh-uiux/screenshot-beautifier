import { useCallback, useEffect, useRef, useState } from 'react'
import { Analytics } from '@vercel/analytics/react'
import { toBlob, toJpeg, toPng } from 'html-to-image'
import type { ImageData, Settings } from './lib/types'
import { DEFAULT_SETTINGS } from './lib/presets'
import { loadImageFromFile } from './lib/image'
import { Sidebar } from './components/Sidebar'
import { Canvas } from './components/Canvas'
import { Uploader } from './components/Uploader'
import { MobileNotice } from './components/MobileNotice'

const MOBILE_QUERY = '(max-width: 767px)'

export default function App() {
  const [image, setImage] = useState<ImageData | null>(null)
  const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS)
  const [dragging, setDragging] = useState(false)
  const [copied, setCopied] = useState(false)
  const [exportScale, setExportScale] = useState(2)
  const [exportFormat, setExportFormat] = useState<'png' | 'jpeg'>('png')
  const [menuOpen, setMenuOpen] = useState(false)
  const [outSize, setOutSize] = useState<{ w: number; h: number } | null>(null)
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined' && window.matchMedia(MOBILE_QUERY).matches,
  )
  const exportRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const pillRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mq = window.matchMedia(MOBILE_QUERY)
    const onChange = (e: MediaQueryListEvent) => setIsMobile(e.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  const onChange = useCallback(
    (patch: Partial<Settings>) => setSettings((s) => ({ ...s, ...patch })),
    [],
  )

  const handleFile = useCallback(async (file: File) => {
    try {
      const data = await loadImageFromFile(file)
      setImage(data)
    } catch {
      // ignore non-image drops/pastes
    }
  }, [])

  useEffect(() => {
    const onPaste = (e: ClipboardEvent) => {
      const item = Array.from(e.clipboardData?.items ?? []).find((i) =>
        i.type.startsWith('image/'),
      )
      const file = item?.getAsFile()
      if (file) handleFile(file)
    }
    window.addEventListener('paste', onPaste)
    return () => window.removeEventListener('paste', onPaste)
  }, [handleFile])

  const download = useCallback(async () => {
    if (!exportRef.current) return
    const opts = { pixelRatio: exportScale, cacheBust: true, skipFonts: true }
    const dataUrl =
      exportFormat === 'png'
        ? await toPng(exportRef.current, opts)
        : await toJpeg(exportRef.current, { ...opts, quality: 0.95 })
    const a = document.createElement('a')
    a.href = dataUrl
    a.download = `screenshot-${Date.now()}.${exportFormat === 'png' ? 'png' : 'jpg'}`
    a.click()
  }, [exportScale, exportFormat])

  const copy = useCallback(async () => {
    if (!exportRef.current) return
    try {
      const blob = await toBlob(exportRef.current, {
        pixelRatio: exportScale,
        cacheBust: true,
        skipFonts: true,
      })
      if (!blob) return
      await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })])
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      // clipboard image write not supported in this browser
    }
  }, [exportScale])

  // Keep the output-size readout in sync while the export menu is open.
  useEffect(() => {
    if (!menuOpen) return
    const el = exportRef.current
    if (el) setOutSize({ w: el.offsetWidth * exportScale, h: el.offsetHeight * exportScale })
  }, [menuOpen, exportScale])

  // Close the export menu on outside click.
  useEffect(() => {
    if (!menuOpen) return
    const onDown = (e: MouseEvent) => {
      if (pillRef.current && !pillRef.current.contains(e.target as Node)) setMenuOpen(false)
    }
    window.addEventListener('mousedown', onDown)
    return () => window.removeEventListener('mousedown', onDown)
  }, [menuOpen])

  if (isMobile) return <MobileNotice />

  return (
    <div
      className="relative h-full bg-neutral-100"
      onDragOver={(e) => {
        e.preventDefault()
        setDragging(true)
      }}
      onDragLeave={() => setDragging(false)}
      onDrop={(e) => {
        e.preventDefault()
        setDragging(false)
        const f = e.dataTransfer.files?.[0]
        if (f) handleFile(f)
      }}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0]
          if (f) handleFile(f)
          e.target.value = ''
        }}
      />

      {image ? (
        <>
          <div className="h-full pr-80">
            <Canvas image={image} settings={settings} exportRef={exportRef} />
          </div>

          <div className="pointer-events-none absolute bottom-6 left-0 right-80 z-20 flex justify-center">
            <div
              ref={pillRef}
              className="pointer-events-auto relative flex items-center gap-1.5 rounded-full bg-neutral-900 p-1.5 shadow-lg ring-1 ring-black/10"
            >
              {menuOpen && (
                <div className="absolute bottom-full left-1/2 mb-3 w-60 -translate-x-1/2 rounded-2xl border border-neutral-200 bg-white p-3 text-left shadow-xl">
                  <div className="mb-3">
                    <div className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-neutral-500">
                      Scale
                    </div>
                    <div className="flex rounded-md bg-neutral-100 p-0.5 text-xs font-medium">
                      {[1, 2, 3].map((s) => (
                        <button
                          key={s}
                          onClick={() => setExportScale(s)}
                          className={`flex-1 rounded-[5px] py-1 transition ${
                            exportScale === s
                              ? 'bg-white text-neutral-900 shadow-sm'
                              : 'text-neutral-500'
                          }`}
                        >
                          {s}×
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="mb-3">
                    <div className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-neutral-500">
                      Format
                    </div>
                    <div className="flex rounded-md bg-neutral-100 p-0.5 text-xs font-medium">
                      {(['png', 'jpeg'] as const).map((f) => (
                        <button
                          key={f}
                          onClick={() => setExportFormat(f)}
                          className={`flex-1 rounded-[5px] py-1 uppercase transition ${
                            exportFormat === f
                              ? 'bg-white text-neutral-900 shadow-sm'
                              : 'text-neutral-500'
                          }`}
                        >
                          {f === 'jpeg' ? 'JPG' : 'PNG'}
                        </button>
                      ))}
                    </div>
                  </div>
                  <p className="text-center text-xs tabular-nums text-neutral-400">
                    {outSize ? `${outSize.w} × ${outSize.h} px` : ''}
                  </p>
                </div>
              )}
              <button
                onClick={copy}
                className="rounded-full px-4 py-2 text-sm font-medium text-neutral-300 transition hover:bg-white/10 hover:text-white"
              >
                {copied ? 'Copied!' : 'Copy'}
              </button>
              <button
                onClick={download}
                className="rounded-full bg-white px-4 py-2 text-sm font-medium text-neutral-900 transition hover:bg-neutral-200"
              >
                Export {exportFormat === 'png' ? 'PNG' : 'JPG'}
              </button>
              <button
                onClick={() => setMenuOpen((o) => !o)}
                aria-label="Export options"
                className="flex h-9 w-9 items-center justify-center rounded-full text-neutral-300 transition hover:bg-white/10 hover:text-white"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden
                  className={`transition-transform duration-200 ${menuOpen ? 'rotate-180' : ''}`}
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </button>
            </div>
          </div>

          <Sidebar
            settings={settings}
            onChange={onChange}
            onNewImage={() => fileInputRef.current?.click()}
            imageSrc={image.src}
          />
        </>
      ) : (
        <Uploader onFile={handleFile} />
      )}

      {dragging && (
        <div className="pointer-events-none absolute inset-0 z-30 m-4 rounded-xl border-2 border-dashed border-neutral-900/40 bg-white/60" />
      )}
      <Analytics />
    </div>
  )
}
