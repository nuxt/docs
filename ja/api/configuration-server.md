---
title: "API: server プロパティ"
description: Nuxt.js では、アプリケーションのサーバー接続用の変数を `nuxt.config.js` 内に定義できます。
---

# server プロパティ

- 型: `Object`

> Nuxt.js では、アプリケーションのサーバー接続用の変数を `nuxt.config.js` 内に定義できます。

## 基本的な例 (`nuxt.config.js`):

```js
export default {
  server: {
    port: 8000, // デフォルト: 3000
    host: '0.0.0.0', // デフォルト: localhost,
  }
}
```

こうすることで、Nuxt.js サーバーインスタンスの [ホストとポート](/faq/host-port) を指定できます。

## HTTPS 設定を用いた例

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

## ソケット設定を用いた例

```js
export default {
  server: {
    socket: '/tmp/nuxt.socket'
  }
}
```
