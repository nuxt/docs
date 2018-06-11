---
title: "API: The watchQuery Property"
description: Watch query strings and execute component methods on change (asyncData, fetch, validate, layout, ...)
---

# The watchQuery Property (EN)

> Watch query strings and execute component methods on change (asyncData, fetch, validate, layout, ...)
- **Type:** `Array` (default: `[]`)

<p style="width: 294px;position: fixed; top : 64px; right: 4px;" class="Alert Alert--orange"><strong>⚠Cette page est actuellement en cours de traduction française. Vous pouvez repasser plus tard ou <a href="https://github.com/vuejs-fr/nuxt" target="_blank">participer à la traduction</a> de celle-ci dès maintenant !</strong></p><p>Use the `watchQuery` key to set up a watcher for query strings. If the defined strings change, all component methods (asyncData, fetch, validate, layout, ...) will be called. Watching is disabled by default to improve performance.</p>

```js
export default {
  watchQuery: ['page']
}
```
