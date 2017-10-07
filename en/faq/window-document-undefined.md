---
title: window or document undefined
description: window or document undefined with Nuxt.js?
---

# window or document undefined?

This is due to the server-side rendering. If you need to specify that you want to import a resource only on the client-side, you need to use the `process.browser` variable.

For example, in your `.vue` file:

```js
if (process.browser) {
  require('external_library')
}
```

If you are using this library within multiple files, we recommend that you add it into your [vendor bundle](/api/configuration-build#build-vendor) via `nuxt.config.js`:

```js
  build: {
    vendor: ['external_library']
  }
```
