---
title: Routage
description: Nuxt.js utilise le système de fichiers pour générer les routes de votre application web.
---

> Nuxt.js génère automatiquement la configuration pour [vue-router](https://github.com/vuejs/vue-router) en fonction de votre arborescence de fichiers Vue se trouvant au sein du répertoire `pages`.

<div class="Alert Alert--grey">Pour naviguer entre les pages, nous recommandons l'utilisation du composant [`<nuxt-link>`](/api/components-nuxt-link).</div>

Par exemple :

```html
<template>
  <nuxt-link to="/">Accueil</nuxt-link>
</template>
```

## Routes basiques

Cette arborescence :

```bash
pages/
--| user/
-----| index.vue
-----| one.vue
--| index.vue
```

génèrera automatiquement :

```js
router: {
  routes: [
    {
      name: 'index',
      path: '/',
      component: 'pages/index.vue'
    },
    {
      name: 'user',
      path: '/user',
      component: 'pages/user/index.vue'
    },
    {
      name: 'user-one',
      path: '/user/one',
      component: 'pages/user/one.vue'
    }
  ]
}
```

## Routes dynamiques

Pour définir une route dynamique à l'aide d'un paramètre, vous devez définir un fichier `.vue` OU un répertoire **préfixé par un souligné (`_`)**.

Cette arborescence :

```bash
pages/
--| _slug/
-----| comments.vue
-----| index.vue
--| users/
-----| _id.vue
--| index.vue
```

génèrera automatiquement :

```js
router: {
  routes: [
    {
      name: 'index',
      path: '/',
      component: 'pages/index.vue'
    },
    {
      name: 'users-id',
      path: '/users/:id?',
      component: 'pages/users/_id.vue'
    },
    {
      name: 'slug',
      path: '/:slug',
      component: 'pages/_slug/index.vue'
    },
    {
      name: 'slug-comments',
      path: '/:slug/comments',
      component: 'pages/_slug/comments.vue'
    }
  ]
}
```

Comme vous pouvez le voir, la route nommée `users-id` contient le chemin `:id?` ce qui le rend optionnel. Si vous voulez le rendre obligatoire, créez un fichier `index.vue` dans le dossier `users/_id`.

<p class="Alert Alert--info"><b>Attention :</b> les routes dynamiques sont ignorées par la commande `generate`, consultez la configuration de l'API à propos de [La propriété `generate`](/api/configuration-generate#routes)</p>

### Validation des paramètres de route

Nuxt.js vous permet de définir une méthode de validation dans votre composant de routage dynamique.

Par exemple : `pages/users/_id.vue`

```js
export default {
  validate ({ params }) {
    // Doit être un nombre
    return /^\d+$/.test(params.id)
  }
}
```

Si la méthode de validation ne renvoie pas `true`, Nuxt.js chargera automatiquement la page d'erreur 404.

Pour plus d'informations à propos de la méthode de validation, consultez [la partie Pages de l'API pour La méthode `validate`](/api/pages-validate)

## Routes imbriquées

Nuxt.js vous permet de créer des routes imbriquées en utilisant les routes enfants de vue-router.

Pour définir le composant parent d'une route imbriquée, vous devez créer un fichier Vue avec le **même nom que le répertoire** qui contient les vues enfants.

<p class="Alert Alert--info"><b>Attention :</b> n'oubliez pas d'écrire `<nuxt-child/>` au sein du composant parent (fichier <code>.vue</code>).</p>

Cette arborescence :

```bash
pages/
--| users/
-----| _id.vue
-----| index.vue
--| users.vue
```

génèrera automatiquement :

```js
router: {
  routes: [
    {
      path: '/users',
      component: 'pages/users.vue',
      children: [
        {
          path: '',
          component: 'pages/users/index.vue',
          name: 'users'
        },
        {
          path: ':id',
          component: 'pages/users/_id.vue',
          name: 'users-id'
        }
      ]
    }
  ]
}
```

## Routes dynamiques imbriquées

Ce scénario ne devrait pas arriver souvent, mais il est possible avec Nuxt.js d'avoir des routes dynamiques enfants dans des routes dynamiques parentes.

Cette arborescence :

```bash
pages/
--| _category/
-----| _subCategory/
--------| _id.vue
--------| index.vue
-----| _subCategory.vue
-----| index.vue
--| _category.vue
--| index.vue
```

génèrera automatiquement :

```js
router: {
  routes: [
    {
      path: '/',
      component: 'pages/index.vue',
      name: 'index'
    },
    {
      path: '/:category',
      component: 'pages/_category.vue',
      children: [
        {
          path: '',
          component: 'pages/_category/index.vue',
          name: 'category'
        },
        {
          path: ':subCategory',
          component: 'pages/_category/_subCategory.vue',
          children: [
            {
              path: '',
              component: 'pages/_category/_subCategory/index.vue',
              name: 'category-subCategory'
            },
            {
              path: ':id',
              component: 'pages/_category/_subCategory/_id.vue',
              name: 'category-subCategory-id'
            }
          ]
        }
      ]
    }
  ]
}
```

### Alternative pour application monopage

Vous pouvez activer l'alternative pour application monopage pour les routes dynamiques aussi. Nuxt.js va générer un fichier supplémentaire identique à `index.html` qui pourra être utilisé en `mode: 'spa'`. La plupart des services d'hébergement peuvent être configurés pour utiliser le template d'application monopage si aucun fichier ne concorde. Les informations de `head` ou HTML ne seront pas inclus mais les données seront toujours résolues et chargées depuis l'API.

Nous pouvons activer cela dans notre fichier `nuxt.config.js` :

``` js
module.exports = {
  generate: {
    fallback: true, // si vous souhaitez utiliser un fichier '404.html'
    fallback: 'my-fallback/file.html' // si votre hébergement nécessite une localisation personnalisée
  }
}
```

#### Implémentation pour Surge

Surge [peut gérer](https://surge.sh/help/adding-a-custom-404-not-found-page) aussi bien les fichiers `200.html` que `404.html`. `generate.fallback` est mis à `200.html` par défaut, donc vous devez changer cela.

#### Implémentation pour GitHub Pages et Netlify

GitHub Pages et Netlify reconnaissent les fichiers `404.html` automatiquement, donc mettre `generate.fallback` à `true` est tout ce que vous avez besoin de faire !

#### Implémentation pour Firebase Hosting

Pour utiliser Firebase Hosting, configurez `generate.fallback` à `true` et utilisez la configuration suivante ([plus d'informations](https://firebase.google.com/docs/hosting/url-redirects-rewrites#section-rewrites)) :

``` json
{
  "hosting": {
    "public": "dist",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ],
    "rewrites": [
      {
        "source": "**",
        "destination": "/404.html"
      }
    ]
  }
}
```

## Transitions

Nuxt.js utilise le composant [`<transition>`](http://vuejs.org/v2/guide/transitions.html#Transitioning-Single-Elements-Components) afin de vous permettre de créer de superbes transitions / animations entre vos routes.

### Paramètres globaux

<p class="Alert Alert--nuxt-green"><b>Info :</b> dans Nuxt.js, le nom de la transition par défaut est `"page"`.</p>

Pour ajouter une transition de fondu à chaque page de votre application, nous avons besoin d'un fichier CSS qui est partagé sur toutes nos routes. Commençons par créer un fichier dans le dossier `assets`.

Notre CSS global dans `assets/main.css` :

```css
.page-enter-active, .page-leave-active {
  transition: opacity .5s;
}
.page-enter, .page-leave-active {
  opacity: 0;
}
```

Nous ajoutons son chemin dans notre fichier de configuration `nuxt.config.js` :

```js
module.exports = {
  css: [
    'assets/main.css'
  ]
}
```

Pour plus d'informations à propos des transitions, consultez [la partie Configuration de l'API pour La propriété `transition`](/api/pages-transition)

### Paramètres des pages

Vous êtes également libre de définir une transition personnalisée pour une seule page à l'aide de la propriété `transition`.

Nous ajoutons une nouvelle classe dans notre CSS global `assets/main.css` :

```css
.test-enter-active, .test-leave-active {
  transition: opacity .5s;
}
.test-enter, .test-leave-active {
  opacity: 0;
}
```

puis, nous utilisons la propriété transition pour définir le nom de la classe à utiliser pour cette transition de page :

```js
export default {
  transition: 'test'
}
```

Pour plus d'informations à propos de la propriété transition, consultez [la partie Configuration de l'API pour La propriété `transition`](/api/pages-transition)

## Middleware

> Le middleware vous permet de définir une fonction personnalisée qui sera exécutée avant le rendu d'une page ou d'un groupe de pages.

**Tous les middlewares devraient être placés dans le répertoire `middleware/`.** Le nom du fichier étant le nom du middleware (`middleware/auth.js` deviendra le middleware `auth`).

Un middleware reçoit [le contexte](/api#context) comme premier argument :

```js
export default function (context) {
  context.userAgent = context.isServer ? context.req.headers['user-agent'] : navigator.userAgent
}
```

Le middleware sera exécuté en série dans l'ordre suivant :

1. `nuxt.config.js`
2. Mises en page correspondantes
3. Pages correspondantes

Un middleware peut être asynchrone, retourner une `Promise` ou utiliser une fonction de rappel en second argument :

`middleware/stats.js`

```js
import axios from 'axios'

export default function ({ route }) {
  return axios.post('http://my-stats-api.com', {
    url: route.fullPath
  })
}
```

Puis, dans `nuxt.config.js`, pour une mise en page ou une page, utilisez le mot-clé `middleware` :

`nuxt.config.js`

```js
module.exports = {
  router: {
    middleware: 'stats'
  }
}
```

Le middleware `stats` sera appelé à chaque changement de routes.

Pour voir un exemple d'usage utilisant les middlewares, consultez [example-auth0](https://github.com/nuxt/example-auth0) sur GitHub.
