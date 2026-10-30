# Hook e internazionalizzazione

## Hook pubblici

- `useFloatingTilt({tilt=5, pressTilt=0, releaseDelayMs=170, springOptions})`: inclinazione e pressione, molle condivise come configurazione, rispetto del movimento ridotto e pulizia timer.
- `useAnimationVisibility({rootMargin="100px 0px"})`: osservatori condivisi per margine, pausa fuori vista; pulizia dell’osservazione e fallback se IntersectionObserver manca.
- `useSidebar({openOn="both",openDelayMs=0,closeDelayMs=160,onOpenChange})`: open/pinned, toggle/close e handler del puntatore; nessuna regola di navigazione.
- `useAudioSettings({storageKey="gamechart-audio-settings-v2",defaultEffectsVolume=0.67,defaultMusicVolume=0.04})`: anteprima, salvataggio, annullamento e ripristino; validazione/arrotondamento e fallback senza localStorage.
- `useSoundEffects()`: accesso al motore audio condiviso; nessun motore duplicato per hook.

## i18n

`I18nProvider`, `useI18n` e `languages` sono esportati dalla libreria. Le 21 traduzioni esistenti sono incluse; italiano e inglese immediati, altre lingue caricate su richiesta e memorizzate in cache.

Il provider accetta defaultLanguage, fallbackLanguages, storageKey, languages, dictionaries, loaders, documentTitleKey e manageDocument. Il default conserva italiano, fallback italiano/inglese/chiave, chiave `gamechart-language-v2`, titolo tradotto, locale zh-CN e RTL per arabo/urdu.

`useI18n` espone language, locale, t, preloadLanguage e saveLanguage. Testi e segnaposto restano invariati. Context e provider non sono duplicati nell’app.

## Animazioni custom dell’app

`motion`, `AnimatePresence` e `useReducedMotion` sono disponibili dall’API della libreria per le composizioni custom già esistenti del podio. La dipendenza esterna è posseduta da LaSpeziaUi; non viene importata direttamente dal frontend.
