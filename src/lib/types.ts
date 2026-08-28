export type FrameStyle = 'none' | 'mac' | 'windows' | 'custom'
export type FrameTheme = 'light' | 'dark'

export interface Settings {
  background: string
  /** Blur applied to a custom image background (px). */
  backgroundBlur: number
  /** Dark overlay over a custom image background (0-100). */
  backgroundDim: number
  padding: number
  cornerRadius: number
  shadow: number
  noise: number
  frame: FrameStyle
  frameTheme: FrameTheme
  borderWidth: number
  borderColor: string
  aspectRatio: string
  tiltX: number
  tiltY: number
}

export interface ImageData {
  src: string
  naturalWidth: number
  naturalHeight: number
}
