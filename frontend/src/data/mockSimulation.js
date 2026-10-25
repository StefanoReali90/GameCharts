import { addMatch } from './matchStore.js'

export const MOCK_MATCH_INTERVAL_MS = 11_000
const simulationTimeKey = 'gamechart-last-mock-match-time-v1'
const maxCatchUpMatches = 24

export function readSimulationTime(storage = window.localStorage) {
  try {
    const value = Number(storage.getItem(simulationTimeKey))
    return Number.isSafeInteger(value) && value > 0 ? value : null
  } catch {
    return null
  }
}

export function saveSimulationTime(time, storage = window.localStorage) {
  try {
    storage.setItem(simulationTimeKey, String(time))
  } catch {
    // La simulazione continua nella sessione anche senza localStorage.
  }
}

export function simulateMissedMatches(data, lastTime, now, random = Math.random) {
  if (!Number.isSafeInteger(lastTime) || !Number.isSafeInteger(now) || now <= lastTime) return data
  const count = Math.min(maxCatchUpMatches, Math.floor((now - lastTime) / MOCK_MATCH_INTERVAL_MS))
  let next = data
  for (let index = 0; index < count; index += 1) {
    const date = new Date(lastTime + Math.round((now - lastTime) * (index + 1) / count))
    next = simulateNextMatch(next, random, date)
  }
  return next
}

const randomIndex = (random, length) => Math.min(length - 1, Math.floor(Math.max(0, random()) * length))

export function simulateMatchOutcome(data, random = Math.random) {
  const candidates = data.players.map((player) => player.id)
  if (!candidates.length) throw new Error('NO_PLAYERS')

  const participantCount = Math.min(candidates.length, 4 + randomIndex(random, 4))
  const participants = []
  const repeatWinner = data.matches.at(-1)?.winnerIds?.[0]
  if (candidates.includes(repeatWinner) && random() < 0.35) {
    participants.push(repeatWinner)
    candidates.splice(candidates.indexOf(repeatWinner), 1)
  }
  while (participants.length < participantCount) {
    participants.push(candidates.splice(randomIndex(random, candidates.length), 1)[0])
  }

  const tieRoll = random()
  const winnerCount = Math.min(participantCount, tieRoll < 0.82 ? 1 : tieRoll < 0.97 ? 2 : 3)
  const lowestPossibleScore = -Math.floor(4 / winnerCount)
  const winningTarget = lowestPossibleScore + randomIndex(random, 19)
  const results = participants.map((playerId, index) => {
    const score = index < winnerCount
      ? winningTarget
      : Math.max(0, winningTarget + 1 + randomIndex(random, 10))
    return { playerId, score, jokersUsed: Math.max(0, -score) }
  })
  const winningScore = Math.min(...results.map((result) => result.score))
  const winnerIds = results.filter((result) => result.score === winningScore).map((result) => result.playerId)

  return { results, winnerIds, winningScore }
}

export function simulateNextMatch(data, random = Math.random, date = new Date()) {
  const { winnerIds, winningScore } = simulateMatchOutcome(data, random)
  return addMatch(data, winnerIds, winningScore, date)
}

export function startMockSimulation(onTick) {
  const timer = window.setInterval(onTick, MOCK_MATCH_INTERVAL_MS)
  return () => window.clearInterval(timer)
}
