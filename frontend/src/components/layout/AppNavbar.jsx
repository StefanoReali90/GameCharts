import NeonHeading from '../ui/NeonHeading.jsx'
import HamburgerButton from './HamburgerButton.jsx'

export default function AppNavbar({ sidebarOpen, onSidebarToggle }) {
  return (
    <header className="app-navbar relative z-30 grid h-[84px] min-w-0 grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-4 px-4 sm:px-6 max-[760px]:h-[72px] max-[760px]:gap-2 max-[760px]:px-3">
      <HamburgerButton expanded={sidebarOpen} onClick={onSidebarToggle} />
      <NeonHeading
        as="h1"
        title="La Spezia"
        leading={<img className="h-9 w-9 rounded-xl object-cover shadow-neon-cyan sm:h-10 sm:w-10" src="/images/la-spezia-logo.jpg" alt="" />}
        className="whitespace-nowrap max-[420px]:gap-2"
      />
      <span aria-hidden="true" />
    </header>
  )
}
