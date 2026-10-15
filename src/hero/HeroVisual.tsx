// Hero visual: the animation window. On the local dev server a switch compares the five scenes and the
// original terminal; in production builds the switch is compiled out and DEFAULT is shown.
import { useState, type ReactNode } from 'react'
import { SCENES } from './sceneList'

type SceneId = (typeof SCENES)[number]['id'] | 'terminal'
const DEFAULT: SceneId = 'terminal'   // live hero stays on the terminal until an animation is chosen

export default function HeroVisual({ terminal }: { terminal: ReactNode }) {
  const [id, setId] = useState<SceneId>(() => {
    if (!import.meta.env.DEV) return DEFAULT
    try { return (localStorage.getItem('dc-hero-scene') as SceneId) || DEFAULT } catch { return DEFAULT }
  })
  const pick = (v: SceneId) => {
    setId(v)
    try { localStorage.setItem('dc-hero-scene', v) } catch { /* ignore */ }
  }
  const scene = SCENES.find((s) => s.id === id)
  return (
    <>
      {scene ? (
        <div className="term scene" aria-hidden="true">
          <div className="term-bar"><i /><i /><i /><span>{scene.title}</span></div>
          <svg viewBox="0 0 400 300" className="scene-svg"><scene.C key={scene.id} /></svg>
        </div>
      ) : terminal}
      {import.meta.env.DEV && (
        <div className="scene-switch" role="radiogroup" aria-label="Compare hero animations">
          {SCENES.map((s) => (
            <button key={s.id} role="radio" aria-checked={id === s.id} className={id === s.id ? 'on' : ''} onClick={() => pick(s.id)}>{s.label}</button>
          ))}
          <button role="radio" aria-checked={id === 'terminal'} className={id === 'terminal' ? 'on' : ''} onClick={() => pick('terminal')}>Terminal</button>
        </div>
      )}
    </>
  )
}
