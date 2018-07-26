---
title: "API: The ignore Property"
description: Define the ignore files for your Nuxt.js application
---

# The ignorePrefix Property

- Type: `String`

> All the files in pages/ layout/ middleware/ store/ will be ignored if they start with this prefix configured by `ignorePrefix`.

Default: `'-'`

By default all files which are started with `-` will be ignored, such as: `store/-foo.js` and `pages/-bar.vue`

# The ignore Property

- Type: `Array`

> Support more customizable ignore patterns like *.test files, files match the glob patterns configured inside `ignore` will be ignored in building.

Default: `['**/*.test.*']`
