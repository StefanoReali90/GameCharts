const validCardName = /^(?:(?:club|diamond|heart|spade)_(?:[1-9]|10|jack|queen|king)|joker_custom|card-base)$/

export function playingCardPath(cardName) {
  return validCardName.test(cardName) ? `/assets/svg-cards/png/${cardName}.png` : null
}

export function cardAssetName(card) {
  if (card.kind === 'joker') return 'joker_custom'
  if (card.kind === 'number' || card.kind === 'court') return `${card.suit}_${card.rank}`
  if (card.kind === 'custom-value') return 'card-base'
  return null
}
