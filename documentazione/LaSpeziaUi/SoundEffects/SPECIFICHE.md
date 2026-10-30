# SoundEffects

Componente senza UI che configura il motore condiviso degli effetti.

## API e valori predefiniti

`enabled=true`, `muted=false`, `volume=0.67`, `preload=false`, `unlockOnInteraction=true`, `maxPlaybackDelayMs=300`, `deduplicationWindowMs=500`, `interactionSounds=true`.

```ts
import type { HTMLAttributes, ElementType, ReactNode, ReactElement, Ref, RefObject, SVGProps, ButtonHTMLAttributes, SelectHTMLAttributes, InputHTMLAttributes, AudioHTMLAttributes, CSSProperties, PointerEvent, AnimationEvent } from 'react'
export interface SoundEffectsProps { enabled?:boolean; muted?:boolean; volume?:number; preload?:boolean; unlockOnInteraction?:boolean; maxPlaybackDelayMs?:number; deduplicationWindowMs?:number; interactionSounds?:boolean|{selector?:string}; effectOptions?:Record<string,{enabled?:boolean;volume?:number}> }
```

## Composizione, comportamento e accessibilità

Catalogo: click, cambio pagina, rintocco podio, tocco cristallino, whoosh medaglie, atmosfera intro. effectOptions configura enabled e volume relativo per effetto. useSoundEffects o funzioni pubbliche richiamano il motore unico; non montare più configuratori per lo stesso documento. AudioContext e buffer riusati, richieste obsolete scartate, nodi disconnessi e listener rimossi. Sintesi/timbri/inviluppi attuali conservati.

## File e responsabilità

- `SoundEffects.jsx`: implementazione.
- `index.ts`: esportazioni pubbliche.
- `config.ts`: configurazioni e costanti.
- `types.ts`: contratto delle prop.
- `style.css`: regole del componente; le utility sono generate dal preset condiviso.
- `SPECIFICHE.md`: questa scheda.

Il componente e le dipendenze necessarie appartengono a LaSpeziaUi. L’app importa soltanto l’API pubblica e fornisce dati, contenuti e callback specifici. Gli stili comuni sono esposti da `laspeziaui/styles.css`.

## Esempio

```jsx
import { SoundEffects } from 'laspeziaui'

<SoundEffects volume={settings.effectsVolume} />
```

## Compatibilità e verifiche

La configurazione usata in GameCharts riproduce il comportamento precedente al refactor; nessuna variazione grafica implicita è autorizzata. Le sole opzioni future dichiarate non creano automaticamente nuove rese. Consultare il rapporto di verifica in `documentazione/LaSpeziaUi/VERIFICHE.md` per build, test e confronto browser eseguiti sul refactor.

La copia in `documentazione/LaSpeziaUi/SoundEffects/SPECIFICHE.md` viene aggiornata da `npm run docs` nella libreria. Questa scheda, vicina al codice, è la sorgente da mantenere aggiornata.
