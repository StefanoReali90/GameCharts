import { motion } from 'framer-motion'
import { useFloatingTilt } from '../../hooks/useFloatingTilt.js'
import { cn } from '../../utils/cn.ts'
import Icon from '../Icon/Icon.jsx'
import { variants, nativeVariants, baseClasses } from './config'
export default function Button({ variant = 'subtle', type = 'button', motionEnabled = true, className, children, icon, iconOnly = false, size, style, onPointerMove, onPointerLeave, ...props }) {
  const native = variant in nativeVariants
  const floating = useFloatingTilt({ tilt: !native && motionEnabled ? 7 : 0 })
  const Element = native ? 'button' : motion.button
  return <Element type={type} className={cn(native ? nativeVariants[variant] : baseClasses, !native && (variants[variant] ?? variants.subtle), !native && motionEnabled && 'transform-gpu', iconOnly && 'shrink-0', size === 'icon' && 'h-9 min-h-9 w-9 p-0', className)}
    style={{ ...(!native && motionEnabled ? floating.style : {}), ...style }}
    onPointerMove={(e) => { if (!native && motionEnabled) floating.onPointerMove(e); onPointerMove?.(e) }}
    onPointerLeave={(e) => { if (!native && motionEnabled) floating.onPointerLeave(); onPointerLeave?.(e) }}
    {...(!native ? { whileTap: { scale: 0.98 } } : {})} {...props}>
    {typeof icon === 'string' ? <Icon name={icon} aria-hidden="true" /> : icon}{children}
  </Element>
}
