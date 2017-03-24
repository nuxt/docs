---
title: "API: validate メソッド"
description: Nuxt.js では動的なルーティングを行うコンポーネント内でバリデーションメソッドを定義できます。
---

<!-- title: "API: The validate Method" -->
<!-- description: Nuxt.js lets you define a validator method inside your dynamic route component. -->

<!-- # The validate Method -->

# validate メソッド

<!-- \> Nuxt.js lets you define a validator method inside your dynamic route component. -->

> Nuxt.js では動的なルーティングを行うコンポーネント内でバリデーションメソッドを定義できます。

<!-- - **Type:** `Function` -->

- **タイプ:** `関数`

<!-- ```js -->
<!-- validate({ params, query }) { -->
<!--   return true // if the params are valid -->
<!--   return false // will stop Nuxt.js to render the route and display the error page -->
<!-- } -->
<!-- ``` -->

```js
validate({ params, query }) {
  return true // params バリデーションを通過したとき
  return false // Nuxt.js がルートをレンダリングするのを中止して、エラーページを表示させる
}
```

<!-- Nuxt.js lets you define a validator method inside your dynamic route component (In this example: `pages/users/_id.vue`). -->

Nuxt.js では動的なルーティングを行うコンポーネント内でバリデーションメソッドを定義できます（下記の例は `pages/users/_id.vue` 内です）

<!-- If the validate method does not return `true`, Nuxt.js will automatically load the 404 error page. -->

バリデーションメソッドが `true` を返さないときは Nuxt.js は自動的に 404 エラーページをロードします。

<!-- ```js -->
<!-- export default { -->
<!--   validate ({ params }) { -->
<!--     // Must be a number -->
<!--     return /^\d+$/.test(params.id) -->
<!--   } -->
<!-- } -->
<!-- ``` -->

```js
export default {
  validate ({ params }) {
    // 数値でなければならない
    return /^\d+$/.test(params.id)
  }
}
```
