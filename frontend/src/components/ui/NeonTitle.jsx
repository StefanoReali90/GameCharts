import { cn } from '../../lib/utils.ts'
import NeonHeading from './NeonHeading.jsx'

const sizeClasses = {
  sm: 'neon-title--sm',
  md: 'neon-title--md',
  lg: 'neon-title--lg',
}

export default function NeonTitle({ as = 'h2', title, size = 'lg', className, children, ...props }) {
  const label = title ?? children

  return (
    <NeonHeading
      as={as}
      plain
      customTypography
      className={cn('neon-title', sizeClasses[size] ?? sizeClasses.lg, className)}
      {...props}
    >
      <span className="neon-title__layers">
        <span className="neon-title__shadow" aria-hidden="true">{label}</span>
        <span className="neon-title__glow" aria-hidden="true">{label}</span>
        <span className="neon-title__text">{label}</span>
      </span>
    </NeonHeading>
  )
}
