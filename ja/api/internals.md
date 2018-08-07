---
title: 'API: Nuxt のモジュールの紹介'
description: Nuxt の内部をより深く理解する
---

# Nuxt Internals

Nuxt.js には開発者が Nuxt Core の好きな部分を柔軟な API を使って拡張するための十分にモジュール化された仕組みがあります。

自分でモジュールを作ってみたいのなら、詳しくは [モジュールガイド](/guide/modules) をご覧ください。

このセクションは、Nuxt の内部に慣れ親しむためにあり、自分でモジュールを書くときに理解を深めるためのリファレンスとして使えます。

### コア

これらのクラスは Nuxt の Nuxt の中核にあり、実行時もビルド時も存在しなければなりません。

#### Nuxt

- [`Nuxt` クラス](/api/internals-nuxt)
- ソース: [core/nuxt.js](https://github.com/nuxt/nuxt.js/blob/dev/lib/core/nuxt.js)

#### Renderer

- [`Renderer` クラス](/api/internals-renderer)
- ソース: [core/renderer.js](https://github.com/nuxt/nuxt.js/blob/dev/lib/core/renderer.js)

#### ModuleContainer

- [`ModuleContainer` クラス](/api/internals-module-container)
- ソース: [core/module.js](https://github.com/nuxt/nuxt.js/blob/dev/lib/core/module.js)

### ビルド

これらのクラスはビルドあるいは開発モードのためだけに必要です。

#### Builder

- [`Builder` クラス](/api/internals-builder)
- ソース: [builder/builder.js](https://github.com/nuxt/nuxt.js/blob/dev/lib/builder/builder.js)

#### Generator

- [`Generator` クラス](/api/internals-generator)
- ソース: [generator/generator.js](https://github.com/nuxt/nuxt.js/blob/dev/lib/builder/generator.js)

### 共通

#### Utils

- ソース: [common/utils.js](https://github.com/nuxt/nuxt.js/blob/dev/lib/common/utils.js)

#### Options

- ソース: [common/options.js](https://github.com/nuxt/nuxt.js/blob/dev/lib/common/options.js)

## パッケージの使い方

Nuxt はすべてのクラスをデフォルトでエクスポートします。これらを得るには:

```js
const { Nuxt, Builder, Utils } = require('nuxt')
```

## よくあるパターン

すべての Nuxt クラスは `nuxt` インスタンスとオプションへの参照を持っています。
すべてのクラスは [`tappable`](https://github.com/nuxt/tappable) を拡張したものであり、
これにより `options` と `nuxt` にアクセスするための一貫した API を実現しています。

```js
const Tapable = require('tappable')

class SomeClass extends Tapable {
  constructor (nuxt, builder) {
    super()
    this.nuxt = nuxt
    this.options = nuxt.options
  }

  someFunction() {
    // We have access to `this.nuxt` and `this.options`
  }
}
```

クラスは「プラグ可能」であるので、追加のフックを登録する場合はメインの `nuxt` コンテナにプラグインを登録します。

```js
class FooClass extends Tapable {
  constructor (nuxt, builder) {
    super()
    this.nuxt = nuxt
    this.options = nuxt.options

    this.nuxt.applyPluginsAsync('foo', this)
  }
}
```

`foo` モジュールにフックするにはこうします:

```js
nuxt.hook('foo', foo => {
    // ...
})
```
