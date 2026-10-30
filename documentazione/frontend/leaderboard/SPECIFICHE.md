# Pagina Classifica

La cartella `frontend/src/pages/leaderboard` è autonoma:

- `index.js` importa gli stili della pagina ed esporta `LeaderboardPage`.
- `LeaderboardPage.jsx` compone Title, podio custom e Table della libreria, usando i dati preparati dall'hook della pagina.
- `config.jsx` definisce colonne, render delle celle, configurazione del podio, tempi delle sue animazioni e valori iniziali.
- `style.css` contiene layout della pagina, resa del podio e animazioni custom.
- `components/` contiene LeaderboardPodium, PodiumCard e l'azione di cancellazione della ricerca. Sono composizioni private della pagina, non componenti condivisi del frontend.
- `hooks/useLeaderboardPage.jsx` possiede ordinamento, ricerca, evidenziazione, espansione e coordinamento del podio.
- `utils/` contiene calcolo/selezione della classifica e gestione della fotografia delle posizioni, con i relativi test.

La pagina importa componenti, icone, animazioni generiche e i18n dall'API pubblica di LaSpeziaUi. La scelta delle carte per il punteggio usa le regole di dominio del mock. Non importa configurazioni o componenti da Ultime partite.

L'organizzazione dei file non modifica grafica, interazioni, suoni, tempi o regole attuali.
