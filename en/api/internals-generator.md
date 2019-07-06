---
title: "API: The Generator Class"
description: Nuxt Generator Class
---

# Generator Class

- Source: **[generator/generator.js](https://github.com/nuxt/nuxt.js/blob/dev/packages/generator/src/generator.js)**

## Hooks

We can register hooks on certain life cycle events.

Hook                    | Arguments                   | When
------------------------|-----------------------------|-----------------------------------------------
`generate:before`       | (nuxt, generateOptions)     | Hook on before generation
`generate:distRemoved`  | (nuxt)                      | Hook on  destination folder  cleaned
`generate:distCopied`   | (nuxt)                      | Hook on copy static and built files
`generate:page`         | ({route, path, html})       | Hook to let user update the path & html
`generate:routeCreated` | ({route, path, errors})       | Hook on saving generated page success
`generate:extendRoutes` | (routes)                    | Hook to let user update the routes to generate
`generate:routeFailed`  | (route, errors)             | Hook on saving generated page failure
`generate:done`         | (nuxt, errors)              | Hook on generation finished
