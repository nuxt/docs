---
title: 非同期なデータ
description: サーバーサイドでデータを取得し、それをレンダリングしたいことがあるでしょう。Nuxt.js はコンポーネントのデータをセットする前に非同期の処理を行えるようにするために
  `asyncData` メソッドを追加しています。
---

> サーバーサイドでデータを取得し、それをレンダリングしたいことがあるでしょう。Nuxt.js はコンポーネントのデータをセットする前に非同期の処理を行えるようにするために `asyncData` メソッドを追加しています。

## asyncData メソッド

サーバーサイドでストアは使わずに、単にデータをフェッチしてレンダリングの事前処理をしたいときがあるでしょう。`asyncData` はコンポーネント（ページコンポーネントに限ります）がロードされる前に毎回呼び出されます。サーバーサイドレンダリングや、ユーザーがページを遷移する前にも呼び出されます。そしてこのメソッドは第一引数として [コンテキスト](/api#%E3%82%B3%E3%83%B3%E3%83%86%E3%82%AD%E3%82%B9%E3%83%88) を受け取り、コンテキストを使ってデータを取得してコンポーネントのデータとマージすることができます。


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

### 動的なルートデータへのアクセス

動的なルートデータへアクセスするために、`asyncData` プロパティに注入されたコンテキストオブジェクトを使用することができます。例えば、動的なルートパラメータは、それを構成したファイルまたはフォルダの名前を使用してアクセスできます。`_slug.vue` と命名されたファイルを定義した場合は、`context.params.slug` でアクセスすることができます。

## エラー処理

Nuxt.jsは`error(params)`を`context`に追加し、それをエラーページを表示するために呼び出すことができます。`params.statusCode`はサーバー側から適切なステータスコードを表示するためにも使用されます。

`Promise` による例:

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

`callback`引数を使用する場合、直接エラーによってそれを呼び出すことができ、そして Nuxt.js は `error` メソッドを呼び出すことができます:

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

エラーページをカスタマイズするには [ビューのレイアウトセクション](/guide/views#%E3%83%AC%E3%82%A4%E3%82%A2%E3%82%A6%E3%83%88) を参照してください。
