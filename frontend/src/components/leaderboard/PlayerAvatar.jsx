export default function PlayerAvatar({ player, size = 'small' }) {
  return (
    <span
      className={`leaderboard-avatar leaderboard-avatar--${size}`}
      role="img"
      aria-label={`Avatar di ${player.name}`}
    >
      <i className={`nes-${player.avatar}`} aria-hidden="true" />
    </span>
  )
}
