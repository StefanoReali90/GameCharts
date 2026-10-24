import { motion } from 'framer-motion'
import { useFloatingTilt } from '../../hooks/useFloatingTilt.js'
import { cn } from '../../lib/utils.ts'

const variants = {
  cyan: 'border-cyber-cyan/60 bg-cyber-cyan/15 text-cyan-100 shadow-neon-cyan',
  purple: 'border-cyber-purple/60 bg-cyber-purple/15 text-purple-100 shadow-neon-purple',
  green: 'border-cyber-green/60 bg-cyber-green/15 text-green-100 shadow-neon-green',
  neutral: 'border-cyber-cyan/30 bg-cyber-cyan/[0.06] text-cyber-muted',
}

export default function NeonBadge({ variant = 'cyan', className, children, ...props }) {
  const floating = useFloatingTilt({ tilt: 4, float: 1, duration: 5.4 })

  return (
    <motion.span
      className={cn('inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold tracking-wide transform-gpu', variants[variant] ?? variants.neutral, className)}
      style={floating.style}
      animate={floating.animate}
      transition={floating.transition}
      onPointerMove={floating.onPointerMove}
      onPointerLeave={floating.onPointerLeave}
      {...props}
    >
      {children}
    </motion.span>
  )
}
