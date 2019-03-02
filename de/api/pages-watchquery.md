---
title: "API: The watchQuery Property"
description: Watch query strings and execute component methods on change (asyncData, fetch, validate, layout, ...)
---

# The watchQuery Property

> Watch query strings and execute component methods on change (asyncData, fetch, validate, layout, ...)
- **Type:** `Array` (default: `[]`)

Use the `watchQuery` key to set up a watcher for query strings. If the defined strings change, all component methods (asyncData, fetch, validate, layout, ...) will be called. Watching is disabled by default to improve performance.

```js
export default {
  watchQuery: ['page']
}
```
