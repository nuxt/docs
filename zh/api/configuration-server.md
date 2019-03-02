---
title: "API: server 属性"
description: Nuxt.js允许您为应用程序内部定义服务器访问变量 `nuxt.config.js`.
---

# server 属性

- 类型: `Object`

> Nuxt.js允许您为应用程序内部`nuxt.config.js`中定义服务器访问主机和端口.

## Basic example (`nuxt.config.js`):

```js
export default {
  server: {
    port: 8000, // default: 3000
    host: '0.0.0.0', // default: localhost,
  }
}
```

这允许您指定Nuxt.js服务器实例的[主机和端口](/faq/host-port)。

## 使用 HTTPS 配置的示例

```js
import path from 'path'
import fs from 'fs'

export default {
  server: {
    https: {
      key: fs.readFileSync(path.resolve(__dirname, 'server.key')),
      cert: fs.readFileSync(path.resolve(__dirname, 'server.crt'))
    }
  }
}
```

## 使用 sockets 配置的示例

```js
export default {
  server: {
    socket: '/tmp/nuxt.socket'
  }
}
```
