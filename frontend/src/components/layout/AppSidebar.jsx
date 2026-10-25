import { Clock3, Settings2, Trophy } from 'lucide-react'
import NeonButton from '../ui/NeonButton.jsx'
import { cn } from '../../lib/utils.ts'
import { useI18n } from '../../i18n/I18nProvider.jsx'

export default function AppSidebar({
  sidebarOpen,
  currentPage,
  onNavigate,
  onSettingsOpen,
  onPointerEnter,
  onPointerLeave,
}) {
  const { t } = useI18n()
  const navItemClass = (active) => cn(
    'sidebar-nav-button group w-full rounded-xl text-left text-[13px]',
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
      onPointerLeave={onPointerLeave}
    >
      <div
        className="sidebar-panel absolute left-0 top-0 flex h-full flex-col p-3"
      >
        <nav className="grid content-start gap-1.5" aria-label={t('nav.pages')}>
          <div className="sidebar-nav-item">
            <NeonButton
              variant="ghost"
              motionEnabled={false}
              className={navItemClass(currentPage === 'leaderboard')}
              type="button"
              data-sound="page"
              aria-label={t('nav.leaderboard')}
              aria-current={currentPage === 'leaderboard' ? 'page' : undefined}
              onClick={() => onNavigate('leaderboard')}
            >
              <span className="sidebar-nav-icon"><Trophy className="h-4 w-4 text-cyan-300" aria-hidden="true" /></span>
              <span className="sidebar-nav-label">{t('nav.leaderboard')}</span>
              {currentPage === 'leaderboard' && <span className="sidebar-active-dot bg-cyber-cyan shadow-[0_0_10px_rgb(var(--cyber-cyan)/0.9)]" aria-hidden="true" />}
            </NeonButton>
          </div>
          <div className="sidebar-nav-item">
            <NeonButton
              variant="ghost"
              motionEnabled={false}
              className={navItemClass(currentPage === 'match-history')}
              type="button"
              data-sound="page"
              aria-label={t('nav.history')}
              aria-current={currentPage === 'match-history' ? 'page' : undefined}
              onClick={() => onNavigate('match-history')}
            >
              <span className="sidebar-nav-icon"><Clock3 className="h-4 w-4 text-purple-300" aria-hidden="true" /></span>
              <span className="sidebar-nav-label">{t('nav.history')}</span>
              {currentPage === 'match-history' && <span className="sidebar-active-dot bg-cyber-purple shadow-[0_0_10px_rgb(var(--cyber-purple)/0.9)]" aria-hidden="true" />}
            </NeonButton>
          </div>
        </nav>
        <div className="sidebar-nav-item mt-auto">
          <NeonButton
            variant="ghost"
            motionEnabled={false}
            className={navItemClass(false)}
            type="button"
            aria-label={t('nav.settings')}
            onClick={onSettingsOpen}
          >
            <span className="sidebar-nav-icon"><Settings2 className="h-4 w-4 text-slate-300" aria-hidden="true" /></span>
            <span className="sidebar-nav-label">{t('nav.settings')}</span>
          </NeonButton>
        </div>
        <div className="sidebar-footer px-3 pb-2 pt-3 text-[10px] font-medium capitalize tracking-[0.18em] text-cyber-muted/60">
          {t('app.footer')}
        </div>
      </div>
    </aside>
  )
}
