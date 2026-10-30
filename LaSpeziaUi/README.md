# LaSpeziaUi

Libreria React locale e privata di GameCharts: componenti UI, icone, carte, audio, traduzioni e hook generici. Non viene pubblicata su npm.

Le regole strutturali sono in [ARCHITETTURA.md](./ARCHITETTURA.md). Il catalogo e le specifiche sono in [documentazione/LaSpeziaUi](../documentazione/LaSpeziaUi/README.md).

## Utilizzo locale

Dal frontend:

```sh
npm install
npm run dev
```

Il frontend dipende da `file:../LaSpeziaUi`; `install-links=true` installa il pacchetto locale e le sue dipendenze transitive. Gli alias di Vite puntano ai sorgenti della libreria per aggiornare subito i componenti durante lo sviluppo. React e ReactDOM restano peer dependency, condivise con l'app.

```jsx
import { Button, Card, Table, Title, Icon } from 'laspeziaui'
```

Importare `laspeziaui/styles.css` dopo le utility e gli stili dell'app. Il frontend include il preset Tailwind pubblico e scansiona entrambi gli alberi dei sorgenti: non duplica colori, font o ombre della libreria.

## Struttura

Ogni componente in `src/components/Nome/` comprende implementazione JSX, `index.ts`, `config.ts`, `types.ts`, `style.css` e `SPECIFICHE.md`. Il codice React rimane JavaScript; TypeScript descrive contratti ed esportazioni ed è elaborato dalla build Vite già presente.

Hook, i18n, utilità, risorse e stili comuni hanno cartelle separate. Carte e musica sono risorse della libreria, emesse come file separati e non incorporate nel JavaScript della build.

## Comandi

Da `LaSpeziaUi/`:

```sh
npm run build
npm test
npm run docs
```

La build locale usa gli strumenti Vite già installati in `frontend/node_modules`; installare prima le dipendenze del frontend. Produce `dist/` senza pubblicare nulla. Il frontend consuma l'API sorgente del pacchetto locale; `dist/` è l'output verificabile della build separata, non un nuovo canale di distribuzione.

`npm run docs` sincronizza le schede vicine al codice nelle rispettive cartelle di `documentazione/LaSpeziaUi/`.

Lo script di manutenzione delle traduzioni è in `scripts/generate-locales.py`, accanto alla libreria che possiede i dizionari; non risiede nel frontend.

Il refactor conserva grafica, logica, animazioni, audio e ottimizzazioni degli utilizzi attuali. I dettagli delle verifiche sono nel [rapporto](../documentazione/LaSpeziaUi/VERIFICHE.md).
