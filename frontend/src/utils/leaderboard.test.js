import test from 'node:test'
import assert from 'node:assert/strict'
import { selectLeaderboardPlayers } from './leaderboard.js'

const players = [
  { id: 1, fullName: 'Émilie R.', position: 1, wins: 5, winStreak: 1, bestScore: 20 },
  { id: 2, fullName: 'Alessandra Z.', position: 2, wins: 3, winStreak: 3, bestScore: 40 },
  { id: 3, fullName: 'Dario C.', position: 3, wins: 2, winStreak: 0, bestScore: 30 },
]

test('la ricerca trova anche i nomi accentati e mantiene la posizione originale', () => {
  const result = selectLeaderboardPlayers(players, 'emilie', { key: 'position', direction: 'asc' }, 'it')
  assert.deepEqual(result.map(({ id, position }) => [id, position]), [[1, 1]])
})

test('ordina nomi e colonne numeriche senza modificare la classifica di partenza', () => {
  assert.deepEqual(selectLeaderboardPlayers(players, '', { key: 'name', direction: 'asc' }, 'it').map((player) => player.id), [2, 3, 1])
  assert.deepEqual(selectLeaderboardPlayers(players, '', { key: 'winStreak', direction: 'desc' }, 'it').map((player) => player.id), [2, 1, 3])
  assert.deepEqual(selectLeaderboardPlayers(players, '', { key: 'bestScore', direction: 'asc' }, 'it').map((player) => player.id), [1, 3, 2])
  assert.deepEqual(players.map((player) => player.id), [1, 2, 3])
})
