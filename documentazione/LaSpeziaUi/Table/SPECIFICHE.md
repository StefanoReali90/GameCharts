# Table

Tabella generica unica per classifica e storico, senza regole dei dati.

## API e valori predefiniti

`layout="default"`; ranking/history mantengono le rese esistenti. `withCard=false`, `expandable=false`, `expanded=false`, `rowsExpanded=true`, `motion="idle"`, `rowHover=true`, `floating=false`, `tilt=0.5`.

```ts
import type { HTMLAttributes, ElementType, ReactNode, ReactElement, Ref, RefObject, SVGProps, ButtonHTMLAttributes, SelectHTMLAttributes, InputHTMLAttributes, AudioHTMLAttributes, CSSProperties, PointerEvent, AnimationEvent } from 'react'
export interface TableColumn<Row> { id:string; header:ReactNode; icon?:string; accessor?:(row:Row)=>ReactNode; renderCell?:(row:Row,index:number)=>ReactNode; renderHeader?:(column:TableColumn<Row>)=>ReactNode; width?:number|string; minWidth?:number|string; align?:'left'|'center'|'right'; sortable?:boolean; sortType?:'text'|'number'; defaultSortDirection?:'asc'|'desc'; sortLabel?:(direction:'asc'|'desc')=>string; filterable?:boolean; filterLabel?:string; filterId?:string; filterTone?:'cyan'|'purple'; renderFilter?:(context:Record<string,unknown>)=>ReactNode; cellClassName?:string; cellContentClassName?:string }
export interface TableProps<Row = Record<string,unknown>> { columns:TableColumn<Row>[]; rows:Row[]; getRowId?:(row:Row)=>string|number; getRowProps?:(row:Row,index:number)=>HTMLAttributes<HTMLTableRowElement>; getRowOptions?:(row:Row,index:number)=>{rank?:number;visible?:boolean}; renderRow?:(row:Row,context:{key:string|number;index:number;props:HTMLAttributes<HTMLTableRowElement>})=>ReactNode; sort?:{key:string;direction:'asc'|'desc'}; onSortChange?:(sort:{key:string;direction:'asc'|'desc'})=>void; filters?:Record<string,string>; onFiltersChange?:(filters:Record<string,string>)=>void; layout?:'default'|'ranking'|'history'; headerStart?:ReactNode; headerEnd?:ReactNode; toolbar?:ReactNode; toolbarClassName?:string; emptyState?:ReactNode; withCard?:boolean; cardProps?:Record<string,unknown>; expandable?:boolean; expanded?:boolean; onExpandedChange?:(open:boolean)=>void; rowsExpanded?:boolean; motion?:'idle'|'opening'; motionOptions?:{scrollDelayMs?:number;scrollExpandedDelayMs?:number}; rowHover?:boolean; highlightedRowId?:string|number|null; scrollToRowId?:string|number|null; onRowAnimationStart?:(row:Row,event:AnimationEvent)=>void; onRowAnimationComplete?:(row:Row,event:AnimationEvent)=>void; minVisibleRows?:number; width?:number|string; height?:number|string; maxHeight?:number|string; expandedWidth?:number|string; expandedHeight?:number|string; id?:string; className?:string; tableClassName?:string; ariaLabel?:string; floating?:boolean; tilt?:number; style?:CSSProperties }
```

## Composizione, comportamento e accessibilità

columns configura header/icona/accessor/renderCell/renderHeader/larghezza/allineamento, sortable, filterable o entrambi e renderFilter custom. rows e getRowId definiscono dati/identità; getRowProps/getRowOptions/renderRow estendono le righe. sort e filters controllati tramite callback: il consumatore ordina/filtra una sola volta. headerStart/headerEnd/toolbar/emptyState sono slot. withCard compone Card; espansione via Button/Icon/Tooltip e onExpandedChange. width/height/maxHeight/expandedWidth/expandedHeight configurano dimensioni; minVisibleRows riserva spazio per record senza crearne di fittizi. Evidenziazione e scroll per ID, animazioni delle righe medaglia, hover e inclinazione nella libreria; callbacks permettono coordinamento esterno. Ricerca tramite SearchPopover e ritorno del focus. Colonne ranking/history sono solo preset di presentazione per preservare il CSS attuale.

## File e responsabilità

- `Table.jsx`: implementazione.
- `index.ts`: esportazioni pubbliche.
- `config.ts`: configurazioni e costanti.
- `types.ts`: contratto delle prop.
- `style.css`: regole del componente; le utility sono generate dal preset condiviso.
- `SPECIFICHE.md`: questa scheda.

Il componente e le dipendenze necessarie appartengono a LaSpeziaUi. L’app importa soltanto l’API pubblica e fornisce dati, contenuti e callback specifici. Gli stili comuni sono esposti da `laspeziaui/styles.css`.

## Esempio

```jsx
import { Table } from 'laspeziaui'

<Table columns={columns} rows={rows} sort={sort} onSortChange={setSort} />
```

## Compatibilità e verifiche

La configurazione usata in GameCharts riproduce il comportamento precedente al refactor; nessuna variazione grafica implicita è autorizzata. Le sole opzioni future dichiarate non creano automaticamente nuove rese. Consultare il rapporto di verifica in `documentazione/LaSpeziaUi/VERIFICHE.md` per build, test e confronto browser eseguiti sul refactor.

La copia in `documentazione/LaSpeziaUi/Table/SPECIFICHE.md` viene aggiornata da `npm run docs` nella libreria. Questa scheda, vicina al codice, è la sorgente da mantenere aggiornata.
