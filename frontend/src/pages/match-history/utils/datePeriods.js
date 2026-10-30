export function getPeriodStart(period) {
  const start = new Date()

  if (period === 'year') start.setFullYear(start.getFullYear() - 1)
  if (period === 'sixMonths') start.setMonth(start.getMonth() - 6)
  if (period === 'month') start.setDate(start.getDate() - 30)

  return period === 'all' ? null : start
}
