export const baseClasses = 'inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border px-4 py-2 text-sm font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyber-cyan/70 disabled:opacity-50'
export const variants = {
  primary: 'border-cyber-cyan/60 bg-cyber-cyan/15 text-cyan-50 shadow-neon-cyan hover:border-cyber-purple/70 hover:bg-cyber-purple/15 hover:shadow-neon-purple',
  subtle: 'border-cyber-purple/35 bg-cyber-purple/[0.08] text-cyber-text hover:border-cyber-cyan/65 hover:bg-cyber-cyan/10 hover:shadow-neon-cyan',
  ghost: 'border-transparent bg-transparent text-cyber-muted hover:border-cyber-purple/40 hover:bg-cyber-purple/[0.08] hover:text-cyber-text',
}
export const nativeVariants = {
  save: 'rounded-xl border border-cyber-cyan/45 bg-cyber-cyan/15 px-5 py-2.5 text-sm font-semibold text-cyan-50 transition-colors hover:bg-cyber-cyan/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyber-cyan',
  restore: 'inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm font-semibold text-slate-200 transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyber-cyan disabled:cursor-not-allowed disabled:opacity-45',
  close: 'grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-white/10 bg-white/5 text-slate-200 transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyber-cyan',
  link: 'rounded px-0.5 text-green-200 underline decoration-green-300/50 underline-offset-4 transition-colors hover:text-green-100 hover:decoration-current focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyber-cyan',
  plain: '',
}
