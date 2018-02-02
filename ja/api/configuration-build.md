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

> JS や Vue ファイルのために babel の設定をカスタマイズします。

- タイプ: `オブジェクト`
- デフォルト:

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

## cssSourceMap

- Type: `boolean`
- Default: `true` for dev and `false` for production.

> Enables CSS Source Map support

## devMiddleware

- Type: `Object`

See [webpack-dev-middleware](https://github.com/webpack/webpack-dev-middleware) for available options.

## extend

> クライアント及びサーバーのバンドルについて Webpack の設定を手動で拡張します。

- タイプ: `関数`

extend メソッドは一度はサーバーのバンドルのため、一度はクライアントのバンドルのため、つまり二度呼び出されます。メソッドの引数は次のとおり:

1. Webpack 設定オブジェクト
2. 次のキーを持つオブジェクト（すべてブーリアン）: `isDev`, `isClient`, `isServer`

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

デフォルトの Webpack の設定についてもう少し見てみたい場合は Nuxt.js の [webpack ディレクトリ](https://github.com/nuxt/nuxt.js/tree/master/lib/builder/webpack) を参照してください。

## extractCSS

> Enables Common CSS Extraction using vue SSR [guidelines](https://ssr.vuejs.org/en/css.html).

- Type: `Boolean`
- Default: `false`

Using `extract-text-webpack-plugin` to extract the CSS in the main chunk into a separate CSS file (auto injected with template), which allows the file to be individually cached. This is recommended when there is a lot of shared CSS. CSS inside async components will remain inlined as JavaScript strings and handled by vue-style-loader.

## filenames

> バンドルのファイル名をカスタマイズします。

- タイプ: `オブジェクト`
- デフォルト:

```js
{
  css: 'common.[contenthash].css',
  manifest: 'manifest.[hash].js',
  vendor: 'common.[chunkhash].js',
  app: 'app.[chunkhash].js',
  chunk: '[name].[chunkhash].js'
}
```

This example changes fancy chunk names to numerical ids (`nuxt.config.js`):

```js
module.exports = {
  build: {
    filenames: {
      chunk: '[id].[chunkhash].js'
    }
  }
}
```

manifest や vendor についての利用についてより深く理解するには [Webpack のドキュメント](https://webpack.js.org/guides/code-splitting-libraries/) を参照してください。

## hotMiddleware

- Type: `Object`

See [webpack-hot-middleware](https://github.com/glenjamin/webpack-hot-middleware) for available options.

## plugins

> Webpack のプラグインを追加します。

- タイプ: `配列`
- デフォルト: `[]`

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

> [postcss](https://github.com/postcss/postcss) オプションをカスタマイズします。

- タイプ: `配列`

**Note:** While default preset is OK and flexible enough for normal use cases, the recommended usage by [`vue-loader`](https://vue-loader.vuejs.org/en/options.html#postcss) is using `postcss.config.js` file in your project. By creating that file it will be automatically detected and this option is ignored.

- デフォルト:

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

> 最高のパフォーマンスを発揮させるために dist ディレクトリ内のファイルを CDN へアップロードできます。そのためには単に `publicPath` に利用する CDN をセットするだけです。

- タイプ: `文字列`
- デフォルト: `'/_nuxt/'`

例（`nuxt.config.js`）:

```js
module.exports = {
  build: {
    publicPath: 'https://cdn.nuxtjs.org'
  }
}
```

設定すると、`nuxt build` を実行したタイミングで `.nuxt/dist/` ディレクトリの内容が CDN にアップロードされます！

## ssr

> Creates special webpack bundle for SSR renderer.

- Type: `Boolean`
- Default `true` for universal mode and `false` for spa mode

This option is automatically set based on `mode` value if not provided. 

## templates

> Nuxt.js allows you provide your own templates which will be rendered based on Nuxt configuration. This feature is specially useful for using with [modules](/guide/modules).

- Type: `Array`
- Items: `Object`

Example (`nuxt.config.js`):

```js
module.exports = {
  build: {
    templates: [
      {
        src: '~/modules/support/plugin.js', // `src` can be absolute or relative
        dst: 'support.js', // `dst` is relative to project `.nuxt` dir
        options: { // Options are provided to template as `options` key
          live_chat: false
        }
      }
    ]
  }
}
```

Templates are rendered using [`lodash.template`](https://lodash.com/docs/#template) you can learn more about using them [here](https://github.com/learn-co-students/javascript-lodash-templates-v-000).

## vendor

> Nuxt.js では `vendor.bundle.js` ファイル内にモジュールを追加できます。このファイルは app バンドルファイルのサイズを小さくするために生成します。外部モジュール（例えば `axios` など）を使うときにとても便利です。

- タイプ: `配列`

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

## watch

> You can provide your custom files to watch and regenerate after changes. This feature is specially useful for using with [modules](/guide/modules).

- Type: `Array<String>`

```js
module.exports = {
  build: {
    watch: [
      '~/.nuxt/support.js'
    ]
  }
}
```
