---
title: "API: dev プロパティ"
description: 開発モードかプロダクションモードかを指定します。
---

<!-- title: "API: The dev Property" -->
<!-- description: Define the development or production mode. -->

<!-- # The dev Property -->

# dev プロパティ

<!-- - Type: `Boolean` -->
<!-- - Default: `true` -->

- タイプ: `ブーリアン`
- デフォルト: `true`

<!-- \> Define the development or production mode of nuxt.js -->

> Nuxt.js の開発モードなのかプロダクションモードなのかを指定します。

<!-- This property is overwritten by [nuxt commands](/guide/commands): -->

このプロパティは [nuxt コマンド](/guide/commands) によって上書きされます:

<!-- - `dev` is forced to `true` with `nuxt` -->
<!-- - `dev` is force to `false` with `nuxt build`, `nuxt start` and `nuxt generate` -->

- `nuxt` コマンドを使うときは `dev` は強制的に `true` になります
- `nuxt build`、`nuxt start`、`nuxt generate` コマンドを使うときは `dev` は強制的に `false` になります

<!-- This property should be used when using [nuxt.js programmatically](/api/nuxt): -->

このプロパティは [Nuxt.js をプログラムで使う](/api/nuxt) ときに合わせて使うと良いです:

<!-- Example: -->

例:

`nuxt.config.js`

```js
module.exports = {
  dev: (process.env.NODE_ENV !== 'production')
}
```

`server.js`

<!-- ```js -->
<!-- const Nuxt = require('nuxt') -->
<!-- const app = require('express')() -->
<!-- const port = process.env.PORT || 3000 -->

<!-- // We instantiate Nuxt.js with the options -->
<!-- let config = require('./nuxt.config.js') -->
<!-- const nuxt = new Nuxt(config) -->
<!-- app.use(nuxt.render) -->

<!-- // Build only in dev mode -->
<!-- if (config.dev) { -->
<!--   nuxt.build() -->
<!--   .catch((error) => { -->
<!--     console.error(error) -->
<!--     process.exit(1) -->
<!--   }) -->
<!-- } -->

<!-- // Listen the server -->
<!-- app.listen(port, '0.0.0.0') -->
<!-- console.log('Server listening on localhost:' + port) -->
<!-- ``` -->

```js
const Nuxt = require('nuxt')
const app = require('express')()
const port = process.env.PORT || 3000

// Nuxt.js をオプションを使ってインスタンス化する
let config = require('./nuxt.config.js')
const nuxt = new Nuxt(config)
app.use(nuxt.render)

// 開発モードのときのみビルドする
if (config.dev) {
  nuxt.build()
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
}

// サーバーを Listen する
app.listen(port, '0.0.0.0')
console.log('Server listening on localhost:' + port)
```

<!-- Then in your `package.json`: -->

それから `package.json` に次のように書きます:

```json
{
  "scripts": {
    "dev": "node server.js",
    "build": "nuxt build",
    "start": "cross-env NODE_ENV=production node server.js"
  }
}
```

<!-- Note: You'll need to run `npm install --save-dev cross-env` for the above example to work. If you're *not* developing on Windows you can leave cross-env out of your `start` script and set `NODE_ENV` directly. -->

情報: 上の例を動かすためには `npm install --save-dev cross-env` を実行する必要があります。もし Windows で開発しているの *でない* ならば、`start` スクリプトから cross-env を削除して、直接 `NODE_ENV` をセットすることもできます。
