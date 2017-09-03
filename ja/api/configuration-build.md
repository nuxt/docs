---
title: "API: build プロパティ"
description: Nuxt.js ではウェブアプリケーションを自由にビルドできるよう Webpack 設定をカスタマイズできます。
---

# build プロパティ

> Nuxt.js ではウェブアプリケーションを自由にビルドできるよう Webpack 設定をカスタマイズできます。

## analyze

> Nuxt.js では [webpack-bundle-analyzer](https://github.com/th0r/webpack-bundle-analyzer) を使ってバンドルファイルと最適化の仕方を視覚化できます。

- タイプ: `ブーリアン` または `オブジェクト`
- デフォルト: `false`

オブジェクトの場合は、利用できるプロパティは [こちら](https://github.com/th0r/webpack-bundle-analyzer#as-plugin) を参照してください。

例（`nuxt.config.js`）:

```js
module.exports = {
  build: {
    analyze: true
    // または
    analyze: {
      analyzerMode: 'static'
    }
  }
}
```

<p class="Alert Alert--teal">**情報:** `nuxt build --analyze` または `nuxt build -a` コマンドを使って、アプリケーションをビルドしてバンドルアナライザを [http://localhost:8888](http://localhost:8888) で起動できます。</p>

## babel

- タイプ: `オブジェクト`

> JS や Vue ファイルのために babel の設定をカスタマイズします。

デフォルト:

```js
{
  presets: ['vue-app']
}
```

例（`nuxt.config.js`）:

```js
module.exports = {
  build: {
    babel: {
      presets: ['es2015', 'stage-0']
    }
  }
}
```

## extend

- タイプ: `関数`

> クライアント及びサーバーのバンドルについて Webpack の設定を手動で拡張します。

extend メソッドは一度はサーバーのバンドルのため、一度はクライアントのバンドルのため、つまり二度呼び出されます。メソッドの引数は次のとおり:

1. Webpack 設定オブジェクト
2. 次のキーを持つオブジェクト（すべてブーリアン）: `dev`, `isClient`, `isServer`

例（`nuxt.config.js`）:

```js
module.exports = {
  build: {
    extend (config, { isClient }) {
      // クライアントのバンドルの Webpack 設定のみを拡張する
      if (isClient) {
        config.devtool = 'eval-source-map'
      }
    }
  }
}
```

デフォルトの Webpack の設定についてもう少し見てみたい場合は Nuxt.js の [webpack ディレクトリ](https://github.com/nuxt/nuxt.js/tree/master/lib/webpack) を参照してください。

## filenames

- タイプ: `オブジェクト`

> バンドルのファイル名をカスタマイズします。

デフォルト:

```js
{
  vendor: 'vendor.bundle.[hash].js',
  app: 'nuxt.bundle.[chunkhash].js'
}
```

例（`nuxt.config.js`）:

```js
module.exports = {
  build: {
    filenames: {
      manifest: 'manifest.[hash].js',
      vendor: 'vendor.[hash].js',
      app: 'app.[chunkhash].js'
    }
  }
}
```

manifest や vendor についての利用についてより深く理解するには [Webpack のドキュメント](https://webpack.js.org/guides/code-splitting-libraries/) を参照してください。

## loaders

- タイプ: `配列`
  - 要素: `オブジェクト`

> Webpack のローダーをカスタマイズします。

デフォルト:

```js
[
  {
    test: /\.(png|jpe?g|gif|svg)$/,
    loader: 'url-loader',
    query: {
      limit: 1000, // 1KO
      name: 'img/[name].[hash:7].[ext]'
    }
  },
  {
    test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
    loader: 'url-loader',
    query: {
      limit: 1000, // 1 KO
      name: 'fonts/[name].[hash:7].[ext]'
    }
  }
]
```

例（`nuxt.config.js`）:

```js
module.exports = {
  build: {
    loaders: [
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        loader: 'url-loader',
        query: {
          limit: 10000, // 10KO
          name: 'img/[name].[hash].[ext]'
        }
      }
    ]
  }
}
```

<p class="Alert Alert--orange">loaders が `nuxt.config.js` で定義されているときは、デフォルトのローダー設定は上書きされます。</p>

## plugins

- タイプ: `配列`
- デフォルト: `[]`

> Webpack のプラグインを追加します。

例（`nuxt.config.js`）:

```js
const webpack = require('webpack')

module.exports = {
  build: {
    plugins: [
      new webpack.DefinePlugin({
        'process.VERSION': require('./package.json').version
      })
    ]
  }
}
```

## postcss

- タイプ: `配列`

> [postcss](https://github.com/postcss/postcss) オプションをカスタマイズします。

デフォルト:

```js
[
  require('autoprefixer')({
    browsers: ['last 3 versions']
  })
]
```

例（`nuxt.config.js`）:

```js
module.exports = {
  build: {
    postcss: [
      require('postcss-nested')(),
      require('postcss-responsive-type')(),
      require('postcss-hexrgba')(),
      require('autoprefixer')({
        browsers: ['last 3 versions']
      })
    ]
  }
}
```

## publicPath

- タイプ: `文字列`
- デフォルト: `'/_nuxt/'`

> 最高のパフォーマンスを発揮させるために dist ディレクトリ内のファイルを CDN へアップロードできます。そのためには単に `publicPath` に利用する CDN をセットするだけです。

例（`nuxt.config.js`）:

```js
module.exports = {
  build: {
    publicPath: 'https://cdn.nuxtjs.org'
  }
}
```

設定すると、`nuxt build` を実行したタイミングで `.nuxt/dist/` ディレクトリの内容が CDN にアップロードされます！

## vendor

> Nuxt.js では `vendor.bundle.js` ファイル内にモジュールを追加できます。このファイルは app バンドルファイルのサイズを小さくするために生成します。外部モジュール（例えば `axios` など）を使うときにとても便利です。

- タイプ: `配列`
  - 要素: `文字列`

vendor バンドルファイル内にモジュール/ファイルを追加するには、`nuxt.config.js` 内の `build.vendor` キーに追加します:

```js
module.exports = {
  build: {
    vendor: ['axios']
  }
}
```

ファイルへのパスを指定することもできます。例えば自分で作成した独自ライブラリを使いたいときなどはファイルへのパスを指定します:

```js
module.exports = {
  build: {
    vendor: [
      'axios',
      '~plugins/my-lib.js'
    ]
  }
}
```
