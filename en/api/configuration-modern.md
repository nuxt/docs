---
title: "API: The modern Property"
description: Build modern bundles
---

# The modern Property

> This feature is inspired by [vue-cli modern mode](https://cli.vuejs.org/guide/browser-compatibility.html#modern-mode) 

- Type: `String` or `Boolean`
  - Default: false
  - Possible values:
    - `'client'`: Serve modern bundle `<script type="module">` and legacy bundle `<script nomodule>` scripts, also `<link rel="modulepreload">` for modern bundle.
    - `'server'` or `true`: Server side will check browser version and serve corresponding modern or legacy bundle.
    - `false`: Disable modern build

**Info:** you can use the command `nuxt build --modern=[type]` or `nuxt build -m=[type]` to build modern bundles.

> Please refer [Phillip Walton's post](https://philipwalton.com/articles/deploying-es2015-code-in-production-today/) for more knowledge of modern build
