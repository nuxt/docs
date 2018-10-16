---
title: "API: generate プロパティ"
description: ユニバーサルなウェブアプリケーションから静的なウェブアプリケーションの生成について設定します。
---

# generate プロパティ

- 型: `オブジェクト`

> ユニバーサルなウェブアプリケーションから静的なウェブアプリケーションの生成について設定します。

`nuxt generate` コマンドを実行するか `nuxt.generate()` を呼び出したとき、Nuxt.js は `generate` プロパティで定義された設定を使います。

## dir

- 型: `文字列`
- デフォルト: `'dist'`

`nuxt generate` で作成されるディレクトリ名です。

## interval

- 型: `数値`
- デフォルト: `0`

２つのレンダーの間でのインターバルで、ウェブアプリケーションからの潜在的な API に対して溢れでないようにするためのものです。

## minify

- 型: '文字列'
- デフォルト:

```js
minify: {
  collapseBooleanAttributes: true,
  collapseWhitespace: false,
  decodeEntities: true,
  minifyCSS: true,
  minifyJS: true,
  processConditionalComments: true,
  removeAttributeQuotes: false,
  removeComments: false,
  removeEmptyAttributes: true,
  removeOptionalTags: true,
  removeRedundantAttributes: true,
  removeScriptTypeAttributes: false,
  removeStyleLinkTypeAttributes: false,
  removeTagWhitespace: false,
  sortAttributes: true,
  sortClassName: false,
  trimCustomFragments: true,
  useShortDoctype: true
}
```

generate 処理で生成される HTML ファイルをミニファイするために Nuxt.js で使われている [html-minifier](https://github.com/kangax/html-minifier) のデフォルト設定を変更することができます。

## routes

- 型: `配列`

generate コマンドでは [動的なルーティング](/guide/routing#動的なルーティング) は無視されます。

例:

```bash
-| pages/
---| index.vue
---| users/
-----| _id.vue
```

ルート `/` のみが Nuxt.js によって生成されます。

動的なパラメーターを用いたルートを生成させたい場合は、動的なルーティングの配列をセットする必要があります。

`nuxt.config.js` 内に `/users/:id` のルーティングを追加します:

```js
module.exports = {
  generate: {
    routes: [
      '/users/1',
      '/users/2',
      '/users/3'
    ]
  }
}
```

そして `nuxt generate` を実行します:

```bash
[nuxt] Generating...
[...]
nuxt:render Rendering url / +154ms
nuxt:render Rendering url /users/1 +12ms
nuxt:render Rendering url /users/2 +33ms
nuxt:render Rendering url /users/3 +7ms
nuxt:generate Generate file: /index.html +21ms
nuxt:generate Generate file: /users/1/index.html +31ms
nuxt:generate Generate file: /users/2/index.html +15ms
nuxt:generate Generate file: /users/3/index.html +23ms
nuxt:generate HTML Files generated in 7.6s +6ms
[nuxt] Generate done
```

いいですね。しかし、もし **動的なパラメータ** が必要な場合はどうでしょう？

1. `Promise` を返す `関数` を使う
2. `コールバック` と一緒に `関数` を使う

### Promise を返す関数を使う

`nuxt.config.js`

```js
const axios = require('axios')

module.exports = {
  generate: {
    routes: function () {
      return axios.get('https://my-api/users')
      .then((res) => {
        return res.data.map((user) => {
          return '/users/' + user.id
        })
      })      
    }
  }
}
```

### コールバックと一緒に関数を使う

`nuxt.config.js`

```js
const axios = require('axios')

module.exports = {
  generate: {
    routes: function (callback) {
      axios.get('https://my-api/users')
      .then((res) => {
        var routes = res.data.map((user) => {
          return '/users/' + user.id
        })
        callback(null, routes)
      })
      .catch(callback)
    }
  }
}
```
