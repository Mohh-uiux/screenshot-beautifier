export type FrameStyle = 'none' | 'mac' | 'browser' | 'windows'
export type FrameTheme = 'light' | 'dark'

export interface Settings {
  background: string
  padding: number
  cornerRadius: number
  shadow: number
  frame: FrameStyle
  frameTheme: FrameTheme
  aspectRatio: string
}

export interface ImageData {
  src: string
  naturalWidth: number
  naturalHeight: number
}
