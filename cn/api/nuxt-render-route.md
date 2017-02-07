---
title: "API: nuxt.renderRoute(route, context)"
description: 使用指定的上下文对象渲染指定的路由路径。
---

# nuxt.renderRoute(route, context = {})

- 类型： `Function`
- 参数：
  1. `String`，带渲染的路由路径
  2. *可选*, `Object`， 指定的上下文对象，可用的属性键： `req` 和 `res`
- 返回： `Promise`
  - `html`: `String`
  - `error`: `null` 或 `Object`
  - `redirected`: `false` 或 `Object`

> 使用指定的上下文对象渲染指定的路由路径。

和 [nuxt.renderAndGetWindow](/api/nuxt-render-and-get-window) 类似，该方法只用于 [测试目的](guide/development-tools#end-to-end-testing)。

<p class="Alert Alert--info">`nuxt.renderRoute` 需在生成模式（dev: false）的编译过程之后才可调用。</p>

例如：
```js
const Nuxt = require('nuxt')
let config = require('./nuxt.config.js')
config.dev = false
const nuxt = new Nuxt(config)

nuxt.build()
.then(() => {
  return nuxt.renderRoute('/')
})
.then(({ html, error, redirected }) => {
  // html will be always a string

  // error not null when the error layout is displayed, the error format is:
  // { statusCode: 500, message: 'My error message' }

  // redirect is not false when redirect() has been used in data() or fetch()
  // { path: '/other-path', query: {}, status: 302 }
})
```
