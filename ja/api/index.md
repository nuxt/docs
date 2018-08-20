---
title: "API: asyncData メソッド"
description: サーバーサイドでデータを取得し、それをレンダリングしたいことがあるでしょう。Nuxt.js はコンポーネントのデータをセットする前に非同期の処理を行えるようにするために `asyncData` メソッドを追加しています。
---

# asyncData メソッド

> サーバーサイドでデータを取得し、それをレンダリングしたいことがあるでしょう。Nuxt.js はコンポーネントのデータをセットする前に非同期の処理を行えるようにするために `asyncData` メソッドを追加しています。

- **型:** `関数`

`asyncData` はコンポーネント（**ページコンポーネントに限ります**）がロードされる前に毎回呼び出されます。サーバーサイドレンダリングや、ユーザーがページを遷移する前にも呼び出されます。そしてこのメソッドは第一引数として [context](/api/context)（オブジェクト）を受け取り、context を使ってデータを取得してコンポーネントのデータを返します。

asyncData の結果は data と**マージされます**。

```js
export default {
  data () {
    return { project: 'default' }
  },
  asyncData (context) {
    return { project: 'nuxt' }
  }
}
```

<div class="Alert Alert--orange">`data` メソッド内で、コンポーネントのインスタンスに `this` を経由してアクセスしては**いけません**。なぜなら `data` メソッドはコンポーネントが **インスタンス化される前に** 呼び出されるためです。</div>
