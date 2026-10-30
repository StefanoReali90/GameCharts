import { readdir, readFile, access } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const root = fileURLToPath(new URL('..', import.meta.url))
const source = path.join(root, 'src/components')
let count = 0
for (const entry of await readdir(source, { withFileTypes: true })) {
  if (!entry.isDirectory()) continue
  const directory = path.join(source, entry.name)
  for (const file of ['index.ts', 'config.ts', 'types.ts', 'style.css', 'SPECIFICHE.md', `${entry.name}.jsx`]) {
    await access(path.join(directory, file))
  }
  const specification = await readFile(path.join(directory, 'SPECIFICHE.md'), 'utf8')
  const published = await readFile(path.join(root, '../documentazione/LaSpeziaUi', entry.name, 'SPECIFICHE.md'), 'utf8')
  if (specification !== published) throw new Error(`Documentazione non sincronizzata: ${entry.name}`)
  count++
}
console.log(`Struttura e documentazione verificate per ${count} componenti.`)
