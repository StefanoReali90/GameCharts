import { useEffect, useState } from 'react'
import { AppNavbar, AppSidebar } from './components/layout/index.js'
import RainbowSpadeCursor from './components/cursor/RainbowSpadeCursor.jsx'
import LeaderboardPage from './pages/leaderboard/LeaderboardPage.jsx'
import MatchHistoryPage from './pages/match-history/MatchHistoryPage.jsx'
import './components/layout/AppShell.css'

export default function App() {
  const [sidebarMode, setSidebarMode] = useState('closed')
  const [currentPage, setCurrentPage] = useState('leaderboard')
  const [theme, setTheme] = useState(() => {
    try {
      return window.localStorage.getItem('la-spezia-theme') === 'dark' ? 'dark' : 'light'
    } catch {
      return 'light'
    }
  })
  const sidebarOpen = sidebarMode === 'hover' || sidebarMode === 'pinned'

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    try {
      window.localStorage.setItem('la-spezia-theme', theme)
    } catch {
      // The current session still uses the selected theme if storage is unavailable.
    }
  }, [theme])

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
    <div className="app-shell">
      <AppNavbar sidebarOpen={sidebarOpen} onSidebarToggle={toggleSidebar} />
      <div className={`workspace-layout${sidebarOpen ? ' is-sidebar-open' : ''}`}>
        <AppSidebar
          sidebarOpen={sidebarOpen}
          currentPage={currentPage}
          theme={theme}
          onThemeToggle={() => setTheme((currentTheme) => currentTheme === 'light' ? 'dark' : 'light')}
          onNavigate={navigateTo}
          onSidebarOpen={openSidebar}
          onPointerEnter={handleSidebarPointerEnter}
          onPointerLeave={handleSidebarPointerLeave}
        />
        <div className="page-container">
          {currentPage === 'leaderboard' ? <LeaderboardPage /> : <MatchHistoryPage />}
        </div>
      </div>
      <RainbowSpadeCursor />
    </div>
  )
}
