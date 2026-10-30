# Button

Pulsante di azione comune; non possiede la logica delle azioni.

## API e valori predefiniti

`type="button"`, `variant="subtle"`, `motionEnabled=true`. Varianti native già presenti: `save`, `restore`, `close`, `link`, `plain`; varianti animate esistenti: `primary`, `subtle`, `ghost`.

```ts
import type { HTMLAttributes, ElementType, ReactNode, ReactElement, Ref, RefObject, SVGProps, ButtonHTMLAttributes, SelectHTMLAttributes, InputHTMLAttributes, AudioHTMLAttributes, CSSProperties, PointerEvent, AnimationEvent } from 'react'
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> { variant?: 'primary'|'subtle'|'ghost'|'save'|'restore'|'close'|'link'|'plain'; motionEnabled?: boolean; icon?: ReactNode; iconOnly?: boolean; size?: 'icon'; ref?: Ref<HTMLButtonElement> }
```

## Composizione, comportamento e accessibilità

`children` e `icon` compongono il contenuto; `iconOnly` e `size="icon"` servono ai controlli a icona. Varianti dei dialog conservano le rese native senza aggiungere movimento; quelle animate conservano il tap e l’inclinazione precedenti. Eventi, disabled, ref e attributi ARIA passano al controllo. Nessuna variante Elimina inventata.

## File e responsabilità

- `Button.jsx`: implementazione.
- `index.ts`: esportazioni pubbliche.
- `config.ts`: configurazioni e costanti.
- `types.ts`: contratto delle prop.
- `style.css`: regole del componente; le utility sono generate dal preset condiviso.
- `SPECIFICHE.md`: questa scheda.

Il componente e le dipendenze necessarie appartengono a LaSpeziaUi. L’app importa soltanto l’API pubblica e fornisce dati, contenuti e callback specifici. Gli stili comuni sono esposti da `laspeziaui/styles.css`.

## Esempio

```jsx
import { Button } from 'laspeziaui'

<Button variant="save" onClick={onSave}>Salva</Button>
```

## Compatibilità e verifiche

La configurazione usata in GameCharts riproduce il comportamento precedente al refactor; nessuna variazione grafica implicita è autorizzata. Le sole opzioni future dichiarate non creano automaticamente nuove rese. Consultare il rapporto di verifica in `documentazione/LaSpeziaUi/VERIFICHE.md` per build, test e confronto browser eseguiti sul refactor.

La copia in `documentazione/LaSpeziaUi/Button/SPECIFICHE.md` viene aggiornata da `npm run docs` nella libreria. Questa scheda, vicina al codice, è la sorgente da mantenere aggiornata.
