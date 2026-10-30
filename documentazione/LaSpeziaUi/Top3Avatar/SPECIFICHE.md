# Top3Avatar

Avatar di carte per una delle tre posizioni del podio.

## API e valori predefiniti

`position`: solo 1, 2 o 3; `label` per il nome accessibile. Primo tre jolly, secondo due, terzo uno: configurazione attuale preservata.

```ts
import type { HTMLAttributes, ElementType, ReactNode, ReactElement, Ref, RefObject, SVGProps, ButtonHTMLAttributes, SelectHTMLAttributes, InputHTMLAttributes, AudioHTMLAttributes, CSSProperties, PointerEvent, AnimationEvent } from 'react'
export interface Top3AvatarProps extends HTMLAttributes<HTMLSpanElement> { position:1|2|3; label?:string }
```

## Composizione, comportamento e accessibilità

Compone FrenchPlayingCard medium, sovrapposizioni e rotazioni attuali. L’ultima richiesta di equivalenza totale conserva il numero di jolly esistente. Nessun oggetto giocatore o regola per altre posizioni nell’API.

## File e responsabilità

- `Top3Avatar.jsx`: implementazione.
- `index.ts`: esportazioni pubbliche.
- `config.ts`: configurazioni e costanti.
- `types.ts`: contratto delle prop.
- `style.css`: regole del componente; le utility sono generate dal preset condiviso.
- `SPECIFICHE.md`: questa scheda.

Il componente e le dipendenze necessarie appartengono a LaSpeziaUi. L’app importa soltanto l’API pubblica e fornisce dati, contenuti e callback specifici. Gli stili comuni sono esposti da `laspeziaui/styles.css`.

## Esempio

```jsx
import { Top3Avatar } from 'laspeziaui'

<Top3Avatar position={1} label="Primo classificato" />
```

## Compatibilità e verifiche

La configurazione usata in GameCharts riproduce il comportamento precedente al refactor; nessuna variazione grafica implicita è autorizzata. Le sole opzioni future dichiarate non creano automaticamente nuove rese. Consultare il rapporto di verifica in `documentazione/LaSpeziaUi/VERIFICHE.md` per build, test e confronto browser eseguiti sul refactor.

La copia in `documentazione/LaSpeziaUi/Top3Avatar/SPECIFICHE.md` viene aggiornata da `npm run docs` nella libreria. Questa scheda, vicina al codice, è la sorgente da mantenere aggiornata.
