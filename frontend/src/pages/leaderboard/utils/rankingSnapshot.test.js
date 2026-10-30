import test from 'node:test'
import assert from 'node:assert/strict'
import { positionChange, readRankingSnapshot, saveRankingSnapshot } from './rankingSnapshot.js'

test('il confronto usa la fotografia della precedente apertura e ignora i giocatori nuovi', () => {
  const values = new Map()
  const storage = { getItem: (key) => values.get(key), setItem: (key, value) => values.set(key, value) }
  saveRankingSnapshot([{ id: 1, position: 3 }, { id: 2, position: 1 }, { id: 3, position: 2 }], storage)
  const previous = readRankingSnapshot(storage)
  assert.equal(positionChange({ id: 1, position: 1 }, previous), 2)
  assert.equal(positionChange({ id: 2, position: 3 }, previous), -2)
  assert.equal(positionChange({ id: 3, position: 2 }, previous), 0)
  assert.equal(positionChange({ id: 4, position: 4 }, previous), 0)
})
