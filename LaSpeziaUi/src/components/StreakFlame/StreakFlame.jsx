import { flameLevels } from './config'
import { Flame } from 'lucide-react'
import { useAnimationVisibility } from '../../hooks/useAnimationVisibility.js'

export default function StreakFlame({ count, intensity: selectedIntensity, animation = 'flicker' }) {
  const animationRef = useAnimationVisibility()
  const intensity = flameLevels[selectedIntensity] ?? (count === 0 ? 'off' : count === 1 ? 'warm' : 'strong')
  return (
    <span ref={animationRef} data-animation={animation} className={`streak-flame streak-flame--${intensity} relative inline-flex h-8 w-8 items-center justify-center tabular-nums`} style={{ '--streak-glow': `${Math.min(14, 6 + count * 2)}px` }}>
      <Flame size={31} strokeWidth={intensity !== 'off' ? 1.7 : 1.5} aria-hidden="true" />
      <span className="streak-flame__count" data-digits={String(count).length}>{count}</span>
    </span>
  )
}
