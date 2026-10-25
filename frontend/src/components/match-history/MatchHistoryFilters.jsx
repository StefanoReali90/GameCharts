import { ArrowDown, ArrowUp, CalendarDays } from 'lucide-react'
import { PERIOD_OPTIONS } from '../../utils/datePeriods.js'
import NeonButton from '../ui/NeonButton.jsx'
import { NeonField, NeonSelect } from '../ui/NeonField.jsx'
import { useI18n } from '../../i18n/I18nProvider.jsx'

export default function MatchHistoryFilters({
  period,
  onPeriodChange,
  sortDirection,
  onSortToggle,
}) {
  const { t } = useI18n()
  const SortIcon = sortDirection === 'desc' ? ArrowDown : ArrowUp

  return (
    <div className="history-controls grid grid-cols-[minmax(0,1fr)_auto] items-end gap-3 max-[480px]:grid-cols-1">
      <NeonField label={t('history.period')} htmlFor="history-period-filter" className="relative">
        <CalendarDays className="pointer-events-none absolute bottom-3 left-3 h-4 w-4 text-cyber-muted" aria-hidden="true" />
        <NeonSelect id="history-period-filter" value={period} onChange={(event) => onPeriodChange(event.target.value)} className="pl-10">
          {PERIOD_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>{t(option.labelKey)}</option>
          ))}
        </NeonSelect>
      </NeonField>

      <NeonButton
        variant="primary"
        className="history-sort whitespace-nowrap"
        type="button"
        onClick={onSortToggle}
        aria-label={t('history.sort', { from: t(sortDirection === 'desc' ? 'history.older' : 'history.newer'), to: t(sortDirection === 'desc' ? 'history.newer' : 'history.older') })}
      >
        {t('history.date')} <SortIcon size={16} aria-hidden="true" />
      </NeonButton>
    </div>
  )
}
