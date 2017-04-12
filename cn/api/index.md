---
title: "API: asyncData 方法"
description: 也许你想要在 server-side 获取资料并且渲染，Nuxt.js 增加了 `asyncData` 方法让你能异步获取或处理数据在完成设定组件资料之前。
---

# asyncData  方法

> 也许你想要在 server-side 获取资料并且渲染，Nuxt.js 增加了 `asyncData` 方法让你能异步获取或处理数据在完成设定组件资料之前。

- **类型：** `Function`

`asyncData` 會在載組件前被呼叫 ( **只有在 pages 組件** )。
它會於 server-side 被呼叫，或是路由前往到相對應頁面之前。
這個方法會接收到第一個參數為 **context** (object) ，你可以使用它獲取一些資料並且返回組件資料。

asyncData 回传值将会与 data 的回传值 **合并**

```js
export default {
  data () {
    return { project: 'default' }
  },
  asyncData (context) {
    return { project: 'nuxt' }
  }
}
```

<div class="Alert Alert--orange">注意：由于`data`方法是在组件 **初始化** 前被调用的，所以在方法内是没有办法通过 `this` 来引用组件的实例对象。</div>

## 上下文对象

`context` 变量的可用属性一览：

| 属性字段 | 类型 | 可用 | 描述 |
|-----|------|--------------|-------------|
| `isClient` | Boolean | 客户端 & 服务端 | 是否来自客户端渲染 |
| `isServer` | Boolean | 客户端 & 服务端 | 是否来自服务端渲染 |
| `isDev` | Boolean | 客户端 & 服务端 | 是否是开发(dev) 模式，在生产环境的数据缓存中用到 |
| `route` | [vue-router 路由](https://router.vuejs.org/zh-cn/api/route-object.html) | 客户端 & 服务端 | `vue-router` 路由实例。|
| `store` | [vuex 数据流](http://vuex.vuejs.org/zh-cn/api.html#vuexstore-instance-properties) | 客户端 & 服务端 | `Vuex.Store` 实例。**只有[vuex 数据流](/guide/vuex-store)存在相关配置时可用。** |
| `env` | Object | 客户端 & 服务端 | `nuxt.config.js` 中配置的环境变量, 见 [环境变量 api](/api/configuration-env)  |
| `params` | Object | 客户端 & 服务端 | route.params 的别名 |
| `query` | Object | 客户端 & 服务端 | route.query 的别名 |
| `req` | [http.Request](https://nodejs.org/api/http.html#http_class_http_incomingmessage) | 服务端 | Node.js API 的 Request 对象。如果 nuxt 以中间件形式使用的话，这个对象就根据你所使用的框架而定。*`nuxt generate` 不可用*。 |
| `res` | [http.Response](https://nodejs.org/api/http.html#http_class_http_serverresponse) | 服务端 | Node.js API 的 Request 对象。如果 nuxt 以中间件形式使用的话，这个对象就根据你所使用的框架而定。*`nuxt generate` 不可用*。 |
| `redirect` | Function | 客户端 & 服务端 | 用这个方法重定向用户请求到另一个路由。状态码在服务端被使用，默认 302。`redirect([status,] path [, query])` |
| `error` | Function | 客户端 & 服务端 | 用这个方法展示错误页：`error(params)`。`params` 参数应该包含 `statusCode` 和 `message` 字段。 |
