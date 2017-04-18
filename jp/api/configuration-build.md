---
title: "API: build プロパティ"
description: Nuxt.js ではウェブアプリケーションを自由にビルドできるよう Webpack 設定をカスタマイズできます。
---

<!-- title: "API: The build Property" -->
<!-- description: Nuxt.js lets you customize the webpack configuration for building your web application as you want. -->

<!-- # The build Property -->

# build プロパティ

<!-- \> Nuxt.js lets you customize the webpack configuration for building your web application as you want. -->

> Nuxt.js ではウェブアプリケーションを自由にビルドできるよう Webpack 設定をカスタマイズできます。

## analyze

<!-- \> Nuxt.js use [webpack-bundle-analyzer](https://github.com/th0r/webpack-bundle-analyzer) to let you visualize your bundles and how to optimize them. -->

> Nuxt.js では [webpack-bundle-analyzer](https://github.com/th0r/webpack-bundle-analyzer) を使ってバンドルファイルと最適化の仕方を視覚化できます。

<!-- - Type: `Boolean` or `Object` -->
<!-- - Default: `false` -->

- タイプ: `ブーリアン` または `オブジェクト`
- デフォルト: `false`

<!-- If an object, see available properties [here](https://github.com/th0r/webpack-bundle-analyzer#as-plugin). -->

オブジェクトの場合は、利用できるプロパティは [こちら](https://github.com/th0r/webpack-bundle-analyzer#as-plugin) を参照してください。

<!-- Example (`nuxt.config.js`): -->

例（`nuxt.config.js`）:

<!-- ```js -->
<!-- module.exports = { -->
<!--   build: { -->
<!--     analyze: true -->
<!--     // or -->
<!--     analyze: { -->
<!--       analyzerMode: 'static' -->
<!--     } -->
<!--   } -->
<!-- } -->
<!-- ``` -->

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

<!-- <p class="Alert Alert--teal">**INFO:** You can use the command `nuxt build --analyze` or `nuxt build -a` to build your application and launch the bundle analyzer on [http://localhost:8888](http://localhost:8888)</p> -->

<p class="Alert Alert--teal">**情報:** `nuxt build --analyze` または `nuxt build -a` コマンドを使って、アプリケーションをビルドしてバンドルアナライザを [http://localhost:8888](http://localhost:8888) で起動できます。</p>

## babel

<!-- - Type: `Object` -->

- タイプ: `オブジェクト`

<!-- \> Customize babel configuration for JS and Vue files. -->

> JS や Vue ファイルのために babel の設定をカスタマイズします。

<!-- Default: -->

デフォルト:

```js
{
  presets: ['vue-app']
}
```

<!-- Example (`nuxt.config.js`): -->

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

<!-- - Type: `Function` -->

- タイプ: `関数`

<!-- \> Extend the webpack configuration manually for the client & server bundles. -->

クライアント及びサーバーのバンドルについて Webpack の設定を手動で拡張します。

<!-- The extend is called twice, one time for the server bundle, and one time for the client bundle. The arguments of the method are: -->

extend メソッドは一度はサーバーのバンドルのため、一度はクライアントのバンドルのため、つまり二度呼び出されます。メソッドの引数は次のとおり:

<!-- 1. Webpack config object -->
<!-- 2. Object with the folowing keys (all boolean): `dev`, `isClient`, `isServer` -->

1. Webpack 設定オブジェクト
2. 次のキーを持つオブジェクト（すべてブーリアン）: `dev`, `isClient`, `isServer`

<!-- Example (`nuxt.config.js`): -->

例（`nuxt.config.js`）:

<!-- ```js -->
<!-- module.exports = { -->
<!--   build: { -->
<!--     extend (config, { isClient }) { -->
<!--       // Extend only webpack config for client-bundle -->
<!--       if (isClient) { -->
<!--         config.devtool = 'eval-source-map' -->
<!--       } -->
<!--     } -->
<!--   } -->
<!-- } -->
<!-- ``` -->

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

<!-- If you want to see more about our default webpack configuration, take a look at our [webpack directory](https://github.com/nuxt/nuxt.js/tree/master/lib/webpack). -->

デフォルトの Webpack の設定についてもう少し見てみたい場合は Nuxt.js の [webpack ディレクトリ](https://github.com/nuxt/nuxt.js/tree/master/lib/webpack) を参照してください。

## filenames

<!-- - Type: `Object` -->

- タイプ: `オブジェクト`

<!-- \> Customize bundle filenames -->

> バンドルのファイル名をカスタマイズします。

<!-- Default: -->

デフォルト:

```js
{
  vendor: 'vendor.bundle.[hash].js',
  app: 'nuxt.bundle.[chunkhash].js'
}
```

<!-- Example (`nuxt.config.js`): -->

例（`nuxt.config.js`）:

```js
module.exports = {
  build: {
    filenames: {
      vendor: 'vendor.[hash].js',
      app: 'app.[chunkhash].js'
    }
  }
}
```

## loaders

<!-- - Type: `Array` -->
<!--   - Items: `Object` -->

- タイプ: `配列`
  - 要素: `オブジェクト`

<!-- \> Customize webpack loaders -->

> Webpack のローダーをカスタマイズします。

<!-- Default: -->

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

<!-- Example (`nuxt.config.js`): -->

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

<!-- <p class="Alert Alert--orange">When the loaders are defined in the `nuxt.config.js`, the default loaders will be overwritten.</p> -->

<p class="Alert Alert--orange">loaders が `nuxt.config.js` で定義されているときは、デフォルトのローダー設定は上書きされます。</p>

## plugins

<!-- - Type: `Array` -->
<!-- - Default: `[]` -->

- タイプ: `配列`
- デフォルト: `[]`

<!-- \> Add Webpack plugins -->

> Webpack のプラグインを追加します。

<!-- Example (`nuxt.config.js`): -->

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

<!-- - Type: `Array` -->

- タイプ: `配列`

<!-- \> Customize [postcss](https://github.com/postcss/postcss) options -->

> [postcss](https://github.com/postcss/postcss) オプションをカスタマイズします。

<!-- Default: -->

デフォルト:

```js
[
  require('autoprefixer')({
    browsers: ['last 3 versions']
  })
]
```

<!-- Example (`nuxt.config.js`): -->

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

<!-- - Type: `String` -->
<!-- - Default: `'/_nuxt/'` -->

- タイプ: `文字列`
- デフォルト: `'/_nuxt/'`

<!-- \> Nuxt.js lets you upload your dist files to your CDN for maximum performances, simply set the `publicPath` to your CDN. -->

> 最高のパフォーマンスを発揮させるために dist ディレクトリ内のファイルを CDN へアップロードできます。そのためには単に `publicPath` に利用する CDN をセットするだけです。

<!-- Example (`nuxt.config.js`): -->

例（`nuxt.config.js`）:

```js
module.exports = {
  build: {
    publicPath: 'https://cdn.nuxtjs.org'
  }
}
```

<!-- Then, when launching `nuxt build`, upload the content of `.nuxt/dist/` directory to your CDN and voilà! -->

設定すると、`nuxt build` を実行したタイミングで `.nuxt/dist/` ディレクトリの内容が CDN にアップロードされます！

## vendor

<!-- \> Nuxt.js lets you add modules inside the `vendor.bundle.js` file generated to reduce the size of the app bundle. It's really useful when using external modules (like `axios` for example) -->

> Nuxt.js では `vendor.bundle.js` ファイル内にモジュールを追加できます。このファイルは app バンドルファイルのサイズを小さくするために生成します。外部モジュール（例えば `axios` など）を使うときにとても便利です。

<!-- - Type: `Array` -->
<!--   - Items: `String` -->

- タイプ: `配列`
  - 要素: `文字列`

<!-- To add a module/file inside the vendor bundle, add the `build.vendor` key inside `nuxt.config.js`: -->

vendor バンドルファイル内にモジュール/ファイルを追加するには、`nuxt.config.js` 内の `build.vendor` キーに追加します:

```js
module.exports = {
  build: {
    vendor: ['axios']
  }
}
```

<!-- You can also give a path to a file, like a custom lib you created: -->

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
