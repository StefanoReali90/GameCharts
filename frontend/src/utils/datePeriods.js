export const PERIOD_OPTIONS = [
  { value: 'all', label: 'Tutti i tempi' },
  { value: 'year', label: 'Ultimo anno' },
  { value: 'sixMonths', label: 'Ultimi 6 mesi' },
  { value: 'month', label: 'Ultimi 30 giorni' },
]

export function getPeriodStart(period) {
  const start = new Date()

  if (period === 'year') start.setFullYear(start.getFullYear() - 1)
  if (period === 'sixMonths') start.setMonth(start.getMonth() - 6)
  if (period === 'month') start.setDate(start.getDate() - 30)

  return period === 'all' ? null : start
}
