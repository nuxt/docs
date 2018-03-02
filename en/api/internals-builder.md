---
title: "API: The Builder Class"
description: Nuxt `Builder` Class
---

# Builder Class

- Source: **[builder/builder.js](https://github.com/nuxt/nuxt.js/blob/dev/lib/builder/builder.js)**


## Tapable plugins

We can register hooks on certain life cycle events.

```js
  // Add hook for build
  this.nuxt.hook('build:done', (builder) => {
    ...
  })

```

Plugin         | Arguments                               | When
---------------|-----------------------------------------|--------------------------------------------------------------------------------

`build:before`           |   |  Before build started
`build:templates`        |   | Generating `.nuxt` template files    
`build:extendRoutes`     |   | Generating routes
`build:compile`          |   | Before webpack compile (compiler is a `MultiCompiler` instance) 
`build:compiled`         |   | webpack build finished
`build:close`            |   | *description missing*    
`build:done`             |   |  webpack build was done
