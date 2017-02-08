---
title: "API: 环境变量配置"
description: Nuxt.js 让你可以配置在客户端和服务端共享的环境变量。
---

# 环境变量配置

- 类型： `Object`

> Nuxt.js 让你可以配置在客户端和服务端共享的环境变量。

例如 (`nuxt.config.js`)：

```js
module.exports = {
  env: {
    baseUrl: process.env.BASE_URL || 'http://localhost:3000'
  }
}
```

以上配置我们创建了一个 `baseUrl` 环境变量，如果应用设定了 `BASE_URL` 环境变量，那么 `baseUrl` 的值等于 `BASE_URL` 的值，否则其值为 `http://localhost:3000`。

然后， 我们可以通过以下两种方式来使用 `baseUrl` 变量：
1. 通过 `process.env.baseUrl`
2. 通过 `context.baseUrl`，请参考 [context api](/api#上下文对象)

你可以使用 `env` 属性配置第三方服务的公钥信息。

举个例子， 我们可以利用它来配置 [axios](https://github.com/mzabriskie/axios) 的自定义实例。

`plugins/axios.js`：
```js
import axios from 'axios'

export default axios.create({
  baseURL: process.env.baseUrl
})
```

然后在页面中，我们可以使用 `import axios from '~plugins/axios'` 引入 `axios` 模块。
