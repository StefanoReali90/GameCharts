# SearchPopover

Pannello di ricerca ancorato all’icona, separato dalla logica di ricerca nei dati.

## API e valori predefiniti

`anchorRef`, `query`, `onSearch`, `onClose`, `label`, `idPrefix`. Larghezza massima attuale 310 px.

```ts
import type { HTMLAttributes, ElementType, ReactNode, ReactElement, Ref, RefObject, SVGProps, ButtonHTMLAttributes, SelectHTMLAttributes, InputHTMLAttributes, AudioHTMLAttributes, CSSProperties, PointerEvent, AnimationEvent } from 'react'
export interface SearchPopoverProps { anchorRef: RefObject<HTMLElement|null>; query: string; onSearch: (value:string)=>void; onClose:(restoreFocus?:boolean)=>void; label:string; idPrefix:string }
```

## Composizione, comportamento e accessibilità

Input interno, Cerca/Annulla via Button, ricerca durante digitazione, conferma con trim, Esc/Annulla ripristinano la query iniziale. Click esterno chiude. Focus iniziale, visualViewport mobile, posizione, scroll, resize e pulizia listener inclusi. Table coordina il trigger.

## File e responsabilità

- `SearchPopover.jsx`: implementazione.
- `index.ts`: esportazioni pubbliche.
- `config.ts`: configurazioni e costanti.
- `types.ts`: contratto delle prop.
- `style.css`: regole del componente; le utility sono generate dal preset condiviso.
- `SPECIFICHE.md`: questa scheda.

Il componente e le dipendenze necessarie appartengono a LaSpeziaUi. L’app importa soltanto l’API pubblica e fornisce dati, contenuti e callback specifici. Gli stili comuni sono esposti da `laspeziaui/styles.css`.

## Esempio

```jsx
import { SearchPopover } from 'laspeziaui'

<SearchPopover anchorRef={anchor} query={query} onSearch={setQuery} onClose={close} label="Cerca" idPrefix="search" />
```

## Compatibilità e verifiche

La configurazione usata in GameCharts riproduce il comportamento precedente al refactor; nessuna variazione grafica implicita è autorizzata. Le sole opzioni future dichiarate non creano automaticamente nuove rese. Consultare il rapporto di verifica in `documentazione/LaSpeziaUi/VERIFICHE.md` per build, test e confronto browser eseguiti sul refactor.

La copia in `documentazione/LaSpeziaUi/SearchPopover/SPECIFICHE.md` viene aggiornata da `npm run docs` nella libreria. Questa scheda, vicina al codice, è la sorgente da mantenere aggiornata.
