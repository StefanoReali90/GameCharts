import PodiumCard from './PodiumCard.jsx'

const podiumPlaces = [
  { rank: 1, label: '1° posto', tone: 'gold', className: 'col-span-2 min-h-[150px] sm:col-span-1 sm:col-start-2 sm:row-start-1 sm:min-h-[165px]' },
  { rank: 2, label: '2° posto', tone: 'silver', className: 'col-span-1 min-h-[135px] sm:col-start-1 sm:row-start-1 sm:min-h-[150px]' },
  { rank: 3, label: '3° posto', tone: 'bronze', className: 'col-span-1 min-h-[135px] sm:col-start-3 sm:row-start-1 sm:min-h-[145px]' },
]

export default function LeaderboardPodium({ players }) {
  return (
    <section className="leaderboard-podium mx-auto grid w-full max-w-4xl grid-cols-2 items-end gap-3 sm:grid-cols-3" aria-label="Podio dei primi tre giocatori">
      {podiumPlaces.map((place) => (
        <PodiumCard key={place.rank} {...place} player={players.find((player) => player.position === place.rank)} />
      ))}
    </section>
  )
}
