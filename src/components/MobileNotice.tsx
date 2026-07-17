export function MobileNotice() {
  return (
    <div className="flex h-full flex-col items-center justify-center bg-neutral-100 px-8 text-center">
      <span
        className="mb-6 text-4xl italic leading-none tracking-tight text-neutral-900"
        style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
      >
        prettify
      </span>
      <h1 className="mb-3 text-lg font-semibold text-neutral-900">
        Best experienced on desktop
      </h1>
      <p className="max-w-xs text-sm leading-relaxed text-neutral-500">
        prettify uses drag &amp; drop and a roomy canvas that need a bigger screen.
        Open this link on your computer to beautify your screenshots.
      </p>
    </div>
  )
}
