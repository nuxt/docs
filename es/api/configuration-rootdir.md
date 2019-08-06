---
title: "API: The rootDir Property"
description: Define the workspace of Nuxt.js application
---

# The rootDir Property

- Type: `String`
- Default: `process.cwd()`

> Define the workspace of your Nuxt.js application.

This property is overwritten by [nuxt commands](/guide/commands) and set to the argument of the command (example: `nuxt my-app/` will set the `rootDir` to `my-app/` with its absolute path).

This property should be used when using [Nuxt.js programmatically](/api/nuxt).

<div class="Alert Alert--blue">

The downside of this option is that your `node_modules` directory should be inside the `rootDir` folder. If you want to set the path of the application without the node_modules, use the [`srcDir` option](/api/configuration-srcdir).

</div>
