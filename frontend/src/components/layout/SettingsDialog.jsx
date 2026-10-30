import { useEffect, useState } from 'react'
import { Dialog, Slider, Select, Button, Tooltip, Icon, languages, useI18n } from 'laspeziaui'
export default function SettingsDialog({open,onClose,onSave,effectsVolume,onEffectsVolumeChange,musicVolume,onMusicVolumeChange,onRestoreDefaults}) {
  const {language,preloadLanguage,t}=useI18n()
  const [pendingLanguage,setPendingLanguage]=useState(language)
  useEffect(()=>{if(open)setPendingLanguage(language)},[open,language])
  const alreadyDefault=Math.round(effectsVolume*100)===67&&Math.round(musicVolume*100)===4&&pendingLanguage==='it'
  const footer=<div className="flex flex-wrap items-center justify-end gap-2">
    <Tooltip content={t(alreadyDefault?'settings.alreadyDefault':'settings.restoreHint')}><Button variant="restore" disabled={alreadyDefault} onClick={()=>{onRestoreDefaults();setPendingLanguage('it')}}><Icon name="RotateCcw" size={15} aria-hidden="true" />{t('settings.restore')}</Button></Tooltip>
    <Button variant="save" onClick={()=>onSave(pendingLanguage)}>{t('settings.save')}</Button>
  </div>
  return <Dialog open={open} onRequestClose={onClose} title={t('settings.title')} footer={footer}>
    <section className="grid gap-3" aria-labelledby="settings-audio-title"><h3 id="settings-audio-title" className="m-0 text-xs font-bold capitalize tracking-[0.18em] text-cyan-200">{t('settings.audio')}</h3>
      <Slider id="effects-volume" label={t('settings.effects')} leading={<Icon name="Volume2" size={17} aria-hidden="true" />} value={Math.round(effectsVolume*100)} onChange={(e)=>onEffectsVolumeChange(Number(e.target.value)/100)} />
      <Slider id="music-volume" label={t('settings.music')} leading={<Icon name="Music2" size={17} aria-hidden="true" />} tone="purple" accent="#d8b4fe" value={Math.round(musicVolume*100)} onChange={(e)=>onMusicVolumeChange(Number(e.target.value)/100)} />
    </section>
    <section className="grid gap-3" aria-labelledby="settings-language-title"><h3 id="settings-language-title" className="m-0 text-xs font-bold capitalize tracking-[0.18em] text-purple-200">{t('settings.language')}</h3>
      <Select id="settings-language" variant="settings" label={t('settings.language')} description={t('settings.languageHelp')} leading={<Icon name="Globe2" size={17} aria-hidden="true" />} value={pendingLanguage} onChange={(e)=>{setPendingLanguage(e.target.value);preloadLanguage(e.target.value).catch(()=>{})}}>{languages.map((item)=><option key={item.code} value={item.code}>{item.name}</option>)}</Select>
    </section>
  </Dialog>
}
