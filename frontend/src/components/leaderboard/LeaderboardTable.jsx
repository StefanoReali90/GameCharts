import { useCallback, useEffect, useRef, useState } from 'react'
import { ArrowDown, ArrowDownAZ, ArrowDownZA, ArrowUp, ArrowUpDown, Award, Flame, Hash, Layers3, Search, Trophy, UserRound } from 'lucide-react'
import NeonBadge from '../ui/NeonBadge.jsx'
import ScoreCards from '../ui/ScoreCards.jsx'
import StreakFlame from './StreakFlame.jsx'
import Tooltip from '../ui/Tooltip.jsx'
import SearchPopover from '../ui/SearchPopover.jsx'
import { useI18n } from '../../i18n/I18nProvider.jsx'
import { playMedalWhoosh } from '../../utils/uiSounds.js'
import { positionChange } from '../../data/rankingSnapshot.js'

const columns = [
  { key: 'position', label: 'leaderboard.position', icon: Hash },
  { key: 'name', label: 'leaderboard.player', icon: UserRound },
  { key: 'wins', label: 'leaderboard.winsColumn', icon: Trophy },
  { key: 'bestWinStreak', label: 'leaderboard.bestStreak', icon: Award },
  { key: 'winStreak', label: 'leaderboard.streakColumn', icon: Flame },
  { key: 'bestScore', label: 'leaderboard.best', icon: Layers3 },
]

function PositionTrend({ change, t }) {
  if (change === 0) return null
  const rising = change > 0
  const Icon = rising ? ArrowUp : ArrowDown
  return (
    <span
      className={`leaderboard-position-trend inline-flex items-center gap-0.5 rounded-md px-1 py-0.5 text-[11px] font-bold ${rising ? 'text-emerald-300' : 'text-rose-400'}`}
      role="img"
      aria-label={t(rising ? 'leaderboard.risen' : 'leaderboard.fallen', { count: Math.abs(change) })}
    >
      <Icon size={12} strokeWidth={3} aria-hidden="true" />
      <span aria-hidden="true">{Math.abs(change)}</span>
    </span>
  )
}

export default function LeaderboardTable({ players, expanded, motion, sort, onSort, nameQuery, onNameSearch, highlightedPlayerId, hasPodium, previousPositions = {} }) {
  const { t, locale } = useI18n()
  const [filterOpen, setFilterOpen] = useState(false)
  const filterButtonRef = useRef(null)
  const tableWrapRef = useRef(null)
  const hasVisiblePlayers = players.some((player) => expanded || player.position > 3)
  const highlightedIndex = players.findIndex((player) => player.id === highlightedPlayerId)

  useEffect(() => {
    if (highlightedPlayerId === null) return undefined
    const container = tableWrapRef.current
    const row = container?.querySelector(`tr[data-player-id="${highlightedPlayerId}"]`)
    if (!container || !row) return undefined
    const moveToMatch = () => {
      const rowTop = row.getBoundingClientRect().top - container.getBoundingClientRect().top + container.scrollTop
      container.scrollTo({ top: rowTop - (container.clientHeight - row.getBoundingClientRect().height) / 2, behavior: 'smooth' })
    }
    const timer = window.setTimeout(moveToMatch, expanded && row.dataset.rank ? 760 : 40)
    return () => window.clearTimeout(timer)
  }, [highlightedPlayerId, highlightedIndex, expanded])

  const closeFilter = useCallback((restoreFocus = false) => {
    setFilterOpen(false)
    if (restoreFocus) window.requestAnimationFrame(() => filterButtonRef.current?.focus())
  }, [])

  const sortIcon = (column) => {
    if (column.key === 'name') return sort.key === 'name' && sort.direction === 'desc' ? ArrowDownZA : ArrowDownAZ
    if (sort.key !== column.key) return ArrowUpDown
    return sort.direction === 'asc' ? ArrowUp : ArrowDown
  }

  return (
    <>
    <div
      id="leaderboard-table"
      ref={tableWrapRef}
      className="neon-table-wrap min-h-0 flex-1 overflow-auto rounded-xl border border-cyber-cyan/20 bg-transparent"
    >
      <table className="leaderboard-table w-full min-w-[860px] border-collapse text-center text-sm" data-expanded={expanded} data-motion={motion}>
        <thead className="sticky top-0 z-10 bg-cyber-surface/90 text-[10px] capitalize tracking-[0.15em] text-cyber-muted backdrop-blur-xl">
          <tr>
            {columns.map((column) => {
              const active = sort.key === column.key
              const nextDirection = active
                ? sort.direction === 'asc' ? 'desc' : 'asc'
                : column.key === 'position' || column.key === 'name' || column.key === 'bestScore' ? 'asc' : 'desc'
              const Icon = sortIcon(column)
              const ColumnIcon = column.icon
              const description = t('leaderboard.sortBy', { column: t(column.label), direction: t(nextDirection === 'asc' ? 'leaderboard.ascending' : 'leaderboard.descending') })
              return (
                <th key={column.key} className="px-2 py-2 text-center font-medium" scope="col" aria-sort={active ? sort.direction === 'asc' ? 'ascending' : 'descending' : 'none'}>
                  <span className="inline-flex items-center justify-center gap-0.5">
                    <Tooltip content={description}>
                      <button type="button" className={`leaderboard-sort-button inline-flex min-h-9 items-center justify-center gap-1.5 rounded-lg px-2 py-1.5 text-center transition-colors hover:bg-cyber-cyan/10 hover:text-cyan-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyber-cyan/60 ${active ? 'text-cyan-100' : ''}`} onClick={() => onSort(column.key)} aria-label={description}>
                        <span className="leaderboard-heading-full">{t(column.label)}</span>
                        <span className="leaderboard-heading-compact" aria-hidden="true"><ColumnIcon size={13} strokeWidth={1.8} /></span>
                        <Icon size={column.key === 'name' ? 16 : 13} strokeWidth={column.key === 'name' ? 2 : 1.7} className={active ? 'text-cyan-300' : 'text-cyber-muted/70'} aria-hidden="true" />
                      </button>
                    </Tooltip>
                    {column.key === 'name' && (
                      <Tooltip content={t('leaderboard.searchPlaceholder')}>
                        <button ref={filterButtonRef} type="button" className={`relative grid h-8 w-8 shrink-0 place-items-center rounded-lg border transition-colors hover:border-cyber-cyan/45 hover:bg-cyber-cyan/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyber-cyan/60 ${nameQuery ? 'border-cyber-cyan/40 bg-cyber-cyan/10 text-cyan-200' : 'border-transparent text-cyber-muted'}`} aria-label={t('leaderboard.searchPlaceholder')} aria-haspopup="dialog" aria-expanded={filterOpen} aria-controls={filterOpen ? 'leaderboard-name-filter' : undefined} onClick={() => setFilterOpen((open) => !open)}>
                          <Search size={15} strokeWidth={2} aria-hidden="true" />
                          {nameQuery && <span className="absolute right-0.5 top-0.5 h-1.5 w-1.5 rounded-full bg-cyber-cyan shadow-[0_0_8px_rgb(var(--cyber-cyan)/0.8)]" aria-hidden="true" />}
                        </button>
                      </Tooltip>
                    )}
                  </span>
                </th>
              )
            })}
          </tr>
        </thead>
        <tbody>
          {players.map((player) => (
            <tr
              key={player.id}
              data-player-id={player.id}
              tabIndex={-1}
              data-rank={player.position <= 3 ? player.position : undefined}
              data-search-match={player.id === highlightedPlayerId || undefined}
              aria-hidden={!expanded && player.position <= 3}
              className="leaderboard-data-row transition-colors hover:bg-cyber-cyan/[0.045]"
              onAnimationStart={(event) => {
                if (event.target === event.currentTarget && event.animationName === 'leaderboard-medal-strip' && motion === 'opening' && player.position <= 3) playMedalWhoosh(player.position)
              }}
            >
              <td>
                <div className="leaderboard-cell leaderboard-position-cell px-2 font-mono text-xs text-cyber-muted">
                  <span>{String(player.position).padStart(2, '0')}</span>
                  <PositionTrend change={positionChange(player, previousPositions)} t={t} />
                </div>
              </td>
              <td>
                <div className="leaderboard-cell leaderboard-player-cell px-4 font-medium text-cyber-text">
                  <span>{player.username}</span>
                </div>
              </td>
              <td>
                <div className="leaderboard-cell px-4"><NeonBadge>{player.wins.toLocaleString(locale)}</NeonBadge></div>
              </td>
              <td><div className="leaderboard-cell px-4 tabular-nums text-cyber-muted">{player.bestWinStreak}</div></td>
              <td><div className="leaderboard-cell px-4 text-cyber-muted"><StreakFlame count={player.winStreak} /></div></td>
              <td><div className="leaderboard-cell px-4 text-cyber-text"><ScoreCards score={player.bestScore} /></div></td>
            </tr>
          ))}
          {!hasVisiblePlayers && (
            <tr>
              <td className="leaderboard-empty px-4 py-10 text-center text-sm text-cyber-muted" colSpan="6">
                {t(hasPodium ? 'leaderboard.emptyOthers' : 'leaderboard.empty')}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
    {filterOpen && <SearchPopover anchorRef={filterButtonRef} query={nameQuery} onSearch={onNameSearch} onClose={closeFilter} label={t('leaderboard.searchPlaceholder')} idPrefix="leaderboard-name" />}
    </>
  )
}
