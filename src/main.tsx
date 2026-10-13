import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource-variable/inter-tight'
import '@fontsource-variable/jetbrains-mono'
import '@fontsource/instrument-serif/400.css'
import '@fontsource/instrument-serif/400-italic.css'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

// Colour lab for local tuning (`npm run dev`). Vite drops this block from production builds.
if (import.meta.env.DEV) {
  import('./dev/ColorLab.tsx').then(({ default: ColorLab }) => {
    const host = document.createElement('div')
    document.body.appendChild(host)
    createRoot(host).render(<ColorLab />)
  })
}
