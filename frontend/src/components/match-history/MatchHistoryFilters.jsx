import { ArrowDown, ArrowUp, CalendarDays, Gamepad2, Search } from 'lucide-react'
import { PERIOD_OPTIONS } from '../../utils/datePeriods.js'
import NeonButton from '../ui/NeonButton.jsx'
import { NeonField, NeonInput, NeonSelect } from '../ui/NeonField.jsx'

export default function MatchHistoryFilters({
  search,
  onSearchChange,
  gameId,
  onGameChange,
  period,
  onPeriodChange,
  sortDirection,
  onSortToggle,
  games,
}) {
  const SortIcon = sortDirection === 'desc' ? ArrowDown : ArrowUp

  return (
    <div className="history-controls grid grid-cols-[minmax(0,1.3fr)_minmax(0,1.2fr)_minmax(0,1fr)_auto] items-end gap-3 max-[760px]:grid-cols-2 max-[480px]:grid-cols-1">
      <NeonField label="Giocatore" htmlFor="history-player-search" className="relative">
        <Search className="pointer-events-none absolute bottom-3 left-3 h-4 w-4 text-cyber-muted" aria-hidden="true" />
        <NeonInput
          id="history-player-search"
          type="search"
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Cerca un giocatore"
          className="pl-10"
        />
      </NeonField>

      <NeonField label="Gioco" htmlFor="history-game-filter" className="relative">
        <Gamepad2 className="pointer-events-none absolute bottom-3 left-3 h-4 w-4 text-cyber-muted" aria-hidden="true" />
        <NeonSelect id="history-game-filter" value={gameId} onChange={(event) => onGameChange(event.target.value)} className="pl-10">
          <option value="all">Tutti i giochi</option>
          {games.map((game) => <option key={game.id} value={game.id}>{game.name}</option>)}
        </NeonSelect>
      </NeonField>

      <NeonField label="Periodo" htmlFor="history-period-filter" className="relative">
        <CalendarDays className="pointer-events-none absolute bottom-3 left-3 h-4 w-4 text-cyber-muted" aria-hidden="true" />
        <NeonSelect id="history-period-filter" value={period} onChange={(event) => onPeriodChange(event.target.value)} className="pl-10">
          {PERIOD_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </NeonSelect>
      </NeonField>

      <NeonButton
        variant="primary"
        className="history-sort whitespace-nowrap max-[760px]:col-span-2 max-[480px]:col-span-1"
        type="button"
        onClick={onSortToggle}
        aria-label={`Ordina dal ${sortDirection === 'desc' ? 'più vecchio' : 'più recente'} al ${sortDirection === 'desc' ? 'più recente' : 'più vecchio'}`}
      >
        Data <SortIcon size={16} aria-hidden="true" />
      </NeonButton>
    </div>
  )
}
