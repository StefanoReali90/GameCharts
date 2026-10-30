import FrenchPlayingCard from '../FrenchPlayingCard/FrenchPlayingCard.jsx'
import { avatarCards } from './config'
import { cn } from '../../utils/cn.ts'
export default function Top3Avatar({ position, label, className, ...props }) {
  const count = avatarCards[position]
  if (!count) return null
  return <span className={cn('leaderboard-avatar relative inline-flex shrink-0 items-center justify-center', count > 2 ? 'h-[58px] w-[102px]' : count > 1 ? 'h-[58px] w-[72px]' : 'h-[58px] w-[44px]', 'playing-card-avatar overflow-visible', count === 2 && 'playing-card-avatar--pair', count === 3 && 'playing-card-avatar--triple', className)} role="img" aria-label={label} {...props}>
    {Array.from({ length: count }, (_, index) => <FrenchPlayingCard key={index} card={{ kind: 'joker' }} size="medium" className={index > 0 ? '-ml-2' : undefined} />)}
  </span>
}
