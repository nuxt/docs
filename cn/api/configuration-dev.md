---
title: "API: dev 属性配置"
description: 配置应用是开发模式还是生产模式。
---

# dev 属性配置

- 类型： `Boolean`
- 默认值： `true`

> 配置 Nuxt.js 应用是开发模式还是生产模式。

dev 属性的值会被 [nuxt 命令](/guide/commands) 覆盖：
- 当使用 `nuxt` 命令时，`dev` 会被强制设置成 `true`
- 当使用 `nuxt build`， `nuxt start` 或 `nuxt generate` 命令时，`dev` 会被强制设置成 `false`

所以，在 [编码中使用 nuxt.js](/api/nuxt) 时才会用到该配置。

例如 （`nuxt.config.js`)：
```js
module.exports = {
  dev: (process.env.NODE_ENV !== 'production')
}
```

在 `server.js` 中：
```js
const Nuxt = require('nuxt')
const app = require('express')()
const port = process.env.PORT || 3000

// 传入配置初始化 Nuxt.js 实例
let config = require('./nuxt.config.js')
const nuxt = new Nuxt(config)
app.use(nuxt.render)

// 在开发模式下进行编译
if (config.dev) {
  nuxt.build()
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
}

// 监听指定端口
app.listen(port, '0.0.0.0')
console.log('服务器运行于 localhost:' + port)
```

然后可在 `package.json` 中添加脚本配置如下：
```json
{
  "scripts": {
    "dev": "node server.js",
    "build": "nuxt build",
    "start": "cross-env NODE_ENV=production node server.js"
  }
}
```
提示: 你将会需要执行 `npm install --save-dev cross-env` 来运行上面的例子。
如果你 *不是* 使用 Windows 开发，那么在你的 `start` script 可以移除 cross-env 仅设定 NODE_ENV 。
