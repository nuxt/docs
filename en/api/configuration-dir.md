---
title: "API: The dir Property"
description: Define the custom directories for your Nuxt.js application
---

# The dir Property

- Type: `Object`
- Default:

```js
{
  assets: 'assets',
  layouts: 'layouts',
  middleware: 'middleware',
  pages: 'pages',
  static: 'static',
  store: 'store'
}
```

> Define the custom directories for your Nuxt.js application

Example (`nuxt.config.js`):

```js
export default {
  dir: {
    assets: 'custom-assets',
    layouts: 'custom-layouts',
    middleware: 'custom-middleware',
    pages: 'custom-pages',
    static: 'custom-static',
    store: 'custom-store'
  }
}
```
