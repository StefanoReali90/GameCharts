import { useEffect, useRef, useState } from 'react'
import { setBackgroundMusicElement, setBackgroundMusicVolume, setEffectsVolume } from '../utils/uiSounds.js'

const storageKey = 'gamechart-audio-settings-v2'
const defaults = { effectsVolume: 0.67, musicVolume: 0.04 }
const volumeOrDefault = (value, fallback) => typeof value === 'number' && Number.isFinite(value)
  ? Math.min(1, Math.max(0, value))
  : fallback

function loadSettings() {
  try {
    const saved = JSON.parse(window.localStorage.getItem(storageKey))
    if (saved) return {
      effectsVolume: volumeOrDefault(saved.effectsVolume, defaults.effectsVolume),
      musicVolume: volumeOrDefault(saved.musicVolume, defaults.musicVolume),
    }
  } catch {
    // Le impostazioni restano utilizzabili anche senza localStorage.
  }
  return defaults
}

export function useAudioSettings(musicReady) {
  const [settings, setSettings] = useState(loadSettings)
  const savedSettings = useRef(settings)
  const musicRef = useRef(null)

  useEffect(() => {
    const audio = musicRef.current
    setBackgroundMusicElement(audio)
    return () => setBackgroundMusicElement(null)
  }, [])

  useEffect(() => {
    setEffectsVolume(settings.effectsVolume)
    setBackgroundMusicVolume(settings.musicVolume)
  }, [settings])

  useEffect(() => {
    const audio = musicRef.current
    if (!audio) return
    if (musicReady) audio.play().catch(() => {})
    else audio.pause()
  }, [musicReady])

  useEffect(() => {
    if (!musicReady) return undefined
    const resumeAfterGesture = () => {
      const audio = musicRef.current
      if (audio?.paused) audio.play().catch(() => {})
    }
    window.addEventListener('pointerdown', resumeAfterGesture, true)
    window.addEventListener('keydown', resumeAfterGesture, true)
    return () => {
      window.removeEventListener('pointerdown', resumeAfterGesture, true)
      window.removeEventListener('keydown', resumeAfterGesture, true)
    }
  }, [musicReady])

  const changeEffectsVolume = (value) => {
    setEffectsVolume(value)
    setSettings((current) => ({ ...current, effectsVolume: value }))
  }
  const changeMusicVolume = (value) => {
    setBackgroundMusicVolume(value)
    setSettings((current) => ({ ...current, musicVolume: value }))
  }
  const restoreDefaults = () => {
    setEffectsVolume(defaults.effectsVolume)
    setBackgroundMusicVolume(defaults.musicVolume)
    setSettings(defaults)
  }
  const saveSettings = () => {
    savedSettings.current = settings
    try {
      window.localStorage.setItem(storageKey, JSON.stringify(settings))
    } catch {
      // I volumi restano attivi per la sessione corrente.
    }
  }
  const discardSettings = () => {
    setEffectsVolume(savedSettings.current.effectsVolume)
    setBackgroundMusicVolume(savedSettings.current.musicVolume)
    setSettings(savedSettings.current)
  }

  return { settings, musicRef, changeEffectsVolume, changeMusicVolume, restoreDefaults, saveSettings, discardSettings }
}
