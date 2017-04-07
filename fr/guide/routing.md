---
title: Routage
description: Nuxt.js utilise le système de fichiers pour générer les routes de votre applications web.
---

> Nuxt.js génère automatiquement la configuration pour [vue-router](https://github.com/vuejs/vue-router) en fonction de votre arborescence de fichiers Vue se trouvant au sein du répertoire `pages`.

## Routes basiques

Cette arborescence:

```bash
pages/
--| user/
-----| index.vue
-----| one.vue
--| index.vue
```

génère automatiquement:

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

Pour définir une route dynmaique à l'aide d'un paramètre, vous devez définir un fichier `.vue` OU un répertoire **préfixé par un souligner (`_`).

Cette arborescence:

```bash
pages/
--| _slug/
-----| comments.vue
-----| index.vue
--| users/
-----| _id.vue
--| index.vue
```

génère automatiquement:

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

Comme vous pouvez le voir, la route nommée `users-id` contient le chemin `:id?` ce qui le rend optionnel; si vous voulez le rendre obligatoire, créez un fichier `index.vue` dans le dossier `users/_id`.

### Validation des paramètres de routes

Nuxt.js vous permet de définir une méthode de validation dans votre composant de routage dynamique.

Par exemple: `pages/users/_id.vue`

```js
export default {
  validate ({ params }) {
    // Must be a number
    return /^\d+$/.test(params.id)
  }
}
```

Si la méthode de validation ne renvoie pas `true`, Nuxt.js chargera automatiquement la page d'erreur 404.

Plus d'informations à propos de la méthode de validation: [API Pages validate](/api/pages-validate)

## Routes imbriquées

Nuxt.js vous permets de créer des routes imbriquées en utilisant les routes enfants de vue-router.

Pour définir le composant parent d'un route imbriquée, vous devez créer un fichier Vue avec le **même nom que le répertoire** qui contient les vues enfants.

<p class="Alert Alert--info">N'oubliez pas d'écrire `<nuxt-child/>` au sein du composant parent (fichier `.vue`).</p>

Cette arborescence:

```bash
pages/
--| users/
-----| _id.vue
-----| index.vue
--| users.vue
```

génère automatiquement:

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

Il est possible avec Nuxt.js d'avoir des routes dynamiques imbriquées dans des routes dynamiques; bien que ce scénario ne devrait pas être monnaie courante.

Cette arborescence:

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

génère automatiquement:

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

## Transitions

Nuxt.js utilise le composant [&lt;transition&gt;](http://vuejs.org/v2/guide/transitions.html#Transitioning-Single-Elements-Components) afin de vous permettre de créer des transitions/animations époustouflantes entre vos routes.

### Paramètres globaux

<p class="Alert Alert--info">Dans Nuxt.js, le nom de la transition par défaut est `"page"`.</p>

Pour ajouter une transition de fondu à chaque page de votre application, nous avons besoin d'un fichier CSS qui est partagé sur toutes nos routes. Commençons par créer un fichier dans le dossier `assets`.

Notre CSS global dans `assets/main.css`:
```css
.page-enter-active, .page-leave-active {
  transition: opacity .5s;
}
.page-enter, .page-leave-active {
  opacity: 0;
}
```

Nous ajoutons son chemin dans notre config `nuxt.config.js`:
```js
module.exports = {
  css: [
    'assets/main.css'
  ]
}
```

Plus d'informations à propos des transitions: [API Configuration transition](/api/pages-transition)

### Paramètres des pages

Vous êtes également libre de définir une transition personnalisée pour une seule page à l'aide de la propriété `transition`.

Nous ajoutons une nouvelle classe dans notre CSS global `assets/main.css`:
```css
.test-enter-active, .test-leave-active {
  transition: opacity .5s;
}
.test-enter, .test-leave-active {
  opacity: 0;
}
```

puis, nous utilions la propriété transition pour définir le nom de la classe à utiliser pour cette transition de page:
```js
export default {
  transition: 'test'
}
```

Plus d'informations à propos de la propriété transition: [API Pages transition](/api/pages-transition)

## Middleware

> Le middleware vous permet de définir une fonction personnalisée qui sera exécutée avant le rendu d'une page ou d'un groupe de pages.

**Tous les middlewares devraient être placés dans le répertoire `middleware/`.** Le nom du fichier étant le nom du middleware (`middleware/auth.js` deviendra le middleware `auth`).

Un middleware reçoit le [contexte](/api#context) comme premier argument:

```js
export default function (context) {
  context.userAgent = context.isServer ? context.req.headers['user-agent'] : navigator.userAgent
}
```

Le middleware sont exécuté en séries dans l'ordre suivant:
1. `nuxt.config.js`
2. Layouts correspondants
3. Pages correspondantes

Un middleware peut être asynchrone, retourner une `Promise` ou utiliser le `callback` (2ème arguement):

`middleware/stats.js`
```js
import axios from 'axios'

export default function ({ route }) {
  return axios.post('http://my-stats-api.com', {
    url: route.fullPath
  })
}
```

Puis, dans `nuxt.config.js`, un layout ou une page, utilisez le mot clef `middleware`:

`nuxt.config.js`
```js
module.exports = {
  router: {
    middleware: 'stats'
  }
}
```

Dans cet exemple, le middleware `stats` sera appelé à chaque changement de routes.

Pour voir un exemple "réel" utilisant les middlewares, jeter un oeil à [example-auth0](https://github.com/nuxt/example-auth0) sur GitHub.
