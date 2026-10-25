import { Flame } from 'lucide-react'

export default function StreakFlame({ count }) {
  const intensity = count === 0 ? 'off' : count === 1 ? 'warm' : 'strong'
  return (
    <span className={`streak-flame streak-flame--${intensity} relative inline-flex h-8 w-8 items-center justify-center tabular-nums`} style={{ '--streak-glow': `${Math.min(14, 6 + count * 2)}px` }}>
      <Flame size={31} strokeWidth={count > 0 ? 1.7 : 1.5} aria-hidden="true" />
      <span className="streak-flame__count" data-digits={String(count).length}>{count}</span>
    </span>
  )
}
