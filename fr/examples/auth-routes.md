---
title: Auth Routes
description: Exemple d'authentification de routes avec Nuxt.js
github: auth-routes
livedemo: https://nuxt-auth-routes.gomix.me
liveedit: https://gomix.com/#!/project/nuxt-auth-routes
---

# Documentation

> Nuxt.js peut être utilisé pour créer des routes authentifiées facilement.

## Utilisation de Express et Sessions

Pour ajouter la fonctionnalité de sessions dans notre application, nous utiliserons `express` et` express-session`, pour cela, nous devons utiliser Nuxt.js de manière programmatique.

Premièrement, nous installons les dépendances:
```bash
yarn add express express-session body-parser whatwg-fetch
```

*Nous parlerons de `whatwg-fetch` dans un instant.*

Puis nous créons notre `server.js`:
```js
const Nuxt = require('nuxt')
const bodyParser = require('body-parser')
const session = require('express-session')
const app = require('express')()

// Body parser, to access req.body
app.use(bodyParser.json())

// Sessions to create req.session
app.use(session({
  secret: 'super-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 60000 }
}))

// POST /api/login to log in the user and add him to the req.session.authUser
app.post('/api/login', function (req, res) {
  if (req.body.username === 'demo' && req.body.password === 'demo') {
    req.session.authUser = { username: 'demo' }
    return res.json({ username: 'demo' })
  }
  res.status(401).json({ error: 'Bad credentials' })
})

// POST /api/logout to log out the user and remove it from the req.session
app.post('/api/logout', function (req, res) {
  delete req.session.authUser
  res.json({ ok: true })
})

// We instantiate Nuxt.js with the options
const isProd = process.env.NODE_ENV === 'production'
const nuxt = new Nuxt({ dev: !isProd })
// No build in production
const promise = (isProd ? Promise.resolve() : nuxt.build())
promise.then(() => {
  app.use(nuxt.render)
  app.listen(3000)
  console.log('Server is listening on http://localhost:3000')
})
.catch((error) => {
  console.error(error)
  process.exit(1)
})
```

Et nous modifions nos script dans `package.json`:
```json
// ...
"scripts": {
  "dev": "node server.js",
  "build": "nuxt build",
  "start": "cross-env NODE_ENV=production node server.js"
}
// ...
```
Note: Vous devrez exécuter `npm install --save-dev cross-env` afin de faire fonctionner l'exemple précédent. Si vous n'êtes pas en train de développer sur Windows, vous pouvez laisser cross-env en dehors de votre script `start` et définir `NODE_ENV` directement.

## Utilisation du store

Nous avons besoin d'un état global pour informer notre application si l'utilisateur est connecté sur les pages.

Pour laisser Nuxt.js utiliser Vuex, nous créons un fichier `store/index.js`:
```js
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// Polyfill for window.fetch()
require('whatwg-fetch')

const store = new Vuex.Store({

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

1. Nous importons `Vue` et `Vuex` (inclus dans Nuxt.js) et nous indiquons à Vue d'utiliser Vuex afin de pouvoir utiliser `$store` dans nos composants
2. Nous `require('whatwg-fetch')` afin de *polyfill* la méthode `fetch()` pour tous les navigateurs (voir [fetch repo](https://github.com/github/fetch))
3. Nous créons notre mutation `SET_USER` qui va instancier `state.authUser` avec l'utilisateur connecté
4. Nous exportons notre instance du *store* vers Nuxt.js afin qu'il puisse l'injecter dans notre application principale

### Fonction nuxtServerInit()

Nuxt.js appelle une action spécifique nommée `nuxtServerInit` avec le contexte comme l'argument, de telle manière à ce que lorsque l'application sera chargée, le magasin sera déjà rempli avec certaines données que nous pouvons obtenir du serveur.

Dans notre `store/index.js`, nous pouvons ajouter l'action `nuxtServerInit`:
```js
nuxtServerInit ({ commit }, { req }) {
  if (req.session && req.session.authUser) {
    commit('SET_USER', req.session.authUser)
  }
}
```

Pour rendre la méthode de données asynchrone, nuxt.js vous offre différents moyens, choisissez celui dont vous êtes le plus familier:

1. retourner une `Promise`, nuxt.js attendra la résolution de la `Promise` avant d'afficher le composant.
2. en utilisant [async/await](https://github.com/lukehoban/ecmascript-asyncawait) ([en savoir plus](https://zeit.co/blog/async-and-await))

### Fonction login()

Nous ajoutons une action `login` qui sera appelée à partir de nos composant pages pour connecter l'utilisateur:
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

### Fonction logout()

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

## Composants Pages

Ensuite, nous pouvons utiliser `$store.state.authUser` dans nos composants Pages pour vérifier si l'utilisateur est connecté ou non dans notre application.

### Rediriger l'utilisateur s'il n'est pas connecté

Ajoutons une route `/secret` où seul l'utilisateur connecté peut voir son contenu:
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

Nous pouvons voir dans la méthode `fetch` que nous appelons `redirect('/')` lorsque notre utilisateur n'est pas connecté.
