// Einstieg für den Prerender (vite build --ssr). Rendert eine Route zu HTML.
import { renderToString } from 'react-dom/server'
import App, { prerenderRoutes } from './App'
import { ssr, type PageMeta } from './ssr'
import { translateHtml, translateText } from './i18n/static'

export function render(path: string, origin: string) {
  ssr.path = path
  ssr.origin = origin
  ssr.meta = null
  // Quelltext ist (noch) Deutsch: HTML und Meta-Angaben mit es.json übersetzen.
  const html = translateHtml(renderToString(<App />))
  const m = ssr.meta as PageMeta | null
  const meta = m ? { ...m, title: translateText(m.title), description: translateText(m.description) } : null
  return { html, meta }
}

export { prerenderRoutes }
export { organizationJsonLd, COMPANY } from './company'
