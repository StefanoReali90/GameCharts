import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, readdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const directory = path.dirname(fileURLToPath(import.meta.url))
const files = readdirSync(directory).filter((name) => name.endsWith('.json'))
const read = (name) => JSON.parse(readFileSync(path.join(directory, name), 'utf8'))
const reference = read('en.json')
const placeholders = (value) => [...value.matchAll(/\{\w+\}/g)].map(([item]) => item).sort()

test('tutte le 21 lingue coprono le stesse stringhe e i segnaposto', () => {
  assert.equal(files.length, 21)
  for (const file of files) {
    const messages = read(file)
    assert.deepEqual(Object.keys(messages).sort(), Object.keys(reference).sort(), file)
    for (const [key, value] of Object.entries(messages)) {
      assert.equal(typeof value, 'string', `${file}: ${key}`)
      assert.ok(value.trim(), `${file}: ${key}`)
      assert.deepEqual(placeholders(value), placeholders(reference[key]), `${file}: ${key}`)
    }
  }
})
