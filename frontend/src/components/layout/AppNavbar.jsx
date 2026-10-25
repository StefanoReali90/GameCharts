import NeonHeading from '../ui/NeonHeading.jsx'
import HamburgerButton from './HamburgerButton.jsx'

export default function AppNavbar({ sidebarOpen, onSidebarToggle }) {
  return (
    <header className="app-navbar relative z-30 flex h-[68px] min-w-0 items-center gap-3 px-4 sm:px-6 max-[760px]:h-[62px] max-[760px]:gap-2 max-[760px]:px-3">
      <HamburgerButton expanded={sidebarOpen} onClick={onSidebarToggle} />
      <NeonHeading
        as="h1"
        title="La Spezia"
        plain
        leading={<img className="h-9 w-9 rounded-xl object-cover ring-1 ring-white/15 sm:h-10 sm:w-10" src="/images/la-spezia-logo.jpg" alt="" />}
        className="whitespace-nowrap text-slate-100 max-[420px]:gap-2"
      />
    </header>
  )
}
