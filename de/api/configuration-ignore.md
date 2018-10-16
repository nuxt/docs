---
title: "API: The ignore Property"
description: Define the ignore files for your Nuxt.js application
---

# The ignorePrefix Property

- Type: `String`
- Default: `'-'`

> Any file in pages/ layout/ middleware/ or store/ will be ignored during building if its filename starts with the prefix specified by `ignorePrefix`.

By default all files which start with `-` will be ignored, such as `store/-foo.js` and `pages/-bar.vue`. This allows for co-locating tests, utilities, and components with their callers without themselves being converted into routes, stores, etc.

# The ignore Property

- Type: `Array`
- Default: `['**/*.test.*']`

> More customizable than `ignorePrefix`: all files matching glob patterns specified inside `ignore` will be ignored in building.

