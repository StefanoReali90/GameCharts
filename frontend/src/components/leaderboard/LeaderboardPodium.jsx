import PodiumCard from './PodiumCard.jsx'

const podiumPlaces = [
  { rank: 1, label: '1° POSTO', icon: 'trophy', className: 'podium-card--first' },
  { rank: 2, label: '2° POSTO', icon: 'star', className: 'podium-card--second' },
  { rank: 3, label: '3° POSTO', icon: 'star', className: 'podium-card--third' },
]

export default function LeaderboardPodium({ players }) {
  return (
    <section className="leaderboard-podium" aria-label="Podio dei primi tre giocatori">
      {podiumPlaces.map((place, index) => (
        <PodiumCard key={place.rank} {...place} player={players[index]} />
      ))}
    </section>
  )
}
