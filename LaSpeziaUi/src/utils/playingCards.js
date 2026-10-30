export function cardAssetName(card) {
  if (card?.kind === 'joker') return 'joker_custom'
  if (card?.kind === 'number' || card?.kind === 'court') return `${card.suit}_${card.rank}`
  if (card?.kind === 'custom-value') return 'card-base'
  return null
}
