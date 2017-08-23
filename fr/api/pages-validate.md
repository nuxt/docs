---
title: "API: la méthode validate"
description: Nuxt.js vous permet de définir une méthode de validation dans votre composant de route dynamique.
---

# La méthode validate

> Nuxt.js vous permet de définir une méthode de validation dans votre composant de route dynamique.

- **Type:** `Function`

```js
validate({ params, query, store }) {
  return true // if the params are valid
  return false // will stop Nuxt.js to render the route and display the error page
}
```

Nuxt.js vous permet de définir une méthode de validation dans votre composant de route dynamique (dans cet exemple : `pages/users/_id.vue`).

Si la méthode de validation retourne `false`, Nuxt.js chargera automatiquement la page d'erreur 404.

```js
export default {
  validate ({ params }) {
    // Must be a number
    return /^\d+$/.test(params.id)
  }
}
```

Vous pouvez également utiliser des données de votre [store](/guide/vuex-store) pour la validation comme par exemple (remplie par [l'action nuxtServerInit](/guide/vuex-store#the-nuxtserverinit-action) auparavant):

```js
export default {
  validate ({ params, store }) {
    // Check if `params.id` is an existing category
    return store.state.categories.some((category) => category.id === params.id)
  }
}
```
