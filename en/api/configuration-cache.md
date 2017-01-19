---
title: "API: The cache Property"
description: Nuxt.js use lru-cache to allow cached components for better render performances
---

# The cache Property

> Nuxt.js use [lru-cache](https://github.com/isaacs/node-lru-cache) to allow cached components for better render performances

## Usage

Use the `cache` key in your `nuxt.config.js`:
```js
module.exports = {
  cache: true
}
```

`cache` can be a `Boolean` or an `Object`, if an object, you can use theses keys:

| key  | Optional? | Type | Default | definition |
|------|------------|-----|---------|------------|
| `max` | Optional | Integer | 1000 | The maximum size of the cached components, when the 1001 is added, the first one added will be removed from the cache to let space for the new one. |
| `maxAge` | Optional | Integer | 900000 | Maximum age in ms, default to 15 minutes. |

To see the list of the available options, please look at the [lru-cache options](https://github.com/isaacs/node-lru-cache#options).
