import type { FrameStyle, FrameTheme, Settings } from '../lib/types'
import { ASPECT_RATIOS } from '../lib/presets'
import { ColorField, Section, Slider } from './panelKit'

interface Props {
  settings: Settings
  onChange: (patch: Partial<Settings>) => void
  onNewImage: () => void
}

const FRAMES: { value: FrameStyle; label: string }[] = [
  { value: 'none', label: 'None' },
  { value: 'mac', label: 'macOS' },
  { value: 'windows', label: 'Windows' },
  { value: 'custom', label: 'Custom' },
]

const THEMES: { value: FrameTheme; label: string }[] = [
  { value: 'light', label: 'Light' },
  { value: 'dark', label: 'Dark' },
]

const optionBtn = (active: boolean) =>
  `rounded-md border px-2 py-1.5 text-sm transition ${
    active
      ? 'border-neutral-900 bg-neutral-900 text-white dark:border-white dark:bg-white dark:text-neutral-900'
      : 'border-neutral-200 text-neutral-700 hover:border-neutral-300 dark:border-neutral-700 dark:text-neutral-300 dark:hover:border-neutral-500'
  }`

export function ControlsPanel({ settings, onChange, onNewImage }: Props) {
  return (
    <aside className="absolute bottom-4 right-4 top-4 z-20 flex w-72 flex-col rounded-2xl border border-neutral-200/70 bg-white/90 shadow-xl ring-1 ring-black/5 backdrop-blur dark:border-neutral-700/60 dark:bg-neutral-900/90 dark:ring-white/10">
      <div className="flex items-center justify-between border-b border-neutral-200 px-5 pb-4 pt-5 dark:border-neutral-800">
        <span className="text-xs font-semibold uppercase tracking-wide text-neutral-400 dark:text-neutral-500">
          Studio
        </span>
        <button
          onClick={onNewImage}
          className="flex items-center gap-1.5 rounded-md px-2 py-1 text-xs text-neutral-500 transition hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M12 5v14M5 12h14" />
          </svg>
          New image
        </button>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto">
        <Section title="Frame">
          <div className="grid grid-cols-2 gap-2">
            {FRAMES.map((f) => (
              <button key={f.value} onClick={() => onChange({ frame: f.value })} className={optionBtn(settings.frame === f.value)}>
                {f.label}
              </button>
            ))}
          </div>

          {(settings.frame === 'mac' || settings.frame === 'windows') && (
            <div className="mt-3 grid grid-cols-2 gap-2">
              {THEMES.map((t) => (
                <button
                  key={t.value}
                  onClick={() => onChange({ frameTheme: t.value })}
                  className={optionBtn(settings.frameTheme === t.value)}
                >
                  {t.label}
                </button>
              ))}
            </div>
          )}

          {settings.frame === 'custom' && (
            <div className="mt-3 space-y-3">
              <Slider
                label="Thickness"
                value={settings.borderWidth}
                min={0}
                max={80}
                onChange={(v) => onChange({ borderWidth: v })}
              />
              <div className="flex items-center gap-2">
                <ColorField value={settings.borderColor} onChange={(v) => onChange({ borderColor: v })} />
                <span className="font-mono text-xs uppercase text-neutral-500 dark:text-neutral-400">
                  {settings.borderColor}
                </span>
                <div className="ml-auto flex gap-1.5">
                  {['#ffffff', '#0a0a0a', '#f5f5f4'].map((c) => (
                    <button
                      key={c}
                      title={c}
                      onClick={() => onChange({ borderColor: c })}
                      className="h-6 w-6 rounded-md ring-1 ring-black/10 transition hover:scale-110 dark:ring-white/15"
                      style={{ background: c }}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
        </Section>

        <Section title="Adjust">
          <Slider label="Padding" value={settings.padding} min={0} max={256} onChange={(v) => onChange({ padding: v })} />
          <Slider label="Rounding" value={settings.cornerRadius} min={0} max={48} onChange={(v) => onChange({ cornerRadius: v })} />
          <Slider label="Shadow" value={settings.shadow} min={0} max={100} onChange={(v) => onChange({ shadow: v })} />
          <Slider label="Noise" value={settings.noise} min={0} max={100} onChange={(v) => onChange({ noise: v })} />
        </Section>

        <Section title="3D Tilt" defaultOpen={false}>
          <Slider label="Horizontal" value={settings.tiltY} min={-40} max={40} onChange={(v) => onChange({ tiltY: v })} />
          <Slider label="Vertical" value={settings.tiltX} min={-40} max={40} onChange={(v) => onChange({ tiltX: v })} />
          {(settings.tiltX !== 0 || settings.tiltY !== 0) && (
            <button
              onClick={() => onChange({ tiltX: 0, tiltY: 0 })}
              className="mt-1 text-xs text-neutral-400 transition hover:text-neutral-700 dark:text-neutral-500 dark:hover:text-neutral-200"
            >
              Reset tilt
            </button>
          )}
        </Section>

        <Section title="Aspect ratio" defaultOpen={false}>
          <div className="grid grid-cols-3 gap-2">
            {ASPECT_RATIOS.map((r) => (
              <button key={r.value} onClick={() => onChange({ aspectRatio: r.value })} className={optionBtn(settings.aspectRatio === r.value)}>
                {r.name}
              </button>
            ))}
          </div>
        </Section>
      </div>
    </aside>
  )
}
