import NeonCard from '../ui/NeonCard.jsx'
import PlayerAvatar from './PlayerAvatar.jsx'

export default function PodiumCard({ player, label, tone, rank, className }) {
  return (
    <NeonCard
      as="article"
      tone={tone}
      tilt={7}
      float={4}
      duration={4.6 + rank * 0.4}
      className={`podium-card podium-card--${tone} flex w-full flex-col items-center justify-center gap-1.5 overflow-hidden px-2 py-3 text-center sm:px-3 ${className}`}
      aria-label={player ? `${label}: ${player.name}, ${player.wins} vittorie` : `${label}: in attesa`}
    >
      <span className="podium-rank rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.12em]">{label}</span>
      {player ? (
        <>
          <PlayerAvatar player={player} />
          <h2 className="max-w-full break-words text-sm font-semibold leading-tight text-cyber-text">{player.name}</h2>
          <p className="podium-score m-0 text-base font-bold tabular-nums">
            {player.wins.toLocaleString('it-IT')} <span className="text-[10px] font-semibold uppercase tracking-widest">{player.wins === 1 ? 'vittoria' : 'vittorie'}</span>
          </p>
        </>
      ) : (
        <>
          <p className="m-0 text-sm text-cyber-muted">In attesa</p>
        </>
      )}
    </NeonCard>
  )
}
