import { useMemo, useState } from 'react'
import matchHistoryData from '../../data/matchHistoryData.json'
import { buildMatchHistoryRows } from '../../utils/matchHistory.js'
import { getPeriodStart } from '../../utils/datePeriods.js'
import MatchHistoryFilters from './MatchHistoryFilters.jsx'
import MatchHistoryTable from './MatchHistoryTable.jsx'
import './MatchHistory.css'

const defaultMatches = buildMatchHistoryRows(matchHistoryData)

export default function MatchHistory({ matches = defaultMatches, games = matchHistoryData.games }) {
  const [search, setSearch] = useState('')
  const [gameId, setGameId] = useState('all')
  const [period, setPeriod] = useState('all')
  const [sortDirection, setSortDirection] = useState('desc')

  const filteredMatches = useMemo(() => {
    const query = search.trim().toLocaleLowerCase('it-IT')
    const periodStart = getPeriodStart(period)

    return matches
      .filter((match) => {
        const matchDate = new Date(`${match.date}T00:00:00`)
        const playerNames = [match.callerName, ...match.winnerNames].join(' ').toLocaleLowerCase('it-IT')
        const matchesPlayer = !query || playerNames.includes(query)
        const matchesGame = gameId === 'all' || String(match.gameId) === gameId
        const matchesPeriod = !periodStart || matchDate >= periodStart

        return matchesPlayer && matchesGame && matchesPeriod
      })
      .sort((first, second) => {
        const dateOrder = sortDirection === 'desc'
          ? second.date.localeCompare(first.date)
          : first.date.localeCompare(second.date)

        return dateOrder || second.id - first.id
      })
  }, [gameId, matches, period, search, sortDirection])

  return (
    <div className="match-history">
      <MatchHistoryFilters
        search={search}
        onSearchChange={setSearch}
        gameId={gameId}
        onGameChange={setGameId}
        period={period}
        onPeriodChange={setPeriod}
        sortDirection={sortDirection}
        onSortToggle={() => setSortDirection((direction) => direction === 'desc' ? 'asc' : 'desc')}
        games={games}
      />
      <MatchHistoryTable matches={filteredMatches} />
    </div>
  )
}
