import { useId } from 'react'
import { cn } from '../../utils/cn.ts'
import { controlClasses } from './config'
export default function Select({ label, description, leading, id, wrapperClassName, labelClassName, variant = 'field', children, className, ...props }) {
  const generated = useId(); const controlId = id ?? generated
  const select = <select id={controlId} className={cn(variant === 'settings' ? 'h-11 w-full rounded-xl border border-cyber-purple/40 bg-cyber-bg px-3 text-sm text-cyber-text outline-none focus:border-cyber-cyan focus:ring-2 focus:ring-cyber-cyan/25' : `${controlClasses} cursor-pointer appearance-auto pr-9`, variant === 'field' && leading && 'pl-10', className)} {...props}>{children}</select>
  if (label == null) return select
  return <label className={cn(variant === 'settings' ? 'grid gap-2 rounded-xl border border-cyber-purple/20 bg-white/[0.035] p-4' : 'grid min-w-0 gap-2 relative', wrapperClassName)} htmlFor={controlId}>
    <span className={labelClassName ?? (variant === 'settings' ? 'flex items-center gap-2 text-sm font-semibold text-slate-100' : 'text-xs font-semibold capitalize tracking-[0.16em] text-cyan-100')}>{variant === 'settings' && leading}{label}</span>
    {description && <span className="text-xs text-cyber-muted">{description}</span>}
    {variant !== 'settings' && leading}{select}
  </label>
}
