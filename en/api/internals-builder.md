---
title: "API: The Builder Class"
description: Nuxt Builder Class
---

# Builder Class

- Source: **[builder/builder.js](https://github.com/nuxt/nuxt.js/blob/dev/lib/builder/builder.js)**


## Tapable plugins

We can register hooks on certain life cycle events.

```js
nuxt.plugin('build', builder => {
    builder.plugin('extendRoutes', async ({routes}) =>  {
        // ...
    })
})
```

Plugin               | Arguments                               | When
---------------------|-----------------------------------------|--------------------------------------------------------------------------------
`build`              | builder                                 | First build started
`built`              | builder                                 | First build finished
`extendRoutes`       | {routes, templateVars, r}               | Generating routes
`generate`           | {builder, templatesFiles, templateVars} | Generating `.nuxt` template files
`done`               | {builder, stats}                        | Webpack build was done
`compile`            | {builder, compiler}                     | Before webpack compile (compiler is a MultiCompiler instance)
`compiled`           | builder                                 | Webpack build finished
