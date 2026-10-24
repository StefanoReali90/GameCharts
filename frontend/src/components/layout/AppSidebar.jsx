import { useState } from 'react'

function SidebarIcon({ name }) {
  const paths = {
    trophy: 'M4 2h8v2h2v4h-2v2h-2v2H6v-2H4V8H2V4h2zm0 4H4V5H3v2h1v1h2V7H4zm8 0v2h2V7h1V5h-1v1zM7 12h2v2h3v2H4v-2h3z',
    history: 'M7 1h3v1h2v1h2v2h1v6h-1v2h-2v1h-2v1H6v-1H4v-1H2v-2H1V6h1V4h2V2h3zm0 3v1H5v2H4v3h1v2h2v1h3v-1h2v-2h1V7h-1V5h-2V4zm1 1h2v3l2 1-1 2-3-2z',
    settings: 'M7 1h2v2h2v1h2v2h2v4h-2v2h-2v1H9v2H7v-2H5v-1H3v-2H1V6h2V4h2V3h2zm0 5v1H6v3h1v1h3v-1h1V7h-1V6z',
    moon: 'M9 1h3v2h2v2h1v6h-1v2h-2v2H6v-1H4v-2H2V6h1V4h2V2h4zm1 3v2H8v2H7v2h2v1h3v-2h1V7h-1V5h-1V4z',
    sun: 'M7 1h2v3H7zm0 11h2v3H7zM1 7h3v2H1zm11 0h3v2h-3zM3 2h2v2H3zm8 9h2v2h-2zM2 12l2-2 1 2-2 2zm8-8 2-2 2 2-2 2zM5 5h6v1h1v5h-1v1H5v-1H4V6h1z',
  }

  return (
    <svg className="sidebar-icon" viewBox="0 0 16 16" aria-hidden="true" shapeRendering="crispEdges">
      <path fill="currentColor" d={paths[name]} />
    </svg>
  )
}

export default function AppSidebar({
  sidebarOpen,
  currentPage,
  theme,
  onThemeToggle,
  onNavigate,
  onSidebarOpen,
  onPointerEnter,
  onPointerLeave,
}) {
  const [settingsOpen, setSettingsOpen] = useState(false)

  const handleSidebarClick = () => {
    if (!sidebarOpen) onSidebarOpen()
  }

  return (
    <aside
      id="app-sidebar"
      className={`app-sidebar${sidebarOpen ? ' is-open' : ''}`}
      aria-label="Sidebar"
      onPointerEnter={onPointerEnter}
      onPointerMove={onPointerEnter}
      onPointerLeave={onPointerLeave}
      onClick={handleSidebarClick}
    >
      <div
        className="sidebar-menu"
        aria-hidden={!sidebarOpen}
      >
        <nav className="sidebar-nav" aria-label="Pagine">
          <button
            className={`nes-btn sidebar-link${currentPage === 'leaderboard' ? ' is-primary' : ''}`}
            type="button"
            tabIndex={sidebarOpen ? 0 : -1}
            aria-current={currentPage === 'leaderboard' ? 'page' : undefined}
            onClick={() => onNavigate('leaderboard')}
          >
            <SidebarIcon name="trophy" />
            <span>Leaderboard</span>
          </button>
          <button
            className={`nes-btn sidebar-link${currentPage === 'match-history' ? ' is-primary' : ''}`}
            type="button"
            tabIndex={sidebarOpen ? 0 : -1}
            aria-current={currentPage === 'match-history' ? 'page' : undefined}
            onClick={() => onNavigate('match-history')}
          >
            <SidebarIcon name="history" />
            <span>Storico Match</span>
          </button>
          <div className="sidebar-settings">
            <div
              className={`sidebar-settings-panel${settingsOpen ? ' is-open' : ''}`}
              aria-hidden={!settingsOpen}
            >
              <div className="sidebar-settings-panel__content">
                <button
                  className="nes-btn sidebar-link sidebar-theme-toggle"
                  type="button"
                  tabIndex={settingsOpen && sidebarOpen ? 0 : -1}
                  onClick={onThemeToggle}
                >
                  <SidebarIcon name={theme === 'light' ? 'moon' : 'sun'} />
                  <span>{theme === 'light' ? 'Passa tema nero' : 'Passa tema bianco'}</span>
                </button>
              </div>
            </div>
            <button
              className="nes-btn sidebar-link sidebar-settings-toggle"
              type="button"
              tabIndex={sidebarOpen ? 0 : -1}
              aria-expanded={settingsOpen}
              onClick={() => setSettingsOpen((isOpen) => !isOpen)}
            >
              <SidebarIcon name="settings" />
              <span>Impostazioni</span>
            </button>
          </div>
        </nav>
      </div>
    </aside>
  )
}
