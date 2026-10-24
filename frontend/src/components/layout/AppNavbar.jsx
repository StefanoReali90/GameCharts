import HamburgerButton from './HamburgerButton.jsx'
import RetroTitle from '../retrotitle/RetroTitle.jsx'

export default function AppNavbar({ sidebarOpen, onSidebarToggle }) {
  return (
    <header className={`app-navbar${sidebarOpen ? ' is-sidebar-open' : ''}`}>
      <HamburgerButton expanded={sidebarOpen} onClick={onSidebarToggle} />
      <RetroTitle
        as="h1"
        variant="brand"
        title="La Spezia"
        leading={<img className="brand-logo" src="/images/la-spezia-logo.jpg" alt="" />}
      />
      <span className="navbar-balance" aria-hidden="true" />
    </header>
  )
}
