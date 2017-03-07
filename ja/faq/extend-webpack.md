---
title: Webpack 設定を拡張する
description: Webpack の設定を拡張するには？
---

<!-- title: Extend Webpack -->
<!-- description: How to extend webpack config? -->

<!-- # How to extend webpack config? -->

# Webpack の設定を拡張するには？

<!-- You can extend the webpack configuration via the `extend` option in your `nuxt.config.js`: -->

`nuxt.config.js` 内の `extend` オプションで Webpack の設定を拡張できます:

```js
module.exports = {
  build: {
     extend (config, { isDev, isClient }) {
       // ...
     }
  }
}
```
