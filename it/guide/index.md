---
title: Introduzione
descrizione: "Nuxt.js è un framework nato per la creazione di applicazioni in Vue, dove puoi scegliere tra 3 tipi di applicazioni :  Universal, Static Generated oppure Single Page application."
---

> Nuxt.js è un framework nato per la creazione di applicazioni in Vue, dove puoi scegliere tra 3 tipi di applicazioni :  Universal, Static Generated oppure Single Page application.

## Cos'è Nuxt.js?

Il suo scopo principale è l'  **UI rendering** (rendering dell'interfaccia utente) allontanandosi dalla distribuzione client/server.

Il nostro obiettivo è quello di creare un framework flessibile abbastanza da poterlo usare come base per il tuo progetto principale, o in aggiunta a quel che già stai usando su Node.js.

Nuxt.js imposta tutta la configurazione necessaria allo sviluppo di una applicazione Vue.js  **Renderizzata dal Server** in modo che l'utilizzo sia più piacevole.

In aggiunta, forniamo in oltre un'altra opzione di deploy chiamata: *nuxt generate*. Ciò permetterà il build di un'Applicazione Vue.js **Generata Statica**.
Noi crediamo che ciò possa essere il prossimo grande passo per lo sviluppo di Applicazioni Web a microservizi.

Inoltre, puoi comunque usare Nuxt.js per creare velocemente delle **Single Page Application** (`spa`) ,utile per avere le funzionalità di Nuxt.js mentre si lavora ad applicazioni di "Back Office" .

Come Framework, Nuxt.js arriva con una serie di funzionalità che possono aiutarti nello sviluppo tra client e server, come Dati Asincroni, Middleware, Layouts etc..

## Come Funziona

![Vue con Webpack e Babel](https://i.imgur.com/avEUftE.png)

Nuxt.js include tutto ciò che segue al suo interno, per lo sviluppo di un' applicazione web corposa:

- [Vue 2](https://vuejs.org/)
- [Vue Router](https://router.vuejs.org/en/)
- [Vuex](https://vuex.vuejs.org/en/) (incluso solo quando si utilizza la [store option](/guide/vuex-store))
- [Vue Server Renderer](https://ssr.vuejs.org/en/) (escluso quando si utilizza [`mode: 'spa'`](/api/configuration-mode))
- [vue-meta](https://github.com/declandewet/vue-meta)

Per un totale di soli **57kB min+gzip** (60kB con Vuex).

"Sotto al cofano" è utilizzato [webpack](https://github.com/webpack/webpack) assieme a [vue-loader](https://github.com/vuejs/vue-loader) e [babel-loader](https://github.com/babel/babel-loader) per il bundle, la divisione del codice e la "miniaturizzazione" di esso.

## Funzionalità

- Scrittura di File Vue (`*.vue`)
- Suddivisione Automatica del codice
- Rendering Server-Side 
- Sistema di routing  di Dati Asincroni
- Serving di file statici
- Compilazione ES6/ES7 
- Raggruppamento and miniaturizzazione di JS & CSS
- Gestione del contenuto in `<head>`(`<title>`, `<meta>`, etc.)
- Hot reloading in Sviluppo
- Pre-processor: Sass, Less, Stylus, etc.
- HTTP/2 push headers ready
- Estensione con architetture modulari

## Schema

Questo schema mostra cosa è chiamato da Nuxt.js quando viene effettuata una chiamata al server o quando l'utente naviga tramite le pagine via `<nuxt-link>`:

![nuxt-schema](/nuxt-schema.png)

## Server Rendered (Universal SSR)

Puoi usare Nuxt.js come un framework per gestire il rendering dell' UI del tuo progetto.

Lanciando il comando`nuxt`, si avvierà un server di sviluppo con l' hot-reloading attivo e il  [Vue Server Renderer](https://ssr.vuejs.org/en/) configurato per renderizzare automaticamente server-side la tua applicazione.

### Single Page Applications (SPA)

Se, per qualsiasi ragione, tu preferissi di non utilizzare il rendering server-side oppure avessi bisogno di un hosting statico per la tua applicazione, puoi semplicemente utilizzare la modalità SPA  lanciando il comando `nuxt --spa`. Combinato con la funzionalità *generate*, ti fornirà un potente meccanismo di produzione di Single Page Applications senza la necessità di utilizzare Node.js a runtime o qualche specifica gestione del server.

Dai un'occhiata  [ai comandi](/guide/commands) per saperne di più a riguardo.

Se tu hai già un server, puoi aggiungere Nuxt.js usandolo come middleware. Non ci sono restrizioni quando lo si usa per l'utilizzo Nuxt.js per lo sviluppo di Universal Web Applications. Vedi la la seguente guida :  [Using Nuxt.js Programmatically](/api/nuxt).

## Generato Statico (Pre Rendering)

La grande innovazione di Nuxt.js arriva con il comando `nuxt generate`.

Quando fai il build della tua applicazione, verrà generato l'HTML  per ognuna delle tue rotte e memorizzato in un file.

Per esempio, vedi la seguente struttura:

```bash
-| pages/
----| about.vue
----| index.vue
```

Genererà:

```
-| dist/
----| about/
------| index.html
----| index.html
```

Attraverso ciò, puoi hostare il tuo sito web, anche su un hosting statico!

Il migliore esempio è questo sito web. è generato e hostato su [Netlify](https://www.netlify.com), Vedi il [codice sorgente](https://github.com/nuxt/nuxtjs.org).

Noi non vogliamo generare manualmente l'applicazione ogni volta che c'è un aggiornamento a [docs repository](https://github.com/nuxt/docs), esso avviserà Netlify che in automatico:

1. Clona il [repository nuxtjs.org](https://github.com/nuxt/nuxtjs.org)
2. Installa le dipendenze attraverso `npm install`
3. Lancia il comando `npm run generate`
4. Serve la directory` dist` 

Noi così abbiamo quindi una  **Web application generata, statica** :)

Si può pensare oltre, ad esempio a una web app di e-commerce fatta con  `nuxt generate` e hostata su di una CDN. Ogni volta che un prodotto è terminato o disponibile in magazzino, verrà rigenerata la web app. Ma se l'utente navigasse attraverso la web app contemporaneamente,avrà tutto aggiornato grazie alle chiamate alle API dell'e-commerce .Non c'è più bisogno di avere istanze multiple su di un server combinate con un sistema di caching!

<div class="Alert">Vedi la guida [How to deploy on Netlify?](/faq/netlify-deployment) per maggiori informazioni su come eseguire un deploy su Netlify.</div>
