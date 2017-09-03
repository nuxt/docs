---
title: Window or Document undefined
description: Window or Document undefined with Nuxt.js?
---

# Window or Document undefined?

This is due to the server-side rendering.
If you need to specify that you want to import a resource only on the client-side, you need to use the `process.browser` variable.

For example, in your `.vue` file:
```js
if (process.browser) {
  require('external_library')
}
```

If your are using this library into multiple files, we recommend your to add it into your [vendor bundle](/api/configuration-build#build-vendor) via `nuxt.config.js`:
```js
  build: {
    vendor: ['external_library']
  }
```
