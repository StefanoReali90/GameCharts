import test from 'node:test'
import assert from 'node:assert/strict'
import { mockData } from './mockData.js'
import { addMatch, loadMatchData } from './matchStore.js'
import { buildLeaderboard } from '../utils/leaderboard.js'
import { buildMatchHistoryRows } from '../utils/matchHistory.js'

test('i mock contengono solo Player e Match con username obbligatori e univoci', () => {
  assert.deepEqual(Object.keys(mockData).sort(), ['matches', 'players'])
  assert.equal(mockData.players.length, 29)
  assert.deepEqual(mockData.players[0], { id: 1, username: 'Alexandru B.' })
  assert.deepEqual(mockData.players[28], { id: 29, username: 'Alessandra Z.' })
  assert.equal(new Set(mockData.players.map((player) => player.username.toLocaleLowerCase())).size, mockData.players.length)
  assert.ok(mockData.players.every((player) => player.username.trim() && Object.keys(player).length === 2))
  assert.ok(mockData.matches.every((match) => Object.keys(match).sort().join(',') === 'date,id,winnerIds,winningScore'))
  assert.ok(mockData.matches.every((match) => Number.isSafeInteger(match.winningScore)
    && match.winningScore >= -Math.floor(4 / match.winnerIds.length)))
  assert.ok(mockData.matches.every((match) => match.winnerIds.length > 0 && match.winnerIds.every((id) => mockData.players.some((player) => player.id === id))))
})

test('lo storico ricostruisce vittorie, serie e un pareggio senza contatori su Player', () => {
  const ranking = buildLeaderboard(mockData)
  assert.deepEqual([...new Set(ranking.map((player) => player.wins))].sort((a, b) => a - b),
    Array.from({ length: 20 }, (_, index) => index + 1))
  assert.deepEqual(ranking.slice(0, 3).map(({ username, wins }) => [username, wins]),
    [['Alexandru B.', 20], ['Giada C.', 19], ['Dario C.', 18]])
  assert.deepEqual(ranking.filter((player) => player.winStreak > 0).map(({ id, winStreak }) => [id, winStreak]), [[1, 3]])
  assert.ok(ranking.every((player) => player.bestWinStreak >= player.winStreak && player.bestWinStreak <= player.wins))
  assert.ok(mockData.matches.some((match) => match.winnerIds.length === 2))
  assert.deepEqual(buildMatchHistoryRows(mockData)[0].winnerNames, ['Francesco G.', 'Paolo G.'])
})

test('aggiungere un match con più vincitori lascia Player invariati e aggiorna il calcolo', () => {
  const date = new Date('2026-10-25T12:30:00.000Z')
  const next = addMatch(mockData, [2, 3], -2, date)
  assert.deepEqual(next.matches.at(-1), { id: mockData.matches.at(-1).id + 1, date: date.toISOString(), winnerIds: [2, 3], winningScore: -2 })
  assert.equal(next.players, mockData.players)
  assert.equal(mockData.matches.length + 1, next.matches.length)
  const ranking = buildLeaderboard(next)
  assert.equal(ranking.find((player) => player.id === 2).wins, 20)
  assert.equal(ranking.find((player) => player.id === 3).wins, 19)
  assert.deepEqual(ranking.filter((player) => player.winStreak > 0).map(({ id, winStreak }) => [id, winStreak]), [[2, 1], [3, 1]])
  assert.throws(() => addMatch(mockData, [], 0), { code: 'INVALID_PLAYER' })
  assert.throws(() => addMatch(mockData, [2, 999], 0), { code: 'INVALID_PLAYER' })
  assert.throws(() => addMatch(mockData, [2, 2], 0), { code: 'INVALID_PLAYER' })
  assert.throws(() => addMatch(mockData, [2], -5), { code: 'INVALID_WINNING_SCORE' })
  assert.throws(() => addMatch(mockData, [2, 3], -3), { code: 'INVALID_WINNING_SCORE' })
  assert.throws(() => addMatch(mockData, [2, 3, 4], -2), { code: 'INVALID_WINNING_SCORE' })
})

test('i vecchi mock diventano due entità e i match aggiunti restano salvati', () => {
  const previousWindow = globalThis.window
  const oldData = {
    players: mockData.players.map((player) => {
      const [name, ...surname] = player.username.split(' ')
      return { id: player.id, name, surname: surname.join(' '), wins: 0, bestScore: [0] }
    }),
    matches: Array.from({ length: 10 }, (_, index) => ({
      id: 1001 + index,
      date: new Date(Date.UTC(2026, 9, 4 + index)).toISOString(),
      winnerId: index + 1,
      winnerScores: [0],
    })).concat([{ id: 1011, date: '2026-10-25T12:30:00.000Z', winnerIds: [2, 3], winnerScores: [4] }]),
  }
  const storage = new Map([['gamechart-mock-data-v8', JSON.stringify(oldData)]])
  globalThis.window = { localStorage: {
    getItem: (key) => storage.get(key) ?? null,
    setItem: (key, value) => storage.set(key, value),
  } }

  try {
    const migrated = loadMatchData()
    assert.deepEqual(migrated.players, mockData.players)
    assert.equal(migrated.matches.length, mockData.matches.length + 1)
    assert.deepEqual(migrated.matches.at(-1), { id: 1011, date: '2026-10-25T12:30:00.000Z', winnerIds: [2, 3], winningScore: 4 })
    assert.ok(storage.has('gamechart-mock-data-v10'))
  } finally {
    if (previousWindow === undefined) delete globalThis.window
    else globalThis.window = previousWindow
  }
})

test('migra anche uno storico indipendente con username ricavati dai nomi esistenti', () => {
  const previousWindow = globalThis.window
  const storage = new Map([['gamechart-mock-data-v7', JSON.stringify({
    players: [{ id: 1, name: 'Maria Chiara', surname: 'R.', wins: 1 }],
    matches: [{ id: 501, date: '2026-10-20T12:00:00.000Z', winnerId: 1, winnerScores: [0] }],
  })]])
  globalThis.window = { localStorage: {
    getItem: (key) => storage.get(key) ?? null,
    setItem: (key, value) => storage.set(key, value),
  } }

  try {
    assert.deepEqual(loadMatchData(), {
      players: [{ id: 1, username: 'Maria Chiara R.' }],
      matches: [{ id: 501, date: '2026-10-20T12:00:00.000Z', winnerIds: [1], winningScore: 0 }],
    })
  } finally {
    if (previousWindow === undefined) delete globalThis.window
    else globalThis.window = previousWindow
  }
})
