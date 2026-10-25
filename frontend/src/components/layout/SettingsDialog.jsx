import { Globe2, Music2, RotateCcw, Volume2 } from 'lucide-react'
import AppDialog from '../ui/AppDialog.jsx'
import Tooltip from '../ui/Tooltip.jsx'
import { languages, useI18n } from '../../i18n/I18nProvider.jsx'

export default function SettingsDialog({
  open,
  onClose,
  onSave,
  effectsVolume,
  onEffectsVolumeChange,
  musicVolume,
  onMusicVolumeChange,
  onRestoreDefaults,
}) {
  const { language, setLanguage, t } = useI18n()
  const formatVolume = (volume) => `${Number((volume * 100).toFixed(1))}%`
  const alreadyDefault = Math.round(effectsVolume * 1000) === 670 && Math.round(musicVolume * 1000) === 40 && language === 'en'

  return (
    <AppDialog open={open} onRequestClose={onClose} title={t('settings.title')}>
      <div className="grid gap-6">
        <section className="grid gap-3" aria-labelledby="settings-audio-title">
          <h3 id="settings-audio-title" className="m-0 text-xs font-bold uppercase tracking-[0.18em] text-cyan-200">{t('settings.audio')}</h3>
          <section className="grid gap-3 rounded-xl border border-cyber-cyan/20 bg-white/[0.035] p-4" aria-labelledby="effects-volume-label">
            <div className="flex items-center justify-between gap-3">
              <h4 id="effects-volume-label" className="m-0 flex items-center gap-2 text-sm font-semibold text-slate-100"><Volume2 size={17} aria-hidden="true" /> {t('settings.effects')}</h4>
              <output htmlFor="effects-volume" className="font-mono text-xs tabular-nums text-cyber-muted">{formatVolume(effectsVolume)}</output>
            </div>
            <input id="effects-volume" type="range" min="0" max="100" step="0.5" value={effectsVolume * 100} onChange={(event) => onEffectsVolumeChange(Number(event.target.value) / 100)} aria-labelledby="effects-volume-label" className="audio-volume-slider w-full" style={{ '--range-accent': '#67e8f9', '--range-fill': `${effectsVolume * 100}%` }} />
          </section>

          <section className="grid gap-3 rounded-xl border border-cyber-purple/20 bg-white/[0.035] p-4" aria-labelledby="music-volume-label">
            <div className="flex items-center justify-between gap-3">
              <h4 id="music-volume-label" className="m-0 flex items-center gap-2 text-sm font-semibold text-slate-100"><Music2 size={17} aria-hidden="true" /> {t('settings.music')}</h4>
              <output htmlFor="music-volume" className="font-mono text-xs tabular-nums text-cyber-muted">{formatVolume(musicVolume)}</output>
            </div>
            <input id="music-volume" type="range" min="0" max="100" step="0.5" value={musicVolume * 100} onChange={(event) => onMusicVolumeChange(Number(event.target.value) / 100)} aria-labelledby="music-volume-label" className="audio-volume-slider w-full" style={{ '--range-accent': '#d8b4fe', '--range-fill': `${musicVolume * 100}%` }} />
          </section>
        </section>

        <section className="grid gap-3" aria-labelledby="settings-language-title">
          <h3 id="settings-language-title" className="m-0 text-xs font-bold uppercase tracking-[0.18em] text-purple-200">{t('settings.language')}</h3>
          <label className="grid gap-2 rounded-xl border border-cyber-purple/20 bg-white/[0.035] p-4" htmlFor="settings-language">
            <span className="flex items-center gap-2 text-sm font-semibold text-slate-100"><Globe2 size={17} aria-hidden="true" /> {t('settings.language')}</span>
            <span className="text-xs text-cyber-muted">{t('settings.languageHelp')}</span>
            <select id="settings-language" className="h-11 w-full rounded-xl border border-cyber-purple/40 bg-cyber-bg px-3 text-sm text-cyber-text outline-none focus:border-cyber-cyan focus:ring-2 focus:ring-cyber-cyan/25" value={language} onChange={(event) => setLanguage(event.target.value)}>
              {languages.map((item) => <option key={item.code} value={item.code}>{item.name}</option>)}
            </select>
          </label>
        </section>

        <div className="flex flex-wrap items-center justify-end gap-2">
          <Tooltip content={t(alreadyDefault ? 'settings.alreadyDefault' : 'settings.restoreHint')} disabled={alreadyDefault}>
            <button type="button" disabled={alreadyDefault} className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm font-semibold text-slate-200 transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyber-cyan disabled:cursor-not-allowed disabled:opacity-45" onClick={() => { onRestoreDefaults(); setLanguage('en') }}><RotateCcw size={15} aria-hidden="true" /> {t('settings.restore')}</button>
          </Tooltip>
          <button type="button" className="rounded-xl border border-cyber-cyan/45 bg-cyber-cyan/15 px-5 py-2.5 text-sm font-semibold text-cyan-50 transition-colors hover:bg-cyber-cyan/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyber-cyan" onClick={onSave}>{t('settings.save')}</button>
        </div>
      </div>
    </AppDialog>
  )
}
