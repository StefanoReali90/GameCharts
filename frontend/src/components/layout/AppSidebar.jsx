import { motion } from 'framer-motion'
import { Clock3, Trophy } from 'lucide-react'
import NeonButton from '../ui/NeonButton.jsx'
import { cn } from '../../lib/utils.ts'

export default function AppSidebar({
  sidebarOpen,
  currentPage,
  onNavigate,
  onSidebarOpen,
  onPointerEnter,
  onPointerLeave,
}) {
  const handleRailClick = () => {
    if (!sidebarOpen) onSidebarOpen()
  }

  const navItemClass = (active) => cn(
    'group w-full justify-start gap-3 rounded-xl px-3 text-left text-[13px]',
    active
      ? 'border-cyber-cyan/25 bg-cyber-cyan/[0.09] text-cyan-100 shadow-neon-cyan'
      : 'border-transparent bg-transparent text-cyber-muted hover:border-white/[0.07] hover:bg-white/[0.045] hover:text-cyber-text',
  )

  return (
    <aside
      id="app-sidebar"
      className="app-sidebar relative z-20 h-full min-w-0 overflow-hidden"
      aria-label="Navigazione principale"
      onPointerEnter={onPointerEnter}
      onPointerMove={onPointerEnter}
      onPointerLeave={onPointerLeave}
      onClick={handleRailClick}
    >
      <motion.div
        className="absolute left-0 top-0 flex h-full flex-col p-3"
        style={{ width: 'var(--sidebar-expanded-width)', pointerEvents: sidebarOpen ? 'auto' : 'none' }}
        animate={{ opacity: sidebarOpen ? 1 : 0, x: sidebarOpen ? 0 : -10 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        aria-hidden={!sidebarOpen}
      >
        <nav className="grid content-start gap-1.5" aria-label="Pagine">
          <NeonButton
            variant="ghost"
            className={navItemClass(currentPage === 'leaderboard')}
            type="button"
            tabIndex={sidebarOpen ? 0 : -1}
            aria-current={currentPage === 'leaderboard' ? 'page' : undefined}
            onClick={() => onNavigate('leaderboard')}
          >
            <Trophy className="h-4 w-4 shrink-0 text-cyan-300" aria-hidden="true" />
            <span className="flex-1">Leaderboard</span>
            {currentPage === 'leaderboard' && <span className="h-1.5 w-1.5 rounded-full bg-cyber-cyan shadow-[0_0_10px_rgb(var(--cyber-cyan)/0.9)]" />}
          </NeonButton>
          <NeonButton
            variant="ghost"
            className={navItemClass(currentPage === 'match-history')}
            type="button"
            tabIndex={sidebarOpen ? 0 : -1}
            aria-current={currentPage === 'match-history' ? 'page' : undefined}
            onClick={() => onNavigate('match-history')}
          >
            <Clock3 className="h-4 w-4 shrink-0 text-purple-300" aria-hidden="true" />
            <span className="flex-1">Storico Match</span>
            {currentPage === 'match-history' && <span className="h-1.5 w-1.5 rounded-full bg-cyber-purple shadow-[0_0_10px_rgb(var(--cyber-purple)/0.9)]" />}
          </NeonButton>
        </nav>
        <div className="mt-auto px-3 pb-2 pt-6 text-[10px] font-medium uppercase tracking-[0.18em] text-cyber-muted/60">
          La Spezia | Online
        </div>
      </motion.div>
      {!sidebarOpen && (
        <span className="pointer-events-none absolute inset-y-0 right-0 w-px bg-gradient-to-b from-transparent via-cyber-cyan/35 to-transparent" />
      )}
    </aside>
  )
}
