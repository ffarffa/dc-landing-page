// Local-only colour tuner (mounted from main.tsx under import.meta.env.DEV, so it never reaches the build).
// It drives the CSS knobs in index.css: --h, --s, --spread, --bh, --bs.
import { useEffect, useMemo, useState } from 'react'
import './colorlab.css'

type Knobs = { h: number; s: number; spread: number; bh: number; bs: number }
const ORIGINAL: Knobs = { h: 20, s: 100, spread: 19, bh: 216, bs: 19 }
const PRESETS: { name: string; k: Knobs }[] = [
  { name: 'Original', k: ORIGINAL },
  { name: 'Aurora', k: { h: 168, s: 85, spread: -26, bh: 210, bs: 22 } },
  { name: 'Electric', k: { h: 214, s: 100, spread: 30, bh: 222, bs: 24 } },
  { name: 'Violet', k: { h: 266, s: 90, spread: -38, bh: 240, bs: 20 } },
  { name: 'Emerald', k: { h: 150, s: 70, spread: 30, bh: 200, bs: 18 } },
  { name: 'Magenta', k: { h: 326, s: 90, spread: 24, bh: 250, bs: 16 } },
  { name: 'Solar', k: { h: 44, s: 95, spread: -18, bh: 220, bs: 14 } },
]
const KEY = 'dc-colorlab'

function load(): Knobs {
  try {
    const v = JSON.parse(localStorage.getItem(KEY) ?? 'null')
    if (v && typeof v.h === 'number') return { ...ORIGINAL, ...v }
  } catch { /* ignore */ }
  return ORIGINAL
}

function apply(k: Knobs) {
  const r = document.documentElement.style
  r.setProperty('--h', String(k.h))
  r.setProperty('--s', `${k.s}%`)
  r.setProperty('--spread', String(k.spread))
  r.setProperty('--bh', String(k.bh))
  r.setProperty('--bs', `${k.bs}%`)
}

function hslToHex(h: number, s: number, l: number) {
  s /= 100; l /= 100
  const f = (n: number) => {
    const k = (n + h / 30) % 12
    const c = l - s * Math.min(l, 1 - l) * Math.max(-1, Math.min(k - 3, 9 - k, 1))
    return Math.round(c * 255).toString(16).padStart(2, '0')
  }
  return `#${f(0)}${f(8)}${f(4)}`
}

export default function ColorLab() {
  const [k, setK] = useState<Knobs>(load)
  const [open, setOpen] = useState(true)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    apply(k)
    try { localStorage.setItem(KEY, JSON.stringify(k)) } catch { /* ignore */ }
  }, [k])

  const hex = useMemo(() => {
    const goldH = (((k.h + k.spread) % 360) + 360) % 360
    return {
      ember: hslToHex(k.h, k.s, 62),
      gold: hslToHex(goldH, k.s * 0.88, 69),
      bg: hslToHex(k.bh, k.bs, 5.3),
    }
  }, [k])

  const css = `--h: ${k.h};\n--s: ${k.s}%;\n--spread: ${k.spread};\n--bh: ${k.bh};\n--bs: ${k.bs}%;`
  const set = (patch: Partial<Knobs>) => setK((prev) => ({ ...prev, ...patch }))
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(css)
      setCopied(true)
      setTimeout(() => setCopied(false), 1200)
    } catch { /* clipboard blocked */ }
  }

  if (!open) return <button className="cl-fab" onClick={() => setOpen(true)} aria-label="Open colour lab">🎨</button>

  return (
    <aside className="cl" aria-label="Colour lab">
      <header>
        <strong>Colour lab</strong>
        <span>local only</span>
        <button onClick={() => setOpen(false)} aria-label="Close">×</button>
      </header>

      <Slider label="Accent hue" value={k.h} min={0} max={360} onChange={(h) => set({ h })} track="hue" />
      <Slider label="Accent saturation" value={k.s} min={20} max={100} unit="%" onChange={(s) => set({ s })}
        track={`linear-gradient(90deg, hsl(${k.h} 20% 62%), hsl(${k.h} 100% 62%))`} />
      <Slider label="Gold offset" value={k.spread} min={-90} max={90} onChange={(spread) => set({ spread })}
        track={`linear-gradient(90deg, hsl(${k.h - 90} 88% 69%), hsl(${k.h} 88% 69%), hsl(${k.h + 90} 88% 69%))`} />
      <Slider label="Background hue" value={k.bh} min={0} max={360} onChange={(bh) => set({ bh })} track="hue-dark" />
      <Slider label="Background tint" value={k.bs} min={0} max={45} unit="%" onChange={(bs) => set({ bs })}
        track={`linear-gradient(90deg, hsl(${k.bh} 0% 14%), hsl(${k.bh} 45% 14%))`} />

      <div className="cl-swatches">
        <Swatch name="ember" hex={hex.ember} />
        <Swatch name="gold" hex={hex.gold} />
        <Swatch name="bg" hex={hex.bg} />
      </div>

      <div className="cl-presets">
        {PRESETS.map((p) => (
          <button key={p.name} onClick={() => setK(p.k)} title={p.name}
            style={{ background: `linear-gradient(135deg, hsl(${p.k.h} ${p.k.s}% 62%), hsl(${p.k.h + p.k.spread} ${p.k.s * 0.88}% 69%))` }}>
            {p.name}
          </button>
        ))}
      </div>

      <div className="cl-actions">
        <button onClick={copy}>{copied ? 'Copied ✓' : 'Copy values'}</button>
        <button onClick={() => setK(ORIGINAL)}>Reset</button>
      </div>
      <pre>{css}</pre>
    </aside>
  )
}

function Slider({ label, value, min, max, unit = '', onChange, track }: {
  label: string; value: number; min: number; max: number; unit?: string; onChange: (v: number) => void; track: string
}) {
  const bg = track === 'hue'
    ? 'linear-gradient(90deg,#ff3d3d,#ffb03d,#e8ff3d,#3dff6a,#3dffe8,#3d8bff,#8a3dff,#ff3dd8,#ff3d3d)'
    : track === 'hue-dark'
      ? 'linear-gradient(90deg,#3a1414,#3a2f14,#2c3a14,#143a1d,#143a37,#14243a,#25143a,#3a1435,#3a1414)'
      : track
  return (
    <label className="cl-row">
      <span>{label}<b>{value}{unit}</b></span>
      <input type="range" min={min} max={max} value={value} onChange={(e) => onChange(Number(e.target.value))} style={{ background: bg }} />
    </label>
  )
}

function Swatch({ name, hex }: { name: string; hex: string }) {
  return (
    <div className="cl-swatch">
      <i style={{ background: hex }} />
      <span>{name}</span>
      <code>{hex}</code>
    </div>
  )
}
