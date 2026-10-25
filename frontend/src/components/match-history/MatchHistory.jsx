import { useMemo } from 'react'
import { buildMatchHistoryRows } from '../../utils/matchHistory.js'
import MatchHistoryTable from './MatchHistoryTable.jsx'
import { useI18n } from '../../i18n/I18nProvider.jsx'

export default function MatchHistory({ data }) {
  const { t } = useI18n()

  const matches = useMemo(() => buildMatchHistoryRows(data, t('history.unknownPlayer'))
    .sort((first, second) => second.date.localeCompare(first.date) || second.id - first.id), [data, t])

  return (
    <div className="match-history grid min-h-0 grid-rows-[minmax(0,1fr)]">
      <MatchHistoryTable matches={matches} />
    </div>
  )
}
