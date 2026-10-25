import { mockData } from './mockData.js'
import { scoreTotal, validateScores } from '../utils/scores.js'

const storageKey = 'gamechart-mock-data-v8'
const previousStorageKeys = ['gamechart-mock-data-v7', 'gamechart-mock-data-v6', 'gamechart-mock-data-v5', 'gamechart-mock-data-v4', 'gamechart-mock-data-v3']

function isUntouchedDemo(data) {
  return data.players.length === mockData.players.length
    && data.players.every((player) => player.wins === 0 && player.winStreak === 0)
    && data.matches.length === mockData.matches.length
    && data.matches.every((match, index) => match.id === mockData.matches[index].id)
}

function isSeededDemo(data) {
  return data.players.length === mockData.players.length
    && data.players.every((player, index) => player.id === mockData.players[index].id
      && player.wins === mockData.players[index].wins
      && player.winStreak === mockData.players[index].winStreak)
    && data.matches.length === mockData.matches.length
    && data.matches.every((match, index) => match.id === mockData.matches[index].id)
}

function migrateLowestScore(previous) {
  const matches = previous.matches.map(({ winnerScore, ...match }) => ({
    ...match,
    winnerScores: Array.isArray(match.winnerScores) ? match.winnerScores : [winnerScore],
  }))
  const players = previous.players.map((player) => {
    if (!player.wins) return { ...player, bestScore: 0 }
    const recentWins = matches.filter((match) => match.winnerId === player.id).slice(-player.wins)
    return recentWins.length
      ? { ...player, bestScore: Math.min(...recentWins.map((match) => scoreTotal(match.winnerScores))) }
      : player
  })
  return { players, matches }
}

function migrateWinners(previous) {
  const matches = previous.matches.map(({ winnerId, ...match }) => ({
    ...match,
    winnerIds: Array.isArray(match.winnerIds) ? match.winnerIds : [winnerId],
  }))
  return {
    ...previous,
    players: previous.players.map((player) => ({
      ...player,
      bestWinStreak: Math.max(player.winStreak ?? 0, player.bestWinStreak ?? 0),
      bestScore: Array.isArray(player.bestScore) ? player.bestScore : (
        matches.findLast((match) => match.winnerIds.includes(player.id)
          && scoreTotal(match.winnerScores) === player.bestScore)?.winnerScores ?? [player.bestScore ?? 0]
      ),
    })),
    matches,
  }
}

export function loadMatchData() {
  try {
    const saved = JSON.parse(window.localStorage.getItem(storageKey))
    if (saved && Array.isArray(saved.players) && Array.isArray(saved.matches)) return saved

    for (const previousKey of previousStorageKeys) {
      const previous = JSON.parse(window.localStorage.getItem(previousKey))
      if (previous && Array.isArray(previous.players) && Array.isArray(previous.matches)) {
        const migrated = isUntouchedDemo(previous) || isSeededDemo(previous)
          ? structuredClone(mockData)
          : migrateWinners(previousKey.endsWith('-v7') || previousKey.endsWith('-v6') || previousKey.endsWith('-v5')
            ? previous : migrateLowestScore(previous))
        window.localStorage.setItem(storageKey, JSON.stringify(migrated))
        return migrated
      }
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

export function addMatch(data, winnerIds, winnerScores, date = new Date()) {
  const playerIds = Array.isArray(winnerIds) ? winnerIds.map(Number) : []
  const validPlayers = new Set(data.players.map((player) => player.id))
  if (!playerIds.length || new Set(playerIds).size !== playerIds.length
    || playerIds.some((id) => !Number.isSafeInteger(id) || !validPlayers.has(id))) {
    const error = new Error('INVALID_PLAYER')
    error.code = 'INVALID_PLAYER'
    throw error
  }
  const scores = [...validateScores(winnerScores)]
  const total = scoreTotal(scores)

  const match = {
    id: Math.max(0, ...data.matches.map((item) => item.id)) + 1,
    date: date.toISOString(),
    winnerIds: playerIds,
    winnerScores: scores,
  }
  return {
    players: data.players.map((player) => playerIds.includes(player.id)
      ? { ...player, wins: player.wins + 1, winStreak: player.winStreak + 1,
        bestWinStreak: Math.max(player.bestWinStreak ?? 0, player.winStreak + 1),
        bestScore: player.wins === 0 || total < scoreTotal(player.bestScore) ? [...scores] : player.bestScore }
      : { ...player, winStreak: 0 }),
    matches: [...data.matches, match],
  }
}
