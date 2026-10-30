import { Button, FrenchPlayingCard } from 'laspeziaui'
import { cardsForScore } from '../../mock/cardRules.js'
function scoreCards(score) {
  if (score === null) return <span>—</span>
  return <span className="inline-flex items-center justify-center gap-0.5" role="img" aria-label={String(score)}>{cardsForScore(score).map((card,index) => <FrenchPlayingCard key={index} card={card} size="small" />)}</span>
}
export function historyColumns({t,locale,onPlayerSelect}) {
  return [
    {id:'date',header:t('history.date'),icon:'CalendarDays',defaultSortDirection:'desc',cellClassName:'whitespace-nowrap px-4 py-3.5 text-xs tabular-nums text-cyber-muted',renderCell:(match)=><time dateTime={match.date}>{new Date(match.date).toLocaleString(locale,{dateStyle:'short',timeStyle:'short'})}</time>},
    {id:'winners',header:t('history.winner'),icon:'UsersRound',defaultSortDirection:'asc',filterable:true,filterLabel:t('history.searchWinners'),filterId:'history-winners',filterTone:'purple',cellClassName:'px-4 py-3.5 text-green-200',renderCell:(match)=>match.winners.map((winner,index)=><span key={`${winner.id}-${index}`} className="inline-block whitespace-nowrap">{index>0 && ', '}{winner.known ? <Button variant="link" aria-label={`${winner.username} — ${t('nav.leaderboard')}`} onClick={()=>onPlayerSelect(winner.id)}>{winner.username}</Button> : winner.username}</span>)},
    {id:'winningScore',header:t('history.scores'),icon:'Layers3',defaultSortDirection:'desc',cellClassName:'px-4 py-3.5',renderCell:(match)=>scoreCards(match.winningScore)},
  ].map((column)=>({...column,sortable:true}))
}

export const PERIOD_OPTIONS = [
  { value: 'all', labelKey: 'history.allTime' },
  { value: 'year', labelKey: 'history.lastYear' },
  { value: 'sixMonths', labelKey: 'history.lastSixMonths' },
  { value: 'month', labelKey: 'history.lastThirtyDays' },
]


export const historyDefaults = { period: 'all', sort: { key: 'date', direction: 'desc' } }
