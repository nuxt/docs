---
title: 'API: fetch メソッド'
description: "`fetch` メソッドは、ページがレンダリングされる前に、データをストアに入れるために使われます。コンポーネントのデータをセットしないという点を除いては
  `asyncData`メソッドとよく似ています。"
---

# fetch メソッド

> fetch メソッドは、ページがレンダリングされる前に、データをストアに入れるために使われます。コンポーネントのデータをセットしないという点を除いては `asyncData` メソッドとよく似ています。

- **型:** `関数`

`fetch` メソッドが*設定されている場合*、コンポーネント（**ページコンポーネントに限ります**）がロードされる前に毎回呼び出されます。サーバーサイドレンダリングや、ページを遷移する前にも呼び出されます。

`fetch` メソッドは第一引数として [ `context`](/api/context) オブジェクトを受け取るので、データを取得し、取得したデータをストアに入れることができます。`fetch` メソッドを非同期にするためには **Promise を返却してください**。そうすれば nuxt.js はコンポーネントがレンダリングされる前に promise が解決されるまで待機します。

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

## Vuex

ストアアクションを呼び出す場合は、`fetch` 内の `store.dispatch` を使用してください。その際、内部の `async`/`await` を用いてアクションの終了を待つようにしてください：

```html
<script>
export default {
  async fetch ({ store, params }) {
    await store.dispatch('GET_STARS');
  }
}
</script>
```

`store/index.js`

```js
// ...
export const actions = {
  async GET_STARS ({ commit }) {
    const { data } = await axios.get('http://my-api/stars')
    commit('SET_STARS', data)
  }
}
```

## クエリ文字列の変化のリスニング

`fetch` メソッドは、デフォルトではクエリ文字列の変更に対して**呼び出されません**。たとえばページネーション用のコンポーネントを作成する時など、この挙動を変更したい場合は、ページコンポーネントの `watchQuery` プロパティを使用してリスニング用のパラメータを設定することできます。詳しくは、<a href="/api/pages-watchquery" data-md-type="link">API `watchQuery` のページ</a>を参照してください。
