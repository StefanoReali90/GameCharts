import { dialogDefaults } from './config'
import { useEffect, useId, useRef } from 'react'
import { useI18n } from '../../i18n/I18nProvider.jsx'
import Button from '../Button/Button.jsx'
import Icon from '../Icon/Icon.jsx'
export default function Dialog({ open, onRequestClose, title, children, footer, showCloseButton = dialogDefaults.showCloseButton, closeLabel, backdropOpacity = dialogDefaults.backdropOpacity, backdropBlur = dialogDefaults.backdropBlur, closeOnBackdropClick = dialogDefaults.closeOnBackdropClick, closeOnEscape = dialogDefaults.closeOnEscape }) {
  const dialogRef = useRef(null); const titleId = useId(); const { t } = useI18n()
  const closing = useRef(false)
  useEffect(() => { const dialog = dialogRef.current; if (open && !dialog.open) { closing.current = false; dialog.showModal() } if (!open && dialog.open) { closing.current = true; dialog.close() } }, [open])
  const requestClose = () => { if (closing.current) return; closing.current = true; onRequestClose?.(); queueMicrotask(() => { closing.current = false }) }
  return <dialog ref={dialogRef} className="app-dialog w-[min(92vw,440px)] rounded-2xl border border-cyber-cyan/30 bg-cyber-surface p-0 text-cyber-text shadow-[0_24px_80px_rgb(0_0_0/0.65),0_0_34px_rgb(var(--cyber-cyan)/0.12)]" style={{ '--dialog-backdrop-opacity': Math.min(1, Math.max(0, backdropOpacity)), '--dialog-backdrop-blur': typeof backdropBlur === 'number' ? `${backdropBlur}px` : backdropBlur }} aria-labelledby={titleId}
    onCancel={(e) => { e.preventDefault(); if (closeOnEscape) requestClose() }}
    onClick={(e) => { if (!closeOnBackdropClick || e.target !== e.currentTarget) return; const r = e.currentTarget.getBoundingClientRect(); if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) requestClose() }}
    onClose={() => { if (open) requestClose() }}>
    <div className="app-dialog__content grid gap-5 p-5 sm:p-6"><div className="flex items-center justify-between gap-3"><h2 id={titleId} className="m-0 font-display text-xl font-bold text-slate-100">{title}</h2>{showCloseButton && <Button variant="close" aria-label={closeLabel ?? t('dialog.close')} onClick={requestClose}><Icon name="X" size={18} aria-hidden="true" /></Button>}</div>
      {footer != null ? <div className="grid gap-6">{children}{footer}</div> : children}
    </div>
  </dialog>
}
