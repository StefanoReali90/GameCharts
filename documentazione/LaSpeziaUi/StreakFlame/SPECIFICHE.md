# StreakFlame

Fiammella con contatore per una serie di vittorie.

## API e valori predefiniti

`animation="flicker"`; `intensity` omessa deriva da count: 0 off, 1 medium, da 2 strong. Se fornita prevale sul livello dedotto.

```ts
import type { HTMLAttributes, ElementType, ReactNode, ReactElement, Ref, RefObject, SVGProps, ButtonHTMLAttributes, SelectHTMLAttributes, InputHTMLAttributes, AudioHTMLAttributes, CSSProperties, PointerEvent, AnimationEvent } from 'react'
export interface StreakFlameProps { count:number; intensity?:'off'|'medium'|'strong'; animation?:'flicker'|'glow' }
```

## Composizione, comportamento e accessibilità

off, medium, strong con colori e tempi esistenti. flicker mantiene il movimento; glow è la sola pulsazione luminosa opzionale. Contatore sovrapposto e dimensioni responsive incluse. Osservatore condiviso sospende le animazioni fuori vista; movimento ridotto e contenitori inattivi rispettati.

## File e responsabilità

- `StreakFlame.jsx`: implementazione.
- `index.ts`: esportazioni pubbliche.
- `config.ts`: configurazioni e costanti.
- `types.ts`: contratto delle prop.
- `style.css`: regole del componente; le utility sono generate dal preset condiviso.
- `SPECIFICHE.md`: questa scheda.

Il componente e le dipendenze necessarie appartengono a LaSpeziaUi. L’app importa soltanto l’API pubblica e fornisce dati, contenuti e callback specifici. Gli stili comuni sono esposti da `laspeziaui/styles.css`.

## Esempio

```jsx
import { StreakFlame } from 'laspeziaui'

<StreakFlame count={2} intensity="strong" />
```

## Compatibilità e verifiche

La configurazione usata in GameCharts riproduce il comportamento precedente al refactor; nessuna variazione grafica implicita è autorizzata. Le sole opzioni future dichiarate non creano automaticamente nuove rese. Consultare il rapporto di verifica in `documentazione/LaSpeziaUi/VERIFICHE.md` per build, test e confronto browser eseguiti sul refactor.

La copia in `documentazione/LaSpeziaUi/StreakFlame/SPECIFICHE.md` viene aggiornata da `npm run docs` nella libreria. Questa scheda, vicina al codice, è la sorgente da mantenere aggiornata.
