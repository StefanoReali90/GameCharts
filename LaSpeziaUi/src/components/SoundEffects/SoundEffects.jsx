import { soundDefaults } from './config'
import { useEffect } from 'react'
import { setEffectsVolume, unlockEffectsAudio, prepareEffectsAudio, playButtonClick, playPageChange, configureEffects } from '../../audio/engine.js'
export default function SoundEffects({ enabled = true, muted = false, volume = soundDefaults.volume, preload = soundDefaults.preload, unlockOnInteraction = soundDefaults.unlockOnInteraction, maxPlaybackDelayMs = soundDefaults.maxPlaybackDelayMs, deduplicationWindowMs = soundDefaults.deduplicationWindowMs, interactionSounds = true, effectOptions = {} }) {
  useEffect(() => { setEffectsVolume(enabled && !muted ? volume : 0); configureEffects({ maxPlaybackDelayMs, effectOptions }) }, [enabled, muted, volume, maxPlaybackDelayMs, effectOptions])
  useEffect(() => { if (preload) prepareEffectsAudio() }, [preload])
  useEffect(() => {
    if (!enabled) return
    let lastButton, lastTime = 0
    const unlock = () => { if (unlockOnInteraction) unlockEffectsAudio() }
    unlock()
    const selector = typeof interactionSounds === 'object' ? interactionSounds.selector ?? 'button' : 'button'
    const play = (button) => {
      if (!interactionSounds || !button || button.disabled || button.closest('[aria-disabled="true"]')) return
      playButtonClick()
      if (button.dataset.sound === 'page') playPageChange()
    }
    const pointer = (event) => { unlock(); if (event.button !== 0) return; const button = event.target.closest?.(selector); if (!button) return; lastButton = button; lastTime = performance.now(); play(button) }
    const click = (event) => { const button = event.target.closest?.(selector); if (!button || event.detail !== 0 || (button === lastButton && performance.now() - lastTime < deduplicationWindowMs)) return; unlock(); play(button) }
    document.addEventListener('pointerdown', pointer, true); document.addEventListener('keydown', unlock, true); document.addEventListener('click', click, true)
    return () => { document.removeEventListener('pointerdown', pointer, true); document.removeEventListener('keydown', unlock, true); document.removeEventListener('click', click, true) }
  }, [enabled, interactionSounds, unlockOnInteraction, deduplicationWindowMs])
  return null
}
