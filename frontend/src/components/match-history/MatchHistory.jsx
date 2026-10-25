import { useMemo, useState } from 'react'
import { buildMatchHistoryRows } from '../../utils/matchHistory.js'
import { getPeriodStart } from '../../utils/datePeriods.js'
import AddMatchForm from './AddMatchForm.jsx'
import MatchHistoryFilters from './MatchHistoryFilters.jsx'
import MatchHistoryTable from './MatchHistoryTable.jsx'
import { useI18n } from '../../i18n/I18nProvider.jsx'

export default function MatchHistory({ data, onAddMatch }) {
  const { t } = useI18n()
  const [period, setPeriod] = useState('all')
  const [sortDirection, setSortDirection] = useState('desc')

  const filteredMatches = useMemo(() => {
    const periodStart = getPeriodStart(period)

    return buildMatchHistoryRows(data, t('history.unknownPlayer'))
      .filter((match) => {
        const matchDate = new Date(match.date)
        const matchesPeriod = !periodStart || matchDate >= periodStart

        return matchesPeriod
      })
      .sort((first, second) => {
        const dateOrder = sortDirection === 'desc'
          ? second.date.localeCompare(first.date)
          : first.date.localeCompare(second.date)

        return dateOrder || second.id - first.id
      })
  }, [data, period, sortDirection, t])

  return (
    <div className="match-history grid min-h-0 grid-rows-[auto_auto_minmax(0,1fr)] gap-4 overflow-visible">
      <AddMatchForm players={data.players} onAddMatch={onAddMatch} />
      <MatchHistoryFilters
        period={period}
        onPeriodChange={setPeriod}
        sortDirection={sortDirection}
        onSortToggle={() => setSortDirection((direction) => direction === 'desc' ? 'asc' : 'desc')}
      />
      <MatchHistoryTable matches={filteredMatches} />
    </div>
  )
}
