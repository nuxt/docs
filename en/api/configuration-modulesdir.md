---
title: "API: The modulesDir Property"
description: Define the modules directory for your Nuxt.js application
---

# The modulesDir Property

- Type: `Array`
- Default: `['node_modules']`

> Used to set the modules directories for path resolving, for example: webpack resolveLoading, nodeExternal and postcss. Configuration path is relative to [options.rootDir](/api/configuration-rootdir) (default: `process.cwd()`).

Example (`nuxt.config.js`):

```js
export default {
  modulesDir: ['../../node_modules']
}
```

Setting this field may be necessary if your project is organized as a Yarn workspace-styled mono-repository.

