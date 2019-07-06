---
title: "API: The Generator Class"
description: Nuxt Generator Class
---

# Generator Class

- Source: **[generator/generator.js](https://github.com/nuxt/nuxt.js/blob/dev/packages/generator/src/generator.js)**


## Tapable plugins

We can register hooks on certain life cycle events.

```js
nuxt.plugin('generator', generator => {
    generator.plugin('generate', ({routes}) => {
        // ...
    }))
})
```

Plugin           | Arguments                   | When
-----------------|-----------------------------|--------------------------------------------------------------------------------
`generateRoutes` | {generator, generateRoutes} | After resolving routes to generate so we have change to customize them
`generate`       | {generator, routes}         | Just before start generating routes. routes are decorated with payloads
