import { useMemo } from 'react'
import * as engine from '../audio/engine.js'
export function useSoundEffects() {
  return useMemo(()=>({playButtonClick:engine.playButtonClick,playPageChange:engine.playPageChange,playPodiumChime:engine.playPodiumChime,playCrystalTap:engine.playCrystalTap,playMedalWhoosh:engine.playMedalWhoosh,startIntroAtmosphere:engine.startIntroAtmosphere,stopIntroAtmosphere:engine.stopIntroAtmosphere}),[])
}
