import { useCallback, useEffect, useRef, useState } from 'react'
export function useSidebar({ openOn = 'both', openDelayMs = 0, closeDelayMs = 160, onOpenChange } = {}) {
  const [pinned, setPinned] = useState(false)
  const [hovered, setHovered] = useState(false)
  const timer = useRef(null)
  const open = pinned || hovered
  const cancel = useCallback(() => window.clearTimeout(timer.current), [])
  useEffect(() => { onOpenChange?.(open) }, [open, onOpenChange])
  useEffect(() => { cancel(); return cancel }, [openOn, openDelayMs, closeDelayMs, cancel])
  const close = useCallback(() => { cancel(); setPinned(false); setHovered(false) }, [cancel])
  const toggle = () => { cancel(); setPinned(!open); setHovered(false) }
  const pointerEnter = (event) => {
    if (openOn === 'button' || !['mouse','pen'].includes(event.pointerType) || window.matchMedia('(max-width: 760px), (max-height: 500px) and (pointer: coarse)').matches) return
    cancel()
    if (openDelayMs > 0) timer.current = window.setTimeout(() => setHovered(true), openDelayMs)
    else setHovered(true)
  }
  const pointerLeave = () => { cancel(); timer.current = window.setTimeout(() => setHovered(false), Math.max(0, closeDelayMs)) }
  return { open, pinned, close, toggle, pointerEnter, pointerLeave }
}
