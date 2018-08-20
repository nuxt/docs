---
title: "API: env プロパティ"
description: クライアントサイドとサーバーサイドで環境変数を共有します。
---

# env プロパティ

- 型: `オブジェクト`

> Nuxt.js ではクライアントサイドとサーバーサイドで共有される環境変数を作成できます。

例（`nuxt.config.js`）:

```js
module.exports = {
  env: {
    baseUrl: process.env.BASE_URL || 'http://localhost:3000'
  }
}
```

このように記述すると `baseUrl` プロパティは、環境変数 `BASE_URL` が定義されていればそれと同じになり、そうでなければ `http://localhost:3000` になります。

そして `baseUrl` 変数にアクセスするには 2つの方法があります:

1. `process.env.baseUrl` 経由でアクセスする
2. `context.baseUrl` を経由する。詳細は [コンテキスト API](/api#コンテキスト)

例えば `env` プロパティを使って公開トークンを付与することができます。

上記の例として env プロパティを使って [axios](https://github.com/mzabriskie/axios) を設定できます。

`plugins/axios.js`:

```js
import axios from 'axios'

export default axios.create({
  baseURL: process.env.baseUrl
})
```

このように記述するとページ内で `import axios from '~plugins/axios'` という具合に axios をインポートできます。
