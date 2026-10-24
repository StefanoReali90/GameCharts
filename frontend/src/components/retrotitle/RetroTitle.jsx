import './RetroTitle.css'

export default function RetroTitle({
  as: Heading = 'h2',
  title,
  leading,
  variant = 'panel',
  className = '',
  children,
  ...props
}) {
  const label = title ?? children

  return (
    <Heading className={`retro-title retro-title--${variant} ${className}`.trim()} {...props}>
      <span className="retro-title__gradient-window retro-title__gradient-window--shadow" aria-hidden="true">
        <span className="retro-title__gradient" />
      </span>
      <span className="retro-title__gradient-window retro-title__gradient-window--frame" aria-hidden="true">
        <span className="retro-title__gradient" />
      </span>
      <span className="retro-title__text">
        {leading}
        <span className="retro-title__label">
          <span className="retro-title__label-shadow" aria-hidden="true">{label}</span>
          <span className="retro-title__label-text">{label}</span>
        </span>
      </span>
    </Heading>
  )
}
