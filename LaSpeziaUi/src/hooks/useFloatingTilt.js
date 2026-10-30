import { useEffect, useRef } from 'react'
import { useReducedMotion, useSpring } from 'framer-motion'

const spring = { stiffness: 180, damping: 22, mass: 0.5 }
const clamp = (value, min, max) => Math.min(max, Math.max(min, value))

export function useFloatingTilt({ tilt = 5, pressTilt = 0, releaseDelayMs = 170, springOptions = spring } = {}) {
  const reducedMotion = useReducedMotion()
  const rotateX = useSpring(0, springOptions)
  const rotateY = useSpring(0, springOptions)
  const pressTimer = useRef(null)
  const pressed = useRef(false)

  useEffect(() => () => window.clearTimeout(pressTimer.current), [])

  const setTiltAt = (event, amount) => {
    const bounds = event.currentTarget.getBoundingClientRect()
    if (bounds.width < 1 || bounds.height < 1) return

    const horizontal = clamp((event.clientX - bounds.left) / bounds.width - 0.5, -0.5, 0.5)
    const vertical = clamp((event.clientY - bounds.top) / bounds.height - 0.5, -0.5, 0.5)
    rotateX.set(-vertical * amount * 2)
    rotateY.set(horizontal * amount * 2)
  }

  const onPointerMove = (event) => {
    if (reducedMotion || pressed.current || event.pointerType !== 'mouse') return
    setTiltAt(event, tilt)
  }

  const onPointerLeave = () => {
    if (pressed.current) return
    rotateX.set(0)
    rotateY.set(0)
  }

  const onPointerDown = (event) => {
    if (reducedMotion || pressTilt <= 0 || event.button !== 0) return
    window.clearTimeout(pressTimer.current)
    pressed.current = true
    setTiltAt(event, pressTilt)
  }

  const onPointerUp = (event) => {
    if (!pressed.current) return
    const { pointerType, clientX, clientY, currentTarget } = event
    window.clearTimeout(pressTimer.current)
    pressTimer.current = window.setTimeout(() => {
      pressed.current = false
      const bounds = currentTarget?.getBoundingClientRect()
      const pointerStillOnCard = bounds && clientX >= bounds.left && clientX <= bounds.right
        && clientY >= bounds.top && clientY <= bounds.bottom
      if (pointerType === 'mouse' && pointerStillOnCard) {
        setTiltAt({ clientX, clientY, currentTarget }, tilt)
      } else {
        rotateX.set(0)
        rotateY.set(0)
      }
    }, releaseDelayMs)
  }

  const onPointerCancel = () => {
    window.clearTimeout(pressTimer.current)
    pressed.current = false
    rotateX.set(0)
    rotateY.set(0)
  }

  return {
    style: {
      rotateX,
      rotateY,
      transformPerspective: 1000,
      transformStyle: 'preserve-3d',
    },
    onPointerMove,
    onPointerLeave,
    onPointerDown,
    onPointerUp,
    onPointerCancel,
  }
}
