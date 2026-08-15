import { useState } from 'react'
import type { Settings } from '../lib/types'
import { GRADIENTS, MESHES, SOLIDS } from '../lib/presets'
import { buildGradient, matchGradient } from '../lib/color'
import type { ThemeMode } from '../lib/theme'
import { ColorField, Section, Swatch } from './panelKit'
import { ThemeToggle } from './ThemeToggle'

interface Props {
  settings: Settings
  onChange: (patch: Partial<Settings>) => void
  imageSrc: string
  theme: ThemeMode
  setTheme: (mode: ThemeMode) => void
}

export function BackgroundPanel({ settings, onChange, imageSrc, theme, setTheme }: Props) {
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
    <aside className="glass-panel absolute bottom-4 left-4 top-4 z-20 flex w-72 flex-col rounded-[26px]">
      <div className="flex items-center justify-between border-b border-black/5 px-5 pb-4 pt-5 dark:border-white/5">
        <span
          className="text-2xl italic leading-none tracking-tight text-neutral-900 dark:text-neutral-100"
          style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
        >
          prettify
        </span>
        <ThemeToggle theme={theme} setTheme={setTheme} floating={false} />
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto">
        <div className="px-5 pb-4 pt-4">
          <button
            onClick={smartMatch}
            disabled={matching}
            className="group flex w-full items-center justify-center gap-1.5 rounded-md bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500 bg-[length:200%_100%] bg-left py-2 text-sm font-medium text-white shadow-[0_4px_14px_-4px_rgba(124,58,237,0.6)] transition-all duration-500 hover:bg-right hover:shadow-[0_6px_20px_-4px_rgba(124,58,237,0.7)] active:scale-[0.99] disabled:opacity-70"
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
        </div>

        <Section title="Gradients">
          <div className="grid grid-cols-5 gap-2">
            {GRADIENTS.map((g) => (
              <Swatch
                key={g.name}
                title={g.name}
                value={g.value}
                selected={settings.background === g.value}
                onClick={() => onChange({ background: g.value })}
              />
            ))}
          </div>
        </Section>

        <Section title="Mesh">
          <div className="grid grid-cols-5 gap-2">
            {MESHES.map((m) => (
              <Swatch
                key={m.name}
                title={m.name}
                value={m.value}
                selected={settings.background === m.value}
                onClick={() => onChange({ background: m.value })}
              />
            ))}
          </div>
        </Section>

        <Section title="Solid">
          <div className="grid grid-cols-6 gap-2">
            {SOLIDS.map((s) => (
              <Swatch
                key={s.name}
                title={s.name}
                value={s.value}
                selected={settings.background === s.value}
                onClick={() => onChange({ background: s.value })}
              />
            ))}
          </div>
        </Section>

        <Section title="Custom">
          <div className="glass-inset mb-3 flex rounded-lg p-0.5 text-xs font-medium">
            {(['solid', 'gradient'] as const).map((m) => (
              <button
                key={m}
                onClick={() => setCustomMode(m)}
                className={`flex-1 rounded-md py-1 capitalize transition ${
                  customMode === m
                    ? 'glass-chip text-neutral-900 dark:text-white'
                    : 'text-neutral-500 dark:text-neutral-400'
                }`}
              >
                {m}
              </button>
            ))}
          </div>

          {customMode === 'solid' ? (
            <div className="flex items-center gap-2">
              <ColorField value={solid} onChange={applySolid} />
              <span className="font-mono text-xs uppercase text-neutral-500 dark:text-neutral-400">{solid}</span>
              <span
                className="ml-auto h-8 w-16 rounded-md ring-1 ring-black/10 dark:ring-white/15"
                style={{ background: solid }}
              />
            </div>
          ) : (
            <div className="space-y-2.5">
              <div className="flex items-center gap-2">
                <ColorField value={gradA} onChange={(v) => applyGradient(v, gradB, angle)} />
                <ColorField value={gradB} onChange={(v) => applyGradient(gradA, v, angle)} />
                <span
                  className="ml-auto h-8 flex-1 rounded-md ring-1 ring-black/10 dark:ring-white/15"
                  style={{ background: customGradient }}
                />
              </div>
              <div className="group/slider">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-sm text-neutral-600 dark:text-neutral-300">Angle</span>
                  <span className="min-w-[2.25rem] rounded-md bg-neutral-100 px-1.5 py-0.5 text-center text-xs font-medium tabular-nums text-neutral-600 transition group-hover/slider:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-300 dark:group-hover/slider:bg-neutral-700">
                    {angle}°
                  </span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={360}
                  value={angle}
                  onChange={(e) => applyGradient(gradA, gradB, Number(e.target.value))}
                  style={{
                    background: `linear-gradient(to right, var(--tw-slider-fill) 0%, var(--tw-slider-fill) ${(angle / 360) * 100}%, var(--tw-slider-track) ${(angle / 360) * 100}%, var(--tw-slider-track) 100%)`,
                  }}
                  className="h-1.5 w-full cursor-pointer appearance-none rounded-full outline-none [--tw-slider-fill:theme(colors.neutral.900)] [--tw-slider-track:theme(colors.neutral.200)] dark:[--tw-slider-fill:theme(colors.neutral.100)] dark:[--tw-slider-track:theme(colors.neutral.700)] [&::-moz-range-thumb]:h-3.5 [&::-moz-range-thumb]:w-3.5 [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:shadow-[0_1px_3px_rgba(0,0,0,0.35)] [&::-moz-range-thumb]:ring-1 [&::-moz-range-thumb]:ring-black/10 [&::-webkit-slider-thumb]:h-3.5 [&::-webkit-slider-thumb]:w-3.5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:shadow-[0_1px_3px_rgba(0,0,0,0.35)] [&::-webkit-slider-thumb]:ring-1 [&::-webkit-slider-thumb]:ring-black/10 [&::-webkit-slider-thumb]:transition-transform [&:hover::-webkit-slider-thumb]:scale-110 [&:active::-webkit-slider-thumb]:scale-95"
                />
              </div>
            </div>
          )}
        </Section>
      </div>
    </aside>
  )
}
