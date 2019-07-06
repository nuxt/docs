---
title: "API: The watchQuery Property (EN)"
description: Watch query strings and execute component methods on change (asyncData, fetch, validate, layout, ...)
---

# The watchQuery Property (EN)

> Watch query strings and execute component methods on change (asyncData, fetch, validate, layout, ...)
- **Type:** `Boolean` or `Array` (default: `[]`)

<p style="width: 294px;position: fixed; top : 64px; right: 4px;" class="Alert Alert--orange"><strong>⚠Cette page est actuellement en cours de traduction française. Vous pouvez repasser plus tard ou <a href="https://github.com/vuejs-fr/nuxt" target="_blank">participer à la traduction</a> de celle-ci dès maintenant !</strong></p><p>Use the `watchQuery` key to set up a watcher for query strings. If the defined strings change, all component methods (asyncData, fetch, validate, layout, ...) will be called. Watching is disabled by default to improve performance.</p>

If you want to set up a watcher for all query strings, set `watchQuery: true`.

```js
export default {
  watchQuery: ['page']
}
```

<p style="width: 294px;position: fixed; top : 64px; right: 4px;" class="Alert Alert--orange"><strong>⚠Cette page est actuellement en cours de traduction française. Vous pouvez repasser plus tard ou <a href="https://github.com/vuejs-fr/nuxt" target="_blank">participer à la traduction</a> de celle-ci dès maintenant !</strong></p>
