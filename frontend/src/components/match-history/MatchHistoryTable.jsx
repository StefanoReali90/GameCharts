import { motion } from 'framer-motion'
import { useFloatingTilt } from '../../hooks/useFloatingTilt.js'

export default function MatchHistoryTable({ matches }) {
  const floating = useFloatingTilt({ tilt: 0.5, float: 0.8, duration: 6.4 })

  return (
    <motion.div
      className="neon-surface neon-table-wrap min-h-0 overflow-auto rounded-2xl border border-cyber-purple/20 transform-gpu"
      style={floating.style}
      animate={floating.animate}
      transition={floating.transition}
      onPointerMove={floating.onPointerMove}
      onPointerLeave={floating.onPointerLeave}
    >
      <table className="history-table w-full min-w-[760px] border-collapse text-left text-sm">
        <thead className="sticky top-0 z-10 bg-cyber-surface/90 text-[10px] uppercase tracking-[0.15em] text-cyber-muted backdrop-blur-xl">
          <tr>
            <th className="px-4 py-3 font-medium" scope="col">Data</th>
            <th className="px-4 py-3 font-medium" scope="col">Gioco</th>
            <th className="px-4 py-3 font-medium" scope="col">Registrata da</th>
            <th className="px-4 py-3 font-medium" scope="col">Vincitori</th>
            <th className="px-4 py-3 font-medium" scope="col">Punteggio</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/[0.05]">
          {matches.length ? matches.map((match) => (
            <tr
              key={match.id}
              className="transition-colors hover:bg-cyber-purple/[0.045]"
            >
              <td className="whitespace-nowrap px-4 py-3.5 text-xs tabular-nums text-cyber-muted">
                <time dateTime={match.registeredAt}>{new Date(match.registeredAt).toLocaleDateString('it-IT')}</time>
              </td>
              <td className="px-4 py-3.5 font-medium text-cyber-text">{match.gameName}</td>
              <td className="px-4 py-3.5 text-cyber-muted">{match.callerName}</td>
              <td className="px-4 py-3.5 text-green-200">{match.winnerNames.join(', ')}</td>
              <td className="px-4 py-3.5 text-xs text-cyber-muted">
                {match.results.map((result) => `${result.playerName}: ${result.score}`).join(' · ') || '—'}
              </td>
            </tr>
          )) : (
            <tr>
              <td className="history-empty px-4 py-12 text-center text-sm text-cyber-muted" colSpan="5">
                Nessun match trovato con questi filtri
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </motion.div>
  )
}
