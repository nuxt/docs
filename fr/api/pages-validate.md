---
title: "API : la méthode validate"
description: Nuxt.js vous permet de définir une méthode de validation dans votre composant de route dynamique.
---

# La méthode validate

> Nuxt.js vous permet de définir une méthode de validation dans votre composant de route dynamique.

- **Type :** `Function`

```js
validate({ params, query, store }) {
  return true // si le paramètre est valide
  return false // nous arrêtons Nuxt.js pour faire le rendu de la route et afficher la page d'erreur
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
