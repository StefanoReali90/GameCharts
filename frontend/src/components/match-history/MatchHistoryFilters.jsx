import { CalendarDays } from 'lucide-react'
import { PERIOD_OPTIONS } from '../../utils/datePeriods.js'
import { NeonField, NeonSelect } from '../ui/NeonField.jsx'
import { useI18n } from '../../i18n/I18nProvider.jsx'

export default function MatchHistoryFilters({ period, onPeriodChange }) {
  const { t } = useI18n()
  return (
    <div className="history-controls w-full max-w-sm">
      <NeonField label={t('history.period')} htmlFor="history-period-filter" className="relative min-w-0">
        <CalendarDays className="pointer-events-none absolute bottom-3 left-3 h-4 w-4 text-cyber-muted" aria-hidden="true" />
        <NeonSelect id="history-period-filter" value={period} onChange={(event) => onPeriodChange(event.target.value)} className="pl-10">
          {PERIOD_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>{t(option.labelKey)}</option>
          ))}
        </NeonSelect>
      </NeonField>
    </div>
  )
}
