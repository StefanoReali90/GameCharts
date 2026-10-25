import { motion } from 'framer-motion'
import { useCallback, useRef, useState } from 'react'
import { ArrowDown, ArrowUp, ArrowUpDown, CalendarDays, Layers3, Search, UsersRound } from 'lucide-react'
import { useFloatingTilt } from '../../hooks/useFloatingTilt.js'
import { useI18n } from '../../i18n/I18nProvider.jsx'
import SearchPopover from '../ui/SearchPopover.jsx'
import Tooltip from '../ui/Tooltip.jsx'

export default function MatchHistoryTable({ matches, sort, onSort, winnerQuery, onWinnerQueryChange }) {
  const { t, locale } = useI18n()
  const floating = useFloatingTilt({ tilt: 0.5, float: 0.8, duration: 6.4 })
  const [filterOpen, setFilterOpen] = useState(false)
  const filterButtonRef = useRef(null)
  const closeFilter = useCallback((restoreFocus = false) => {
    setFilterOpen(false)
    if (restoreFocus) window.requestAnimationFrame(() => filterButtonRef.current?.focus())
  }, [])
  const columns = [
    { key: 'date', label: 'history.date', icon: CalendarDays },
    { key: 'winners', label: 'history.winner', icon: UsersRound },
    { key: 'winningScore', label: 'history.scores', icon: Layers3 },
  ]

  return (
    <motion.div
      className="neon-surface neon-table-wrap min-h-0 overflow-auto rounded-2xl border border-cyber-purple/20 transform-gpu"
      style={floating.style}
      animate={floating.animate}
      transition={floating.transition}
      onPointerMove={floating.onPointerMove}
      onPointerLeave={floating.onPointerLeave}
    >
      <table className="history-table w-full min-w-[560px] border-collapse text-center text-sm">
        <thead className="sticky top-0 z-10 bg-cyber-surface/90 text-[10px] capitalize tracking-[0.15em] text-cyber-muted backdrop-blur-xl">
          <tr>
            {columns.map((column) => {
              const active = sort.key === column.key
              const nextDirection = active ? sort.direction === 'asc' ? 'desc' : 'asc' : column.key === 'winners' ? 'asc' : 'desc'
              const Icon = active ? sort.direction === 'asc' ? ArrowUp : ArrowDown : ArrowUpDown
              const ColumnIcon = column.icon
              return <th key={column.key} className="px-4 py-2 text-center font-medium" scope="col" aria-sort={active ? sort.direction === 'asc' ? 'ascending' : 'descending' : 'none'}>
                <span className="inline-flex items-center justify-center gap-0.5">
                  <button type="button" className="inline-flex min-h-9 items-center justify-center gap-1.5 rounded-lg px-2 text-cyber-muted transition-colors hover:bg-cyber-purple/10 hover:text-cyan-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyber-cyan/60" onClick={() => onSort(column.key)} aria-label={t('leaderboard.sortBy', { column: t(column.label), direction: t(nextDirection === 'asc' ? 'leaderboard.ascending' : 'leaderboard.descending') })}>
                    <span className="history-heading-full">{t(column.label)}</span>
                    <span className="history-heading-compact" aria-hidden="true"><ColumnIcon size={14} strokeWidth={1.8} /></span>
                    <Icon size={14} aria-hidden="true" />
                  </button>
                  {column.key === 'winners' && (
                    <Tooltip content={t('history.searchWinners')}>
                      <button ref={filterButtonRef} type="button" className={`relative grid h-8 w-8 shrink-0 place-items-center rounded-lg border transition-colors hover:border-cyber-purple/45 hover:bg-cyber-purple/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyber-purple/60 ${winnerQuery ? 'border-cyber-purple/40 bg-cyber-purple/10 text-purple-200' : 'border-transparent text-cyber-muted'}`} aria-label={t('history.searchWinners')} aria-haspopup="dialog" aria-expanded={filterOpen} aria-controls={filterOpen ? 'history-winners-filter' : undefined} onClick={() => setFilterOpen((open) => !open)}>
                        <Search size={15} strokeWidth={2} aria-hidden="true" />
                        {winnerQuery && <span className="absolute right-0.5 top-0.5 h-1.5 w-1.5 rounded-full bg-cyber-purple shadow-[0_0_8px_rgb(var(--cyber-purple)/0.8)]" aria-hidden="true" />}
                      </button>
                    </Tooltip>
                  )}
                </span>
              </th>
            })}
          </tr>
        </thead>
        <tbody className="divide-y divide-white/[0.05]">
          {matches.length ? matches.map((match) => (
            <tr
              key={match.id}
              className="transition-colors hover:bg-cyber-purple/[0.045]"
            >
              <td className="whitespace-nowrap px-4 py-3.5 text-xs tabular-nums text-cyber-muted">
                <time dateTime={match.date}>{new Date(match.date).toLocaleString(locale, { dateStyle: 'short', timeStyle: 'short' })}</time>
              </td>
              <td className="px-4 py-3.5 text-green-200">{match.winnerNames.join(', ')}</td>
              <td className={`px-4 py-3.5 font-semibold tabular-nums ${match.winningScore < 0 ? 'text-emerald-300' : 'text-cyber-text'}`}>{match.winningScore}</td>
            </tr>
          )) : (
            <tr>
              <td className="history-empty px-4 py-12 text-center text-sm text-cyber-muted" colSpan="3">
                {t('history.noMatches')}
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {filterOpen && <SearchPopover anchorRef={filterButtonRef} query={winnerQuery} onSearch={onWinnerQueryChange} onClose={closeFilter} label={t('history.searchWinners')} idPrefix="history-winners" />}
    </motion.div>
  )
}
