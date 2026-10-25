import { motion } from 'framer-motion'
import { useFloatingTilt } from '../../hooks/useFloatingTilt.js'
import { cn } from '../../lib/utils.ts'

const controlClasses = 'h-11 w-full rounded-xl border border-cyber-purple/40 bg-cyber-bg/80 px-3 text-sm text-cyber-text outline-none shadow-[inset_0_0_14px_rgb(var(--cyber-purple)/0.08)] transition placeholder:text-cyber-muted/70 hover:border-cyber-cyan/55 focus:border-cyber-cyan focus:ring-2 focus:ring-cyber-cyan/25 focus:shadow-neon-cyan'

export function NeonField({ label, htmlFor, className, children }) {
  return (
    <label className={cn('grid min-w-0 gap-2', className)} htmlFor={htmlFor}>
      <span className="text-xs font-semibold capitalize tracking-[0.16em] text-cyan-100">{label}</span>
      {children}
    </label>
  )
}

export function NeonInput({ className, ...props }) {
  const floating = useFloatingTilt({ tilt: 3, float: 1.5, duration: 5.2 })

  return (
    <motion.input
      className={cn(controlClasses, 'transform-gpu', className)}
      style={floating.style}
      animate={floating.animate}
      transition={floating.transition}
      onPointerMove={floating.onPointerMove}
      onPointerLeave={floating.onPointerLeave}
      {...props}
    />
  )
}

export function NeonSelect({ className, children, ...props }) {
  return (
    <select
      className={cn(controlClasses, 'cursor-pointer appearance-auto pr-9', className)}
      {...props}
    >
      {children}
    </select>
  )
}
