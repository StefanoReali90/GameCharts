import { cardForScore } from '../../utils/positionCards.js'
import PlayingCardThumbnail from './PlayingCardThumbnail.jsx'
import { useI18n } from '../../i18n/I18nProvider.jsx'

export default function ScoreCards({ scores, wrap = true }) {
  const { t } = useI18n()
  if (!scores.length) return <span>—</span>

  return (
    <span className={`inline-flex items-center justify-center gap-1.5 ${wrap ? 'flex-wrap' : 'flex-nowrap'}`} role="img" aria-label={t('scores.aria', { scores: scores.join(', ') })}>
      {scores.map((score, index) => (
        <PlayingCardThumbnail key={`${index}-${score}`} card={cardForScore(score)} className="h-[46px] w-[32px]" />
      ))}
    </span>
  )
}
