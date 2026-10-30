import { SoundEffects, BackgroundMusic, IntroVideo, useAudioSettings, useI18n } from 'laspeziaui'
import { AppLayout, SettingsDialog, mediaSources, useGameData, useAppMedia, useAppNavigation } from './components/layout/index.js'
import { LeaderboardPage } from './pages/leaderboard/index.js'
import { MatchHistoryPage } from './pages/match-history/index.js'
export default function App() {
  const {matchData,previousPositions}=useGameData()
  const media=useAppMedia(), audio=useAudioSettings()
  const navigation=useAppNavigation({onLeaveLeaderboard:media.completePodium})
  const {saveLanguage}=useI18n()
  return <AppLayout navigation={navigation} media={media} overlays={<>
    <SoundEffects volume={audio.settings.effectsVolume} />
    <BackgroundMusic volume={audio.settings.musicVolume} playing={media.introFinished} />
    <SettingsDialog open={navigation.settingsOpen} onClose={()=>{audio.discardSettings();navigation.closeSettings()}} onSave={(language)=>{audio.saveSettings();saveLanguage(language);navigation.closeSettings()}} effectsVolume={audio.settings.effectsVolume} onEffectsVolumeChange={audio.changeEffectsVolume} musicVolume={audio.settings.musicVolume} onMusicVolumeChange={audio.changeMusicVolume} onRestoreDefaults={audio.restoreDefaults} />
    <IntroVideo src={mediaSources.intro} onComplete={media.completeIntro} />
  </>}>
    {navigation.currentPage==='leaderboard' ? <LeaderboardPage entranceReady={media.introFinished} entranceFinished={media.podiumEntranceFinished} onEntranceComplete={media.completePodium} data={matchData} previousPositions={previousPositions} targetPlayerId={navigation.targetPlayerId} /> : <MatchHistoryPage data={matchData} onPlayerSelect={(id)=>navigation.navigateTo('leaderboard',id)} />}
  </AppLayout>
}
