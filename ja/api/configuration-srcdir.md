---
title: 'API: srcDir プロパティ'
description: Nuxt.js アプリケーションのソースディレクトリを指定します
---

- 型: `String`
- デフォルト: [rootDir の値](/api/configuration-rootdir)

> Nuxt.js アプリケーションのソースディレクトリを指定します

例（`nuxt.config.js`）:

```js
export default {
  srcDir: 'client/'
}
```

上のように指定すると、アプリケーションの構造を次のようにできます:

```bash
-| app/
---| node_modules/
---| client/
------| assets/
------| components/
------| layouts/
------| middleware/
------| pages/
------| plugins/
------| static/
------| store/
---| nuxt.config.js
---| package.json
```

このオプションは Nuxt.js を使いつつ独自のサーバーを持ちたいときに役に立ちます。そのようなときに、すべての npm 依存パッケージをひとつの `package.json` 内にまとめることができます。
