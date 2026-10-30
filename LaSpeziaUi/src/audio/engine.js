let audioContext
let effectsVolume = 1
let backgroundMusic
let backgroundMusicVolume = 0.2
let introAtmosphere
const noiseBuffers = new WeakMap()
let maxPlaybackDelayMs = 300
let effectOptions = {}
export function configureEffects(options = {}) {
  maxPlaybackDelayMs = options.maxPlaybackDelayMs ?? 300
  effectOptions = options.effectOptions ?? {}
}
function effectVolume(name) {
  const option = effectOptions[name] ?? {}
  return option.enabled === false ? 0 : effectsVolume * (option.volume ?? 1)
}

const clampVolume = (value) => Math.min(1, Math.max(0, Number(value) || 0))

function getAudioContext() {
  const AudioContextClass = window.AudioContext ?? window.webkitAudioContext
  if (!AudioContextClass) return null
  audioContext ??= new AudioContextClass()
  return audioContext
}

function getNoiseBuffer(context, duration) {
  let buffers = noiseBuffers.get(context)
  if (!buffers) {
    buffers = new Map()
    noiseBuffers.set(context, buffers)
  }
  if (!buffers.has(duration)) {
    const buffer = context.createBuffer(1, Math.ceil(context.sampleRate * duration), context.sampleRate)
    const samples = buffer.getChannelData(0)
    for (let index = 0; index < samples.length; index += 1) samples[index] = Math.random() * 2 - 1
    buffers.set(duration, buffer)
  }
  return buffers.get(duration)
}

export function prepareEffectsAudio() {
  const context = getAudioContext()
  if (!context) return
  getNoiseBuffer(context, 0.56)
  getNoiseBuffer(context, 0.23)
  getNoiseBuffer(context, 2)
}

export function unlockEffectsAudio() {
  const context = getAudioContext()
  if (context?.state === 'suspended') context.resume().catch(() => {})
}

function applyBackgroundVolume() {
  if (backgroundMusic) backgroundMusic.volume = backgroundMusicVolume
}

export function setEffectsVolume(value) {
  effectsVolume = clampVolume(value)
  if (introAtmosphere) introAtmosphere.gain.gain.value = effectsVolume * 0.12
}

export function setBackgroundMusicElement(element) {
  backgroundMusic = element
  applyBackgroundVolume()
}

export function setBackgroundMusicVolume(value) {
  backgroundMusicVolume = clampVolume(value)
  applyBackgroundVolume()
}

function withAudio(play) {
  const context = getAudioContext()
  if (!context) return

  if (context.state === 'running') {
    play(context)
    return
  }

  const requestedAt = performance.now()
  context.resume().then(() => {
    // Evita un suono in ritardo se il browser sblocca l'audio solo più tardi.
    if (performance.now() - requestedAt < maxPlaybackDelayMs) play(context)
  }).catch(() => {})
}

function bell(context, frequency, start, duration, volume) {
  for (const [harmonic, level] of [[1, 1], [2, 0.19], [3, 0.055]]) {
    const oscillator = context.createOscillator()
    const gain = context.createGain()
    oscillator.type = 'sine'
    oscillator.frequency.setValueAtTime(frequency * harmonic * 1.006, start)
    oscillator.frequency.exponentialRampToValueAtTime(frequency * harmonic, start + 0.055)
    gain.gain.setValueAtTime(0.0001, start)
    gain.gain.exponentialRampToValueAtTime(volume * level, start + 0.018)
    gain.gain.exponentialRampToValueAtTime(0.0001, start + duration)
    oscillator.connect(gain)
    gain.connect(context.destination)
    oscillator.start(start)
    oscillator.stop(start + duration + 0.02)
    oscillator.onended = () => {
      oscillator.disconnect()
      gain.disconnect()
    }
  }
}

function auraVoice(context, frequency, start, volume) {
  for (const [detune, level] of [[-5, 1], [5, 0.52]]) {
    const oscillator = context.createOscillator()
    const gain = context.createGain()
    oscillator.type = 'sine'
    oscillator.frequency.setValueAtTime(frequency * 0.985, start)
    oscillator.frequency.exponentialRampToValueAtTime(frequency, start + 0.21)
    oscillator.detune.setValueAtTime(detune, start)
    gain.gain.setValueAtTime(0.0001, start)
    gain.gain.exponentialRampToValueAtTime(Math.max(0.0002, volume * level), start + 0.045)
    gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.73)
    oscillator.connect(gain)
    gain.connect(context.destination)
    oscillator.start(start)
    oscillator.stop(start + 0.75)
    oscillator.onended = () => { oscillator.disconnect(); gain.disconnect() }
  }
}

function auraAir(context, start, volume) {
  const duration = 0.56
  const source = context.createBufferSource()
  const filter = context.createBiquadFilter()
  const gain = context.createGain()
  source.buffer = getNoiseBuffer(context, duration)
  filter.type = 'bandpass'
  filter.Q.value = 0.8
  filter.frequency.setValueAtTime(1300, start)
  filter.frequency.exponentialRampToValueAtTime(4200, start + duration)
  gain.gain.setValueAtTime(0.0001, start)
  gain.gain.exponentialRampToValueAtTime(Math.max(0.0002, volume * 0.12), start + 0.09)
  gain.gain.exponentialRampToValueAtTime(0.0001, start + duration)
  source.connect(filter)
  filter.connect(gain)
  gain.connect(context.destination)
  source.start(start)
  source.stop(start + duration)
  source.onended = () => { source.disconnect(); filter.disconnect(); gain.disconnect() }
}

export function playPodiumChime(rank) {
  const effectsVolume = effectVolume("playPodiumChime")
  const roots = [523.25, 493.88, 392]
  const root = roots[rank - 1]
  if (!root || effectsVolume === 0) return
  withAudio((context) => {
    const start = context.currentTime
    for (const [index, interval] of [1, 1.2599, 1.4983].entries()) {
      auraVoice(context, root * interval, start + index * 0.09, (0.045 - index * 0.008) * effectsVolume)
    }
    auraAir(context, start, effectsVolume)
  })
}

export function playButtonClick() {
  const effectsVolume = effectVolume("playButtonClick")
  if (effectsVolume === 0) return
  withAudio((context) => {
    const start = context.currentTime
    bell(context, 659.25, start, 0.095, 0.075 * effectsVolume)
    bell(context, 880, start + 0.035, 0.12, 0.046 * effectsVolume)
  })
}

export function playCrystalTap() {
  const effectsVolume = effectVolume("playCrystalTap")
  if (effectsVolume === 0) return
  withAudio((context) => {
    const start = context.currentTime
    const root = 1046.5
    for (const [partial, level, duration] of [[1, 1, 1.3], [2.41, 0.24, 0.95], [4.07, 0.08, 0.62]]) {
      const oscillator = context.createOscillator()
      const gain = context.createGain()
      const vibration = context.createOscillator()
      const vibrationDepth = context.createGain()
      oscillator.type = 'sine'
      oscillator.frequency.setValueAtTime(root * partial * 1.012, start)
      oscillator.frequency.exponentialRampToValueAtTime(root * partial, start + 0.08)
      vibration.type = 'sine'
      vibration.frequency.value = 6.5
      vibrationDepth.gain.value = 3
      vibration.connect(vibrationDepth).connect(oscillator.detune)
      gain.gain.setValueAtTime(0.0001, start)
      gain.gain.exponentialRampToValueAtTime(0.065 * level * effectsVolume, start + 0.009)
      gain.gain.exponentialRampToValueAtTime(0.0001, start + duration)
      oscillator.connect(gain).connect(context.destination)
      oscillator.start(start)
      vibration.start(start)
      oscillator.stop(start + duration + 0.01)
      vibration.stop(start + duration + 0.01)
      oscillator.onended = () => {
        oscillator.disconnect()
        vibration.disconnect()
        vibrationDepth.disconnect()
        gain.disconnect()
      }
    }
  })
}

export function playMedalWhoosh(rank) {
  const effectsVolume = effectVolume("playMedalWhoosh")
  if (effectsVolume === 0 || rank < 1 || rank > 3) return
  withAudio((context) => {
    const start = context.currentTime
    const duration = 0.23
    const source = context.createBufferSource()
    const filter = context.createBiquadFilter()
    const gain = context.createGain()
    const pitch = [1.35, 1.1, 0.9][rank - 1]
    source.buffer = getNoiseBuffer(context, duration)
    filter.type = 'bandpass'
    filter.Q.value = 0.65
    filter.frequency.setValueAtTime(850 * pitch, start)
    filter.frequency.exponentialRampToValueAtTime(2800 * pitch, start + duration)
    gain.gain.setValueAtTime(0.0001, start)
    gain.gain.exponentialRampToValueAtTime(0.075 * effectsVolume, start + 0.045)
    gain.gain.exponentialRampToValueAtTime(0.0001, start + duration)
    source.connect(filter).connect(gain).connect(context.destination)
    source.start(start)
    source.stop(start + duration)
    source.onended = () => { source.disconnect(); filter.disconnect(); gain.disconnect() }
  })
}

export function playPageChange() {
  const effectsVolume = effectVolume("playPageChange")
  if (effectsVolume === 0) return
  withAudio((context) => {
    const start = context.currentTime + 0.085
    bell(context, 392, start, 0.18, 0.032 * effectsVolume)
    bell(context, 523.25, start + 0.075, 0.24, 0.043 * effectsVolume)
  })
}

export function stopIntroAtmosphere() {
  if (!introAtmosphere) return
  const { sources, nodes, gain } = introAtmosphere
  introAtmosphere = undefined
  gain.gain.cancelScheduledValues(audioContext.currentTime)
  gain.gain.setValueAtTime(gain.gain.value, audioContext.currentTime)
  gain.gain.linearRampToValueAtTime(0, audioContext.currentTime + 0.025)
  for (const source of sources) {
    source.stop(audioContext.currentTime + 0.03)
    source.onended = () => {
      for (const node of nodes) node.disconnect()
    }
  }
}

export function startIntroAtmosphere(video) {
  const effectsVolume = effectVolume("startIntroAtmosphere")
  if (effectsVolume === 0 || video.paused || video.ended) return
  withAudio((context) => {
    if (video.paused || video.ended || introAtmosphere) return
    const remaining = (Number.isFinite(video.duration) ? video.duration - video.currentTime : 12) / Math.max(0.1, video.playbackRate || 1)
    if (remaining <= 0) return
    const start = context.currentTime
    const gain = context.createGain()
    gain.gain.setValueAtTime(0, start)
    const fadeIn = Math.min(0.8, remaining / 3)
    gain.gain.linearRampToValueAtTime(effectsVolume * 0.12, start + fadeIn)
    gain.gain.setValueAtTime(effectsVolume * 0.12, start + Math.max(fadeIn, remaining - 0.35))
    gain.gain.linearRampToValueAtTime(0, start + remaining)
    gain.connect(context.destination)

    const noise = context.createBufferSource()
    noise.buffer = getNoiseBuffer(context, 2)
    noise.loop = true
    const filter = context.createBiquadFilter()
    filter.type = 'bandpass'
    filter.Q.value = 0.55
    filter.frequency.setValueAtTime(170, start)
    filter.frequency.exponentialRampToValueAtTime(1250, start + remaining)
    const airGain = context.createGain()
    airGain.gain.value = 0.38
    noise.connect(filter).connect(airGain).connect(gain)

    const drone = context.createOscillator()
    drone.type = 'sine'
    drone.frequency.setValueAtTime(55, start)
    drone.frequency.exponentialRampToValueAtTime(82.4, start + remaining)
    const droneGain = context.createGain()
    droneGain.gain.value = 0.45
    drone.connect(droneGain).connect(gain)

    const shimmer = context.createOscillator()
    shimmer.type = 'triangle'
    shimmer.frequency.setValueAtTime(164.8, start)
    shimmer.frequency.exponentialRampToValueAtTime(220, start + remaining)
    const shimmerGain = context.createGain()
    shimmerGain.gain.value = 0.055
    shimmer.connect(shimmerGain).connect(gain)

    const sources = [noise, drone, shimmer]
    introAtmosphere = { sources, nodes: [noise, filter, airGain, drone, droneGain, shimmer, shimmerGain, gain], gain }
    let ended = 0
    for (const source of sources) {
      source.onended = () => {
        ended += 1
        if (ended === sources.length && introAtmosphere?.sources === sources) {
          for (const node of introAtmosphere.nodes) node.disconnect()
          introAtmosphere = undefined
        }
      }
      source.start(start)
      source.stop(start + remaining)
    }
  })
}
