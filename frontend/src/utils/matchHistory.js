export function buildMatchHistoryRows(data, unknownPlayer = 'Giocatore sconosciuto') {
  const players = new Map(data.players.map((player) => [player.id, `${player.name} ${player.surname}`]))
  return data.matches.map((match) => ({
    ...match,
    winnerNames: match.winnerIds.map((id) => players.get(id) ?? unknownPlayer),
  }))
}
