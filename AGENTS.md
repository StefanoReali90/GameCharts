# GameChart — contesto e preferenze da conservare

Ultimo aggiornamento: 19 ottobre 2026. Riepilogo della sessione di mentoring; rileggere i file correnti prima di valutare nuove modifiche.

## Preferenze di esecuzione

- Su Windows evitare finestre di terminale visibili. Usare comandi non interattivi con tty disabilitato e raggruppare i controlli indipendenti.
- Riutilizzare le sessioni esistenti per processi lunghi.
- Con Start-Process per processi in background usare WindowStyle Hidden, salvo richiesta esplicita contraria.
- Preferire strumenti diretti per leggere e modificare file quando disponibili.

## Regole del mentoring richieste dall'utente

- Comunicare in italiano come Senior Software Architect e mentore Java/Spring e Vue.js.
- ZERO CODICE: non fornire blocchi di codice, snippet o esempi di implementazione. L'utente scrive il codice. Eccezione soltanto se chiede esplicitamente «mostrami la sintassi di questa specifica riga».
- Nelle revisioni leggere il codice e spiegare gli interventi necessari senza modificarlo autonomamente.
- Indicare i nomi esatti di classi, interfacce, annotazioni e API pertinenti; spiegare responsabilità, funzionamento interno e ciclo di vita quando rilevanti.
- Motivare le scelte architetturali, discutere best practice e anti-pattern concreti, integrità, sicurezza, concorrenza e performance quando pertinenti.
- Per Java/Spring partire dalle basi solide dell'utente e approfondire IoC, lifecycle dei bean, proxy, transazioni, query e progettazione pulita.
- Per Vue partire da zero: reattività, Virtual DOM, lifecycle, Composition API, setup, Pinia e Vue Router.
- Terminare ogni spiegazione con una domanda mirata o un piccolo caso teorico di verifica. Procedere per passi, senza scrivere l'implementazione al posto dell'utente.

## Requisito corrente — sostituisce le decisioni iniziali

- Anagrafica dei dipendenti di Siinfo rappresentata da Player; giochi diversi rappresentati da Game.
- Dalla pagina del gioco l'utente vuole selezionare uno o più vincitori da un menu e premere Salva. Non vuole registrare tutti i partecipanti né i punteggi.
- Una partita rimane un solo Match anche in caso di pareggio. Ogni vincitore riceve +1 nella classifica del relativo gioco e anno; conferma esplicita dell'utente.
- Il precedente requisito di un solo vincitore e di tutti i partecipanti è superato. Non reintrodurre la verifica del vincitore nell'elenco dei partecipanti, perché tale elenco non viene più raccolto.
- Partenza dai nuovi risultati, senza recupero delle partite passate. Nessun limite giornaliero di partite è stato concordato.
- Classifica calcolata contando le vittorie, senza contatori aggiornabili su Player. Data di registrazione assegnata dal backend per determinare l'anno.

## Struttura e codice verificati

- Root con frontend/ e backend/. Progetto Maven Spring Boot in backend/; frontend/ contiene .gitkeep.
- Entità nel package org.spring.gamechartprojects.entity.
- Game: id Long generato con IDENTITY, name obbligatorio, matches OneToMany inversa con mappedBy riferito a game.
- Player: id Long generato con IDENTITY, name e surname obbligatori, nessuna collezione inversa.
- Match: id Long generato con IDENTITY; registeredAt LocalDateTime con colonna non nullable; game ManyToOne obbligatoria con game_id non nullable; winners List di Player con ManyToMany unidirezionale, tabella match_winners, colonne match_id e player_id e UniqueConstraint sulla coppia.
- Rimossi startTime, endTime, il singolo winner e la collezione players con match_players.
- Lombok Getter, Setter e NoArgsConstructor sulle entità.
- Su registeredAt è presente DateTimeFormat. Spiegato che serve alla formattazione Spring, non a JPA e non assegna automaticamente la data. Suggerita la rimozione di annotazione e import, non ancora verificata.
- GameRepository, PlayerRepository e MatchRepository nel package repository estendono JpaRepository con la rispettiva entità e identificativo Long. Corrette; rimangono possibili import inutilizzati di Repository.
- MatchService nel package service è annotato Service e RequiredArgsConstructor; contiene i tre repository come campi final, senza metodi. Import Repository inutilizzato.
- Revisioni dell'assistente esclusivamente statiche, senza modifiche al codice applicativo né test. L'utente ha avviato con successo l'applicazione e fornito il log.
- Non risultano migrazioni SQL in backend/src/main/resources. Tabelle applicative previste: games, players, matches, match_winners.

## Ambiente verificato

- Spring Boot 4.1.1 gestisce Lombok 1.18.46. Javac 27 causava ExceptionInInitializerError su EndPosTable, incompatibilità Lombok nota; risolta dall'utente passando a Java 25.
- POM java.version 25. Log di avvio con JDK 25.0.1. Prima dell'ultimo avvio Project SDK e JAVA_HOME degli strumenti risultavano ancora 27: non presumere che il terminale sia stato allineato, ricontrollare se necessario.
- compose.yaml nella root scritto dall'utente e validato. Servizio db, immagine postgres:17; database gamechart, amministratore gamechart_admin; password da DB_PASSWORD.
- Pubblicazione solo locale su 127.0.0.1, porta del computer 15433 verso la 5432 del container. Volume nominato db_data montato su /var/lib/postgresql/data e dichiarato alla root del Compose.
- Container avviato dall'utente. Il log conferma PostgreSQL 17.11, connessioni HikariCP, collegamento Flyway a gamechart e Tomcat sulla 8080.
- .env contiene DB_USERNAME e DB_PASSWORD ed è escluso da Git. DB_USERNAME coincide con gamechart_admin. Non stampare o salvare password nei riepiloghi.
- application.properties ha URL JDBC con localhost, porta 15433, database gamechart e riferimenti alle variabili DB_USERNAME e DB_PASSWORD.
- Spiegato che Compose e processo Java ricevono la configurazione separatamente. IntelliJ può importare il .env nella Run configuration; Spring Boot non lo carica automaticamente. Configurazione funzionante dimostrata dal log.
- Flyway ha creato flyway_schema_history ma trova zero migrazioni applicative. Non risulta configurato ddl-auto validate nelle properties.
- I riavvii del log erano causati da DevTools e terminavano con successo.
- Warning Maven HTTP 401 sui repository Flyway: origine individuata nel POM flyway-parent 12.4.0 nella cache locale, che dichiara quei repository. Distinti dal blocco javac/Lombok e dalla connessione PostgreSQL; non modificati o risolti autonomamente.
- Futuro hosting su OVHcloud: proposto database separato dallo sviluppo locale, possibile VPS con backend e PostgreSQL in container distinti, volume persistente e backup esterni. Nessun servizio cloud scelto o acquistato.

## Concetti affrontati

- Cardinalità, lato proprietario, JoinColumn e JoinTable; mappedBy appartiene all'annotazione della relazione inversa e indica il nome del campo Java.
- Partecipazione e vittoria sono relazioni diverse. Ora si registrano soltanto i vincitori.
- Il vincolo univoco composto impedisce il duplicato nella stessa partita, permettendo allo stesso giocatore di vincere partite diverse. Non garantisce una collezione non vuota.
- Non propagare la cancellazione di una partita ai giocatori condivisi tramite CascadeType.REMOVE o ALL.
- I repository Spring Data sono proxy; le operazioni CRUD standard sono gestite da SimpleJpaRepository tramite EntityManager. Repository sulle interfacce è ridondante.
- Unica transazione del servizio per il caso d'uso di registrazione; save è già transazionale e le operazioni repository partecipano normalmente alla transazione esistente. Spiegati proxy, JpaTransactionManager, commit/rollback e comportamento predefinito delle eccezioni.
- Se fallisce la registrazione, annullare partita e nuovi collegamenti, conservando gioco e dipendenti preesistenti. L'utente ha compreso che dopo un tentativo annullato e uno riuscito deve risultare una sola partita.
- Flyway è una scelta per rendere riproducibile e versionata la creazione/evoluzione dello schema, non una previsione di nuove funzionalità. Hibernate può validare lo schema dopo le migrazioni. L'esempio di un nickname era solo didattico: NON è un requisito.

## Punto da cui ripartire

- L'utente va a dormire. Riprendere rispettando ZERO CODICE e rileggendo gli eventuali cambiamenti prima delle revisioni.
- Prossimo passo proposto: metodo di registrazione in MatchService, con identificativo del gioco e identificativi dei vincitori in ingresso; recuperare le entità, controllarle, assegnare registeredAt e salvare nella stessa transazione con Transactional di Spring. L'utente scrive l'implementazione.
- Controlli da progettare: almeno un vincitore, identificativi tutti esistenti, nessun duplicato. Non salvare il sottoinsieme valido se manca uno dei giocatori richiesti. Proteggere le regole anche dalle modifiche successive, discutendo incapsulamento e setter indiscriminati.
- Resta da decidere una politica di fuso orario coerente per la data di registrazione e la classifica annuale, soprattutto su OVHcloud. Non è stata ancora discussa con l'utente.
- Migrazioni ancora da preparare prima di usare le tabelle. Proposti percorso resources/db/migration, prima migrazione versionata e Hibernate ddl-auto validate; non implementati. L'utente ha scelto di proseguire prima con repository e servizio.
- Ultima domanda, non ancora risposta: se arrivano due identificativi di vincitori ma solo uno esiste, salvare con il solo valido o rifiutare l'intera registrazione? Risposta attesa: rifiutare l'intera registrazione.
