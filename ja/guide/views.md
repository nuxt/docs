---
title: ビュー
description: このセクションでは Nuxt.js アプリケーションの特定のルートにデータとビューを設定するために必要なことすべてを説明します（ページ、レイアウト、HTML の head タグのメタ情報などを含みます）
---

<!-- title: Views -->
<!-- description: The Views section describes all you need to configure data and views for a specific route in your Nuxt.js application. (Pages, layouts and HTML Head) -->

<!-- \> The Views section describes all you need to configure data and views for a specific route in your Nuxt.js application. (Pages, layouts and HTML Head) -->

> このセクションでは Nuxt.js アプリケーションの特定のルートにデータとビューを設定するために必要なことすべてを説明します（ページ、レイアウト、HTML の head タグのメタ情報などを含みます）

<!-- ## Pages -->

## ページ

<!-- Every Page component is a Vue component, but Nuxt.js adds special keys to make the development of your universal application the easiest way possible. -->

すべてのページコンポーネントは Vue コンポーネントですが、Nuxt.js はユニバーサルなアプリケーションを最も簡単なやり方で開発することを可能にために、特別なキーを追加します。  

<!-- ```html -->
<!-- <template> -->
<!--   <h1 class="red">Hello {{ name }}!</h1> -->
<!-- </template> -->

<!-- <script> -->
<!-- export default { -->
<!--   data (context) { -->
<!--     // called every time before loading the component -->
<!--     return { name: 'World' } -->
<!--   }, -->
<!--   fetch () { -->
<!--     // The fetch method is used to fill the store before rendering the page -->
<!--   }, -->
<!--   head () { -->
<!--     // Set Meta Tags for this Page -->
<!--   }, -->
<!--   // and more functionality to discover -->
<!--   ... -->
<!-- } -->
<!-- </script> -->

<!-- <style> -->
<!-- .red { -->
<!--   color: red; -->
<!-- } -->
<!-- </style> -->
<!-- ``` -->

```html
<template>
  <h1 class="red">Hello {{ name }}!</h1>
</template>

<script>
export default {
  data (context) {
    // コンポーネントがロードされる前に毎回呼び出されます
    return { name: 'World' }
  },
  fetch () {
    // fetch メソッドは、ページがレンダリングされる前に、ストアにデータを入れるために使われます
  },
  head () {
    // このページのメタタグをセットします
  },
  // さらにいろいろな機能が続きます...
  ...
}
</script>

<style>
.red {
  color: red;
}
</style>
```

<!-- | Attribute | Description | -->
<!-- |-----------|-------------| -->
<!-- | data | The most important key, it has the same purpose as [Vue data](https://vuejs.org/v2/api/#Options-Data) but it can be asynchronous and receives the context as argument, please read the [async data documentation](/guide/async-data) to learn how it works. | -->
<!-- | fetch | Used to fill the store before rendering the page, it's like the data method except it doesn't set the component data. See the [API Pages fetch documentation](/api/pages-fetch). | -->
<!-- | head | Set specific Meta Tags for the current page, see [API Pages head documentation](/api/pages-head). | -->
<!-- | layout | Specify a layout defined in the `layouts` directory, see [API Pages layouts documentation](/api/pages-layout). | -->
<!-- | transition | Set a specific transition for the page, see [API Pages transition](/api/pages-transition). | -->
<!-- | scrollToTop | Boolean, by default: `false`. Specify if you want the page to scroll to the top before rendering the page, it's used for [nested routes](/guide/routing#nested-routes). | -->
<!-- | validate | Validator function for a [dynamic route](/guide/routing#dynamic-routes). | -->
<!-- | middleware | Set a middleware for this page, the middleware will be called before rendering the page, see [routes middleware](/guide/routing#middleware). | -->

| 属性 | 説明 |
|-----------|-------------|
| data | 最も重要なキーであり [Vue.js の data オプション](https://vuejs.org/v2/api/#Options-Data) と同じ意義を持っています。しかし（訳注: Nuxt.js が data に手を加えているため）非同期に動作し、また引数として context を受け取ります。どのように動作するかを知るには [非同期データに関するドキュメント](/guide/async-data) を参照してください |
| fetch | ページがレンダリングされる前に、データをストアに入れるために使います。コンポーネントのデータをセットすること以外は data メソッドと似ています。[ページのフェッチ API に関するドキュメント](/api/pages-fetch) を参照してください |
| head | 現在のページの特定のメタタグを設定します。[ページの head API](/api/pages-head) を参照してください |
| layout | `layouts` ディレクトリ内のレイアウトを指定します。[ページのレイアウト API に関するドキュメント](/api/pages-layout) を参照してください |
| transition | ページに特定のトランジションを設定します。[ページのトランジション API に関するドキュメント](/api/pages-transition) を参照してください |
| scrollToTop | ブーリアンで指定し、デフォルトは `false` です。ページをレンダリングする前にトップまでスクロールさせるか否かを指定します。これは [ネストされたルート](/guide/routing#nested-routes) で使われます |
| validate | [動的なルーティング](/guide/routing#dynamic-routes) のためのバリデーション関数です |
| middleware | このページのためにミドルウェアを設定し、ミドルウェアはページがレンダリングされる前に呼び出されます。[ルーティングのミドルウェア](/guide/routing#middleware) を参照してください |

<!-- More information about the pages properties usage: [API Pages](/api) -->

ページのプロパティの使い方についてより深く理解するには [ページ API](/api) を参照してください。

<!-- ## Layouts -->

## レイアウト

<!-- Nuxt.js lets you extend the main layout or create custom layouts by adding them in the `layouts` directory. -->

Nuxt.js ではメインレイアウトを拡張したり、カスタムレイアウトを `layouts` ディレクトリに入れてレイアウトを追加したりすることができます。

<!-- ### Default Layout -->

### デフォルトレイアウト

<!-- You can extend the main layout by adding a `layouts/default.vue` file. -->

`layouts/default.vue` ファイルを追加することでメインレイアウトを拡張できます。

<!-- *Make sure to add the `<nuxt>` component when creating a layout to display the page component.* -->

*ページコンポーネントを表示するレイアウトを作成するときは、必ず `<nuxt/>` コンポーネントを入れておくことを覚えておいてください。*

<!-- The default layout source code is: -->

デフォルトのレイアウトのソースコードは下記のようになっています:

```html
<template>
  <nuxt/>
</template>
```

<!-- ### Error Page -->

### エラーページ

<!-- You can customize the error page by adding a `layouts/error.vue` file. -->

`layouts/error.vue` ファイルを追加することでエラーページをカスタマイズできます。

<!-- This layout is special since you should not include `<nuxt/>` inside its template. You must see this layout as a component displayed when an error occurs (404, 500, etc). -->

このレイアウトはテンプレート内に `<nuxt/>` を含まないという意味で特殊です。このレイアウトは 404 や 500 エラーなどが発生したときに表示されるコンポーネントとして見ることになります。

<!-- The default error page source code is [available on Github](https://github.com/nuxt/nuxt.js/blob/master/lib/app/components/nuxt-error.vue). -->

デフォルトのエラーページのソースコードは [Github](https://github.com/nuxt/nuxt.js/blob/master/lib/app/components/nuxt-error.vue) で確認できます。

<!-- Example of a custom error page in `layouts/error.vue`: -->

`layouts/error.vue` にカスタムエラーページを書くときの例:

<!-- ```html -->
<!-- <template> -->
<!--   <div class="container"> -->
<!--     <h1 v-if="error.statusCode === 404">Page not found</h1> -->
<!--     <h1 v-else>An error occurred</h1> -->
<!--     <nuxt-link to="/">Home page</nuxt-link> -->
<!--   </div> -->
<!-- </template> -->

<!-- <script> -->
<!-- export default { -->
<!--   props: ['error'] -->
<!-- } -->
<!-- </script> -->
<!-- ``` -->

```html
<template>
  <div class="container">
    <h1 v-if="error.statusCode === 404">ページが見つかりません</h1>
    <h1 v-else>エラーが発生しました</h1>
    <nuxt-link to="/">ホーム</nuxt-link>
  </div>
</template>

<script>
export default {
  props: ['error']
}
</script>
```

<!-- ### Custom Layout -->

### カスタムレイアウト

<!-- Every file (*first level*) in the `layouts` directory will create a custom layout accessible with the `layout` property in the page component. -->

`layouts` ディレクトリの *第一階層* のファイルで、ページコンポーネント内の `layout` プロパティで指定できるカスタムレイアウトを作成できます。

<!-- *Make sure to add the `<nuxt/>` component when creating a layout to display the page component.* -->

*ページコンポーネントを表示するレイアウトを作成するときは、必ず `<nuxt/>` コンポーネントを入れておくことを覚えておいてください。*

<!-- Example of `layouts/blog.vue`: -->

`layouts/blog.vue` の例:

<!-- ```html -->
<!-- <template> -->
<!--   <div> -->
<!--     <div>My blog navigation bar here</div> -->
<!--     <nuxt/> -->
<!--   </div> -->
<!-- </template> -->
<!-- ``` -->

```html
<template>
  <div>
    <div>ブログのナビゲーションバーをここに設置します</div>
    <nuxt/>
  </div>
</template>
```

<!-- And then in `pages/posts.vue`, you can tell Nuxt.js to use your custom layout: -->

それから `pages/posts.vue` ファイル内で、カスタムレイアウトを使うことを Nuxt.js に伝えます:

```html
<script>
export default {
  layout: 'blog'
}
</script>
```

<!-- More information about the layout property: [API Pages layout](/api/pages-layout) -->

layout プロパティについてより深く理解するには [ページレイアウト API](/api/pages-layout) を参照してください。

また、動作する様子を [デモ動画](https://www.youtube.com/watch?v=YOKnSTp7d38) で確認してみてください。

<!-- ## HTML Head -->

## HTML の head 情報

<!-- Nuxt.js uses [vue-meta](https://github.com/declandewet/vue-meta) to update the `headers` and `html attributes` of your application. -->

Nuxt.js はアプリケーションの `headers` 及び `html attributes` を更新するために [vue-meta](https://github.com/declandewet/vue-meta) を使います。

<!-- Nuxt.js configures `vue-meta` with these options: -->

Nuxt.js では下記のオプションで `vue-meta` を設定します:

<!-- ```js -->
<!-- { -->
<!--   keyName: 'head', // the component option name that vue-meta looks for meta info on. -->
<!--   attribute: 'n-head', // the attribute name vue-meta adds to the tags it observes -->
<!--   ssrAttribute: 'n-head-ssr', // the attribute name that lets vue-meta know that meta info has already been server-rendered -->
<!--   tagIDKeyName: 'hid' // the property name that vue-meta uses to determine whether to overwrite or append a tag -->
<!-- } -->
<!-- ``` -->

```js
{
  keyName: 'head', // vue-meta がメタ情報を探すためのコンポーネントオプションの名前
  attribute: 'n-head', // vue-meta がタグを監視するためにタグに追加する属性名
  ssrAttribute: 'n-head-ssr', // メタ情報が既にサーバーサイドでレンダリングされていることを vue-meta に知らせるための属性名
  tagIDKeyName: 'hid' // vue-meta がタグを上書きすべきかタグを追加すべきか判断するために用いるプロパティ名
}
```

<!-- ### Default Meta Tags -->

### デフォルトのメタタグ

<!-- Nuxt.js let you define all default meta for your application inside `nuxt.config.js`, use the same `head` property: -->

Nuxt.js ではアプリケーションのデフォルトのメタ情報を `nuxt.config.js` で設定できます。`head` プロパティを使用します:

<!-- Example of a custom viewport with a custom Google font: -->

カスタム viewport 及び Google フォントを定義する例:

```js
head: {
  meta: [
    { charset: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' }
  ],
  link: [
    { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto' }
  ]
}
```

<!-- To know the list of options you can give to `head`, take a look at [vue-meta documentation](https://github.com/declandewet/vue-meta#recognized-metainfo-properties). -->

`head` に渡せるオプションのリストを確認するには [vue-meta のドキュメント](https://github.com/declandewet/vue-meta#recognized-metainfo-properties) を見てみてください。

<!-- More information about the head method: [API Configuration head](/api/configuration-head) -->

head メソッドについてより深く理解するには [head 設定 API](/api/configuration-head) を参照してください。

<!-- ### Custom Meta Tags for a Page -->

### 特定のページにメタタグを設定する

<!-- More information about the head method: [API Pages head](/api/pages-head) -->

特定のページにメタタグを設定する方法について [ページ head API](/api/pages-head) を参照してください。

<!-- <p class="Alert">To avoid any duplication when used in child component, please give a unique identifier with the `hid` key, please [read more about it](https://github.com/declandewet/vue-meta#lists-of-tags).</p> -->

<p class="Alert">子コンポーネントで利用されたときにメタ情報が重複してしまうことを避けるために `hid` キーでユニーク識別子を与えてください。また、これについてより深く理解するには [こちら](https://github.com/declandewet/vue-meta#lists-of-tags) を参照してください。</p>
