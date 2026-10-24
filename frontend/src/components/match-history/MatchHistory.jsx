import { useMemo, useState } from 'react'
import mockData from '../../data/mockData.json'
import { buildMatchHistoryRows } from '../../utils/matchHistory.js'
import { getPeriodStart } from '../../utils/datePeriods.js'
import MatchHistoryFilters from './MatchHistoryFilters.jsx'
import MatchHistoryTable from './MatchHistoryTable.jsx'

const defaultMatches = buildMatchHistoryRows(mockData)

export default function MatchHistory({ matches = defaultMatches, games = mockData.games }) {
  const [search, setSearch] = useState('')
  const [gameId, setGameId] = useState('all')
  const [period, setPeriod] = useState('all')
  const [sortDirection, setSortDirection] = useState('desc')

  const filteredMatches = useMemo(() => {
    const query = search.trim().toLocaleLowerCase('it-IT')
    const periodStart = getPeriodStart(period)

    return matches
      .filter((match) => {
        const matchDate = new Date(match.registeredAt)
        const playerNames = [match.callerName, ...match.winnerNames, ...match.results.map((result) => result.playerName)].join(' ').toLocaleLowerCase('it-IT')
        const matchesPlayer = !query || playerNames.includes(query)
        const matchesGame = gameId === 'all' || String(match.gameId) === gameId
        const matchesPeriod = !periodStart || matchDate >= periodStart

        return matchesPlayer && matchesGame && matchesPeriod
      })
      .sort((first, second) => {
        const dateOrder = sortDirection === 'desc'
          ? second.registeredAt.localeCompare(first.registeredAt)
          : first.registeredAt.localeCompare(second.registeredAt)

        return dateOrder || second.id - first.id
      })
  }, [gameId, matches, period, search, sortDirection])

  return (
    <div className="match-history grid min-h-0 grid-rows-[auto_minmax(0,1fr)] gap-4 overflow-visible">
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
