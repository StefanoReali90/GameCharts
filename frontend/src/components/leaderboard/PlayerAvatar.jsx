import { motion } from 'framer-motion'
import { UserRound } from 'lucide-react'
import { useFloatingTilt } from '../../hooks/useFloatingTilt.js'

export default function PlayerAvatar({ player, size = 'small' }) {
  const floating = useFloatingTilt({ tilt: 5, float: 1.5, duration: 5.8 })
  const sizeClasses = size === 'large' ? 'h-11 w-11' : 'h-9 w-9'

  return (
    <motion.span
      className={`leaderboard-avatar inline-grid ${sizeClasses} shrink-0 place-items-center rounded-xl border border-cyber-cyan/30 bg-cyber-cyan/10 text-cyan-100 shadow-neon-cyan transform-gpu`}
      style={floating.style}
      animate={floating.animate}
      transition={floating.transition}
      onPointerMove={floating.onPointerMove}
      onPointerLeave={floating.onPointerLeave}
      role="img"
      aria-label={`Avatar di ${player.name}`}
    >
      <UserRound className={size === 'large' ? 'h-5 w-5' : 'h-4 w-4'} aria-hidden="true" />
    </motion.span>
  )
}
