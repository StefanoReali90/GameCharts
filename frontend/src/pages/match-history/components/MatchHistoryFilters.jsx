import { Icon, Select, useI18n } from 'laspeziaui'
import { PERIOD_OPTIONS } from '../config.jsx'
export default function MatchHistoryFilters({period,onPeriodChange}) {
  const {t}=useI18n()
  return <div className="history-controls w-full max-w-sm"><Select label={t('history.period')} id="history-period-filter" value={period} onChange={(e)=>onPeriodChange(e.target.value)} leading={<Icon name="CalendarDays" className="pointer-events-none absolute bottom-3 left-3 h-4 w-4 text-cyber-muted" aria-hidden="true" />}>{PERIOD_OPTIONS.map((option)=><option key={option.value} value={option.value}>{t(option.labelKey)}</option>)}</Select></div>
}
