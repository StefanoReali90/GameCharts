import test from 'node:test'
import assert from 'node:assert/strict'

test('preparazione effetti riusa contesto e buffer senza rigenerarli', async () => {
  let contexts=0,buffers=0
  class FakeContext {
    sampleRate=10
    constructor(){contexts++}
    createBuffer(channels,length){buffers++;return {getChannelData:()=>new Float32Array(length)}}
  }
  const previous=globalThis.window
  globalThis.window={AudioContext:FakeContext}
  try {
    const engine=await import('./engine.js?cache-test')
    engine.prepareEffectsAudio();engine.prepareEffectsAudio()
    assert.equal(contexts,1)
    assert.equal(buffers,3)
  } finally {globalThis.window=previous}
})

test('volume zero ed effetto disabilitato non avviano sintesi audio', async () => {
  const previous=globalThis.window
  globalThis.window={AudioContext:class {constructor(){throw Error('Sintesi non prevista')}}}
  try {
    const engine=await import('./engine.js?disabled-test')
    engine.setEffectsVolume(0)
    engine.playButtonClick();engine.playPageChange();engine.playMedalWhoosh(1);engine.playPodiumChime(1);engine.playCrystalTap()
    engine.setEffectsVolume(1)
    engine.configureEffects({effectOptions:{playButtonClick:{enabled:false}}})
    engine.playButtonClick()
  } finally {globalThis.window=previous}
})
