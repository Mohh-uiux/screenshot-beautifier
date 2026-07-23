import { useState } from 'react'
import type { FrameStyle, FrameTheme, Settings } from '../lib/types'
import { ASPECT_RATIOS, GRADIENTS, MESHES, SOLIDS } from '../lib/presets'
import { buildGradient, matchGradient } from '../lib/color'

interface Props {
  settings: Settings
  onChange: (patch: Partial<Settings>) => void
  onNewImage: () => void
  imageSrc: string
}

function ColorField({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <label className="relative block h-8 w-8 cursor-pointer overflow-hidden rounded-md ring-1 ring-black/10">
      <span className="absolute inset-0" style={{ background: value }} />
      <input
        type="color"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
      />
    </label>
  )
}

function Section({
  title,
  children,
  defaultOpen = true,
}: {
  title: string
  children: React.ReactNode
  defaultOpen?: boolean
}) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className="border-b border-neutral-200">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between px-5 py-3.5 text-xs font-semibold uppercase tracking-wide text-neutral-500 transition hover:text-neutral-800"
      >
        {title}
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
          className={`transition-transform duration-200 ${open ? '' : '-rotate-90'}`}
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>
      <div
        className={`grid transition-all duration-200 ${
          open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
        }`}
      >
        <div className="overflow-hidden">
          <div className="px-5 pb-4">{children}</div>
        </div>
      </div>
    </div>
  )
}

function Slider({
  label,
  value,
  min,
  max,
  onChange,
}: {
  label: string
  value: number
  min: number
  max: number
  onChange: (v: number) => void
}) {
  return (
    <div className="mb-3 last:mb-0">
      <div className="mb-1 flex items-center justify-between text-sm text-neutral-600">
        <span>{label}</span>
        <span className="tabular-nums text-neutral-400">{value}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-neutral-900"
      />
    </div>
  )
}

const FRAMES: { value: FrameStyle; label: string }[] = [
  { value: 'none', label: 'None' },
  { value: 'mac', label: 'macOS' },
  { value: 'browser', label: 'Browser' },
  { value: 'windows', label: 'Windows' },
]

const THEMES: { value: FrameTheme; label: string }[] = [
  { value: 'light', label: 'Light' },
  { value: 'dark', label: 'Dark' },
]

export function Sidebar({ settings, onChange, onNewImage, imageSrc }: Props) {
  const [customMode, setCustomMode] = useState<'solid' | 'gradient'>('gradient')
  const [solid, setSolid] = useState('#6366f1')
  const [gradA, setGradA] = useState('#667eea')
  const [gradB, setGradB] = useState('#764ba2')
  const [angle, setAngle] = useState(135)
  const [matching, setMatching] = useState(false)

  const customGradient = buildGradient(gradA, gradB, angle)

  const applySolid = (c: string) => {
    setSolid(c)
    onChange({ background: c })
  }
  const applyGradient = (a: string, b: string, ang: number) => {
    setGradA(a)
    setGradB(b)
    setAngle(ang)
    onChange({ background: buildGradient(a, b, ang) })
  }
  const smartMatch = async () => {
    if (matching) return
    setMatching(true)
    try {
      const [a, b] = await matchGradient(imageSrc)
      setCustomMode('gradient')
      applyGradient(a, b, 135)
    } finally {
      setMatching(false)
    }
  }

  return (
    <aside className="absolute bottom-4 right-4 top-4 z-20 flex w-72 flex-col rounded-2xl border border-neutral-200/70 bg-white/90 shadow-xl ring-1 ring-black/5 backdrop-blur">
      <div className="flex items-center justify-between border-b border-neutral-200 px-5 pb-4 pt-5">
        <span
          className="text-2xl italic leading-none tracking-tight text-neutral-900"
          style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
        >
          prettify
        </span>
        <button
          onClick={onNewImage}
          className="rounded-md px-2 py-1 text-xs text-neutral-500 transition hover:text-neutral-900"
        >
          New image
        </button>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto">
      <Section title="Background">
        <div className="mb-3 grid grid-cols-6 gap-2">
          {GRADIENTS.map((g) => (
            <button
              key={g.name}
              title={g.name}
              onClick={() => onChange({ background: g.value })}
              className={`aspect-square rounded-md ring-offset-1 transition ${
                settings.background === g.value ? 'ring-2 ring-neutral-900' : 'ring-1 ring-black/10'
              }`}
              style={{ background: g.value }}
            />
          ))}
        </div>
        <div className="mb-3 grid grid-cols-6 gap-2">
          {MESHES.map((m) => (
            <button
              key={m.name}
              title={m.name}
              onClick={() => onChange({ background: m.value })}
              className={`aspect-square rounded-md ring-offset-1 transition ${
                settings.background === m.value ? 'ring-2 ring-neutral-900' : 'ring-1 ring-black/10'
              }`}
              style={{ background: m.value }}
            />
          ))}
        </div>
        <div className="mb-4 grid grid-cols-6 gap-2">
          {SOLIDS.map((s) => (
            <button
              key={s.name}
              title={s.name}
              onClick={() => onChange({ background: s.value })}
              className={`aspect-square rounded-md ring-offset-1 transition ${
                settings.background === s.value ? 'ring-2 ring-neutral-900' : 'ring-1 ring-black/10'
              }`}
              style={{ background: s.value }}
            />
          ))}
        </div>

        <button
          onClick={smartMatch}
          disabled={matching}
          className="group mb-3 flex w-full items-center justify-center gap-1.5 rounded-md bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500 bg-[length:200%_100%] bg-left py-2 text-sm font-medium text-white shadow-[0_4px_14px_-4px_rgba(124,58,237,0.6)] transition-all duration-500 hover:bg-right hover:shadow-[0_6px_20px_-4px_rgba(124,58,237,0.7)] active:scale-[0.99] disabled:opacity-70"
        >
          <svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden
            className={matching ? 'animate-pulse' : 'transition-transform duration-300 group-hover:rotate-[15deg] group-hover:scale-110'}
          >
            <path d="M12 2l1.6 4.6L18 8.2l-4.4 1.6L12 14l-1.6-4.2L6 8.2l4.4-1.6L12 2z" />
            <path d="M19 13l.8 2.2 2.2.8-2.2.8L19 19l-.8-2.2-2.2-.8 2.2-.8L19 13z" />
          </svg>
          {matching ? 'Matching…' : 'Match to screenshot'}
        </button>

        <div className="rounded-lg border border-neutral-200 p-3">
          <div className="mb-3 flex rounded-md bg-neutral-100 p-0.5 text-xs font-medium">
            {(['solid', 'gradient'] as const).map((m) => (
              <button
                key={m}
                onClick={() => setCustomMode(m)}
                className={`flex-1 rounded-[5px] py-1 capitalize transition ${
                  customMode === m ? 'bg-white text-neutral-900 shadow-sm' : 'text-neutral-500'
                }`}
              >
                {m}
              </button>
            ))}
          </div>

          {customMode === 'solid' ? (
            <div className="flex items-center gap-2">
              <ColorField value={solid} onChange={applySolid} />
              <span className="font-mono text-xs uppercase text-neutral-500">{solid}</span>
              <span
                className="ml-auto h-8 w-16 rounded-md ring-1 ring-black/10"
                style={{ background: solid }}
              />
            </div>
          ) : (
            <div className="space-y-2.5">
              <div className="flex items-center gap-2">
                <ColorField value={gradA} onChange={(v) => applyGradient(v, gradB, angle)} />
                <ColorField value={gradB} onChange={(v) => applyGradient(gradA, v, angle)} />
                <span
                  className="ml-auto h-8 flex-1 rounded-md ring-1 ring-black/10"
                  style={{ background: customGradient }}
                />
              </div>
              <div>
                <div className="mb-1 flex items-center justify-between text-xs text-neutral-500">
                  <span>Angle</span>
                  <span className="tabular-nums text-neutral-400">{angle}°</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={360}
                  value={angle}
                  onChange={(e) => applyGradient(gradA, gradB, Number(e.target.value))}
                  className="w-full accent-neutral-900"
                />
              </div>
            </div>
          )}
        </div>
      </Section>

      <Section title="Frame" defaultOpen={false}>
        <div className="grid grid-cols-2 gap-2">
          {FRAMES.map((f) => (
            <button
              key={f.value}
              onClick={() => onChange({ frame: f.value })}
              className={`rounded-md border px-2 py-1.5 text-sm transition ${
                settings.frame === f.value
                  ? 'border-neutral-900 bg-neutral-900 text-white'
                  : 'border-neutral-200 text-neutral-700 hover:border-neutral-300'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </Section>

      <Section title="Theme" defaultOpen={false}>
        <div className="relative grid grid-cols-2 gap-2">
          {THEMES.map((t) => (
            <button
              key={t.value}
              disabled={settings.frame === 'none'}
              onClick={() => onChange({ frameTheme: t.value })}
              className={`rounded-md border px-2 py-1.5 text-sm transition disabled:opacity-40 ${
                settings.frameTheme === t.value
                  ? 'border-neutral-900 bg-neutral-900 text-white'
                  : 'border-neutral-200 text-neutral-700 enabled:hover:border-neutral-300'
              }`}
            >
              {t.label}
            </button>
          ))}
          {settings.frame === 'none' && (
            <div className="group absolute inset-0 cursor-not-allowed">
              <span className="pointer-events-none absolute left-1/2 top-full z-10 mt-1.5 -translate-x-1/2 whitespace-nowrap rounded-md bg-neutral-900 px-2 py-1 text-xs text-white opacity-0 shadow-md transition group-hover:opacity-100">
                Select a frame first
              </span>
            </div>
          )}
        </div>
      </Section>

      <Section title="Adjust">
        <Slider label="Padding" value={settings.padding} min={0} max={256} onChange={(v) => onChange({ padding: v })} />
        <Slider label="Rounding" value={settings.cornerRadius} min={0} max={48} onChange={(v) => onChange({ cornerRadius: v })} />
        <Slider label="Shadow" value={settings.shadow} min={0} max={100} onChange={(v) => onChange({ shadow: v })} />
        <Slider label="Noise" value={settings.noise} min={0} max={100} onChange={(v) => onChange({ noise: v })} />
      </Section>

      <Section title="3D Tilt">
        <Slider label="Horizontal" value={settings.tiltY} min={-40} max={40} onChange={(v) => onChange({ tiltY: v })} />
        <Slider label="Vertical" value={settings.tiltX} min={-40} max={40} onChange={(v) => onChange({ tiltX: v })} />
        {(settings.tiltX !== 0 || settings.tiltY !== 0) && (
          <button
            onClick={() => onChange({ tiltX: 0, tiltY: 0 })}
            className="mt-1 text-xs text-neutral-400 transition hover:text-neutral-700"
          >
            Reset tilt
          </button>
        )}
      </Section>

      <Section title="Aspect ratio">
        <div className="grid grid-cols-3 gap-2">
          {ASPECT_RATIOS.map((r) => (
            <button
              key={r.value}
              onClick={() => onChange({ aspectRatio: r.value })}
              className={`rounded-md border px-2 py-1.5 text-sm transition ${
                settings.aspectRatio === r.value
                  ? 'border-neutral-900 bg-neutral-900 text-white'
                  : 'border-neutral-200 text-neutral-700 hover:border-neutral-300'
              }`}
            >
              {r.name}
            </button>
          ))}
        </div>
      </Section>
      </div>
    </aside>
  )
}
