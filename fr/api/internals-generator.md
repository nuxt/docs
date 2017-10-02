---
title: "API: The Generator Class"
description: Nuxt Generator Class
---

# Generator Class (En)

- Source: **[builder/generator.js](https://github.com/nuxt/nuxt.js/blob/dev/lib/builder/generator.js)**


## Tapable plugins

<p style="width: 294px;position: fixed; top : 64px; right: 4px;" class="Alert Alert--orange"><strong>⚠Cette page est actuellement en cours de traduction française. Vous pouvez repasser plus tard ou <a href="https://github.com/vuejs-fr/nuxt" target="_blank">participer à la traduction</a> de celle-ci dès maintenant !</strong></p><p>We can register hooks on certain life cycle events.</p>

```js
nuxt.plugin('generator', generator => {
    generator.plugin('generate', ({routes}) => {
        // ...
    }))
})
```

Plugin               | Arguments                               | When
---------------------|-----------------------------------------|--------------------------------------------------------------------------------
`generateRoutes`     | {generator, generateRoutes}             | After resolving routes to generate so we have change to customize them
`generate`           | {generator, routes}                     | Just before start generating routes. routes are decorated with payloads
