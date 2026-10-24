import { getPeriodStart } from './datePeriods.js'

export function aggregateLeaderboardScores(entries, period) {
  const periodStart = getPeriodStart(period)
  const players = new Map()

  entries.forEach((entry) => {
    const entryDate = new Date(`${entry.date}T00:00:00`)
    if (periodStart && entryDate < periodStart) return

    const player = players.get(entry.playerId) ?? {
      id: entry.playerId,
      name: entry.name,
      score: 0,
      date: entry.date,
      avatar: entry.avatar,
    }

    player.score += entry.score
    if (entry.date > player.date) player.date = entry.date
    players.set(entry.playerId, player)
  })

  return [...players.values()]
}
