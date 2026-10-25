import { useEffect, useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import NeonCard from '../ui/NeonCard.jsx'
import PlayerAvatar from './PlayerAvatar.jsx'
import StreakFlame from './StreakFlame.jsx'
import ScoreCards from '../ui/ScoreCards.jsx'
import { useI18n } from '../../i18n/I18nProvider.jsx'
import { playCrystalTap } from '../../utils/uiSounds.js'

function AnimatedWinCount({ wins, active, locale, t }) {
  const reducedMotion = useReducedMotion()
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (reducedMotion) return undefined
    setCount(0)
    if (!active || wins === 0) return undefined

    let frame
    const startedAt = performance.now()
    const advance = (now) => {
      const progress = Math.min(1, (now - startedAt) / 700)
      setCount(Math.min(wins, Math.floor(wins * progress)))
      if (progress < 1) frame = window.requestAnimationFrame(advance)
    }
    frame = window.requestAnimationFrame(advance)
    return () => window.cancelAnimationFrame(frame)
  }, [active, wins, reducedMotion])

  const shown = reducedMotion ? wins : count
  return <><span>{shown.toLocaleString(locale)}</span> <span className="text-[10px] font-semibold capitalize tracking-widest">{t(shown === 1 ? 'leaderboard.winOne' : 'leaderboard.winMany')}</span></>
}

export default function PodiumCard({ player, label, tone, rank, impactActive = false, floatingEnabled = true, className }) {
  const { t, locale } = useI18n()
  return (
    <NeonCard
      as="article"
      tone={tone}
      tilt={4}
      pressTilt={13}
      float={floatingEnabled ? 4 : 0}
      duration={4.6 + rank * 0.4}
      onPointerDown={(event) => { if (event.button === 0) playCrystalTap() }}
      className={`podium-card podium-card--${tone}${impactActive ? ' podium-card--impact' : ''} flex w-full flex-col items-center justify-center gap-0.5 overflow-hidden px-2 py-2 text-center sm:px-3 ${className}`}
      aria-label={player ? `${label}: ${player.username}, ${player.wins.toLocaleString(locale)} ${t(player.wins === 1 ? 'leaderboard.winOne' : 'leaderboard.winMany')}` : `${label}: ${t('leaderboard.waiting')}`}
    >
      <span className="podium-rank rounded-full border px-2.5 py-0.5 text-[10px] font-bold capitalize tracking-[0.12em]">{label}</span>
      {player ? (
        <>
          <PlayerAvatar player={player} size="large" />
          <h2 className="max-w-full break-words text-sm font-semibold leading-tight text-cyber-text">{player.username}</h2>
          <p className="podium-score m-0 text-base font-bold tabular-nums">
            <AnimatedWinCount wins={player.wins} active={impactActive} locale={locale} t={t} />
          </p>
          <div className="grid gap-0.5 text-[11px] leading-tight text-cyber-muted">
            <p className="m-0">{t('leaderboard.streakColumn')}: <StreakFlame count={player.winStreak} /></p>
            <p className="m-0">{t('leaderboard.bestStreak')}: <span className="tabular-nums">{player.bestWinStreak}</span></p>
            <p className="m-0 flex items-center justify-center gap-1.5">{t('leaderboard.best')}: <ScoreCards score={player.bestScore} /></p>
          </div>
        </>
      ) : (
        <>
          <p className="m-0 text-sm text-cyber-muted">{t('leaderboard.waiting')}</p>
        </>
      )}
    </NeonCard>
  )
}
