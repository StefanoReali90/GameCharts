import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import PodiumCard from './PodiumCard.jsx'
import { playPodiumChime } from '../../utils/uiSounds.js'
import { useI18n } from '../../i18n/I18nProvider.jsx'

const entranceDuration = 0.82
const entranceStagger = 0.4
const impactPoint = 0.62

const podiumPlaces = [
  { rank: 1, tone: 'gold', gridClass: 'col-span-2 sm:col-span-1 sm:col-start-2 sm:row-start-1 sm:pb-6', heightClass: 'min-h-[150px] sm:min-h-[165px]', flight: { x: 0, y: -100, rotate: 0 } },
  { rank: 2, tone: 'silver', gridClass: 'col-span-1 sm:col-start-1 sm:row-start-1 sm:pb-3', heightClass: 'min-h-[135px] sm:min-h-[150px]', flight: { x: -90, y: -70, rotate: -10 } },
  { rank: 3, tone: 'bronze', gridClass: 'col-span-1 sm:col-start-3 sm:row-start-1', heightClass: 'min-h-[135px] sm:min-h-[145px]', flight: { x: 90, y: -70, rotate: 10 } },
]

export default function LeaderboardPodium({ players, expanded, entranceReady, entranceFinished, podiumRef, onEntranceComplete }) {
  const { t } = useI18n()
  const reducedMotion = useReducedMotion()
  const [litRanks, setLitRanks] = useState([])
  const [impactedRanks, setImpactedRanks] = useState([])
  const wasExpanded = useRef(expanded)
  const soundOnThisReveal = useRef(!entranceFinished)
  const impacted = useRef(new Set())
  const cameFromAbove = useRef(new Set())
  const sounded = useRef(new Set())

  const markImpact = (rank) => {
    if (impacted.current.has(rank)) return
    impacted.current.add(rank)
    setImpactedRanks((ranks) => [...ranks, rank])
  }

  useEffect(() => {
    const returnedFromTable = wasExpanded.current && !expanded
    wasExpanded.current = expanded
    if (expanded) {
      soundOnThisReveal.current = false
      impacted.current.clear()
      cameFromAbove.current.clear()
      sounded.current.clear()
      setImpactedRanks([])
      setLitRanks([])
    }
    if (returnedFromTable) soundOnThisReveal.current = true
  }, [expanded])

  useLayoutEffect(() => {
    for (const rank of impactedRanks) {
      if (sounded.current.has(rank)) continue
      sounded.current.add(rank)
      if (soundOnThisReveal.current && !reducedMotion && document.visibilityState === 'visible') playPodiumChime(rank)
    }
  }, [impactedRanks, reducedMotion])

  const podiumVariants = useMemo(() => podiumPlaces.map((place) => ({
    hidden: { ...place.flight, opacity: 0, scale: 0.55 },
    visible: reducedMotion
      ? { x: 0, y: 0, rotate: 0, opacity: 1, scale: 1, transition: { duration: 0 } }
      : {
          x: [place.flight.x, 0, 0, 0],
          y: [place.flight.y, 14, -5, 0],
          rotate: [place.flight.rotate, 0, 0, 0],
          opacity: [0, 1, 1, 1],
          scale: [0.55, 1.09, 0.98, 1],
          transition: { duration: entranceDuration, times: [0, impactPoint, 0.82, 1], ease: 'easeOut', delay: (3 - place.rank) * entranceStagger },
        },
    away: reducedMotion
      ? { opacity: 0, transition: { duration: 0 } }
      : { ...place.flight, opacity: 0, scale: 0.55, transition: { duration: 0.5, ease: 'easeIn', delay: (place.rank - 1) * 0.05 } },
  })), [reducedMotion])

  return (
    <section ref={podiumRef} className="leaderboard-podium mx-auto grid w-full max-w-4xl grid-cols-2 items-end gap-3 sm:grid-cols-3" aria-label={t('leaderboard.podium')}>
      {podiumPlaces.map((place, index) => (
        <motion.div
          key={place.rank}
          className={`podium-place podium-place--${place.tone} ${place.gridClass}`}
          initial={false}
          animate={expanded ? 'away' : entranceReady ? 'visible' : 'hidden'}
          onUpdate={(latest) => {
            if (!entranceReady || expanded || reducedMotion || impacted.current.has(place.rank)) return
            const y = Number(latest.y)
            if (!Number.isFinite(y)) return
            if (y < -8) cameFromAbove.current.add(place.rank)
            if (cameFromAbove.current.has(place.rank) && y >= 5) markImpact(place.rank)
          }}
          onAnimationComplete={(definition) => {
            if (definition !== 'visible') return
            markImpact(place.rank)
            setLitRanks((ranks) => ranks.includes(place.rank) ? ranks : [...ranks, place.rank])
            if (place.rank === 1) onEntranceComplete?.()
          }}
          variants={podiumVariants[index]}
        >
          <PodiumCard {...place} label={t('leaderboard.place', { rank: place.rank })} impactActive={!expanded && impactedRanks.includes(place.rank)} floatingEnabled={!expanded && entranceFinished && litRanks.includes(place.rank)} className={place.heightClass} player={players.find((player) => player.position === place.rank)} />
        </motion.div>
      ))}
    </section>
  )
}
