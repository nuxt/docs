---
title: webpack の拡張
description: Webpack の設定を拡張するには？
---

# Webpack の設定を拡張するには？

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
            loader: 'file-loader',
          }
        )
        // isDev が true の場合、webpack を開発モードに設定します
        if (isDev) config.mode = 'development'
     }
  }
}
```

`extend` メソッドは一度はサーバーのバンドルのため、一度はクライアントのバンドルのため、つまり二度呼び出されます。
