import { useCallback, useEffect, useRef, useState } from 'react'
import { toBlob, toPng } from 'html-to-image'
import type { ImageData, Settings } from './lib/types'
import { DEFAULT_SETTINGS } from './lib/presets'
import { loadImageFromFile } from './lib/image'
import { Sidebar } from './components/Sidebar'
import { Canvas } from './components/Canvas'
import { Uploader } from './components/Uploader'

export default function App() {
  const [image, setImage] = useState<ImageData | null>(null)
  const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS)
  const [dragging, setDragging] = useState(false)
  const [copied, setCopied] = useState(false)
  const exportRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

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
    const dataUrl = await toPng(exportRef.current, { pixelRatio: 2, cacheBust: true })
    const a = document.createElement('a')
    a.href = dataUrl
    a.download = `screenshot-${Date.now()}.png`
    a.click()
  }, [])

  const copy = useCallback(async () => {
    if (!exportRef.current) return
    try {
      const blob = await toBlob(exportRef.current, { pixelRatio: 2, cacheBust: true })
      if (!blob) return
      await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })])
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      // clipboard image write not supported in this browser
    }
  }, [])

  return (
    <div
      className="flex h-full flex-col bg-neutral-100"
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
      <header className="flex items-center justify-between border-b border-neutral-200 bg-white px-5 py-3">
        <div className="flex items-center gap-2">
          <span className="text-base font-semibold text-neutral-900">Screenshot Beautifier</span>
        </div>
        <div className="flex items-center gap-2">
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
          {image && (
            <>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="rounded-md border border-neutral-200 px-3 py-1.5 text-sm text-neutral-700 transition hover:border-neutral-300"
              >
                New image
              </button>
              <button
                onClick={copy}
                className="rounded-md border border-neutral-200 px-3 py-1.5 text-sm text-neutral-700 transition hover:border-neutral-300"
              >
                {copied ? 'Copied!' : 'Copy'}
              </button>
              <button
                onClick={download}
                className="rounded-md bg-neutral-900 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-neutral-700"
              >
                Export PNG
              </button>
            </>
          )}
        </div>
      </header>

      <div className="flex min-h-0 flex-1">
        {image && <Sidebar settings={settings} onChange={onChange} />}
        <main className="relative min-w-0 flex-1">
          {image ? (
            <Canvas image={image} settings={settings} exportRef={exportRef} />
          ) : (
            <Uploader onFile={handleFile} />
          )}
          {dragging && (
            <div className="pointer-events-none absolute inset-0 z-10 m-4 rounded-xl border-2 border-dashed border-neutral-900/40 bg-white/60" />
          )}
        </main>
      </div>
    </div>
  )
}
