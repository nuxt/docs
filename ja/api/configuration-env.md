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

## Automatic injection of environment variables

If you define environment variables starting with `NUXT_ENV_` in the build phase (f.ex. `NUXT_ENV_COOL_WORD=freezing nuxt build`, they'll be automatically injected into the process environment. Be aware that they'll potentially take precedence over defined variables in your `nuxt.config.js` with the same name.

## process.env == {}

Note that Nuxt uses webpack's `definePlugin` to define the environmental variable. This means that the actual `process` or `process.env` from Node.js is neither available nor defined. Each of the `env` properties defined in nuxt.config.js is individually mapped to `process.env.xxxx` and converted during compilation.

Meaning, `console.log(process.env)` will output `{}` but `console.log(process.env.you_var)` will still output your value. When webpack compiles your code, it replaces all instances of `process.env.your_var` to the value you've set it to. ie: `env.test = 'testing123'`. If you use `process.env.test` in your code somewhere, it is actually translated to 'testing123'.

before

```
if (process.env.test == 'testing123')
```

after

```
if ('testing123' == 'testing123')
```
