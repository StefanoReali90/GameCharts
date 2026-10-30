import { motion } from 'framer-motion'
import { useFloatingTilt } from '../../hooks/useFloatingTilt.js'
import { cn } from '../../utils/cn.ts'
import { titleSizes } from './config'

export default function Title({ as = 'h2', title, children, size = 'large', neon = true,
  textOutline = false, showDivider = false, leading, className, headingClassName, ...props }) {
  const Heading = motion[as] ?? motion.h2
  const floating = useFloatingTilt({ tilt: 2.5 })
  const text = title ?? children
  const heading = <Heading className={cn('m-0 flex items-center justify-center gap-3 font-display font-bold transform-gpu neon-title', titleSizes[size] ?? titleSizes.large, className)}
    style={floating.style} onPointerMove={floating.onPointerMove} onPointerLeave={floating.onPointerLeave} {...props}>
    {leading}
    <span className="neon-title__layers" data-neon={neon} data-outline={textOutline === 'rainbow' ? 'rainbow' : undefined}
      style={textOutline && textOutline !== 'rainbow' ? { WebkitTextStroke: `1px ${typeof textOutline === 'string' ? textOutline : '#f7f9fc'}` } : undefined}>
      {neon && <><span className="neon-title__shadow" aria-hidden="true">{text}</span><span className="neon-title__glow" aria-hidden="true">{text}</span></>}
      <span className="neon-title__text">{text}</span>
    </span>
  </Heading>
  return showDivider ? <header className={cn('page-heading flex justify-center', headingClassName)}>{heading}</header> : heading
}
