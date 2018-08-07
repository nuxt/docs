---
title: 'API: buildDir プロパティ'
description: dist ディレクトリを定義します。
---

# buildDir プロパティ

- 型: `文字列`
- デフォルト: `.nuxt`

> dist ディレクトリを定義します。

例（`nuxt.config.js`）:

```js
module.exports = {
  buildDir: 'nuxt-dist'
}
```

デフォルトでは `.nuxt` のディレクトリ名がドットで始まるため、多くのツールが隠しディレクトリと見なします。このオプションを使うと dist フォルダを隠しディレクトリではなく、表示することができます。
