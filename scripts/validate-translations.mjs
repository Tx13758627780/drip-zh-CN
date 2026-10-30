// Checks that every translation file has exactly the same keys as en.json and
// that interpolation placeholders ({{...}}), nesting ($t(...)) and markup
// (<0>...</0>) are preserved. Usage: node scripts/validate-translations.mjs [lang]
import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const dir = join(dirname(fileURLToPath(import.meta.url)), '..', 'i18n')
const load = (name) =>
  JSON.parse(readFileSync(join(dir, `${name}.json`), 'utf8'))
const en = load('en')
const langs = process.argv.slice(2).length ? process.argv.slice(2) : ['zh']

const tokens = (str) =>
  [
    ...(str.match(/\{\{\s*[\w.]+\s*\}\}/g) || []),
    ...(str.match(/\$t\([\w.]+/g) || []),
    ...(str.match(/<\/?\d+>/g) || []),
  ]
    .map((t) => t.replace(/\s+/g, ''))
    .sort()

let errors = 0
for (const lang of langs) {
  const tr = load(lang)
  const enKeys = Object.keys(en)
  const trKeys = Object.keys(tr)
  for (const k of enKeys) {
    if (!(k in tr)) {
      console.error(`[${lang}] missing key: ${k}`)
      errors++
    }
  }
  for (const k of trKeys) {
    if (!(k in en)) {
      console.error(`[${lang}] extra key: ${k}`)
      errors++
    }
  }
  for (const k of enKeys) {
    if (!(k in tr)) continue
    const a = tokens(en[k]).join(' ')
    const b = tokens(tr[k]).join(' ')
    // plural forms may legitimately differ in using {{count}}
    const isPlural = /_(one|other|zero|few|many|two)$/.test(k)
    const strip = (s) => s.replace(/\{\{count\}\}/g, '').trim()
    if (a !== b && !(isPlural && strip(a) === strip(b))) {
      console.error(
        `[${lang}] token mismatch in ${k}:\n  en: ${a}\n  ${lang}: ${b}`
      )
      errors++
    }
  }
  const untranslated = enKeys.filter(
    (k) => tr[k] === en[k] && /[a-z]{3,}/i.test(en[k])
  )
  console.log(
    `[${lang}] ${trKeys.length}/${
      enKeys.length
    } keys, untranslated (identical to en): ${
      untranslated.length ? untranslated.join(', ') : 'none'
    }`
  )
}
if (errors) {
  console.error(`${errors} problem(s) found`)
  process.exit(1)
}
console.log('OK')
