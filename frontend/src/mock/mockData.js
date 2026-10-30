// I soli dati di dominio della demo sono Player e Match.
// Player: id e username obbligatorio e univoco (anche senza distinguere maiuscole).
// Match: id, date, winnerIds e winningScore (almeno -4: nel mazzo ci sono quattro jolly).
// Vittorie, serie attuale e miglior serie si calcolano dai match; non sono salvate su Player.
const players = [
  { id: 1, username: 'Alexandru B.' },
  { id: 2, username: 'Giada C.' },
  { id: 3, username: 'Dario C.' },
  { id: 4, username: 'Andrei C.' },
  { id: 5, username: 'Salvatore C.' },
  { id: 6, username: 'Giuseppe D. S.' },
  { id: 7, username: 'Francesco G.' },
  { id: 8, username: 'Paolo G.' },
  { id: 9, username: 'Peter H.' },
  { id: 10, username: 'Federico S. H.' },
  { id: 11, username: 'Ludovico L.' },
  { id: 12, username: 'Stefano M.' },
  { id: 13, username: 'Francesca M.' },
  { id: 14, username: 'Martina N.' },
  { id: 15, username: 'Giuseppe N.' },
  { id: 16, username: 'Simone N.' },
  { id: 17, username: 'Maria Chiara R.' },
  { id: 18, username: 'Federico R.' },
  { id: 19, username: 'Nasim S.' },
  { id: 20, username: 'Anatoliy S.' },
  { id: 21, username: 'Riccardo S.' },
  { id: 22, username: 'Fabio S.' },
  { id: 23, username: 'Tanase A. I.' },
  { id: 24, username: 'Niccolò T.' },
  { id: 25, username: 'Khrystyna T.' },
  { id: 26, username: 'Tuca L.' },
  { id: 27, username: 'Luca V.' },
  { id: 28, username: 'Tito V.' },
  { id: 29, username: 'Alessandra Z.' },
]

const usernames = new Set()
for (const player of players) {
  const username = player.username?.trim()
  if (!username || usernames.has(username.toLocaleLowerCase())) {
    throw new Error('I mock Player richiedono username non vuoti e univoci')
  }
  usernames.add(username.toLocaleLowerCase())
}

// Lo storico dimostrativo produce vittorie da 1 a 20 e mostra anche un pareggio.
// L'ordine cronologico è necessario per calcolare le serie senza contatori salvati.
const targetWins = players.map((player) => Math.max(1, 21 - player.id))
const remainingWins = targetWins.map((wins, index) => wins - (index === 0 ? 3 : 0))
const demoWinners = [[7, 8]]
remainingWins[6] -= 1
remainingWins[7] -= 1

for (let index = 0; index < players.length; index += 1) {
  const openingStreak = Math.min(remainingWins[index], Math.ceil(targetWins[index] / 4))
  for (let win = 0; win < openingStreak; win += 1) demoWinners.push([players[index].id])
  remainingWins[index] -= openingStreak
}

while (remainingWins.some((wins) => wins > 0)) {
  for (let index = 0; index < players.length; index += 1) {
    if (remainingWins[index] > 0) {
      demoWinners.push([players[index].id])
      remainingWins[index] -= 1
    }
  }
}

demoWinners.push([1], [1], [1])
const lastDemoDate = Date.UTC(2026, 9, 22, 18, 30)
const dayInMilliseconds = 24 * 60 * 60 * 1000

export const mockData = {
  players,
  matches: demoWinners.map((winnerIds, index) => ({
    id: index + 1,
    date: new Date(lastDemoDate - (demoWinners.length - index - 1) * dayInMilliseconds).toISOString(),
    winnerIds,
    winningScore: Math.max(-Math.floor(4 / winnerIds.length), (index * 7) % 19 - 4),
  })),
}
