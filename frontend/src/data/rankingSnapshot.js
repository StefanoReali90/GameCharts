const storageKey = 'gamechart-ranking-at-open-v1'

export function readRankingSnapshot(storage = window.localStorage) {
  try {
    const saved = JSON.parse(storage.getItem(storageKey))
    if (!saved || !Array.isArray(saved.positions)) return {}
    const entries = saved.positions.filter(([id, position]) => Number.isSafeInteger(id) && Number.isSafeInteger(position) && position > 0)
    return Object.fromEntries(entries)
  } catch {
    return {}
  }
}

export function saveRankingSnapshot(players, storage = window.localStorage) {
  try {
    storage.setItem(storageKey, JSON.stringify({ positions: players.map(({ id, position }) => [id, position]) }))
  } catch {
    // La classifica resta utilizzabile quando il browser non consente localStorage.
  }
}

export function positionChange(player, previousPositions) {
  const previous = previousPositions[player.id]
  return Number.isSafeInteger(previous) && previous > 0 ? previous - player.position : 0
}
