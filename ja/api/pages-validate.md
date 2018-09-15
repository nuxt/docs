---
title: "API: validate メソッド"
description: Nuxt.js では動的なルーティングを行うコンポーネント内でバリデーションメソッドを定義できます。
---

# validate メソッド

> Nuxt.js では動的なルーティングを行うコンポーネント内でバリデーションメソッドを定義できます。

- **型:** `関数`

```js
validate({ params, query, store }) {
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

また、例えば [Vuex ストア](/guide/vuex-store) のデータを使ってバリデーションすることもできます（Vuex ストアのデータは [nuxtServerInit アクション](/guide/vuex-store#nuxtserverinit-アクション) を用いて事前に格納しておきます）:

```js
export default {
  validate ({ params, store }) {
    // `params.id` が存在している category の id なのか否かをチェックする
    return store.state.categories.some((category) => category.id === params.id)
  }
}
```
