import { motion } from 'framer-motion'
import { useFloatingTilt } from '../../hooks/useFloatingTilt.js'
import ScoreCards from '../ui/ScoreCards.jsx'
import { useI18n } from '../../i18n/I18nProvider.jsx'

export default function MatchHistoryTable({ matches }) {
  const { t, locale } = useI18n()
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
      <table className="history-table w-full min-w-[480px] border-collapse text-center text-sm">
        <thead className="sticky top-0 z-10 bg-cyber-surface/90 text-[10px] capitalize tracking-[0.15em] text-cyber-muted backdrop-blur-xl">
          <tr>
            <th className="px-4 py-3 text-center font-medium" scope="col">{t('history.date')}</th>
            <th className="px-4 py-3 text-center font-medium" scope="col">{t('history.winner')}</th>
            <th className="px-4 py-3 text-center font-medium" scope="col">{t('history.scores')}</th>
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
              <td className="px-4 py-3.5 text-xs tabular-nums text-cyber-muted"><ScoreCards scores={match.winnerScores} /></td>
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
    </motion.div>
  )
}
