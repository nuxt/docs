---
title: 组件
description: Using external modules and plugins with nuxt.js
github: plugins-vendor
---

## 文档

### 配置：`build.vendor`

> Nuxt.js 允许你在自动生成的 `vendor.bundle.js` 文件中添加一些模块，以减少应用 bundle 的体积。这里说的是一些你所依赖的第三方模块 (比如 `axios`)

想要把模块打包进 vendor bundle，你可以在 `nuxt.config.js` 的 `build.vendor` 字段中配置：

```js
const { join } = require('path')

module.exports = {
  build: {
    vendor: [
      'axios', // node 模块
      join(__dirname, './js/my-library.js') // 自定义文件
    ]
  }
}
```

### 配置：`plugins`

> Nuxt.js 允许你定义一些 JS 插件，它们会在 vue.js 根应用初始化之前被调用。

比如我想用 [vue-notifications](https://github.com/se-panfilov/vue-notifications) 去校验用户输入数据，我就需要在程序运行前配置好这个插件。

`plugins/vue-notifications.js` 文件：

```js
import Vue from 'vue'
import VueNotifications from 'vue-notifications'

Vue.use(VueNotifications)
```

然后在 `nuxt.config.js` 的 `plugins` 字段中配置：

```js
const { join } = require('path')

module.exports = {
  build: {
    vendor: ['vue-notifications']
  },
  plugins: [ '~plugins/vue-notifications') ]
}
```

我在这里用 `~plugins` 的原因是 nuxt.js 给 `plugins/` 目录创建了一个别名，这与 `join(__dirname, './plugins/vue-notifications.js')` 等价。

我在 `vendor` 字段里添加了 `vue-notifications`，以确保我在组件中调用 `require('vue-notifications')` 时，它不会被打包进其它的 build 里。

#### 只在浏览器 build 里

有些插件可能只是在浏览器里使用，所以你可以用 `process.BROWSER_BUILD` 变量来检查插件是从客户端还是服务端运行。

Example:
```js
import Vue from 'vue'
import VueNotifications from 'vue-notifications'

if (process.BROWSER_BUILD) {
  Vue.use(VueNotifications)
}
```

#### 只在服务端 build 里

如果你需要引入一些只在服务端运行的库，你可以用 `process.SERVER_BUILD` 变量，当 webpack 创建 `server.bundle.js` 文件时，它会被设为 `true`。
