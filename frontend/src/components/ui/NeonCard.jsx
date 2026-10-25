import { motion } from 'framer-motion'
import { useFloatingTilt } from '../../hooks/useFloatingTilt.js'
import { cn } from '../../lib/utils.ts'

const toneClasses = {
  cyan: 'border-cyber-cyan/45 shadow-neon-cyan',
  purple: 'border-cyber-purple/45 shadow-neon-purple',
  green: 'border-cyber-green/45 shadow-neon-green',
  neutral: 'border-cyber-purple/30 shadow-panel-dark',
  gold: 'border-[#ffd85e] shadow-[0_0_14px_#ffca3866,0_0_36px_#ffca3833,inset_0_0_24px_#ffca381f]',
  silver: 'border-[#dbe9ff] shadow-[0_0_14px_#bdd7ff70,0_0_36px_#bdd7ff33,inset_0_0_24px_#bdd7ff1f]',
  bronze: 'border-[#f4a876] shadow-[0_0_14px_#f38b4e70,0_0_36px_#f38b4e33,inset_0_0_24px_#f38b4e1f]',
}

export default function NeonCard({
  as: Element = 'div', tone = 'neutral', className, children,
  tilt = 5, pressTilt = 0, float = 3, duration = 5, style,
  onPointerMove, onPointerLeave, onPointerDown, onPointerUp, onPointerCancel, ...props
}) {
  const Card = motion[Element] ?? motion.div
  const floating = useFloatingTilt({ tilt, pressTilt, float, duration })

  return (
    <Card
      className={cn(
        'neon-surface relative rounded-2xl border transform-gpu',
        toneClasses[tone] ?? toneClasses.neutral,
        className,
      )}
      style={{ ...floating.style, ...style }}
      animate={floating.animate}
      transition={floating.transition}
      onPointerMove={(event) => { floating.onPointerMove(event); onPointerMove?.(event) }}
      onPointerLeave={(event) => { floating.onPointerLeave(); onPointerLeave?.(event) }}
      onPointerDown={(event) => { floating.onPointerDown(event); onPointerDown?.(event) }}
      onPointerUp={(event) => { floating.onPointerUp(event); onPointerUp?.(event) }}
      onPointerCancel={(event) => { floating.onPointerCancel(); onPointerCancel?.(event) }}
      {...props}
    >
      {children}
    </Card>
  )
}
