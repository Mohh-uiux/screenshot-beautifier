export type FrameStyle = 'none' | 'mac' | 'browser'

export interface Settings {
  background: string
  padding: number
  cornerRadius: number
  shadow: number
  frame: FrameStyle
  aspectRatio: string
}

export interface ImageData {
  src: string
  naturalWidth: number
  naturalHeight: number
}
