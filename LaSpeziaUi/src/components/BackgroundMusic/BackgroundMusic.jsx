import { useEffect, useRef } from 'react'
import { setBackgroundMusicElement, setBackgroundMusicVolume } from '../../audio/engine.js'
import { backgroundMusicSrc } from './config'
export default function BackgroundMusic({ src = backgroundMusicSrc, playing = false, volume = 0.04, muted = false, loop = true, preload = 'auto', retryOnInteraction = true, onPlay, onPause, onEnded, onError }) {
  const ref = useRef(null)
  useEffect(() => { setBackgroundMusicElement(ref.current); return () => { ref.current?.pause(); setBackgroundMusicElement(null) } }, [])
  useEffect(() => { setBackgroundMusicVolume(muted ? 0 : volume) }, [volume, muted])
  useEffect(() => {
    const audio = ref.current
    if (!playing) { audio.pause(); return }
    const play = () => { if (audio.paused) audio.play().catch(() => {}) }
    play()
    if (!retryOnInteraction) return
    window.addEventListener('pointerdown', play, true); window.addEventListener('keydown', play, true)
    return () => { window.removeEventListener('pointerdown', play, true); window.removeEventListener('keydown', play, true) }
  }, [playing, src, retryOnInteraction])
  return <audio ref={ref} src={src} preload={preload} loop={loop} muted={muted} aria-hidden="true" onPlay={onPlay} onPause={onPause} onEnded={onEnded} onError={onError} />
}
