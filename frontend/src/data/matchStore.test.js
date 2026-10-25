import test from 'node:test'
import assert from 'node:assert/strict'
import { mockData } from './mockData.js'
import { addMatch, loadMatchData } from './matchStore.js'
import { parseScoreInput } from '../utils/scores.js'

test('registrare un match aggiorna data, vittorie, serie e record senza modificare i dati di partenza', () => {
  const date = new Date('2026-10-25T12:30:00.000Z')
  const first = addMatch(mockData, 2, [10, -2, 40], date)
  assert.deepEqual(first.matches.at(-1), { id: 1011, date: date.toISOString(), winnerId: 2, winnerScores: [10, -2, 40] })
  assert.equal(first.players.find((player) => player.id === 2).wins, 1)
  assert.equal(first.players.find((player) => player.id === 2).winStreak, 1)
  assert.equal(first.players.find((player) => player.id === 2).bestScore, 48)
  assert.equal(first.players.find((player) => player.id === 1).winStreak, 0)
  assert.equal(mockData.players.find((player) => player.id === 1).winStreak, 0)

  const second = addMatch(first, 2, [12], new Date('2026-10-25T12:31:00.000Z'))
  assert.equal(second.players.find((player) => player.id === 2).winStreak, 2)
  assert.equal(second.players.find((player) => player.id === 2).bestScore, 48)

  const negative = addMatch(mockData, 3, [-3, -4])
  assert.equal(negative.players.find((player) => player.id === 3).bestScore, -7)
})

test('non registra un match con vincitore o punteggio non validi', () => {
  assert.throws(() => addMatch(mockData, 999, [10]), { code: 'INVALID_PLAYER' })
  assert.throws(() => addMatch(mockData, 1, []), { code: 'INVALID_SCORES' })
  assert.throws(() => addMatch(mockData, 1, [1.5]), { code: 'INVALID_SCORES' })
  assert.throws(() => addMatch(mockData, 1, [Number.MAX_SAFE_INTEGER, 1]), { code: 'INVALID_SCORES' })
})

test('legge dal form una lista di interi, compresi i valori negativi', () => {
  assert.deepEqual(parseScoreInput('10, -1, 0'), [10, -1, 0])
  assert.throws(() => parseScoreInput('10, , 2'), { code: 'INVALID_SCORES' })
  assert.throws(() => parseScoreInput('3.5, 2'), { code: 'INVALID_SCORES' })
})

test('conserva i match già salvati convertendo il vecchio punteggio in lista', () => {
  const previousWindow = globalThis.window
  const storage = new Map([['gamechart-mock-data-v3', JSON.stringify({
    players: mockData.players,
    matches: [{ id: 1011, date: '2026-10-25T12:30:00.000Z', winnerId: 2, winnerScore: -3 }],
  })]])
  globalThis.window = { localStorage: {
    getItem: (key) => storage.get(key) ?? null,
    setItem: (key, value) => storage.set(key, value),
  } }

  try {
    const migrated = loadMatchData()
    assert.deepEqual(migrated.matches[0].winnerScores, [-3])
    assert.equal(migrated.matches[0].winnerScore, undefined)
    assert.ok(storage.has('gamechart-mock-data-v4'))
  } finally {
    if (previousWindow === undefined) delete globalThis.window
    else globalThis.window = previousWindow
  }
})
