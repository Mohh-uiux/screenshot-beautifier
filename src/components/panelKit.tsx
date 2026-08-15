import { useState } from 'react'

export function ColorField({
  value,
  onChange,
}: {
  value: string
  onChange: (v: string) => void
}) {
  return (
    <label className="relative block h-8 w-8 cursor-pointer overflow-hidden rounded-md ring-1 ring-black/10 dark:ring-white/15">
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

export function Section({
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
    <div className="border-b border-black/5 dark:border-white/5">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between px-5 py-3.5 text-xs font-semibold uppercase tracking-wide text-neutral-500 transition hover:text-neutral-800 dark:text-neutral-400 dark:hover:text-neutral-200"
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

export function Slider({
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
  const pct = max === min ? 0 : ((value - min) / (max - min)) * 100

  return (
    <div className="group/slider mb-4 last:mb-0">
      <div className="mb-2 flex items-center justify-between">
        <span className="text-sm text-neutral-600 dark:text-neutral-300">{label}</span>
        <span className="min-w-[2.25rem] rounded-md bg-neutral-100 px-1.5 py-0.5 text-center text-xs font-medium tabular-nums text-neutral-600 transition group-hover/slider:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-300 dark:group-hover/slider:bg-neutral-700">
          {value}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        style={{
          background: `linear-gradient(to right, var(--tw-slider-fill) 0%, var(--tw-slider-fill) ${pct}%, var(--tw-slider-track) ${pct}%, var(--tw-slider-track) 100%)`,
        }}
        className="h-1.5 w-full cursor-pointer appearance-none rounded-full outline-none [--tw-slider-fill:theme(colors.neutral.900)] [--tw-slider-track:theme(colors.neutral.200)] dark:[--tw-slider-fill:theme(colors.neutral.100)] dark:[--tw-slider-track:theme(colors.neutral.700)] [&::-moz-range-thumb]:h-3.5 [&::-moz-range-thumb]:w-3.5 [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:shadow-[0_1px_3px_rgba(0,0,0,0.35)] [&::-moz-range-thumb]:ring-1 [&::-moz-range-thumb]:ring-black/10 [&::-webkit-slider-thumb]:h-3.5 [&::-webkit-slider-thumb]:w-3.5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:shadow-[0_1px_3px_rgba(0,0,0,0.35)] [&::-webkit-slider-thumb]:ring-1 [&::-webkit-slider-thumb]:ring-black/10 [&::-webkit-slider-thumb]:transition-transform [&:hover::-webkit-slider-thumb]:scale-110 [&:active::-webkit-slider-thumb]:scale-95"
      />
    </div>
  )
}

export function Swatch({
  value,
  selected,
  title,
  onClick,
}: {
  value: string
  selected: boolean
  title: string
  onClick: () => void
}) {
  return (
    <button
      title={title}
      onClick={onClick}
      className={`aspect-square rounded-md ring-offset-1 transition ${
        selected
          ? 'ring-2 ring-neutral-900 dark:ring-white'
          : 'ring-1 ring-black/10 hover:ring-black/25 dark:ring-white/15 dark:hover:ring-white/40'
      }`}
      style={{ background: value }}
    />
  )
}
