import { tooltipDefaults } from './config'
import { cloneElement, isValidElement, useId, useLayoutEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

export default function Tooltip({ content, children }) {
  const disabled = Boolean(isValidElement(children) && children.props.disabled)
  const id = useId()
  const triggerRef = useRef(null)
  const tooltipRef = useRef(null)
  const [visible, setVisible] = useState(false)
  const [position, setPosition] = useState(null)
  const container = triggerRef.current?.closest('dialog') ?? document.body

  useLayoutEffect(() => {
    if (!visible) return undefined
    const update = () => {
      const trigger = triggerRef.current?.getBoundingClientRect()
      const tooltip = tooltipRef.current
      if (!trigger || !tooltip) return
      const width = tooltip.offsetWidth
      const height = tooltip.offsetHeight
      const above = trigger.top > height + tooltipDefaults.offset * 2
      setPosition({
        left: Math.max(width / 2 + tooltipDefaults.viewportPadding, Math.min(window.innerWidth - width / 2 - tooltipDefaults.viewportPadding, trigger.left + trigger.width / 2)),
        top: above ? trigger.top - height - tooltipDefaults.offset : trigger.bottom + tooltipDefaults.offset,
      })
    }
    update()
    window.addEventListener('scroll', update, true)
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update, true)
      window.removeEventListener('resize', update)
    }
  }, [visible, content])

  return (
    <span
      ref={triggerRef}
      className={`app-tooltip-trigger inline-flex ${disabled ? 'app-tooltip-trigger--disabled' : ''}`}
      tabIndex={disabled ? 0 : undefined}
      role={disabled ? 'group' : undefined}
      aria-describedby={disabled && visible ? id : undefined}
      onPointerEnter={() => setVisible(true)}
      onPointerLeave={() => setVisible(false)}
      onFocusCapture={() => setVisible(true)}
      onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setVisible(false) }}
      onKeyDown={(event) => { if (event.key === 'Escape') setVisible(false) }}
    >
      {isValidElement(children) && !disabled
        ? cloneElement(children, { 'aria-describedby': visible ? id : children.props['aria-describedby'] })
        : children}
      {visible && createPortal(
        <span id={id} ref={tooltipRef} role="tooltip" className="app-tooltip" style={{ left: position?.left ?? -1000, top: position?.top ?? -1000, visibility: position ? 'visible' : 'hidden' }}>
          {content}
        </span>,
        container,
      )}
    </span>
  )
}
