import { useLayoutEffect, useMemo, useRef, useState } from 'react'
import { Maximize2, Minimize2 } from 'lucide-react'
import { useReducedMotion } from 'framer-motion'
import mockData from '../../data/mockData.json'
import { buildLeaderboard } from '../../utils/leaderboard.js'
import { cn } from '../../lib/utils.ts'
import NeonButton from '../ui/NeonButton.jsx'
import NeonCard from '../ui/NeonCard.jsx'
import LeaderboardFilters from './LeaderboardFilters.jsx'
import LeaderboardPodium from './LeaderboardPodium.jsx'
import LeaderboardTable from './LeaderboardTable.jsx'

export default function Leaderboard({ data = mockData, entranceReady = true }) {
  const [search, setSearch] = useState('')
  const [gameId, setGameId] = useState(String(data.games[0]?.id ?? ''))
  const years = [...new Set(data.matches.map((match) => match.registeredAt.slice(0, 4)))].sort().reverse()
  const [year, setYear] = useState(years[0] ?? String(new Date().getFullYear()))
  const [tableExpanded, setTableExpanded] = useState(false)
  const [podiumHeight, setPodiumHeight] = useState(null)
  const podiumRef = useRef(null)
  const reducedMotion = useReducedMotion()

  useLayoutEffect(() => {
    const podium = podiumRef.current
    if (!podium) return undefined

    const measure = () => setPodiumHeight(Math.ceil(podium.scrollHeight))
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(podium)
    return () => observer.disconnect()
  }, [])

  const rankedPlayers = useMemo(() => {
    const query = search.trim().toLocaleLowerCase('it-IT')
    return buildLeaderboard(data, gameId, year)
      .map((player, index) => ({ ...player, position: index + 1 }))
      .filter((player) => player.name.toLocaleLowerCase('it-IT').includes(query))
  }, [data, gameId, year, search])

  return (
    <div className={cn(
      'leaderboard-content grid min-h-0 overflow-visible',
      podiumHeight !== null && !reducedMotion && 'transition-[grid-template-rows,row-gap] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]',
      tableExpanded ? 'h-full' : 'h-full max-[760px]:h-auto max-[760px]:min-h-full',
    )}
      style={{
        gridTemplateRows: podiumHeight === null ? 'auto minmax(0, 1fr)' : `${tableExpanded ? 0 : podiumHeight}px minmax(0, 1fr)`,
        rowGap: tableExpanded ? 0 : 16,
      }}
    >
      <div className="min-h-0 self-start" aria-hidden={tableExpanded || !entranceReady} inert={tableExpanded}>
        <LeaderboardPodium
          podiumRef={podiumRef}
          expanded={tableExpanded}
          entranceReady={entranceReady}
          players={rankedPlayers.filter((player) => player.position <= 3)}
        />
      </div>
      <NeonCard as="section" tone="cyan" tilt={0.4} float={0.6} duration={6.8} className="leaderboard-results flex min-h-0 flex-1 flex-col overflow-hidden p-4 sm:p-5" aria-label="Classifica giocatori">
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
        <LeaderboardTable players={rankedPlayers} expanded={tableExpanded} hasPodium={!tableExpanded && rankedPlayers.some((player) => player.position <= 3)} />
      </NeonCard>
    </div>
  )
}
