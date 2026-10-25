export const PERIOD_OPTIONS = [
  { value: 'all', labelKey: 'history.allTime' },
  { value: 'year', labelKey: 'history.lastYear' },
  { value: 'sixMonths', labelKey: 'history.lastSixMonths' },
  { value: 'month', labelKey: 'history.lastThirtyDays' },
]

export function getPeriodStart(period) {
  const start = new Date()

  if (period === 'year') start.setFullYear(start.getFullYear() - 1)
  if (period === 'sixMonths') start.setMonth(start.getMonth() - 6)
  if (period === 'month') start.setDate(start.getDate() - 30)

  return period === 'all' ? null : start
}
