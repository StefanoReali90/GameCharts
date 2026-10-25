import { UserRound } from 'lucide-react'
import { cardLabel, cardsForPosition } from '../../utils/positionCards.js'
import { cn } from '../../lib/utils.ts'
import PlayingCardThumbnail from '../ui/PlayingCardThumbnail.jsx'
import { useI18n } from '../../i18n/I18nProvider.jsx'

export default function PlayerAvatar({ player, size = 'small' }) {
  const { t } = useI18n()
  const cards = cardsForPosition(player.position)
  const sizeClasses = size === 'large'
    ? cards.length > 2 ? 'h-[58px] w-[102px]' : cards.length > 1 ? 'h-[58px] w-[72px]' : 'h-[58px] w-[44px]'
    : cards.length > 2 ? 'h-[50px] w-[84px]' : cards.length > 1 ? 'h-[50px] w-[62px]' : 'h-[50px] w-[36px]'

  return (
    <span
      className={cn(
        'leaderboard-avatar relative inline-flex shrink-0 items-center justify-center',
        sizeClasses,
        cards.length
          ? 'playing-card-avatar overflow-visible'
          : 'rounded-xl border border-cyber-cyan/30 bg-cyber-cyan/10 text-cyan-100 shadow-neon-cyan',
        cards.length === 2 && 'playing-card-avatar--pair',
        cards.length === 3 && 'playing-card-avatar--triple',
      )}
      role="img"
      aria-label={t(cards.length ? 'profile.cards' : 'profile.empty', { name: player.fullName ?? `${player.name} ${player.surname}`, cards: cards.map((card) => cardLabel(card, t)).join(', ') })}
    >
      {cards.length
        ? cards.map((card, index) => <PlayingCardThumbnail key={`${card.kind}-${card.rank ?? ''}-${card.suit ?? ''}-${index}`} card={card} className={cn(size === 'large' ? 'h-[54px] w-[38px]' : 'h-[46px] w-[32px]', index > 0 && '-ml-2')} />)
        : <UserRound className={size === 'large' ? 'h-5 w-5' : 'h-4 w-4'} aria-hidden="true" />}
    </span>
  )
}
