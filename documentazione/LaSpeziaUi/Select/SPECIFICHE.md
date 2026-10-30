# Select

Menu a tendina con etichetta integrata opzionale.

## API e valori predefiniti

`variant="field"`; `settings` conserva la resa del selettore lingua. label, description e leading opzionali; options tramite children.

```ts
import type { HTMLAttributes, ElementType, ReactNode, ReactElement, Ref, RefObject, SVGProps, ButtonHTMLAttributes, SelectHTMLAttributes, InputHTMLAttributes, AudioHTMLAttributes, CSSProperties, PointerEvent, AnimationEvent } from 'react'
export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> { label?:ReactNode; description?:ReactNode; leading?:ReactNode; variant?:'field'|'settings'; wrapperClassName?:string; labelClassName?:string }
```

## Composizione, comportamento e accessibilità

Associazione label/id gestita internamente; supporta attributi select nativi, valore controllato o predefinito. Icona, help e varianti riprendono filtri e impostazioni attuali. Non esiste un componente Label pubblico separato.

## File e responsabilità

- `Select.jsx`: implementazione.
- `index.ts`: esportazioni pubbliche.
- `config.ts`: configurazioni e costanti.
- `types.ts`: contratto delle prop.
- `style.css`: regole del componente; le utility sono generate dal preset condiviso.
- `SPECIFICHE.md`: questa scheda.

Il componente e le dipendenze necessarie appartengono a LaSpeziaUi. L’app importa soltanto l’API pubblica e fornisce dati, contenuti e callback specifici. Gli stili comuni sono esposti da `laspeziaui/styles.css`.

## Esempio

```jsx
import { Select } from 'laspeziaui'

<Select label="Lingua" value={language} onChange={onChange}><option value="it">Italiano</option></Select>
```

## Compatibilità e verifiche

La configurazione usata in GameCharts riproduce il comportamento precedente al refactor; nessuna variazione grafica implicita è autorizzata. Le sole opzioni future dichiarate non creano automaticamente nuove rese. Consultare il rapporto di verifica in `documentazione/LaSpeziaUi/VERIFICHE.md` per build, test e confronto browser eseguiti sul refactor.

La copia in `documentazione/LaSpeziaUi/Select/SPECIFICHE.md` viene aggiornata da `npm run docs` nella libreria. Questa scheda, vicina al codice, è la sorgente da mantenere aggiornata.
