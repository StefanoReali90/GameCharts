export function scoreTotal(scores) {
  return scores.reduce((total, score) => total + score, 0)
}

function invalidScores() {
  const error = new Error('INVALID_SCORES')
  error.code = 'INVALID_SCORES'
  return error
}

export function validateScores(scores) {
  if (!Array.isArray(scores) || scores.length === 0 || !scores.every(Number.isSafeInteger) || !Number.isSafeInteger(scoreTotal(scores))) {
    throw invalidScores()
  }
  return scores
}

export function parseScoreInput(input) {
  if (typeof input !== 'string' || !input.trim()) throw invalidScores()
  const parts = input.split(',').map((part) => part.trim())
  if (parts.some((part) => !/^[+-]?\d+$/.test(part))) throw invalidScores()
  return validateScores(parts.map(Number))
}
