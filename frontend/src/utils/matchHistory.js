export function buildMatchHistoryRows(data, unknownPlayer = 'Giocatore sconosciuto') {
  const players = new Map(data.players.map((player) => [player.id, player.username]))
  return data.matches.map((match) => ({
    ...match,
    winnerNames: match.winnerIds.map((id) => players.get(id) ?? unknownPlayer),
  }))
}

const searchable = (value) => value.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLocaleLowerCase()

export function selectMatchHistoryRows(rows, { periodStart = null, winnerQuery = '', sort = { key: 'date', direction: 'desc' } } = {}, locale = 'it') {
  const query = searchable(winnerQuery.trim())
  const direction = sort.direction === 'asc' ? 1 : -1
  return rows
    .filter((match) => (!periodStart || new Date(match.date) >= periodStart)
      && (!query || match.winnerNames.some((name) => searchable(name).includes(query))))
    .sort((first, second) => {
      const order = sort.key === 'winningScore'
        ? first.winningScore - second.winningScore
        : sort.key === 'winners'
          ? first.winnerNames.join(', ').localeCompare(second.winnerNames.join(', '), locale, { sensitivity: 'base' })
          : first.date.localeCompare(second.date)
      return order * direction || second.id - first.id
    })
}
