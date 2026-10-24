import { useReducedMotion, useSpring } from 'framer-motion'

const spring = { stiffness: 180, damping: 22, mass: 0.5 }

export function useFloatingTilt({ tilt = 5, float = 3, duration = 5 } = {}) {
  const reducedMotion = useReducedMotion()
  const rotateX = useSpring(0, spring)
  const rotateY = useSpring(0, spring)

  const onPointerMove = (event) => {
    if (reducedMotion || event.pointerType !== 'mouse') return

    const bounds = event.currentTarget.getBoundingClientRect()
    const horizontal = (event.clientX - bounds.left) / bounds.width - 0.5
    const vertical = (event.clientY - bounds.top) / bounds.height - 0.5

    rotateX.set(-vertical * tilt * 2)
    rotateY.set(horizontal * tilt * 2)
  }

  const onPointerLeave = () => {
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
    animate: reducedMotion ? undefined : { y: [0, -float, 0] },
    transition: reducedMotion ? undefined : {
      y: { duration, ease: 'easeInOut', repeat: Infinity },
    },
    onPointerMove,
    onPointerLeave,
  }
}
