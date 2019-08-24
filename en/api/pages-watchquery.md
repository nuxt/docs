---
title: "API: The watchQuery Property"
description: Watch query strings and execute component methods on change (asyncData, fetch, validate, layout, ...)
---

# The watchQuery Property

> Watch query strings and execute component methods on change (asyncData, fetch, validate, layout, ...)
- **Type:** `Boolean`, `Array` (default: `[]`) or `Function (newQuery, oldQuery): boolean` (since Nuxt v2.9)

Use the `watchQuery` key to set up a watcher for query strings. If the defined strings change, all component methods (asyncData, fetch, validate, layout, ...) will be called. Watching is disabled by default to improve performance.

If you want to set up a watcher for all query strings, set `watchQuery: true`.

```js
export default {
  watchQuery: ['page']
}
```

If you want to setup watch for specific query strings, set `watchQuery: []`.

```js
// Enable for route includes `page` query string
export default {
  watchQuery: ['page']
}
```

If you want to setup watch dynamically, set `watchQuery(newQuery, oldQuery) {}`, return `true/false` for `enabling/disabling`.

```js
// Enable for new route includes `page` query string but old route doesn't
export default {
  watchQuery (newQuery, oldQuery) {
    return newQuery.page && !oldQuery.page
  }
}
```
