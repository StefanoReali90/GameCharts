# Navbar

Struttura superiore generica con contenuti custom.

## API e valori predefiniti

`cornerStyle="rounded"`; square per angoli a 90°. Slot start, children, end.

```ts
import type { HTMLAttributes, ElementType, ReactNode, ReactElement, Ref, RefObject, SVGProps, ButtonHTMLAttributes, SelectHTMLAttributes, InputHTMLAttributes, AudioHTMLAttributes, CSSProperties, PointerEvent, AnimationEvent } from 'react'
export interface NavbarProps extends HTMLAttributes<HTMLElement> { start?:ReactNode; end?:ReactNode; cornerStyle?:'rounded'|'square' }
```

## Composizione, comportamento e accessibilità

Il consumatore inserisce hamburger e logo tramite slot e collega le callback. Bordo e resa responsive attuali inclusi; nessuna navigazione di GameCharts incorporata.

## File e responsabilità

- `Navbar.jsx`: implementazione.
- `index.ts`: esportazioni pubbliche.
- `config.ts`: configurazioni e costanti.
- `types.ts`: contratto delle prop.
- `style.css`: regole del componente; le utility sono generate dal preset condiviso.
- `SPECIFICHE.md`: questa scheda.

Il componente e le dipendenze necessarie appartengono a LaSpeziaUi. L’app importa soltanto l’API pubblica e fornisce dati, contenuti e callback specifici. Gli stili comuni sono esposti da `laspeziaui/styles.css`.

## Esempio

```jsx
import { Navbar } from 'laspeziaui'

<Navbar start={menuButton}>{brand}</Navbar>
```

## Compatibilità e verifiche

La configurazione usata in GameCharts riproduce il comportamento precedente al refactor; nessuna variazione grafica implicita è autorizzata. Le sole opzioni future dichiarate non creano automaticamente nuove rese. Consultare il rapporto di verifica in `documentazione/LaSpeziaUi/VERIFICHE.md` per build, test e confronto browser eseguiti sul refactor.

La copia in `documentazione/LaSpeziaUi/Navbar/SPECIFICHE.md` viene aggiornata da `npm run docs` nella libreria. Questa scheda, vicina al codice, è la sorgente da mantenere aggiornata.
