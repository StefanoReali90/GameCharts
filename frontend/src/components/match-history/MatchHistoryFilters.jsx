import { PERIOD_OPTIONS } from '../../utils/datePeriods.js'

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
  return (
    <div className="history-controls">
      <label className="nes-field history-filter" htmlFor="history-player-search">
        <span className="field-label">GIOCATORE</span>
        <input
          id="history-player-search"
          className="nes-input"
          type="search"
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Nome"
        />
      </label>

      <label className="history-filter" htmlFor="history-game-filter">
        <span className="field-label">GIOCO</span>
        <span className="nes-select">
          <select id="history-game-filter" value={gameId} onChange={(event) => onGameChange(event.target.value)}>
            <option value="all">Tutti i giochi</option>
            {games.map((game) => <option key={game.id} value={game.id}>{game.name}</option>)}
          </select>
        </span>
      </label>

      <label className="history-filter" htmlFor="history-period-filter">
        <span className="field-label">PERIODO</span>
        <span className="nes-select">
          <select id="history-period-filter" value={period} onChange={(event) => onPeriodChange(event.target.value)}>
            {PERIOD_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </span>
      </label>

      <button
        className="nes-btn is-primary history-sort"
        type="button"
        onClick={onSortToggle}
        aria-label={`Ordina dal ${sortDirection === 'desc' ? 'più vecchio' : 'più recente'} al ${sortDirection === 'desc' ? 'più recente' : 'più vecchio'}`}
      >
        DATA {sortDirection === 'desc' ? '↓' : '↑'}
      </button>
    </div>
  )
}
