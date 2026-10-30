# Dialog

Contenitore modale generico, utilizzato anche per le impostazioni.

## API e valori predefiniti

`showCloseButton=true`, `backdropOpacity=0.78`, `backdropBlur="7px"`, `closeOnBackdropClick=true`, `closeOnEscape=true`.

```ts
import type { HTMLAttributes, ElementType, ReactNode, ReactElement, Ref, RefObject, SVGProps, ButtonHTMLAttributes, SelectHTMLAttributes, InputHTMLAttributes, AudioHTMLAttributes, CSSProperties, PointerEvent, AnimationEvent } from 'react'
export interface DialogProps { open: boolean; onRequestClose: () => void; title: ReactNode; children?: ReactNode; footer?: ReactNode; showCloseButton?: boolean; closeLabel?: string; backdropOpacity?: number; backdropBlur?: number|string; closeOnBackdropClick?: boolean; closeOnEscape?: boolean }
```

## Composizione, comportamento e accessibilità

`children` è il contenuto e `footer` lo slot opzionale delle azioni. Nessuna logica di salvataggio inclusa. Modalità nativa dialog, focus, titolo accessibile, scroll e limiti responsive conservati. Click sullo sfondo distinto dagli spazi interni. Trasparenza dello sfondo indipendente dalla modalità modale. X tramite Button/Icon.

## File e responsabilità

- `Dialog.jsx`: implementazione.
- `index.ts`: esportazioni pubbliche.
- `config.ts`: configurazioni e costanti.
- `types.ts`: contratto delle prop.
- `style.css`: regole del componente; le utility sono generate dal preset condiviso.
- `SPECIFICHE.md`: questa scheda.

Il componente e le dipendenze necessarie appartengono a LaSpeziaUi. L’app importa soltanto l’API pubblica e fornisce dati, contenuti e callback specifici. Gli stili comuni sono esposti da `laspeziaui/styles.css`.

## Esempio

```jsx
import { Dialog } from 'laspeziaui'

<Dialog open={open} onRequestClose={close} title="Impostazioni" footer={actions}>{content}</Dialog>
```

## Compatibilità e verifiche

La configurazione usata in GameCharts riproduce il comportamento precedente al refactor; nessuna variazione grafica implicita è autorizzata. Le sole opzioni future dichiarate non creano automaticamente nuove rese. Consultare il rapporto di verifica in `documentazione/LaSpeziaUi/VERIFICHE.md` per build, test e confronto browser eseguiti sul refactor.

La copia in `documentazione/LaSpeziaUi/Dialog/SPECIFICHE.md` viene aggiornata da `npm run docs` nella libreria. Questa scheda, vicina al codice, è la sorgente da mantenere aggiornata.
