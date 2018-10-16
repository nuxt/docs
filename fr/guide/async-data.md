---
title: Données asynchrones
description: Vous voudriez peut-être récupérer des données et faire le rendu côté serveur. Nuxt.js ajoute une méthode `asyncData` pour vous permettre de gérer les opérations asynchrones avant de définir les données du composant.
---

> Vous voudriez peut-être récupérer des données et faire le rendu côté serveur.
Nuxt.js ajoute une méthode `asyncData` pour vous permettre de gérer les opérations asynchrones avant de définir les données du composant.

## La méthode asyncData

Parfois vous souhaitez simplement récupérer des données et faire le rendu côté serveur sans utiliser de store.
`asyncData` est appelé avant chaque chargement du composant (**uniquement pour les composants de pages**). On peut l'appeler côté serveur ou avant de naviguer vers la route correspondante. Cette méthode reçoit [le contexte](/api#context) comme premier argument, vous pouvez l'utiliser pour récupérer différentes données et Nuxt.js les fusionnera avec les données du composant.

<div class="Alert Alert--orange">Vous **n'**avez **PAS** accès à l'instance du composant via `this` au sein de `asyncData` parce que la fonction est appelée **avant d'initier** le composant.</div>

Nuxt.js vous propose différentes façons d'utiliser `asyncData`. Choisissez celle avec laquelle vous êtes le plus à l'aise :

1. Retourner une `Promise`. Nuxt.js attend que la promesse soit résolue avant de faire le rendu du composant.
2. En utilisant [async / await](https://github.com/lukehoban/ecmascript-asyncawait) ([en savoir plus](https://zeit.co/blog/async-and-await))
3. En définissant une fonction de rappel comme second argument. Elle doit être appelée comme suit : `callback(err, data)`

<div class="Alert Alert--grey">Nous utilisons [axios](https://github.com/mzabriskie/axios) pour faire des requêtes HTTP isomorphiques, nous recommendons <strong>fortement</strong> d'utiliser notre [module axios](https://axios.nuxtjs.org/) pour vos projets Nuxt.</div>

### Retourner une promesse

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

### Utiliser async / await

```js
export default {
  async asyncData ({ params }) {
    let { data } = await axios.get(`https://my-api/posts/${params.id}`)
    return { title: data.title }
  }
}
```

### Utiliser une fonction de rappel

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

Le résultat de `asyncData` sera **fusionné** avec les données.
Vous pouvez afficher les données au sein du template comme habituellement :

```html
<template>
  <h1>{{ title }}</h1>
</template>
```

## Le contexte

Pour voir la liste des attributs disponibles dans `context`, jeter un œil à [la partie Essentielle de l'API pour `context`](/api/context).

### Accéder aux données des routes dynamiques

Vous pouvez utiliser l'objet du contexte injecté à la propriété `asyncData` afin d'accéder aux données des routes dynamiques. Par exemple, les données des routes dynamiques peuvent être accédées en utilisant le nom du fichier ou du dossier qui la configure. Si vous définissez un fichier nommé `_slug.vue`, vous pourrez y accéder via `context.params.slug`.

### Écouter les changement de query

La méthode `asyncData` **n'est pas appelée** sur la chaine de caractère de query par défaut. Si vous souhaitez changer ce comportement, par exemple quand vous construisez un composant de pagination, vous pouvez initialiser les paramètres qui devraient être écoutés avec la propriété `watchQuery` de votre page de composant. Consultez la page [de l'API `watchQuery`](/api/pages-watchquery) pour en savoir plus.

## Gestion des erreurs

Nuxt.js ajoute la méthode `error(params)` au `context`, vous pouvez l'appeler pour afficher la page d'erreur. `params.statusCode` sera également utilisée pour faire le rendu avec le code de statut approprié côté serveur.

Exemple avec une `Promise` :

```js
export default {
  asyncData ({ params, error }) {
    return axios.get(`https://my-api/posts/${params.id}`)
    .then((res) => {
      return { title: res.data.title }
    })
    .catch((e) => {
      error({ statusCode: 404, message: 'Billet non trouvé' })
    })
  }
}
```

Si vous utilisez l'argument `callback`, vous pouvez l'appeler directement en lui passant l'erreur et Nuxt.js appellera la méthode `error` pour vous :

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

Pour personnaliser la page d'erreur, consultez [la partie Mises en page de la section Vues](/guide/views#mises-en-page).
