// Curated, tasteful gradients. Three-stop where it adds depth; soft mid-tones
// so screenshots always sit on a pleasant, non-muddy backdrop.
export const GRADIENTS: { name: string; value: string }[] = [
  { name: 'Lavender', value: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
  { name: 'Periwinkle', value: 'linear-gradient(135deg, #a5b4fc 0%, #818cf8 50%, #6366f1 100%)' },
  { name: 'Grape', value: 'linear-gradient(135deg, #8e2de2 0%, #e100ff 100%)' },
  { name: 'Fuchsia', value: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' },
  { name: 'Coral', value: 'linear-gradient(135deg, #ff9a8b 0%, #ff6a88 55%, #ff99ac 100%)' },
  { name: 'Sunset', value: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)' },
  { name: 'Peach', value: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)' },
  { name: 'Rose', value: 'linear-gradient(135deg, #ee9ca7 0%, #ffdde1 100%)' },
  { name: 'Ember', value: 'linear-gradient(135deg, #ff512f 0%, #f09819 100%)' },
  { name: 'Lemon', value: 'linear-gradient(135deg, #f6d365 0%, #fda085 100%)' },
  { name: 'Lime', value: 'linear-gradient(135deg, #56ab2f 0%, #a8e063 100%)' },
  { name: 'Emerald', value: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)' },
  { name: 'Mint', value: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)' },
  { name: 'Teal', value: 'linear-gradient(135deg, #0093e9 0%, #80d0c7 100%)' },
  { name: 'Ocean', value: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' },
  { name: 'Sky', value: 'linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)' },
  { name: 'Cloud', value: 'linear-gradient(135deg, #e0eafc 0%, #cfdef3 100%)' },
  { name: 'Midnight', value: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)' },
  { name: 'Slate', value: 'linear-gradient(135deg, #334155 0%, #0f172a 100%)' },
  { name: 'Graphite', value: 'linear-gradient(135deg, #434343 0%, #000000 100%)' },
]

export const SOLIDS: { name: string; value: string }[] = [
  { name: 'White', value: '#ffffff' },
  { name: 'Light', value: '#f3f4f6' },
  { name: 'Sand', value: '#e7e5e4' },
  { name: 'Stone', value: '#d6d3d1' },
  { name: 'Sky', value: '#e0f2fe' },
  { name: 'Lilac', value: '#ede9fe' },
  { name: 'Indigo', value: '#6366f1' },
  { name: 'Rose', value: '#fb7185' },
  { name: 'Teal', value: '#14b8a6' },
  { name: 'Slate', value: '#1e293b' },
  { name: 'Ink', value: '#0f172a' },
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
  {
    name: 'Coral',
    value: mesh('#fb7185', [
      [0, 0, 'hsla(12,100%,72%,1)'],
      [100, 10, 'hsla(340,100%,76%,1)'],
      [20, 90, 'hsla(28,100%,74%,1)'],
      [90, 90, 'hsla(350,95%,70%,1)'],
      [50, 40, 'hsla(2,100%,78%,1)'],
    ]),
  },
  {
    name: 'Mint',
    value: mesh('#5eead4', [
      [10, 10, 'hsla(160,80%,75%,1)'],
      [90, 20, 'hsla(180,75%,72%,1)'],
      [20, 85, 'hsla(140,70%,72%,1)'],
      [85, 90, 'hsla(190,80%,74%,1)'],
      [50, 50, 'hsla(165,75%,78%,1)'],
    ]),
  },
  {
    name: 'Peach',
    value: mesh('#fed7aa', [
      [0, 10, 'hsla(30,100%,82%,1)'],
      [95, 5, 'hsla(20,100%,80%,1)'],
      [15, 90, 'hsla(45,100%,84%,1)'],
      [90, 85, 'hsla(12,100%,80%,1)'],
      [50, 45, 'hsla(28,100%,86%,1)'],
    ]),
  },
  {
    name: 'Twilight',
    value: mesh('#0f172a', [
      [15, 15, 'hsla(230,80%,45%,1)'],
      [85, 10, 'hsla(280,70%,45%,1)'],
      [10, 85, 'hsla(200,85%,45%,1)'],
      [90, 90, 'hsla(255,75%,42%,1)'],
      [50, 50, 'hsla(240,70%,38%,1)'],
    ]),
  },
  {
    name: 'Lemon',
    value: mesh('#fde68a', [
      [5, 10, 'hsla(48,100%,75%,1)'],
      [95, 15, 'hsla(38,100%,72%,1)'],
      [20, 90, 'hsla(55,100%,78%,1)'],
      [90, 85, 'hsla(42,100%,74%,1)'],
      [50, 45, 'hsla(50,100%,80%,1)'],
    ]),
  },
  {
    name: 'Berry',
    value: mesh('#831843', [
      [10, 15, 'hsla(330,80%,55%,1)'],
      [90, 10, 'hsla(300,70%,50%,1)'],
      [15, 85, 'hsla(350,80%,52%,1)'],
      [90, 90, 'hsla(320,75%,48%,1)'],
      [50, 50, 'hsla(335,75%,45%,1)'],
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
  backgroundBlur: 0,
  backgroundDim: 0,
  padding: 96,
  cornerRadius: 12,
  shadow: 55,
  noise: 0,
  frame: 'mac' as const,
  frameTheme: 'light' as const,
  borderWidth: 16,
  borderColor: '#ffffff',
  aspectRatio: 'auto',
  tiltX: 0,
  tiltY: 0,
}
