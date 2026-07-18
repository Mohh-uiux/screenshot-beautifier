import type { FrameStyle, FrameTheme, Settings } from '../lib/types'
import { ASPECT_RATIOS, GRADIENTS, SOLIDS } from '../lib/presets'

interface Props {
  settings: Settings
  onChange: (patch: Partial<Settings>) => void
  onNewImage: () => void
  onCopy: () => void
  onDownload: () => void
  copied: boolean
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border-b border-neutral-200 px-5 py-4">
      <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide text-neutral-500">
        {title}
      </h3>
      {children}
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

export function Sidebar({ settings, onChange, onNewImage, onCopy, onDownload, copied }: Props) {
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
        <div className="grid grid-cols-6 gap-2">
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
      </Section>

      <Section title="Frame">
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
        {settings.frame !== 'none' && (
          <div className="mt-2 grid grid-cols-2 gap-2">
            {THEMES.map((t) => (
              <button
                key={t.value}
                onClick={() => onChange({ frameTheme: t.value })}
                className={`rounded-md border px-2 py-1.5 text-sm transition ${
                  settings.frameTheme === t.value
                    ? 'border-neutral-900 bg-neutral-900 text-white'
                    : 'border-neutral-200 text-neutral-700 hover:border-neutral-300'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        )}
      </Section>

      <Section title="Adjust">
        <Slider label="Padding" value={settings.padding} min={0} max={256} onChange={(v) => onChange({ padding: v })} />
        <Slider label="Rounding" value={settings.cornerRadius} min={0} max={48} onChange={(v) => onChange({ cornerRadius: v })} />
        <Slider label="Shadow" value={settings.shadow} min={0} max={100} onChange={(v) => onChange({ shadow: v })} />
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

      <div className="grid grid-cols-2 gap-2 border-t border-neutral-200 px-5 py-4">
        <button
          onClick={onCopy}
          className="rounded-md border border-neutral-200 px-3 py-1.5 text-sm text-neutral-700 transition hover:border-neutral-300"
        >
          {copied ? 'Copied!' : 'Copy'}
        </button>
        <button
          onClick={onDownload}
          className="rounded-md bg-neutral-900 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-neutral-700"
        >
          Export PNG
        </button>
      </div>
    </aside>
  )
}
