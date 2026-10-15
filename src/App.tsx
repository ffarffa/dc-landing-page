import { useEffect, useState, type ReactNode } from 'react'
import HeroVisual from './hero/HeroVisual.tsx'
import Arrow from './sections/Arrow.tsx'
import ServicesLayouts from './sections/ServicesLayouts.tsx'
import UseCaseLayouts from './sections/UseCaseLayouts.tsx'
import { CONTACT_EMAIL, LEGAL_NAME, SSM_NO, audiences, principles, stack } from './content'

const year = new Date().getFullYear()
const mailto = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent('Project enquiry')}`

// Adds .in to every [data-reveal] element once it scrolls into view.
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>('[data-reveal]')
    if (!('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('in'))
      return
    }
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('in')
          io.unobserve(e.target)
        }
      }),
      { rootMargin: '0px 0px -10% 0px' },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
}

export default function App() {
  useReveal()
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Stack />
        <Audiences />
        <Services />
        <UseCases />
        <Principles />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

// Monument Classic (brand/logo-v2/round4/11a-monument-classic_*.svg). Both files are outlined vectors built from that
// master: the stacked Monument for the footer, and a horizontal version of the same symbol and caps for the nav.
function Logo({ stacked = false }: { stacked?: boolean }) {
  return (
    <a href="#top" className={`logo ${stacked ? 'logo-stacked' : ''}`}>
      {stacked
        ? <img src="/logo-monument.svg" alt="Destiny Cloud" width="633" height="213" />
        : <img src="/logo-nav.svg" alt="Destiny Cloud" width="948" height="60" />}
    </a>
  )
}

function Nav() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 12)
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])
  return (
    <header className={`nav ${scrolled ? 'scrolled' : ''}`}>
      <div className="wrap nav-inner">
        <Logo />
        <nav aria-label="Main">
          <a href="#services">Services</a>
          <a href="#use-cases">Use cases</a>
        </nav>
        <a className="btn btn-small" href="#contact">Talk to us</a>
      </div>
    </header>
  )
}

// Hero log: a flash-sale surge hitting production. Lines stream in faster as traffic climbs, the window keeps the
// newest ones, and the bar shows the live request rate. `ms` is the pause before the next line.
type LogLine = { t: string; k: 'info' | 'rps' | 'warn' | 'act' | 'safe' | 'done'; s: string; ms: number; rps?: number }
const surgeLog: LogLine[] = [
  { t: '19:59:58', k: 'info', s: 'flash sale opens in 2s', ms: 900 },
  { t: '20:00:00', k: 'info', s: 'sale is LIVE', ms: 700 },
  { t: '20:00:01', k: 'rps', s: 'rps     1,204   p99  38ms', ms: 520, rps: 1204 },
  { t: '20:00:02', k: 'rps', s: 'rps     9,870   p99  41ms', ms: 420, rps: 9870 },
  { t: '20:00:03', k: 'rps', s: 'rps    31,442   p99  63ms', ms: 340, rps: 31442 },
  { t: '20:00:03', k: 'warn', s: 'WARN  cpu 91% · queue 18k', ms: 300 },
  { t: '20:00:03', k: 'act', s: 'scale  api   6 → 24 pods', ms: 260 },
  { t: '20:00:04', k: 'act', s: 'scale  db    +2 read replicas', ms: 240 },
  { t: '20:00:04', k: 'rps', s: 'rps    52,915   p99  44ms', ms: 220, rps: 52915 },
  { t: '20:00:05', k: 'info', s: 'pool   2,048 conns · 0 waiting', ms: 200 },
  { t: '20:00:05', k: 'rps', s: 'rps    71,388   p99  45ms', ms: 180, rps: 71388 },
  { t: '20:00:06', k: 'info', s: 'cache  hit ratio 97.3%', ms: 170 },
  { t: '20:00:06', k: 'rps', s: 'rps    96,020   p99  46ms', ms: 170, rps: 96020 },
  { t: '20:00:07', k: 'warn', s: 'WARN  zone-a saturating', ms: 200 },
  { t: '20:00:07', k: 'act', s: 'route  40% → zone-b', ms: 240 },
  { t: '20:00:08', k: 'rps', s: 'rps   124,617   p99  47ms', ms: 320, rps: 124617 },
  { t: '20:00:09', k: 'warn', s: 'ALERT bot flood · 3 networks', ms: 260 },
  { t: '20:00:09', k: 'warn', s: 'ALERT login stuffing · 9k/s', ms: 240 },
  { t: '20:00:09', k: 'act', s: 'waf    challenge + rate limit', ms: 240 },
  { t: '20:00:10', k: 'act', s: 'block  212,480 bad requests', ms: 320 },
  { t: '20:00:10', k: 'safe', s: 'THREAT AVERTED · 0 buyers hit', ms: 700 },
  { t: '20:00:11', k: 'info', s: 'orders 38,190 / min', ms: 420 },
  { t: '20:00:12', k: 'rps', s: 'rps   126,301   p99  46ms', ms: 520, rps: 126301 },
  { t: '20:00:14', k: 'info', s: 'errors 0 · dropped 0', ms: 900 },
  { t: '', k: 'done', s: '✓ 126k req/s held. attack shrugged off.', ms: 12000 },
]
const LOG_ROWS = 12

function Terminal() {
  const reduce = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const [n, setN] = useState(reduce ? surgeLog.length : 0)
  useEffect(() => {
    if (reduce) return
    const id = window.setTimeout(() => setN((v) => (v >= surgeLog.length ? 0 : v + 1)), n === 0 ? 600 : surgeLog[n - 1].ms)
    return () => window.clearTimeout(id)
  }, [n, reduce])
  const shown = surgeLog.slice(0, n)
  const rps = [...shown].reverse().find((l) => l.rps)?.rps ?? 0
  const hot = rps > 50000
  return (
    <div className="term surge" aria-hidden="true">
      <div className="term-bar">
        <i /><i /><i />
        <span>prod · live traffic</span>
        <b className={`term-rps ${hot ? 'hot' : ''}`}><em />{rps.toLocaleString('en-US')} req/s</b>
      </div>
      <pre>
        {shown.slice(-LOG_ROWS).map((l, i, a) => (
          <span key={n - a.length + i} className={`ln ${l.k}`}>
            {l.t && <small>{l.t} </small>}{l.s}{'\n'}
          </span>
        ))}
        <span className="caret">▍</span>
      </pre>
    </div>
  )
}

// Stars for the dark sky above the horizon: seeded so they sit in the same place on every load.
const starField = (() => {
  let seed = 7
  const rnd = () => ((seed = (seed * 16807) % 2147483647) - 1) / 2147483646
  const out: { x: number; y: number; r: number; o: number; d: number; delay: number }[] = []
  while (out.length < 90) {
    const x = rnd() * 1200, y = rnd() * 560
    // keep the glow above the horizon clear: skip the band just over the planet's edge
    if (y > 380 && Math.abs(x - 600) < 520 - (560 - y) * 0.6) continue
    const big = rnd() > 0.88
    out.push({ x, y, r: big ? 1.3 + rnd() * 0.6 : 0.5 + rnd() * 0.6, o: 0.25 + rnd() * 0.6, d: 3 + rnd() * 6, delay: rnd() * 9 })
  }
  return out
})()

function Hero() {
  return (
    <section className="hero" id="top">
      <div className="sky" aria-hidden="true">
        <div className="stars" />
        <svg className="orbits" viewBox="0 0 1200 700" preserveAspectRatio="xMidYMid slice">
          <ellipse cx="600" cy="760" rx="700" ry="330" />
          <ellipse cx="600" cy="760" rx="880" ry="440" />
          <ellipse cx="600" cy="760" rx="1080" ry="560" />
          {starField.map((st, i) => (
            <circle key={i} className="star" cx={st.x} cy={st.y} r={st.r}
              style={{ opacity: st.o, animationDuration: `${st.d}s`, animationDelay: `-${st.delay}s` }} />
          ))}
          {/* three planets: different orbits, speeds, directions and starting points so they never line up */}
          <circle className="sat" r="4" cx="0" cy="0">
            <animateMotion dur="38s" repeatCount="indefinite" path="M -100 760 A 700 330 0 0 1 1300 760" />
          </circle>
          <circle className="sat sat-ember" r="2.6" cx="0" cy="0">
            <animateMotion dur="57s" begin="-21s" repeatCount="indefinite" path="M 1480 760 A 880 440 0 0 0 -280 760" />
          </circle>
          <g className="sat-pale">
            <circle r="6" cx="0" cy="0" />
            <ellipse rx="11" ry="2.6" cx="0" cy="0" transform="rotate(-18)" />
            <animateMotion dur="83s" begin="-58s" repeatCount="indefinite" path="M -480 760 A 1080 560 0 0 1 1680 760" />
          </g>
        </svg>
        <div className="horizon" />
      </div>
      <div className="wrap hero-grid">
        <div className="hero-copy">
          <p className="eyebrow" data-reveal>Architecture · Software · Cloud · DevOps</p>
          <h1 data-reveal>
            Infrastructure that <em>holds its course.</em>
          </h1>
          <p className="lede" data-reveal>
            Destiny Cloud is a software engineering and cloud architecture consultancy. We design, build and
            improve secure, scalable enterprise software, from the first architecture diagram to production.
          </p>
          <div className="cta-row" data-reveal>
            <a className="btn" href="#contact">Start a project <Arrow /></a>
            <a className="btn btn-ghost" href="#use-cases">See use cases</a>
          </div>
        </div>
        <div className="hero-visual" data-reveal>
          <HeroVisual terminal={<Terminal />} />
        </div>
      </div>
    </section>
  )
}

function Stack() {
  const row = [...stack, ...stack]
  return (
    <section className="stack" aria-label="Technologies we work with">
      <p className="wrap mono-label">Technologies we run in production</p>
      <div className="marquee">
        <div className="track">
          {row.map((s, i) => (
            <span key={i} aria-hidden={i >= stack.length}>{s}</span>
          ))}
        </div>
      </div>
    </section>
  )
}

function SectionHead({ num, kicker, title, children }: { num: string; kicker: string; title: ReactNode; children?: ReactNode }) {
  return (
    <div className="section-head" data-reveal>
      <p className="mono-label"><span className="num">{num}</span> {kicker}</p>
      <h2>{title}</h2>
      {children && <p className="section-sub">{children}</p>}
    </div>
  )
}

function Audiences() {
  return (
    <section className="section" id="who">
      <div className="wrap">
        <SectionHead num="01" kicker="Who we help" title={<>A technical partner for teams that <em>build on software.</em></>}>
          For when you need experienced engineers to design, build or improve a system, without hiring a whole team for it.
        </SectionHead>
        <div className="who">
          {audiences.map((a, i) => (
            <article key={a.who} data-reveal style={{ transitionDelay: `${i * 90}ms` }}>
              <p className="who-for">For <span>{['i', 'ii', 'iii'][i]}.</span></p>
              <h3>{a.who}</h3>
              <p className="who-body">{a.body}</p>
              <p className="who-need"><Arrow />{a.need}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function UseCases() {
  return (
    <section className="section" id="use-cases">
      <div className="wrap">
        <SectionHead num="03" kicker="Use cases" title={<>Problems we <em>solve.</em></>}>
          Recognise one of these? Each is a typical engagement: what we find, what we do, and what you get.
        </SectionHead>
        <UseCaseLayouts />
      </div>
    </section>
  )
}

function Services() {
  return (
    <section className="section alt" id="services">
      <div className="wrap">
        <SectionHead num="02" kicker="Services" title={<>Architected for the cloud, <em>built to last.</em></>}>
          From system design to the code, the cloud it runs on and the pipeline that ships it, on whichever
          platform your business runs.
        </SectionHead>
        <ServicesLayouts />
      </div>
    </section>
  )
}

function Principles() {
  return (
    <section className="section alt" id="principles">
      <div className="wrap principles">
        <SectionHead num="04" kicker="Principles" title={<>How we keep systems <em>boring</em> — in the best way.</>} />
        <dl>
          {principles.map((p, i) => (
            <div key={p.k} data-reveal style={{ transitionDelay: `${i * 70}ms` }}>
              <dt>{p.k}</dt>
              <dd>{p.v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}

function Contact() {
  return (
    <section className="contact" id="contact">
      <div className="wrap contact-inner" data-reveal>
        <p className="mono-label"><span className="num">05</span> Contact</p>
        <h2>Tell us what you’re <em>running.</em></h2>
        <p className="section-sub">
          A short note about your systems and what is getting in the way is enough. We will come back to you with next steps.
        </p>
        <div className="cta-row center">
          <a className="btn btn-lg" href={mailto}>{CONTACT_EMAIL} <Arrow /></a>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="footer">
      <div className="wrap footer-inner">
        <Logo stacked />
        <div className="legal">
          <p>© {year} {LEGAL_NAME} <span className="regno">({SSM_NO})</span></p>
          <p>Registered in Malaysia under the Registration of Businesses Act 1956 · <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a></p>
        </div>
        <a href="#top">Back to top ↑</a>
      </div>
    </footer>
  )
}
