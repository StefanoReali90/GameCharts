import { useLayoutEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { Search } from 'lucide-react'
import NeonButton from './NeonButton.jsx'
import { useI18n } from '../../i18n/I18nProvider.jsx'

export default function SearchPopover({ anchorRef, query, onSearch, onClose, label, idPrefix }) {
  const { t } = useI18n()
  const [value, setValue] = useState(query)
  const [position, setPosition] = useState(null)
  const panelRef = useRef(null)
  const inputRef = useRef(null)
  const initialQuery = useRef(query)
  const hasFocused = useRef(false)

  useLayoutEffect(() => {
    const updatePosition = () => {
      const anchor = anchorRef.current?.getBoundingClientRect()
      if (!anchor) return
      const width = Math.min(310, window.innerWidth - 24)
      setPosition({
        left: Math.max(12, Math.min(window.innerWidth - width - 12, anchor.left + anchor.width / 2 - width / 2)),
        top: anchor.bottom + 9,
        width,
      })
    }
    const handleOutside = (event) => {
      if (!panelRef.current?.contains(event.target) && !anchorRef.current?.contains(event.target)) onClose(false)
    }
    updatePosition()
    window.addEventListener('resize', updatePosition)
    window.addEventListener('scroll', updatePosition, true)
    document.addEventListener('pointerdown', handleOutside, true)
    return () => {
      window.removeEventListener('resize', updatePosition)
      window.removeEventListener('scroll', updatePosition, true)
      document.removeEventListener('pointerdown', handleOutside, true)
    }
  }, [anchorRef, onClose])

  useLayoutEffect(() => {
    if (position && !hasFocused.current) {
      inputRef.current?.focus()
      hasFocused.current = true
    }
  }, [position])

  const cancelSearch = () => {
    onSearch(initialQuery.current)
    onClose(true)
  }

  return createPortal(
    <div
      ref={panelRef}
      id={`${idPrefix}-filter`}
      role="dialog"
      aria-label={label}
      className="search-filter-popover"
      style={{ left: position?.left ?? -1000, top: position?.top ?? -1000, width: position?.width ?? 310, visibility: position ? 'visible' : 'hidden' }}
      onKeyDown={(event) => {
        if (event.key === 'Escape') {
          event.preventDefault()
          event.stopPropagation()
          cancelSearch()
        }
      }}
    >
      <form role="search" className="grid gap-3" onSubmit={(event) => { event.preventDefault(); onSearch(value.trim()); onClose(true) }}>
        <label className="grid gap-1.5 text-xs font-semibold text-cyan-100" htmlFor={`${idPrefix}-query`}>
          {label}
          <input ref={inputRef} id={`${idPrefix}-query`} type="search" value={value} onChange={(event) => { setValue(event.target.value); onSearch(event.target.value) }} placeholder={label} className="h-10 w-full rounded-lg border border-cyber-cyan/35 bg-cyber-bg/90 px-3 text-sm text-cyber-text outline-none placeholder:text-cyber-muted/60 focus:border-cyber-cyan focus:ring-2 focus:ring-cyber-cyan/20" />
        </label>
        <div className="flex justify-end gap-2">
          <NeonButton type="button" variant="ghost" motionEnabled={false} className="h-9 min-h-9 px-3 text-xs" onClick={cancelSearch}>{t('leaderboard.cancel')}</NeonButton>
          <NeonButton type="submit" variant="subtle" motionEnabled={false} className="h-9 min-h-9 gap-1.5 px-3 text-xs"><Search size={14} aria-hidden="true" />{t('leaderboard.search')}</NeonButton>
        </div>
      </form>
    </div>,
    document.body,
  )
}
