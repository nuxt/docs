---
title: webpack の設定を拡張するには？
description: Webpack の設定を拡張するには？
---

`nuxt.config.js` 内の `extend` オプションを通して Nuxt の webpack 設定を拡張できます
`build` プロパティの `extend` オプションは2つの引数を受け取る関数です。第一引数は、Nuxt の webpack 設定からエクスポートされた webpack `config` オブジェクトです。
第二引数は Boolean 型のプロパティを複数持つ context オブジェクトです。: `{isDev、isClient、isServer、loaders}`

```js
export default {
  build: {
    extend (config, { isDev, isClient }) {
      // ..
      config.module.rules.push(
        {
          test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
          loader: 'file-loader'
        }
      )
      // isDev が true の場合、webpack を開発モードに設定します
      if (isDev) { config.mode = 'development' }
    }
  }
}
```

`extend` メソッドは一度はサーバーのバンドルのため、一度はクライアントのバンドルのため、つまり二度呼び出されます。

## Examples

#### Customize chunks configuration

You may want to tweak a bit [optimization configuration](/api/configuration-build#optimization), avoiding to rewrite default object.
```js
export default {
  build: {
    extend (config, { isClient }) {
      if (isClient) {
          config.optimization.splitChunks.maxSize = 200000;
      }
    }
  }
}
```

#### Execute ESLint on every webpack build in dev environment

In order to be aware of code style errors, you may want to run [ESLint](https://github.com/webpack-contrib/eslint-loader) on every build in dev environment. 
```js
export default {
  build: {
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
          config.module.rules.push({
              enforce: 'pre',
              test: /\.(js|vue)$/,
              loader: 'eslint-loader',
              exclude: /(node_modules)/,
          });
      }
    }
  }
}
```
