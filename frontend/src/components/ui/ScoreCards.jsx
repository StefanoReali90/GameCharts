import PlayingCardThumbnail from './PlayingCardThumbnail.jsx'
import { cardsForScore } from '../../utils/positionCards.js'

export default function ScoreCards({ score }) {
  if (score === null) return <span>—</span>

  const cards = cardsForScore(score)
  return (
    <span className="inline-flex items-center justify-center gap-0.5" role="img" aria-label={String(score)}>
      {cards.map((card, index) => (
        <PlayingCardThumbnail key={`${card.kind}-${card.rank ?? ''}-${index}`} card={card} className="h-7 w-5" />
      ))}
    </span>
  )
}
