import { Menu, X } from 'lucide-react'
import NeonButton from '../ui/NeonButton.jsx'
import { useI18n } from '../../i18n/I18nProvider.jsx'

export default function HamburgerButton({ expanded, onClick, className = '' }) {
  const { t } = useI18n()
  const Icon = expanded ? X : Menu

  return (
    <NeonButton
      variant="subtle"
      className={`h-11 w-11 justify-self-start rounded-xl border-white/10 bg-white/[0.04] p-0 text-slate-200 shadow-none hover:border-cyber-cyan/30 hover:bg-white/[0.08] hover:text-white ${className}`.trim()}
      type="button"
      aria-label={t(expanded ? 'nav.close' : 'nav.open')}
      aria-expanded={expanded}
      aria-controls="app-sidebar"
      onClick={onClick}
    >
      <Icon size={19} strokeWidth={1.8} aria-hidden="true" />
    </NeonButton>
  )
}
