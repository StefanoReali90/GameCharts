import test from 'node:test'
import assert from 'node:assert/strict'
import { cardForScore, cardPoints, cardsForPosition } from './positionCards.js'
import { cardAssetName } from './playingCards.js'

test('i valori delle carte seguono le regole del gioco', () => {
  assert.equal(cardPoints({ kind: 'joker' }), -1)
  assert.equal(cardPoints({ kind: 'court', rank: 'king', suit: 'heart' }), 0)
  assert.equal(cardPoints({ kind: 'court', rank: 'king', suit: 'diamond' }), 0)
  assert.equal(cardPoints({ kind: 'court', rank: 'king', suit: 'spade' }), 10)
  assert.equal(cardPoints({ kind: 'court', rank: 'queen', suit: 'heart' }), 10)
  assert.equal(cardPoints({ kind: 'number', rank: 1, suit: 'spade' }), 1)
  assert.equal(cardPoints({ kind: 'number', rank: 10, suit: 'spade' }), 10)
})

test('ogni intero del punteggio corrisponde a una carta', () => {
  for (const score of [-1, 0, 1, 2, 9, 10, 48]) {
    assert.equal(cardPoints(cardForScore(score)), score)
  }
  assert.deepEqual([-1, 0, 1, 10, 48].map((score) => cardAssetName(cardForScore(score))), [
    'joker_custom', 'heart_king', 'spade_1', 'spade_10', 'card-base',
  ])
})

test('il podio conserva le carte speciali e le altre posizioni sommano al proprio numero', () => {
  assert.deepEqual([1, 2, 3].map((position) => cardsForPosition(position).reduce((sum, card) => sum + cardPoints(card), 0)), [-2, -1, 0])
  for (let position = 4; position <= 29; position += 1) {
    assert.equal(cardsForPosition(position).reduce((sum, card) => sum + cardPoints(card), 0), position)
  }
  assert.deepEqual(cardsForPosition(10).map(cardAssetName), ['spade_10'])
  assert.deepEqual(cardsForPosition(21).map(cardAssetName), ['spade_queen', 'club_jack', 'spade_1'])
  assert.deepEqual(cardsForPosition(1).map(cardAssetName), ['joker_custom', 'joker_custom'])
})
