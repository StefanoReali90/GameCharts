import { SidebarContext, sidebarDefaults } from './config'
import { cn } from '../../utils/cn.ts'
import { useSidebar } from '../../hooks/useSidebar.js'
export default function Sidebar({ children, footer, bottom, open, onOpenChange, controller, openOn = sidebarDefaults.openOn, openDelayMs = sidebarDefaults.openDelayMs, closeDelayMs = sidebarDefaults.closeDelayMs, transition = sidebarDefaults.transition, cornerStyle = 'rounded', className, onPointerEnter, onPointerLeave, ...props }) {
  const internal = useSidebar({ openOn, openDelayMs, closeDelayMs, onOpenChange: controller ? undefined : onOpenChange })
  const state = controller ?? internal
  const visible = open ?? state.open
  return <SidebarContext.Provider value={{open:visible}}><aside {...props} data-open={visible} data-transition={transition} data-corners={cornerStyle} className={cn('app-sidebar relative z-20 h-full min-w-0 overflow-hidden', className)} onPointerEnter={(e) => { state.pointerEnter(e); onPointerEnter?.(e) }} onPointerLeave={(e) => { state.pointerLeave(e); onPointerLeave?.(e) }}>
    <div className="sidebar-panel absolute left-0 top-0 flex h-full flex-col p-3">{children}{bottom}{footer}</div>
  </aside></SidebarContext.Provider>
}
