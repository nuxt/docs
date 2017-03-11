---
title: "API: middleware プロパティ"
description: アプリケーションの特定のページにミドルウェアを設定します。
---

<!-- title: "API: The middleware Property" -->
<!-- description: Set the middleware for a specific page of the application. -->

<!-- # The middleware Property -->

# middleware プロパティ

<!-- - Type: `String` or `Array` -->
<!--   - Items: `String` -->

- タイプ: `文字列` または `配列`
  - 要素: `文字列`

<!-- Set the middleware for a specific page of the application. -->

アプリケーションの特定のページにミドルウェアを設定します。

<!-- Example: -->

例:

`pages/secret.vue`

<!-- ```html -->
<!-- <template> -->
<!--   <h1>Secret page</h1> -->
<!-- </template> -->

<!-- <script> -->
<!-- export default { -->
<!--   middleware: 'authenticated' -->
<!-- } -->
<!-- </script> -->
<!-- ``` -->

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

<!-- ```js -->
<!-- export default function ({ store, redirect }) { -->
<!--   // If the user is not authenticated -->
<!--   if (!store.state.authenticated) { -->
<!--     return redirect('/login') -->
<!--   } -->
<!-- } -->
<!-- ``` -->

```js
export default function ({ store, redirect }) {
  // ユーザーが認証されていないとき
  if (!store.state.authenticated) {
    return redirect('/login')
  }
}
```

<!-- To learn more about the middleware, see the [middleware guide](/guide/routing#middleware). -->

ミドルウェアについてより深く理解するには [ミドルウェアのガイド](/guide/routing#ミドルウェア) を参照してください。
