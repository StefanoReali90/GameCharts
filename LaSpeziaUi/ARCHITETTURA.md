# Struttura e regole di LaSpeziaUi

## Obiettivo vincolante del refactor

La migrazione cambia l'organizzazione del codice, non l'applicazione percepita dall'utente. Grafica, layout, logica, interazioni, animazioni, tempi, suoni, volumi, responsive, accessibilità e ottimizzazioni devono rimanere identici alla versione esistente prima del refactor.

Le prop nuove servono a configurare componenti riutilizzabili; l'app deve usarle con la configurazione che riproduce esattamente il comportamento attuale. Opzioni future non autorizzano nuove rese o cambiamenti dei valori predefiniti. Le precedenti proposte incompatibili con questa equivalenza non vanno applicate automaticamente durante la migrazione.

Il censimento storico è conservato in [temporaneo refactor libreria.md](../documentazione/history/temporaneo%20refactor%20libreria.md). Il catalogo dell'implementazione attuale e i risultati dei controlli sono in [documentazione/LaSpeziaUi](../documentazione/LaSpeziaUi/README.md).

## Riferimento verificato

Percorso: `C:\Users\Admin\Desktop\SMARTSTUDIO_FE\shared`.

Nel riferimento, `src/index.ts` centralizza le esportazioni; `src/components/index.ts` raccoglie i componenti. Le cartelle dei componenti, per esempio `src/components/Button`, contengono `Button.tsx`, `index.ts`, `config.ts` e `types.ts`. Componenti complessi, come `DataTable` e `Dialog`, separano anche sottocomponenti e hook locali.

Le responsabilità trasversali sono raccolte in cartelle come `hooks`, `config`, `contexts`, `providers`, `styles`, `types`, `utils` e `assets`. Si riprende soltanto questa organizzazione: nessuna copia di implementazioni, grafica, dipendenze, funzionalità o configurazioni di dominio. Cartelle come `services` o `form-builder` del riferimento non vanno replicate senza una necessità già concordata per LaSpeziaUi.

## Struttura di ogni componente

Ogni componente deve avere una propria cartella e un proprio documento di specifiche:

```text
src/components/NomeComponente/
  index.ts
  NomeComponente.jsx
  config.ts
  types.ts
  style.css
  SPECIFICHE.md
```

- `index.ts`: API pubblica del componente, con le esportazioni necessarie.
- `NomeComponente.jsx`: implementazione React del componente; l'estensione potrà essere `.tsx` soltanto se viene decisa la relativa configurazione TypeScript. La struttura del riferimento non autorizza da sola una migrazione del frontend a TypeScript.
- `config.ts`: configurazioni, costanti e valori predefiniti, separati dall'implementazione.
- `types.ts`: contratti di prop, slot, callback e opzioni; coordinare i file TypeScript con il sistema di build prima di renderli eseguibili o esportati dal pacchetto.
- `style.css`: stili e animazioni appartenenti al componente, preservando la resa esistente.
- `SPECIFICHE.md`: documento specifico obbligatorio del componente.

`index.ts`, `config.ts`, `types.ts` e implementazione separata seguono l'organizzazione osservata in `shared`. `style.css` e `SPECIFICHE.md` sono requisiti aggiuntivi espliciti per LaSpeziaUi; non si presume che siano presenti in ogni componente del riferimento.

Sottocartelle `components/`, `hooks/` e `utils/` si aggiungono soltanto quando il componente richiede realmente una suddivisione interna. La documentazione dei sottocomponenti creati segue la stessa regola delle specifiche. Non creare file o sottocomponenti fittizi per riempire la struttura.

## Contenuto obbligatorio delle specifiche

Ogni `SPECIFICHE.md` deve descrivere:

1. Responsabilità del componente e confine con l'app.
2. Prop, tipi, opzioni e valori predefiniti.
3. Slot e callback, con il relativo comportamento.
4. Stile, responsive, animazioni, accessibilità e ottimizzazioni esistenti.
5. Configurazione che riproduce gli utilizzi attuali di GameCharts.
6. Dipendenze e risorse gestite internamente.
7. Opzioni future dichiarate, distinguendole da quelle già realizzate e specificandone il fallback.
8. Esempi minimi d'uso e verifiche pertinenti di equivalenza.

Il file deve restare aggiornato insieme al componente. Va creato quando il componente viene introdotto, senza generare ora documentazione che faccia apparire già esistente un'implementazione futura.

## Organizzazione condivisa

La struttura complessiva seguirà le responsabilità del riferimento: componenti in `src/components`, hook generici in `src/hooks`, risorse in `src/assets`, traduzioni in `src/i18n`, stili comuni in `src/styles`, configurazioni e utilità nelle rispettive cartelle. Context, provider e tipi condivisi vanno separati quando necessari; ciò che riguarda un solo componente rimane nella sua cartella.

Le esportazioni pubbliche passano dagli index della libreria. L'app non deve importare file interni o dipendenze UI esterne incapsulate. Audio, immagini, cache e ottimizzazioni accompagnano i componenti della libreria secondo il censimento.

La struttura è applicata ai componenti implementati in `src/components`. L'API sorgente è esposta da `src/index.ts`; `src/build.ts` include anche gli stili per la build separata. Il frontend dipende dal pacchetto locale `file:../LaSpeziaUi`, con alias Vite ai sorgenti durante lo sviluppo e una sola istanza di React. Le dipendenze UI sono dichiarate dalla libreria. La build locale riusa gli strumenti Vite già installati nel frontend ed emette carte e musica come risorse separate. Nessuna pubblicazione su un registro è necessaria.

Ogni scheda `SPECIFICHE.md` vicina al codice è sincronizzata, tramite `npm run docs`, nella cartella omonima di `documentazione/LaSpeziaUi`, che contiene soltanto il relativo Markdown. `documentazione/frontend` e `documentazione/backend` documentano i rispettivi alberi di codice; `documentazione/history` conserva l'analisi precedente al refactor.

## Verifica del refactor

Verificare la build e confrontare i flussi coinvolti con la versione precedente: resa alle dimensioni responsive attuali, navigazione, impostazioni, filtri, ordinamento, intro, podio e riproduzione audio. Le sole compilazioni riuscite non dimostrano equivalenza grafica o logica. Non rimuovere ottimizzazioni o cambiare comportamento per rendere più semplice la separazione dei file.
