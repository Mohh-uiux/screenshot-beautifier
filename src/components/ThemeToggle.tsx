import type { ThemeMode } from '../lib/theme'

interface Props {
  theme: ThemeMode
  setTheme: (mode: ThemeMode) => void
  /** Floating overlay (landing page) vs. inline in a panel header. */
  floating?: boolean
}

const SunIcon = (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
  </svg>
)

const SystemIcon = (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <rect x="2" y="3" width="20" height="14" rx="2" />
    <path d="M8 21h8M12 17v4" />
  </svg>
)

const MoonIcon = (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9z" />
  </svg>
)

const OPTIONS: { value: ThemeMode; label: string; icon: React.ReactNode }[] = [
  { value: 'light', label: 'Light', icon: SunIcon },
  { value: 'system', label: 'System', icon: SystemIcon },
  { value: 'dark', label: 'Dark', icon: MoonIcon },
]

export function ThemeToggle({ theme, setTheme, floating = true }: Props) {
  const wrap = floating
    ? 'pointer-events-auto absolute bottom-6 left-6 z-30 gap-0.5 border border-neutral-200/70 bg-white/80 p-1 shadow-lg ring-1 ring-black/5 backdrop-blur dark:border-neutral-700/60 dark:bg-neutral-900/80 dark:ring-white/10'
    : 'gap-0.5 bg-neutral-100 p-0.5 dark:bg-neutral-800'
  const btn = floating ? 'h-8 w-8' : 'h-7 w-7'
  return (
    <div className={`flex items-center rounded-full ${wrap}`}>
      {OPTIONS.map((o) => (
        <button
          key={o.value}
          onClick={() => setTheme(o.value)}
          title={o.label}
          aria-label={`${o.label} theme`}
          aria-pressed={theme === o.value}
          className={`flex items-center justify-center rounded-full transition ${btn} ${
            theme === o.value
              ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900'
              : 'text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white'
          }`}
        >
          {o.icon}
        </button>
      ))}
    </div>
  )
}
