import { useState } from 'react'
import { useSidebar } from 'laspeziaui'
export function useAppNavigation({onLeaveLeaderboard}) {
  const sidebar=useSidebar()
  const [currentPage,setCurrentPage]=useState('leaderboard'),[targetPlayerId,setTargetPlayerId]=useState(null),[settingsOpen,setSettingsOpen]=useState(false)
  const navigateTo=(page,playerId=null)=>{setCurrentPage(page);setTargetPlayerId(playerId);if(page!=='leaderboard')onLeaveLeaderboard();sidebar.close()}
  return {sidebar,currentPage,targetPlayerId,settingsOpen,navigateTo,openSettings:()=>{setSettingsOpen(true);sidebar.close()},closeSettings:()=>setSettingsOpen(false)}
}
