import { useEffect, useRef, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { AppNavbar, AppSidebar } from './components/layout/index.js'
import OpeningVideo from './components/layout/OpeningVideo.jsx'
import SettingsDialog from './components/layout/SettingsDialog.jsx'
import LeaderboardPage from './pages/leaderboard/LeaderboardPage.jsx'
import MatchHistoryPage from './pages/match-history/MatchHistoryPage.jsx'
import { addMatch, loadMatchData, saveMatchData } from './data/matchStore.js'
import { playButtonClick, playPageChange, unlockEffectsAudio } from './utils/uiSounds.js'
import { useAudioSettings } from './hooks/useAudioSettings.js'
import { useI18n } from './i18n/I18nProvider.jsx'

export default function App() {
  const [sidebarMode, setSidebarMode] = useState('closed')
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState('leaderboard')
  const [matchData, setMatchData] = useState(loadMatchData)
  const [showOpeningVideo, setShowOpeningVideo] = useState(
    () => !window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )
  const [openingVideoExited, setOpeningVideoExited] = useState(
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )
  const audio = useAudioSettings(openingVideoExited)
  const { saveLanguage, discardLanguage } = useI18n()
  const [podiumEntranceReady, setPodiumEntranceReady] = useState(
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )
  const [podiumEntranceFinished, setPodiumEntranceFinished] = useState(
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )
  const [showBackgroundVideo, setShowBackgroundVideo] = useState(
    () => !window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )
  const backgroundVideoRef = useRef(null)
  const [backgroundVideoPlaying, setBackgroundVideoPlaying] = useState(false)
  const sidebarOpen = sidebarMode === 'hover' || sidebarMode === 'pinned'

  useEffect(() => {
    unlockEffectsAudio()
    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)')
    const updateVideo = () => {
      setShowBackgroundVideo(!motionPreference.matches)
      if (motionPreference.matches) setShowOpeningVideo(false)
    }
    motionPreference.addEventListener('change', updateVideo)
    return () => motionPreference.removeEventListener('change', updateVideo)
  }, [])

  useEffect(() => {
    let lastPointerButton = null
    let lastPointerTime = 0
    const playButtonSound = (button) => {
      if (!button || button.disabled || button.closest('[aria-disabled="true"]')) return
      playButtonClick()
      if (button?.dataset.sound === 'page') playPageChange()
    }
    const onPointerDown = (event) => {
      unlockEffectsAudio()
      if (event.button !== 0) return
      const button = event.target.closest?.('button')
      if (!button) return
      lastPointerButton = button
      lastPointerTime = performance.now()
      playButtonSound(button)
    }
    const onClick = (event) => {
      const button = event.target.closest?.('button')
      if (!button || event.detail !== 0) return
      if (button === lastPointerButton && performance.now() - lastPointerTime < 500) return
      unlockEffectsAudio()
      playButtonSound(button)
    }
    document.addEventListener('pointerdown', onPointerDown, true)
    document.addEventListener('keydown', unlockEffectsAudio, true)
    document.addEventListener('click', onClick, true)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown, true)
      document.removeEventListener('keydown', unlockEffectsAudio, true)
      document.removeEventListener('click', onClick, true)
    }
  }, [])

  useEffect(() => {
    const video = backgroundVideoRef.current
    if (!video) return
    if (showBackgroundVideo && openingVideoExited && podiumEntranceFinished) {
      video.play().catch(() => setBackgroundVideoPlaying(false))
    } else {
      video.pause()
      setBackgroundVideoPlaying(false)
    }
  }, [showBackgroundVideo, openingVideoExited, podiumEntranceFinished])

  const handleSidebarPointerEnter = () => {
    setSidebarMode((mode) => mode === 'closed' ? 'hover' : mode)
  }

  const handleSidebarPointerLeave = () => {
    setSidebarMode((mode) => mode === 'hover' || mode === 'dismissed' ? 'closed' : mode)
  }

  const toggleSidebar = () => {
    setSidebarMode((mode) => mode === 'hover' || mode === 'pinned' ? 'closed' : 'pinned')
  }

  const navigateTo = (page) => {
    setCurrentPage(page)
    if (page !== 'leaderboard') setPodiumEntranceFinished(true)
    setSidebarMode('dismissed')
  }

  const openSidebar = () => setSidebarMode('pinned')

  const handleAddMatch = (winnerId, winnerScores) => {
    const nextData = addMatch(matchData, winnerId, winnerScores)
    setMatchData(nextData)
    saveMatchData(nextData)
  }

  return (
    <div
      className="app-shell relative grid h-dvh min-h-0 grid-rows-[auto_minmax(0,1fr)] overflow-hidden bg-cyber-bg text-cyber-text"
      data-sidebar-open={sidebarOpen}
      onCopyCapture={(event) => event.preventDefault()}
      onCutCapture={(event) => event.preventDefault()}
      onDragStartCapture={(event) => event.preventDefault()}
    >
      <audio
        ref={audio.musicRef}
        src="/assets/audio/aura-background.mp3"
        preload="auto"
        loop
        aria-hidden="true"
      />
      {showBackgroundVideo && (
        <video
          className="app-background-video"
          data-playing={backgroundVideoPlaying}
          ref={backgroundVideoRef}
          src="/videos/background-loop-optimized.mp4"
          poster="/videos/background-poster.jpg"
          muted
          loop
          playsInline
          preload="auto"
          onPlaying={() => setBackgroundVideoPlaying(true)}
          onPause={() => setBackgroundVideoPlaying(false)}
          onWaiting={() => setBackgroundVideoPlaying(false)}
          disablePictureInPicture
          disableRemotePlayback
          aria-hidden="true"
          tabIndex={-1}
        />
      )}
      <AppNavbar sidebarOpen={sidebarOpen} onSidebarToggle={toggleSidebar} />
      <div className="workspace-layout grid min-h-0 min-w-0 overflow-hidden">
        <AppSidebar
          sidebarOpen={sidebarOpen}
          currentPage={currentPage}
          onNavigate={navigateTo}
          onSettingsOpen={() => setSettingsOpen(true)}
          onSidebarOpen={openSidebar}
          onPointerEnter={handleSidebarPointerEnter}
          onPointerLeave={handleSidebarPointerLeave}
        />
        <span className="layout-inner-curve" aria-hidden="true" />
        <main className="page-container relative min-h-0 min-w-0 overflow-hidden">
          {currentPage === 'leaderboard'
            ? <LeaderboardPage entranceReady={podiumEntranceReady} entranceFinished={podiumEntranceFinished} onEntranceComplete={() => setPodiumEntranceFinished(true)} data={matchData} />
            : <MatchHistoryPage data={matchData} onAddMatch={handleAddMatch} />}
        </main>
      </div>
      <SettingsDialog
        open={settingsOpen}
        onClose={() => {
          audio.discardSettings()
          discardLanguage()
          setSettingsOpen(false)
        }}
        onSave={() => {
          audio.saveSettings()
          saveLanguage()
          setSettingsOpen(false)
        }}
        effectsVolume={audio.settings.effectsVolume}
        onEffectsVolumeChange={audio.changeEffectsVolume}
        musicVolume={audio.settings.musicVolume}
        onMusicVolumeChange={audio.changeMusicVolume}
        onRestoreDefaults={audio.restoreDefaults}
      />
      <AnimatePresence initial={false} onExitComplete={() => setOpeningVideoExited(true)}>
        {showOpeningVideo && <OpeningVideo onFinish={() => {
          setPodiumEntranceReady(true)
          setShowOpeningVideo(false)
        }} />}
      </AnimatePresence>
    </div>
  )
}
