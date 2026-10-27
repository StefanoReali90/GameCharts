import { useMemo, useState } from 'react'
import { buildMatchHistoryRows, selectMatchHistoryRows } from '../../utils/matchHistory.js'
import { getPeriodStart } from '../../utils/datePeriods.js'
import MatchHistoryFilters from './MatchHistoryFilters.jsx'
import MatchHistoryTable from './MatchHistoryTable.jsx'
import { useI18n } from '../../i18n/I18nProvider.jsx'

export default function MatchHistory({ data, onPlayerSelect }) {
  const { t, locale } = useI18n()
  const [period, setPeriod] = useState('all')
  const [winnerQuery, setWinnerQuery] = useState('')
  const [sort, setSort] = useState({ key: 'date', direction: 'desc' })

  const matches = useMemo(() => selectMatchHistoryRows(
    buildMatchHistoryRows(data, t('history.unknownPlayer')),
    { periodStart: getPeriodStart(period), winnerQuery, sort },
    locale,
  ), [data, t, locale, period, winnerQuery, sort])

  const toggleSort = (key) => setSort((current) => current.key === key
    ? { key, direction: current.direction === 'asc' ? 'desc' : 'asc' }
    : { key, direction: key === 'winners' ? 'asc' : 'desc' })

  return (
    <div className="match-history grid min-h-0 grid-rows-[auto_minmax(0,1fr)] gap-4">
      <MatchHistoryFilters period={period} onPeriodChange={setPeriod} />
      <MatchHistoryTable matches={matches} sort={sort} onSort={toggleSort} winnerQuery={winnerQuery} onWinnerQueryChange={setWinnerQuery} onPlayerSelect={onPlayerSelect} />
    </div>
  )
}
