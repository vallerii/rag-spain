// Prerender: übersetzt das statische HTML (renderToString) mit es.json — dieselbe Logik
// wie der MutationObserver im Browser, nur auf Text zwischen Tags und auf Attributen.
// So sehen Crawler und Link-Vorschauen die Seite auf Spanisch.
import { setDict, translateString } from './index'
import es from './es.json'

setDict(es as Record<string, string>, 'es')
const dictEs = es as Record<string, string>

const unesc = (s: string) => s.replace(/&quot;/g, '"').replace(/&#x27;/g, "'").replace(/&#39;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&')
const escText = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
const escAttr = (s: string) => escText(s).replace(/"/g, '&quot;')
const norm = (s: string) => s.replace(/ /g, ' ').replace(/\s+/g, ' ').trim()

/** Einzelner Text (Titel, Description). */
export function translateText(s: string): string {
  return translateString(s) ?? s
}

const SKIP = /^(script|style|noscript|textarea|code|pre)$/i

export function translateHtml(html: string): string {
  // Tokens: Kommentare, Tags, Text.
  const parts = html.split(/(<!--[\s\S]*?-->|<[^>]+>)/)
  const out: string[] = []
  const stack: string[] = [] // offene Tags mit data-no-translate oder SKIP
  let skipDepth = 0
  let prevText = ''
  for (const part of parts) {
    if (!part) continue
    if (part.startsWith('<!--')) { out.push(part); continue }
    if (part.startsWith('<')) {
      const m = part.match(/^<\/?([a-zA-Z0-9-]+)/)
      const tag = m ? m[1] : ''
      const closing = part.startsWith('</')
      const selfClosing = part.endsWith('/>') || /^(br|img|input|meta|link|hr|source|area|col|wbr|path|circle|rect|line|polyline|polygon|stop|use)$/i.test(tag)
      let t = part
      if (!closing) {
        if (!skipDepth) t = t.replace(/\s(placeholder|aria-label|title|alt)="([^"]*)"/g, (all, a, v) => {
          const tr = translateString(unesc(v)); return tr === undefined ? all : ` ${a}="${escAttr(tr)}"`
        })
        if (!selfClosing) {
          const noTr = SKIP.test(tag) || /\sdata-no-translate(=|\s|>|\/)/.test(part)
          stack.push(noTr ? tag + '!' : tag)
          if (noTr) skipDepth++
        }
      } else {
        // bis zum passenden Tag schließen
        for (let i = stack.length - 1; i >= 0; i--) {
          const s = stack[i]
          if (s.replace('!', '') === tag) {
            for (let j = stack.length - 1; j >= i; j--) if (stack[j].endsWith('!')) skipDepth--
            stack.length = i
            break
          }
        }
      }
      out.push(t)
      prevText = ''
      continue
    }
    // Text
    if (skipDepth) { out.push(part); continue }
    const raw = unesc(part)
    let tr: string | undefined
    if (/\d\s*$/.test(prevText)) {
      const v = dictEs['#n ' + norm(raw)]
      if (v !== undefined) tr = raw.match(/^\s*/)![0] + v + raw.match(/\s*$/)![0]
    }
    if (tr === undefined) tr = translateString(raw)
    out.push(tr === undefined ? part : escText(tr))
    prevText = raw
  }
  return out.join('')
}
