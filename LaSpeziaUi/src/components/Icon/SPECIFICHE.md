# Icon

Unico accesso alle icone UI esterne attraverso la libreria.

## API e valori predefiniti

`name` richiesto; size, color, strokeWidth e attributi SVG sono passati all’icona.

```ts
import type { HTMLAttributes, ElementType, ReactNode, ReactElement, Ref, RefObject, SVGProps, ButtonHTMLAttributes, SelectHTMLAttributes, InputHTMLAttributes, AudioHTMLAttributes, CSSProperties, PointerEvent, AnimationEvent } from 'react'
import type { icons } from './config'
export interface IconProps extends SVGProps<SVGSVGElement> { name: keyof typeof icons; size?: number; strokeWidth?: number }
```

## Composizione, comportamento e accessibilità

Catalogo esplicito delle sole icone attualmente usate. Dipendenza interna lucide-react; nessun caricamento dell’intero catalogo e nessun import diretto nell’app. Icone decorative aria-hidden; controlli con un proprio nome accessibile.

## File e responsabilità

- `Icon.jsx`: implementazione.
- `index.ts`: esportazioni pubbliche.
- `config.ts`: configurazioni e costanti.
- `types.ts`: contratto delle prop.
- `style.css`: regole del componente; le utility sono generate dal preset condiviso.
- `SPECIFICHE.md`: questa scheda.

Il componente e le dipendenze necessarie appartengono a LaSpeziaUi. L’app importa soltanto l’API pubblica e fornisce dati, contenuti e callback specifici. Gli stili comuni sono esposti da `laspeziaui/styles.css`.

## Esempio

```jsx
import { Icon } from 'laspeziaui'

<Icon name="Search" size={15} aria-hidden="true" />
```

## Compatibilità e verifiche

La configurazione usata in GameCharts riproduce il comportamento precedente al refactor; nessuna variazione grafica implicita è autorizzata. Le sole opzioni future dichiarate non creano automaticamente nuove rese. Consultare il rapporto di verifica in `documentazione/LaSpeziaUi/VERIFICHE.md` per build, test e confronto browser eseguiti sul refactor.

La copia in `documentazione/LaSpeziaUi/Icon/SPECIFICHE.md` viene aggiornata da `npm run docs` nella libreria. Questa scheda, vicina al codice, è la sorgente da mantenere aggiornata.
