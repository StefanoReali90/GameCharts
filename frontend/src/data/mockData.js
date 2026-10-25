// Player: id, name, surname, wins, winStreak, bestWinStreak e bestScore (lista di interi).
// Match: id, date, winnerIds (lista di riferimenti a Player.id) e winnerScores.
// Una partita con più vincitori resta un solo Match. La data viene assegnata
// automaticamente: ogni vincitore guadagna una vittoria e un punto di serie;
// il punteggio più basso migliora se la somma è minore. Le serie degli altri tornano a zero.
// Le vittorie iniziali sono dati dimostrativi (da 1 a 20), indipendenti dai soli
// match visibili nello storico. Solo il vincitore delle ultime tre partite ha una
// serie attiva; quando si aggiunge un match, tutte le altre serie si azzerano.
export const mockData = {
  players: [
    { id: 1, name: 'Alexandru', surname: 'B.', wins: 20, winStreak: 3, bestScore: 0 },
    { id: 2, name: 'Giada', surname: 'C.', wins: 19, winStreak: 0, bestScore: 0 },
    { id: 3, name: 'Dario', surname: 'C.', wins: 18, winStreak: 0, bestScore: 0 },
    { id: 4, name: 'Andrei', surname: 'C.', wins: 17, winStreak: 0, bestScore: 0 },
    { id: 5, name: 'Salvatore', surname: 'C.', wins: 16, winStreak: 0, bestScore: 0 },
    { id: 6, name: 'Giuseppe', surname: 'D. S.', wins: 15, winStreak: 0, bestScore: 0 },
    { id: 7, name: 'Francesco', surname: 'G.', wins: 14, winStreak: 0, bestScore: 0 },
    { id: 8, name: 'Paolo', surname: 'G.', wins: 13, winStreak: 0, bestScore: 0 },
    { id: 9, name: 'Peter', surname: 'H.', wins: 12, winStreak: 0, bestScore: 0 },
    { id: 10, name: 'Federico', surname: 'S. H.', wins: 11, winStreak: 0, bestScore: 0 },
    { id: 11, name: 'Ludovico', surname: 'L.', wins: 10, winStreak: 0, bestScore: 0 },
    { id: 12, name: 'Stefano', surname: 'M.', wins: 9, winStreak: 0, bestScore: 0 },
    { id: 13, name: 'Francesca', surname: 'M.', wins: 8, winStreak: 0, bestScore: 0 },
    { id: 14, name: 'Martina', surname: 'N.', wins: 7, winStreak: 0, bestScore: 0 },
    { id: 15, name: 'Giuseppe', surname: 'N.', wins: 6, winStreak: 0, bestScore: 0 },
    { id: 16, name: 'Simone', surname: 'N.', wins: 5, winStreak: 0, bestScore: 0 },
    { id: 17, name: 'Maria Chiara', surname: 'R.', wins: 4, winStreak: 0, bestScore: 0 },
    { id: 18, name: 'Federico', surname: 'R.', wins: 3, winStreak: 0, bestScore: 0 },
    { id: 19, name: 'Nasim', surname: 'S.', wins: 2, winStreak: 0, bestScore: 0 },
    { id: 20, name: 'Anatoliy', surname: 'S.', wins: 1, winStreak: 0, bestScore: 0 },
    { id: 21, name: 'Riccardo', surname: 'S.', wins: 1, winStreak: 0, bestScore: 0 },
    { id: 22, name: 'Fabio', surname: 'S.', wins: 1, winStreak: 0, bestScore: 0 },
    { id: 23, name: 'Tanase', surname: 'A. I.', wins: 1, winStreak: 0, bestScore: 0 },
    { id: 24, name: 'Niccolò', surname: 'T.', wins: 1, winStreak: 0, bestScore: 0 },
    { id: 25, name: 'Khrystyna', surname: 'T.', wins: 1, winStreak: 0, bestScore: 0 },
    { id: 26, name: 'Tuca', surname: 'L.', wins: 1, winStreak: 0, bestScore: 0 },
    { id: 27, name: 'Luca', surname: 'V.', wins: 1, winStreak: 0, bestScore: 0 },
    { id: 28, name: 'Tito', surname: 'V.', wins: 1, winStreak: 0, bestScore: 0 },
    { id: 29, name: 'Alessandra', surname: 'Z.', wins: 1, winStreak: 0, bestScore: 0 },
  ].map((player) => ({
    ...player,
    bestWinStreak: Math.max(player.winStreak, Math.min(player.wins, Math.ceil(player.wins / 4))),
    bestScore: [player.bestScore],
  })),
  matches: [
    { id: 1001, date: '2026-10-04T19:10:00.000Z', winnerIds: [7, 8], winnerScores: [0] },
    { id: 1002, date: '2026-10-06T17:30:00.000Z', winnerIds: [6], winnerScores: [0] },
    { id: 1003, date: '2026-10-08T20:00:00.000Z', winnerIds: [5], winnerScores: [0] },
    { id: 1004, date: '2026-10-10T18:20:00.000Z', winnerIds: [4], winnerScores: [0] },
    { id: 1005, date: '2026-10-12T19:30:00.000Z', winnerIds: [3], winnerScores: [0] },
    { id: 1006, date: '2026-10-14T18:00:00.000Z', winnerIds: [2], winnerScores: [0] },
    { id: 1007, date: '2026-10-16T20:15:00.000Z', winnerIds: [1], winnerScores: [0] },
    { id: 1008, date: '2026-10-18T17:45:00.000Z', winnerIds: [1], winnerScores: [0] },
    { id: 1009, date: '2026-10-20T19:00:00.000Z', winnerIds: [1], winnerScores: [0] },
    { id: 1010, date: '2026-10-22T18:30:00.000Z', winnerIds: [1], winnerScores: [0] },
  ],
}
