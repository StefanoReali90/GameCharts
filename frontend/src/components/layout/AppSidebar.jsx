import { Clock3, Settings2, Trophy } from 'lucide-react'
import NeonButton from '../ui/NeonButton.jsx'
import { cn } from '../../lib/utils.ts'
import { useI18n } from '../../i18n/I18nProvider.jsx'

export default function AppSidebar({
  sidebarOpen,
  currentPage,
  onNavigate,
  onSettingsOpen,
  onSidebarOpen,
  onPointerEnter,
  onPointerLeave,
}) {
  const { t } = useI18n()
  const handleRailClick = () => {
    if (!sidebarOpen) onSidebarOpen()
  }

  const navItemClass = (active) => cn(
    'group w-full justify-start gap-3 rounded-xl px-3 text-left text-[13px]',
    active
      ? 'border-white/10 bg-white/[0.09] text-slate-100 shadow-none'
      : 'border-transparent bg-transparent text-cyber-muted hover:border-white/[0.08] hover:bg-white/[0.05] hover:text-cyber-text',
  )

  return (
    <aside
      id="app-sidebar"
      className="app-sidebar relative z-20 h-full min-w-0 overflow-hidden"
      data-open={sidebarOpen}
      aria-label={t('nav.label')}
      onPointerEnter={onPointerEnter}
      onPointerMove={onPointerEnter}
      onPointerLeave={onPointerLeave}
      onClick={handleRailClick}
    >
      <div
        className="sidebar-panel absolute left-0 top-0 flex h-full flex-col p-3"
        style={{ width: 'var(--sidebar-expanded-width)', pointerEvents: sidebarOpen ? 'auto' : 'none' }}
        aria-hidden={!sidebarOpen}
      >
        <nav className="grid content-start gap-1.5" aria-label={t('nav.pages')}>
          <div className="sidebar-nav-item">
            <NeonButton
              variant="ghost"
              motionEnabled={false}
              className={navItemClass(currentPage === 'leaderboard')}
              type="button"
              data-sound="page"
              tabIndex={sidebarOpen ? 0 : -1}
              aria-current={currentPage === 'leaderboard' ? 'page' : undefined}
              onClick={() => onNavigate('leaderboard')}
            >
              <Trophy className="h-4 w-4 shrink-0 text-cyan-300" aria-hidden="true" />
              <span className="flex-1">{t('nav.leaderboard')}</span>
              {currentPage === 'leaderboard' && <span className="h-1.5 w-1.5 rounded-full bg-cyber-cyan shadow-[0_0_10px_rgb(var(--cyber-cyan)/0.9)]" />}
            </NeonButton>
          </div>
          <div className="sidebar-nav-item">
            <NeonButton
              variant="ghost"
              motionEnabled={false}
              className={navItemClass(currentPage === 'match-history')}
              type="button"
              data-sound="page"
              tabIndex={sidebarOpen ? 0 : -1}
              aria-current={currentPage === 'match-history' ? 'page' : undefined}
              onClick={() => onNavigate('match-history')}
            >
              <Clock3 className="h-4 w-4 shrink-0 text-purple-300" aria-hidden="true" />
              <span className="flex-1">{t('nav.history')}</span>
              {currentPage === 'match-history' && <span className="h-1.5 w-1.5 rounded-full bg-cyber-purple shadow-[0_0_10px_rgb(var(--cyber-purple)/0.9)]" />}
            </NeonButton>
          </div>
        </nav>
        <div className="sidebar-nav-item mt-auto">
          <NeonButton
            variant="ghost"
            motionEnabled={false}
            className={navItemClass(false)}
            type="button"
            tabIndex={sidebarOpen ? 0 : -1}
            onClick={onSettingsOpen}
          >
            <Settings2 className="h-4 w-4 shrink-0 text-slate-300" aria-hidden="true" />
            <span className="flex-1">{t('nav.settings')}</span>
          </NeonButton>
        </div>
        <div className="sidebar-footer px-3 pb-2 pt-3 text-[10px] font-medium uppercase tracking-[0.18em] text-cyber-muted/60">
          {t('app.footer')}
        </div>
      </div>
    </aside>
  )
}
