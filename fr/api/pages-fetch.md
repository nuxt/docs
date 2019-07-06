---
title: "API : la méthode fetch (EN)"
description: La méthode `fetch` est utilisée pour remplir le store avant de faire le rendu de la page. C'est comme la méthode `asyncData` sauf qu'elle ne définit pas les données du composant.
---

# La méthode fetch (EN)

> La méthode `fetch` est utilisée pour remplir le store avant de rendre la page. C'est comme la méthode `asyncData` sauf qu'elle ne définit pas les données du composant.

- **Type :** `Function`

La méthode `fetch` *si définie*, est appelée avant chaque chargement de composant (**uniquement pour les composants de page**). Elle peut être appelée côté serveur ou avant de naviguer sur la route correspondante.

La méthode `fetch` reçoit l'objet [`context`](/api/context) comme premier argument, vous pouvez l'utiliser afin de récupérer des données et remplir le store. Pour rendre la méthode `fetch` asynchrone, **retournez une promesse**, Nuxt.js attendra la résolution de la promesse avant de faire le rendu du composant.


<div class="Alert Alert--orange">

**Warning**: You **don't** have access of the component instance through `this` inside `fetch` because it is called **before initiating** the component.

</div>


Exemple de `pages/index.vue` :

```html
<template>
  <h1>Étoiles : {{ $store.state.stars }}</h1>
</template>

<script>
export default {
  fetch ({ store, params }) {
    return axios.get('http://mon-api/stars')
    .then((res) => {
      store.commit('setStars', res.data)
    })
  }
}
</script>
```

Vous pouvez également utiliser `async` / `await` pour rendre votre code plus propre :

```html
<template>
  <h1>Étoiles : {{ $store.state.stars }}</h1>
</template>

<script>
export default {
  async fetch ({ store, params }) {
    let { data } = await axios.get('http://mon-api/stars')
    store.commit('setStars', data)
  }
}
</script>
```

## Vuex

Si vous voulez appeler une action du store, utilisez `store.dispatch` à l'intérieur de `fetch`, et assurez vous d'attendre la fin de l'action en utilisant `async` / `await` à l'intérieur :

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
    const { data } = await axios.get('http://mon-api/stars')
    commit('SET_STARS', data)
  }
}
```

### Écouter les changement de query

La méthode `fetch` **n'est pas appelée** sur la chaine de caractère de query par défaut. Si vous souhaitez changer ce comportement, par exemple quand vous construisez un composant de pagination, vous pouvez initialiser les paramètres qui devraient être écoutés avec la propriété `watchQuery` de votre page de composant. Consultez la page [de l'API `watchQuery`](/api/pages-watchquery) pour en savoir plus.

<p style="width: 294px;position: fixed; top : 64px; right: 4px;" class="Alert Alert--orange"><strong>⚠Cette page est actuellement en cours de traduction française. Vous pouvez repasser plus tard ou <a href="https://github.com/vuejs-fr/nuxt" target="_blank">participer à la traduction</a> de celle-ci dès maintenant !</strong></p>
