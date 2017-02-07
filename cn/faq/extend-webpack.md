---
title: 如果扩展 Webpack 的配置
description: 如果扩展 Webpack 的配置？
---

# 如果扩展 Webpack 的配置？

你可以通过 `nuxt.config.js` 文件中的 `extend` 配置项来扩展 Webpack 的配置：

```js
module.exports = {
  build: {
     extend (config, { isDev, isClient }) {
       // ...
     }
  }
}
```
