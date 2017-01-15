---
title: 配置构建
description: Nuxt.js 允许你根据服务端需求，自定义 webpack 的配置参数。
---

# Build

> Nuxt.js 允许你根据服务端需求，自定义 webpack 的配置参数。

## build.vendor

> Nuxt.js 允许你在自动生成的 `vendor.bundle.js` 文件中添加一些模块，以减少应用 bundle 的体积。这里说的是一些你所依赖的第三方模块 (比如 `axios`)

想要把模块打包进 vendor bundle，你可以在 `nuxt.config.js` 的 `build.vendor` 字段中配置：

```js
module.exports = {
  build: {
    vendor: ['axios']
  }
}
```

你也可以配置文件路径，比如一些自己写的库:

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
