import { Menu, X } from 'lucide-react'
import NeonButton from '../ui/NeonButton.jsx'

export default function HamburgerButton({ expanded, onClick, className = '' }) {
  const Icon = expanded ? X : Menu

  return (
    <NeonButton
      variant="subtle"
      className={`h-11 w-11 justify-self-start rounded-xl p-0 text-cyan-200 hover:border-cyber-cyan/40 hover:text-cyber-cyan ${className}`.trim()}
      type="button"
      aria-label={expanded ? 'Chiudi sidebar' : 'Apri sidebar'}
      aria-expanded={expanded}
      aria-controls="app-sidebar"
      onClick={onClick}
    >
      <Icon size={19} strokeWidth={1.8} aria-hidden="true" />
    </NeonButton>
  )
}
