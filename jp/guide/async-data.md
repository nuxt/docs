---
title: 非同期なデータ
description: サーバーサイドでデータを取得し、それをレンダリングしたいことがあるでしょう。Nuxt.js はコンポーネントのデータをセットする前に非同期の処理を行えるようにするために `asyncData` メソッドを追加しています。
---

<!-- title: Async Data -->
<!-- description: You may want to fetch data and render it on the server-side. Nuxt.js add an `asyncData` method let you handle async operation before setting the component data. -->

<!-- \> You may want to fetch data and render it on the server-side. Nuxt.js add an `asyncData` method let you handle async operation before setting the component data. -->

> サーバーサイドでデータを取得し、それをレンダリングしたいことがあるでしょう。Nuxt.js はコンポーネントのデータをセットする前に非同期の処理を行えるようにするために `asyncData` メソッドを追加しています。

<!-- ## The asyncData Method -->

## asyncData メソッド

<!-- Sometimes you just want to fetch data and pre-render on the server-side without using a store. `asyncData` is called every time before loading the component (**only for pages components**). It can be called from the server-side or before navigating to the corresponding route. This method receives [the context](/api#context) as the first argument, you can use it to fetch some data and nuxt.js will merge them with the component data. -->

サーバーサイドでストアは使わずに、単にデータをフェッチしてレンダリングの事前処理をしたいときがあるでしょう。`asyncData` はコンポーネント（ページコンポーネントに限ります）がロードされる前に毎回呼び出されます。サーバーサイドレンダリングや、ユーザーがページを遷移する前にも呼び出されます。そしてこのメソッドは第一引数として [コンテキスト](/api#コンテキスト) を受け取り、コンテキストを使ってデータを取得してコンポーネントのデータとマージすることができます。

<!-- <div class="Alert Alert--orange">You do **NOT** have access of the component instance trough `this` inside `data` because it is called **before initiating** the component.</div> -->

<div class="Alert Alert--orange">`data` メソッド内の `this` を通してコンポーネントのインスタンスにアクセスすることは **できません**。それはコンポーネントがインスタンス化される前に data メソッドが呼び出されるためです。</div>

<!-- To use the asyncData method, nuxt.js offers you different ways, choose the one you're the most familiar with: -->

Nuxt.js では asyncData メソッドを使うために、いくつかの異なるやり方があるので、お好きなものを選んでください:

<!-- 1. returning a `Promise`, nuxt.js will wait for the promise to be resolved before rendering the component. -->
<!-- 2. Using the [async/await proposal](https://github.com/lukehoban/ecmascript-asyncawait) ([learn more about it](https://zeit.co/blog/async-and-await)) -->
<!-- 3. Define a callback as second argument. It has to be called like this: `callback(err, data)` -->

1. `Promise` を返す。Nuxt.js はコンポーネントがレンダリングされる前に Promise が解決されるまで待ちます
2. [async/await](https://github.com/lukehoban/ecmascript-asyncawait) を使う（[より深く理解する](https://zeit.co/blog/async-and-await)）
3. 第二引数としてコールバックを定義する。右のように呼び出される必要があります: `callback(err, data)`

<!-- ### Returning a Promise -->

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

<!-- ### Using async/await -->

### async/await を使う

```js
export default {
  async asyncData ({ params }) {
    let { data } = await axios.get(`https://my-api/posts/${params.id}`)
    return { title: data.title }
  }
}
```

<!-- ### Using a callback -->

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

<!-- ### Displaying the data -->

### データを表示する

<!-- The result from asyncData will be **merged** with data. You can display the data inside your template like you used to do: -->

asyncData の結果はコンポーネントのデータと **マージされ** ます。下記のように template の内側でデータを表示することができます:

```html
<template>
  <h1>{{ title }}</h1>
</template>
```

<!-- ## The Context -->

## コンテキスト

<!-- To see the list of available keys in `context`, take a look at the [API Pages data](/api). -->

`context` 内で利用できるキーの一覧を確認するには [ページ data API](/api) を参照してください。

<!-- ## Handling Errors -->

## エラー処理

<!-- Nuxt.js add the `error(params)` method in the `context`, you can call it to display the error page. `params.statusCode` will be also used to render the proper status code form the server-side. -->

Nuxt.js は `context` の中に `error(params)` メソッドを追加しています。これを呼び出すことでエラーページを表示できます。

<!-- Example with a `Promise`: -->

`Promise` を使った例:

<!-- ```js -->
<!-- export default { -->
<!--   asyncData ({ params, error }) { -->
<!--     return axios.get(`https://my-api/posts/${params.id}`) -->
<!--     .then((res) => { -->
<!--       return { title: res.data.title } -->
<!--     }) -->
<!--     .catch((e) => { -->
<!--       error({ statusCode: 404, message: 'Post not found' }) -->
<!--     }) -->
<!--   } -->
<!-- } -->
<!-- ``` -->

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

<!-- If you're using the `callback` argument, you can call it directly with the error, nuxt.js will call the `error` method for you: -->

`callback` 引数を使っているときは、直接、エラー内容と共に callback を呼び出すことができ、そうすると Nuxt.js は `error` メソッドを実行します。

<!-- ```js -->
<!-- export default { -->
<!--   asyncData ({ params }, callback) { -->
<!--     axios.get(`https://my-api/posts/${params.id}`) -->
<!--     .then((res) => { -->
<!--       callback(null, { title: res.data.title }) -->
<!--     }) -->
<!--     .catch((e) => { -->
<!--       callback({ statusCode: 404, message: 'Post not found' }) -->
<!--     }) -->
<!--   } -->
<!-- } -->
<!-- ``` -->

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

<!-- To customize the error page, take a look at the [VIEWS layouts section](/guide/views#layouts). -->

エラーページをカスタマイズするには [ビューのレイアウトセクション](/guide/views#レイアウト) を参照してください。
