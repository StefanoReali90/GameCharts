# Title

Titolo condiviso con livelli semantici, neon, contorno e divisore.

## API e valori predefiniti

`as="h2"`, `size="large"`, `neon=true`, `textOutline=false`, `showDivider=false`. Le tre taglie riprendono le rese responsive attuali; `sm`, `md`, `lg` sono alias compatibili.

```ts
import type { HTMLAttributes, ElementType, ReactNode, ReactElement, Ref, RefObject, SVGProps, ButtonHTMLAttributes, SelectHTMLAttributes, InputHTMLAttributes, AudioHTMLAttributes, CSSProperties, PointerEvent, AnimationEvent } from 'react'
export interface TitleProps extends Omit<HTMLAttributes<HTMLElement>, 'title'> { as?: ElementType; title?: ReactNode; children?: ReactNode; size?: 'small'|'medium'|'large'|'sm'|'md'|'lg'; neon?: boolean; textOutline?: boolean|string; showDivider?: boolean; leading?: ReactNode; headingClassName?: string }
```

## Composizione, comportamento e accessibilità

Include livelli di ombra/alone, effetto arcobaleno, inclinazione e divisore. `leading` contiene logo o icona. Il testo arriva dal consumatore; nessun AuroraText pubblico.

## File e responsabilità

- `Title.jsx`: implementazione.
- `index.ts`: esportazioni pubbliche.
- `config.ts`: configurazioni e costanti.
- `types.ts`: contratto delle prop.
- `style.css`: regole del componente; le utility sono generate dal preset condiviso.
- `SPECIFICHE.md`: questa scheda.

Il componente e le dipendenze necessarie appartengono a LaSpeziaUi. L’app importa soltanto l’API pubblica e fornisce dati, contenuti e callback specifici. Gli stili comuni sono esposti da `laspeziaui/styles.css`.

## Esempio

```jsx
import { Title } from 'laspeziaui'

<Title title="Classifica" size="large" showDivider />
```

## Compatibilità e verifiche

La configurazione usata in GameCharts riproduce il comportamento precedente al refactor; nessuna variazione grafica implicita è autorizzata. Le sole opzioni future dichiarate non creano automaticamente nuove rese. Consultare il rapporto di verifica in `documentazione/LaSpeziaUi/VERIFICHE.md` per build, test e confronto browser eseguiti sul refactor.

La copia in `documentazione/LaSpeziaUi/Title/SPECIFICHE.md` viene aggiornata da `npm run docs` nella libreria. Questa scheda, vicina al codice, è la sorgente da mantenere aggiornata.
