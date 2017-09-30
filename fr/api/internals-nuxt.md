---
title: "API: The Nuxt Class"
description: Nuxt Core Class
---

# Nuxt Class (En)

- Source: **[core/nuxt.js](https://github.com/nuxt/nuxt.js/blob/dev/lib/core/nuxt.js)**

<p style="width: 294px;position: fixed; top : 64px; right: 4px;" class="Alert Alert--orange"><strong>⚠Cette page est actuellement en cours de traduction française. Vous pouvez repasser plus tard ou <a href="https://github.com/vuejs-fr/nuxt" target="_blank">participer à la traduction</a> de celle-ci dès maintenant !</strong></p><p>This is the core container which allows all modules and classes communicate with each other. 
All modules has access to nuxt instance using `this.nuxt`.</p>

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
