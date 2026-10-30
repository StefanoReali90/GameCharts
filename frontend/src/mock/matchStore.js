import { mockData } from './mockData.js'

const storageKey = 'gamechart-mock-data-v10'
const previousStorageKeys = [9, 8, 7, 6, 5, 4, 3].map((version) => `gamechart-mock-data-v${version}`)

function isLegacyDemo(data) {
  return data.players.length === mockData.players.length
    && data.matches.length >= 10
    && data.matches.slice(0, 10).every((match, index) => match.id === 1001 + index)
}

function normalizeMatch(match) {
  const winnerIds = Array.isArray(match.winnerIds) ? match.winnerIds.map(Number) : [Number(match.winnerId)]
  if (!Number.isSafeInteger(match.id) || !Number.isFinite(Date.parse(match.date))
    || !winnerIds.length || winnerIds.some((id) => !Number.isSafeInteger(id))
    || new Set(winnerIds).size !== winnerIds.length) {
    throw new Error('INVALID_MATCH_DATA')
  }
  const priorScore = Array.isArray(match.winnerScores)
    ? match.winnerScores.reduce((total, score) => total + score, 0)
    : match.winnerScore
  const previousScore = Number.isSafeInteger(match.winningScore)
    ? match.winningScore : Number.isSafeInteger(priorScore) ? priorScore : 0
  const winningScore = Math.max(-Math.floor(4 / winnerIds.length), previousScore)
  return { id: match.id, date: match.date, winnerIds, winningScore }
}

function normalizeLegacyData(data) {
  if (data.players.length === mockData.players.length
    && data.matches.length >= mockData.matches.length
    && data.matches.slice(0, mockData.matches.length).every((match, index) => match.id === mockData.matches[index].id)) {
    const demo = structuredClone(mockData)
    return { ...demo, matches: [...demo.matches, ...data.matches.slice(demo.matches.length).map(normalizeMatch)] }
  }
  if (isLegacyDemo(data)) {
    const demo = structuredClone(mockData)
    return { ...demo, matches: [...demo.matches, ...data.matches.slice(10).map(normalizeMatch)] }
  }

  const players = data.players.map((player) => ({
    id: player.id,
    username: typeof player.username === 'string'
      ? player.username.trim()
      : `${player.name ?? ''} ${player.surname ?? ''}`.trim(),
  }))
  const usernames = players.map((player) => player.username.toLocaleLowerCase())
  if (players.some((player) => !Number.isSafeInteger(player.id) || !player.username)
    || new Set(usernames).size !== players.length
    || new Set(players.map((player) => player.id)).size !== players.length) {
    throw new Error('INVALID_PLAYER_DATA')
  }
  return { players, matches: data.matches.map(normalizeMatch) }
}

export function loadMatchData() {
  try {
    const saved = JSON.parse(window.localStorage.getItem(storageKey))
    if (saved && Array.isArray(saved.players) && Array.isArray(saved.matches)) return saved

    for (const previousKey of previousStorageKeys) {
      const previous = JSON.parse(window.localStorage.getItem(previousKey))
      if (previous && Array.isArray(previous.players) && Array.isArray(previous.matches)) {
        const migrated = normalizeLegacyData(previous)
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

export function addMatch(data, winnerIds, winningScore, date = new Date()) {
  const playerIds = Array.isArray(winnerIds) ? winnerIds.map(Number) : []
  const validPlayers = new Set(data.players.map((player) => player.id))
  if (!playerIds.length || new Set(playerIds).size !== playerIds.length
    || playerIds.some((id) => !Number.isSafeInteger(id) || !validPlayers.has(id))) {
    const error = new Error('INVALID_PLAYER')
    error.code = 'INVALID_PLAYER'
    throw error
  }
  if (!Number.isSafeInteger(winningScore) || winningScore < -Math.floor(4 / playerIds.length)) {
    const error = new Error('INVALID_WINNING_SCORE')
    error.code = 'INVALID_WINNING_SCORE'
    throw error
  }
  return {
    players: data.players,
    matches: [...data.matches, {
      id: Math.max(0, ...data.matches.map((match) => match.id)) + 1,
      date: date.toISOString(),
      winnerIds: playerIds,
      winningScore,
    }],
  }
}
