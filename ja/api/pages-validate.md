---
title: "API: validate メソッド"
description: Nuxt.js では動的なルーティングを行うコンポーネント内でバリデーションメソッドを定義できます。
---

> Nuxt.js では動的なルーティングを行うコンポーネント内でバリデーションメソッドを定義できます。

- **型:** `Function` または `Async Function`

`validate` is called every time before navigating to a new route. It will be called server-side once (on the first request to the Nuxt app) and client-side when navigating to further routes. This method takes the [`context`](/api/context) object as an argument.

```js
validate({ params, query, store }) {
  return true // params バリデーションを通過したとき
  return false // Nuxt.js がルートをレンダリングするのを中止して、エラーページを表示させる
}
```

```js
async validate({ params, query, store }) {
  // await の処理
  return true // params バリデーションを通過したとき
  return false // Nuxt.js がルートをレンダリングするのを中止して、エラーページを表示させる
}
```

プロミスを返すこともできます:

```js
validate({ params, query, store }) {
  return new Promise((resolve) => setTimeout(() => resolve()))
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
    return store.state.categories.some(category => category.id === params.id)
  }
}
```

さらにバリデーション関数を実行中に、想定したエラーや想定外のエラーを投げることもできます:

 ```js
export default {
   async validate ({ params, store }) {
     // 500 internal server error とともにカスタムメッセージを投げる
     throw new Error('Under Construction!')
   }
}
```
