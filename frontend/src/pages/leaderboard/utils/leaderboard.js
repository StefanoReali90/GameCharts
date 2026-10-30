export function buildLeaderboard(data) {
  const stats = new Map(data.players.map((player) => [player.id, {
    wins: 0,
    winStreak: 0,
    bestWinStreak: 0,
    bestScore: null,
  }]))

  const matches = [...data.matches].sort((first, second) => first.date.localeCompare(second.date) || first.id - second.id)
  for (const match of matches) {
    const winners = new Set(match.winnerIds)
    for (const [playerId, entry] of stats) {
      if (winners.has(playerId)) {
        entry.wins += 1
        entry.winStreak += 1
        entry.bestWinStreak = Math.max(entry.bestWinStreak, entry.winStreak)
        if (Number.isInteger(match.winningScore)) {
          entry.bestScore = entry.bestScore === null ? match.winningScore : Math.min(entry.bestScore, match.winningScore)
        }
      } else {
        entry.winStreak = 0
      }
    }
  }

  return data.players
    .map((player) => ({ ...player, ...stats.get(player.id) }))
    .sort((first, second) => second.wins - first.wins || second.bestWinStreak - first.bestWinStreak || first.id - second.id)
    .map((player, index) => ({ ...player, position: index + 1 }))
}

const sortableValues = {
  position: (player) => player.position,
  name: (player) => player.username,
  wins: (player) => player.wins,
  bestWinStreak: (player) => player.bestWinStreak,
  winStreak: (player) => player.winStreak,
  bestScore: (player) => player.bestScore,
}

const searchable = (value) => value.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLocaleLowerCase()

export function findLeaderboardPlayer(players, query) {
  const search = searchable(query.trim())
  if (!search) return null
  return players.find((player) => searchable(player.username) === search)
    ?? players.find((player) => searchable(player.username).startsWith(search))
    ?? players.find((player) => searchable(player.username).includes(search))
    ?? null
}

export function selectLeaderboardPlayers(players, _query, sort, locale = 'en') {
  const getValue = sortableValues[sort.key] ?? sortableValues.position
  const direction = sort.direction === 'desc' ? -1 : 1

  return players
    .slice()
    .sort((first, second) => {
      const firstValue = getValue(first)
      const secondValue = getValue(second)
      if (firstValue === null || secondValue === null) {
        if (firstValue === null && secondValue === null) return first.position - second.position
        return firstValue === null ? 1 : -1
      }
      const order = typeof firstValue === 'string'
        ? firstValue.localeCompare(secondValue, locale, { sensitivity: 'base' })
        : firstValue - secondValue
      return order * direction || first.position - second.position
    })
}
