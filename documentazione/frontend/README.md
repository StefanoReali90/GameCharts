# Frontend

Codice in `frontend/`. `App` compone il layout e le pagine attraverso i rispettivi index pubblici. `components/layout` è l'unica cartella di composizioni comuni dell'app; i componenti UI generici sono forniti da `LaSpeziaUi`.

```text
frontend/
  public/
  src/
    App.jsx
    main.jsx
    style.css
    components/
      layout/
        index.js
        config.js
        style.css
        hooks/
        AppLayout.jsx
        AppNavbar.jsx
        AppSidebar.jsx
        SettingsDialog.jsx
    pages/
      leaderboard/
        index.js
        LeaderboardPage.jsx
        config.jsx
        style.css
        components/
        hooks/
        utils/
      match-history/
        index.js
        MatchHistoryPage.jsx
        config.jsx
        style.css
        components/
        hooks/
        utils/
    mock/
```

Ogni pagina possiede componenti specifici, hook, utilità, configurazioni e CSS. Classifica compone Title, podio custom basato sulle Card e Table; Ultime partite compone Title e Table. Nessuna pagina importa componenti o configurazioni dall'altra.

Gli hook in `components/layout/hooks` coordinano soltanto navigazione, media e dati dell'intera app. La logica della singola pagina rimane nei suoi hook. Dati demo, simulazione, persistenza e regole dei punteggi condivise dalle demo sono in `src/mock`; non esistono cartelle globali `src/hooks`, `src/utils`, `src/data`, `src/lib` o `components/ui`.

`src/style.css` contiene solo le direttive Tailwind ed è importato prima dei moduli applicativi. Gli stili del layout vivono nel layout, quelli del podio nella pagina Classifica. Le risorse statiche applicative sono in `public`. I campioni audio Kenney non utilizzati sono stati rimossi; lo script delle traduzioni appartiene ora a `LaSpeziaUi/scripts`.

I componenti UI, i18n, hook generici, risorse carte/musica e motore degli effetti arrivano dall’API di `laspeziaui`. L’app usa React per il runtime e ReactDOM per il montaggio. La libreria è locale e privata; nessuna pubblicazione npm è richiesta.

Struttura delle responsabilità ispirata a `SMARTSTUDIO_FE/clienti-mfe`, senza copiarne tecnologie o codice.

- [Classifica](leaderboard/SPECIFICHE.md)
- [Ultime partite](match-history/SPECIFICHE.md)

Verifica: `npm run build` e `npm test` dalla cartella frontend.
