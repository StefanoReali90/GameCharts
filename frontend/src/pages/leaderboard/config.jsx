import { Badge, PositionTrend, StreakFlame, FrenchPlayingCard } from 'laspeziaui'
import { positionChange } from './utils/rankingSnapshot.js'
import { cardsForScore } from '../../mock/cardRules.js'
export function scoreCards(score) {
  if (score === null) return <span>—</span>
  return <span className="inline-flex items-center justify-center gap-0.5" role="img" aria-label={String(score)}>{cardsForScore(score).map((card,index) => <FrenchPlayingCard key={index} card={card} size="small" />)}</span>
}
export function leaderboardColumns({t,locale,previousPositions}) {
  return [
    {id:'position',header:t('leaderboard.position'),icon:'Hash',defaultSortDirection:'asc',cellContentClassName:'leaderboard-position-cell px-2 font-mono text-xs text-cyber-muted',renderCell:(p)=><><span>{String(p.position).padStart(2,'0')}</span><PositionTrend change={positionChange(p,previousPositions)} /></>},
    {id:'name',header:t('leaderboard.player'),icon:'UserRound',defaultSortDirection:'asc',sortType:'text',filterable:true,filterLabel:t('leaderboard.searchPlaceholder'),filterId:'leaderboard-name',cellContentClassName:'leaderboard-player-cell px-4 font-medium text-cyber-text',renderCell:(p)=><span>{p.username}</span>},
    {id:'wins',header:t('leaderboard.winsColumn'),icon:'Trophy',defaultSortDirection:'desc',cellContentClassName:'px-4',renderCell:(p)=><Badge>{p.wins.toLocaleString(locale)}</Badge>},
    {id:'bestWinStreak',header:t('leaderboard.bestStreak'),icon:'Award',defaultSortDirection:'desc',cellContentClassName:'px-4 tabular-nums text-cyber-muted',accessor:(p)=>p.bestWinStreak},
    {id:'winStreak',header:t('leaderboard.streakColumn'),icon:'Flame',defaultSortDirection:'desc',cellContentClassName:'px-4 text-cyber-muted',renderCell:(p)=><StreakFlame count={p.winStreak} />},
    {id:'bestScore',header:t('leaderboard.best'),icon:'Layers3',defaultSortDirection:'asc',cellContentClassName:'px-4 text-cyber-text',renderCell:(p)=>scoreCards(p.bestScore)},
  ].map((column)=>({...column,sortable:true}))
}

export const leaderboardDefaults = { sort: { key: 'position', direction: 'asc' }, spotlightDurationMs: 1600 }

export const entranceDuration = 0.82
export const entranceStagger = 0.4
export const impactPoint = 0.62

export const podiumPlaces = [
  { rank: 1, tone: 'gold', gridClass: 'col-start-2 row-start-1 pb-4', heightClass: 'min-h-[150px] sm:min-h-[165px]', flight: { x: 0, y: -100, rotate: 0 } },
  { rank: 2, tone: 'silver', gridClass: 'col-start-1 row-start-1 pb-2', heightClass: 'min-h-[135px] sm:min-h-[150px]', flight: { x: -90, y: -70, rotate: -10 } },
  { rank: 3, tone: 'bronze', gridClass: 'col-start-3 row-start-1', heightClass: 'min-h-[135px] sm:min-h-[145px]', flight: { x: 90, y: -70, rotate: 10 } },
]
