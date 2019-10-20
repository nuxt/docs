---
title: "API: The watchQuery Property"
description: Watch query strings and execute component methods on change (asyncData, fetch, validate, layout, ...)
---

> Watch query strings and execute component methods on change (asyncData, fetch, validate, layout, ...)
- **Type:** `Boolean` or `Array` or `Function` (default: `[]`)

Use the `watchQuery` key to set up a watcher for query strings. If the defined strings change, all component methods (asyncData, fetch, validate, layout, ...) will be called. Watching is disabled by default to improve performance.

If you want to set up a watcher for all query strings, set `watchQuery: true`.

```js
export default {
  watchQuery: ['page']
}
```

You can also use the function `watchQuery(newQuery, oldQuery)` to have more refined watchers.

```js
export default {
  watchQuery (newQuery, oldQuery) {
    // Only execute component methods if the old query string contained `bar`
    // and the new query string contains `foo`
    return newQuery.foo && oldQuery.bar
  }
}
```
