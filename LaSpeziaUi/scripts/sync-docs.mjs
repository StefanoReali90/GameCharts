import { readdir, readFile, mkdir, writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
const root=fileURLToPath(new URL('..',import.meta.url))
const components=path.join(root,'src/components')
let count=0
for(const entry of await readdir(components,{withFileTypes:true})) {
  if(!entry.isDirectory())continue
  const target=path.join(root,'../documentazione/LaSpeziaUi',entry.name)
  await mkdir(target,{recursive:true})
  await writeFile(path.join(target,'SPECIFICHE.md'),await readFile(path.join(components,entry.name,'SPECIFICHE.md'),'utf8'))
  count++
}
console.log(`Sincronizzate ${count} schede dei componenti.`)
