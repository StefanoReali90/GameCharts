# FrenchPlayingCard

Carta francese singola con risorse e jolly custom inclusi.

## API e valori predefiniti

`size="small"`: 20 × 28 px; `medium`: 38 × 54 px; `custom`: width/height numeriche in pixel. Se custom non ha dimensioni usa small.

```ts
import type { HTMLAttributes, ElementType, ReactNode, ReactElement, Ref, RefObject, SVGProps, ButtonHTMLAttributes, SelectHTMLAttributes, InputHTMLAttributes, AudioHTMLAttributes, CSSProperties, PointerEvent, AnimationEvent } from 'react'
export type FrenchCard = { kind:'joker' } | { kind:'number'|'court'; suit:'club'|'diamond'|'heart'|'spade'; rank:number|'jack'|'queen'|'king' } | { kind:'custom-value'; value:number }
export interface FrenchPlayingCardProps extends HTMLAttributes<HTMLSpanElement> { card:FrenchCard; size?:'small'|'medium'|'custom'; width?:number; height?:number }
```

## Composizione, comportamento e accessibilità

Quattro semi, valori 1–10 e figure, jolly_custom e base con valore custom. Dimensione mancante ricavata dalle proporzioni del preset; con entrambe immagine contenuta senza deformazione. Risorse locali del set esistente nella libreria; adattamenti responsive dei contesti attuali conservati. Regole dei punteggi restano nell’app.

## File e responsabilità

- `FrenchPlayingCard.jsx`: implementazione.
- `index.ts`: esportazioni pubbliche.
- `config.ts`: configurazioni e costanti.
- `types.ts`: contratto delle prop.
- `style.css`: regole del componente; le utility sono generate dal preset condiviso.
- `SPECIFICHE.md`: questa scheda.

Il componente e le dipendenze necessarie appartengono a LaSpeziaUi. L’app importa soltanto l’API pubblica e fornisce dati, contenuti e callback specifici. Gli stili comuni sono esposti da `laspeziaui/styles.css`.

## Esempio

```jsx
import { FrenchPlayingCard } from 'laspeziaui'

<FrenchPlayingCard card={{ kind: "joker" }} size="medium" />
```

## Compatibilità e verifiche

La configurazione usata in GameCharts riproduce il comportamento precedente al refactor; nessuna variazione grafica implicita è autorizzata. Le sole opzioni future dichiarate non creano automaticamente nuove rese. Consultare il rapporto di verifica in `documentazione/LaSpeziaUi/VERIFICHE.md` per build, test e confronto browser eseguiti sul refactor.

La copia in `documentazione/LaSpeziaUi/FrenchPlayingCard/SPECIFICHE.md` viene aggiornata da `npm run docs` nella libreria. Questa scheda, vicina al codice, è la sorgente da mantenere aggiornata.
