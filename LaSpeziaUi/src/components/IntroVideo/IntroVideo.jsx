import { introDefaults } from './config'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { startIntroAtmosphere, stopIntroAtmosphere } from '../../audio/engine.js'
export default function IntroVideo({ src, speed = introDefaults.speed, onComplete }) {
  const [visible, setVisible] = useState(() => !window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  const completed = useRef(false); const videoRef = useRef(null)
  const complete = () => { if (!completed.current) { completed.current = true; onComplete?.() } }
  const finish = () => { stopIntroAtmosphere(); setVisible(false) }
  useEffect(() => {
    if (!visible && !completed.current && !videoRef.current) complete()
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    const change = () => { if (query.matches) finish() }
    query.addEventListener('change',change)
    return () => { query.removeEventListener('change',change); stopIntroAtmosphere() }
  }, [])
  useEffect(() => { if (videoRef.current) videoRef.current.playbackRate = Math.max(0.1, speed) }, [speed])
  return <AnimatePresence initial={false} onExitComplete={complete}>{visible && <motion.div className="fixed inset-0 z-50 overflow-hidden bg-cyber-bg" exit={{opacity:0}} transition={{duration:introDefaults.fadeDuration,ease:[0.22,1,0.36,1]}}>
    <video ref={videoRef} className="absolute inset-0 h-full w-full object-cover" src={src} autoPlay muted playsInline preload="auto" disablePictureInPicture disableRemotePlayback
      onLoadedMetadata={(e) => { e.currentTarget.playbackRate = Math.max(0.1,speed); e.currentTarget.play().catch(finish) }} onPlaying={(e) => startIntroAtmosphere(e.currentTarget)}
      onRateChange={(e) => { stopIntroAtmosphere(); startIntroAtmosphere(e.currentTarget) }} onWaiting={stopIntroAtmosphere} onPause={stopIntroAtmosphere} onEnded={finish} onError={finish} aria-hidden="true" tabIndex={-1} />
  </motion.div>}</AnimatePresence>
}
