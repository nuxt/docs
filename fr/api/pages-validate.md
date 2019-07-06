---
title: "API : la méthode validate (EN)"
description: Nuxt.js vous permet de définir une méthode de validation dans votre composant de route dynamique.
---

# La méthode validate (EN)

> Nuxt.js vous permet de définir une méthode de validation dans votre composant de route dynamique.

- **Type:** `Function` ou `Async Function`

```js
validate({ params, query, store }) {
  return true // si le paramètre est valide
  return false // nous arrêtons Nuxt.js pour faire le rendu de la route et afficher la page d'erreur
}
```

```js
async validate({ params, query, store }) {
  // await operations (EN)
  return true // if the params are valid
  return false // will stop Nuxt.js to render the route and display the error page
}
```

You can also return promises (EN):

```js
validate({ params, query, store }) {
  return new Promise((resolve) => setTimeout(() => resolve()))
}
```

Nuxt.js vous permet de définir une méthode de validation dans votre composant de route dynamique (dans cet exemple : `pages/users/_id.vue`).

Si la méthode de validation retourne `false`, Nuxt.js chargera automatiquement la page d'erreur 404.

```js
export default {
  validate ({ params }) {
    // Doit être un nombre
    return /^\d+$/.test(params.id)
  }
}
```

Vous pouvez aussi vérifier les données dans votre [store](/guide/vuex-store) (remplies au préalable avec l'action [`nuxtServerInit`](/guide/vuex-store#the-nuxtserverinit-action)) :

```js
export default {
  validate ({ params, store }) {
    // Vérifier si `params.id` est une catégorie existante
    return store.state.categories.some((category) => category.id === params.id)
  }
}
```

You can also throw expected or unexpected errors during validate function execution (EN):

```js
export default {
  async validate ({ params, store }) {
    // Throws a 500 internal server error with custom message
    throw new Error('Under Construction!')
  }
}
```

<p style="width: 294px;position: fixed; top : 64px; right: 4px;" class="Alert Alert--orange"><strong>⚠Cette page est actuellement en cours de traduction française. Vous pouvez repasser plus tard ou <a href="https://github.com/vuejs-fr/nuxt" target="_blank">participer à la traduction</a> de celle-ci dès maintenant !</strong></p>

