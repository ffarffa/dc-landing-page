// Use-cases section layouts. "tabs" is the live one; "split", "stack" and "scroller" come from the design
// connector's concepts (brand/web-concepts/use-cases-concepts.png). The switch only shows on the local dev server.
import { useEffect, useRef, useState } from 'react'
import { caseExtras, useCases } from '../content'
import Arrow from './Arrow'
import VariantSwitch from './VariantSwitch'
import { useVariant } from './variant'

const LAYOUTS = [
  { id: 'tabs', label: 'Current · Tabs' },
  { id: 'split', label: 'A · Before / after' },
  { id: 'stack', label: 'B · Case files' },
  { id: 'scroller', label: 'C · Scroller' },
] as const
type Layout = (typeof LAYOUTS)[number]['id']
const IDS = LAYOUTS.map((l) => l.id)
const CASES = useCases.map((c, i) => ({ ...c, ...caseExtras[i] }))
type Case = (typeof CASES)[number]

export default function UseCaseLayouts() {
  const [layout, setLayout] = useVariant<Layout>('usecases', IDS, 'tabs')
  return (
    <>
      <VariantSwitch label="Use-cases layout" options={LAYOUTS} value={layout} onChange={setLayout} />
      {layout === 'tabs' && <Tabs />}
      {layout === 'split' && <Split />}
      {layout === 'stack' && <Stack />}
      {layout === 'scroller' && <Scroller />}
    </>
  )
}

function Tabs() {
  const [active, setActive] = useState(0)
  const u = CASES[active]
  return (
    <div className="uc layout-in">
      <div className="uc-list" role="tablist" aria-label="Use cases">
        {CASES.map((c, i) => (
          <button key={c.title} role="tab" id={`uc-tab-${i}`} aria-selected={i === active} aria-controls="uc-panel"
            className={i === active ? 'on' : ''} onClick={() => setActive(i)}>
            <span className="uc-sector">{c.sector}</span>
            <span className="uc-title">{c.title}</span>
          </button>
        ))}
      </div>
      <div className="uc-panel" id="uc-panel" role="tabpanel" aria-labelledby={`uc-tab-${active}`} key={active}>
        <p className="mono-label">{u.sector}</p>
        <h3>{u.title}</h3>
        <dl>
          <div><dt>The problem</dt><dd>{u.problem}</dd></div>
          <div><dt>What we do</dt><dd>{u.approach}</dd></div>
          <div className="res"><dt>What you get</dt><dd>{u.result}</dd></div>
        </dl>
        <a className="btn" href="#contact">This sounds like us <Arrow /></a>
      </div>
    </div>
  )
}

/* A. Before / after: one case at a time, the messy system on the left, the fixed one on the right. */
// Mono label sized to fit a box: uppercase mono glyphs are ~0.62em wide, plus letter-spacing.
const fit = (label: string, box: number) => ({ fontSize: Math.min(9.5, (box - 12) / (label.length * 0.67)) })
function MessyDiagram({ nodes }: { nodes: readonly string[] }) {
  const pos = [[8, 14], [178, 4], [36, 104], [196, 118]]
  return (
    <svg viewBox="0 0 330 170" className="ucs-diagram before" aria-hidden="true">
      <path d="M58 48 V80 H230 V40 M120 30 H178 M86 118 H150 V66 H250 V118 M246 152 H140 V120 M60 104 V88 H210 V140" className="ucs-wire" />
      {nodes.map((n, i) => (
        <g key={n}>
          <rect x={pos[i][0]} y={pos[i][1]} width="112" height="34" rx="3" />
          <text x={pos[i][0] + 56} y={pos[i][1] + 21} style={fit(n, 112)}>{n}</text>
        </g>
      ))}
      <text x="292" y="96" className="ucs-x">×</text>
      <text x="16" y="164" className="ucs-x">×</text>
    </svg>
  )
}
function CleanDiagram({ nodes }: { nodes: readonly string[] }) {
  const xs = [0, 116, 232]
  return (
    <svg viewBox="0 0 330 170" className="ucs-diagram after" aria-hidden="true">
      {xs.map((x, i) => (
        <g key={nodes[i]}>
          <rect x={x} y="30" width="98" height="38" rx="3" />
          <text x={x + 49} y="53" style={fit(nodes[i], 98)}>{nodes[i]}</text>
        </g>
      ))}
      <rect x="116" y="118" width="98" height="38" rx="3" />
      <text x="165" y="141" style={fit(nodes[3], 98)}>{nodes[3]}</text>
      <path d="M98 49 H116 M214 49 H232 M165 68 V118" className="ucs-wire" />
      {[[107, 49], [223, 49], [165, 93]].map(([x, y]) => <circle key={`${x}${y}`} cx={x} cy={y} r="3.2" className="ucs-dot" />)}
    </svg>
  )
}
function Split() {
  const [i, setI] = useState(0)
  const c = CASES[i]
  return (
    <div className="ucs layout-in">
      <div className="ucs-panel" key={i}>
        <div className="ucs-half before">
          <p className="ucs-label">Before</p>
          <h3>{c.before.title}</h3>
          <p className="ucs-line">{c.before.line}</p>
          <MessyDiagram nodes={c.before.nodes} />
        </div>
        <div className="ucs-divide" aria-hidden="true"><i /></div>
        <div className="ucs-half after">
          <p className="ucs-label">After</p>
          <h3>{c.after.title}</h3>
          <p className="ucs-line">{c.after.line}</p>
          <CleanDiagram nodes={c.after.nodes} />
          <p className="ucs-outcome">{c.outcome}</p>
        </div>
      </div>
      <div className="ucs-pick" role="tablist" aria-label="Choose a challenge">
        {CASES.map((x, j) => (
          <button key={x.title} role="tab" aria-selected={i === j} className={i === j ? 'on' : ''} onClick={() => setI(j)}>{x.short}</button>
        ))}
      </div>
    </div>
  )
}

/* B. Case files: the cases stacked like folders; click a tab behind to bring it to the front. */
function Stack() {
  const [i, setI] = useState(1)
  const c = CASES[i]
  const behind = CASES.map((x, j) => ({ x, j })).filter(({ j }) => j !== i).reverse()
  return (
    <div className="ucf layout-in">
      <div className="ucf-tabs">
        {behind.map(({ x, j }, k) => (
          <button key={x.title} onClick={() => setI(j)} style={{ marginLeft: `${(behind.length - k) * 3}%`, marginRight: `${(behind.length - k) * 1.5}%` }}>
            <span>{x.title}</span><span className="ucf-id">DC-0{j + 1}</span>
          </button>
        ))}
      </div>
      <article className="ucf-card" key={i}>
        <p className="ucf-kicker">Case file · {c.sector}</p>
        <h3>{c.title}</h3>
        <span className="ucf-rule" />
        <dl className="ucf-meta">
          <div><dt>Sector</dt><dd>{c.sector}</dd></div>
          <div><dt>Stack</dt><dd>{c.stack}</dd></div>
          <div><dt>Engagement</dt><dd>{c.engagement}</dd></div>
        </dl>
        <div className="ucf-cols">
          {[['Problem', c.heads[0], c.problem], ['Approach', c.heads[1], c.approach], ['Outcome', c.heads[2], c.result]].map(([k, h, b]) => (
            <div key={k} className={k === 'Outcome' ? 'out' : ''}>
              <p className="ucf-col-k">{k}</p>
              <h4>{h}</h4>
              <p>{b}</p>
            </div>
          ))}
        </div>
        <div className="ucf-foot">
          <span>{c.engagement}</span>
          <a href="#contact">Talk about a case like this <Arrow /></a>
        </div>
      </article>
    </div>
  )
}

/* C. Scroller: tall cards on a horizon line, the problem as a quote and the outcome in ember. */
function Scroller() {
  const ref = useRef<HTMLDivElement>(null)
  const [bar, setBar] = useState({ w: 0.3, x: 0 })
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const on = () => {
      const w = el.clientWidth / el.scrollWidth
      setBar({ w, x: (el.scrollLeft / Math.max(1, el.scrollWidth - el.clientWidth)) * (1 - w) })
    }
    on(); el.addEventListener('scroll', on, { passive: true }); window.addEventListener('resize', on)
    return () => { el.removeEventListener('scroll', on); window.removeEventListener('resize', on) }
  }, [])
  const go = (dir: number) => ref.current?.scrollBy({ left: dir * 300, behavior: 'smooth' })
  return (
    <div className="ucr layout-in">
      <div className="ucr-controls">
        <span>Drag to explore</span>
        <button onClick={() => go(-1)} aria-label="Previous"><Arrow /></button>
        <button onClick={() => go(1)} aria-label="Next"><Arrow /></button>
      </div>
      <div className="ucr-strip" ref={ref}>
        {CASES.map((c: Case, j) => (
          <article key={c.title} className="ucr-card">
            <p className="ucr-no">0{j + 1}</p>
            <p className="ucr-sector">{c.sector}</p>
            <blockquote>“{c.quote}”</blockquote>
            <div className="ucr-out">
              <p>The outcome</p>
              <p>{c.outcome}</p>
            </div>
          </article>
        ))}
      </div>
      <div className="ucr-track" aria-hidden="true"><i style={{ width: `${bar.w * 100}%`, left: `${bar.x * 100}%` }} /></div>
      <p className="ucr-help">Six common challenges. Six practical ways forward.</p>
    </div>
  )
}
