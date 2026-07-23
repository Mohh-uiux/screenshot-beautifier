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

// Mesh gradients: several radial-gradient "blobs" over a base color.
// Stored as a single `background` shorthand so it drops straight into
// the existing `background` style (and exports cleanly via html-to-image).
function mesh(base: string, blobs: [number, number, string][]): string {
  const layers = blobs
    .map(([x, y, c]) => `radial-gradient(at ${x}% ${y}%, ${c} 0px, transparent 50%)`)
    .join(', ')
  return `${layers}, ${base}`
}

export const MESHES: { name: string; value: string }[] = [
  {
    name: 'Aurora',
    value: mesh('#7c3aed', [
      [27, 37, 'hsla(215,98%,61%,1)'],
      [97, 21, 'hsla(125,98%,72%,1)'],
      [52, 99, 'hsla(354,98%,61%,1)'],
      [10, 29, 'hsla(256,96%,67%,1)'],
      [97, 96, 'hsla(38,60%,74%,1)'],
      [33, 50, 'hsla(222,67%,73%,1)'],
      [79, 53, 'hsla(343,68%,79%,1)'],
    ]),
  },
  {
    name: 'Sunset',
    value: mesh('#ff6b6b', [
      [10, 20, 'hsla(28,100%,74%,1)'],
      [80, 0, 'hsla(340,100%,76%,1)'],
      [0, 50, 'hsla(22,100%,77%,1)'],
      [80, 50, 'hsla(355,90%,67%,1)'],
      [0, 100, 'hsla(340,100%,76%,1)'],
      [80, 100, 'hsla(14,100%,64%,1)'],
    ]),
  },
  {
    name: 'Ocean',
    value: mesh('#0ea5e9', [
      [0, 0, 'hsla(200,100%,70%,1)'],
      [100, 20, 'hsla(190,100%,60%,1)'],
      [20, 80, 'hsla(220,90%,60%,1)'],
      [100, 100, 'hsla(175,80%,55%,1)'],
      [50, 50, 'hsla(210,100%,72%,1)'],
    ]),
  },
  {
    name: 'Candy',
    value: mesh('#d946ef', [
      [0, 10, 'hsla(300,100%,75%,1)'],
      [90, 10, 'hsla(190,100%,70%,1)'],
      [10, 90, 'hsla(280,100%,72%,1)'],
      [90, 90, 'hsla(330,100%,72%,1)'],
      [50, 40, 'hsla(260,100%,78%,1)'],
    ]),
  },
  {
    name: 'Forest',
    value: mesh('#16a34a', [
      [10, 20, 'hsla(140,70%,60%,1)'],
      [90, 10, 'hsla(90,70%,60%,1)'],
      [20, 90, 'hsla(160,70%,45%,1)'],
      [90, 80, 'hsla(120,60%,55%,1)'],
      [50, 50, 'hsla(150,65%,58%,1)'],
    ]),
  },
  {
    name: 'Dusk',
    value: mesh('#1e1b4b', [
      [20, 20, 'hsla(260,90%,55%,1)'],
      [80, 10, 'hsla(300,80%,55%,1)'],
      [10, 80, 'hsla(220,90%,50%,1)'],
      [90, 90, 'hsla(280,85%,50%,1)'],
      [50, 50, 'hsla(240,80%,45%,1)'],
    ]),
  },
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
  noise: 0,
  frame: 'mac' as const,
  frameTheme: 'light' as const,
  aspectRatio: 'auto',
  tiltX: 0,
  tiltY: 0,
}
