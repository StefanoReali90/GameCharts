import { Sidebar, SidebarPageButton, Icon, useI18n } from 'laspeziaui'
import { navigationItems } from './config.js'
export default function AppSidebar({sidebar,currentPage,onNavigate,onSettingsOpen}) {
  const {t}=useI18n()
  return <Sidebar id="app-sidebar" open={sidebar.open} controller={sidebar} aria-label={t('nav.label')}
    bottom={<div className="sidebar-nav-item mt-auto"><SidebarPageButton label={t('nav.settings')} icon={<Icon name="Settings2" className="h-4 w-4 text-slate-300" aria-hidden="true" />} onClick={onSettingsOpen} /></div>}
    footer={<div className="sidebar-footer px-3 pb-2 pt-3 text-[10px] font-medium capitalize tracking-[0.18em] text-cyber-muted/60">{t('app.footer')}</div>}>
    <nav className="grid content-start gap-1.5" aria-label={t('nav.pages')}>{navigationItems.map((page)=><div className="sidebar-nav-item" key={page.id}><SidebarPageButton label={t(page.label)} icon={<Icon name={page.icon} className={page.tone==='cyan'?'h-4 w-4 text-cyan-300':'h-4 w-4 text-purple-300'} aria-hidden="true" />} active={currentPage===page.id} showIndicator={currentPage===page.id} tone={page.tone} data-sound="page" onClick={()=>onNavigate(page.id)} /></div>)}</nav>
  </Sidebar>
}
