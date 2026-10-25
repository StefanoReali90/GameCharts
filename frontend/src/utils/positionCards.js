const joker = () => ({ kind: 'joker' })
const numberCard = (rank) => ({
  kind: 'number',
  rank,
  suit: 'spade',
})
const faceCard = (rank, suit) => ({ kind: 'court', rank, suit })

export function cardLabel(card, t) {
  if (card.kind === 'joker') return t('cards.joker')
  if (card.kind === 'custom-value') return t('cards.score', { score: card.value })
  if (card.kind === 'number') return t(card.rank === 1 ? 'cards.aceSpades' : 'cards.nSpades', { rank: card.rank })
  if (card.rank === 'king') return t('cards.kingHearts')
  if (card.rank === 'queen') return t('cards.queenSpades')
  return t('cards.jackClubs')
}

// Valori del gioco: il re rosso vale zero, tutte le altre figure valgono dieci.
export function cardPoints(card) {
  if (card.kind === 'joker') return -1
  if (card.kind === 'custom-value') return card.value
  if (card.kind === 'court') {
    if (card.rank === 'king' && (card.suit === 'heart' || card.suit === 'diamond')) return 0
    return 10
  }
  if (card.kind === 'number') return card.rank
  return null
}

export function cardForScore(score) {
  if (score === -1) return joker()
  if (score === 0) return faceCard('king', 'heart')
  if (score >= 1 && score <= 10) return numberCard(score)
  return { kind: 'custom-value', value: score }
}

export function cardsForPosition(position) {
  if (!Number.isSafeInteger(position) || position < 1) return []

  // Il podio conserva le mani speciali: -2, -1 e 0 punti.
  if (position === 1) return [joker(), joker()]
  if (position === 2) return [joker()]
  if (position === 3) return [faceCard('king', 'heart')]
  if (position <= 10) return [numberCard(position)]

  // Una figura vale dieci; ogni altra carta aggiunge il proprio valore.
  const tens = Math.floor(position / 10)
  const remainder = position % 10
  const cards = Array.from({ length: tens }, (_, index) => index === 0
    ? faceCard('queen', 'spade')
    : faceCard('jack', 'club'))
  if (remainder > 0) cards.push(numberCard(remainder))
  return cards
}
