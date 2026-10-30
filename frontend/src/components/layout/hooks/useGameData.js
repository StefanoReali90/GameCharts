import { useEffect, useRef, useState } from 'react'
import { loadMatchData, saveMatchData } from '../../../mock/matchStore.js'
import { readRankingSnapshot, saveRankingSnapshot } from '../../../pages/leaderboard/utils/rankingSnapshot.js'
import { buildLeaderboard } from '../../../pages/leaderboard/utils/leaderboard.js'
import { readSimulationTime, saveSimulationTime, simulateMissedMatches, simulateNextMatch, startMockSimulation } from '../../../mock/mockSimulation.js'
export function useGameData() {
  const [matchData,setMatchData]=useState(loadMatchData)
  const ref=useRef(matchData);ref.current=matchData
  const [previousPositions,setPreviousPositions]=useState(()=>{const saved=readRankingSnapshot();return Object.keys(saved).length?saved:Object.fromEntries(buildLeaderboard(matchData).map(({id,position})=>[id,position]))})
  useEffect(()=>{if(!import.meta.env.DEV)return;const now=Date.now(),last=readSimulationTime();if(last!==null)setMatchData((data)=>simulateMissedMatches(data,last,now));saveSimulationTime(now);return startMockSimulation(()=>{const time=Date.now();setMatchData((data)=>simulateNextMatch(data));saveSimulationTime(time)})},[])
  useEffect(()=>{saveMatchData(matchData)},[matchData])
  useEffect(()=>{const save=()=>saveRankingSnapshot(buildLeaderboard(ref.current));const visibility=()=>{if(document.visibilityState==='hidden')save();else setPreviousPositions(readRankingSnapshot())};window.addEventListener('pagehide',save);document.addEventListener('visibilitychange',visibility);return()=>{window.removeEventListener('pagehide',save);document.removeEventListener('visibilitychange',visibility)}},[])
  return {matchData,previousPositions}
}
