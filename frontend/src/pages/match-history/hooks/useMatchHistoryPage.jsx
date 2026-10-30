import { useMemo, useState } from 'react'
import { useI18n } from 'laspeziaui'
import { buildMatchHistoryRows, selectMatchHistoryRows } from '../utils/matchHistory.js'
import { getPeriodStart } from '../utils/datePeriods.js'
import MatchHistoryFilters from '../components/MatchHistoryFilters.jsx'
import { historyColumns, historyDefaults } from '../config.jsx'
export function useMatchHistoryPage({data,onPlayerSelect}) {
  const {t,locale}=useI18n()
  const [period,setPeriod]=useState(historyDefaults.period), [winnerQuery,setWinnerQuery]=useState(''), [sort,setSort]=useState(historyDefaults.sort)
  const rows=useMemo(()=>selectMatchHistoryRows(buildMatchHistoryRows(data,t('history.unknownPlayer')),{periodStart:getPeriodStart(period),winnerQuery,sort},locale),[data,t,locale,period,winnerQuery,sort])
  return {title:t('history.title'),tableProps:{columns:historyColumns({t,locale,onPlayerSelect}),rows,sort,onSortChange:setSort,filters:{winners:winnerQuery},onFiltersChange:(filters)=>setWinnerQuery(filters.winners),layout:'history',floating:true,emptyState:t('history.noMatches'),toolbar:<MatchHistoryFilters period={period} onPeriodChange={setPeriod} />,toolbarClassName:'match-history grid min-h-0 grid-rows-[auto_minmax(0,1fr)] gap-4'}}
}
