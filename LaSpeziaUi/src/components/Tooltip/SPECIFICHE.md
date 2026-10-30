# Tooltip

Suggerimento associato a un elemento tramite children.

## API e valori predefiniti

`content` è la sola prop di configurazione; `children` è il trigger. Nessuna prop disableTooltip.

```ts
import type { HTMLAttributes, ElementType, ReactNode, ReactElement, Ref, RefObject, SVGProps, ButtonHTMLAttributes, SelectHTMLAttributes, InputHTMLAttributes, AudioHTMLAttributes, CSSProperties, PointerEvent, AnimationEvent } from 'react'
export interface TooltipProps { content: ReactNode; children: ReactElement }
```

## Composizione, comportamento e accessibilità

Apertura con puntatore e focus, chiusura con uscita/Esc, posizionamento entro schermo, aggiornamento scroll/resize e pulizia listener. Trigger disabilitato rilevato internamente. Portal nel dialog se necessario per rispettare il top layer.

## File e responsabilità

- `Tooltip.jsx`: implementazione.
- `index.ts`: esportazioni pubbliche.
- `config.ts`: configurazioni e costanti.
- `types.ts`: contratto delle prop.
- `style.css`: regole del componente; le utility sono generate dal preset condiviso.
- `SPECIFICHE.md`: questa scheda.

Il componente e le dipendenze necessarie appartengono a LaSpeziaUi. L’app importa soltanto l’API pubblica e fornisce dati, contenuti e callback specifici. Gli stili comuni sono esposti da `laspeziaui/styles.css`.

## Esempio

```jsx
import { Tooltip } from 'laspeziaui'

<Tooltip content="Salva"><Button>Salva</Button></Tooltip>
```

## Compatibilità e verifiche

La configurazione usata in GameCharts riproduce il comportamento precedente al refactor; nessuna variazione grafica implicita è autorizzata. Le sole opzioni future dichiarate non creano automaticamente nuove rese. Consultare il rapporto di verifica in `documentazione/LaSpeziaUi/VERIFICHE.md` per build, test e confronto browser eseguiti sul refactor.

La copia in `documentazione/LaSpeziaUi/Tooltip/SPECIFICHE.md` viene aggiornata da `npm run docs` nella libreria. Questa scheda, vicina al codice, è la sorgente da mantenere aggiornata.
