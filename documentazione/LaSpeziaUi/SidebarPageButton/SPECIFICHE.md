# SidebarPageButton

Pulsante di navigazione con le rese aperta e chiusa attuali.

## API e valori predefiniti

`active=false`, `showIndicator=false`, `tone="cyan"`; mode segue Sidebar o può essere expanded/collapsed esplicito.

```ts
import type { HTMLAttributes, ElementType, ReactNode, ReactElement, Ref, RefObject, SVGProps, ButtonHTMLAttributes, SelectHTMLAttributes, InputHTMLAttributes, AudioHTMLAttributes, CSSProperties, PointerEvent, AnimationEvent } from 'react'
export interface SidebarPageButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>,'children'> { label:string; icon:ReactNode; showIndicator?:boolean; active?:boolean; mode?:'expanded'|'collapsed'; tone?:'cyan'|'purple' }
```

## Composizione, comportamento e accessibilità

Etichetta, icona sinistra e puntino destro opzionale. Stato attivo distinto dall’indicatore; nome accessibile e aria-current mantenuti. Nessun nome di pagina o routing incorporato; usa Button senza inclinazione.

## File e responsabilità

- `SidebarPageButton.jsx`: implementazione.
- `index.ts`: esportazioni pubbliche.
- `config.ts`: configurazioni e costanti.
- `types.ts`: contratto delle prop.
- `style.css`: regole del componente; le utility sono generate dal preset condiviso.
- `SPECIFICHE.md`: questa scheda.

Il componente e le dipendenze necessarie appartengono a LaSpeziaUi. L’app importa soltanto l’API pubblica e fornisce dati, contenuti e callback specifici. Gli stili comuni sono esposti da `laspeziaui/styles.css`.

## Esempio

```jsx
import { SidebarPageButton } from 'laspeziaui'

<SidebarPageButton label="Classifica" icon={<Icon name="Trophy" />} active showIndicator onClick={navigate} />
```

## Compatibilità e verifiche

La configurazione usata in GameCharts riproduce il comportamento precedente al refactor; nessuna variazione grafica implicita è autorizzata. Le sole opzioni future dichiarate non creano automaticamente nuove rese. Consultare il rapporto di verifica in `documentazione/LaSpeziaUi/VERIFICHE.md` per build, test e confronto browser eseguiti sul refactor.

La copia in `documentazione/LaSpeziaUi/SidebarPageButton/SPECIFICHE.md` viene aggiornata da `npm run docs` nella libreria. Questa scheda, vicina al codice, è la sorgente da mantenere aggiornata.
