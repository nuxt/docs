---
title: "API: The cache Property"
description: Nuxt.js use lru-cache to allow cached components for better render performances
---

# The cache Property (EN)

> Nuxt.js use [lru-cache](https://github.com/isaacs/node-lru-cache) to allow cached components for better render performances

## Usage

- Type: `Boolean` or `Object` (Default: `false`)

<p style="width: 294px;position: fixed; top : 64px; right: 4px;" class="Alert Alert--orange"><strong>⚠Cette page est actuellement en cours de traduction française. Vous pouvez repasser plus tard ou <a href="https://github.com/vuejs-fr/nuxt" target="_blank">participer à la traduction</a> de celle-ci dès maintenant !</strong></p><p>If an object, see [lru-cache options](https://github.com/isaacs/node-lru-cache#options).</p>

Use the `cache` key in your `nuxt.config.js`:
```js
module.exports = {
  cache: true
  // or
  cache: {
    max: 1000,
    maxAge: 900000
  }
}
```

If `cache` is set to  `true` the default keys given are:

| key  | Optional? | Type | Default | definition |
|------|------------|-----|---------|------------|
| `max` | Optional | Integer | 1000 | The maximum size of the cached components, when the 1001 is added, the first one added will be removed from the cache to let space for the new one. |
| `maxAge` | Optional | Integer | 900000 | Maximum age in ms, default to 15 minutes. |
