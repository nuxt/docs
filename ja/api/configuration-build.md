---
title: 'API: build プロパティ'
description: Nuxt.js ではウェブアプリケーションを自由にビルドできるよう Webpack 設定をカスタマイズできます。
---

# build プロパティ

> Nuxt.js ではウェブアプリケーションを自由にビルドできるよう Webpack 設定をカスタマイズできます。

## analyze

> Nuxt.js では [webpack-bundle-analyzer](https://github.com/webpack-contrib/webpack-bundle-analyzer) を使ってバンドルファイルと最適化の仕方を視覚化できます。

- 型: `ブーリアン` または `オブジェクト`
- デフォルト: `false`

オブジェクトの場合は、利用できるプロパティは [こちら](https://github.com/webpack-contrib/webpack-bundle-analyzer#options-for-plugin) を参照してください。

例（`nuxt.config.js`）:

```js
export default {
  build: {
    analyze: true,
    // または
    analyze: {
      analyzerMode: 'static'
    }
  }
}
```

<div class="Alert Alert--teal">

**情報:** `nuxt build --analyze` または `nuxt build -a` コマンドを使って、アプリケーションをビルドしてバンドルアナライザを [http://localhost:8888](http://localhost:8888) で起動できます。

</div>

## babel

> JavaScript や Vue ファイルのために Babel の設定をカスタマイズします。

- 型: `オブジェクト`
- デフォルト:

  ```js
  {
    presets: ['@nuxt/babel-preset-app']
  }
  ```

例（`nuxt.config.js`）:

```js
export default {
  build: {
    babel: {
      presets: ['es2015', 'stage-0']
    }
  }
}
```

## cache

- 型: `ブーリアン`
- デフォルト: `false`

> [uglifyjs-webpack-plugin](https://github.com/webpack-contrib/uglifyjs-webpack-plugin#options) と [cache-loader](https://github.com/webpack-contrib/cache-loader#cache-loader) でキャッシュを有効化します。

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
2. 次のキーを持つオブジェクト（すべてブーリアン）: `isDev`, `isClient`, `isServer`, `loaders`

例（`nuxt.config.js`）:

```js
export default {
  build: {
    extend (config, { isClient }) {
      // クライアントのバンドルの Webpack 設定のみを拡張する
      if (isClient) {
        config.devtool = '#source-map'
      }
    }
  }
}
```

デフォルトの Webpack の設定についてもう少し見てみたい場合は Nuxt.js の [webpack ディレクトリ](https://github.com/nuxt/nuxt.js/tree/dev/packages/webpack/src/config) を参照してください。

### extend 内の loaders

`loaders` は、[build.loaders](#loaders) と同じオブジェクト構造を持っているため、`extend` 内部の loaders のオプションを変えることができます。

例（`nuxt.config.js`）:

```js
export default {
  build: {
    extend (config, { isClient, loaders: { vue } }) {
      // クライアントのバンドルの Webpack 設定のみを拡張する
      if (isClient) {
        vue.transformAssetUrls.video = ['src', 'poster']
      }
    }
  }
}
```

## extractCSS

> Vue のサーバーサイドレンダリング [ガイドライン](https://ssr.vuejs.org/ja/guide/css.html)を利用して、共通の CSS を抽出できるようにします。

- 型: `ブーリアン`
- デフォルト: `false`

`extract-text-webpack-plugin` を使ってメインチャンク内の CSS を個別の CSS ファイル（テンプレートに自動的に注入される）形式で抽出します。これにより、ファイルを個別にキャッシュさせることができます。これは共通して利用される CSS が多く存在するときに推奨されます。非同期コンポーネント内部の CSS は JavaScript の文字列としてインラインで保持され、vue-style-loader で取り扱われます。

## filenames

> バンドルのファイル名をカスタマイズします。

- 型: `オブジェクト`
- デフォルト:

```js
{
  app: ({ isDev }) => isDev ? '[name].js' : '[chunkhash].js',
  chunk: ({ isDev }) => isDev ? '[name].js' : '[chunkhash].js',
  css: ({ isDev }) => isDev ? '[name].js' : '[contenthash].css',
  img: ({ isDev }) => isDev ? '[path][name].[ext]' : 'img/[hash:7].[ext]',
  font: ({ isDev }) => isDev ? '[path][name].[ext]' : 'fonts/[hash:7].[ext]',
  video: ({ isDev }) => isDev ? '[path][name].[ext]' : 'videos/[hash:7].[ext]'
}
```

この例ではチャンク名を数値の ID に変更します（`nuxt.config.js`）:

```js
export default {
  build: {
    filenames: {
      chunk: ({ isDev }) => isDev ? '[name].js' : '[id].[chunkhash].js'
    }
  }
}
```

manifest の使い方をより理解するためには [webpack documentation](https://webpack.js.org/guides/code-splitting-libraries/) を参照してください。

## hotMiddleware

- 型: `オブジェクト`

利用できるオプションは [webpack-hot-middleware](https://github.com/glenjamin/webpack-hot-middleware) を参照してください。

## html.minify

- 型: `オブジェクト`
- デフォルト:

```js
{
  collapseBooleanAttributes: true,
  collapseWhitespace: false,
  decodeEntities: true,
  minifyCSS: true,
  minifyJS: true,
  processConditionalComments: true,
  removeAttributeQuotes: false,
  removeComments: false,
  removeEmptyAttributes: true,
  removeOptionalTags: false,
  removeRedundantAttributes: true,
  removeScriptTypeAttributes: false,
  removeStyleLinkTypeAttributes: false,
  removeTagWhitespace: false,
  sortClassName: false,
  trimCustomFragments: true,
  useShortDoctype: true
}
```

ビルドプロセス中に作成された HTML ファイルのミニファイに使われる [html-minifier](https://github.com/kangax/html-minifier) プラグインの設定（*全てのモード*に適用される）。

## loaders

> webpack loaders を統合した Nuxt.js のカスタマイズオプション

- 型: `オブジェクト`
- デフォルト:

```js
{
  file: {},
  fontUrl: { limit: 1000 },
  imgUrl: { limit: 1000 },
  pugPlain: {},
  vue: {
    transformAssetUrls: {
      video: 'src',
      source: 'src',
      object: 'src',
      embed: 'src'
    }
  },
  css: {},
  cssModules: {
    localIdentName: '[local]_[hash:base64:5]'
  },
  less: {},
  sass: {
    indentedSyntax: true
  },
  scss: {},
  stylus: {},
  vueStyle: {}
}
```

> 注意: `nuxt.config.js` の設定で指定することに加え、[build.extend](#extend) で変更することもできます。

### loaders.file

> 詳細は [file-loader options](https://github.com/webpack-contrib/file-loader#options) を参照してください。

### loaders.fontUrl and loaders.imgUrl

> 詳細は [url-loader options](https://github.com/webpack-contrib/url-loader#options) を参照してください。

### loaders.pugPlain

> 詳細は [pug-plain-loader](https://github.com/yyx990803/pug-plain-loader) または [Pug compiler options](https://pugjs.org/api/reference.html#options) を参照してください。

### loaders.vue

> 詳細は [vue-loader options](https://vue-loader.vuejs.org/options.html) を参照してください。

### loaders.css と loaders.cssModules

> 詳細は [css-loader options](https://github.com/webpack-contrib/css-loader#options) を参照してください。
> 注意: cssModules は、[CSS Modules](https://vue-loader.vuejs.org/guide/css-modules.html#css-modules) を使うための loader オプションです。

### loaders.less

> Less specific オプションは、`loaders.less` を介して `less-loader に渡すことができます。dash-case で利用可能な全てのオプションについては [Less documentation](http://lesscss.org/usage/#command-line-usage-options) を参照してください。

### loaders.sass と loaders.scss

> 利用可能な全てのオプションについては [Node Sass documentation](https://github.com/sass/node-sass/blob/master/README.md#options) を参照してください。
> 注意: `loaders.sass` は [Sass Indented Syntax](http://sass-lang.com/documentation/file.INDENTED_SYNTAX.html) 用です。

### loaders.vueStyle

> 詳細は [vue-style-loader options](https://github.com/vuejs/vue-style-loader#options) を参照してください。

## optimization

- 型: `オブジェクト`
- デフォルト:

  ```js
  {
    minimize: true,
    minimizer: [
      // terser-webpack-plugin
      // optimize-css-assets-webpack-plugin
    ],
    splitChunks: {
      chunks: 'all',
      automaticNameDelimiter: '.',
      name: undefined,
      cacheGroups: {}
    }
  }
  ```

`dev` または `analyze` モードでは、`splitChunks.name` のデフォルト値は `true` になっています。

カスタマイズされたプラグインの配列に `minimizer` を設定するか、`minimize` を `false` にすることで全ての minimizer を無効にできます。
（`minimize` はデフォルトで開発用に無効になっています）

[Webpack の最適化](https://webpack.js.org/configuration/optimization/)を参照してください。

## terser

- 型: `オブジェクト` または `ブーリアン`
- デフォルト:

```js
{
  parallel: true,
  cache: false,
  sourceMap: false,
  extractComments: {
    filename: 'LICENSES'
  },
  terserOptions: {
    output: {
      comments: /^\**!|@preserve|@license|@cc_on/
    }
  }
}
```

Terser プラグインのオプションです。 `false` を設定するとこのプラグインは無効になります。

`soruceMap` は webpack の `confing.devtool` が `source-?map` と一致した際に有効になります。

[webpack-contrib/terser-webpack-plugin](https://github.com/webpack-contrib/terser-webpack-plugin) を参照してください。

## optimizeCSS

- 型: `オブジェクト` または `ブーリアン`
- デフォルト:
  - `false`
  - extractCSS が有効の場合は `{}`

OptimizeCSSAssets プラグインのオプションです。.

[NMFR/optimize-css-assets-webpack-plugin](https://github.com/NMFR/optimize-css-assets-webpack-plugin) を参照してください。

## parallel

- 型: `ブーリアン`
- デフォルト: `false`

webpack のビルドで[thread-loader](https://github.com/webpack-contrib/thread-loader#thread-loader) を有効にします。

## plugins

> Webpack のプラグインを追加します。

- 型: `配列`
- デフォルト: `[]`

例（`nuxt.config.js`）:

```js
import webpack from 'webpack'
import { version } from './package.json'
export default {
  build: {
    plugins: [
      new webpack.DefinePlugin({
        'process.VERSION': version
      })
    ]
  }
}
```

## postcss

> [PostCSS Loader](https://github.com/postcss/postcss-loader#usage) プラグインをカスタマイズします。

- 型: `配列`、`オブジェクト`（推奨）、`関数` または `ブーリアン`

  **注意：**  Nuxt.js は [PostCSS Preset Env](https://github.com/csstools/postcss-preset-env) を適用しました。デフォルトでは、[Stage 2 features](https://cssdb.org/) と [Autoprefixer](https://github.com/postcss/autoprefixer) が有効になっています。`build.postcss.preset` を使うことで設定が出来ます。
- デフォルト:

  ```js
  {
    plugins: {
      'postcss-import': {},
      'postcss-url': {},
      'postcss-preset-env': {},
      'cssnano': { preset: 'default' } // 開発モードでは無効化されています
    }
  }
  ```

例（`nuxt.config.js`）:

```js
export default {
  build: {
    postcss: {
      plugins: {
        // `postcss-url` の無効化
        'postcss-url': false,
        // plugin の追加
        'postcss-nested': {},
        'postcss-responsive-type': {},
        'postcss-hexrgba': {}
      },
      preset: {
        autoprefixer: {
          grid: true
        }
      }
    }
  }
}
```

## profile

- 型: `ブーリアン`
- デフォルト: コマンドライン引数 `--profile` で有効にします。

[WebpackBar](https://github.com/nuxt/webpackbar#profile) の profiler で有効にします。

## publicPath

> CDN に `publicPath` をセットすると、Nuxt.js は dist ディレクトリ内のファイルを CDN へアップロードし最大のパフォーマンスを発揮します。

- 型: `文字列`
- デフォルト: `'/_nuxt/'`

例（`nuxt.config.js`）:

```js
export default {
  build: {
    publicPath: 'https://cdn.nuxtjs.org'
  }
}
```

設定すると、`nuxt build` を実行したタイミングで `.nuxt/dist/client` ディレクトリの内容が CDN にアップロードされます！

## quiet

> ビルド出力ログの大半を抑制します

- 型: `ブーリアン`
- デフォルト: [std-env](https://github.com/blindmedia/std-env) によって `CI` または `test` 環境で検出された際に有効になります

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

## ssr

> SSR レンダラー用の webpack バンドルを作成します。

- 型: `ブーリアン`
- ユニバーサルモードでのデフォルト値は `true`、spa モードでのデフォルト値は `false` です。

このオプションは、提供されていない場合は `mode` 値に基づいて自動的に設定されます。

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

## templates

> Nuxt.js では、設定に基づいてレンダリングされる独自のテンプレートを提供できます。この機能は[モジュール](/guide/modules)を使用する場合にとりわけ便利です。

- 型: `配列`

例 (`nuxt.config.js`):

```js
export default {
  build: {
    templates: [
      {
        src: '~/modules/support/plugin.js', // `src` は絶対パスもしくは相対パスで指定してください
        dst: 'support.js', // `dst` は `.nuxt` ディレクトリからみた相対パスです
        options: { // Options は `options` キーとしてテンプレートに提供されます
          live_chat: false
        }
      }
    ]
  }
}
```

テンプレートは [`lodash.template`](https://lodash.com/docs/#template) を使ってレンダリングされます。[こちら](https://github.com/learn-co-students/javascript-lodash-templates-v-000)でより詳細な使い方を知ることができます。

## transpile

- 型: `配列<string | RegExp>`
- デフォルト: `[]`

特定の依存関係を Babel で変換したい場合、`build.transpile` を追加することができます。transpile の項目は、マッチする依存ファイル名の文字列または正規表現オブジェクトになります。

## vueLoader

> 注意: この設定は Nuxt 2.0 から削除されました。[`build.loaders.vue`](#loaders) を変わりに使用してください。

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

[Vue Loader Options](https://vue-loader.vuejs.org/options.html) を指定します。

## watch

> 監視や変更後に再生成を行うカスタムファイルを提供することができます。この機能は[モジュール](/guide/modules)を使用する場合にとりわけ便利です。

- 型: `配列<String>`

```js
export default {
  build: {
    watch: [
      '~/.nuxt/support.js'
    ]
  }
}
```
