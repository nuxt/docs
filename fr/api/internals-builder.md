---
title: "API: The Builder Class"
description: Nuxt Builder Class
---

# Builder Class (En)

- Source: **[builder/builder.js](https://github.com/nuxt/nuxt.js/blob/dev/lib/builder/builder.js)**


## Tapable plugins

<p style="width: 294px;position: fixed; top : 64px; right: 4px;" class="Alert Alert--orange"><strong>⚠Cette page est actuellement en cours de traduction française. Vous pouvez repasser plus tard ou <a href="https://github.com/vuejs-fr/nuxt" target="_blank">participer à la traduction</a> de celle-ci dès maintenant !</strong></p><p>We can register hooks on certain life cycle events.</p>

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
