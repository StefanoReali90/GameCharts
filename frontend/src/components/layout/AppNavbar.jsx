import { brand } from './config.js'
import { Navbar, Title, Button, Icon, useI18n } from 'laspeziaui'
export default function AppNavbar({sidebarOpen,onSidebarToggle}) {
  const {t}=useI18n()
  return <Navbar start={<Button variant="subtle" motionEnabled={false} className="hamburger-button h-11 w-11 justify-self-start rounded-xl border-white/10 bg-white/[0.04] p-0 text-slate-200 shadow-none hover:border-cyber-cyan/30 hover:bg-white/[0.08] hover:text-white" aria-label={t(sidebarOpen?'nav.close':'nav.open')} aria-expanded={sidebarOpen} aria-controls="app-sidebar" onClick={onSidebarToggle}><Icon name={sidebarOpen?'X':'Menu'} size={19} strokeWidth={1.8} aria-hidden="true" /></Button>}>
    <Title as="h1" title={brand.title} size="small" leading={<img className="h-9 w-9 rounded-xl object-cover ring-1 ring-white/15 sm:h-10 sm:w-10" src={brand.logo} alt="" />} className="app-navbar-brand whitespace-nowrap max-[420px]:gap-2" />
  </Navbar>
}
