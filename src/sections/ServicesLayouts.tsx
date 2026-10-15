// Services section layouts. "index" is the live one; "map" and "bento" come from the design connector's
// concepts (brand/web-concepts/services-concepts.png). The switch only shows on the local dev server.
import { useState } from 'react'
import { serviceExtras, services, systemNodes } from '../content'
import Arrow from './Arrow'
import VariantSwitch from './VariantSwitch'
import { useVariant } from './variant'

const LAYOUTS = [
  { id: 'index', label: 'A · Index list' },
  { id: 'map', label: 'B · Architecture map' },
  { id: 'bento', label: 'C · Bento' },
] as const
type Layout = (typeof LAYOUTS)[number]['id']
const IDS = LAYOUTS.map((l) => l.id)

export default function ServicesLayouts() {
  const [layout, setLayout] = useVariant<Layout>('services', IDS, 'index')
  return (
    <>
      <VariantSwitch label="Services layout" options={LAYOUTS} value={layout} onChange={setLayout} />
      {layout === 'index' && <IndexList />}
      {layout === 'map' && <ArchitectureMap />}
      {layout === 'bento' && <Bento />}
    </>
  )
}

function IndexList() {
  return (
    <ol className="svc">
      {services.map((s, i) => (
        <li key={s.title} className="layout-in" style={{ animationDelay: `${i * 50}ms` }}>
          <span className="svc-no">0{i + 1}</span>
          <h3>
            {s.title}
            {s.focus && <span className="svc-focus">Primary focus</span>}
          </h3>
          <div className="svc-text">
            <p>{s.body}</p>
            <ul className="svc-tags">{s.tags.map((t) => <li key={t}>{t}</li>)}</ul>
          </div>
          <span className="svc-go" aria-hidden="true"><Arrow /></span>
        </li>
      ))}
    </ol>
  )
}

/* B. Architecture map: a simple system diagram; each service is a callout pinned to the part it owns. */
function ArchitectureMap() {
  const [hot, setHot] = useState<string | null>(null)
  const col = (node: string) => systemNodes.findIndex((n) => n.id === node)
  const items = services.map((s, i) => ({ ...s, ...serviceExtras[i], col: col(serviceExtras[i].node) }))
  const callout = (it: (typeof items)[number], where: 'top' | 'bottom') => (
    <div
      key={it.title}
      className={`smap-call ${where} ${hot === it.node ? 'hot' : ''}`}
      style={{ gridColumn: it.col + 1 }}
      onMouseEnter={() => setHot(it.node)}
      onMouseLeave={() => setHot(null)}
    >
      <h3>{it.title}</h3>
      <p>{it.line}</p>
    </div>
  )
  return (
    <div className="smap layout-in">
      <div className="smap-row">{items.filter((it) => it.col % 2 === 0).map((it) => callout(it, 'top'))}</div>
      <div className="smap-bracket"><span>Secure by design</span></div>
      <div className="smap-nodes">
        {systemNodes.map((n) => (
          <div key={n.id} className={`smap-node ${hot === n.id ? 'hot' : ''}`}><span>{n.label}</span></div>
        ))}
      </div>
      <div className="smap-row">{items.filter((it) => it.col % 2 === 1).map((it) => callout(it, 'bottom'))}</div>
      {/* small screens: the same content as a list, each service tagged with its part of the system */}
      <ul className="smap-list">
        {items.map((it) => (
          <li key={it.title}>
            <span>{systemNodes[it.col].label}</span>
            <h3>{it.title}</h3>
            <p>{it.body}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

/* C. Bento: one large feature tile for the primary specialism, smaller typographic tiles for the rest. */
function Bento() {
  const [feat, ...rest] = services.map((s, i) => ({ ...s, ...serviceExtras[i] }))
  const area = ['sw', 'infra', 'mig', 'dev', 'cons']
  return (
    <div className="bento layout-in">
      <article className="bento-tile feat">
        <p className="bento-kicker">{feat.mark}</p>
        <h3>{feat.title}</h3>
        <span className="bento-rule" />
        <p className="bento-body">{feat.body}</p>
        <svg className="bento-sketch" viewBox="0 0 320 120" aria-hidden="true">
          {[['Edge', 0], ['App', 112], ['Data', 224]].map(([t, x]) => (
            <g key={t as string}>
              <rect x={x as number} y="10" width="96" height="34" rx="3" />
              <text x={(x as number) + 48} y="31">{t as string}</text>
            </g>
          ))}
          <rect x="112" y="78" width="96" height="34" rx="3" />
          <text x="160" y="99">Secrets</text>
          <path d="M96 27 H112 M208 27 H224 M160 44 V78" className="bento-wire" />
          {[[104, 27], [216, 27], [160, 61]].map(([x, y]) => <circle key={`${x}${y}`} cx={x} cy={y} r="3" className="bento-dot" />)}
        </svg>
      </article>
      {rest.map((s, i) => (
        <article key={s.title} className={`bento-tile ${area[i]}`}>
          <h3>{s.title}</h3>
          <p className={`bento-mark ${area[i] === 'dev' ? 'mono' : ''}`}>{s.mark}</p>
          <p className="bento-tags">{s.tags.slice(0, 3).join(' / ')}</p>
        </article>
      ))}
    </div>
  )
}
