---
title: "API : la méthode fetch"
description: La méthode `fetch` est utilisée pour remplir le store avant de rendre la page, elle est similaire à la méthode `asyncData` sauf qu'elle ne définit pas les données du composant.
---

> La méthode fetch est utilisée pour remplir le store avant le rendu de la page, elle est similaire à la méthode `asyncData` sauf qu'elle ne définit pas les données du composant.

- **Type:** `Function`

La méthode `fetch`, *si définie*, est appelée à chaque fois avant de charger le composant (**uniquement pour les composants de page**). Elle sera appelée une fois côté serveur (lors de la première requête à l'application Nuxt) et côté client lors de la navigation vers d'autres routes.

La méthode `fetch` reçoit l'object [`context`](/api/context) comme  premier argument. Nous pouvons l'utiliser pour récupérer des données et remplir le store. Pour rendre la méthode `fetch` asynchrone, **renvoyer une promesse**, Nuxt.js attendra que la promesse soit résolue avant de restituer le composant.


<div class="Alert Alert--orange">

**Avertissement**: Vous **n'avez** pas accès à l'instance du composant via `this` avec` fetch` car elle s'appelle **avant d'initier** le composant.

</div>


Exemple `pages/index.vue`:

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

Vous pouvez également utiliser `async`/`await` pour rendre votre code plus propre:

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

## Vuex

Si vous souhaitez appeler une action du store, utilisez `store.dispatch` à l'intérieur de la méthode `fetch`, assurez-vous d'attendre la fin de l'action en utilisant `async`/`await`:

```html
<script>
export default {
  async fetch ({ store, params }) {
    await store.dispatch('GET_STARS');
  }
}
</script>
```

`store/index.js`

```js
// ...
export const actions = {
  async GET_STARS ({ commit }) {
    const { data } = await axios.get('http://my-api/stars')
    commit('SET_STARS', data)
  }
}
```

## Écoute des changements de chaîne de requête

Par défaut, la méthode `fetch` **n'est pas appelée** lors d'un changement de chaîne de requête. Si vous souhaitez modifier ce comportement, par exemple lors de la construction d'un composant de pagination, vous pouvez configurer les paramètres à écouter via la propriété `watchQuery` de votre composant de page. En savoir plus sur la [propriété `watchQuery`](/api/pages-watchquery).
