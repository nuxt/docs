---
title: Window or Document undefined
description: Window or Document undefined with Nuxt.js?
---

# Window or Document undefined?

This is due to the server-side rendering.
If you need to specify that you want to import a resource only on the client-side, you need to use the `process.client` variable.

For example, in your .vue file:
```js
if (process.client) {
  require('external_library')
}
```

Don't forget to add your library in the [vendor bundle](/api/configuration-build#build-vendor) in your `nuxt.config.js`:
```js
  build: {
    vendor: ['external_library']
  }
```
