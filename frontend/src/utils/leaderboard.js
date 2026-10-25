export function buildLeaderboard(data) {
  return [...data.players]
    .map((player) => ({ ...player, fullName: `${player.name} ${player.surname}` }))
    .sort((first, second) => second.wins - first.wins || second.bestScore - first.bestScore || first.id - second.id)
    .map((player, index) => ({ ...player, position: index + 1 }))
}

const sortableValues = {
  position: (player) => player.position,
  name: (player) => player.fullName,
  wins: (player) => player.wins,
  winStreak: (player) => player.winStreak,
  bestScore: (player) => player.bestScore,
}

const searchable = (value) => value.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLocaleLowerCase()

export function selectLeaderboardPlayers(players, query, sort, locale = 'en') {
  const search = searchable(query.trim())
  const getValue = sortableValues[sort.key] ?? sortableValues.position
  const direction = sort.direction === 'desc' ? -1 : 1

  return players
    .filter((player) => !search || searchable(player.fullName).includes(search))
    .sort((first, second) => {
      const firstValue = getValue(first)
      const secondValue = getValue(second)
      const order = typeof firstValue === 'string'
        ? firstValue.localeCompare(secondValue, locale, { sensitivity: 'base' })
        : firstValue - secondValue
      return order * direction || first.position - second.position
    })
}
