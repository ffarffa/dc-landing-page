// Design B: light "clay" art direction. Palette, fonts and every illustration came from the image
// generation connector (session "Destiny Cloud landing page, design B"); assets live in public/b/.
// Same copy as design A, from ../content.
import { useEffect, useState, type ReactNode } from 'react'
import '@fontsource/dm-serif-display/400.css'
import '@fontsource/dm-serif-display/400-italic.css'
import '@fontsource-variable/manrope'
import './b.css'
import { CONTACT_EMAIL, LEGAL_NAME, SSM_NO, audiences, engagements, principles, services, stack, steps, useCases } from '../content'

const img = (name: string) => `/b/${name}.webp`
const mailto = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent('Project enquiry')}`
const year = new Date().getFullYear()

const audienceArt = ['aud-sme', 'aud-startup', 'aud-devteam']
const serviceArt = ['svc-cloud', 'svc-server', 'svc-database', 'svc-pipeline', 'svc-shield', 'svc-code']
const stepArt = ['step-assess', 'step-design', 'step-build', 'step-operate']
const engagementArt = ['eng-project', 'eng-managed', 'eng-advisory']
const principleArt = ['pr-written', 'pr-reversible', 'pr-privilege', 'pr-boring']
const stepTint = ['cobalt', 'tangerine', 'mint', 'lilac']

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>('[data-b-reveal]')
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

export default function DesignB() {
  useReveal()
  useEffect(() => {
    document.documentElement.dataset.design = 'b'
    return () => { delete document.documentElement.dataset.design }
  }, [])
  return (
    <div className="db">
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

function Logo() {
  return (
    <a href="#top" className="db-logo" aria-label="Destiny Cloud, home">
      <svg viewBox="0 0 40 28" aria-hidden="true">
        <path d="M11 26h19a8 8 0 0 0 1.2-15.9A10.5 10.5 0 0 0 11 8.6 8.7 8.7 0 0 0 11 26z" fill="var(--b-cobalt)" />
        <circle cx="29" cy="7" r="4" fill="var(--b-tangerine)" />
      </svg>
      Destiny Cloud
    </a>
  )
}

function Nav() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 10)
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])
  return (
    <header className={`db-nav ${scrolled ? 'scrolled' : ''}`}>
      <div className="db-wrap db-nav-inner">
        <Logo />
        <nav aria-label="Main">
          <a href="#services">Services</a>
          <a href="#who">Who we help</a>
          <a href="#use-cases">Use cases</a>
          <a href="#process">How we work</a>
        </nav>
        <a className="db-btn" href="#contact">Talk to an expert</a>
      </div>
    </header>
  )
}

function Hero() {
  return (
    <section className="db-hero" id="top">
      <span className="db-blob mint" aria-hidden="true" />
      <span className="db-blob lilac" aria-hidden="true" />
      <div className="db-wrap db-hero-grid">
        <div>
          <p className="db-chip" data-b-reveal>Cloud, without the complexity</p>
          <h1 data-b-reveal>Cloud infrastructure, built for <em>what’s next.</em></h1>
          <p className="db-lede" data-b-reveal>
            We design, build and run secure cloud platforms, servers and databases, so your team can move faster,
            scale with confidence and stay focused on the work that matters.
          </p>
          <div className="db-ctas" data-b-reveal>
            <a className="db-btn db-btn-lg" href="#contact">Let’s talk</a>
            <a className="db-btn db-btn-lg db-btn-outline" href="#use-cases">See use cases</a>
          </div>
        </div>
        <div className="db-hero-art" data-b-reveal>
          <img src={img('hero')} alt="Clay illustration of a cloud connected to a server stack, a database and a security shield" width="1140" height="942" />
        </div>
      </div>
    </section>
  )
}

function Stack() {
  return (
    <section className="db-stack" aria-label="Technologies we work with">
      <div className="db-wrap">
        <p>Built around the tools you trust</p>
        <ul>
          {stack.map((s) => <li key={s}>{s}</li>)}
        </ul>
      </div>
    </section>
  )
}

function Head({ kicker, title, sub }: { kicker: string; title: ReactNode; sub?: string }) {
  return (
    <div className="db-head" data-b-reveal>
      <p className="db-kicker">{kicker}</p>
      <h2>{title}</h2>
      {sub && <p className="db-sub">{sub}</p>}
    </div>
  )
}

function Audiences() {
  return (
    <section className="db-section" id="who">
      <div className="db-wrap">
        <Head kicker="Who we help" title={<>Built for businesses that <em>run on software.</em></>}
          sub="You don’t need an infrastructure team. You need systems that stay up, stay secure and keep up with growth." />
        <div className="db-grid3">
          {audiences.map((a, i) => (
            <article key={a.who} className="db-card db-aud" data-b-reveal style={{ transitionDelay: `${i * 80}ms` }}>
              <img src={img(audienceArt[i])} alt="" width="320" height="320" loading="lazy" />
              <h3>{a.who}</h3>
              <p>{a.body}</p>
              <p className="db-need">{a.need}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function Services() {
  return (
    <section className="db-section db-tint" id="services">
      <div className="db-wrap">
        <Head kicker="Services" title={<>Everything your cloud <em>needs.</em></>}
          sub="From a single database to a multi-region platform. Bring us the system you have, or the one you need." />
        <div className="db-grid3">
          {services.map((s, i) => (
            <article key={s.title} className="db-card db-svc" data-b-reveal style={{ transitionDelay: `${(i % 3) * 80}ms` }}>
              <div className="db-svc-top">
                <span className="db-num">0{i + 1}</span>
                <img src={img(serviceArt[i])} alt="" width="320" height="320" loading="lazy" />
              </div>
              <h3>{s.title}</h3>
              <p>{s.body}</p>
              <ul className="db-tags">{s.tags.map((t) => <li key={t}>{t}</li>)}</ul>
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
    <section className="db-section" id="use-cases">
      <div className="db-wrap">
        <Head kicker="Use cases" title={<>Built around your <em>real-world challenges.</em></>}
          sub="Recognise one of these? Each is a typical engagement: what we find, what we do and what you get." />
        <div className="db-uc" data-b-reveal>
          <div className="db-uc-tabs" role="tablist" aria-label="Use cases">
            {useCases.map((c, i) => (
              <button key={c.title} role="tab" id={`db-uc-tab-${i}`} aria-selected={i === active} aria-controls="db-uc-panel"
                className={i === active ? 'on' : ''} onClick={() => setActive(i)}>
                <small>{c.sector}</small>
                {c.title}
              </button>
            ))}
          </div>
          <div className="db-uc-panel" id="db-uc-panel" role="tabpanel" aria-labelledby={`db-uc-tab-${active}`} key={active}>
            <img src={img(`uc-${active + 1}`)} alt="" width="1100" height="700" />
            <div className="db-uc-body">
              <h3>{u.title}</h3>
              <dl>
                <div><dt>The problem</dt><dd>{u.problem}</dd></div>
                <div><dt>What we do</dt><dd>{u.approach}</dd></div>
                <div className="res"><dt>What you get</dt><dd>{u.result}</dd></div>
              </dl>
              <a className="db-btn" href="#contact">This sounds like us</a>
            </div>
          </div>
        </div>
      </div>
      {/* Warm the cache for the other tabs once the section is on screen. */}
      <div hidden>{useCases.map((_, i) => <img key={i} src={img(`uc-${i + 1}`)} alt="" loading="lazy" />)}</div>
    </section>
  )
}

function Process() {
  return (
    <section className="db-section db-tint" id="process">
      <div className="db-wrap">
        <Head kicker="How we work" title={<>A clear path from idea <em>to impact.</em></>}
          sub="Four steps, written down and agreed with you before anything touches production." />
        <ol className="db-steps">
          {steps.map((s, i) => (
            <li key={s.title} className={`db-card ${stepTint[i]}`} data-b-reveal style={{ transitionDelay: `${i * 80}ms` }}>
              <span className="db-step-no">0{i + 1}</span>
              <img src={img(stepArt[i])} alt="" width="320" height="320" loading="lazy" />
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
    <section className="db-section" id="engagements">
      <div className="db-wrap">
        <Head kicker="Engagements" title={<>The right support, <em>at every stage.</em></>}
          sub="Start with a project, keep us on to run it, or bring us in to review what your team builds." />
        <div className="db-grid3">
          {engagements.map((e, i) => (
            <article key={e.name} className={`db-card db-plan ${e.featured ? 'featured' : ''}`} data-b-reveal style={{ transitionDelay: `${i * 80}ms` }}>
              <div className="db-plan-art"><img src={img(engagementArt[i])} alt="" width="320" height="320" loading="lazy" /></div>
              {e.featured && <span className="db-badge">Recommended</span>}
              <h3>{e.name}</h3>
              <p className="db-plan-lead">{e.lead}</p>
              <ul>{e.points.map((p) => <li key={p}>{p}</li>)}</ul>
              <a className={`db-btn ${e.featured ? 'db-btn-light' : 'db-btn-outline'}`} href="#contact">Discuss {e.name.toLowerCase()} work</a>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function Principles() {
  return (
    <section className="db-section db-tint" id="principles">
      <div className="db-wrap">
        <Head kicker="Principles" title={<>Good infrastructure <em>feels invisible.</em></>} />
        <div className="db-principles">
          {principles.map((p, i) => (
            <div key={p.k} className="db-pr" data-b-reveal style={{ transitionDelay: `${i * 70}ms` }}>
              <img src={img(principleArt[i])} alt="" width="320" height="320" loading="lazy" />
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
    <section className="db-section" id="contact">
      <div className="db-wrap">
        <div className="db-contact" data-b-reveal>
          <div>
            <p className="db-kicker">Contact</p>
            <h2>Let’s make your cloud a little more <em>capable.</em></h2>
            <p className="db-sub">A short note about your systems and what is getting in the way is enough. We will come back to you with next steps.</p>
            <a className="db-btn db-btn-lg" href={mailto}>
              <img src={img('contact-plane')} alt="" width="28" height="28" /> {CONTACT_EMAIL}
            </a>
            <p className="db-where">Based in Malaysia. Built for teams everywhere.</p>
          </div>
          <img className="db-contact-art" src={img('contact')} alt="Two armchairs facing each other across a small table, with speech bubbles above" width="1000" height="769" loading="lazy" />
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="db-footer">
      <div className="db-wrap db-footer-inner">
        <Logo />
        <div className="db-legal">
          <p>© {year} {LEGAL_NAME} <span>({SSM_NO})</span></p>
          <p>Registered in Malaysia under the Registration of Businesses Act 1956 · <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a></p>
        </div>
        <a href="#top">Back to top ↑</a>
      </div>
    </footer>
  )
}
