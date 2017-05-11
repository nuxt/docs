---
title: Données asynchrones
description: Vous voudrez peut-être récupérer des données et faire le rendu côté serveur. Nuxt.js ajoute une méthode `asyncData` pour vous permettre de gérer les opérations asynchrones avant de définir les données du composant.
---

> Vous voudrez peut-être récupérer des données et faire le rendu côté serveur. Nuxt.js ajoute une méthode `asyncData` pour vous permettre de gérer les opérations asynchrones avant de définir les données du composant.

## La méthode asyncData

Parfois, vous souhaitez simplement récupérer des données et les faire le rendu côté serveur sans utiliser de *store*. `asyncData` est appelé avant chaque chargement du composant (**uniquement pour les composants pages**).
On peut l'appeler côté serveur ou avant de naviguer vers la route correspondante.
Cette méthode reçoit [le contexte](/api#context) comme premier argument, vous pouvez l'utiliser pour récupérer des données et nuxt.js fusionnera avec les données du composant.

<div class="Alert Alert--orange">Vous **n'avez pas** accès à l'instance du composant via `this` au sein de `data` parce que la fonction est appelée **avant d'initier** le composant.</div>

Nuxt.js vous propose différentes façons d'utiliser `asyncData`. Choisissez celle avec laquelle vous êtes le plus familier:

1. Retourner une `Promise`. Nuxt.js attends que la Promise soit résolue avant de faire le rendu du composant.
2. En utilisant [async/await](https://github.com/lukehoban/ecmascript-asyncawait) ([en savoir plus](https://zeit.co/blog/async-and-await))
3. En définissant un callback comme second argument. Il doit être appelé comme suit: `callback(err, data)`

### Retourner une Promise
```js
export default {
  asyncData ({ params }) {
    return axios.get(`https://my-api/posts/${params.id}`)
    .then((res) => {
      return { title: res.data.title }
    })
  }
}
```

### Utiliser async/await
```js
export default {
  async asyncData ({ params }) {
    let { data } = await axios.get(`https://my-api/posts/${params.id}`)
    return { title: data.title }
  }
}
```

### Utiliser un callback
```js
export default {
  asyncData ({ params }, callback) {
    axios.get(`https://my-api/posts/${params.id}`)
    .then((res) => {
      callback(null, { title: res.data.title })
    })
  }
}
```

### Afficher les données

Le résultat d'`asyncData` sera **mergé** avec les données.
Vous pouvez afficher les données au sein du template comme habituellement.

```html
<template>
  <h1>{{ title }}</h1>
</template>
```

## Le Context

Pour voir la liste des attributs disponibles dans le `context`, jeter un oeil à [API Pages data](/api).

### Accéder aux données des routes dynamiques

Vous pouvez utiliser l'objet contexte injecté à la propriété `asyncData` afin d'accéder aux données des routes dynamiques. Par example, les données des routes dynamiques peuvent être accédées en utilisant le nom du fichier ou du dossier qui la configure; si vous définissez un fichier nommé `_slug.vue`, vous pourrez y accéder via `context.params.slug`.

## Gestion des erreurs

Nuxt.js ajoute la méthode `error(params)` au `context`, vous pouvez l'appeler pour afficher la page d'erreur. `Params.statusCode` sera également utilisé pour faire le rendu avec le code de status approprié côté serveur.

Exemple avec une `Promise`:
```js
export default {
  asyncData ({ params, error }) {
    return axios.get(`https://my-api/posts/${params.id}`)
    .then((res) => {
      return { title: res.data.title }
    })
    .catch((e) => {
      error({ statusCode: 404, message: 'Post not found' })
    })
  }
}
```

Si vous utilisez l'argument `callback`, vous pouvez l'appeler directement en lui passant l'erreur et nuxt.js appellera la méthode `error` pour vous:
```js
export default {
  asyncData ({ params }, callback) {
    axios.get(`https://my-api/posts/${params.id}`)
    .then((res) => {
      callback(null, { title: res.data.title })
    })
    .catch((e) => {
      callback({ statusCode: 404, message: 'Post not found' })
    })
  }
}
```

Pour modifier la page d'erreur, voir [Views layouts section](/guide/views#layouts).
