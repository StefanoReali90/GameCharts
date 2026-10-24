export function buildLeaderboard(data, gameId, year) {
  const players = new Map(data.players.map((player) => [player.id, player]))
  const wins = new Map()

  data.matches.forEach((match) => {
    if (match.gameId !== Number(gameId) || !match.registeredAt.startsWith(String(year))) return

    match.winnerIds.forEach((playerId) => {
      const player = players.get(playerId)
      if (!player) return

      const entry = wins.get(playerId) ?? {
        id: playerId,
        name: `${player.name} ${player.surname}`,
        wins: 0,
        lastWinAt: match.registeredAt,
      }
      entry.wins += 1
      if (match.registeredAt > entry.lastWinAt) entry.lastWinAt = match.registeredAt
      wins.set(playerId, entry)
    })
  })

  return [...wins.values()].sort((first, second) =>
    second.wins - first.wins || first.name.localeCompare(second.name, 'it-IT'))
}
