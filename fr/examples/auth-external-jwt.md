---
title: API d'authentification externe (JWT)
description: Exemple d'authentification avec le service d'API externe (jsonwebtoken) avec Nuxt.js
github: auth-jwt
code: https://github.com/ahadyekta/nuxt-auth-external-jwt
---

# Documentation

Dans l'exemple auth-routes l'API et le site Nuxt se lancent ensemble et utilisent la même instance serveur Node.js. Cependant, il est parfois mieux de travailler avec une API externe avec jsonWebToken. Cela sera expliqué simplement à travers cet exemple.

## Structure

Puisque Nuxt.js fournit à la fois le rendu client et serveur ainsi qu'un cookie différent entre le navigateur et le serveur Node.js, nous devons fournir un jeton de donnée qui puisse être accessible par les deux parties.

### Pour le rendu serveur

Nous devons sauvegarder le jeton dans un cookie de session après connexion pour qu'il puisse être récupéré via `req.headers.cookie` par les fichiers middlewares, la fonction `nuxtServerInit` ou tout ce qui a accès à `req`.

### Pour le rendu client

Nous actons directement le jeton dans le store, aussi longtemps que la page n'est pas fermée ou rechargée, nous avons le jeton.

Tout d'abord, installons les dépendances :

```bash
npm install js-cookie --save
npm install cookieparser --save
```

## Page de connexion

À l'intérieur du dossier des pages, créez un fichier `login.vue` et dans ce fichier, dans la partie script, ajoutez :

```js
import Cookie from 'js-cookie'

export default {
  middleware: 'notAuthenticated',
  methods: {
    postLogin () {
      setTimeout(() => {
        const auth = {
          accessToken: 'someStringGotFromApiServiceWithAjax'
        }
        this.$store.commit('update', auth) // muter `auth` dans le store pour le rendu client
        Cookie.set('auth', auth) // sauver le jeton dans un cookie pour le rendu serveur
        this.$router.push('/')
      }, 1000)
    }
  }
}
```

> Note : nous simulerons la requête asynchrone avec un délai.

## Utiliser le store

Après cela modifiez `index.js` dans le dossier `store` comme ci-dessous :

```javascript
import Vuex from 'vuex'

var cookieparser = require('cookieparser')

const createStore = () => {
  return new Vuex.Store({
    state: {
      auth: null
    },
    mutations: {
      update (state, data) {
        state.auth = data
      }
    },
    actions: {
      nuxtServerInit ({ commit }, { req }) {
        let accessToken = null
        if (req.headers.cookie) {
          var parsed = cookieparser.parse(req.headers.cookie)
          accessToken = JSON.parse(parsed.auth)
        }
        commit('update', accessToken)
      }
    }
  })
}

export default createStore
```

> Note : la fonction `nuxtServerInit` s'exécute seulement dans chaque rendu côté serveur. Nous l'utilisons pour muter le cookie de session du navigateur dans le store. Nous pouvons récupérer le cookie de session du navigateur avec `req.headers.cookie` et l'analyser en utilisant `cookieparser`.

## Authentification vérifiée via middlewares

Nous pouvons vérifier le store pour obtenir un accès au jeton sur toutes les pages qui demandent un accès limité. Dans le dossier des middlewares nous créons un fichier `authenticated.js` :

```javascript
export default function ({ store, redirect }) {
  // Si l'utilisateur n'est pas authentifié
  if (!store.state.auth) {
    return redirect('/login')
  }
}
```

et dans le dossier des middlewares créez un fichier `notAuthenticated.js` pour la page de connexion :

```javascript
export default function ({ store, redirect }) {
  // Si l'utilisateur est authentifié, aller à la page d'accueil
  if (store.state.auth) {
    return redirect('/')
  }
}
```

> Note : utilisez le middleware `authenticated` pour les pages qui ont besoin d'une authentification et le middleware `notAuthenticated` à l'intérieur des pages de type connexion / inscription, etc.
