import { useEffect, useState, type ReactNode } from 'react'
import HeroVisual from './hero/HeroVisual.tsx'
import Arrow from './sections/Arrow.tsx'
import ServicesLayouts from './sections/ServicesLayouts.tsx'
import UseCaseLayouts from './sections/UseCaseLayouts.tsx'
import { CONTACT_EMAIL, LEGAL_NAME, SSM_NO, audiences, engagements, principles, stack, steps } from './content'

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


function Check() {
  return (
    <svg className="check" viewBox="0 0 16 16" aria-hidden="true">
      <path d="M3.5 8.5l3 3 6-7" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
