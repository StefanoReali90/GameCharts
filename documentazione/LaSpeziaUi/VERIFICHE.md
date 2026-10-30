# Verifiche del refactor

## Risultati

- Build frontend e build separata LaSpeziaUi completate.
- 22 test automatici passati: dati/mock, persistenza, classifica, storico, punteggi/carte, copertura delle 21 lingue e ottimizzazioni del motore audio.
- Struttura e specifiche sincronizzate di tutti i 21 componenti controllate.
- 868 dichiarazioni CSS originali, confrontate per selettore e condizione e normalizzando gli spazi, conservate nella separazione degli stili. Conservata anche la registrazione della proprietà animabile del bordo del podio.
- Dieci confronti di schermate rispetto a una copia dell'albero di lavoro precedente al refactor: classifica, tabella espansa, ricerca, storico e impostazioni, ciascuno a 1440 × 900 e 390 × 844. Nessun pixel differente oltre la tolleranza di 2 livelli per canale RGB. Nessuna differenza nelle misure e negli stili calcolati campionati.
- Browser: ordinamento, apertura/chiusura ricerca, digitazione, Esc, cambio pagina, dialog, salvataggio della lingua e ricaricamento in francese, anteprima volume a 31%, annullamento a 0%, ripristino ai valori 67%/4%, hover e apertura fissata della sidebar verificati prima/dopo.
- Intro con movimento attivo: sia fine del video sia errore di caricamento completano la dissolvenza e consentono l'avvio coordinato del podio e dello sfondo. Il passaggio a movimento ridotto rimuove il video di sfondo. I quattro casi prima/dopo hanno prodotto lo stesso stato finale e nessuna eccezione JavaScript.
- Risorse delle carte e traccia musicale copiate verificando il contenuto prima di rimuovere le copie obsolete dal frontend. Media emessi come asset separati anche nella build della libreria.

## Comandi ripetibili

Dal frontend: `npm run build` e `npm test`.

Dalla libreria: `npm run build`, `npm test`, `npm run docs` e `npm run check`.

Comando complessivo usato dalla root:

```sh
node --test frontend/src/mock/*.test.js frontend/src/pages/*/utils/*.test.js LaSpeziaUi/src/i18n/locales.test.js LaSpeziaUi/src/audio/engine.test.js
```

## Ambito e limiti delle verifiche

Il confronto browser è stato eseguito con Chrome headless locale. Le schermate statiche usano movimento ridotto, volumi a zero e font di fallback identici nei due alberi, bloccando i font esterni per evitare differenze di rete. I flussi dei media sono stati verificati separatamente con movimento attivo. I dati iniziali erano gli stessi.

Il motore audio conserva la sintesi e gli inviluppi originali; i test coprono riuso dei buffer e mancata sintesi a volume zero/effetto disabilitato. Non è stato eseguito un ascolto comparativo fisico dell'uscita audio. Le verifiche non equivalgono a una certificazione su tutti i browser/dispositivi o a un type-check TypeScript completo: Vite valida la build, mentre l'app resta in JSX.

Le copie temporanee, gli screenshot di confronto e gli strumenti usati soltanto durante la migrazione sono stati rimossi al termine delle verifiche. Questo rapporto conserva i risultati dei controlli eseguiti; non introduce dipendenze di test o strumenti ulteriori nel prodotto.

## Documentazione

`documentazione/frontend`, `documentazione/backend` e `documentazione/LaSpeziaUi` corrispondono ai tre alberi di codice. L'analisi temporanea è archiviata in `documentazione/history`. Il backend non è stato modificato da questa migrazione.

## Riorganizzazione del frontend per pagina

La successiva pulizia del frontend ha raccolto ogni pagina con index, configurazione, stili, componenti, hook e utilità propri. `components` contiene soltanto il layout, con le sue configurazioni e i suoi hook di coordinamento. I dati demo sono in `src/mock`; le vecchie cartelle globali `hooks`, `utils`, `data`, `lib`, i componenti specifici fuori dalle pagine, i campioni audio inutilizzati e la cartella frontend `scripts` sono stati rimossi. Il generatore delle traduzioni è stato trasferito negli strumenti della libreria.

Verifiche ripetute dopo questa riorganizzazione:

- Build del frontend completata e 22 test automatici passati nei nuovi percorsi.
- Tutte le 243 dichiarazioni CSS applicative originali conservate nella separazione fra layout e pagina Classifica.
- Dieci confronti browser a 1440 × 900 e 390 × 844, per classifica, espansione, ricerca, storico e impostazioni: nessun pixel differente oltre la tolleranza RGB già descritta e nessuna eccezione JavaScript.
- File e profilo browser temporanei creati nella cartella temporanea di sistema, esternamente al progetto, e rimossi al termine dei controlli.
