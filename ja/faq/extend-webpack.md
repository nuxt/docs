---
title: webpack の拡張
description: Webpack の設定を拡張するには？
---

# Webpack の設定を拡張するには？

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
