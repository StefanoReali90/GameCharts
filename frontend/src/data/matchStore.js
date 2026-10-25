import { mockData } from './mockData.js'
import { scoreTotal, validateScores } from '../utils/scores.js'

const storageKey = 'gamechart-mock-data-v4'
const previousStorageKey = 'gamechart-mock-data-v3'

export function loadMatchData() {
  try {
    const saved = JSON.parse(window.localStorage.getItem(storageKey))
    if (saved && Array.isArray(saved.players) && Array.isArray(saved.matches)) return saved

    const previous = JSON.parse(window.localStorage.getItem(previousStorageKey))
    if (previous && Array.isArray(previous.players) && Array.isArray(previous.matches)) {
      const migrated = {
        players: previous.players,
        matches: previous.matches.map(({ winnerScore, ...match }) => ({ ...match, winnerScores: [winnerScore] })),
      }
      window.localStorage.setItem(storageKey, JSON.stringify(migrated))
      return migrated
    }
  } catch {
    // La demo resta utilizzabile anche se il browser blocca localStorage.
  }
  return structuredClone(mockData)
}

export function saveMatchData(data) {
  try {
    window.localStorage.setItem(storageKey, JSON.stringify(data))
  } catch {
    // Lo stato React continua a funzionare per la sessione corrente.
  }
}

export function addMatch(data, winnerId, winnerScores, date = new Date()) {
  const playerId = Number(winnerId)
  if (!data.players.some((player) => player.id === playerId)) {
    const error = new Error('INVALID_PLAYER')
    error.code = 'INVALID_PLAYER'
    throw error
  }
  const scores = [...validateScores(winnerScores)]
  const total = scoreTotal(scores)

  const match = {
    id: Math.max(0, ...data.matches.map((item) => item.id)) + 1,
    date: date.toISOString(),
    winnerId: playerId,
    winnerScores: scores,
  }
  return {
    players: data.players.map((player) => player.id === playerId
      ? { ...player, wins: player.wins + 1, winStreak: player.winStreak + 1, bestScore: player.wins === 0 ? total : Math.max(player.bestScore, total) }
      : { ...player, winStreak: 0 }),
    matches: [...data.matches, match],
  }
}
