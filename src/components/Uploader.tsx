import { useRef } from 'react'

interface Props {
  onFile: (file: File) => void
}

export function Uploader({ onFile }: Props) {
  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <div className="flex h-full w-full items-center justify-center p-8">
      <button
        onClick={() => inputRef.current?.click()}
        className="flex w-full max-w-lg flex-col items-center gap-3 rounded-2xl border-2 border-dashed border-neutral-300 bg-white px-8 py-16 text-center transition hover:border-neutral-400 hover:bg-neutral-50"
      >
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-neutral-900 text-2xl text-white">
          +
        </div>
        <div className="text-lg font-medium text-neutral-800">Drop a screenshot here</div>
        <div className="text-sm text-neutral-500">
          or click to upload &middot; or paste from clipboard (⌘V)
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
      </button>
    </div>
  )
}
