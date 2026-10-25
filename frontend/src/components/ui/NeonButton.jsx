import { motion } from 'framer-motion'
import { useFloatingTilt } from '../../hooks/useFloatingTilt.js'
import { cn } from '../../lib/utils.ts'

const variants = {
  primary: 'border-cyber-cyan/60 bg-cyber-cyan/15 text-cyan-50 shadow-neon-cyan hover:border-cyber-purple/70 hover:bg-cyber-purple/15 hover:shadow-neon-purple',
  subtle: 'border-cyber-purple/35 bg-cyber-purple/[0.08] text-cyber-text hover:border-cyber-cyan/65 hover:bg-cyber-cyan/10 hover:shadow-neon-cyan',
  ghost: 'border-transparent bg-transparent text-cyber-muted hover:border-cyber-purple/40 hover:bg-cyber-purple/[0.08] hover:text-cyber-text',
}

export default function NeonButton({ variant = 'subtle', motionEnabled = true, className, children, style, onPointerMove, onPointerLeave, ...props }) {
  const floating = useFloatingTilt({ tilt: motionEnabled ? 7 : 0, float: motionEnabled ? 2 : 0, duration: 4.4 })

  return (
    <motion.button
      className={cn(
        'inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border px-4 py-2 text-sm font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyber-cyan/70 disabled:opacity-50',
        motionEnabled && 'transform-gpu',
        variants[variant] ?? variants.subtle,
        className,
      )}
      style={{ ...(motionEnabled ? floating.style : {}), ...style }}
      animate={motionEnabled ? floating.animate : undefined}
      transition={motionEnabled ? floating.transition : undefined}
      onPointerMove={(event) => { if (motionEnabled) floating.onPointerMove(event); onPointerMove?.(event) }}
      onPointerLeave={(event) => { if (motionEnabled) floating.onPointerLeave(); onPointerLeave?.(event) }}
      whileTap={{ scale: 0.98 }}
      {...props}
    >
      {children}
    </motion.button>
  )
}
