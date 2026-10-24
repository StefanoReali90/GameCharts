export function buildMatchHistoryRows(data) {
  const players = new Map(data.players.map((player) => [player.id, `${player.name} ${player.surname}`]))
  const games = new Map(data.games.map((game) => [game.id, game.name]))
  const resultsByMatch = new Map()

  data.matchResults.forEach((result) => {
    const results = resultsByMatch.get(result.matchId) ?? []
    results.push(result)
    resultsByMatch.set(result.matchId, results)
  })

  return data.matches.map((match) => ({
    id: match.id,
    date: match.registeredAt.slice(0, 10),
    gameId: match.gameId,
    gameName: games.get(match.gameId) ?? 'Gioco sconosciuto',
    callerName: players.get(match.callerId) ?? 'Non indicato',
    winnerNames: match.winnerIds.map((playerId) => players.get(playerId) ?? 'Non indicato'),
    scores: (resultsByMatch.get(match.id) ?? []).map((result) => ({
      playerName: players.get(result.playerId) ?? 'Giocatore',
      score: result.score,
    })),
  }))
}
