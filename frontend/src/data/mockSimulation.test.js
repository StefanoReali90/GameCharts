import test from 'node:test'
import assert from 'node:assert/strict'
import { mockData } from './mockData.js'
import { MOCK_MATCH_INTERVAL_MS, simulateMatchOutcome, simulateMissedMatches, simulateNextMatch, startMockSimulation } from './mockSimulation.js'
import { buildLeaderboard } from '../utils/leaderboard.js'

test('la simulazione sceglie sempre il punteggio minimo con al massimo quattro jolly', () => {
  let seed = 23
  const random = () => {
    seed = (seed * 16807) % 2147483647
    return seed / 2147483647
  }
  const winnerCounts = new Set()
  let negativeResults = 0

  for (let index = 0; index < 600; index += 1) {
    const outcome = simulateMatchOutcome(mockData, random)
    const lowest = Math.min(...outcome.results.map((result) => result.score))
    winnerCounts.add(outcome.winnerIds.length)
    if (lowest < 0) negativeResults += 1
    assert.equal(outcome.winningScore, lowest)
    assert.deepEqual(outcome.winnerIds, outcome.results.filter((result) => result.score === lowest).map((result) => result.playerId))
    assert.ok(lowest >= -4)
    assert.ok(outcome.results.reduce((total, result) => total + result.jokersUsed, 0) <= 4)
    assert.ok(outcome.winnerIds.length >= 1 && outcome.winnerIds.length <= 3)
  }
  assert.deepEqual([...winnerCounts].sort(), [1, 2, 3])
  assert.ok(negativeResults > 0)
})

test('un tick aggiunge un match e aggiorna immediatamente vittorie e serie derivate', () => {
  const date = new Date('2026-10-25T12:30:00.000Z')
  const next = simulateNextMatch(mockData, () => 0, date)
  const match = next.matches.at(-1)
  assert.equal(next.matches.length, mockData.matches.length + 1)
  assert.equal(match.date, date.toISOString())
  assert.ok(match.winningScore >= -4)
  const ranking = buildLeaderboard(next)
  assert.deepEqual(ranking.filter((player) => player.winStreak > 0).map((player) => player.id), match.winnerIds)
})

test('alla riapertura recupera i match della demo senza generarne migliaia', () => {
  const lastTime = Date.parse('2026-10-25T12:00:00.000Z')
  const recent = simulateMissedMatches(mockData, lastTime, lastTime + MOCK_MATCH_INTERVAL_MS * 3, () => 0)
  assert.equal(recent.matches.length, mockData.matches.length + 3)
  assert.equal(recent.matches.at(-1).date, new Date(lastTime + MOCK_MATCH_INTERVAL_MS * 3).toISOString())
  const overnight = simulateMissedMatches(mockData, lastTime, lastTime + 86_400_000, () => 0)
  assert.equal(overnight.matches.length, mockData.matches.length + 24)
})

test('il timer della demo usa undici secondi e rilascia la sessione alla chiusura', () => {
  const previousWindow = globalThis.window
  let registered
  let cleared
  globalThis.window = {
    setInterval: (callback, delay) => { registered = { callback, delay }; return 42 },
    clearInterval: (id) => { cleared = id },
  }
  try {
    let ticks = 0
    const stop = startMockSimulation(() => { ticks += 1 })
    assert.equal(registered.delay, MOCK_MATCH_INTERVAL_MS)
    registered.callback()
    assert.equal(ticks, 1)
    stop()
    assert.equal(cleared, 42)
  } finally {
    if (previousWindow === undefined) delete globalThis.window
    else globalThis.window = previousWindow
  }
})
