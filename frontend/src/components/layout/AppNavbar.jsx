import NeonTitle from '../ui/NeonTitle.jsx'
import HamburgerButton from './HamburgerButton.jsx'

export default function AppNavbar({ sidebarOpen, onSidebarToggle }) {
  return (
    <header className="app-navbar relative z-30 flex h-[68px] min-w-0 items-center gap-3 pl-2 pr-4 sm:pr-6">
      <HamburgerButton expanded={sidebarOpen} onClick={onSidebarToggle} />
      <NeonTitle
        as="h1"
        title="La Spezia"
        size="sm"
        leading={<img className="h-9 w-9 rounded-xl object-cover ring-1 ring-white/15 sm:h-10 sm:w-10" src="/images/la-spezia-logo.jpg" alt="" />}
        className="app-navbar-brand whitespace-nowrap max-[420px]:gap-2"
      />
    </header>
  )
}
