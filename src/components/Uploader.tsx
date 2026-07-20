import { useRef } from 'react'

interface Props {
  onFile: (file: File) => void
}

const SERIF = "'Instrument Serif', Georgia, serif"

export function Uploader({ onFile }: Props) {
  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden bg-neutral-50 px-6">
      {/* ambient glow */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[560px] w-[560px] -translate-x-1/2 -translate-y-[56%] rounded-full bg-[conic-gradient(from_180deg_at_50%_50%,#a5b4fc_0deg,#ddd6fe_120deg,#a5f3fc_240deg,#a5b4fc_360deg)] opacity-50 blur-[120px]" />
      </div>

      {/* grain */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      {/* wordmark */}
      <div className="absolute left-1/2 top-8 -translate-x-1/2">
        <span
          className="text-2xl italic leading-none tracking-tight text-neutral-900"
          style={{ fontFamily: SERIF }}
        >
          prettify
        </span>
      </div>

      {/* hero */}
      <div className="relative z-10 flex w-full max-w-xl flex-col items-center text-center">
        <h1 className="mb-4 text-5xl font-medium leading-[1.05] tracking-tight text-neutral-900 sm:text-6xl">
          Beautiful screenshots,
          <br />
          <span className="italic" style={{ fontFamily: SERIF }}>
            in seconds.
          </span>
        </h1>
        <p className="mb-10 max-w-md text-pretty text-base leading-relaxed text-neutral-500">
          Drop a screenshot and prettify wraps it in gorgeous backgrounds,
          frames, and shadows. Free, private, all in your browser.
        </p>

        {/* dropzone */}
        <button
          onClick={() => inputRef.current?.click()}
          className="group relative flex w-full flex-col items-center gap-4 rounded-3xl border border-neutral-200/70 bg-white/60 px-8 py-14 shadow-[0_20px_60px_-24px_rgba(23,23,23,0.20)] backdrop-blur-xl transition duration-300 hover:-translate-y-0.5 hover:border-neutral-300 hover:bg-white/80 hover:shadow-[0_32px_80px_-28px_rgba(23,23,23,0.28)]"
        >
          <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-neutral-900 text-white transition duration-300 group-hover:scale-105">
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 15V4" />
              <path d="M7.5 8.5 12 4l4.5 4.5" />
              <path d="M5 15v2.5A2.5 2.5 0 0 0 7.5 20h9a2.5 2.5 0 0 0 2.5-2.5V15" />
            </svg>
          </span>
          <span>
            <span className="block text-base font-medium text-neutral-800">
              Drop a screenshot here
            </span>
            <span className="mt-1 block text-sm text-neutral-400">
              or{' '}
              <span className="text-neutral-600 underline decoration-neutral-300 underline-offset-2">
                click to upload
              </span>{' '}
              · paste with ⌘V
            </span>
          </span>
        </button>
      </div>

      {/* footer */}
      <div className="absolute bottom-6 text-xs tracking-wide text-neutral-400">
        No sign-up · nothing leaves your device
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0]
          if (f) onFile(f)
          e.target.value = ''
        }}
      />
    </div>
  )
}
