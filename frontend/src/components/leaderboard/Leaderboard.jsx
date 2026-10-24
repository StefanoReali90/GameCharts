import { useMemo, useState } from 'react'
import { Maximize2, Minimize2 } from 'lucide-react'
import mockData from '../../data/mockData.json'
import { buildLeaderboard } from '../../utils/leaderboard.js'
import { cn } from '../../lib/utils.ts'
import NeonButton from '../ui/NeonButton.jsx'
import NeonCard from '../ui/NeonCard.jsx'
import LeaderboardFilters from './LeaderboardFilters.jsx'
import LeaderboardPodium from './LeaderboardPodium.jsx'
import LeaderboardTable from './LeaderboardTable.jsx'

export default function Leaderboard({ data = mockData }) {
  const [search, setSearch] = useState('')
  const [gameId, setGameId] = useState(String(data.games[0]?.id ?? ''))
  const years = [...new Set(data.matches.map((match) => match.registeredAt.slice(0, 4)))].sort().reverse()
  const [year, setYear] = useState(years[0] ?? String(new Date().getFullYear()))
  const [tableExpanded, setTableExpanded] = useState(false)

  const rankedPlayers = useMemo(() => {
    const query = search.trim().toLocaleLowerCase('it-IT')
    return buildLeaderboard(data, gameId, year)
      .map((player, index) => ({ ...player, position: index + 1 }))
      .filter((player) => player.name.toLocaleLowerCase('it-IT').includes(query))
  }, [data, gameId, year, search])

  const tablePlayers = tableExpanded
    ? rankedPlayers
    : rankedPlayers.filter((player) => player.position > 3)

  return (
    <div className={cn(
      'leaderboard-content grid min-h-0 gap-4 overflow-visible',
      tableExpanded
        ? 'h-full grid-rows-[minmax(0,1fr)]'
        : 'h-full grid-rows-[auto_minmax(0,1fr)] max-[760px]:h-auto max-[760px]:min-h-full',
    )}>
      {!tableExpanded && <LeaderboardPodium players={rankedPlayers.filter((player) => player.position <= 3)} />}
      <NeonCard as="section" tone="cyan" tilt={0.4} float={0.6} duration={6.8} className="leaderboard-results flex min-h-0 flex-col overflow-hidden p-4 sm:p-5" aria-label="Classifica giocatori">
        <div className="mb-3 flex items-center justify-between gap-3">
          <h3 className="m-0 text-sm font-semibold uppercase tracking-[0.14em] text-cyan-100">Risultati</h3>
          <NeonButton
            variant="subtle"
            className="h-9 min-h-9 w-9 shrink-0 p-0"
            type="button"
            aria-label={tableExpanded ? 'Riduci tabella' : 'Espandi tabella'}
            aria-pressed={tableExpanded}
            aria-controls="leaderboard-table"
            title={tableExpanded ? 'Riduci tabella' : 'Espandi tabella'}
            onClick={() => setTableExpanded((expanded) => !expanded)}
          >
            {tableExpanded ? <Minimize2 size={17} aria-hidden="true" /> : <Maximize2 size={17} aria-hidden="true" />}
          </NeonButton>
        </div>
        <LeaderboardFilters
          search={search}
          onSearchChange={setSearch}
          gameId={gameId}
          onGameChange={setGameId}
          games={data.games}
          year={year}
          onYearChange={setYear}
          years={years}
        />
        <LeaderboardTable players={tablePlayers} hasPodium={!tableExpanded && rankedPlayers.some((player) => player.position <= 3)} />
      </NeonCard>
    </div>
  )
}
