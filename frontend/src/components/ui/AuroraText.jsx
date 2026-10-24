import { cn } from '../../lib/utils.ts'

const defaultRainbow = [
  '#ff4d91',
  '#ff9e42',
  '#fff15a',
  '#42edb4',
  '#35d7ff',
  '#6577ff',
  '#c15cff',
  '#ff4d91',
]

export default function AuroraText({ children, className, colors = defaultRainbow, speed = 1 }) {
  const duration = `${8 / Math.max(speed, 0.1)}s`
  const cycle = colors.at(-1) === colors[0] ? colors : [...colors, colors[0]]
  const gradient = `linear-gradient(90deg, ${[...cycle, ...cycle.slice(1)].join(', ')})`

  return (
    <span
      className={cn('magic-aurora-text relative isolate inline-grid', className)}
      style={{ '--aurora-gradient': gradient, '--aurora-duration': duration }}
    >
      <span className="magic-aurora-text__glow" aria-hidden="true">{children}</span>
      <span className="magic-aurora-text__fill">{children}</span>
    </span>
  )
}
