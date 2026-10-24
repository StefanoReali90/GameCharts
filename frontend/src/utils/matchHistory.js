export function buildMatchHistoryRows(data) {
  const players = new Map(data.players.map((player) => [player.id, `${player.name} ${player.surname}`]))
  const games = new Map(data.games.map((game) => [game.id, game.name]))
  return data.matches.map((match) => ({
    id: match.id,
    registeredAt: match.registeredAt,
    gameId: match.gameId,
    gameName: games.get(match.gameId) ?? 'Gioco sconosciuto',
    callerName: players.get(match.callerId) ?? 'Non indicato',
    winnerNames: match.winnerIds.map((playerId) => players.get(playerId) ?? 'Non indicato'),
    results: match.results.map((result) => ({
      id: result.id,
      playerName: players.get(result.playerId) ?? 'Giocatore',
      score: result.score,
      winner: match.winnerIds.includes(result.playerId),
    })),
  }))
}
