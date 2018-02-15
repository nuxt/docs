---
title: "API : la méthode asyncData"
description: Vous voudriez peut-être récupérer des données et faire le rendu côté serveur. Nuxt.js ajoute une méthode `asyncData` vous permettant de gérer des opérations asynchrones avant de définir les données du composant.
---

# La méthode asyncData

> Vous voudriez peut-être récupérer des données et faire le rendu côté serveur. Nuxt.js ajoute une méthode `asyncData` vous permettant de gérer des opérations asynchrones avant de définir les données du composant.

- **Type:** `Function`

`asyncData` est appelée avant chaque chargement de composant (**uniquement pour les composants de page**). Elle peut être appelée côté serveur ou avant de naviguer sur la route correspondante. Cette méthode reçoit l'objet [context](/api/context) comme premier argument. Vous pouvez l'utiliser afin de récupérer des données et retourner les données du composant.

Le résultat d'asyncData sera **fusionné** avec les données.

```js
export default {
  data () {
    return { project: 'default' }
  },
  asyncData (context) {
    return { project: 'nuxt' }
  }
}
```

<div class="Alert Alert--orange">Vous **N**'avez **PAS** accès à l'instance du composant via `this` au sein de `asyncData` parce que la fonction est appelée **avant d'initialiser** le composant.</div>
