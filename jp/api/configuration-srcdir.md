---
title: "API: srcDir プロパティ"
description: Nuxt.js アプリケーションのソースディレクトリを指定します。
---

<!-- title: "API: The srcDir Property" -->
<!-- description: Define the source directory of your nuxt.js application -->

<!-- # The srcDir Property -->

# srcDir プロパティ

<!-- - Type: `String` -->
<!-- - Default: [rootDir value](/api/configuration-rootdir) -->

- タイプ: `文字列`
- デフォルト: [rootDir の値](/api/configuration-rootdir)

<!-- \> Define the source directory of your nuxt.js application -->

> Nuxt.js アプリケーションのソースディレクトリを指定します。

<!-- Example (`nuxt.config.js`): -->

例（`nuxt.config.js`）:

```js
module.exports = {
  srcDir: 'client/'
}
```

<!-- Then, your application structure can be: -->

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

<!-- This option is useful to have a custom server and using nuxt.js, so all npm dependencies can be regrouped in one `package.json`. -->

このオプションは Nuxt.js を使いつつ独自のサーバーを持ちたいときに役に立ちます。そのようなときに、すべての npm 依存パッケージをひとつの `package.json` 内にまとめることができます。
