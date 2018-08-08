---
title: "API: La classe Nuxt"
description: Nuxt Core Class
---

# Nuxt Class

- Source: **[core/nuxt.js](https://github.com/nuxt/nuxt.js/blob/dev/lib/core/nuxt.js)**

This is the core container which allows all modules and classes communicate with each other. All modules has access to Nuxt instance using `this.nuxt`.

## Tapable plugins

We can register hooks on certain life cycle events.

```js
nuxt.plugin('ready', async nuxt => {
    // Your custom code here
})
```

Plugin   | Arguments              | When
---------|------------------------|------------------------------------------------------------------------------
`ready`  | nuxt                   | All modules initialized and before initializing renderer
`error`  | error args             | An unhandled error by one of Nuxt modules caught
`close`  | -                      | Nuxt instance is gracefully closing
`listen` | ({server, host, port}) | Nuxt **Internal** server starts listening. (Using `nuxt start` or `nuxt dev`)
