---
title: "API: fetch メソッド"
description: fetch メソッドは、ページがレンダリングされる前に、データをストアに入れるために使われます。コンポーネントのデータをセットしないという点を除いては data メソッドとよく似ています。
---

<!-- title: "API: The fetch Method" -->
<!-- description: The fetch method is used to fill the store before rendering the page, it's like the data method except it doesn't set the component data. -->

<!-- # The fetch Method -->

# fetch メソッド

<!-- \> The fetch method is used to fill the store before rendering the page, it's like the data method except it doesn't set the component data. -->

> fetch メソッドは、ページがレンダリングされる前に、データをストアに入れるために使われます。コンポーネントのデータをセットしないという点を除いては data メソッドとよく似ています。

<!-- - **Type:** `Function` -->

- **タイプ:** `関数`

<!-- The `fetch` method, *if set*, is called every time before loading the component (**only for pages components**). It can be called from the server-side or before navigating to the corresponding route. -->

`fetch` メソッドは、*もしセットされていれば*、コンポーネントがローディングされる前に毎回呼び出されます（**ページコンポーネントに限ります**）。サーバーサイドもしくは（訳注: クライアントサイドでは）ユーザーがページ遷移する前に呼び出されます。

<!-- The `fetch` method receives [the context](/api#context) as the first argument, we can use it to fetch some data and fill the store. To make the fetch method asynchronous, **return a Promise**, nuxt.js will wait for the promise to be resolved before rendering the Component. -->

`fetch` メソッドは第一引数として [コンテキスト](/api#コンテキスト) を受け取り、コンテキストを使ってデータを取得してデータをストアに入れることができます。fetch メソッドを非同期にするためには **Promise を返すようにしてください**。Nuxt.js はコンポーネントがレンダリングされる前に Promise が解決されるまで待ちます。

<!-- Example of `pages/index.vue`: -->

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

<!-- You can also use async/await to make your code cleaner: -->

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
