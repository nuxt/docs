---
title: Nuxt.js 模块
description: 你可以在自己的服务端中，把 Nuxt.js 当成中间件去渲染你的 web 应用。
---

# 以编程形式使用 Nuxt.js

如果你打算用自己的中间件和 API 运行你的服务端的话，欢迎以编程的形式使用 Nuxt.js。
因为 Nuxt.js 基于 ES2015 编写，所以它的代码相对来说更有趣、更易读。它没用到任何的转译器，只依赖于 V8 内核中已经实现的功能。因此，Nuxt.js 需要 Node.js `4.0` 或更高的运行环境。

你可以这样引入 Nuxt.js:
```js
const Nuxt = require('nuxt')
```

### Nuxt(options)

想了解 Nuxt.js 所有的可选项，请查阅「配置」章节的文章。

```js
const options = {}

const nuxt = new Nuxt(options)
nuxt.build()
.then(() => {
  // 这里可以用 nuxt.render(req, res) 或者 nuxt.renderRoute(route, context)
})
```
