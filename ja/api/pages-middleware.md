---
title: "API: middleware プロパティ"
description: アプリケーションの特定のページにミドルウェアを設定します。
---

# middleware プロパティ

- 型: `文字列` または `配列`
  - 要素: `文字列`

アプリケーションの特定のページにミドルウェアを設定します。

例:

`pages/secret.vue`

```html
<template>
  <h1>シークレットページ</h1>
</template>

<script>
export default {
  middleware: 'authenticated'
}
</script>
```

`middleware/authenticated.js`

```js
export default function ({ store, redirect }) {
  // ユーザーが認証されていないとき
  if (!store.state.authenticated) {
    return redirect('/login')
  }
}
```

ミドルウェアについてより深く理解するには [ミドルウェアのガイド](/guide/routing#ミドルウェア) を参照してください。
