// Endless production log for the hero terminal. Incidents are drawn from a shuffled deck so the same one never
// plays twice in a row, and every number is rolled fresh, so the log keeps telling a new story. Each line carries
// `ms`, the pause before the next one: short while things escalate, long once they are resolved.
export type LogKind = 'info' | 'rps' | 'warn' | 'act' | 'safe' | 'done'
export type LogLine = { t: string; k: LogKind; s: string; ms: number; rps?: number }
type Step = Omit<LogLine, 't'> & { dt?: number } // dt: seconds this step moves the clock (default 1)

const int = (a: number, b: number) => Math.floor(a + Math.random() * (b - a + 1))
const pick = <T,>(xs: readonly T[]) => xs[Math.floor(Math.random() * xs.length)]
const n = (x: number) => x.toLocaleString('en-US')
const k = (x: number) => (x >= 1000 ? `${Math.round(x / 1000)}k` : `${x}`)
const pad = (s: string, w: number) => s.padStart(w)

// Shared state between incidents: the request rate carries over, so a calm stretch follows a surge believably.
type Ctx = { rps: number }
const rps = (c: Ctx, r: number, p99 = int(38, 49), ms = 300): Step => {
  c.rps = r
  return { k: 'rps', s: `rps ${pad(n(r), 9)}   p99 ${pad(`${p99}ms`, 5)}`, ms, rps: r }
}
const S = (k: LogKind, s: string, ms = 420, dt = 1): Step => ({ k, s, ms, dt })
const zones = ['zone-a', 'zone-b', 'zone-c']
const svc = ['api', 'checkout', 'search', 'auth', 'orders', 'billing']
const regions = ['asia', 'europe', 'us-east']

// Ramp the rate from where it is to `to` over `steps` lines, each a little faster than the last.
function climb(c: Ctx, to: number, steps: number, startMs = 520): Step[] {
  const from = c.rps
  return Array.from({ length: steps }, (_, i) => {
    const r = Math.round(from + ((to - from) * (i + 1)) / steps + int(-400, 400))
    return rps(c, Math.max(800, r), i === steps - 2 ? int(58, 74) : int(39, 48), Math.max(170, startMs - i * 90))
  })
}

const incidents: ((c: Ctx) => Step[])[] = [
  // flash sale
  (c) => {
    const peak = int(90, 160) * 1000, from = int(4, 8), to = from * int(3, 5)
    return [
      S('info', `flash sale opens in ${int(2, 5)}s`, 900),
      S('info', 'sale is LIVE', 600),
      ...climb(c, Math.round(peak * 0.4), 3),
      S('warn', `WARN  cpu ${int(88, 97)}% · queue ${int(12, 31)}k`, 280),
      S('act', `scale  api   ${from} → ${to} pods`, 240),
      S('act', `scale  db    +${int(2, 4)} read replicas`, 240),
      ...climb(c, peak, 3, 260),
      S('info', `cache  hit ratio ${int(95, 99)}.${int(0, 9)}%`, 380),
      S('info', `orders ${n(int(22, 61) * 1000 + int(0, 999))} / min`, 600, 3),
      S('done', `✓ ${k(peak)} req/s held. nobody paged.`, 5200, 4),
    ]
  },
  // bot flood
  (c) => {
    const bad = int(140, 980) * 1000 + int(0, 999)
    return [
      S('warn', `ALERT anomaly · ${int(3, 9)} networks`, 300),
      rps(c, c.rps + int(30, 80) * 1000, int(55, 70), 260),
      S('warn', `ALERT ${int(11, 48)}k req/s · bots`, 260),
      S('act', 'waf    challenge + rate limit', 260),
      S('act', `block  ${n(bad)} bad requests`, 320),
      rps(c, Math.max(9000, c.rps - int(30, 70) * 1000), int(40, 46), 340),
      S('safe', 'THREAT AVERTED · 0 buyers hit', 900),
      S('done', '✓ flood dropped at the edge.', 5200, 3),
    ]
  },
  // credential stuffing
  (c) => [
    S('warn', `ALERT login failures ×${int(14, 60)}`, 300),
    S('warn', `ALERT stuffing · ${n(int(4, 12) * 1000)} tries/s`, 260),
    S('act', 'auth   step-up challenge on', 260),
    S('act', `block  ${int(200, 900)} ip ranges`, 280),
    S('act', `lock   ${int(3, 40)} accounts, owners told`, 320),
    rps(c, c.rps, int(40, 45), 340),
    S('safe', 'THREAT AVERTED · 0 breached', 900),
    S('done', '✓ attack absorbed, logins normal.', 5200, 3),
  ],
  // database primary fails
  (c) => {
    const secs = int(4, 9)
    return [
      S('warn', 'WARN  db-primary heartbeat lost', 320),
      S('warn', `WARN  ${int(120, 900)} writes waiting`, 280),
      S('act', 'fence  db-primary isolated', 300),
      S('act', 'promote replica-2 → primary', 380, secs),
      S('act', 'pool   reconnect 2,048 conns', 300),
      rps(c, c.rps, int(41, 48), 320),
      S('safe', `RECOVERED in ${secs}s · 0 writes lost`, 900),
      S('done', '✓ failover done. users saw nothing.', 5200, 3),
    ]
  },
  // zone outage
  (c) => {
    const z = pick(zones), other = zones.filter((x) => x !== z)
    return [
      S('warn', `WARN  ${z} packet loss ${int(18, 64)}%`, 300),
      S('warn', `ALERT ${z} unreachable`, 280),
      S('act', `drain  ${z} → ${other[0]}, ${other[1]}`, 300),
      S('act', `scale  api   +${int(6, 18)} pods elsewhere`, 300),
      rps(c, c.rps + int(-2, 2) * 1000, int(44, 52), 320),
      S('safe', `RECOVERED · ${z} out, 0 errors`, 900),
      S('done', `✓ lost a zone. kept ${k(c.rps)} req/s.`, 5200, 4),
    ]
  },
  // cache stampede
  (c) => [
    S('warn', `WARN  cache miss storm · ${int(40, 90)}%`, 280),
    S('warn', `WARN  db reads ×${int(9, 30)} in ${int(2, 6)}s`, 260),
    S('act', 'cache  coalesce identical reads', 280),
    S('act', 'cache  serve stale, refresh', 300),
    S('info', `cache  hit ratio back to ${int(95, 99)}%`, 320),
    rps(c, c.rps, int(39, 45), 340),
    S('done', '✓ stampede tamed. db breathing.', 5200, 3),
  ],
  // bad release under load
  (c) => {
    const v = `v${int(3, 9)}.${int(0, 40)}.${int(0, 9)}`
    return [
      S('info', `deploy ${v} · canary 5%`, 520),
      S('warn', `WARN  canary errors ${int(2, 9)}.${int(0, 9)}%`, 300),
      S('warn', `WARN  canary p99 ${int(240, 900)}ms`, 280),
      S('act', `halt   ${v} rollout`, 280),
      S('act', `undo   back to last good build`, 360, int(8, 20)),
      rps(c, c.rps, int(40, 45), 320),
      S('safe', 'RECOVERED · 95% never saw it', 900),
      S('done', '✓ bad build caught at the canary.', 5200, 3),
    ]
  },
  // payment provider slows down
  (c) => [
    S('warn', `WARN  payments p99 ${n(int(3, 9) * 1000 + int(0, 999))}ms`, 300),
    S('warn', `WARN  checkout queue ${int(2, 9)}k`, 280),
    S('act', 'break  payments circuit open', 280),
    S('act', 'queue  charges held, retry 30s', 320, 30),
    S('info', 'break  provider back · closing', 320),
    S('act', `drain  ${n(int(1, 6) * 1000 + int(0, 999))} charges settled`, 320),
    rps(c, c.rps, int(41, 47), 340),
    S('done', '✓ 0 orders lost while it wobbled.', 5200, 3),
  ],
  // injection attempt
  (c) => [
    S('warn', `ALERT sqli probe on /${pick(['search', 'login', 'orders', 'export'])}`, 300),
    S('warn', `ALERT ${int(300, 4000)} payloads in ${int(10, 60)}s`, 260),
    S('act', 'waf    signature match · deny', 280),
    S('act', `block  source asn for ${int(6, 48)}h`, 300),
    S('info', 'audit  queries parameterised ✓', 340),
    rps(c, c.rps, int(39, 44), 340),
    S('safe', 'THREAT AVERTED · 0 rows exposed', 900),
    S('done', '✓ probe bounced. data untouched.', 5200, 3),
  ],
  // leaked token used from elsewhere
  () => [
    S('warn', `ALERT token reuse · ${pick(regions)}`, 300),
    S('warn', 'ALERT 1 session, 2 continents', 280),
    S('act', 'auth   revoke session + refresh', 280),
    S('act', 'auth   force re-login, mfa', 300),
    S('info', 'audit  0 actions by intruder', 340),
    S('safe', 'THREAT AVERTED · session killed', 900),
    S('done', '✓ hijack stopped in under 1s.', 5200, 3),
  ],
  // memory leak
  (c) => {
    const s = pick(svc)
    return [
      S('warn', `WARN  ${s} mem ${int(82, 94)}% rising`, 320),
      S('warn', `WARN  ${s} gc pauses ${int(180, 600)}ms`, 280),
      S('act', `cycle  ${s} pods one by one`, 340, int(20, 40)),
      S('act', `trace  heap snapshot → ticket`, 320),
      rps(c, c.rps, int(40, 46), 340),
      S('done', `✓ ${s} steady. fix queued for day.`, 5200, 3),
    ]
  },
  // scraper
  (c) => [
    S('warn', `WARN  1 client · ${n(int(2, 9) * 1000)} req/min`, 300),
    S('warn', 'WARN  crawling every /price', 280),
    S('act', 'limit  429 after 120 req/min', 280),
    S('act', 'tarpit scraper, slow lane', 320),
    rps(c, Math.max(9000, c.rps - int(2, 9) * 1000), int(39, 44), 340),
    S('safe', 'THREAT AVERTED · prices safe', 900),
    S('done', '✓ scraper parked. buyers fast.', 5200, 3),
  ],
  // midnight batch
  (c) => {
    const rows = int(2, 9) * 1_000_000 + int(0, 999_999)
    return [
      S('info', `batch  month-end ${n(rows)} rows`, 520),
      S('info', `batch  ${int(18, 40)}% · ${int(60, 140)}k rows/s`, 420, 15),
      S('warn', `WARN  replica lag ${int(4, 12)}s`, 300),
      S('act', 'batch  throttled for reads', 320),
      S('info', 'batch  100% · totals reconciled', 420, 40),
      rps(c, c.rps, int(39, 44), 340),
      S('done', '✓ month closed. site never slowed.', 5200, 3),
    ]
  },
]

// Quiet stretch between incidents: the rate drifts, a routine line or two goes by.
function calm(c: Ctx): Step[] {
  const base = int(9, 24) * 1000
  const routine = [
    `backup verified · ${int(40, 300)} GB`,
    `certs  auto-renewed · ${int(60, 89)} days`,
    `health ${int(48, 120)} checks passing`,
    `patch  ${int(2, 14)} nodes, rolling`,
    `logs   rotated · ${int(2, 40)} GB freed`,
    `scale  api   ${int(14, 30)} → ${int(6, 10)} pods`,
  ]
  return [
    rps(c, base + int(0, 999), int(36, 42), 1100),
    S('info', pick(routine), 1300, int(20, 90)),
    rps(c, base + int(-600, 900), int(36, 42), 1100),
  ]
}

// Rhythm, so a busy incident never turns into a wall of text:
//   fast  - a burst of the same kind of line (alarms piling up, actions firing, the rate climbing)
//   pause - a held beat where the story turns: trouble first spotted, the response starting, the outcome landing
//   slow  - the quiet lines between incidents and once things settle
const jitter = (ms: number) => Math.round(ms * (0.85 + Math.random() * 0.3))
function pace(s: Step, next?: Step): number {
  if (s.k === 'done') return jitter(7000)
  if (s.k === 'safe') return jitter(2400)
  if (!next) return jitter(1500)
  if (s.k === 'warn' && next.k === 'act') return jitter(1500) // spotted it... now respond
  if ((s.k === 'act' || s.k === 'warn') && next.k !== s.k && next.k !== 'act') return jitter(1200) // let the result land
  if (next.k === 'warn' && s.k !== 'warn') return jitter(1300) // calm before the alarm
  if (s.k === next.k) return jitter(Math.min(s.ms, 360)) // burst
  return jitter(Math.max(s.ms, 650))
}

const clock = (sec: number) => {
  const d = ((sec % 86400) + 86400) % 86400
  return [Math.floor(d / 3600), Math.floor(d / 60) % 60, d % 60].map((x) => String(x).padStart(2, '0')).join(':')
}

// The stream itself. The first incident is always the flash sale, the opening the site launched with.
export function* surgeLog(): Generator<LogLine> {
  const c: Ctx = { rps: int(6, 12) * 1000 }
  let sec = 20 * 3600 - 2 // 19:59:58
  let deck: number[] = []
  let last = 0
  let first = true
  for (;;) {
    let i = 0
    if (!first) {
      if (!deck.length) deck = incidents.map((_, j) => j).sort(() => Math.random() - 0.5)
      i = deck.pop()!
      if (i === last && deck.length) {
        const j = deck.pop()!
        deck.unshift(i)
        i = j
      }
      for (const s of calm(c)) { sec += s.dt ?? 1; yield { k: s.k, s: s.s, ms: jitter(1700), rps: s.rps, t: clock(sec) } }
      sec += int(60, 900)
    }
    first = false
    last = i
    const steps = incidents[i](c)
    for (const [j, s] of steps.entries()) {
      sec += s.dt ?? 1
      yield { k: s.k, s: s.s, ms: pace(s, steps[j + 1]), rps: s.rps, t: s.k === 'done' ? '' : clock(sec) }
    }
  }
}
