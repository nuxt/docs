---
title: "API: The modern Property"
description: Build and server a modern bundle
---

# The modern Property

> This feature is inspired by [vue-cli modern mode](https://cli.vuejs.org/guide/browser-compatibility.html#modern-mode) 

- Type: `String` or `Boolean`
  - Default: false
  - Possible values:
    - `'client'`: Serve both, the modern bundle `<script type="module">` and the legacy bundle `<script nomodule>` scripts, also provide a `<link rel="modulepreload">` for the modern bundle. Every browser that understands the `module` type will load the modern bundle while older browsers fall back to the legacy (transpiled) one.
    - `'server'` or `true`: The Node.js server will check browser version based on the user agent and serve the corresponding modern or legacy bundle.
    - `false`: Disable modern build

The two versions of bundles are:

1. Modern bundle: targeting modern browsers that support ES modules
1. Legacy bundle: targeting older browsers based on babel config (IE9 compatible by default).

**Info:** you can use commands `nuxt build/start --modern=[type]` or `nuxt build/start -m=[type]` to build/start modern bundles, so you can specify modern commands inside the `package.json` scripts:

```json
{
  "scripts": {
    "build:modern": "nuxt build --modern=server",
    "start:modern": "nuxt start --modern=server"
  }
}
```

> Please refer [Phillip Walton's excellent post](https://philipwalton.com/articles/deploying-es2015-code-in-production-today/) for more knowledge regarding modern builds.
