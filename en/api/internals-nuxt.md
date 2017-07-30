---
title: "API: The Nuxt Module"
description: Nuxt Core Module
---

# Nuxt Module

- Source: **[core/nuxt.js](https://github.com/nuxt/nuxt.js/blob/dev/lib/core/nuxt.js)**

This is the core container which allows all modules communicate with each other. 
Almost all modules has access to nuxt instance using `this.nuxt`.

## Tapable plugins

We can register hooks on certain life cycle events.

```js
nuxt.plugin('ready', async nuxt => {
    // Your custom code here
})
```

Plugin        | Arguments              | When
--------------|------------------------|--------------------------------------------------------------------------------
`ready`       | nuxt                   | All modules initialized and before initializing renderer
`error`       | error args             | An unhandled error by one of nuxt modules caught
`close`       | -                      | Nuxt instance is gracefully closing
`listen`      | ({server, host, port}) | Nuxt **Internal** server starts listening. (Using `nuxt start` or `nuxt dev`)
