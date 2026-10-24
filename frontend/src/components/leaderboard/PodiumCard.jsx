import PlayerAvatar from './PlayerAvatar.jsx'

export default function PodiumCard({ player, label, icon, className }) {
  return (
    <article
      className={`nes-container is-centered podium-card ${className}`}
      aria-label={player ? `${label}: ${player.name}, ${player.score} punti` : `${label}: in attesa`}
    >
      <p className="podium-rank">{label}</p>
      {player ? (
        <>
          <i className={`nes-icon ${icon} is-small podium-icon`} aria-hidden="true" />
          <PlayerAvatar player={player} size="large" />
          <h2 className="podium-name">{player.name}</h2>
          <p className="podium-score">{player.score.toLocaleString('it-IT')} PTS</p>
        </>
      ) : (
        <p className="podium-empty">IN ATTESA</p>
      )}
    </article>
  )
}
