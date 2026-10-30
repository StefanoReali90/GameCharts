import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { useI18n, useReducedMotion, cn } from 'laspeziaui'
import { buildLeaderboard, findLeaderboardPlayer, selectLeaderboardPlayers } from '../utils/leaderboard.js'
import { leaderboardColumns, leaderboardDefaults } from '../config.jsx'
import ClearSearch from '../components/ClearSearch.jsx'
export function useLeaderboardPage({data,previousPositions,targetPlayerId=null,entranceReady=true,entranceFinished=false,onEntranceComplete}) {
  const {t,locale}=useI18n()
  const [tableExpanded,setTableExpanded]=useState(false), [layoutExpanded,setLayoutExpanded]=useState(false), [tableMotion,setTableMotion]=useState('idle'), [nameQuery,setNameQuery]=useState(''), [sort,setSort]=useState(leaderboardDefaults.sort), [podiumHeight,setPodiumHeight]=useState(null), [spotlightPlayerId,setSpotlightPlayerId]=useState(targetPlayerId)
  const podiumRef=useRef(null); const reducedMotion=useReducedMotion()
  useLayoutEffect(()=>{const podium=podiumRef.current;if(!podium)return;const measure=()=>setPodiumHeight(Math.ceil(podium.getBoundingClientRect().height));measure();const observer=new ResizeObserver(measure);observer.observe(podium);return()=>observer.disconnect()},[])
  const rankedPlayers=useMemo(()=>buildLeaderboard(data),[data])
  const tablePlayers=useMemo(()=>selectLeaderboardPlayers(rankedPlayers,nameQuery,sort,locale),[rankedPlayers,nameQuery,sort,locale])
  const highlightedPlayerId=useMemo(()=>findLeaderboardPlayer(rankedPlayers,nameQuery)?.id??targetPlayerId,[rankedPlayers,nameQuery,targetPlayerId])
  const targetPosition=rankedPlayers.find((p)=>p.id===targetPlayerId)?.position, skipPodiumEntrance=targetPosition<=3
  const podiumHighlightedPlayerId=!layoutExpanded&&!nameQuery.trim()&&skipPodiumEntrance&&spotlightPlayerId===targetPlayerId?targetPlayerId:null
  useEffect(()=>{if(targetPlayerId===null||!skipPodiumEntrance)return;setSpotlightPlayerId(targetPlayerId);const timer=window.setTimeout(()=>setSpotlightPlayerId(null),leaderboardDefaults.spotlightDurationMs);return()=>window.clearTimeout(timer)},[targetPlayerId,skipPodiumEntrance])
  useEffect(()=>{if(targetPlayerId===null||targetPosition===undefined)return;document.querySelector(targetPosition<=3?`.podium-card[data-player-id="${targetPlayerId}"]`:`tr[data-player-id="${targetPlayerId}"]`)?.focus({preventScroll:true})},[targetPlayerId,targetPosition])
  const showMedalRows=tableExpanded||Boolean(nameQuery.trim())
  const expand=(next)=>{setTableMotion(next?'opening':'idle');setTableExpanded(next);setLayoutExpanded(next)}
  return {
    title:t('leaderboard.title'),
    gridClassName:cn('leaderboard-content grid min-h-0 overflow-visible',podiumHeight!==null&&!reducedMotion&&'transition-[grid-template-rows,row-gap] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]',layoutExpanded?'h-full':'h-full max-[760px]:h-auto max-[760px]:min-h-full'),
    gridStyle:{gridTemplateRows:podiumHeight===null?'auto minmax(0, 1fr)':`${layoutExpanded?0:podiumHeight}px minmax(0, 1fr)`,rowGap:layoutExpanded?0:10},
    podiumProps:{podiumRef,expanded:layoutExpanded,entranceReady,entranceFinished,onEntranceComplete,players:rankedPlayers.filter((p)=>p.position<=3),highlightedPlayerId:podiumHighlightedPlayerId,skipEntrance:skipPodiumEntrance},
    tableProps:{id:'leaderboard-table',layout:'ranking',columns:leaderboardColumns({t,locale,previousPositions}),rows:tablePlayers,sort,onSortChange:setSort,filters:{name:nameQuery},onFiltersChange:(f)=>setNameQuery(f.name),getRowProps:(p)=>({'data-player-id':p.id,tabIndex:-1}),getRowOptions:(p)=>({rank:p.position<=3?p.position:undefined,visible:showMedalRows||p.position>3}),rowsExpanded:showMedalRows,motion:tableMotion,highlightedRowId:skipPodiumEntrance&&!nameQuery.trim()?null:highlightedPlayerId,withCard:true,ariaLabel:t('leaderboard.aria'),expandable:true,expanded:tableExpanded,onExpandedChange:expand,headerStart:<h3 className="m-0 mr-auto text-sm font-semibold capitalize tracking-[0.14em] text-cyan-100">{t('leaderboard.results')}</h3>,headerEnd:<ClearSearch query={nameQuery} onClear={()=>setNameQuery('')} t={t} />,emptyState:t(!showMedalRows&&rankedPlayers.some((p)=>p.position<=3)?'leaderboard.emptyOthers':'leaderboard.empty')}
  }
}
