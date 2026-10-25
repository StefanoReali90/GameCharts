export function buildMatchHistoryRows(data, unknownPlayer = 'Giocatore sconosciuto') {
  const players = new Map(data.players.map((player) => [player.id, `${player.name} ${player.surname}`]))
  return data.matches.map((match) => ({
    ...match,
    winnerName: players.get(match.winnerId) ?? unknownPlayer,
  }))
}
