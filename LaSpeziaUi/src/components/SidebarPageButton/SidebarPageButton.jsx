import { pageButtonDefaults } from './config'
import { useContext } from 'react'
import { SidebarContext } from '../Sidebar/config'
import Button from '../Button/Button.jsx'
import { cn } from '../../utils/cn.ts'
export default function SidebarPageButton({ label, icon, showIndicator = pageButtonDefaults.showIndicator, active = pageButtonDefaults.active, mode, tone = pageButtonDefaults.tone, className, ...props }) {
  const sidebar = useContext(SidebarContext)
  const currentMode = mode ?? (sidebar?.open ? 'expanded' : 'collapsed')
  return <Button variant="ghost" motionEnabled={false} className={cn('sidebar-nav-button group w-full rounded-xl text-left text-[13px]', active ? 'border-white/10 bg-white/[0.09] text-slate-100 shadow-none' : 'border-transparent bg-transparent text-cyber-muted hover:border-white/[0.08] hover:bg-white/[0.05] hover:text-cyber-text', className)} aria-label={label} aria-current={active ? 'page' : undefined} data-mode={currentMode} {...props}>
    <span className="sidebar-nav-icon">{icon}</span><span className="sidebar-nav-label">{label}</span>{showIndicator && <span className={cn('sidebar-active-dot', tone === 'purple' ? 'bg-cyber-purple shadow-[0_0_10px_rgb(var(--cyber-purple)/0.9)]' : 'bg-cyber-cyan shadow-[0_0_10px_rgb(var(--cyber-cyan)/0.9)]')} aria-hidden="true" />}
  </Button>
}
