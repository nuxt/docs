---
title: Window or Document undefined
description: Window or Document undefined with Nuxt.js?
---

# Window or Document undefined?

This is due to the server-side rendering.
If you need to specify that you want to import a resource only on the client-side, you need to use the `process.BROWSER_BUILD` variable.

For example, in your .vue file:
```js
if (process.BROWSER_BUILD) {
  require('external_library')
}
```

nuxt.config.js
```js
  build: {
    vendor: ['external_library']
  }
```
