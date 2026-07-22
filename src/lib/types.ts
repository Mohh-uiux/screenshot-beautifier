export type FrameStyle = 'none' | 'mac' | 'browser' | 'windows'
export type FrameTheme = 'light' | 'dark'

export interface Settings {
  background: string
  padding: number
  cornerRadius: number
  shadow: number
  noise: number
  frame: FrameStyle
  frameTheme: FrameTheme
  aspectRatio: string
  tiltX: number
  tiltY: number
}

export interface ImageData {
  src: string
  naturalWidth: number
  naturalHeight: number
}
