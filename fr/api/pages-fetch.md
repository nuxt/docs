---
title: "API: La méthode fetch"
description: La méthode fetch est utilisée pour remplir le store avant de rendre la page, c'est comme la méthode data  sauf qu'elle ne définit pas les données du composant.
---

# La méthode fetch

> La méthode fetch est utilisée pour remplir le store avant de rendre la page, c'est comme la méthode data  sauf qu'elle ne définit pas les données du composant.

- **Type:** `Function`

La méthode `fetch` est appelée avant chaque chargement de composant (**uniquement pour les composants pages**). Elle peut être appelée côté serveur ou avant de nvaiguer sur la route correspondante.

La méthode `fetch` reçoit le [context](/api#context) comme premier argument, vous pouvez l'utiliser afin de récupérer des données et remplir le store. Pour rendre la méthode fetch asynchrone, **retourner une Promise**, nuxt.js attendra la résolution de la promise avand de faire le rendu du cmoposant.

Exemple de `pages/index.vue`:
```html
<template>
  <h1>Stars: {{ $store.state.stars }}</h1>
</template>

<script>
export default {
  fetch ({ store, params }) {
    return axios.get('http://my-api/stars')
    .then((res) => {
      store.commit('setStars', res.data)
    })
  }
}
</script>
```

Vous pouvez également utiliser async/await pour rendre votre code plus propre:

```html
<template>
  <h1>Stars: {{ $store.state.stars }}</h1>
</template>

<script>
export default {
  async fetch ({ store, params }) {
    let { data } = await axios.get('http://my-api/stars')
    store.commit('setStars', data)
  }
}
</script>
```
