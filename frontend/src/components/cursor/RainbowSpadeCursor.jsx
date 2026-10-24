import { useEffect, useRef } from 'react'
import './RainbowSpadeCursor.css'

export default function RainbowSpadeCursor() {
  const cursorRef = useRef(null)
  const trailRefs = useRef([])

  useEffect(() => {
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)')
    if (!finePointer.matches) return undefined

    let frameId = 0
    let pointerX = 0
    let pointerY = 0
    let lastPointerMoveAt = 0
    const pointerHistory = []
    const cursor = cursorRef.current
    const trailDelayMs = 28

    document.documentElement.classList.add('has-rainbow-cursor')

    const updateCursor = () => {
      const now = performance.now()
      cursor.style.transform = `translate3d(${pointerX - 9}px, ${pointerY - 1}px, 0)`
      cursor.classList.add('is-visible')

      trailRefs.current.forEach((trailDot, index) => {
        const targetTime = now - (index + 1) * trailDelayMs
        const historyPoint = pointerHistory.find((point) => point.time <= targetTime)
        if (!historyPoint || now - lastPointerMoveAt > 450) {
          trailDot.style.opacity = '0'
          return
        }

        trailDot.style.transform = `translate3d(${historyPoint.x - pointerX + 7}px, ${historyPoint.y - pointerY - 1}px, 0)`
        const fade = 1 - (now - lastPointerMoveAt) / 450
        trailDot.style.opacity = String(fade * (1 - index * 0.13))
      })

      frameId = 0
      if (now - lastPointerMoveAt < 450) frameId = window.requestAnimationFrame(updateCursor)
    }

    const handlePointerMove = (event) => {
      if (event.pointerType !== 'mouse' && event.pointerType !== 'pen') return

      pointerX = event.clientX
      pointerY = event.clientY
      lastPointerMoveAt = performance.now()
      pointerHistory.unshift({ x: pointerX, y: pointerY, time: lastPointerMoveAt })
      while (pointerHistory.length > 20 || lastPointerMoveAt - pointerHistory.at(-1).time > 500) {
        pointerHistory.pop()
      }
      if (!frameId) frameId = window.requestAnimationFrame(updateCursor)
    }

    const hideCursor = () => cursor.classList.remove('is-visible')

    window.addEventListener('pointermove', handlePointerMove, { passive: true })
    window.addEventListener('blur', hideCursor)
    document.addEventListener('pointerleave', hideCursor)

    return () => {
      window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('blur', hideCursor)
      document.removeEventListener('pointerleave', hideCursor)
      if (frameId) window.cancelAnimationFrame(frameId)
      document.documentElement.classList.remove('has-rainbow-cursor')
    }
  }, [])

  return (
    <span ref={cursorRef} className="rainbow-spade-cursor" aria-hidden="true">
      {Array.from({ length: 5 }, (_, index) => (
        <span
          key={index}
          ref={(node) => { trailRefs.current[index] = node }}
          className={`rainbow-spade-trail rainbow-spade-trail--${index + 1}`}
        />
      ))}
      <svg className="rainbow-spade-image" viewBox="0 0 32 32" shapeRendering="crispEdges">
        <defs>
          <linearGradient id="rainbow-spade-gradient" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="32" y2="0" spreadMethod="repeat">
            <stop offset="0%" stopColor="var(--color-cyan)" />
            <stop offset="25%" stopColor="var(--color-yellow)" />
            <stop offset="50%" stopColor="var(--color-red)" />
            <stop offset="75%" stopColor="var(--color-green)" />
            <stop offset="100%" stopColor="var(--color-cyan)" />
            <animateTransform
              attributeName="gradientTransform"
              type="translate"
              values="0 0;-32 0;0 0"
              dur="5s"
              repeatCount="indefinite"
            />
          </linearGradient>
        </defs>
        <path fill="var(--color-text)" d="M15 2h2v2h2v2h2v2h2v2h2v2h2v2h2v2h1v5h-2v3h-3v2h-4v-2h-2v-2h-1v7h3v2H11v-2h3v-7h-1v2h-2v2H7v-2H4v-3H2v-5h1v-2h2v-2h2v-2h2v-2h2v-2h2V6h2z" />
        <path fill="url(#rainbow-spade-gradient)" d="M16 5h2v2h2v2h2v2h2v2h2v2h2v2h1v4h-2v2h-3v2h-3v-2h-2v-2h-2v-2h-2v2h-2v2h-2v2H8v-2H5v-2H3v-4h1v-2h2v-2h2v-2h2v-2h2v-2h2V7h2z" />
      </svg>
    </span>
  )
}
