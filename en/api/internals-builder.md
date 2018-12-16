---
title: "API: The Builder Class"
description: Nuxt `Builder` Class
---

# Builder Class

- Source: **[builder/builder.js](https://github.com/nuxt/nuxt.js/blob/dev/packages/builder/src/builder.js)**

## Hooks

We can register hooks on certain life cycle events.

```js
// Add hook for build
this.nuxt.hook('build:done', (builder) => {
  ...
})
```

Hook                 | Arguments                                  | When
---------------------|--------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------
`build:before`       | (nuxt, buildOptions)                       | Before Nuxt build started
`build:templates`    | ({ templatesFiles, templateVars, resolve }) | Generating `.nuxt` template files
`build:extendRoutes` | (routes, resolve)                          | Generating routes
`build:compile`      | ({ name, compiler })                       | Before webpack compile (compiler is a webpack `Compiler` instance), if universal mode, called twice with name `'client'` and `'server'`
`build:compiled`     | ({ name, compiler, stats })                | webpack build finished
`build:done`         | (nuxt)                                     | Nuxt build finished
