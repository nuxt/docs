---
title: "API: fetch メソッド"
description: fetch メソッドは、ページがレンダリングされる前に、データをストアに入れるために使われます。コンポーネントのデータをセットしないという点を除いては data メソッドとよく似ています。
---

# fetch メソッド

> fetch メソッドは、ページがレンダリングされる前に、データをストアに入れるために使われます。コンポーネントのデータをセットしないという点を除いては data メソッドとよく似ています。

- **タイプ:** `関数`

`fetch` メソッドは、*もしセットされていれば*、コンポーネントがローディングされる前に毎回呼び出されます（**ページコンポーネントに限ります**）。サーバーサイドもしくは（訳注: クライアントサイドでは）ユーザーがページ遷移する前に呼び出されます。

`fetch` メソッドは第一引数として [コンテキスト](/api#コンテキスト) を受け取り、コンテキストを使ってデータを取得してデータをストアに入れることができます。fetch メソッドを非同期にするためには **Promise を返すようにしてください**。Nuxt.js はコンポーネントがレンダリングされる前に Promise が解決されるまで待ちます。

`pages/index.vue` の例:

```html
<template>
  <h1>Stars: {{ $store.state.stars }}</h1>
</template>

<script>
export default {
  fetch ({ store, params }) {
    return axios.get('http://my-api/stars')
      .then((res) => {
        store.commit('setStars', res.data)
      })
  }
}
</script>
```

async/await を使ってコードをスッキリさせることもできます:

```html
<template>
  <h1>Stars: {{ $store.state.stars }}</h1>
</template>

<script>
export default {
  async fetch ({ store, params }) {
    let { data } = await axios.get('http://my-api/stars')
    store.commit('setStars', data)
  }
}
</script>
```
