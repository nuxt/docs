---
title: "API: modulesDir プロパティ"
description: あなたの Nuxt アプリケーションためのモジュールディレクトリを定義します。
---

# modulesDir プロパティ

- 型: `Array`
- デフォルト: `['node_modules']`

> パス解決のためにモジュールディレクトリを設定することに使用します。 例えば、 webpack の resovleLoading、nodeExternal や postcss です。設定パスは [options.rootDir](/api/configuration-rootdir) からの相対パスです。 (デフォルト: `process.cwd()`)

例 (`nuxt.config.js`):

```js
module.exports = {
  modulesDir: ['../../node_modules']
}
```

もしあなたのプロジェクトが Yarn の ワークスペーススタイル の mono リポジトリで構成されているなら、このフィールドの設定が必要になるでしょう。
