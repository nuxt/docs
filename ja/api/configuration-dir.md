---
title: 'API: dir プロパティ'
description: カスタムディレクトリを定義します。
---

# dir プロパティ

- 型: `オブジェクト`
- デフォルト:

```js
{
  assets: 'assets',
  layouts: 'layouts',
  middleware: 'middleware',
  pages: 'pages',
  static: 'static',
  store: 'store'
}
```

> カスタムディレクトリを定義します。

例（`nuxt.config.js`）:

```js
module.exports = {
  dir: {
    assets: 'custom-assets',
    layouts: 'custom-layouts',
    middleware: 'custom-middleware',
    pages: 'custom-pages',
    static: 'custom-static',
    store: 'custom-store'
  }
}
```
