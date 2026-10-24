import { motion } from 'framer-motion'
import { useFloatingTilt } from '../../hooks/useFloatingTilt.js'
import NeonBadge from '../ui/NeonBadge.jsx'
import PlayerAvatar from './PlayerAvatar.jsx'

export default function LeaderboardTable({ players, hasPodium }) {
  const floating = useFloatingTilt({ tilt: 0.35, float: 0.6, duration: 6.2 })

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
      <table className="leaderboard-table w-full min-w-[640px] border-collapse text-left text-sm">
        <thead className="sticky top-0 z-10 bg-cyber-surface/90 text-[10px] uppercase tracking-[0.15em] text-cyber-muted backdrop-blur-xl">
          <tr>
            <th className="px-4 py-3 font-medium" scope="col">Pos.</th>
            <th className="px-4 py-3 font-medium" scope="col">Giocatore</th>
            <th className="px-4 py-3 font-medium" scope="col">Vittorie</th>
            <th className="px-4 py-3 font-medium" scope="col">Ultima vittoria</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/[0.05]">
          {players.length ? players.map((player) => (
            <tr
              key={player.id}
              data-rank={player.position <= 3 ? player.position : undefined}
              className="transition-colors hover:bg-cyber-cyan/[0.045]"
            >
              <td className="px-4 py-3.5 font-mono text-xs text-cyber-muted">{String(player.position).padStart(2, '0')}</td>
              <td className="leaderboard-player-cell flex items-center gap-3 px-4 py-2.5 font-medium text-cyber-text">
                <PlayerAvatar player={player} />
                <span>{player.name}</span>
              </td>
              <td className="px-4 py-3.5"><NeonBadge>{player.wins.toLocaleString('it-IT')}</NeonBadge></td>
              <td className="px-4 py-3.5 text-xs tabular-nums text-cyber-muted">
                <time dateTime={player.lastWinAt}>{new Date(player.lastWinAt).toLocaleDateString('it-IT')}</time>
              </td>
            </tr>
          )) : (
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
