import { motion, useReducedMotion } from 'framer-motion'
import PodiumCard from './PodiumCard.jsx'

const podiumPlaces = [
  { rank: 1, label: '1° posto', tone: 'gold', gridClass: 'col-span-2 sm:col-span-1 sm:col-start-2 sm:row-start-1', heightClass: 'min-h-[150px] sm:min-h-[165px]', flight: { x: 0, y: -100, rotate: 0 } },
  { rank: 2, label: '2° posto', tone: 'silver', gridClass: 'col-span-1 sm:col-start-1 sm:row-start-1', heightClass: 'min-h-[135px] sm:min-h-[150px]', flight: { x: -90, y: -70, rotate: -10 } },
  { rank: 3, label: '3° posto', tone: 'bronze', gridClass: 'col-span-1 sm:col-start-3 sm:row-start-1', heightClass: 'min-h-[135px] sm:min-h-[145px]', flight: { x: 90, y: -70, rotate: 10 } },
]

export default function LeaderboardPodium({ players, expanded, entranceReady, podiumRef }) {
  const reducedMotion = useReducedMotion()

  return (
    <section ref={podiumRef} className="leaderboard-podium mx-auto grid w-full max-w-4xl grid-cols-2 items-end gap-3 sm:grid-cols-3" aria-label="Podio dei primi tre giocatori">
      {podiumPlaces.map((place) => (
        <motion.div
          key={place.rank}
          className={place.gridClass}
          initial={false}
          animate={expanded ? 'away' : entranceReady ? 'visible' : 'hidden'}
          variants={{
            hidden: { ...place.flight, opacity: 0, scale: 0.55 },
            visible: reducedMotion
              ? { x: 0, y: 0, rotate: 0, opacity: 1, scale: 1, transition: { duration: 0 } }
              : {
                  x: [place.flight.x, 0, 0, 0],
                  y: [place.flight.y, 14, -5, 0],
                  rotate: [place.flight.rotate, 0, 0, 0],
                  opacity: [0, 1, 1, 1],
                  scale: [0.55, 1.09, 0.98, 1],
                  transition: { duration: 0.82, times: [0, 0.62, 0.82, 1], ease: 'easeOut', delay: (3 - place.rank) * 0.23 },
                },
            away: reducedMotion
              ? { opacity: 0, transition: { duration: 0 } }
              : { ...place.flight, opacity: 0, scale: 0.55, transition: { duration: 0.5, ease: 'easeIn', delay: (place.rank - 1) * 0.05 } },
          }}
        >
          <PodiumCard {...place} className={place.heightClass} player={players.find((player) => player.position === place.rank)} />
        </motion.div>
      ))}
    </section>
  )
}
