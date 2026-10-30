import { cn } from '../../utils/cn.ts'
import { cardAssetName } from '../../utils/playingCards.js'
import { cardAssets, cardSizes } from './config'
export default function FrenchPlayingCard({ card, size = 'small', width, height, className, style, ...props }) {
  const src = cardAssets[`../../assets/cards/png/${cardAssetName(card)}.png`]
  if (!src) return null
  const dimensions = size === 'custom' ? { width: width ?? (height != null ? height * cardSizes.small.width / cardSizes.small.height : cardSizes.small.width), height: height ?? (width != null ? width * cardSizes.small.height / cardSizes.small.width : cardSizes.small.height) } : undefined
  return <span className={cn('playing-card-thumbnail relative block shrink-0 overflow-hidden rounded-[3px]', `playing-card--${size}`, className)} style={{...dimensions, ...style}} aria-hidden="true" {...props}>
    <img src={src} alt="" className="block h-full w-full object-contain" decoding="async" />{card.kind === 'custom-value' && <span className="absolute inset-0 grid place-items-center px-0.5 font-mono text-[10px] font-bold text-slate-950">{card.value}</span>}
  </span>
}
