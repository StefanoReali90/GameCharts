import { useRef, useState } from 'react'
import { setEffectsVolume, setBackgroundMusicVolume } from '../audio/engine.js'
const valid = (value, fallback) => typeof value === 'number' && Number.isFinite(value) ? Math.round(Math.min(1, Math.max(0, value)) * 100) / 100 : fallback
export function useAudioSettings({ storageKey = 'gamechart-audio-settings-v2', defaultEffectsVolume = 0.67, defaultMusicVolume = 0.04 } = {}) {
  const defaults = { effectsVolume: defaultEffectsVolume, musicVolume: defaultMusicVolume }
  const [settings, setSettings] = useState(() => { try { const saved = JSON.parse(window.localStorage.getItem(storageKey)); if (saved) return { effectsVolume: valid(saved.effectsVolume, defaults.effectsVolume), musicVolume: valid(saved.musicVolume, defaults.musicVolume) } } catch {} return defaults })
  const savedSettings = useRef(settings)
  const apply = (next) => { setEffectsVolume(next.effectsVolume); setBackgroundMusicVolume(next.musicVolume); setSettings(next) }
  const changeEffectsVolume = (value) => { const v = valid(value, defaults.effectsVolume); setEffectsVolume(v); setSettings((s) => ({...s,effectsVolume:v})) }
  const changeMusicVolume = (value) => { const v = valid(value, defaults.musicVolume); setBackgroundMusicVolume(v); setSettings((s) => ({...s,musicVolume:v})) }
  const saveSettings = () => { savedSettings.current = settings; try { window.localStorage.setItem(storageKey,JSON.stringify(settings)) } catch {} }
  return { settings, changeEffectsVolume, changeMusicVolume, restoreDefaults: () => apply(defaults), saveSettings, discardSettings: () => apply(savedSettings.current) }
}
