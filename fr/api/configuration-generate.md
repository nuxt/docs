---
title: "API : La propriété generate"
description: Configure la génération de votre application web universelle vers une application web statique.
---

# La propriété generate

- Type : `Object`

> Configure la génération de votre application web universelle vers une application web statique.

Quand vous lancez `nuxt generate` ou appelez `nuxt.generate()`, Nuxt.js utilisera la configuration définie dans la propriété `generate`.

## dir

- Type : `String`
- Par défaut : `'dist'`

Nom du répertoire créé par `nuxt generate`.

## fallback

- Type: `String` or `Boolean`
- Default: `'200.html'`

The path to the SPA fallback. This file can be used when doing deploys of generated sites to static hosting. It falls back to `mode: 'spa'` when a route isn't generated.

## interval

- Type : `Number`
- Par défaut : `0`

Interval entre 2 rendus pour éviter d'inonder les appels d'API effectués par une API potentielle de l'application web.

## minify

- Type : `Object`
- Par défaut :

```js
minify: {
  collapseBooleanAttributes: true,
  collapseWhitespace: false,
  decodeEntities: true,
  minifyCSS: true,
  minifyJS: true,
  processConditionalComments: true,
  removeAttributeQuotes: false,
  removeComments: false,
  removeEmptyAttributes: true,
  removeOptionalTags: true,
  removeRedundantAttributes: true,
  removeScriptTypeAttributes: false,
  removeStyleLinkTypeAttributes: false,
  removeTagWhitespace: false,
  sortAttributes: true,
  sortClassName: false,
  trimCustomFragments: true,
  useShortDoctype: true
}
```

Vous pouvez changer la configuration par défaut de [html-minifier](https://github.com/kangax/html-minifier) utilisée par Nuxt.js pour minifier les fichiers HTML créés pendant le processus de génération.

## routes

- Type : `Array`

Les [routes dynamiques](/guide/routing#routes-dynamiques) sont ignorées par la commande `generate`.

Exemple :

```bash
-| pages/
---| index.vue
---| users/
-----| _id.vue
```

Seulement la route `/` sera générée par Nuxt.js.

Si vous voulez que Nuxt.js génère les routes avec des paramètres dynamiques, vous allez devoir définir un tableau de routes dynamiques.

Nous ajoutons les routes pour `/utilisateurs/:id` dans `nuxt.config.js` :

```js
module.exports = {
  generate: {
    routes: [
      '/utilisateurs/1',
      '/utilisateurs/2',
      '/utilisateurs/3'
    ]
  }
}
```

Puis nous lançons `nuxt generate` :

```bash
[nuxt] Generating...
[...]
nuxt:render Rendering url / +154ms
nuxt:render Rendering url /utilisateurs/1 +12ms
nuxt:render Rendering url /utilisateurs/2 +33ms
nuxt:render Rendering url /utilisateurs/3 +7ms
nuxt:generate Generate file: /index.html +21ms
nuxt:generate Generate file: /utilisateurs/1/index.html +31ms
nuxt:generate Generate file: /utilisateurs/2/index.html +15ms
nuxt:generate Generate file: /utilisateurs/3/index.html +23ms
nuxt:generate HTML Files generated in 7.6s +6ms
[nuxt] Generate done
```

Génial, mais que se passe t-il si nous avons des **paramètres dynamiques** ?

1. Utiliser une `Function` qui retourne une `Promise`.
2. Utiliser une `Function` avec une `callback(err, params)`.

### Fonction qui retourne une promesse

`nuxt.config.js`

```js
const axios = require('axios')

module.exports = {
  generate: {
    routes: function () {
      return axios.get('https://mon-api/utilisateurs')
      .then((res) => {
        return res.data.map((user) => {
          return '/utilisateurs/' + user.id
        })
      })
    }
  }
}
```

### Fonction avec une fonction de rappel

`nuxt.config.js`

```js
const axios = require('axios')

module.exports = {
  generate: {
    routes: function (callback) {
      axios.get('https://mon-api/utilisateurs')
      .then((res) => {
        var routes = res.data.map((user) => {
          return '/utilisateurs/' + user.id
        })
        callback(null, routes)
      })
      .catch(callback)
    }
  }
}
```

### Augmenter la vitesse de génération d'une route dynamique avec `payload`

Dans l'exemple ci-dessus, nous avons utilisé `user.id` depuis le serveur pour générer les routes mais jeter le reste des données. Typiquement, nous avons besoin de les récupérer de nouveau depuis `/utilisateurs/_id.vue`. Pendant que nous faisons cela, nous allons probablement avoir besoin de définir `generate.interval` avec quelque chose comme `100` pour ne pas inonder le serveur avec des appels. Parce que cela va augmenter le temps de génération du script, il serait préférable de passer avec l'objet `user` le contexte dans `_id.vue`. Nous pouvons faire cela en modifiant le code ci-dessus pour celui-ci :

`nuxt.config.js`

```js
const axios = require('axios')

module.exports = {
  generate: {
    routes: function () {
      return axios.get('https://mon-api/utilisateurs')
      .then((res) => {
        return res.data.map((user) => {
          return {
            route: '/utilisateurs/' + user.id,
            payload: user
          }
        })
      })
    }
  }
}
```

Maintenant nous pouvons accéder à `payload` depuis `/utilisateurs/_id.vue` comme ceci :

```js
async asyncData ({ params, error, payload }) {
  if (payload) return { user: payload }
  else return { user: await backend.fetchUser(params.id) }
}
```

## subFolders

- Type : `Boolean`
- Par défaut : `true`

Par défaut, lancer `nuxt generate` va créer un répertoire pour chaque route et servir un fichier `index.html` file.

Exemple :

```bash
-| dist/
---| index.html
---| about/
-----| index.html
---| products/
-----| item/
-------| index.html
```

Quand il est mis à `false`, les fichier HTML seront générés en accord avec les chemins de routes :

```bash
-| dist/
---| index.html
---| about.html
---| products/
-----| item.html
```

_Note : cette option peut être utile en utilisant [Netlify](https://netlify.com) ou n'importe quel hébergement utilisant des alternatives HTML._

## concurrence

- Type: `Number`
- Default: `500`

La génération de routes est concurrente, `generate.concurrency` spécifie le nombre de routes qui peuvent être exécuté par un thread.
