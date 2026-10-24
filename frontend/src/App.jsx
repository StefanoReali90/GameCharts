import { useEffect, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { AppNavbar, AppSidebar } from './components/layout/index.js'
import OpeningVideo from './components/layout/OpeningVideo.jsx'
import LeaderboardPage from './pages/leaderboard/LeaderboardPage.jsx'
import MatchHistoryPage from './pages/match-history/MatchHistoryPage.jsx'
import { cn } from './lib/utils.ts'

export default function App() {
  const [sidebarMode, setSidebarMode] = useState('closed')
  const [currentPage, setCurrentPage] = useState('leaderboard')
  const [showOpeningVideo, setShowOpeningVideo] = useState(
    () => !window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )
  const [podiumEntranceReady, setPodiumEntranceReady] = useState(
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )
  const [showBackgroundVideo, setShowBackgroundVideo] = useState(
    () => !window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )
  const sidebarOpen = sidebarMode === 'hover' || sidebarMode === 'pinned'

  useEffect(() => {
    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)')
    const updateVideo = () => {
      setShowBackgroundVideo(!motionPreference.matches)
      if (motionPreference.matches) setShowOpeningVideo(false)
    }
    motionPreference.addEventListener('change', updateVideo)
    return () => motionPreference.removeEventListener('change', updateVideo)
  }, [])

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
    setSidebarMode('dismissed')
  }

  const openSidebar = () => setSidebarMode('pinned')

  return (
    <div className="app-shell relative grid h-dvh min-h-0 grid-rows-[auto_minmax(0,1fr)] overflow-hidden bg-cyber-bg text-cyber-text">
      {showBackgroundVideo && (
        <video
          className="app-background-video"
          src="/videos/background-loop.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          disablePictureInPicture
          disableRemotePlayback
          aria-hidden="true"
          tabIndex={-1}
        />
      )}
      <AppNavbar sidebarOpen={sidebarOpen} onSidebarToggle={toggleSidebar} />
      <div
        data-sidebar-open={sidebarOpen}
        className={cn(
          'workspace-layout grid min-h-0 min-w-0 overflow-hidden transition-[grid-template-columns] duration-300 ease-[cubic-bezier(0.22,0.61,0.36,1)]',
          sidebarOpen
            ? 'grid-cols-[var(--sidebar-expanded-width)_minmax(0,1fr)]'
            : 'grid-cols-[var(--sidebar-rail-width)_minmax(0,1fr)]',
        )}
      >
        <AppSidebar
          sidebarOpen={sidebarOpen}
          currentPage={currentPage}
          onNavigate={navigateTo}
          onSidebarOpen={openSidebar}
          onPointerEnter={handleSidebarPointerEnter}
          onPointerLeave={handleSidebarPointerLeave}
        />
        <main className="page-container relative min-h-0 min-w-0 overflow-hidden">
          {currentPage === 'leaderboard' ? <LeaderboardPage entranceReady={podiumEntranceReady} /> : <MatchHistoryPage />}
        </main>
      </div>
      <AnimatePresence initial={false} onExitComplete={() => setPodiumEntranceReady(true)}>
        {showOpeningVideo && <OpeningVideo onFinish={() => setShowOpeningVideo(false)} />}
      </AnimatePresence>
    </div>
  )
}
