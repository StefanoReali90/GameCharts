# Istruzioni architetturali per GameCharts

Leggi questo file prima di progettare o modificare il frontend. Per la struttura generale usa come riferimento `C:\Users\Admin\Desktop\SMARTSTUDIO_FE\clienti-mfe`. Quando la cartella è disponibile, controlla il suo codice attuale prima di prendere decisioni architetturali. Se non è disponibile, segui le regole qui sotto. Il riferimento serve per organizzare le responsabilità; non copiare automaticamente librerie, configurazioni o funzionalità che GameCharts non richiede.

## Struttura osservata in `clienti-mfe`

- `src/index.ts` avvia il bootstrap; `src/bootstrap.tsx` configura i provider globali e monta l'app.
- `src/App.tsx` compone provider, protezione e rotte. Contiene anche i redirect delle vecchie URL, ma non gestisce dati di dominio, form o interazioni delle singole pagine.
- `src/pages/` contiene le schermate e le loro sottosezioni. Le pagine possono possedere lo stato della schermata e comporre componenti più piccoli.
- `src/components/` contiene componenti riutilizzabili o specifici di una funzione; le funzioni articolate hanno cartelle proprie con componenti, configurazione, tipi e un `index.ts` pubblico.
- `src/hooks/` contiene logica React condivisibile e accesso ai dati; `src/services/` contiene chiamate e adattatori esterni; `src/context/` contiene stato condiviso quando serve; `src/config/`, `src/types/`, `src/utils/` e `src/styles/` separano configurazione, tipi, funzioni pure e stile.
- La libreria condivisa `@smartstudio/shared` è usata per elementi realmente comuni tra applicazioni. Non è un motivo per spostare indiscriminatamente componenti specifici di una pagina in una libreria.

## Applicazione a GameCharts

- `frontend/src/main.jsx` è il punto di ingresso: monta React e importa gli stili globali.
- `frontend/src/App.jsx` dovrebbe restare il punto di composizione dell'app: provider, layout generale e scelta delle pagine. Non aggiungere qui nuova logica di simulazione, persistenza, audio, video, animazioni o interazioni di pagina. Il file attuale è lungo perché queste responsabilità sono ancora unite; separale solo quando l'utente chiede il refactor, preservando il comportamento.
- `frontend/src/pages/` possiede la composizione e lo stato delle schermate `leaderboard` e `match-history`.
- `frontend/src/components/layout/` contiene solo il layout condiviso dell'app, in particolare navbar e sidebar. Un wrapper come `PageFrame` ha senso solo se centralizza comportamento o struttura davvero condivisi; un titolo e poche classi di spaziatura non lo rendono necessario.
- Ogni pagina in `frontend/src/pages/<nome>/` possiede `index.js`, implementazione, `config.jsx`, `style.css` e le proprie cartelle `components/`, `hooks/`, `utils/`. Componenti specifici, hook e utilità di una pagina non vanno messi in cartelle globali né importati dalle configurazioni di altre pagine.
- `frontend/src/components/` contiene soltanto `layout/`: composizioni Navbar/Sidebar/Dialog, configurazione e stili del layout e hook che coordinano l'intera app. Il layout non è un deposito per componenti o logica delle singole pagine.
- `frontend/src/mock/` conserva dati demo, simulazione, persistenza e regole di dominio del mock. Non creare cartelle globali frontend `hooks`, `utils`, `data`, `lib` o `components/ui`; il riuso UI generico appartiene a `LaSpeziaUi`. Gli asset statici applicativi sono in `frontend/public/`; nessuna cartella frontend `assets` o `scripts`. Gli strumenti relativi a traduzioni o risorse della libreria appartengono alla libreria.
- `frontend/src/style.css` contiene soltanto le direttive Tailwind; si importa prima degli stili del layout e delle pagine per preservare la cascata. Gli stili specifici vivono accanto al proprietario. Conservare le normali configurazioni di build del frontend.
- `LaSpeziaUi/` è la libreria locale privata dei componenti censiti, collegata tramite `file:../LaSpeziaUi`. Il frontend importa componenti, icone, i18n e hook generici dalla sua API pubblica. Segui `LaSpeziaUi/ARCHITETTURA.md` e le specifiche dei componenti; non pubblicarla su npm né sostituire il collegamento locale con una dipendenza del registro senza richiesta esplicita. Dati e composizioni specifiche del podio restano nell'app.

## Regole per i prossimi interventi

1. Mantieni `App` semplice e sposta la logica nella pagina, nel componente, nell'hook o nel modulo dati che la possiede. Evita di spostare tutto in un unico file `AppShell` altrettanto grande.
2. Metti stato e comportamento il più vicino possibile al punto d'uso. Usa un context solo se più rami dell'albero devono condividere quello stato.
3. Se una funzione cresce, raggruppa i suoi componenti e helper nella stessa cartella e usa un `index` per l'API pubblica. Non creare cartelle o wrapper per singole righe senza beneficio concreto.
4. Preserva le animazioni e la fluidità già concordate quando riorganizzi il codice. Verifica almeno che la build del frontend passi; per modifiche di comportamento, verifica anche il flusso interessato.
5. Prendi da `clienti-mfe` la separazione delle responsabilità, non le sue scelte tecnologiche per forza: GameCharts oggi usa JSX, Vite e navigazione locale. TypeScript, React Router, Module Federation, MUI e React Query richiedono un motivo concreto e una richiesta o decisione dedicata.
6. Non avviare ora refactor o migrazioni sulla base di questo documento. Attendi l'indicazione dell'utente sul prossimo intervento.
