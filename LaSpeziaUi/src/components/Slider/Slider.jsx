import { sliderDefaults } from './config'
import { useId, useState } from 'react'
import { cn } from '../../utils/cn.ts'
export default function Slider({ label, leading, value, defaultValue, onChange, min = sliderDefaults.min, max = sliderDefaults.max, step = sliderDefaults.step, accent = sliderDefaults.accent, tone = 'cyan', id, formatValue = (v) => `${v}%`, className, style, ...props }) {
  const generated = useId(); const controlId = id ?? generated
  const [internalValue, setInternalValue] = useState(defaultValue ?? min)
  const shownValue = value ?? internalValue
  const input = <input {...props} id={controlId} type="range" min={min} max={max} step={step} value={value} defaultValue={defaultValue} onChange={(event) => { if (value === undefined) setInternalValue(event.target.value); onChange?.(event) }} aria-labelledby={label != null ? `${controlId}-label` : props['aria-labelledby']} className={cn('audio-volume-slider w-full', className)} style={{ '--range-accent': accent, '--range-fill': `${(Number(shownValue) - min) / (max - min || 1) * 100}%`, ...style }} />
  if (label == null) return input
  return <section className={cn('grid gap-3 rounded-xl border bg-white/[0.035] p-4', tone === 'purple' ? 'border-cyber-purple/20' : 'border-cyber-cyan/20')} aria-labelledby={`${controlId}-label`}>
    <div className="flex items-center justify-between gap-3"><h4 id={`${controlId}-label`} className="m-0 flex items-center gap-2 text-sm font-semibold text-slate-100">{leading}{label}</h4><output htmlFor={controlId} className="font-mono text-xs tabular-nums text-cyber-muted">{formatValue(shownValue)}</output></div>{input}
  </section>
}
