---
title: "API: env プロパティ"
description: クライアントとサーバー間で環境変数を共有します。
---

<!-- title: "API: The env Property" -->
<!-- description: Share environment variables between client and server. -->

<!-- # The env Property -->

# env プロパティ

<!-- - Type: `Object` -->

- タイプ: `オブジェクト`

<!-- \> Nuxt.js lets you create environment variables that will be shared for the client and server-side. -->

Nuxt.js ではクライアントサイドとサーバーサイドで共有される環境変数を作成できます。

<!-- Example (`nuxt.config.js`): -->

例（`nuxt.config.js`）:

```js
module.exports = {
  env: {
    baseUrl: process.env.BASE_URL || 'http://localhost:3000'
  }
}
```

<!-- This lets me create a `baseUrl` property that will be equal to the `BASE_URL` environment variable if defined, otherwise, equal to `http://localhost:3000`. -->

このように記述すると `baseUrl` プロパティは、環境変数 `BASE_URL` が定義されていればそれと同様になり、そうでなければ `http://localhost:3000` と同様になります。

<!-- Then, I can access my `baseUrl` variable with 2 ways: -->

そして `baseUrl` 変数にアクセスするには 2つの方法があります:

<!-- 1. Via `process.env.baseUrl` -->
<!-- 2. Via `context.baseUrl`, see [context api](/api#context) -->

1. `process.env.baseUrl` を経由する
2. `context.baseUrl` を経由する。詳細は [context API](/api#context)

<!-- You can use the `env` property for giving public token for example. -->

例えば公開トークンを付与するために `env` プロパティを使うことができます。

<!-- For the example above, we can use it to configure [axios](https://github.com/mzabriskie/axios). -->

そのような例として [axios](https://github.com/mzabriskie/axios) を設定するために env プロパティを使うことができます。

`plugins/axios.js`:

```js
import axios from 'axios'

export default axios.create({
  baseURL: process.env.baseUrl
})
```

<!-- Then, in your pages, you can import axios like this: `import axios from '~plugins/axios'` -->

そうするとページ内で次のように axios をインポートできます: `import axios from '~plugins/axios'`
