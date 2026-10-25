import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { Maximize2, Minimize2 } from 'lucide-react'
import { useReducedMotion } from 'framer-motion'
import { buildLeaderboard, selectLeaderboardPlayers } from '../../utils/leaderboard.js'
import { cn } from '../../lib/utils.ts'
import NeonButton from '../ui/NeonButton.jsx'
import LeaderboardPodium from './LeaderboardPodium.jsx'
import LeaderboardTable from './LeaderboardTable.jsx'
import Tooltip from '../ui/Tooltip.jsx'
import { useI18n } from '../../i18n/I18nProvider.jsx'

export default function Leaderboard({ data, entranceReady = true, entranceFinished = false, onEntranceComplete }) {
  const { t, locale } = useI18n()
  const [tableExpanded, setTableExpanded] = useState(false)
  const [layoutExpanded, setLayoutExpanded] = useState(false)
  const [tableMotion, setTableMotion] = useState('idle')
  const [exitedRanks, setExitedRanks] = useState([])
  const [nameQuery, setNameQuery] = useState('')
  const [sort, setSort] = useState({ key: 'position', direction: 'asc' })
  const [podiumHeight, setPodiumHeight] = useState(null)
  const podiumRef = useRef(null)
  const closeTimer = useRef(null)
  const reducedMotion = useReducedMotion()

  useEffect(() => () => window.clearTimeout(closeTimer.current), [])

  useLayoutEffect(() => {
    const podium = podiumRef.current
    if (!podium) return undefined

    const measure = () => setPodiumHeight(Math.ceil(podium.scrollHeight))
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(podium)
    return () => observer.disconnect()
  }, [])

  const rankedPlayers = useMemo(() => buildLeaderboard(data), [data])
  const tablePlayers = useMemo(() => selectLeaderboardPlayers(rankedPlayers, nameQuery, sort, locale), [rankedPlayers, nameQuery, sort, locale])
  const showMedalRows = tableExpanded || Boolean(nameQuery.trim())

  const toggleSort = (key) => setSort((current) => current.key === key
    ? { key, direction: current.direction === 'asc' ? 'desc' : 'asc' }
    : { key, direction: key === 'position' || key === 'name' ? 'asc' : 'desc' })

  const completeClose = useCallback(() => {
    window.clearTimeout(closeTimer.current)
    closeTimer.current = null
    setTableMotion('idle')
    setLayoutExpanded(false)
    setExitedRanks([])
  }, [])

  const toggleTable = () => {
    window.clearTimeout(closeTimer.current)
    if (tableExpanded) {
      setExitedRanks([])
      setTableMotion('closing')
      setTableExpanded(false)
      if (reducedMotion) completeClose()
      else closeTimer.current = window.setTimeout(completeClose, 1800)
    } else {
      setExitedRanks([])
      setLayoutExpanded(true)
      setTableMotion('opening')
      setTableExpanded(true)
    }
  }

  return (
    <div className={cn(
      'leaderboard-content grid min-h-0 overflow-visible',
      podiumHeight !== null && !reducedMotion && 'transition-[grid-template-rows,row-gap] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]',
      layoutExpanded ? 'h-full' : 'h-full max-[760px]:h-auto max-[760px]:min-h-full',
    )}
      style={{
        gridTemplateRows: podiumHeight === null ? 'auto minmax(0, 1fr)' : `${layoutExpanded ? 0 : podiumHeight}px minmax(0, 1fr)`,
        rowGap: layoutExpanded ? 0 : 16,
      }}
    >
      <div className="min-h-0 self-start" aria-hidden={layoutExpanded || !entranceReady} inert={layoutExpanded}>
        <LeaderboardPodium
          podiumRef={podiumRef}
          expanded={layoutExpanded}
          entranceReady={entranceReady}
          entranceFinished={entranceFinished}
          onEntranceComplete={onEntranceComplete}
          players={rankedPlayers.filter((player) => player.position <= 3)}
        />
      </div>
      <section className="leaderboard-results neon-surface relative flex min-h-0 flex-1 flex-col overflow-hidden rounded-2xl border border-cyber-cyan/45 p-4 shadow-neon-cyan sm:p-5" aria-label={t('leaderboard.aria')}>
        <div className="mb-3 flex flex-wrap items-center gap-3">
          <h3 className="m-0 mr-auto text-sm font-semibold uppercase tracking-[0.14em] text-cyan-100">{t('leaderboard.results')}</h3>
          <Tooltip content={t(tableExpanded ? 'leaderboard.collapse' : 'leaderboard.expand')}>
            <NeonButton
              variant="subtle"
              className="h-9 min-h-9 w-9 shrink-0 p-0"
              type="button"
              aria-label={t(tableExpanded ? 'leaderboard.collapse' : 'leaderboard.expand')}
              aria-pressed={tableExpanded}
              aria-controls="leaderboard-table"
              onClick={toggleTable}
            >
              {tableExpanded ? <Minimize2 size={17} aria-hidden="true" /> : <Maximize2 size={17} aria-hidden="true" />}
            </NeonButton>
          </Tooltip>
        </div>
        <LeaderboardTable
          players={tablePlayers}
          expanded={showMedalRows}
          motion={tableMotion}
          exitedRanks={exitedRanks}
          onMedalRowExit={(rank) => setExitedRanks((ranks) => ranks.includes(rank) ? ranks : [...ranks, rank])}
          onMedalRowsGone={completeClose}
          sort={sort}
          onSort={toggleSort}
          nameQuery={nameQuery}
          onNameSearch={setNameQuery}
          hasPodium={!showMedalRows && rankedPlayers.some((player) => player.position <= 3)}
        />
      </section>
    </div>
  )
}
