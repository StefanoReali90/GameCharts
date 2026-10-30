import { useEffect, useState } from 'react'
import { useReducedMotion } from 'laspeziaui'
import { Icon } from 'laspeziaui'
import { Card, Top3Avatar } from 'laspeziaui'
import { StreakFlame } from 'laspeziaui'
import { scoreCards } from '../config.jsx'
import { useI18n } from 'laspeziaui'
import { playCrystalTap } from 'laspeziaui'

function AnimatedWinCount({ wins, active, instant, locale, t }) {
  const reducedMotion = useReducedMotion()
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (reducedMotion || instant) return undefined
    setCount(0)
    if (!active || wins === 0) return undefined

    let frame
    let lastUpdate = 0
    const startedAt = performance.now()
    const advance = (now) => {
      const progress = Math.min(1, (now - startedAt) / 700)
      if (now - lastUpdate >= 40 || progress === 1) {
        setCount(Math.min(wins, Math.floor(wins * progress)))
        lastUpdate = now
      }
      if (progress < 1) frame = window.requestAnimationFrame(advance)
    }
    frame = window.requestAnimationFrame(advance)
    return () => window.cancelAnimationFrame(frame)
  }, [active, wins, reducedMotion, instant])

  const shown = reducedMotion || instant ? wins : count
  return <><span>{shown.toLocaleString(locale)}</span> <span className="text-[10px] font-semibold capitalize tracking-widest">{t(shown === 1 ? 'leaderboard.winOne' : 'leaderboard.winMany')}</span></>
}

export default function PodiumCard({ player, label, tone, impactActive = false, highlighted = false, instantWins = false, className }) {
  const { t, locale } = useI18n()
  return (
    <Card
      as="article"
      borderColor={tone}
      tilt={4}
      pressTilt={13}
      onPointerDown={(event) => { if (event.button === 0) playCrystalTap() }}
      className={`podium-card podium-card--${tone}${impactActive ? ' podium-card--impact' : ''}${highlighted ? ' podium-card--selected' : ''} flex w-full flex-col items-center justify-center gap-0.5 overflow-hidden px-2 py-2 text-center sm:px-3 ${className}`}
      data-player-id={player?.id}
      tabIndex={-1}
      aria-label={player ? `${label}: ${player.username}, ${player.wins.toLocaleString(locale)} ${t(player.wins === 1 ? 'leaderboard.winOne' : 'leaderboard.winMany')}` : `${label}: ${t('leaderboard.waiting')}`}
    >
      <span className="podium-rank rounded-full border px-2.5 py-0.5 text-[10px] font-bold capitalize tracking-[0.12em]">{label}</span>
      {player ? (
        <>
          <Top3Avatar position={player.position} label={t('profile.cards', { name: player.username, cards: Array.from({length:4-player.position}, () => t('cards.joker')).join(', ') })} />
          <h2 className="max-w-full break-words text-sm font-semibold leading-tight text-cyber-text">{player.username}</h2>
          <p className="podium-score m-0 text-base font-bold tabular-nums">
            <AnimatedWinCount wins={player.wins} active={impactActive} instant={instantWins} locale={locale} t={t} />
          </p>
          <div className="grid gap-0.5 text-[11px] leading-tight text-cyber-muted">
            <p className="podium-stat m-0" role="group" aria-label={`${t('leaderboard.streakColumn')}: ${player.winStreak}`}><span className="podium-stat-label">{t('leaderboard.streakColumn')}:</span> <StreakFlame count={player.winStreak} /></p>
            <p className="podium-stat m-0" role="group" aria-label={`${t('leaderboard.bestStreak')}: ${player.bestWinStreak}`}><span className="podium-stat-label">{t('leaderboard.bestStreak')}:</span><Icon name="Award" className="podium-stat-icon" size={12} aria-hidden="true" /> <span className="tabular-nums">{player.bestWinStreak}</span></p>
            <p className="podium-stat m-0" role="group" aria-label={t('leaderboard.best')}><span className="podium-stat-label">{t('leaderboard.best')}:</span> {scoreCards(player.bestScore)}</p>
          </div>
        </>
      ) : (
        <>
          <p className="m-0 text-sm text-cyber-muted">{t('leaderboard.waiting')}</p>
        </>
      )}
    </Card>
  )
}
