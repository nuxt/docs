---
title: "API: The Renderer Class"
description: Nuxt Renderer Class
---

# Renderer Class (En)

- Source: **[core/renderer.js](https://github.com/nuxt/nuxt.js/blob/dev/lib/core/renderer.js)**

<p style="width: 294px;position: fixed; top : 64px; right: 4px;" class="Alert Alert--orange"><strong>⚠Cette page est actuellement en cours de traduction française. Vous pouvez repasser plus tard ou <a href="https://github.com/vuejs-fr/nuxt" target="_blank">participer à la traduction</a> de celle-ci dès maintenant !</strong></p><p>This class is exporting a connect middleware which handles and serves all SSR and asset requests.</p>

## Tapable plugins

We can register hooks on certain life cycle events.

```js
nuxt.plugin('renderer', renderer => {
    renderer.plugin('setupMiddleware', app => {
        // 
    })
})
```

Plugin               | Arguments                 | When
---------------------|---------------------------|--------------------------------------------------------------------------------
`ready`              | renderer                  | SSR Middleware and all resources are ready
`setupMiddleware`    | connect instance (app)    | Before nuxt adds it's middleware stack. We can use it to register custom server side middleware.
