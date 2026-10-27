import test from 'node:test'
import assert from 'node:assert/strict'
import { buildMatchHistoryRows, selectMatchHistoryRows } from './matchHistory.js'

const rows = buildMatchHistoryRows({
  players: [{ id: 1, username: 'Émilie R.' }, { id: 2, username: 'Giada C.' }],
  matches: [
    { id: 1, date: '2026-10-01T12:00:00.000Z', winnerIds: [1], winningScore: -4 },
    { id: 2, date: '2026-10-20T12:00:00.000Z', winnerIds: [1, 2], winningScore: 3 },
  ],
})

test('lo storico conserva identità e ordine dei vincitori per i collegamenti alla classifica', () => {
  assert.deepEqual(rows[1].winners, [
    { id: 1, username: 'Émilie R.', known: true },
    { id: 2, username: 'Giada C.', known: true },
  ])
  const [unknown] = buildMatchHistoryRows({
    players: [],
    matches: [{ id: 3, date: '2026-10-21T12:00:00.000Z', winnerIds: [99], winningScore: 0 }],
  }, 'Sconosciuto')
  assert.deepEqual(unknown.winners, [{ id: 99, username: 'Sconosciuto', known: false }])
})

test('lo storico filtra per vincitore e periodo e ordina il punteggio anche sotto zero', () => {
  assert.deepEqual(selectMatchHistoryRows(rows, { winnerQuery: 'emilie' }).map((match) => match.id), [2, 1])
  assert.deepEqual(selectMatchHistoryRows(rows, { periodStart: new Date('2026-10-10') }).map((match) => match.id), [2])
  assert.deepEqual(selectMatchHistoryRows(rows, { sort: { key: 'winningScore', direction: 'asc' } }).map((match) => match.winningScore), [-4, 3])
  assert.deepEqual(selectMatchHistoryRows(rows, { winnerQuery: 'giada' }).map((match) => match.id), [2])
})
