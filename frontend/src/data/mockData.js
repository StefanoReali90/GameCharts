// Player: id, name, surname, wins, winStreak e bestScore.
// Match: id, date, winnerId (riferimento a Player.id) e winnerScores (lista di interi).
// Quando si aggiunge un match, la data viene assegnata automaticamente: il vincitore
// guadagna una vittoria e un punto di serie; il record totale migliora se la
// somma dei nuovi punteggi è più alta e le serie degli altri tornano a zero.
// Lo storico qui sotto è solo dimostrativo: le statistiche iniziali dei Player
// restano a zero e vengono aggiornate soltanto dai nuovi match aggiunti nell'app.
export const mockData = {
  players: [
    { id: 1, name: 'Alexandru', surname: 'B.', wins: 0, winStreak: 0, bestScore: 0 },
    { id: 2, name: 'Giada', surname: 'C.', wins: 0, winStreak: 0, bestScore: 0 },
    { id: 3, name: 'Dario', surname: 'C.', wins: 0, winStreak: 0, bestScore: 0 },
    { id: 4, name: 'Andrei', surname: 'C.', wins: 0, winStreak: 0, bestScore: 0 },
    { id: 5, name: 'Salvatore', surname: 'C.', wins: 0, winStreak: 0, bestScore: 0 },
    { id: 6, name: 'Giuseppe', surname: 'D. S.', wins: 0, winStreak: 0, bestScore: 0 },
    { id: 7, name: 'Francesco', surname: 'G.', wins: 0, winStreak: 0, bestScore: 0 },
    { id: 8, name: 'Paolo', surname: 'G.', wins: 0, winStreak: 0, bestScore: 0 },
    { id: 9, name: 'Peter', surname: 'H.', wins: 0, winStreak: 0, bestScore: 0 },
    { id: 10, name: 'Federico', surname: 'S. H.', wins: 0, winStreak: 0, bestScore: 0 },
    { id: 11, name: 'Ludovico', surname: 'L.', wins: 0, winStreak: 0, bestScore: 0 },
    { id: 12, name: 'Stefano', surname: 'M.', wins: 0, winStreak: 0, bestScore: 0 },
    { id: 13, name: 'Francesca', surname: 'M.', wins: 0, winStreak: 0, bestScore: 0 },
    { id: 14, name: 'Martina', surname: 'N.', wins: 0, winStreak: 0, bestScore: 0 },
    { id: 15, name: 'Giuseppe', surname: 'N.', wins: 0, winStreak: 0, bestScore: 0 },
    { id: 16, name: 'Simone', surname: 'N.', wins: 0, winStreak: 0, bestScore: 0 },
    { id: 17, name: 'Maria Chiara', surname: 'R.', wins: 0, winStreak: 0, bestScore: 0 },
    { id: 18, name: 'Federico', surname: 'R.', wins: 0, winStreak: 0, bestScore: 0 },
    { id: 19, name: 'Nasim', surname: 'S.', wins: 0, winStreak: 0, bestScore: 0 },
    { id: 20, name: 'Anatoliy', surname: 'S.', wins: 0, winStreak: 0, bestScore: 0 },
    { id: 21, name: 'Riccardo', surname: 'S.', wins: 0, winStreak: 0, bestScore: 0 },
    { id: 22, name: 'Fabio', surname: 'S.', wins: 0, winStreak: 0, bestScore: 0 },
    { id: 23, name: 'Tanase', surname: 'A. I.', wins: 0, winStreak: 0, bestScore: 0 },
    { id: 24, name: 'Niccolò', surname: 'T.', wins: 0, winStreak: 0, bestScore: 0 },
    { id: 25, name: 'Khrystyna', surname: 'T.', wins: 0, winStreak: 0, bestScore: 0 },
    { id: 26, name: 'Tuca', surname: 'L.', wins: 0, winStreak: 0, bestScore: 0 },
    { id: 27, name: 'Luca', surname: 'V.', wins: 0, winStreak: 0, bestScore: 0 },
    { id: 28, name: 'Tito', surname: 'V.', wins: 0, winStreak: 0, bestScore: 0 },
    { id: 29, name: 'Alessandra', surname: 'Z.', wins: 0, winStreak: 0, bestScore: 0 },
  ],
  matches: [
    { id: 1001, date: '2026-10-04T19:10:00.000Z', winnerId: 7, winnerScores: [0] },
    { id: 1002, date: '2026-10-06T17:30:00.000Z', winnerId: 6, winnerScores: [0] },
    { id: 1003, date: '2026-10-08T20:00:00.000Z', winnerId: 5, winnerScores: [0] },
    { id: 1004, date: '2026-10-10T18:20:00.000Z', winnerId: 4, winnerScores: [0] },
    { id: 1005, date: '2026-10-12T19:30:00.000Z', winnerId: 3, winnerScores: [0] },
    { id: 1006, date: '2026-10-14T18:00:00.000Z', winnerId: 2, winnerScores: [0] },
    { id: 1007, date: '2026-10-16T20:15:00.000Z', winnerId: 1, winnerScores: [0] },
    { id: 1008, date: '2026-10-18T17:45:00.000Z', winnerId: 17, winnerScores: [0] },
    { id: 1009, date: '2026-10-20T19:00:00.000Z', winnerId: 23, winnerScores: [0] },
    { id: 1010, date: '2026-10-22T18:30:00.000Z', winnerId: 29, winnerScores: [0] },
  ],
}
