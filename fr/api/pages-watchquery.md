---
title: "API: la propriété watchQuery"
description: Observer les chaînes de requête et exécuter les méthodes du composant lors d'une modification (asyncData, fetch, validate, layout, ...)
---

> Observer les chaînes de requête et exécuter les méthodes du composant lors de modifications (asyncData, fetch, validate, layout, ...)
- **Type:** `Boolean` our `Array` our `Function` (défaut: `[]`)

Utilisez la clé `watchQuery` pour configurer un watcher pour les chaînes de requête. Si les chaînes définies changent, toutes les méthodes du composant (asyncData, fetch, validate, layout, ...) seront appelées. Watching est désactivée par défaut pour améliorer les performances.

Si vous souhaitez configurer un watcher pour toutes les chaînes de requête, définissez `watchQuery: true`.

```js
export default {
  watchQuery: ['page']
}
```

Vous pouvez également utiliser la fonction `watchQuery(newQuery, oldQuery)` pour avoir des watchers plus affinés.

```js
export default {
  watchQuery (newQuery, oldQuery) {
    // Only execute component methods if the old query string contained `bar`
    // and the new query string contains `foo`
    return newQuery.foo && oldQuery.bar
  }
}
```
