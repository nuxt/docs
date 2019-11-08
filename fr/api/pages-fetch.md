---
title: "API: La méthode Fetch"
description: La méthode `fetch` est utilisée pour remplir le store avant que le rendu de la page soit effectué. Le fonctionnement est similaire à la méthode `asyncData` sauf qu'elle ne définit pas les données du composant.
---

> La méthode `fetch` est utilisée pour remplir le store avant que le rendu de la page soit effectué. Le fonctionnement est similaire à la méthode `asyncData` sauf qu'elle ne définit pas les données du composant.

- **Type:** `Function`

La  méthode `fetch`, *si définie*, est appelée à chaque fois avant de charger le composant (**seulement pour les composants de page**). Elle sera appelée une fois côté serveur (lors de la première requête auprès de l'application Nuxt) et côté client lors de la navigation vers d'autres routes.

La méthode `fetch` reçoit l'ojbet [`context`](/api/context) comme premier argument. Nous pouvons l'utiliser pour extraire des données et remplir le store. Pour rendre la méthode `fetch` asynchrone, et pour ** renvoyer une Promise **, Nuxt.js attendra que la Promise soit résolue avant de rendre le composant.

<div class="Alert Alert--orange">

**Attention**: vous **n'avez pas**  accès à l'instance du composant via `this` à l'intérieur de la méthode `fetch` car elle est appelée ** avant d'initialiser ** le composant.

</div>


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

Vous pouvez aussi utiliser `async`/`await` pour rendre votre code plus lisible:

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

Si vous souhaitez appeler une action du store, utilisez `store.dispatch` à l'intérieur de` fetch`. Assurez-vous d'attendre la fin de l'action en utilisant `async` /` await` à l'intérieur:
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

## Observer les changements d'une query string 

La méthode `fetch` **n'est pas appelée** lorsque la query string est modifiée par défaut. Si vous souhaitez modifier ce comportement, par exemple lors de la construction d'un composant de pagination, vous pouvez configurer les paramètres à observer via la propriété `watchQuery` de votre composant de page. En savoir plus sur la [page API `watchQuery`](/api/pages-watchquery)
