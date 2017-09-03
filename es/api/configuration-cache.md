---
title: "API: The cache Property"
description: Nuxt.js use lru-cache to allow cached components for better render performance.
---

# The cache Property

> Nuxt.js use [lru-cache](https://github.com/isaacs/node-lru-cache) to allow cached components for better render performance.

## Usage

- Type: `Boolean` or `Object` (Default: `false`)

If an object, see [lru-cache options](https://github.com/isaacs/node-lru-cache#options).

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
