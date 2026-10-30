import { useEffect, useRef, useState } from 'react'
const reduced=()=>window.matchMedia('(prefers-reduced-motion: reduce)').matches
export function useAppMedia() {
  const [introFinished,setIntroFinished]=useState(reduced)
  const [podiumEntranceFinished,setPodiumEntranceFinished]=useState(reduced)
  const [showBackgroundVideo,setShowBackgroundVideo]=useState(()=>!reduced())
  const backgroundVideoRef=useRef(null)
  useEffect(()=>{const query=window.matchMedia('(prefers-reduced-motion: reduce)');const update=()=>setShowBackgroundVideo(!query.matches);query.addEventListener('change',update);return()=>query.removeEventListener('change',update)},[])
  useEffect(()=>{const video=backgroundVideoRef.current;if(!video)return;if(showBackgroundVideo&&introFinished&&podiumEntranceFinished)video.play().catch(()=>{video.dataset.playing='false'});else{video.pause();video.dataset.playing='false'}},[showBackgroundVideo,introFinished,podiumEntranceFinished])
  return {introFinished,completeIntro:()=>setIntroFinished(true),podiumEntranceFinished,completePodium:()=>setPodiumEntranceFinished(true),showBackgroundVideo,backgroundVideoRef}
}
