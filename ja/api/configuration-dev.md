---
title: 'API: dev プロパティ'
description: 開発モードかプロダクションモードかを指定します。
---

# dev プロパティ

- 型: `ブーリアン`
- デフォルト: `true`

> Nuxt.js の開発モードなのかプロダクションモードなのかを指定します。

このプロパティは [nuxt コマンド](/guide/commands) によって上書きされます:

- `nuxt` コマンドを使うときは `dev` は強制的に `true` になります
- `nuxt build`、`nuxt start`、`nuxt generate` コマンドを使うときは `dev` は強制的に `false` になります

このプロパティは [Nuxt.js をプログラムで使う](/api/nuxt) ときに合わせて使うと良いです:

例:

`nuxt.config.js`

```js
module.exports = {
  dev: (process.env.NODE_ENV !== 'production')
}
```

`server.js`

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
  new Builder(nuxt).build()
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
}

// サーバーを Listen する
app.listen(port, '0.0.0.0').then(() => {
  nuxt.showOpen()
})
```

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

情報: 上の例を動かすためには `npm install --save-dev cross-env` を実行する必要があります。もし Windows で開発しているの *でない* ならば、`start` スクリプトから cross-env を削除して、直接 `NODE_ENV` をセットすることもできます。
