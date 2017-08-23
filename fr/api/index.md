---
title: "API: La méthode asyncData"
description: Vous voudrez peut-être récupérer des données et faire le rendu côté serveur. Nuxt.js ajoute une méthode `asyncData` vous permettant de gérer des opérations asynchrones avant de définir les données du composant.
---

# La méthode asyncData

> Vous voudrez peut-être récupérer des données et faire le rendu côté serveur. Nuxt.js ajoute une méthode `asyncData` vous permettant de gérer des opérations asynchrones avant de définir les données du composant.

- **Type:** `Function`

`asyncData` est appelée avant chaque chargement de composant (**uniquement pour les composants pages**). Elle peut être appelée côté serveur ou avant de nvaiguer sur la route correspondante. Cette méthode reçoit le **context** (objet) comme premier argument; vous pouvez l'utiliser afin de récupérer des données et retourner les données du composant.

Le résultat d'asyncData sera **mergé** avec les données.

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

<div class="Alert Alert--orange">Vous **n'avez pas** accès à l'instance du composant via `this` au sein de `data` parce que la fonciton est appelée **avant d'initialiser** le composant.</div>

## Context

Liste des key disponibles dans `context`:

| Key | Type | Disponibilité | Description |
|-----|------|--------------|-------------|
| `isClient` | Boolean | Client & Serveur | Booléen vous permettant de savoir si vous faites le rendu côté client |
| `isServer` | Boolean | Client & Serveur | Booléen vous permettant de savoir si vous faites le rendu côté serveur |
| `isDev` | Boolean | Client & Serveur | Booléen vous permettan de savoir si vous êtes en mode dev, peut être utile pour cacher certaines données en production |
| `route` | [vue-router route](https://router.vuejs.org/en/api/route-object.html) | Client & Server | `vue-router` route instance. |
| `store` | [vuex store](http://vuex.vuejs.org/en/api.html#vuexstore-instance-properties) | Client & Server | `Vuex.Store` instance. **Disponible uniquement si [vuex store](/guide/vuex-store) est configuré.** |
| `env` | Object | Client & Serveur | Variables d'environnement configurées dans `nuxt.config.js`, voir [env api](/api/configuration-env)  |
| `params` | Object | Client & Serveur | Alias de route.params |
| `query` | Object | Client & Serveur | Alias de route.query |
| `req` | [http.Request](https://nodejs.org/api/http.html#http_class_http_incomingmessage) | Serveur | Requête du serveur node.js. Si nuxt est utilisé comme middleware, l'objet req pourrait être différent en fonction du framework que vous utilisez. **Non disponible via `nuxt generate`*. |
| `res` | [http.Response](https://nodejs.org/api/http.html#http_class_http_serverresponse) | Serveur | Réponse du serveur node.js. Si nuxt est utilisé comme middleware, l'bjet res pourrait être différent en fonction du framework que vous utilisez. **Non disponible via `nuxt generate`*. |
| `redirect` | Function | Client & Serveur | Utilisez cette méthode pour rediriger l'utilisateur d'une route à une autre; le code de statut utilisé côté serveur par défaut est 302. `redirect([status,] path [, query])` |
| `error` | Function | Client & Serveur | Utilisez cette méthode pour afficher la page d'erreur: `error(params)`. `params` devrait avoir les champs `statusCode` et `message`. |
