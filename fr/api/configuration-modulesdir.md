---
title: "API: The modulesDir Property (EN)"
description: Define the modules directory for your Nuxt.js application
---

# The modulesDir Property (EN)

- Type: `Array`
- Default: `['node_modules']`

> Used to set the modules directories for path resolving, for example: Webpack's `resolveLoading`, `nodeExternals` and `postcss`. Configuration path is relative to [options.rootDir](/api/configuration-rootdir) (default: `process.cwd()`).

Example (`nuxt.config.js`):

```js
export default {
  modulesDir: ['../../node_modules']
}
```

Setting this field may be necessary if your project is organized as a Yarn workspace-styled mono-repository.

<p style="width: 294px;position: fixed; top : 64px; right: 4px;" class="Alert Alert--orange"><strong>⚠Cette page est actuellement en cours de traduction française. Vous pouvez repasser plus tard ou <a href="https://github.com/vuejs-fr/nuxt" target="_blank">participer à la traduction</a> de celle-ci dès maintenant !</strong></p>
