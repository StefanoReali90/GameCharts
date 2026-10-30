# Internazionalizzazione

Provider, context, `useI18n`, elenco delle 21 lingue e dizionari appartengono alla libreria. L'app importa `I18nProvider`, `useI18n` e `languages` dalla sua API pubblica.

La configurazione e i valori predefiniti sono descritti in [HOOK_E_I18N.md](../../../documentazione/LaSpeziaUi/HOOK_E_I18N.md). L'italiano rimane la lingua iniziale; fallback italiano/inglese/chiave, interpolazione, caricamento differito, cache, preferenze salvate, titolo e direzione del documento conservano il comportamento precedente.

Il test `locales.test.js` verifica la copertura delle 21 lingue e l'equivalenza dei segnaposto. Il confronto browser del refactor verifica anche selezione, salvataggio e riapertura in francese. Nessun provider o dizionario duplicato nel frontend.
