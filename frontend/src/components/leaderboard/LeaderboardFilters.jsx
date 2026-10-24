import { Search } from 'lucide-react'
import { NeonField, NeonInput, NeonSelect } from '../ui/NeonField.jsx'

export default function LeaderboardFilters({
  search,
  onSearchChange,
  gameId,
  onGameChange,
  games,
  year,
  onYearChange,
  years,
}) {
  return (
    <div className="mb-4 grid grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)_minmax(0,0.65fr)] items-end gap-3 max-[760px]:grid-cols-2 max-[480px]:grid-cols-1">
      <NeonField label="Cerca giocatore" htmlFor="leaderboard-search" className="relative">
        <Search className="pointer-events-none absolute bottom-3 left-3 h-4 w-4 text-cyber-muted" aria-hidden="true" />
        <NeonInput
          id="leaderboard-search"
          type="search"
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Nome giocatore"
          className="pl-10"
        />
      </NeonField>

      <NeonField label="Gioco" htmlFor="leaderboard-game">
        <NeonSelect id="leaderboard-game" value={gameId} onChange={(event) => onGameChange(event.target.value)}>
          {games.map((game) => <option key={game.id} value={game.id}>{game.name}</option>)}
        </NeonSelect>
      </NeonField>
      <NeonField label="Anno" htmlFor="leaderboard-year" className="max-[760px]:col-span-2 max-[480px]:col-span-1">
        <NeonSelect id="leaderboard-year" value={year} onChange={(event) => onYearChange(event.target.value)}>
          {years.map((value) => <option key={value} value={value}>{value}</option>)}
        </NeonSelect>
      </NeonField>
    </div>
  )
}
