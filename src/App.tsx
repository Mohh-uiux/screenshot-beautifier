import { useCallback, useEffect, useRef, useState } from 'react'
import { Analytics } from '@vercel/analytics/react'
import { toBlob, toPng } from 'html-to-image'
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
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined' && window.matchMedia(MOBILE_QUERY).matches,
  )
  const exportRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

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
    const dataUrl = await toPng(exportRef.current, { pixelRatio: 2, cacheBust: true, skipFonts: true })
    const a = document.createElement('a')
    a.href = dataUrl
    a.download = `screenshot-${Date.now()}.png`
    a.click()
  }, [])

  const copy = useCallback(async () => {
    if (!exportRef.current) return
    try {
      const blob = await toBlob(exportRef.current, { pixelRatio: 2, cacheBust: true, skipFonts: true })
      if (!blob) return
      await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })])
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      // clipboard image write not supported in this browser
    }
  }, [])

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
          <Sidebar
            settings={settings}
            onChange={onChange}
            onNewImage={() => fileInputRef.current?.click()}
            onCopy={copy}
            onDownload={download}
            copied={copied}
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
