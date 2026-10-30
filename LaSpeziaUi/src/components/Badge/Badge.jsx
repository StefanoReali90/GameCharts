import { motion } from 'framer-motion'
import { useFloatingTilt } from '../../hooks/useFloatingTilt.js'
import { cn } from '../../utils/cn.ts'

import { variants, badgeDefaults } from './config'

export default function Badge({ variant = badgeDefaults.variant, className, children, ...props }) {
  const floating = useFloatingTilt({ tilt: 4 })

  return (
    <motion.span
      className={cn('inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold tracking-wide transform-gpu', variants[variant] ?? variants.neutral, className)}
      style={floating.style}
      onPointerMove={floating.onPointerMove}
      onPointerLeave={floating.onPointerLeave}
      {...props}
    >
      {children}
    </motion.span>
  )
}
