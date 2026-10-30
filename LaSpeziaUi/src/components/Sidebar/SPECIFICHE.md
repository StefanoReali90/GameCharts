# Sidebar

Contenitore laterale con stato e interazioni generiche.

## API e valori predefiniti

`transition="animated"` o instant; `cornerStyle="rounded"` o square; `openOn="both"` con button/hover; `openDelayMs=0`, `closeDelayMs=160`.

```ts
import type { HTMLAttributes, ElementType, ReactNode, ReactElement, Ref, RefObject, SVGProps, ButtonHTMLAttributes, SelectHTMLAttributes, InputHTMLAttributes, AudioHTMLAttributes, CSSProperties, PointerEvent, AnimationEvent } from 'react'
export interface SidebarProps extends HTMLAttributes<HTMLElement> { open?:boolean; onOpenChange?:(open:boolean)=>void; controller?:{open:boolean;pointerEnter:(event:PointerEvent<HTMLElement>)=>void;pointerLeave:(event:PointerEvent<HTMLElement>)=>void}; openOn?:'button'|'hover'|'both'; openDelayMs?:number; closeDelayMs?:number; transition?:'animated'|'instant'; cornerStyle?:'rounded'|'square'; bottom?:ReactNode; footer?:ReactNode }
```

## Composizione, comportamento e accessibilità

children per i contenuti, bottom per le azioni inferiori e footer. useSidebar espone apertura fissata e hover temporaneo, toggle/close e handler del puntatore. Controller esterno da configurare con le stesse opzioni; senza controller Sidebar gestisce i ritardi internamente e notifica onOpenChange. Ritardi riguardano hover, pulsante immediato. Timer cancellati e ripuliti. Layout touch non attiva hover; instant elimina transizioni anche di etichette/raccordi.

## File e responsabilità

- `Sidebar.jsx`: implementazione.
- `index.ts`: esportazioni pubbliche.
- `config.ts`: configurazioni e costanti.
- `types.ts`: contratto delle prop.
- `style.css`: regole del componente; le utility sono generate dal preset condiviso.
- `SPECIFICHE.md`: questa scheda.

Il componente e le dipendenze necessarie appartengono a LaSpeziaUi. L’app importa soltanto l’API pubblica e fornisce dati, contenuti e callback specifici. Gli stili comuni sono esposti da `laspeziaui/styles.css`.

## Esempio

```jsx
import { Sidebar } from 'laspeziaui'

<Sidebar open={sidebar.open} controller={sidebar} footer={footer}>{navigation}</Sidebar>
```

## Compatibilità e verifiche

La configurazione usata in GameCharts riproduce il comportamento precedente al refactor; nessuna variazione grafica implicita è autorizzata. Le sole opzioni future dichiarate non creano automaticamente nuove rese. Consultare il rapporto di verifica in `documentazione/LaSpeziaUi/VERIFICHE.md` per build, test e confronto browser eseguiti sul refactor.

La copia in `documentazione/LaSpeziaUi/Sidebar/SPECIFICHE.md` viene aggiornata da `npm run docs` nella libreria. Questa scheda, vicina al codice, è la sorgente da mantenere aggiornata.
