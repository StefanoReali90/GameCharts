import { motion } from 'framer-motion'

const playbackSpeed = 3

export default function OpeningVideo({ onFinish }) {
  const setPlaybackSpeed = (event) => {
    event.currentTarget.playbackRate = playbackSpeed
  }

  return (
    <motion.div
      className="fixed inset-0 z-50 overflow-hidden bg-cyber-bg"
      exit={{ opacity: 0, scale: 1.035 }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
    >
      <video
        className="absolute inset-0 h-full w-full object-cover"
        src="/videos/entry-video.mp4"
        autoPlay
        muted
        playsInline
        preload="auto"
        disablePictureInPicture
        disableRemotePlayback
        onLoadedMetadata={(event) => {
          setPlaybackSpeed(event)
          event.currentTarget.play().catch(onFinish)
        }}
        onPlay={setPlaybackSpeed}
        onEnded={onFinish}
        onError={onFinish}
        aria-hidden="true"
        tabIndex={-1}
      />
    </motion.div>
  )
}
