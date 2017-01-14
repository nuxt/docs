---
title: Nuxt.js 模块
---

# nuxt.render(req, res)

你可以通过 `nuxt.render` 函数，把 Nuxt.js 变成你 Node.js 服务端的中间件。

Express.js 结合实例:
```js
const app = require('express')()
const Nuxt = require('nuxt')

const nuxt = new Nuxt()
nuxt.build()
.then(() => {
  // 用 Nuxt.js 渲染每个路由
  app.use(nuxt.render)
  // 服务端监听
  app.listen(3000)
})
```

<p class="Alert">建议把 **nuxt.render** 放到中间件列表的最后面，因为它不会再调用 next() 方法，而是直接处理你 web 应用的页面渲染。</p>
