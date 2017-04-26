---
title: ビュー
description: このセクションでは Nuxt.js アプリケーションの特定のルートにデータとビューを設定するために必要なことすべてを説明します（ドキュメント、レイアウト、ページ、HTML の head タグのメタ情報などを含みます）
---

> このセクションでは Nuxt.js アプリケーションの特定のルートにデータとビューを設定するために必要なことすべてを説明します（ドキュメント、レイアウト、ページ、HTML の head タグのメタ情報などを含みます）

![nuxt-views-schema](/nuxt-views-schema.png)

## ドキュメント

> メインのドキュメントをカスタマイズすることができます。

HTML テンプレートを拡張するために、プロジェクトのルートディレクトリに `app.html` を作成します。

デフォルトのテンプレートは下記です:

```html
<!DOCTYPE html>
<html {{ HTML_ATTRS }}>
  <head>
    {{ HEAD }}
  </head>
  <body {{ BODY_ATTRS }}>
    {{ APP }}
  </body>
</html>
```

条件付きで IE のための CSS クラスを追加する例:

```html
<!DOCTYPE html>
<!--[if IE 9]><html lang="en-US" class="lt-ie9 ie9" {{ HTML_ATTRS }}><![endif]-->
<!--[if (gt IE 9)|!(IE)]><!--><html {{ HTML_ATTRS }}><!--<![endif]-->
  <head>
    {{ HEAD }}
  </head>
  <body {{ BODY_ATTRS }}>
    {{ APP }}
  </body>
</html>
```

## レイアウト

Nuxt.js ではメインレイアウトを拡張したり、カスタムレイアウトを `layouts` ディレクトリに入れてレイアウトを追加したりすることができます。

### デフォルトレイアウト

`layouts/default.vue` ファイルを追加することでメインレイアウトを拡張できます。

*ページコンポーネントを表示するレイアウトを作成するときは、必ず `<nuxt/>` コンポーネントを入れておくことを覚えておいてください。*

デフォルトのレイアウトのソースコードは下記のようになっています:

```html
<template>
  <nuxt/>
</template>
```

### エラーページ

`layouts/error.vue` ファイルを追加することでエラーページをカスタマイズできます。

このレイアウトはテンプレート内に `<nuxt/>` を含まないという意味で特殊です。このレイアウトは 404 や 500 エラーなどが発生したときに表示されるコンポーネントとして見ることになります。

デフォルトのエラーページのソースコードは [GitHub](https://github.com/nuxt/nuxt.js/blob/master/lib/app/components/nuxt-error.vue) で確認できます。

`layouts/error.vue` にカスタムエラーページを書くときの例:

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
  props: ['error'],
  layout: 'blog' // エラーページ用のカスタムレイアウトを指定できます
}
</script>
```

### カスタムレイアウト

`layouts` ディレクトリの *第一階層* のファイルで、ページコンポーネント内の `layout` プロパティで指定できるカスタムレイアウトを作成できます。

*ページコンポーネントを表示するレイアウトを作成するときは、必ず `<nuxt/>` コンポーネントを入れておくことを覚えておいてください。*

`layouts/blog.vue` の例:

```html
<template>
  <div>
    <div>ブログのナビゲーションバーをここに設置します</div>
    <nuxt/>
  </div>
</template>
```

それから `pages/posts.vue` ファイル内で、カスタムレイアウトを使うことを Nuxt.js に伝えます:

```html
<script>
export default {
  layout: 'blog'
}
</script>
```

layout プロパティについてより深く理解するには [ページレイアウト API](/api/pages-layout) を参照してください。

また、動作する様子を [デモ動画](https://www.youtube.com/watch?v=YOKnSTp7d38) で確認してみてください。

## ページ

すべてのページコンポーネントは Vue コンポーネントですが、Nuxt.js はユニバーサルなアプリケーションを最も簡単なやり方で開発することを可能にために、特別なキーを追加します。  

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

<!-- | asyncData | The most important key, it can be asynchronous and receives the context as argument, please read the [async data documentation](/guide/async-data) to learn how it works. |

| 属性 | 説明 |
|-----------|-------------|
| asyncData | 最も重要なキーです。非同期に動作し、引数として context を受け取ります。どのように動作するかを知るには [非同期データに関するドキュメント](/guide/async-data) を参照してください |
| fetch | ページがレンダリングされる前に、データをストアに入れるために使います。コンポーネントのデータをセットすること以外は data メソッドと似ています。[ページのフェッチ API に関するドキュメント](/api/pages-fetch) を参照してください |
| head | 現在のページの特定のメタタグを設定します。[ページの head API](/api/pages-head) を参照してください |
| layout | `layouts` ディレクトリ内のレイアウトを指定します。[ページのレイアウト API に関するドキュメント](/api/pages-layout) を参照してください |
| transition | ページに特定のトランジションを設定します。[ページのトランジション API に関するドキュメント](/api/pages-transition) を参照してください |
| scrollToTop | ブーリアンで指定し、デフォルトは `false` です。ページをレンダリングする前にトップまでスクロールさせるか否かを指定します。これは [ネストされたルート](/guide/routing#ネストされたルート) で使われます |
| validate | [動的なルーティング](/guide/routing#動的なルーティング) のためのバリデーション関数です |
| middleware | このページのためにミドルウェアを設定し、ミドルウェアはページがレンダリングされる前に呼び出されます。[ルーティングのミドルウェア](/guide/routing#ミドルウェア) を参照してください |

ページのプロパティの使い方についてより深く理解するには [ページ API](/api) を参照してください。

## HTML の head 情報

Nuxt.js はアプリケーションの `headers` 及び `html attributes` を更新するために [vue-meta](https://github.com/declandewet/vue-meta) を使います。

Nuxt.js では下記のオプションで `vue-meta` を設定します:

```js
{
  keyName: 'head', // vue-meta がメタ情報を探すためのコンポーネントオプションの名前
  attribute: 'data-n-head', // vue-meta がタグを監視するためにタグに追加する属性名
  ssrAttribute: 'data-n-head-ssr', // メタ情報が既にサーバーサイドでレンダリングされていることを vue-meta に知らせるための属性名
  tagIDKeyName: 'hid' // vue-meta がタグを上書きすべきかタグを追加すべきか判断するために用いるプロパティ名
}
```

### デフォルトのメタタグ

Nuxt.js ではアプリケーションのデフォルトのメタ情報を `nuxt.config.js` で設定できます。`head` プロパティを使用します:

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

`head` に渡せるオプションのリストを確認するには [vue-meta のドキュメント](https://github.com/declandewet/vue-meta#recognized-metainfo-properties) を見てみてください。

head メソッドについてより深く理解するには [head 設定 API](/api/configuration-head) を参照してください。

### 特定のページにメタタグを設定する

特定のページにメタタグを設定する方法について [ページ head API](/api/pages-head) を参照してください。

<p class="Alert">子コンポーネントで利用されたときにメタ情報が重複してしまうことを避けるために `hid` キーでユニーク識別子を与えてください。また、これについてより深く理解するには [こちら](https://github.com/declandewet/vue-meta#lists-of-tags) を参照してください。</p>
