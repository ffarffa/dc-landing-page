// Design C: "edgy, futuristic, starlines". Palette, fonts, layout cues and every illustration came from the
// image generation connector (session "Destiny Cloud landing page, design C"); assets live in public/c/.
// Same copy as designs A and B, from ../content.
import { useEffect, useRef, useState, type ReactNode } from 'react'
import '@fontsource-variable/space-grotesk'
import '@fontsource/ibm-plex-mono/400.css'
import '@fontsource/ibm-plex-mono/500.css'
import './c.css'
import { CONTACT_EMAIL, LEGAL_NAME, SSM_NO, audiences, engagements, principles, services, stack, steps, useCases } from '../content'

const img = (name: string) => `/c/${name}.webp`
const mailto = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent('Project enquiry')}`
const year = new Date().getFullYear()
const pad = (n: number) => String(n).padStart(2, '0')

const audienceArt = ['aud-sme', 'aud-startup', 'aud-devteam']
const serviceArt = ['svc-cloud', 'svc-server', 'svc-database', 'svc-pipeline', 'svc-shield', 'svc-code']
const stepArt = ['step-assess', 'step-design', 'step-build', 'step-operate']
const engagementArt = ['eng-project', 'eng-managed', 'eng-advisory']
const principleArt = ['pr-written', 'pr-reversible', 'pr-privilege', 'pr-boring']

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>('[data-c-reveal]')
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
      { rootMargin: '0px 0px -8% 0px' },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
}

export default function DesignC() {
  useReveal()
  useEffect(() => {
    document.documentElement.dataset.design = 'c'
    return () => { delete document.documentElement.dataset.design }
  }, [])
  return (
    <div className="dc">
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
    </div>
  )
}

// Drifting points joined by thin lines when they come close: the "starlines" behind the hero.
function Starfield() {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return
    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let w = 0, h = 0, raf = 0
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    type P = { x: number; y: number; vx: number; vy: number }
    let pts: P[] = []
    const resize = () => {
      w = canvas.clientWidth
      h = canvas.clientHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const n = Math.round(Math.min(90, (w * h) / 16000))
      pts = Array.from({ length: n }, () => ({
        x: Math.random() * w, y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.18, vy: (Math.random() - 0.5) * 0.18,
      }))
    }
    const link = 130
    const draw = () => {
      ctx.clearRect(0, 0, w, h)
      for (const p of pts) {
        p.x += p.vx; p.y += p.vy
        if (p.x < 0 || p.x > w) p.vx *= -1
        if (p.y < 0 || p.y > h) p.vy *= -1
      }
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const a = pts[i], b = pts[j]
          const d = Math.hypot(a.x - b.x, a.y - b.y)
          if (d < link) {
            const alpha = (1 - d / link) * 0.35
            const g = ctx.createLinearGradient(a.x, a.y, b.x, b.y)
            g.addColorStop(0, `rgba(72,231,255,${alpha})`)
            g.addColorStop(1, `rgba(154,114,255,${alpha})`)
            ctx.strokeStyle = g
            ctx.lineWidth = 0.8
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke()
          }
        }
      }
      for (const p of pts) {
        ctx.fillStyle = 'rgba(237,246,255,0.75)'
        ctx.beginPath(); ctx.arc(p.x, p.y, 1.2, 0, Math.PI * 2); ctx.fill()
      }
      if (!still) raf = requestAnimationFrame(draw)
    }
    resize()
    draw()
    const ro = new ResizeObserver(() => { resize(); if (still) draw() })
    ro.observe(canvas)
    return () => { cancelAnimationFrame(raf); ro.disconnect() }
  }, [])
  return <canvas ref={ref} className="dc-stars" aria-hidden="true" />
}

function Logo() {
  return (
    <a href="#top" className="dc-logo" aria-label="Destiny Cloud, home">
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M4 3l10 9-10 9" fill="none" stroke="var(--c-star)" strokeWidth="2.4" strokeLinejoin="miter" />
        <path d="M11 3l10 9-10 9" fill="none" stroke="var(--c-nebula)" strokeWidth="2.4" opacity=".85" />
      </svg>
      DESTINY CLOUD
    </a>
  )
}

const Arrow = () => <span className="dc-arrow" aria-hidden="true">↗</span>

function Nav() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 10)
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])
  return (
    <header className={`dc-nav ${scrolled ? 'scrolled' : ''}`}>
      <div className="dc-wrap dc-nav-inner">
        <Logo />
        <nav aria-label="Main">
          <a href="#services">Services</a>
          <a href="#who">Who we help</a>
          <a href="#use-cases">Use cases</a>
          <a href="#process">How we work</a>
        </nav>
        <a className="dc-btn" href="#contact">Talk to an engineer <Arrow /></a>
      </div>
    </header>
  )
}

function Hero() {
  return (
    <section className="dc-hero" id="top">
      <Starfield />
      <span className="dc-trail t1" aria-hidden="true" />
      <span className="dc-trail t2" aria-hidden="true" />
      <span className="dc-trail t3" aria-hidden="true" />
      <div className="dc-wrap dc-hero-grid">
        <div>
          <p className="dc-mono dc-eyebrow" data-c-reveal>[ cloud · servers · databases · devops ]</p>
          <h1 data-c-reveal>Cloud infrastructure. Without the guesswork<span className="dc-dot">.</span></h1>
          <p className="dc-lede" data-c-reveal>
            We design, build and run secure cloud platforms, servers and databases for ambitious teams,
            from the first diagram to the 3 a.m. page.
          </p>
          <div className="dc-ctas" data-c-reveal>
            <a className="dc-btn dc-btn-lg" href="#contact">Talk to an engineer <Arrow /></a>
            <a className="dc-btn dc-btn-lg dc-btn-violet" href="#use-cases">See use cases <Arrow /></a>
          </div>
          <p className="dc-mono dc-tagline" data-c-reveal>// reliable. scalable. secure.</p>
        </div>
        <div className="dc-hero-art" data-c-reveal>
          <span className="dc-hud tl">01 / PLATFORM</span>
          <span className="dc-hud br">SYS · NOMINAL</span>
          <img src={img('hero')} alt="Wireframe constellation cloud connected by light beams to a server rack, a database and a server stack" width="1400" height="986" />
        </div>
      </div>
    </section>
  )
}

function Stack() {
  return (
    <section className="dc-stack" aria-label="Technologies we work with">
      <div className="dc-wrap dc-stack-inner">
        <p className="dc-mono">Built around<br />your stack</p>
        <ul>{stack.map((s) => <li key={s}>{s}</li>)}</ul>
      </div>
    </section>
  )
}

function Head({ n, kicker, title, sub }: { n: string; kicker: string; title: ReactNode; sub?: string }) {
  return (
    <div className="dc-head" data-c-reveal>
      <p className="dc-mono dc-kicker"><span>{n}</span> {kicker} <i /></p>
      <h2>{title}</h2>
      {sub && <p className="dc-sub">{sub}</p>}
    </div>
  )
}

function Audiences() {
  return (
    <section className="dc-section" id="who">
      <div className="dc-wrap">
        <Head n="01" kicker="Who we help" title={<>Built for businesses that <span className="dc-hl">run on software</span>.</>}
          sub="You don’t need an infrastructure team. You need systems that stay up, stay secure and keep up with growth." />
        <div className="dc-grid3">
          {audiences.map((a, i) => (
            <article key={a.who} className="dc-cut dc-card" data-c-reveal style={{ transitionDelay: `${i * 80}ms` }}>
              <img className="dc-icon" src={img(audienceArt[i])} alt="" width="280" height="280" loading="lazy" />
              <h3>{a.who}</h3>
              <p>{a.body}</p>
              <p className="dc-mono dc-need">&gt; {a.need}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function Services() {
  return (
    <section className="dc-section dc-band" id="services">
      <div className="dc-wrap">
        <Head n="02" kicker="Services" title={<>Everything under the application, <span className="dc-hl">handled</span>.</>}
          sub="From a single database to a multi-region platform. Bring us the system you have, or the one you need." />
        <div className="dc-grid3">
          {services.map((s, i) => (
            <article key={s.title} className="dc-cut dc-card dc-svc" data-c-reveal style={{ transitionDelay: `${(i % 3) * 80}ms` }}>
              <div className="dc-svc-top">
                <img className="dc-icon" src={img(serviceArt[i])} alt="" width="280" height="280" loading="lazy" />
                <span className="dc-mono dc-idx">[{pad(i + 1)}]</span>
              </div>
              <h3>{s.title}</h3>
              <p>{s.body}</p>
              <ul className="dc-tags">{s.tags.map((t) => <li key={t}>{t}</li>)}</ul>
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
    <section className="dc-section" id="use-cases">
      <div className="dc-wrap">
        <Head n="03" kicker="Use cases" title={<>Infrastructure for <span className="dc-hl">what’s next</span>.</>}
          sub="Recognise one of these? Each is a typical engagement: what we find, what we do and what you get." />
        <div className="dc-uc" data-c-reveal>
          <div className="dc-uc-tabs" role="tablist" aria-label="Use cases">
            {useCases.map((c, i) => (
              <button key={c.title} role="tab" id={`dc-uc-tab-${i}`} aria-selected={i === active} aria-controls="dc-uc-panel"
                className={i === active ? 'on' : ''} onClick={() => setActive(i)}>
                <span className="dc-mono">{pad(i + 1)} · {c.sector}</span>
                {c.title}
              </button>
            ))}
          </div>
          <div className="dc-uc-panel dc-cut" id="dc-uc-panel" role="tabpanel" aria-labelledby={`dc-uc-tab-${active}`} key={active}>
            <img src={img(`uc-${active + 1}`)} alt="" width="1100" height="700" />
            <div>
              <h3>{u.title}</h3>
              <dl>
                <div><dt className="dc-mono">// the problem</dt><dd>{u.problem}</dd></div>
                <div><dt className="dc-mono">// what we do</dt><dd>{u.approach}</dd></div>
                <div className="res"><dt className="dc-mono">// what you get</dt><dd>{u.result}</dd></div>
              </dl>
              <a className="dc-btn" href="#contact">This sounds like us <Arrow /></a>
            </div>
          </div>
        </div>
      </div>
      <div hidden>{useCases.map((_, i) => <img key={i} src={img(`uc-${i + 1}`)} alt="" loading="lazy" />)}</div>
    </section>
  )
}

function Process() {
  return (
    <section className="dc-section dc-band" id="process">
      <div className="dc-wrap">
        <Head n="04" kicker="Process" title={<>A clear path from <span className="dc-hl">day one</span>.</>}
          sub="Four steps, written down and agreed with you before anything touches production." />
        <ol className="dc-steps">
          {steps.map((s, i) => (
            <li key={s.title} data-c-reveal style={{ transitionDelay: `${i * 90}ms` }}>
              <span className="dc-node" aria-hidden="true" />
              <div className="dc-cut dc-card">
                <div className="dc-step-top">
                  <span className="dc-mono dc-idx">{pad(i + 1)}</span>
                  <img className="dc-icon sm" src={img(stepArt[i])} alt="" width="280" height="280" loading="lazy" />
                </div>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

function Engagements() {
  return (
    <section className="dc-section" id="engagements">
      <div className="dc-wrap">
        <Head n="05" kicker="Engagements" title={<>Flexible ways to <span className="dc-hl">work together</span>.</>}
          sub="Start with a project, keep us on to run it, or bring us in to review what your team builds." />
        <div className="dc-grid3">
          {engagements.map((e, i) => (
            <article key={e.name} className={`dc-cut dc-card dc-plan ${e.featured ? 'featured' : ''}`} data-c-reveal style={{ transitionDelay: `${i * 80}ms` }}>
              {e.featured && <span className="dc-mono dc-badge">recommended</span>}
              <img className="dc-icon" src={img(engagementArt[i])} alt="" width="280" height="280" loading="lazy" />
              <h3>{e.name}</h3>
              <p>{e.lead}</p>
              <ul>{e.points.map((p) => <li key={p}>{p}</li>)}</ul>
              <a className={`dc-btn ${e.featured ? '' : 'dc-btn-violet'}`} href="#contact">Discuss {e.name.toLowerCase()} work <Arrow /></a>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function Principles() {
  return (
    <section className="dc-section dc-band" id="principles">
      <div className="dc-wrap">
        <Head n="06" kicker="Principles" title={<>Principles that keep systems <span className="dc-hl">dependable</span>.</>} />
        <div className="dc-principles dc-cut">
          {principles.map((p, i) => (
            <div key={p.k} data-c-reveal style={{ transitionDelay: `${i * 70}ms` }}>
              <img className="dc-icon sm" src={img(principleArt[i])} alt="" width="280" height="280" loading="lazy" />
              <h3>{p.k}</h3>
              <p>{p.v}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Contact() {
  return (
    <section className="dc-section" id="contact">
      <div className="dc-wrap">
        <div className="dc-contact dc-cut" data-c-reveal>
          <div>
            <p className="dc-mono dc-kicker"><span>07</span> Contact <i /></p>
            <h2>Let’s make your cloud <span className="dc-hl">work harder</span>.</h2>
            <p className="dc-sub">A short note about your systems and what is getting in the way is enough. We will come back to you with next steps.</p>
            <a className="dc-btn dc-btn-lg" href={mailto}>{CONTACT_EMAIL} <Arrow /></a>
            <p className="dc-mono dc-where">Malaysia · built for teams everywhere</p>
          </div>
          <img src={img('contact')} alt="Two wireframe figures joined by a line of light, with a paper plane above" width="1000" height="673" loading="lazy" />
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="dc-footer">
      <div className="dc-wrap dc-footer-inner">
        <Logo />
        <div className="dc-legal">
          <p>© {year} {LEGAL_NAME} <span className="dc-mono">({SSM_NO})</span></p>
          <p>Registered in Malaysia under the Registration of Businesses Act 1956 · <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a></p>
        </div>
        <a className="dc-mono" href="#top">back to top ↑</a>
      </div>
    </footer>
  )
}
