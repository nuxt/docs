---
title: 'API: build プロパティ'
description: Nuxt.js ではウェブアプリケーションを自由にビルドできるよう Webpack 設定をカスタマイズできます。
---

# build プロパティ

> Nuxt.js ではウェブアプリケーションを自由にビルドできるよう Webpack 設定をカスタマイズできます。

## analyze

> Nuxt.js では [webpack-bundle-analyzer](https://github.com/th0r/webpack-bundle-analyzer) を使ってバンドルファイルと最適化の仕方を視覚化できます。

- 型: `ブーリアン` または `オブジェクト`
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

- 型: `オブジェクト`

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

- 型: `ブーリアン`
- デフォルト: 開発モードでは `true` でプロダクションモードでは `false`

> CSS ソースマップのサポートを有効にします。

## devMiddleware

- 型: `オブジェクト`

利用できるオプションは [webpack-dev-middleware](https://github.com/webpack/webpack-dev-middleware) を参照してください。

## extend

> クライアント及びサーバーのバンドルについて Webpack の設定を手動で拡張します。

- 型: `関数`

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

> Vue のサーバーサイドレンダリング [ガイドライン](https://ssr.vuejs.org/en/css.html)を利用して、共通の CSS を抽出できるようにします。

- 型: `ブーリアン`
- デフォルト: `false`

CSS を抽出して、メインのチャンクに独立した CSS ファイルを挿入する（自動的にテンプレートに注入される）ために、ファイルを個別にキャッシュさせることができる `extract-text-webpack-plugin` を使います。これは共通して利用される CSS が多く存在するときに推奨されます。非同期コンポーネントの内部の CSS は JavaScript の文字列としてインラインで保持され、vue-style-loader で取り扱われます。

## filenames

> バンドルのファイル名をカスタマイズします。

- 型: `オブジェクト`

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

この例ではチャンク名を数値の ID に変更します（`nuxt.config.js`）:

```js
module.exports = {
  build: {
    filenames: {
      chunk: '[id].[chunkhash].js'
    }
  }
}
```

manifest や vendor の使い方をより理解するためには [webpack documentation](https://webpack.js.org/guides/code-splitting-libraries/) を参照してください。

## hotMiddleware

- 型: `オブジェクト`

利用できるオプションは [webpack-hot-middleware](https://github.com/glenjamin/webpack-hot-middleware) を参照してください。

## plugins

> Webpack のプラグインを追加します。

- 型: `配列`
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

> [PostCSS Loader](https://github.com/postcss/postcss-loader#usage) プラグインをカスタマイズします。

- 型: `配列`、`オブジェクト`（推奨）、`関数` または `ブーリアン`

    **注意：**デフォルトのプリセットは OK で、通常使いには十分柔軟ですが、推奨使用方法はプロジェクト内の `postcss.config.js` ファイルで [`vue-loader`](https://vue-loader.vuejs.org/en/options.html#postcss) を使用することです。 このファイルを作成するとにより自動的に検出され、このオプションは無視されます。

- デフォルト:

    ```js
    {
      plugins: {
      'postcss-import': {},
      'postcss-url': {},
      'postcss-cssnext': {}
      }
    }
    ```

例（`nuxt.config.js`）:

```js
module.exports = {
  build: {
    postcss: {
      plugins: {
        // `postcss-url` の無効化
      'postcss-url': false,

      // `postcss-cssnext` のデフォルトオプションをカスタマイズする
      'postcss-cssnext': {
        features: {
          customProperties: false
        }
      }

      // plugin の追加
      'postcss-nested': {},
      'postcss-responsive-type': {},
      'postcss-hexrgba': {}
      }
    }
  }
}
```

## publicPath

> CDN に `publicPath` をセットすると、Nuxt.js は dist ディレクトリ内のファイルを CDN へアップロードし最大のパフォーマンスを発揮します。

- 型: `文字列`
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

> SSR レンダラー用の webpack バンドルを作成します。

- 型: `ブーリアン`
- ユニバーサルモードでのデフォルト値は `true`、spa モードでのデフォルト値は `false{/code}です。`

このオプションは、提供されていない場合は `mode` 値に基づいて自動的に設定されます。

## templates

> Nuxt.jsでは、設定に基づいてレンダリングされる独自のテンプレートを提供できます。 この機能は[モジュール](/guide/modules)を使用する場合にとりわけ便利です。

- 型: `配列`

例 (`nuxt.config.js`):

```js
module.exports = {
  build: {
    templates: [
      {
        src: '~/modules/support/plugin.js', // `src` は絶対パスもしくは相対パスで指定してください
        dst: 'support.js', // `dst` は `.nuxt` ディレクトリからみた相対パスです
        options: { // Options は `options` キーとしてテンプレートから提供されます
          live_chat: false
        }
      }
    ]
  }
}
```

テンプレートは [`lodash.template`](https://lodash.com/docs/#template) を使ってレンダリングされます。[こちら](https://github.com/learn-co-students/javascript-lodash-templates-v-000)でより詳細な使い方を知ることができます。

## vendor

> Nuxt.js では `vendor.bundle.js` ファイル内にモジュールを追加できます。このファイルは app バンドルファイルのサイズを小さくするために生成します。外部モジュール（例えば `axios` など）を使うときにとても便利です。

- 型: `配列`

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

> 監視や変更後に再生成を行うカスタムファイルを提供することができます。 この機能は[モジュール](/guide/modules)を使用する場合にとりわけ便利です。

- 型: `配列<String>`

```js
module.exports = {
  build: {
    watch: [
      '~/.nuxt/support.js'
    ]
  }
}
```

## profile

- 型: `ブーリアン`
- デフォルト: コマンドライン引数 `--profile` で有効にします。

[WebpackBar](https://github.com/nuxt/webpackbar#profile) の profiler で有効にします。

## parallel

- 型: `ブーリアン`
- デフォルト: `false`

webpack のビルドで[thread-loader](https://github.com/webpack-contrib/thread-loader#thread-loader) を有効にします。 

## cache

- 型: `ブーリアン`
- デフォルト: `false`

[uglifyjs-webpack-plugin ](https://github.com/webpack-contrib/uglifyjs-webpack-plugin#options) と [cache-loader](https://github.com/webpack-contrib/cache-loader#cache-loader) でキャッシュを有効化します。

## styleResources

- 型: `オブジェクト`
- デフォルト: `{}`

毎回インポートせずに変数やミックスインをページに挿入する必要がある場合に便利です。

Nuxt.js はこの動作を実現するために https://github.com/yenshih/style-resources-loader を使用します。

特定のプリプロセッサに含めるパターン/パスを指定する必要があります: `less`、`sass`、`scss`、`stylus`

：警告：ここではパスのエイリアス（`~` や `@`）を使用することができないため、相対パスまたは絶対パスを使用する必要があります。

`nuxt.config.js`:

```js
{
  build: {
    styleResources: {
      scss: './assets/variables.scss',
      less: './assets/*.less',
      // sass: ...,
      // scss: ...
      options: {
        // https://github.com/yenshih/style-resources-loader#options の
        // `patterns` プロパティ以外を参照してください。
      }
    }
  }
}
```

## optimization

- 型: `オブジェクト`

- デフォルト:

    ```js
    {
      splitChunks: {
        chunks: 'all',
        automaticNameDelimiter: '.',
        name: undefined,
        cacheGroups: {}
      }
    }
    ```

`dev` または `analyze` モードでは、`splitChunks.name` のデフォルト値は `true` になっています。

Webpack の[最適化](https://webpack.js.org/configuration/optimization/)

## splitChunks

- 型: `オブジェクト`

- デフォルト:

    ```js
    {
      layouts: false,
      pages: true,
      commons: true
    }
    ```

`layout`、`pages` や `commons` で分割したコードの場合（共通ライブラリ: vue|vue-loader|vue-router|vuex...）

## Transpile

- 型: `配列<string | RegExp>`
- デフォルト: `[]`

特定の依存関係を Babel で変換したい場合、`build.transpile` を追加することができます。transpile の項目は、マッチする依存ファイル名の文字列または正規表現オブジェクトになります。

## vueLoader

- 型: `オブジェクト`

- デフォルト

    ```js
    {
      productionMode: !this.options.dev,
      transformAssetUrls: {
        video: 'src',
        source: 'src',
        object: 'src',
        embed: 'src'
      }
    }
    ```

[Vue Loader Options](https://vue-loader.vuejs.org/options.html) の指定
