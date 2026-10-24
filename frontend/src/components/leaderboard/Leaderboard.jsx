import { useMemo, useState } from 'react'
import { leaderboardEntries } from '../../data/leaderboardEntries.js'
import { aggregateLeaderboardScores } from '../../utils/leaderboard.js'
import LeaderboardFilters from './LeaderboardFilters.jsx'
import LeaderboardPodium from './LeaderboardPodium.jsx'
import LeaderboardTable from './LeaderboardTable.jsx'
import './Leaderboard.css'

export default function Leaderboard({ entries = leaderboardEntries }) {
  const [search, setSearch] = useState('')
  const [period, setPeriod] = useState('all')
  const [sortDirection, setSortDirection] = useState('desc')

  const rankedPlayers = useMemo(() => {
    const query = search.trim().toLocaleLowerCase('it-IT')

    return aggregateLeaderboardScores(entries, period)
      .filter((player) => player.name.toLocaleLowerCase('it-IT').includes(query))
      .sort((first, second) => {
        const scoreDifference = sortDirection === 'desc'
          ? second.score - first.score
          : first.score - second.score

        return scoreDifference || first.name.localeCompare(second.name, 'it-IT')
      })
  }, [entries, period, search, sortDirection])

  return (
    <div className="leaderboard-content">
      <LeaderboardPodium players={rankedPlayers.slice(0, 3)} />
      <section className="nes-container leaderboard-results" aria-label="Classifica giocatori">
        <LeaderboardFilters
          search={search}
          onSearchChange={setSearch}
          period={period}
          onPeriodChange={setPeriod}
          sortDirection={sortDirection}
          onSortToggle={() => setSortDirection((direction) => direction === 'desc' ? 'asc' : 'desc')}
        />
        <LeaderboardTable players={rankedPlayers.slice(3)} />
      </section>
    </div>
  )
}
