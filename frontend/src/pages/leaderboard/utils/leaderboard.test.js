import test from 'node:test'
import assert from 'node:assert/strict'
import { buildLeaderboard, findLeaderboardPlayer, selectLeaderboardPlayers } from './leaderboard.js'

const data = {
  players: [
    { id: 1, username: 'Émilie R.' },
    { id: 2, username: 'Alessandra Z.' },
    { id: 3, username: 'Dario C.' },
  ],
  matches: [
    { id: 1, date: '2026-10-01T12:00:00.000Z', winnerIds: [1, 2], winningScore: 3 },
    { id: 2, date: '2026-10-02T12:00:00.000Z', winnerIds: [2], winningScore: -4 },
    { id: 3, date: '2026-10-03T12:00:00.000Z', winnerIds: [1, 2], winningScore: -2 },
    { id: 4, date: '2026-10-04T12:00:00.000Z', winnerIds: [3], winningScore: 0 },
  ],
}

test('vittorie e serie derivano dall’ordine cronologico dei match', () => {
  const ranked = buildLeaderboard({ ...data, matches: [...data.matches].reverse() })
  assert.deepEqual(ranked.map(({ id, wins, winStreak, bestWinStreak }) => [id, wins, winStreak, bestWinStreak]),
    [[2, 3, 0, 3], [1, 2, 0, 1], [3, 1, 1, 1]])
  assert.deepEqual(data.players[0], { id: 1, username: 'Émilie R.' })
})

test('ricerca e ordinamenti usano username e statistiche calcolate', () => {
  const ranked = buildLeaderboard(data)
  assert.equal(findLeaderboardPlayer(ranked, 'emilie')?.id, 1)
  assert.deepEqual(selectLeaderboardPlayers(ranked, 'emilie', { key: 'position', direction: 'asc' }, 'it').map((player) => player.id), [2, 1, 3])
  assert.deepEqual(selectLeaderboardPlayers(ranked, '', { key: 'name', direction: 'asc' }, 'it').map((player) => player.id), [2, 3, 1])
  assert.deepEqual(selectLeaderboardPlayers(ranked, '', { key: 'bestWinStreak', direction: 'desc' }, 'it').map((player) => player.id), [2, 1, 3])
  assert.deepEqual(selectLeaderboardPlayers(ranked, '', { key: 'bestScore', direction: 'asc' }, 'it').map((player) => player.id), [2, 1, 3])
})

test('il miglior punteggio dei non vincitori resta vuoto e viene ordinato per ultimo', () => {
  const ranked = buildLeaderboard({ ...data, players: [...data.players, { id: 4, username: 'Nuovo' }] })
  assert.deepEqual(ranked.slice(0, 3).map((player) => player.bestScore), [-4, -2, 0])
  assert.equal(ranked.find((player) => player.id === 4).bestScore, null)
  assert.equal(selectLeaderboardPlayers(ranked, '', { key: 'bestScore', direction: 'desc' }).at(-1).id, 4)
})
