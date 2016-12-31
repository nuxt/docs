---
title: Configuration BUILD
---

# Build

> Documentation is coming soon

## build.vendor

> Nuxt.js lets you add modules inside the `vendor.bundle.js` file generated to reduce the size of the app bundle. It's really useful when using external modules (like `axios` for example)

To add a module/file inside the vendor bundle, add the `build.vendor` key inside `nuxt.config.js`:

```js
module.exports = {
  build: {
    vendor: ['axios']
  }
}
```

You can also give a path to a file, like a custom lib you created:
```js
module.exports = {
  build: {
    vendor: [
      'axios',
      '~plugins/my-lib.js'
    ]
  }
}
```
