---
title: Auth Routes
description: Esempio di routes autenticate con Nuxt.js
github: auth-routes
livedemo: https://nuxt-auth-routes.gomix.me
liveedit: https://gomix.com/#!/project/nuxt-auth-routes
---

# Documentazione

> Nuxt.js può essere utilizzato per creare facilmente un sistema di autenticazione per l'accesso alle routes.

## Usando Express e la Sessione

Per aggiungere la funzionalità delle sessioni nella tua applicazione, useremo `express` e `express-session`.

Installiamo le dipendenze:

```bash
yarn add express express-session body-parser whatwg-fetch
```

*Parleremo di `whatwg-fetch` dopo.*

Fatto questo, creiamo il nostro `server.js`:

```js
const { Nuxt, Builder } = require('nuxt')
const bodyParser = require('body-parser')
const session = require('express-session')
const app = require('express')()

// Body parser, to access `req.body`
app.use(bodyParser.json())

// Sessions to create `req.session`
app.use(session({
  secret: 'super-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 60000 }
}))

// POST `/api/login` to log in the user and add him to the `req.session.authUser`
app.post('/api/login', function (req, res) {
  if (req.body.username === 'demo' && req.body.password === 'demo') {
    req.session.authUser = { username: 'demo' }
    return res.json({ username: 'demo' })
  }
  res.status(401).json({ error: 'Bad credentials' })
})

// POST `/api/logout` to log out the user and remove it from the `req.session`
app.post('/api/logout', function (req, res) {
  delete req.session.authUser
  res.json({ ok: true })
})

// We instantiate Nuxt.js with the options
const isProd = process.env.NODE_ENV === 'production'
const nuxt = new Nuxt({ dev: !isProd })
// No build in production
if (!isProd) {
  const builder = new Builder(nuxt)
  builder.build()
}
app.use(nuxt.render)
app.listen(3000)
console.log('Server is listening on http://localhost:3000')
```

E aggiorniamo il file `package.json`:

```json
// ...
"scripts": {
  "dev": "node server.js",
  "build": "nuxt build",
  "start": "cross-env NODE_ENV=production node server.js"
}
// ...
```

Nota: Dobbiamo eseguire il comando `npm install --save-dev cross-env` per rendere questo esempio funzionante. Se *non* stai sviluppando con Windows puoi escludere cross-env dallo script `start` e settare `NODE_ENV` direttamente.

## Usando lo store

Abbiamo bisogno di uno state globale per permettere all'applicazione di sapere se l'utente è connesso **alle pagine**.

Per permettere a Nuxt.js di usare Vuex, creiamo il file `store/index.js`:

```js
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// Polyfill for `window.fetch()`
require('whatwg-fetch')

const store = () => new Vuex.Store({

  state: {
    authUser: null
  },

  mutations: {
    SET_USER: function (state, user) {
      state.authUser = user
    }
  },

  actions: {
    // ...
  }

})

export default store
```

1. Importiamo `Vue` e `Vuex` (incluso inNuxt.js) e chiediamo a Vue di usare Vuew per permettere l'utilizzo dello `$store` nei nostri componenti.
2. Includiamo whatwg-fetch con `require('whatwg-fetch')` per avere accesso al metodo `fetch()` attraverso tutti i browser (vedi[fetch repo](https://github.com/github/fetch)).
3. Creiamo la mututation `SET_USER` e associamo lo `state.authUser` all'utente connesso.
4. Esportiamo l'istanza dello store in Nuxt.js per iniettarlo nell'applicazione.

### azione nuxtServerInit()

Nuxt.js dispone di una specifica azione denominata `nuxtServerInit` con il context come argomento, quando l'app sarà caricata, lo store si popolerà con i dati provenienti dal server.

Nel nostro file `store/index.js`, possiamo aggiungere l'azione `nuxtServerInit`:

```js
nuxtServerInit ({ commit }, { req }) {
  if (req.session && req.session.authUser) {
    commit('SET_USER', req.session.authUser)
  }
}
```

Per rendere il metodo asincrono, Nuxt.js offre strade differenti, sceglie quella con cui hai più familiarità:

1. ritornando una `Promise`, Nuxt.js aspetterà che la promise sarà risolta per renderizzare il componente.
2. Usando [`async`/`await`](https://github.com/lukehoban/ecmascript-asyncawait) ([maggiori informazioni](https://zeit.co/blog/async-and-await)).

### azione login()

Aggiungiamo l'azione `login` che sarà chiamata dalla tua pagina per permettere all'utente di loggarsi:

```js
login ({ commit }, { username, password }) {
  return fetch('/api/login', {
    // Send the client cookies to the server
    credentials: 'same-origin',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username,
      password
    })
  })
  .then((res) => {
    if (res.status === 401) {
      throw new Error('Bad credentials')
    } else {
      return res.json()
    }
  })
  .then((authUser) => {
    commit('SET_USER', authUser)
  })
}
```

### metodo logout()

```js
logout ({ commit }) {
  return fetch('/api/logout', {
    // Send the client cookies to the server
    credentials: 'same-origin',
    method: 'POST'
  })
  .then(() => {
    commit('SET_USER', null)
  })
}
```

## Pagine

Adesso possiamo usare `$store.state.authUser` nelle nostre pagine per verificare se l'utente può vederne il contenuto.

### Redirect se non autenticato

Aggiungiamo una route `/secret` di cui solo l'utente autenticato può vederne il contenuto:

```html
<template>
  <div>
    <h1>Super secret page</h1>
    <router-link to="/">Back to the home page</router-link>
  </div>
</template>

<script>
export default {
  // we use fetch() because we do not need to set data to this component
  fetch ({ store, redirect }) {
    if (!store.state.authUser) {
      return redirect('/')
    }
  }
}
</script>
```

Possiamo verificare nel metodo `fetch` se l'utente è autenticato ed eseguire `redirect('/')` quando l'utente non è connesso.
