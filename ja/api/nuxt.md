---
title: 'API: Nuxt(options)'
description: Nuxt.js はプログラム上で、ミドルウェアとして使うことができます。そうすることでウェブアプリケーションをレンダリングする独自のサーバーを自由に作ることができます。
---

# Nuxt.js をプログラムで使う

あなた自身のサーバーと共にミドルウェアや API を使いたい場合もあるかもしれません。
そういった場合、 Nuxt.js をプログラムから利用することが可能です。

Nuxt.js をこのように require できます:

```js
const { Nuxt, Builder } = require('nuxt')
```

## Nuxt のコンストラクタ

Nuxt.js に渡すことができるオプション一覧を見るには、設定のセクションを参照してください。

```js
// Nuxt と Builder モジュールを require します
const { Nuxt, Builder } = require('nuxt')

// Nuxt の設定ファイルを require します
const config = require('./nuxt.config.js')

// 新たに Nuxt のインスタンスを生成します
const nuxt = new Nuxt(config)

// 開発環境の場合にライブビルドとライブリロードを有効化します
if (nuxt.options.dev) {
  new Builder(nuxt).build()
}

// nuxt.render(req, res) もしくは nuxt.renderRoute(route, context) を利用することが可能です
```

手っ取り早く始めるために [nuxt-express](https://github.com/nuxt/express) や [adonuxt](https://github.com/nuxt/adonuxt) スターターを参照できます。

### ログを使ってデバッグする

Nuxt.js のログを表示したいときはファイルのトップに次のコードを追加してください:

```js
process.env.DEBUG = 'nuxt:*'
```
