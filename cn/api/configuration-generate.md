---
title: "API: generate 属性配置"
description: 配置 Nuxt.js 应用生成静态站点的具体方式。
---

# generate 属性配置

- 类型： `Object`

> 配置 Nuxt.js 应用生成静态站点的具体方式。

当运行 `nuxt generate` 命令或在编码中调用 `nuxt.generate()` 时，Nuxt.js 会使用 `generate` 属性的配置。

## dir

- 类型： 'Sring'
- 默认值： `'dist'`

`nuxt generate` 生成的目录名称。

## minify
 
- 类型: `Object`
- 默认值:

```js
minify: {
  collapseBooleanAttributes: true,
  collapseWhitespace: true,
  decodeEntities: true,
  minifyCSS: true,
  minifyJS: true,
  processConditionalComments: true,
  removeAttributeQuotes: false,
  removeComments: false,
  removeEmptyAttributes: true,
  removeOptionalTags: true,
  removeRedundantAttributes: true,
  removeScriptTypeAttributes: false,
  removeStyleLinkTypeAttributes: false,
  removeTagWhitespace: false,
  sortAttributes: true,
  sortClassName: true,
  trimCustomFragments: true,
  useShortDoctype: true
}
```
你可以修改 nuxt.js generate 所使用的 [html-minifier](https://github.com/kangax/html-minifier) 预设配置来建立最小化 html 档案。


## routes

- 类型： `Array`


当使用 [动态路由](/guide/routing#动态路由) 时，你需要为每个动态的路由定义至少一个对应的参数映射。

例如：

```bash
-| pages/
---| index.vue
---| users/
-----| _id.vue
```

Nuxt.js 仅生成 `/` 路由。

如果你希望 nuxt.js 使用动态参数产生动态路由，你需要给予一组路由组合的文字阵列。

我们增加 routes 的设定 `/users/:id` 在 `nuxt.config.js`档案中:
```js
module.exports = {
  generate: {
    routes: [
      '/users/1',
      '/users/2',
      '/users/3'
    ]
  }
}
```

当我们再次运行 `nuxt generate` 命令时就不会有错误异常了：
```bash
[nuxt] Generating...
[...]
nuxt:render Rendering url / +154ms
nuxt:render Rendering url /users/1 +12ms
nuxt:render Rendering url /users/2 +33ms
nuxt:render Rendering url /users/3 +7ms
nuxt:generate Generate file: /index.html +21ms
nuxt:generate Generate file: /users/1/index.html +31ms
nuxt:generate Generate file: /users/2/index.html +15ms
nuxt:generate Generate file: /users/3/index.html +23ms
nuxt:generate HTML Files generated in 7.6s +6ms
[nuxt] Generate done
```

棒极了，但是如果路由**动态参数**的值是动态的而不是固定的，应该怎么做呢？
1. 使用一个返回 `Promise` 对象类型 的 `函数`。
2. 使用一个参数是 `callback(err, params)` 的 `函数`。

### 返回一个 Promise 对象

`nuxt.config.js`：
```js
import axios from 'axios'

module.exports = {
  generate: {
    routes: function () {
      return axios.get('https://my-api/users')
      .then((res) => {
        return res.data.map((user) => {
          return '/users/' + user.id
        }
      })
    }
  }
}
```

### 参数是一个 Node 风格的回调函数

`nuxt.config.js`：
```js
const axios = require('axios')

module.exports = {
  generate: {
    routes: function (callback) {
      axios.get('https://my-api/users')
      .then((res) => {
        var routes = res.data.map((user) => {
          return '/users/' + user.id
        })
        callback(null, routes)
      })
      .catch(callback)
    }
  }
}
```
