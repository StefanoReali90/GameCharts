import test from 'node:test'
import assert from 'node:assert/strict'
import { mockData } from './mockData.js'
import { addMatch, loadMatchData } from './matchStore.js'
import { parseScoreInput } from '../utils/scores.js'
import { buildMatchHistoryRows } from '../utils/matchHistory.js'

const emptyStats = {
  players: mockData.players.map((player) => ({ ...player, wins: 0, winStreak: 0, bestWinStreak: 0 })),
  matches: mockData.matches,
}

test('i dati demo coprono da 1 a 20 vittorie e mantengono una sola serie attiva', () => {
  assert.deepEqual([...new Set(mockData.players.map((player) => player.wins))].sort((a, b) => a - b),
    Array.from({ length: 20 }, (_, index) => index + 1))
  assert.deepEqual(mockData.players.filter((player) => player.winStreak > 0).map((player) => [player.id, player.winStreak]), [[1, 3]])
  assert.ok(mockData.players.every((player) => player.bestWinStreak >= player.winStreak && player.bestWinStreak <= player.wins))
  assert.ok(mockData.matches.slice(-3).every((match) => match.winnerIds.length === 1 && match.winnerIds[0] === 1))
  assert.deepEqual(mockData.matches[0].winnerIds, [7, 8])
})

test('aggiorna soltanto i vecchi mock intatti e conserva i match aggiunti nel browser', () => {
  const previousWindow = globalThis.window
  const storage = new Map([['gamechart-mock-data-v5', JSON.stringify(emptyStats)]])
  globalThis.window = { localStorage: {
    getItem: (key) => storage.get(key) ?? null,
    setItem: (key, value) => storage.set(key, value),
  } }

  try {
    assert.equal(loadMatchData().players[0].wins, 20)
    storage.delete('gamechart-mock-data-v8')
    const customized = addMatch(emptyStats, [2], [4])
    storage.set('gamechart-mock-data-v5', JSON.stringify(customized))
    assert.equal(loadMatchData().players[1].wins, 1)
    assert.equal(loadMatchData().matches.length, customized.matches.length)
  } finally {
    if (previousWindow === undefined) delete globalThis.window
    else globalThis.window = previousWindow
  }
})

test('converte i match salvati con un vincitore in liste senza perdere i dati', () => {
  const previousWindow = globalThis.window
  const storage = new Map([['gamechart-mock-data-v6', JSON.stringify({
    players: emptyStats.players,
    matches: [{ id: 1011, date: '2026-10-25T12:30:00.000Z', winnerId: 2, winnerScores: [4] }],
  })]])
  globalThis.window = { localStorage: {
    getItem: (key) => storage.get(key) ?? null,
    setItem: (key, value) => storage.set(key, value),
  } }

  try {
    const migrated = loadMatchData()
    assert.deepEqual(migrated.matches[0].winnerIds, [2])
    assert.deepEqual(migrated.matches[0].winnerScores, [4])
    assert.equal(migrated.matches[0].winnerId, undefined)
    assert.ok(storage.has('gamechart-mock-data-v8'))
  } finally {
    if (previousWindow === undefined) delete globalThis.window
    else globalThis.window = previousWindow
  }
})

test('recupera le carte del record e inizializza la miglior serie dai salvataggi precedenti', () => {
  const previousWindow = globalThis.window
  const storage = new Map([['gamechart-mock-data-v7', JSON.stringify({
    players: [{ ...mockData.players[0], winStreak: 2, bestWinStreak: undefined, bestScore: 12 }],
    matches: [{ id: 1011, date: '2026-10-25T12:30:00.000Z', winnerIds: [1], winnerScores: [4, 8] }],
  })]])
  globalThis.window = { localStorage: {
    getItem: (key) => storage.get(key) ?? null,
    setItem: (key, value) => storage.set(key, value),
  } }

  try {
    const migrated = loadMatchData()
    assert.deepEqual(migrated.players[0].bestScore, [4, 8])
    assert.equal(migrated.players[0].bestWinStreak, 2)
    assert.deepEqual(migrated.matches[0].winnerIds, [1])
  } finally {
    if (previousWindow === undefined) delete globalThis.window
    else globalThis.window = previousWindow
  }
})

test('registrare un match aggiorna data, vittorie, serie e record senza modificare i dati di partenza', () => {
  const date = new Date('2026-10-25T12:30:00.000Z')
  const first = addMatch(emptyStats, [2], [10, -2, 40], date)
  assert.deepEqual(first.matches.at(-1), { id: 1011, date: date.toISOString(), winnerIds: [2], winnerScores: [10, -2, 40] })
  assert.equal(first.players.find((player) => player.id === 2).wins, 1)
  assert.equal(first.players.find((player) => player.id === 2).winStreak, 1)
  assert.deepEqual(first.players.find((player) => player.id === 2).bestScore, [10, -2, 40])
  assert.equal(first.players.find((player) => player.id === 2).bestWinStreak, 1)
  assert.equal(first.players.find((player) => player.id === 1).winStreak, 0)
  assert.equal(emptyStats.players.find((player) => player.id === 1).winStreak, 0)

  const second = addMatch(first, [2], [12], new Date('2026-10-25T12:31:00.000Z'))
  assert.equal(second.players.find((player) => player.id === 2).winStreak, 2)
  assert.deepEqual(second.players.find((player) => player.id === 2).bestScore, [12])
  assert.equal(second.players.find((player) => player.id === 2).bestWinStreak, 2)

  const third = addMatch(second, [2], [25], new Date('2026-10-25T12:32:00.000Z'))
  assert.deepEqual(third.players.find((player) => player.id === 2).bestScore, [12])
  assert.equal(third.players.find((player) => player.id === 2).bestWinStreak, 3)

  const negative = addMatch(emptyStats, [3], [-3, -4])
  assert.deepEqual(negative.players.find((player) => player.id === 3).bestScore, [-3, -4])
})

test('un pareggio registra un solo match e aggiorna tutti i vincitori', () => {
  const tied = addMatch(emptyStats, [2, 3], [4])
  assert.equal(tied.matches.length, emptyStats.matches.length + 1)
  assert.deepEqual(tied.matches.at(-1).winnerIds, [2, 3])
  assert.deepEqual(buildMatchHistoryRows(tied).at(-1).winnerNames, ['Giada C.', 'Dario C.'])
  assert.deepEqual(tied.players.filter((player) => player.winStreak > 0).map(({ id, wins, winStreak }) => [id, wins, winStreak]), [[2, 1, 1], [3, 1, 1]])
  assert.deepEqual(tied.players.filter((player) => player.bestWinStreak > 0).map(({ id, bestWinStreak }) => [id, bestWinStreak]), [[2, 1], [3, 1]])
})

test('non registra un match con vincitori o punteggio non validi', () => {
  assert.throws(() => addMatch(mockData, [], [10]), { code: 'INVALID_PLAYER' })
  assert.throws(() => addMatch(mockData, [2, 999], [10]), { code: 'INVALID_PLAYER' })
  assert.throws(() => addMatch(mockData, [2, 2], [10]), { code: 'INVALID_PLAYER' })
  assert.throws(() => addMatch(mockData, [1], []), { code: 'INVALID_SCORES' })
  assert.throws(() => addMatch(mockData, [1], [1.5]), { code: 'INVALID_SCORES' })
  assert.throws(() => addMatch(mockData, [1], [Number.MAX_SAFE_INTEGER, 1]), { code: 'INVALID_SCORES' })
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
    assert.deepEqual(migrated.matches[0].winnerIds, [2])
    assert.equal(migrated.matches[0].winnerId, undefined)
    assert.equal(migrated.matches[0].winnerScore, undefined)
    assert.ok(storage.has('gamechart-mock-data-v8'))
  } finally {
    if (previousWindow === undefined) delete globalThis.window
    else globalThis.window = previousWindow
  }
})

test('converte il record più alto salvato in punteggio più basso senza contare i match dimostrativi', () => {
  const previousWindow = globalThis.window
  const player = { ...mockData.players[0], wins: 2, bestScore: 40 }
  const storage = new Map([['gamechart-mock-data-v4', JSON.stringify({
    players: [player],
    matches: [
      { id: 1, winnerId: player.id, winnerScores: [1] },
      { id: 2, winnerId: player.id, winnerScores: [40] },
      { id: 3, winnerId: player.id, winnerScores: [7] },
    ],
  })]])
  globalThis.window = { localStorage: {
    getItem: (key) => storage.get(key) ?? null,
    setItem: (key, value) => storage.set(key, value),
  } }

  try {
    const migrated = loadMatchData()
    assert.deepEqual(migrated.players[0].bestScore, [7])
    assert.ok(storage.has('gamechart-mock-data-v8'))
  } finally {
    if (previousWindow === undefined) delete globalThis.window
    else globalThis.window = previousWindow
  }
})
