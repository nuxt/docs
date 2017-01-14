---
title: 页面上下文
description: 上下文是一个很有用的对象，包含很多用于抽象化客户端、服务端之间差异的方法。
---

# 上下文

`context` 变量的可用属性一览：

| 属性字段 | 类型 | 可用 | 描述 |
|-----|------|--------------|-------------|
| `isClient` | Boolean | 客户端 & 服务端 | 是否来自客户端渲染 |
| `isServer` | Boolean | 客户端 & 服务端 | 是否来自服务端渲染 |
| `isDev` | Boolean | 客户端 & 服务端 | 是否是开发(dev) 模式，在生产环境的数据缓存中用到 |
| `route` | [vue-router 路由](https://router.vuejs.org/en/api/route-object.html) | 客户端 & 服务端 | `vue-router` 路由实例 [见文档](https://router.vuejs.org/en/api/route-object.html) |
| `store` | [vuex store](http://vuex.vuejs.org/en/api.html#vuexstore-instance-properties) | 客户端 & 服务端 | `Vuex.Store` 实例。**只有 `nuxt.config.js` 中设置 `store: true` 才可用 ** |
| `env` | Object | 客户端 & 服务端 | `nuxt.config.js` 中配置的环境变量, 见 [环境变量 api](/api/configuration-env)  |
| `params` | Object | 客户端 & 服务端 | route.params 的别名 |
| `query` | Object | 客户端 & 服务端 | route.query 的别名 |
| `req` | [http.Request](https://nodejs.org/api/http.html#http_class_http_incomingmessage) | 服务端 | Node.js API 的 Request 对象。如果 nuxt 以中间件形式使用的话，这个对象就根据你所使用的框架而定。*`nuxt generate` 不可用*。 |
| `res` | [http.Response](https://nodejs.org/api/http.html#http_class_http_serverresponse) | 服务端 | Node.js API 的 Request 对象。如果 nuxt 以中间件形式使用的话，这个对象就根据你所使用的框架而定。*`nuxt generate` 不可用*。 |
| `redirect` | Function | 客户端 & 服务端 | 用这个方法重定向用户请求到另一个路由。状态码在服务端被使用，默认 302。`redirect([status,] path [, query])` |
| `error` | Function | 客户端 & 服务端 | 用这个方法展示错误页：`error(params)`。`params` 参数应该包含 `statusCode` 和 `message` 字段。 |
