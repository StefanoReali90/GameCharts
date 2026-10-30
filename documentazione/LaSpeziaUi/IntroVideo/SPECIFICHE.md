# IntroVideo

Intro a schermo intero con audio atmosferico e uscita completa.

## API e valori predefiniti

`src` richiesto, `speed=1`, `onComplete` dopo la dissolvenza di 0,25 s, una sola volta.

```ts
import type { HTMLAttributes, ElementType, ReactNode, ReactElement, Ref, RefObject, SVGProps, ButtonHTMLAttributes, SelectHTMLAttributes, InputHTMLAttributes, AudioHTMLAttributes, CSSProperties, PointerEvent, AnimationEvent } from 'react'
export interface IntroVideoProps { src:string; speed?:number; onComplete:()=>void }
```

## Composizione, comportamento e accessibilità

Autoplay muto, playsInline, preload, niente riproduzione remota/Picture-in-Picture. Fine/errore o movimento ridotto completano l’intro. Pausa/attesa fermano l’atmosfera; velocità e durata audio sincronizzate; rimozione pulisce l’audio. AnimatePresence gestita internamente.

## File e responsabilità

- `IntroVideo.jsx`: implementazione.
- `index.ts`: esportazioni pubbliche.
- `config.ts`: configurazioni e costanti.
- `types.ts`: contratto delle prop.
- `style.css`: regole del componente; le utility sono generate dal preset condiviso.
- `SPECIFICHE.md`: questa scheda.

Il componente e le dipendenze necessarie appartengono a LaSpeziaUi. L’app importa soltanto l’API pubblica e fornisce dati, contenuti e callback specifici. Gli stili comuni sono esposti da `laspeziaui/styles.css`.

## Esempio

```jsx
import { IntroVideo } from 'laspeziaui'

<IntroVideo src="/videos/entry-video-4x.mp4" onComplete={startPage} />
```

## Compatibilità e verifiche

La configurazione usata in GameCharts riproduce il comportamento precedente al refactor; nessuna variazione grafica implicita è autorizzata. Le sole opzioni future dichiarate non creano automaticamente nuove rese. Consultare il rapporto di verifica in `documentazione/LaSpeziaUi/VERIFICHE.md` per build, test e confronto browser eseguiti sul refactor.

La copia in `documentazione/LaSpeziaUi/IntroVideo/SPECIFICHE.md` viene aggiornata da `npm run docs` nella libreria. Questa scheda, vicina al codice, è la sorgente da mantenere aggiornata.
