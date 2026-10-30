import { useEffect, useRef } from 'react'

const observers = new Map()

export function useAnimationVisibility({ rootMargin = '100px 0px' } = {}) {
  const ref = useRef(null)

  useEffect(() => {
    const element = ref.current
    if (!element || !('IntersectionObserver' in window)) return undefined

    let observer = observers.get(rootMargin)
    if (!observer) {
      observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        entry.target.classList.toggle('motion-visible', entry.isIntersecting)
      }
    }, { rootMargin })
      observers.set(rootMargin, observer)
    }

    element.classList.add('motion-observed')
    observer.observe(element)
    return () => {
      observer.unobserve(element)
      element.classList.remove('motion-observed', 'motion-visible')
    }
  }, [rootMargin])

  return ref
}
