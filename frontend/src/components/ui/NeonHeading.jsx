import { motion } from 'framer-motion'
import { useFloatingTilt } from '../../hooks/useFloatingTilt.js'
import { cn } from '../../lib/utils.ts'
import AuroraText from './AuroraText.jsx'

export default function NeonHeading({ as: Heading = 'h2', title, leading, className, children, ...props }) {
  const label = title ?? children
  const MotionHeading = motion[Heading]
  const floating = useFloatingTilt({ tilt: 2.5, float: 2, duration: 6 })

  return (
    <MotionHeading
      className={cn('m-0 flex items-center justify-center gap-3 font-display text-lg font-bold tracking-[0.12em] sm:text-2xl transform-gpu', className)}
      style={floating.style}
      animate={floating.animate}
      transition={floating.transition}
      onPointerMove={floating.onPointerMove}
      onPointerLeave={floating.onPointerLeave}
      {...props}
    >
      {leading}
      <AuroraText>{label}</AuroraText>
    </MotionHeading>
  )
}
