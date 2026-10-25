import { cn } from '../../lib/utils.ts'
import { cardAssetName, playingCardPath } from '../../utils/playingCards.js'

export default function PlayingCardThumbnail({ card, className }) {
  const src = playingCardPath(cardAssetName(card))
  if (!src) return null

  return (
    <span className={cn('playing-card-thumbnail relative block h-full shrink-0 overflow-hidden rounded-[3px]', className)} aria-hidden="true">
      <img src={src} alt="" className="block h-full w-full object-contain" decoding="async" />
      {card.kind === 'custom-value' && <span className="absolute inset-0 grid place-items-center px-0.5 font-mono text-[10px] font-bold text-slate-950">{card.value}</span>}
    </span>
  )
}
