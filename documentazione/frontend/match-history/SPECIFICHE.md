# Pagina Ultime partite

La cartella `frontend/src/pages/match-history` è autonoma:

- `index.js` importa gli stili ed esporta `MatchHistoryPage`.
- `MatchHistoryPage.jsx` compone Title e Table della libreria.
- `config.jsx` definisce colonne, contenuto delle celle, opzioni del periodo e valori iniziali. La composizione delle carte dei punteggi è locale alla pagina.
- `style.css` contiene il layout specifico della pagina.
- `components/MatchHistoryFilters.jsx` compone il Select della libreria con le opzioni di periodo della pagina.
- `hooks/useMatchHistoryPage.jsx` possiede filtri, ordinamento e costruzione dei dati della tabella.
- `utils/` contiene selezione delle partite e calcolo dell'inizio del periodo, con i test esistenti.

Non importa componenti o configurazioni dalla pagina Classifica. I dati condivisi e le regole di dominio appartengono a `src/mock`; il collegamento al giocatore selezionato viene comunicato al layout tramite callback.

La riorganizzazione conserva la resa e i comportamenti esistenti.
