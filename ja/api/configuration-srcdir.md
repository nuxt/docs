---
title: "API: srcDir プロパティ"
description: Nuxt.js アプリケーションのソースディレクトリを指定します。
---

# srcDir プロパティ

- 型: `文字列`
- デフォルト: [rootDir の値](/api/configuration-rootdir)

> Nuxt.js アプリケーションのソースディレクトリを指定します。

例（`nuxt.config.js`）:

```js
module.exports = {
  srcDir: 'client/'
}
```

上のように指定すると、アプリケーションの構造を次のようにできます:

```bash
-| app/
---| node_modules/
---| client/
------| pages/
------| components/
---| nuxt.config.js
---| package.json
```

このオプションは Nuxt.js を使いつつ独自のサーバーを持ちたいときに役に立ちます。そのようなときに、すべての npm 依存パッケージをひとつの `package.json` 内にまとめることができます。
