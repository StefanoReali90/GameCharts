# Slider

Cursore generico con etichetta e valore opzionali.

## API e valori predefiniti

`min=0`, `max=100`, `step=1`, `accent="#67e8f9"`, `tone="cyan"`. Etichetta tramite label; valori non convertiti automaticamente in volume.

```ts
import type { HTMLAttributes, ElementType, ReactNode, ReactElement, Ref, RefObject, SVGProps, ButtonHTMLAttributes, SelectHTMLAttributes, InputHTMLAttributes, AudioHTMLAttributes, CSSProperties, PointerEvent, AnimationEvent } from 'react'
export interface SliderProps extends Omit<InputHTMLAttributes<HTMLInputElement>,'type'> { label?:ReactNode; leading?:ReactNode; tone?:'cyan'|'purple'; accent?:string; formatValue?:(value:number|string|readonly string[])=>ReactNode }
```

## Composizione, comportamento e accessibilità

Usa range nativo, tastiera/touch, riempimento proporzionale, stili WebKit/Firefox e nome accessibile. La composizione delle impostazioni collega la scala 0–100 ai volumi 0–1; nessuna regola audio nel controllo.

## File e responsabilità

- `Slider.jsx`: implementazione.
- `index.ts`: esportazioni pubbliche.
- `config.ts`: configurazioni e costanti.
- `types.ts`: contratto delle prop.
- `style.css`: regole del componente; le utility sono generate dal preset condiviso.
- `SPECIFICHE.md`: questa scheda.

Il componente e le dipendenze necessarie appartengono a LaSpeziaUi. L’app importa soltanto l’API pubblica e fornisce dati, contenuti e callback specifici. Gli stili comuni sono esposti da `laspeziaui/styles.css`.

## Esempio

```jsx
import { Slider } from 'laspeziaui'

<Slider label="Effetti" value={67} onChange={onChange} />
```

## Compatibilità e verifiche

La configurazione usata in GameCharts riproduce il comportamento precedente al refactor; nessuna variazione grafica implicita è autorizzata. Le sole opzioni future dichiarate non creano automaticamente nuove rese. Consultare il rapporto di verifica in `documentazione/LaSpeziaUi/VERIFICHE.md` per build, test e confronto browser eseguiti sul refactor.

La copia in `documentazione/LaSpeziaUi/Slider/SPECIFICHE.md` viene aggiornata da `npm run docs` nella libreria. Questa scheda, vicina al codice, è la sorgente da mantenere aggiornata.
