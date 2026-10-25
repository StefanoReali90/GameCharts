import NeonCard from '../ui/NeonCard.jsx'
import PlayerAvatar from './PlayerAvatar.jsx'
import { useI18n } from '../../i18n/I18nProvider.jsx'
import { playCrystalTap } from '../../utils/uiSounds.js'

export default function PodiumCard({ player, label, tone, rank, impactActive = false, floatingEnabled = true, className }) {
  const { t, locale } = useI18n()
  return (
    <NeonCard
      as="article"
      tone={tone}
      tilt={4}
      float={floatingEnabled ? 4 : 0}
      duration={4.6 + rank * 0.4}
      onPointerDown={(event) => { if (event.button === 0) playCrystalTap(rank) }}
      className={`podium-card podium-card--${tone}${impactActive ? ' podium-card--impact' : ''} flex w-full flex-col items-center justify-center gap-1 overflow-hidden px-2 py-2.5 text-center sm:px-3 ${className}`}
      aria-label={player ? `${label}: ${player.fullName}, ${player.wins.toLocaleString(locale)} ${t(player.wins === 1 ? 'leaderboard.winOne' : 'leaderboard.winMany')}` : `${label}: ${t('leaderboard.waiting')}`}
    >
      <span className="podium-rank rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.12em]">{label}</span>
      {player ? (
        <>
          <PlayerAvatar player={player} size="large" />
          <h2 className="max-w-full break-words text-sm font-semibold leading-tight text-cyber-text">{player.fullName}</h2>
          <p className="podium-score m-0 text-base font-bold tabular-nums">
            {player.wins.toLocaleString(locale)} <span className="text-[10px] font-semibold uppercase tracking-widest">{t(player.wins === 1 ? 'leaderboard.winOne' : 'leaderboard.winMany')}</span>
          </p>
          <p className="m-0 text-xs tabular-nums text-cyber-muted">{t('leaderboard.streak', { count: player.winStreak, score: player.bestScore })}</p>
        </>
      ) : (
        <>
          <p className="m-0 text-sm text-cyber-muted">{t('leaderboard.waiting')}</p>
        </>
      )}
    </NeonCard>
  )
}
