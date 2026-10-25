import { motion } from 'framer-motion'
import { useEffect } from 'react'
import { startIntroAtmosphere, stopIntroAtmosphere } from '../../utils/uiSounds.js'

export default function OpeningVideo({ onFinish }) {
  useEffect(() => () => stopIntroAtmosphere(), [])

  const finish = () => {
    stopIntroAtmosphere()
    onFinish()
  }

  return (
    <motion.div
      className="fixed inset-0 z-50 overflow-hidden bg-cyber-bg"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
    >
      <video
        className="absolute inset-0 h-full w-full object-cover"
        src="/videos/entry-video-4x.mp4"
        autoPlay
        muted
        playsInline
        preload="auto"
        disablePictureInPicture
        disableRemotePlayback
        onLoadedMetadata={(event) => event.currentTarget.play().catch(finish)}
        onPlaying={(event) => startIntroAtmosphere(event.currentTarget)}
        onWaiting={stopIntroAtmosphere}
        onPause={stopIntroAtmosphere}
        onEnded={finish}
        onError={finish}
        aria-hidden="true"
        tabIndex={-1}
      />
    </motion.div>
  )
}
