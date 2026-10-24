import { PERIOD_OPTIONS } from '../../utils/datePeriods.js'

export default function LeaderboardFilters({
  search,
  onSearchChange,
  period,
  onPeriodChange,
  sortDirection,
  onSortToggle,
}) {
  return (
    <div className="leaderboard-controls">
      <label className="nes-field leaderboard-search" htmlFor="leaderboard-search">
        <span className="leaderboard-field-label">CERCA GIOCATORE</span>
        <input
          id="leaderboard-search"
          className="nes-input"
          type="search"
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Nome giocatore"
        />
      </label>

      <label className="leaderboard-period" htmlFor="leaderboard-period">
        <span className="leaderboard-field-label">PERIODO</span>
        <span className="nes-select">
          <select id="leaderboard-period" value={period} onChange={(event) => onPeriodChange(event.target.value)}>
            {PERIOD_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </span>
      </label>

      <button
        className="nes-btn is-primary leaderboard-sort"
        type="button"
        onClick={onSortToggle}
        aria-label={`Ordina dal ${sortDirection === 'desc' ? 'più basso' : 'più alto'} al ${sortDirection === 'desc' ? 'più alto' : 'più basso'}`}
      >
        PUNTEGGIO {sortDirection === 'desc' ? '↓' : '↑'}
      </button>
    </div>
  )
}
