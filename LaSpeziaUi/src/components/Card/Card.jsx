import { motion } from 'framer-motion'
import { useFloatingTilt } from '../../hooks/useFloatingTilt.js'
import { cn } from '../../utils/cn.ts'
import { toneClasses, borderColors } from './config'
export default function Card({ as: Element = 'div', variant = 'glass', border = true, borderColor = 'neutral', borderEffect = 'neon', motion: movement = 'floating', size = 'small', className, children, tilt = 5, pressTilt = 0, style, onPointerMove, onPointerLeave, onPointerDown, onPointerUp, onPointerCancel, ...props }) {
  const Surface = motion[Element] ?? motion.div
  const floating = useFloatingTilt({ tilt: movement === 'floating' ? tilt : 0, pressTilt: movement === 'floating' ? pressTilt : 0 })
  const custom = !Object.hasOwn(toneClasses, borderColor)
  const color = borderColors[borderColor] ?? borderColor
  return <Surface className={cn('neon-surface relative rounded-2xl border', movement === 'floating' && 'transform-gpu', toneClasses[borderColor] ?? toneClasses.neutral, className)}
    style={{ ...(movement === 'floating' ? floating.style : {}), ...(custom ? { borderColor: color, boxShadow: `0 0 14px ${color}` } : {}), ...(!border ? { borderWidth: 0, boxShadow: 'none' } : borderEffect === 'none' ? { borderColor: color, boxShadow: 'none' } : {}), ...style }}
    onPointerMove={(e) => { floating.onPointerMove(e); onPointerMove?.(e) }} onPointerLeave={(e) => { floating.onPointerLeave(); onPointerLeave?.(e) }} onPointerDown={(e) => { floating.onPointerDown(e); onPointerDown?.(e) }} onPointerUp={(e) => { floating.onPointerUp(e); onPointerUp?.(e) }} onPointerCancel={(e) => { floating.onPointerCancel(); onPointerCancel?.(e) }} {...props}>{children}</Surface>
}
