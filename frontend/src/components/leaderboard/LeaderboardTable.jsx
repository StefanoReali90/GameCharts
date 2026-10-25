import { motion } from 'framer-motion'
import { useFloatingTilt } from '../../hooks/useFloatingTilt.js'
import NeonBadge from '../ui/NeonBadge.jsx'
import PlayerAvatar from './PlayerAvatar.jsx'

export default function LeaderboardTable({ players, expanded, hasPodium }) {
  const floating = useFloatingTilt({ tilt: 0.35, float: 0.6, duration: 6.2 })
  const hasVisiblePlayers = players.some((player) => expanded || player.position > 3)

  return (
    <motion.div
      id="leaderboard-table"
      className="neon-table-wrap min-h-0 flex-1 overflow-auto rounded-xl border border-cyber-cyan/20 bg-transparent transform-gpu"
      style={floating.style}
      animate={floating.animate}
      transition={floating.transition}
      onPointerMove={floating.onPointerMove}
      onPointerLeave={floating.onPointerLeave}
    >
      <table className="leaderboard-table w-full min-w-[640px] border-collapse text-left text-sm" data-expanded={expanded}>
        <thead className="sticky top-0 z-10 bg-cyber-surface/90 text-[10px] uppercase tracking-[0.15em] text-cyber-muted backdrop-blur-xl">
          <tr>
            <th className="px-4 py-3 font-medium" scope="col">Pos.</th>
            <th className="px-4 py-3 font-medium" scope="col">Giocatore</th>
            <th className="px-4 py-3 font-medium" scope="col">Vittorie</th>
            <th className="px-4 py-3 font-medium" scope="col">Ultima vittoria</th>
          </tr>
        </thead>
        <tbody>
          {players.map((player) => (
            <tr
              key={player.id}
              data-rank={player.position <= 3 ? player.position : undefined}
              aria-hidden={!expanded && player.position <= 3}
              className="leaderboard-data-row transition-colors hover:bg-cyber-cyan/[0.045]"
            >
              <td>
                <div className="leaderboard-cell px-4 font-mono text-xs text-cyber-muted">{String(player.position).padStart(2, '0')}</div>
              </td>
              <td>
                <div className="leaderboard-cell leaderboard-player-cell gap-3 px-4 font-medium text-cyber-text">
                  <PlayerAvatar player={player} />
                  <span>{player.name}</span>
                </div>
              </td>
              <td>
                <div className="leaderboard-cell px-4"><NeonBadge>{player.wins.toLocaleString('it-IT')}</NeonBadge></div>
              </td>
              <td>
                <div className="leaderboard-cell px-4 text-xs tabular-nums text-cyber-muted">
                  <time dateTime={player.lastWinAt}>{new Date(player.lastWinAt).toLocaleDateString('it-IT')}</time>
                </div>
              </td>
            </tr>
          ))}
          {!hasVisiblePlayers && (
            <tr>
              <td className="leaderboard-empty px-4 py-10 text-center text-sm text-cyber-muted" colSpan="4">
                {hasPodium ? 'Nessun altro giocatore in classifica' : 'Nessun risultato per questi filtri'}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </motion.div>
  )
}
