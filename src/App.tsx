import { useEffect, useState, type ReactNode } from 'react'
import { CONTACT_EMAIL, LEGAL_NAME, SSM_NO, audiences, engagements, principles, services, stack, steps, useCases, type IconName } from './content'

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
        <Process />
        <Engagements />
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
          <a href="#process">Process</a>
          <a href="#engagements">Engagements</a>
                  </nav>
        <a className="btn btn-small" href="#contact">Talk to us</a>
      </div>
    </header>
  )
}

const deployLog: { t: string; cls?: string }[] = [
  { t: '$ terraform apply -auto-approve', cls: 'cmd' },
  { t: '  + network.core          created', cls: 'ok' },
  { t: '  + cluster.app (3 nodes)  created', cls: 'ok' },
  { t: '  + db.primary  postgres   created', cls: 'ok' },
  { t: '  + db.replica  postgres   streaming', cls: 'ok' },
  { t: '$ ./deploy --env production', cls: 'cmd' },
  { t: '  health checks          12/12 passing', cls: 'ok' },
  { t: '  rollback point         saved', cls: 'dim' },
  { t: '  backups                verified 03:00', cls: 'dim' },
  { t: '✓ live. nothing to page anyone about.', cls: 'done' },
]

function Terminal() {
  const reduce = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const [n, setN] = useState(reduce ? deployLog.length : 0)
  useEffect(() => {
    if (reduce) return
    const id = window.setInterval(() => {
      setN((v) => (v >= deployLog.length + 6 ? 0 : v + 1))
    }, 520)
    return () => window.clearInterval(id)
  }, [reduce])
  return (
    <div className="term" aria-hidden="true">
      <div className="term-bar">
        <i /><i /><i />
        <span>ops@destiny ~ production</span>
      </div>
      <pre>
        {deployLog.map((l, i) => (
          <span key={i} className={`${l.cls ?? ''} ${i < n ? 'show' : ''}`}>{l.t}{'\n'}</span>
        ))}
        <span className="caret">▍</span>
      </pre>
    </div>
  )
}

function Hero() {
  return (
    <section className="hero" id="top">
      <div className="sky" aria-hidden="true">
        <div className="stars" />
        <svg className="orbits" viewBox="0 0 1200 700" preserveAspectRatio="xMidYMid slice">
          <ellipse cx="600" cy="760" rx="700" ry="330" />
          <ellipse cx="600" cy="760" rx="880" ry="440" />
          <ellipse cx="600" cy="760" rx="1080" ry="560" />
          <circle className="sat" r="4" cx="0" cy="0">
            <animateMotion dur="38s" repeatCount="indefinite" path="M -100 760 A 700 330 0 0 1 1300 760" />
          </circle>
        </svg>
        <div className="horizon" />
      </div>
      <div className="wrap hero-grid">
        <div className="hero-copy">
          <p className="eyebrow" data-reveal>Cloud · Servers · Databases · DevOps</p>
          <h1 data-reveal>
            Infrastructure that <em>holds its course.</em>
          </h1>
          <p className="lede" data-reveal>
            Destiny Cloud designs, builds and runs enterprise infrastructure — cloud platforms, servers,
            databases and the automation between them. One team from the first diagram to the 3 a.m. page.
          </p>
          <div className="cta-row" data-reveal>
            <a className="btn" href="#contact">Start a project <Arrow /></a>
            <a className="btn btn-ghost" href="#use-cases">See use cases</a>
          </div>
        </div>
        <div className="hero-visual" data-reveal>
          <Terminal />
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
        <SectionHead num="01" kicker="Who we help" title={<>Built for businesses that <em>run on software.</em></>}>
          You do not need an infrastructure team. You need your systems to stay up, stay secure and keep up with growth.
        </SectionHead>
        <div className="audiences">
          {audiences.map((a, i) => (
            <article key={a.who} className="audience" data-reveal style={{ transitionDelay: `${i * 80}ms` }}>
              <h3>{a.who}</h3>
              <p>{a.body}</p>
              <p className="need"><span>They need</span>{a.need}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function UseCases() {
  const [active, setActive] = useState(0)
  const u = useCases[active]
  return (
    <section className="section" id="use-cases">
      <div className="wrap">
        <SectionHead num="03" kicker="Use cases" title={<>Problems we <em>solve.</em></>}>
          Recognise one of these? Each is a typical engagement: what we find, what we do, and what you get.
        </SectionHead>
        <div className="uc" data-reveal>
          <div className="uc-list" role="tablist" aria-label="Use cases">
            {useCases.map((c, i) => (
              <button
                key={c.title}
                role="tab"
                id={`uc-tab-${i}`}
                aria-selected={i === active}
                aria-controls="uc-panel"
                className={i === active ? 'on' : ''}
                onClick={() => setActive(i)}
              >
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
      </div>
    </section>
  )
}

function Services() {
  return (
    <section className="section alt" id="services">
      <div className="wrap">
        <SectionHead num="02" kicker="Services" title={<>Everything under the application, <em>handled.</em></>}>
          From a single database to a multi-region platform. Bring us the system you have, or the one you need.
        </SectionHead>
        <div className="cards">
          {services.map((s, i) => (
            <article className="card" key={s.title} data-reveal style={{ transitionDelay: `${(i % 3) * 80}ms` }}>
              <div className="card-top">
                <Icon name={s.icon} />
                <span className="idx">0{i + 1}</span>
              </div>
              <h3>{s.title}</h3>
              <p>{s.body}</p>
              <ul className="tags">
                {s.tags.map((t) => <li key={t}>{t}</li>)}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function Process() {
  return (
    <section className="section" id="process">
      <div className="wrap">
        <SectionHead num="04" kicker="Process" title={<>No surprises, <em>by design.</em></>}>
          Four steps, written down and agreed with you before anything touches production.
        </SectionHead>
        <ol className="steps">
          {steps.map((s, i) => (
            <li key={s.title} data-reveal style={{ transitionDelay: `${i * 90}ms` }}>
              <span className="step-dot">{i + 1}</span>
              <h3>{s.title}</h3>
              <p>{s.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

function Engagements() {
  return (
    <section className="section alt" id="engagements">
      <div className="wrap">
        <SectionHead num="05" kicker="Engagements" title={<>Work with us <em>your way.</em></>}>
          Start with a project, keep us on to run it, or bring us in to review what your team builds.
        </SectionHead>
        <div className="plans">
          {engagements.map((e, i) => (
            <article key={e.name} className={`plan ${e.featured ? 'featured' : ''}`} data-reveal style={{ transitionDelay: `${i * 80}ms` }}>
              {e.featured && <span className="badge">Recommended</span>}
              <h3>{e.name}</h3>
              <p className="plan-lead">{e.lead}</p>
              <ul>
                {e.points.map((p) => <li key={p}><Check />{p}</li>)}
              </ul>
              <a className={`btn ${e.featured ? '' : 'btn-ghost'}`} href="#contact">Discuss {e.name.toLowerCase()} work</a>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function Principles() {
  return (
    <section className="section alt" id="principles">
      <div className="wrap principles">
        <SectionHead num="06" kicker="Principles" title={<>How we keep systems <em>boring</em> — in the best way.</>} />
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
        <p className="mono-label"><span className="num">07</span> Contact</p>
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

function Arrow() {
  return (
    <svg className="arrow" viewBox="0 0 16 16" aria-hidden="true">
      <path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function Check() {
  return (
    <svg className="check" viewBox="0 0 16 16" aria-hidden="true">
      <path d="M3.5 8.5l3 3 6-7" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

const iconPaths: Record<IconName, ReactNode> = {
  cloud: <path d="M7 18h10.5a4 4 0 0 0 .4-8A6 6 0 0 0 6.3 11 3.5 3.5 0 0 0 7 18z" />,
  server: (
    <>
      <rect x="4" y="4" width="16" height="6.5" rx="1.5" />
      <rect x="4" y="13.5" width="16" height="6.5" rx="1.5" />
      <path d="M7.5 7.25h.01M7.5 16.75h.01M11 7.25h5M11 16.75h5" />
    </>
  ),
  database: (
    <>
      <ellipse cx="12" cy="6" rx="7" ry="2.8" />
      <path d="M5 6v12c0 1.5 3.1 2.8 7 2.8s7-1.3 7-2.8V6M5 12c0 1.5 3.1 2.8 7 2.8s7-1.3 7-2.8" />
    </>
  ),
  pipeline: (
    <>
      <circle cx="6" cy="6" r="2.2" />
      <circle cx="6" cy="18" r="2.2" />
      <circle cx="18" cy="12" r="2.2" />
      <path d="M6 8.2v7.6M8.2 6h3.3a4 4 0 0 1 4 4v0M8.2 18h3.3a4 4 0 0 0 4-4v0" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3.5l7 2.6v5.4c0 4.4-3 7.7-7 9-4-1.3-7-4.6-7-9V6.1z" />
      <path d="M9 12l2.2 2.2L15.5 10" />
    </>
  ),
  code: <path d="M8.5 7L3.5 12l5 5M15.5 7l5 5-5 5M13.5 5l-3 14" />,
}

function Icon({ name }: { name: IconName }) {
  return (
    <span className="icon">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        {iconPaths[name]}
      </svg>
    </span>
  )
}
