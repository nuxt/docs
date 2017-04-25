---
title: 非同期なデータ
description: サーバーサイドでデータを取得し、それをレンダリングしたいことがあるでしょう。Nuxt.js はコンポーネントのデータをセットする前に非同期の処理を行えるようにするために `asyncData` メソッドを追加しています。
---

> サーバーサイドでデータを取得し、それをレンダリングしたいことがあるでしょう。Nuxt.js はコンポーネントのデータをセットする前に非同期の処理を行えるようにするために `asyncData` メソッドを追加しています。

## asyncData メソッド

サーバーサイドでストアは使わずに、単にデータをフェッチしてレンダリングの事前処理をしたいときがあるでしょう。`asyncData` はコンポーネント（ページコンポーネントに限ります）がロードされる前に毎回呼び出されます。サーバーサイドレンダリングや、ユーザーがページを遷移する前にも呼び出されます。そしてこのメソッドは第一引数として [コンテキスト](/api#コンテキスト) を受け取り、コンテキストを使ってデータを取得してコンポーネントのデータとマージすることができます。

<div class="Alert Alert--orange">`data` メソッド内の `this` を通してコンポーネントのインスタンスにアクセスすることは **できません**。それはコンポーネントがインスタンス化される前に data メソッドが呼び出されるためです。</div>

Nuxt.js では asyncData メソッドを使うために、いくつかの異なるやり方があるので、お好きなものを選んでください:

1. `Promise` を返す。Nuxt.js はコンポーネントがレンダリングされる前に Promise が解決されるまで待ちます
2. [async/await](https://github.com/lukehoban/ecmascript-asyncawait) を使う（[より深く理解する](https://zeit.co/blog/async-and-await)）
3. 第二引数としてコールバックを定義する。右のように呼び出される必要があります: `callback(err, data)`

### Promise を返す

```js
export default {
  asyncData ({ params }) {
    return axios.get(`https://my-api/posts/${params.id}`)
    .then((res) => {
      return { title: res.data.title }
    })
  }
}
```

### async/await を使う

```js
export default {
  async asyncData ({ params }) {
    let { data } = await axios.get(`https://my-api/posts/${params.id}`)
    return { title: data.title }
  }
}
```

### コールバックを使う

```js
export default {
  asyncData ({ params }, callback) {
    axios.get(`https://my-api/posts/${params.id}`)
    .then((res) => {
      callback(null, { title: res.data.title })
    })
  }
}
```

### データを表示する

asyncData の結果はコンポーネントのデータと **マージされ** ます。下記のように template の内側でデータを表示することができます:

```html
<template>
  <h1>{{ title }}</h1>
</template>
```

## コンテキスト

`context` 内で利用できるキーの一覧を確認するには [ページ data API](/api) を参照してください。

## エラー処理

Nuxt.js は `context` の中に `error(params)` メソッドを追加しています。これを呼び出すことでエラーページを表示できます。

`Promise` を使った例:

```js
export default {
  asyncData ({ params, error }) {
    return axios.get(`https://my-api/posts/${params.id}`)
    .then((res) => {
      return { title: res.data.title }
    })
    .catch((e) => {
      error({ statusCode: 404, message: 'ページが見つかりません' })
    })
  }
}
```

`callback` 引数を使っているときは、直接、エラー内容と共に callback を呼び出すことができ、そうすると Nuxt.js は `error` メソッドを実行します。

```js
export default {
  asyncData ({ params }, callback) {
    axios.get(`https://my-api/posts/${params.id}`)
    .then((res) => {
      callback(null, { title: res.data.title })
    })
    .catch((e) => {
      callback({ statusCode: 404, message: 'ページが見つかりません' })
    })
  }
}
```

エラーページをカスタマイズするには [ビューのレイアウトセクション](/guide/views#レイアウト) を参照してください。
