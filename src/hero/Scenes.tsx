// Hero animations: five "problem → solved" scenes drawn in SVG and driven by one looping clock.
// Each scene gets t in [0, 1) and renders that moment, so timing lives in one place per scene.
import { useEffect, useState } from 'react'

const clamp = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v)
const seg = (t: number, a: number, b: number) => clamp((t - a) / (b - a))
const ease = (v: number) => (1 - Math.cos(Math.PI * clamp(v))) / 2
const lerp = (a: number, b: number, k: number) => a + (b - a) * k
// Fade in at the start of every loop and out at the end, so the restart is invisible.
const loopFade = (t: number) => Math.min(seg(t, 0, 0.06), 1 - seg(t, 0.93, 1))

const reduced = () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

/** Looping clock: t goes 0 → 1 every `ms`. With reduced motion it holds the resolved state. */
function useLoop(ms: number, still = 0.8) {
  const [t, setT] = useState(still)
  useEffect(() => {
    if (reduced()) return
    let raf = 0
    const start = performance.now()
    const tick = (now: number) => {
      setT(((now - start) % ms) / ms)
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [ms])
  return t
}

function Caption({ ok, bad, good }: { ok: boolean; bad: string; good: string }) {
  return (
    <text x="24" y="284" className={`sc-cap ${ok ? 'ok' : 'bad'}`}>
      <tspan className="sc-dot">●</tspan> {ok ? good : bad}
    </text>
  )
}

/* 1. Tangle → order: a knot of services untangles into a clean layered architecture. */
const NODES = [
  { a: [300, 214], b: [200, 46] },   // users
  { a: [92, 82], b: [200, 100] },    // gateway
  { a: [250, 62], b: [112, 158] },   // app 1
  { a: [146, 236], b: [200, 158] },  // app 2 (the one in trouble)
  { a: [326, 118], b: [288, 158] },  // app 3
  { a: [74, 186], b: [150, 216] },   // data 1
  { a: [234, 150], b: [250, 216] },  // data 2
  { a: [176, 108], b: [330, 216] },  // backup
]
const EDGES = [[0, 1], [1, 2], [1, 3], [1, 4], [2, 5], [3, 5], [3, 6], [4, 6], [6, 7]]
const PULSE = [0, 1, 3, 6, 7]

export function Tangle() {
  const t = useLoop(9000)
  const k = ease(seg(t, 0.3, 0.62))
  const calm = seg(t, 0.55, 0.7)
  const pos = NODES.map((n, i) => {
    const j = (1 - k) * 4
    return [lerp(n.a[0], n.b[0], k) + Math.sin(t * 90 + i * 2) * j, lerp(n.a[1], n.b[1], k) + Math.cos(t * 70 + i) * j]
  })
  // pulse travelling along the healthy path once things are in order
  let pulse: number[] | null = null
  if (t > 0.66 && t < 0.92) {
    const u = ((t - 0.66) / 0.13) % 1, f = u * (PULSE.length - 1), i = Math.floor(f), r = f - i
    const p = pos[PULSE[i]], q = pos[PULSE[Math.min(i + 1, PULSE.length - 1)]]
    pulse = [lerp(p[0], q[0], r), lerp(p[1], q[1], r)]
  }
  return (
    <g opacity={loopFade(t)}>
      {EDGES.map(([a, b], i) => (
        <line key={i} x1={pos[a][0]} y1={pos[a][1]} x2={pos[b][0]} y2={pos[b][1]}
          className="sc-line" opacity={lerp(0.25 + 0.2 * Math.abs(Math.sin(t * 40 + i)), 0.55, calm)} />
      ))}
      {pos.map(([x, y], i) => {
        const alert = i === 3
        return (
          <g key={i}>
            {alert && <circle cx={x} cy={y} r={8 + (1 - calm) * (6 + 6 * Math.abs(Math.sin(t * 30)))} className="sc-ring" opacity={(1 - calm) * 0.8} />}
            <circle cx={x} cy={y} r={i === 0 ? 7 : 5.5} className={alert && calm < 0.5 ? 'sc-node bad' : 'sc-node'} />
          </g>
        )
      })}
      {pulse && <circle cx={pulse[0]} cy={pulse[1]} r={4} className="sc-pulse" />}
      <Caption ok={t > 0.5} bad="3 alerts · services tangled" good="healthy · architecture in order" />
    </g>
  )
}

/* 2. Storm → clear sky: shaking servers settle as the horizon arc rises like a sunrise. */
export function Storm() {
  const t = useLoop(9000)
  const rise = ease(seg(t, 0.35, 0.72))
  const storm = 1 - ease(seg(t, 0.3, 0.6))
  const peak = lerp(236, 132, rise)
  const blocks = [0, 1, 2, 3, 4]
  return (
    <g opacity={loopFade(t)}>
      <defs>
        <radialGradient id="sc-dawn" cx="50%" cy="100%" r="60%">
          <stop offset="0" stopColor="var(--ember)" stopOpacity="0.45" />
          <stop offset="1" stopColor="var(--ember)" stopOpacity="0" />
        </radialGradient>
      </defs>
      <ellipse cx="200" cy="250" rx="190" ry={lerp(20, 130, rise)} fill="url(#sc-dawn)" opacity={rise} />
      <path d={`M60 250 Q200 ${2 * peak - 250} 340 250`} className="sc-arc" />
      {blocks.map((i) => {
        const x = 118 + i * 34, dx = Math.sin(t * 120 + i * 3) * 2.4 * storm, dy = Math.cos(t * 97 + i) * 1.6 * storm
        const led = storm > 0.3 ? (Math.sin(t * 60 + i * 2) > 0 ? 'bad' : 'off') : 'ok'
        return (
          <g key={i} transform={`translate(${dx} ${dy})`}>
            <rect x={x} y="200" width="26" height="42" rx="4" className="sc-box" />
            <line x1={x + 6} y1="214" x2={x + 20} y2="214" className="sc-line" opacity="0.5" />
            <line x1={x + 6} y1="222" x2={x + 20} y2="222" className="sc-line" opacity="0.5" />
            <circle cx={x + 13} cy="233" r="2.4" className={`sc-led ${led}`} />
            {storm > 0.15 && Math.sin(t * 50 + i * 7) > 0.6 && (
              <g className="sc-spark" opacity={storm}>
                <line x1={x + 13} y1="196" x2={x + 4} y2="182" />
                <line x1={x + 13} y1="196" x2={x + 24} y2="184" />
                <line x1={x + 13} y1="196" x2={x + 13} y2="180" />
              </g>
            )}
          </g>
        )
      })}
      <line x1="40" y1="250" x2="360" y2="250" className="sc-base" />
      <Caption ok={t > 0.55} bad="5 servers unstable" good="all systems steady" />
    </g>
  )
}

/* 3. Traffic spike, absorbed: one strained server splits to carry a surge, then merges back. */
const traffic = (x: number) =>
  0.22 + 0.66 * Math.exp(-((x - 0.52) ** 2) / (2 * 0.075 ** 2)) + 0.03 * Math.sin(x * 47) + 0.02 * Math.sin(x * 113)
const THRESH = [-1, 0.36, 0.36, 0.58, 0.58]

export function Spike() {
  const t = useLoop(9500)
  const p = seg(t, 0.04, 0.88)
  const gx = (x: number) => 30 + x * 340, gy = (v: number) => 150 - v * 110
  const pts: string[] = []
  for (let i = 0; i <= 120 * p; i++) { const x = i / 120; pts.push(`${gx(x).toFixed(1)},${gy(traffic(x)).toFixed(1)}`) }
  const level = traffic(p)
  const vis = THRESH.map((th) => (th < 0 ? 1 : ease(clamp((level - th) / 0.05))))
  const total = vis.reduce((a, b) => a + b, 0)
  const load = level / total
  const strain = clamp((load - 0.3) / 0.25)
  const xs = vis.map((_, i) => 200 - (total * 44 - 10) / 2 + vis.slice(0, i).reduce((a, b) => a + b * 44, 0))
  return (
    <g opacity={loopFade(t)}>
      <defs>
        <linearGradient id="sc-area" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="var(--ember)" stopOpacity="0.25" />
          <stop offset="1" stopColor="var(--ember)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <line x1="30" y1="150" x2="370" y2="150" className="sc-base" opacity="0.5" />
      {pts.length > 1 && <polygon points={`${gx(0)},150 ${pts.join(' ')} ${gx(p)},150`} fill="url(#sc-area)" />}
      {pts.length > 1 && <polyline points={pts.join(' ')} className="sc-graph" />}
      <line x1={gx(p)} y1="34" x2={gx(p)} y2="150" className="sc-cursor" />
      <circle cx={gx(p)} cy={gy(level)} r="3.5" className="sc-pulse" />
      {vis.map((v, i) => {
        if (v < 0.02) return null
        const x = xs[i]
        const shake = Math.sin(t * 140 + i) * 2 * strain
        return (
          <g key={i} opacity={v} transform={`translate(${x + shake} 0)`}>
            <rect x="0" y="196" width={34 * v} height="44" rx="4" className={strain > 0.5 ? 'sc-box hot' : 'sc-box'} />
            <circle cx={17 * v} cy="230" r="2.4" className={`sc-led ${strain > 0.5 ? 'bad' : 'ok'}`} />
          </g>
        )
      })}
      <line x1="40" y1="250" x2="360" y2="250" className="sc-base" />
      <Caption ok={strain < 0.5} bad="traffic ×4 · server overloaded" good={`absorbed · ${Math.round(total)} instance${Math.round(total) > 1 ? 's' : ''} running`} />
    </g>
  )
}

/* 4. The migration: data streams along the horizon arc from an old store-room box into a clean cloud system. */
export function Migration() {
  const t = useLoop(9500)
  const curve = (u: number) => {
    const x0 = 132, y0 = 168, cx = 200, cy = 40, x1 = 268, y1 = 168
    return [(1 - u) ** 2 * x0 + 2 * (1 - u) * u * cx + u * u * x1, (1 - u) ** 2 * y0 + 2 * (1 - u) * u * cy + u * u * y1]
  }
  const old = 1 - 0.85 * ease(seg(t, 0.62, 0.8))
  const particles = Array.from({ length: 16 }, (_, i) => {
    const u = clamp((t - (0.14 + i * 0.03)) / 0.17)
    return u > 0 && u < 1 ? { i, u, p: curve(u) } : null
  }).filter(Boolean) as { i: number; u: number; p: number[] }[]
  return (
    <g opacity={loopFade(t)}>
      <path d="M132 168 Q200 40 268 168" className="sc-track" />
      <g opacity={old}>
        <rect x="58" y="168" width="78" height="74" rx="6" className="sc-box" />
        <path d="M68 184 L120 196 L74 206 L126 218 L70 228" className="sc-line" opacity="0.45" />
        <path d="M88 180 L82 234 M110 182 L118 236" className="sc-line" opacity="0.3" />
        <circle cx="124" cy="178" r="2.6" className={`sc-led ${Math.sin(t * 50) > 0 ? 'bad' : 'off'}`} />
      </g>
      {particles.map(({ i, u, p }) => (
        <circle key={i} cx={p[0]} cy={p[1]} r={2.6} className="sc-particle" style={{ fill: u < 0.5 ? 'var(--ember)' : 'var(--gold)' }} opacity={Math.sin(Math.PI * u)} />
      ))}
      {[0, 1, 2].map((k) => {
        const v = ease(seg(t, 0.32 + k * 0.12, 0.42 + k * 0.12))
        return (
          <g key={k} opacity={v} transform={`translate(0 ${(1 - v) * 8})`}>
            <rect x="264" y={168 + k * 26} width="80" height="20" rx="5" className="sc-box ok" />
            <circle cx="333" cy={178 + k * 26} r="2.4" className="sc-led ok" />
            <line x1="274" y1={178 + k * 26} x2={300 - k * 6} y2={178 + k * 26} className="sc-line" opacity="0.5" />
          </g>
        )
      })}
      <line x1="40" y1="250" x2="360" y2="250" className="sc-base" />
      <Caption ok={t > 0.7} bad="on-prem · one server, no tested backup" good="migrated · cloud, backed up daily" />
    </g>
  )
}

/* 5. Heartbeat: an erratic monitor line settles into a steady rhythm and comes to rest on the horizon. */
const beat = (x: number) => {
  if (x < 0.48) {
    const flat = x > 0.3 && x < 0.36
    if (flat) return 0
    return 0.25 * Math.sin(x * 61) * Math.sin(x * 17) + (Math.sin(x * 23) > 0.93 ? 0.9 * Math.sin(x * 300) : 0) + 0.1 * Math.sin(x * 140)
  }
  const ph = ((x - 0.48) / 0.105) % 1   // one heartbeat every ~10% of the width
  return 0.12 * Math.exp(-((ph - 0.18) ** 2) / 0.002) - 0.12 * Math.exp(-((ph - 0.36) ** 2) / 0.0004)
    + 0.85 * Math.exp(-((ph - 0.4) ** 2) / 0.0004) - 0.22 * Math.exp(-((ph - 0.44) ** 2) / 0.0004)
    + 0.18 * Math.exp(-((ph - 0.7) ** 2) / 0.004)
}

export function Heartbeat() {
  const t = useLoop(8500)
  const p = seg(t, 0.02, 0.9)
  const gx = (x: number) => 24 + x * 352, gy = (v: number) => 150 - v * 70
  const pts: string[] = []
  for (let i = 0; i <= 260 * p; i++) { const x = i / 260; pts.push(`${gx(x).toFixed(1)},${gy(beat(x)).toFixed(1)}`) }
  const ok = p > 0.5
  return (
    <g opacity={loopFade(t)}>
      <defs>
        <linearGradient id="sc-ecg" x1="24" y1="0" x2="376" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0.44" stopColor="var(--ember)" />
          <stop offset="0.56" stopColor="var(--gold)" />
        </linearGradient>
      </defs>
      {[0, 1, 2, 3].map((i) => <line key={i} x1="24" y1={80 + i * 46} x2="376" y2={80 + i * 46} className="sc-grid" />)}
      {pts.length > 1 && <polyline points={pts.join(' ')} className="sc-ecg" stroke="url(#sc-ecg)" />}
      <circle cx={gx(p)} cy={gy(beat(p))} r="4" className="sc-pulse" style={{ fill: ok ? 'var(--gold)' : 'var(--ember)' }} />
      <line x1="40" y1="250" x2="360" y2="250" className="sc-base" />
      <Caption ok={ok} bad="irregular · 3 incidents this week" good="steady · nothing to page anyone about" />
    </g>
  )
}
