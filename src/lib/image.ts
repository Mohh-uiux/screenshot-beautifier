import type { ImageData } from './types'

export function loadImageFromFile(file: File): Promise<ImageData> {
  return new Promise((resolve, reject) => {
    if (!file.type.startsWith('image/')) {
      reject(new Error('Not an image file'))
      return
    }
    const reader = new FileReader()
    reader.onload = () => {
      const src = reader.result as string
      const img = new Image()
      img.onload = () =>
        resolve({ src, naturalWidth: img.naturalWidth, naturalHeight: img.naturalHeight })
      img.onerror = () => reject(new Error('Failed to decode image'))
      img.src = src
    }
    reader.onerror = () => reject(new Error('Failed to read file'))
    reader.readAsDataURL(file)
  })
}
