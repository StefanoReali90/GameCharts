import { useEffect, useId, useRef } from 'react'
import { X } from 'lucide-react'
import { useI18n } from '../../i18n/I18nProvider.jsx'

export default function AppDialog({ open, onRequestClose, title, children, showCloseButton = true }) {
  const dialogRef = useRef(null)
  const titleId = useId()
  const { t } = useI18n()

  useEffect(() => {
    const dialog = dialogRef.current
    if (open && !dialog.open) dialog.showModal()
    if (!open && dialog.open) dialog.close()
  }, [open])

  return (
    <dialog
      ref={dialogRef}
      className="app-dialog w-[min(92vw,440px)] rounded-2xl border border-cyber-cyan/30 bg-cyber-surface p-0 text-cyber-text shadow-[0_24px_80px_rgb(0_0_0/0.65),0_0_34px_rgb(var(--cyber-cyan)/0.12)]"
      aria-labelledby={titleId}
      onCancel={(event) => { event.preventDefault(); onRequestClose() }}
      onClick={(event) => { if (event.target === event.currentTarget) onRequestClose() }}
      onClose={() => { if (open) onRequestClose() }}
    >
      <div className="app-dialog__content grid gap-5 p-5 sm:p-6">
        <div className="flex items-center justify-between gap-3">
          <h2 id={titleId} className="m-0 font-display text-xl font-bold text-slate-100">{title}</h2>
          {showCloseButton && <button type="button" className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-white/10 bg-white/5 text-slate-200 transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyber-cyan" aria-label={t('dialog.close')} onClick={onRequestClose}>
            <X size={18} aria-hidden="true" />
          </button>}
        </div>
        {children}
      </div>
    </dialog>
  )
}
