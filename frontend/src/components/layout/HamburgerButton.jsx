export default function HamburgerButton({ expanded, onClick, className = '' }) {
  return (
    <button
      className={`nes-btn is-primary hamburger-button ${className}`.trim()}
      type="button"
      aria-label={expanded ? 'Chiudi sidebar' : 'Apri sidebar'}
      aria-expanded={expanded}
      aria-controls="app-sidebar"
      onClick={onClick}
    >
      <span className="hamburger-icon" aria-hidden="true">
        <span />
        <span />
        <span />
      </span>
    </button>
  )
}
