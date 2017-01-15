---
title: 异步数据
description: Nuxt.js 的异步数据示例
github: async-data
---

## 文档

### data (context)

> Nuxt.js *增强了* vue.js 的 `data` 方法，让你可以在设置组件数据之前执行异步操作。

`data` 在每次组件加载之前都会被调用（*前提是有绑定到路由上*）。它会从服务端被调用，或者在导航至相对应的路由之前。

这个 `data` 方法接收的第一个参数是上下文对象 (context)，你可以在方法内获取一些数据，并且最后返回组件数据。如果想异步获取数据的话，Nuxt.js 提供了两种方式，你可以根据喜好选择：

1. 返回一个 `Promise`，Nuxt.js 会等这个 promise 完成后再渲染组件
2. 第二个参数提供了一个回调函数：`callback(err, data)`

返回 `Promise` 的示例：
```js
export default {
  data ({ params }) {
    return axios.get(`https://my-api/posts/${params.id}`)
    .then((res) => {
      return { title: res.data.title }
    })
  }
}
```

使用回调函数 `callback` 参数的示例：
```js
export default {
  data ({ params }, callback) {
    axios.get(`https://my-api/posts/${params.id}`)
    .then((res) => {
      callback(null, { title: res.data.title })
    })
  }
}
```

然后，你就可以在模板里写上想展示的数据啦：

```html
<template>
  <h1>{{ title }}</h1>
</template>
```

### 上下文

`context` 变量的可用属性一览：

| 属性字段 | 类型 | 可用 | 描述 |
|-----|------|--------------|-------------|
| `isClient` | Boolean | 客户端 & 服务端 | 是否来自客户端渲染 |
| `isServer` | Boolean | 客户端 & 服务端 | 是否来自服务端渲染 |
| `isDev` | Boolean | 客户端 & 服务端 | 是否是开发(dev) 模式，在生产环境的数据缓存中用到 |
| `route` | [vue-router 路由](https://router.vuejs.org/en/api/route-object.html) | 客户端 & 服务端 | `vue-router` 路由实例 [见文档](https://router.vuejs.org/en/api/route-object.html) |
| `store` | [vuex 数据流](http://vuex.vuejs.org/en/api.html#vuexstore-instance-properties) | 客户端 & 服务端 | `Vuex.Store` 实例。**只有 `nuxt.config.js` 中设置 `store: true` 才可用 ** |
| `env` | Object | 客户端 & 服务端 | `nuxt.config.js` 中配置的环境变量, 见 [环境变量 api](/api/configuration-env)  |
| `params` | Object | 客户端 & 服务端 | route.params 的别名 |
| `query` | Object | 客户端 & 服务端 | route.query 的别名 |
| `req` | [http.Request](https://nodejs.org/api/http.html#http_class_http_incomingmessage) | 服务端 | Node.js API 的 Request 对象。如果 nuxt 以中间件形式使用的话，这个对象就根据你所使用的框架而定。*`nuxt generate` 不可用*。 |
| `res` | [http.Response](https://nodejs.org/api/http.html#http_class_http_serverresponse) | 服务端 | Node.js API 的 Request 对象。如果 nuxt 以中间件形式使用的话，这个对象就根据你所使用的框架而定。*`nuxt generate` 不可用*。 |
| `redirect` | Function | 客户端 & 服务端 | 用这个方法重定向用户请求到另一个路由。状态码在服务端被使用，默认 302。`redirect([status,] path [, query])` |
| `error` | Function | 客户端 & 服务端 | 用这个方法展示错误页：`error(params)`。`params` 参数应该包含 `statusCode` 和 `message` 字段。 |

### 错误处理

Nuxt.js 在上下文对象 `context` 里添加了一个 `error(params)` 方法，你可以通过调用它来展示错误页面。服务端会根据 `params.statusCode` 渲染出相应的状态码。

返回 `Promise` 的示例：
```js
export default {
  data ({ params, error }) {
    return axios.get(`https://my-api/posts/${params.id}`)
    .then((res) => {
      return { title: res.data.title }
    })
    .catch((e) => {
      error({ statusCode: 404, message: 'Post not found' })
    })
  }
}
```

如果你使用回调函数 `callback` 的话，你可以把传错误对象传进去，Nuxt.js 会自动帮你调用 `error` 方法：
```js
export default {
  data ({ params }, callback) {
    axios.get(`https://my-api/posts/${params.id}`)
    .then((res) => {
      callback(null, { title: res.data.title })
    })
    .catch((e) => {
      callback({ statusCode: 404, message: 'Post not found' })
    })
  }
}
```
