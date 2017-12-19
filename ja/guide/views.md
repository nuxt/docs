---
title: ビュー
description: ビューセクションでは Nuxt アプリケーションで特定のルートに対してデータとビューを設定するため必要なもの全て説明しています (ドキュメントレイアウト、ページそしてヘッド)。
---

> ビューセクションでは Nuxt アプリケーションで特定のルートに対してデータとビューを設定するため必要なもの全て説明しています (ドキュメントレイアウト、ページそしてヘッド)。

![nuxt-views-schema](/nuxt-views-schema.png)

## ドキュメント

> Nuxt.js でメインドキュメントをカスタマイズできます。

HTML テンプレートを拡張するために、プロジェクトのルートにおいて `app.html` を作成します。

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
}
</script>
```

The `layouts/error.vue` does not allow composing with other layouts (they `layouts` attribute is ignored) due to conflicts (especially with css).  Instead, you should add your own header components, etc directly to `layouts/error.vue`.

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
  asyncData (context) {
    // コンポーネントをロードする前に毎回呼び出されます
    return { name: 'World' }
  },
  fetch () {
    // `fetch` メソッドはページの描画前にストアを満たすために使用されます
the page
  },
  head () {
    // このページ向けにメタタグを設定します
  },
  // そしてもっと多くの機能を見つける
  ...
}
</script>
<style>
.red {
  color: red;
}
</style>
```

属性 | 説明
--- | ---
asyncData | 最も重要なキーとして、非同期でかつコンテキストを引数として受信することです。どのように動作するのか学習するために、[async data documentation](/guide/async-data) を読んでください。
fetch | ページの描画前にストアを満たすために使用されます。コンポーネントデータを設定しない点を除いて、データメソッドのようなものです。[API Pages `fetch` documentation](/api/pages-fetch) を参照してください。
head | 現在のページに対して特定のメタタグを設定します。[API Pages `head` documentation](/api/pages-head)を参照してください。
layout | `layouts` ディレクトリで定義されたレイアウトを指定します。[API Pages `layout` documentation](/api/pages-layout) を参照してください。
transition | ページに対して特定のトランジションを設定します。[API Pages `transition`](/api/pages-transition) を参照してください。
scrollToTop | Boolean、デフォルトは `false`: ページの描画前にトップにスクロールしたいしたい場合、[nested routes](/guide/routing#nested-routes) に対して使用されます。
validate | [dynamic routes](/guide/routing#dynamic-routes) に対する検証関数。
middleware | このページに対してミドルウェアを設定します。ミドルウェアはページを描画する前に呼ばれます。ルート [middleware](/guide/routing#middleware) を参照してください。

ページプロパティの使用についてより多くの情報: [API Pages](/api)

## HTML ヘッド

Nuxt.js は `headers` とアプリケーションの `html attributes` を更新するために [vue-meta](https://github.com/declandewet/vue-meta) を使用しています。

Nuxt.js はこれらのオプションで `vue-meta` を設定します:

```js
{
  keyName: 'head', // vue-meta がメタ情報を探すためのコンポーネントオプション名
  attribute: 'data-n-head', // vue-méta がそれをオブザーブするタグに追加する属性名
  ssrAttribute: 'data-n-head-ssr', // メタ情報がすでにサーバで描画されていることを vue-meta に知らせる属性名
  tagIDKeyName: 'hid' // タグを上書きするか追加するかを決定するために vue-meta が使用するプロパティ名
}
```

### デフォルトメタタグ

Nuxt.js を使用すると、`nuxt.config.js` 内のアプリケーションのすべてのデフォルトメタタグを定義し、同じ `head` プロパティを使用します:

カスタム Google フォントによるカスタム viewport の例:

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

 `head` に与えることができるオプションのリストを知るためには、[vue-meta documentation](https://github.com/declandewet/vue-meta#recognized-metainfo-properties) を参照してください。

`head` メソッドに関するより多くの情報:  [API Configuration `head`](/api/configuration-head)

### ページに対するカスタムメタタグ

ヘッドメソッドに関するより多くの情報: [API Pages `head`](/api/pages-head)


<p class="Alert">子コンポーネントで使用するとき、任意の重複を回避するために、`hid`キーでユニークなIDが与えてください。[それについてより多くの情報を読んで](https://github.com/declandewet/vue-meta#lists-of-tags)ください。</p>
