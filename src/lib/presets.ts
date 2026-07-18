export const GRADIENTS: { name: string; value: string }[] = [
  { name: 'Purple', value: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
  { name: 'Sunset', value: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)' },
  { name: 'Ocean', value: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' },
  { name: 'Vivid', value: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' },
  { name: 'Peach', value: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)' },
  { name: 'Mint', value: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)' },
  { name: 'Cool', value: 'linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)' },
  { name: 'Lush', value: 'linear-gradient(135deg, #56ab2f 0%, #a8e063 100%)' },
  { name: 'Night', value: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)' },
  { name: 'Flame', value: 'linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)' },
  { name: 'Fog', value: 'linear-gradient(135deg, #e0eafc 0%, #cfdef3 100%)' },
  { name: 'Space', value: 'linear-gradient(135deg, #000000 0%, #434343 100%)' },
]

export const SOLIDS: { name: string; value: string }[] = [
  { name: 'White', value: '#ffffff' },
  { name: 'Light', value: '#f3f4f6' },
  { name: 'Sand', value: '#e7e5e4' },
  { name: 'Indigo', value: '#6366f1' },
  { name: 'Slate', value: '#1e293b' },
  { name: 'Black', value: '#000000' },
]

export const ASPECT_RATIOS: { name: string; value: string; ratio: number | null }[] = [
  { name: 'Auto', value: 'auto', ratio: null },
  { name: '16:9', value: '16:9', ratio: 16 / 9 },
  { name: '4:3', value: '4:3', ratio: 4 / 3 },
  { name: '1:1', value: '1:1', ratio: 1 },
  { name: '3:4', value: '3:4', ratio: 3 / 4 },
  { name: '1.91:1', value: '1.91:1', ratio: 1.91 },
]

export const DEFAULT_SETTINGS = {
  background: GRADIENTS[0].value,
  padding: 96,
  cornerRadius: 12,
  shadow: 55,
  frame: 'mac' as const,
  frameTheme: 'light' as const,
  aspectRatio: 'auto',
}
