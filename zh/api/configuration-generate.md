---
title: "API: generate 属性配置"
description: 配置 Nuxt.js 应用生成静态站点的具体方式。
---

# generate 属性配置

- 类型： `Object`

> 配置 Nuxt.js 应用生成静态站点的具体方式。

当运行 `nuxt generate` 命令或在编码中调用 `nuxt.generate()` 时，Nuxt.js 会使用 `generate` 属性的配置。

## dir

- 类型： 'String'
- 默认值： `'dist'`

`nuxt generate` 生成的目录名称。

## minify

- 类型: `Object`
- 默认值:

```js
minify: {
  collapseBooleanAttributes: true,
  collapseWhitespace: false,
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
  sortClassName: false,
  trimCustomFragments: true,
  useShortDoctype: true
}
```

Nuxt.js 在生成静态文件时使用 [html-minifier](https://github.com/kangax/html-minifier) 对 html 文件进行压缩，你可以修改上述的默认配置来调整压缩的行为。

## routes

- 类型： `Array`

在 Nuxt.js 执行 `generate` 命令时，[动态路由](/guide/routing#动态路由) 会被忽略。

例如：

```bash
-| pages/
---| index.vue
---| users/
-----| _id.vue
```

上面的目录结构，Nuxt.js 只会生成路由 `/` 对应的静态文件。（译者注：因为 `/users/:id` 是动态路由）
如果想让 Nuxt.js 为动态路由也生成静态文件，你需要指定动态路由参数的值，并配置到 `routes` 数组中去。

例如，我们可以在 `nuxt.config.js` 中为 `/users/:id` 路由配置如下：
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

当我们运行 `nuxt generate` 命令时：
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
2. 使用一个回调是 `callback(err, params)` 的 `函数`。

### 返回一个 Promise 对象的函数

`nuxt.config.js`
```js
const axios = require('axios')

module.exports = {
  generate: {
    routes: function () {
      return axios.get('https://my-api/users')
      .then((res) => {
        return res.data.map((user) => {
          return '/users/' + user.id
        })
      })      
    }
  }
}
```

### 参数是一个 Node 风格的回调函数

`nuxt.config.js`
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
