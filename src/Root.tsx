import { lazy, Suspense, useEffect, useState } from 'react'
import DesignA from './App.tsx'
import './switcher.css'

// Design B is loaded only when someone picks it, so design A stays as light as before.
const DesignB = lazy(() => import('./b/DesignB.tsx'))

type Mode = 'a' | 'b' | 'compare'
const MODES: { id: Mode; label: string }[] = [
  { id: 'a', label: 'Design A' },
  { id: 'b', label: 'Design B' },
  { id: 'compare', label: 'Side by side' },
]
const KEY = 'dc-design'
const params = new URLSearchParams(window.location.search)
const embedded = params.get('embed') === '1'

function initialMode(): Mode {
  const fromUrl = params.get('design')
  if (fromUrl === 'a' || fromUrl === 'b' || fromUrl === 'compare') return fromUrl
  try {
    const saved = localStorage.getItem(KEY)
    if (saved === 'a' || saved === 'b' || saved === 'compare') return saved
  } catch { /* storage blocked: fall back to A */ }
  return 'a'
}

export default function Root() {
  const [mode, setMode] = useState<Mode>(initialMode)

  useEffect(() => {
    if (embedded) return
    const url = new URL(window.location.href)
    url.searchParams.set('design', mode)
    window.history.replaceState(null, '', url)
    try { localStorage.setItem(KEY, mode) } catch { /* ignore */ }
    if (mode !== 'compare') window.scrollTo(0, 0)
  }, [mode])

  return (
    <>
      {mode === 'a' && <DesignA />}
      {mode === 'b' && (
        <Suspense fallback={<div className="sw-loading" />}>
          <DesignB />
        </Suspense>
      )}
      {mode === 'compare' && <Compare />}
      {!embedded && <Switcher mode={mode} onChange={setMode} />}
    </>
  )
}

function Compare() {
  useEffect(() => {
    document.documentElement.classList.add('sw-compare-on')
    return () => document.documentElement.classList.remove('sw-compare-on')
  }, [])
  return (
    <div className="sw-compare">
      {(['a', 'b'] as const).map((d) => (
        <figure key={d}>
          <figcaption>Design {d.toUpperCase()}</figcaption>
          <iframe src={`/?design=${d}&embed=1`} title={`Design ${d.toUpperCase()}`} />
        </figure>
      ))}
    </div>
  )
}

function Switcher({ mode, onChange }: { mode: Mode; onChange: (m: Mode) => void }) {
  return (
    <div className="sw" role="radiogroup" aria-label="Choose a design">
      {MODES.map((m) => (
        <button key={m.id} role="radio" aria-checked={mode === m.id} className={mode === m.id ? 'on' : ''} onClick={() => onChange(m.id)}>
          {m.label}
        </button>
      ))}
    </div>
  )
}
