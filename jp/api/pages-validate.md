---
title: "API: validate メソッド"
description: Nuxt.js では動的なルーティングを行うコンポーネント内でバリデーションメソッドを定義できます。
---

# validate メソッド

> Nuxt.js では動的なルーティングを行うコンポーネント内でバリデーションメソッドを定義できます。

- **タイプ:** `関数`

```js
validate({ params, query }) {
  return true // params バリデーションを通過したとき
  return false // Nuxt.js がルートをレンダリングするのを中止して、エラーページを表示させる
}
```

Nuxt.js では動的なルーティングを行うコンポーネント内でバリデーションメソッドを定義できます（下記の例は `pages/users/_id.vue` 内です）

バリデーションメソッドが `true` を返さないときは Nuxt.js は自動的に 404 エラーページをロードします。

```js
export default {
  validate ({ params }) {
    // 数値でなければならない
    return /^\d+$/.test(params.id)
  }
}
```
