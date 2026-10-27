import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { Maximize2, Minimize2, SearchX } from 'lucide-react'
import { useReducedMotion } from 'framer-motion'
import { buildLeaderboard, findLeaderboardPlayer, selectLeaderboardPlayers } from '../../utils/leaderboard.js'
import { cn } from '../../lib/utils.ts'
import NeonButton from '../ui/NeonButton.jsx'
import LeaderboardPodium from './LeaderboardPodium.jsx'
import LeaderboardTable from './LeaderboardTable.jsx'
import Tooltip from '../ui/Tooltip.jsx'
import { useI18n } from '../../i18n/I18nProvider.jsx'

export default function Leaderboard({ data, previousPositions, targetPlayerId = null, entranceReady = true, entranceFinished = false, onEntranceComplete }) {
  const { t, locale } = useI18n()
  const [tableExpanded, setTableExpanded] = useState(false)
  const [layoutExpanded, setLayoutExpanded] = useState(false)
  const [tableMotion, setTableMotion] = useState('idle')
  const [nameQuery, setNameQuery] = useState('')
  const [sort, setSort] = useState({ key: 'position', direction: 'asc' })
  const [podiumHeight, setPodiumHeight] = useState(null)
  const [spotlightPlayerId, setSpotlightPlayerId] = useState(targetPlayerId)
  const podiumRef = useRef(null)
  const reducedMotion = useReducedMotion()

  useLayoutEffect(() => {
    const podium = podiumRef.current
    if (!podium) return undefined

    const measure = (height) => setPodiumHeight((current) => current === height ? current : height)
    measure(Math.ceil(podium.getBoundingClientRect().height))
    const observer = new ResizeObserver(([entry]) => measure(Math.ceil(entry.contentRect.height)))
    observer.observe(podium)
    return () => observer.disconnect()
  }, [])

  const rankedPlayers = useMemo(() => buildLeaderboard(data), [data])
  const tablePlayers = useMemo(() => selectLeaderboardPlayers(rankedPlayers, nameQuery, sort, locale), [rankedPlayers, nameQuery, sort, locale])
  const highlightedPlayerId = useMemo(() => findLeaderboardPlayer(rankedPlayers, nameQuery)?.id ?? targetPlayerId, [rankedPlayers, nameQuery, targetPlayerId])
  const targetPosition = rankedPlayers.find((player) => player.id === targetPlayerId)?.position
  const skipPodiumEntrance = targetPosition <= 3
  const podiumHighlightedPlayerId = !layoutExpanded && !nameQuery.trim() && skipPodiumEntrance && spotlightPlayerId === targetPlayerId ? targetPlayerId : null

  useEffect(() => {
    if (targetPlayerId === null || !skipPodiumEntrance) return undefined
    setSpotlightPlayerId(targetPlayerId)
    const timer = window.setTimeout(() => setSpotlightPlayerId(null), 1600)
    return () => window.clearTimeout(timer)
  }, [targetPlayerId, skipPodiumEntrance])

  useEffect(() => {
    if (targetPlayerId === null || targetPosition === undefined) return
    const selector = targetPosition <= 3
      ? `.podium-card[data-player-id="${targetPlayerId}"]`
      : `tr[data-player-id="${targetPlayerId}"]`
    document.querySelector(selector)?.focus({ preventScroll: true })
  }, [targetPlayerId, targetPosition])
  const showMedalRows = tableExpanded || Boolean(nameQuery.trim())

  const toggleSort = (key) => setSort((current) => current.key === key
    ? { key, direction: current.direction === 'asc' ? 'desc' : 'asc' }
    : { key, direction: key === 'position' || key === 'name' || key === 'bestScore' ? 'asc' : 'desc' })

  const toggleTable = () => {
    if (tableExpanded) {
      setTableMotion('idle')
      setTableExpanded(false)
      setLayoutExpanded(false)
    } else {
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
        rowGap: layoutExpanded ? 0 : 10,
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
          highlightedPlayerId={podiumHighlightedPlayerId}
          skipEntrance={skipPodiumEntrance}
        />
      </div>
      <section className={`leaderboard-results neon-surface relative flex flex-1 flex-col overflow-hidden rounded-2xl border border-cyber-cyan/45 p-4 shadow-neon-cyan sm:p-5 ${layoutExpanded ? 'min-h-0' : 'min-h-[264px]'}`} aria-label={t('leaderboard.aria')}>
        <div className="mb-3 flex flex-wrap items-center gap-3">
          <h3 className="m-0 mr-auto text-sm font-semibold capitalize tracking-[0.14em] text-cyan-100">{t('leaderboard.results')}</h3>
          {nameQuery.trim() && (
            <Tooltip content={t('leaderboard.clearSearch')}>
              <NeonButton
                variant="ghost"
                motionEnabled={false}
                className="h-9 min-h-9 shrink-0 gap-1.5 px-2.5 capitalize text-cyan-100"
                type="button"
                aria-label={t('leaderboard.clearSearch')}
                onClick={() => setNameQuery('')}
              >
                <SearchX size={16} aria-hidden="true" />
                <span className="hidden sm:inline">{t('leaderboard.clearSearch')}</span>
              </NeonButton>
            </Tooltip>
          )}
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
          sort={sort}
          onSort={toggleSort}
          nameQuery={nameQuery}
          highlightedPlayerId={skipPodiumEntrance && !nameQuery.trim() ? null : highlightedPlayerId}
          onNameSearch={setNameQuery}
          hasPodium={!showMedalRows && rankedPlayers.some((player) => player.position <= 3)}
          previousPositions={previousPositions}
        />
      </section>
    </div>
  )
}
