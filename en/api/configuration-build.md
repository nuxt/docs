---
title: "API: The build Property"
description: Nuxt.js lets you customize the webpack configuration for building your web application as you want.
---

# The build Property

> Nuxt.js lets you customize the webpack configuration for building your web application as you want.

## analyze

> Nuxt.js use [webpack-bundle-analyzer](https://github.com/th0r/webpack-bundle-analyzer) to let you see your bundles and how optimize them.

- **Type:** `Boolean` or `Object` (Default: `false`)

If an object, see available properties [here](https://github.com/th0r/webpack-bundle-analyzer#as-plugin).

Example (`nuxt.config.js`):
```js
module.exports = {
  build: {
    analyze: true
    // or
    analyze: {
      analyzerMode: 'static'
    }
  }
}
```

<p class="Alert Alert--teal">**INFO:** You can use the command `nuxt build --analyzer` to build your application and launch the bundle analyzer on [http://localhost:8888](http://localhost:8888)</p>

## babel

- **Type:** `Object`

> Documentation coming soon

## extend

- **Type:** `Function`

> Documentation coming soon

## filenames

- **Type:** `Object`

> Documentation coming soon

## loaders

- **Type:** `Array`
  - **Items:**: `Object`

> Documentation coming soon

## plugins

- **Type:** `Array`

> Documentation coming soon

## postcss

- **Type:** `Array`

> Documentation coming soon

## vendor

> Nuxt.js lets you add modules inside the `vendor.bundle.js` file generated to reduce the size of the app bundle. It's really useful when using external modules (like `axios` for example)

- **Type:** `Array`
 - **Items:** `String`

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
