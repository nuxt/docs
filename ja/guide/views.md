---
title: ビュー
description: Views セクションでは、Nuxt.js アプリケーション（ドキュメント、レイアウト、ページ、およびHTMLヘッド）内の特定のルートのデータとビューを設定するために必要なことを全て説明しています。
---

> Views セクションでは、Nuxt.js アプリケーション（アプリテンプレート、レイアウト、ページ、およびHTMLヘッド）内の特定のルートのデータとビューを設定するために必要なことを全て説明しています。

![nuxt-views-schema](/nuxt-views-schema.svg)

## アプリテンプレート

> スクリプトまたは条件付きの CSS クラスを含めるために Nuxt.js で使われる HTML アプリテンプレートをカスタマイズできます。

テンプレートを変更するために、プロジェクトのルートフォルダに `app.html` ファイルを作成します。

Nuxt.js 使われるデフォルトのテンプレート:

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

カスタムアプリテンプレートを使用して、IE 用に条件付きのCSSクラスを追加するユースケースのひとつ:

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

<!-- TODO: Load polyfills here? -->

## レイアウト

Nuxt.js アプリの外観を変更したい場合、レイアウトは非常に役立ちます。
サイドバーを含めるか、モバイルとデスクトップ用に異なるレイアウトを使用するかです。

### デフォルトレイアウト

`layouts/default.vue` ファイルを追加することでメインレイアウトを拡張できます。
メインレイアウトは、レイアウト指定がされていないすべてのページに使用されます。

<div class="Alert Alert--nuxt-green">

<b>情報:</b> 実際にページコンポーネントが含まれるようにレイアウトを作成するときは、必ず `<nuxt/>` コンポーネントを入れておくことを覚えておいてください。

</div>

次にあるデフォルトのレイアウトはたった3行で、単純にページコンポーネントをレンダリングします:

```html
<template>
  <nuxt/>
</template>
```

### エラーページ

`layouts/error.vue` ファイルを追加することでエラーページをカスタマイズできます。

このレイアウトは、テンプレート内に `<nuxt/>` を含めては*ならない*という点で特殊です。このレイアウトは、`404` や `500` などのエラーが発生した際に表示されるコンポーネントとしてみる必要があります。
### Custom Layout

デフォルトのエラーページのソースコードは [GitHub](https://github.com/nuxt/nuxt.js/blob/dev/packages/vue-app/template/components/nuxt-error.vue) で確認できます。
Every file (*top-level*) in the `layouts` directory will create a custom layout accessible with the `layout` property in the page components.

`layouts/error.vue` にカスタムエラーページを書くときの例:
Let's say we want to create a blog layout and save it to `layouts/blog.vue`:

```html
<template>
  <div>
    <div>My blog navigation bar here</div>
    <nuxt/>
  </div>
</template>
<script>
export default {
  layout: 'blog'
  // ページコンポーネントの定義
}
</script>
```

### カスタムレイアウト
More information about the `layout` property: [API Pages `layout`](/api/pages-layout)

Check out the [demonstration video](https://www.youtube.com/watch?v=YOKnSTp7d38) to see custom layouts in action.

<!-- TODO: Scoped styles best practice -->

### Error Page

The error page is a *page component* which is always displayed when an error occurs (that does not happen while server-side rendering).

<div class="Alert Alert--orange">

<b>Warning:</b> Though this file is placed in the <code>layouts</code> folder, it should be treated as a <b>page</b>.

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

`layout` プロパティについてより多くの情報: <a href="/api/pages-layout" data-md-type="link">`layout` プロパティ</a>を参照してください。

また、動作する様子を [デモ動画](https://www.youtube.com/watch?v=YOKnSTp7d38) で確認してみてください。

## ページ

すべてのページコンポーネントは Vue コンポーネントですが、Nuxt.js はユニバーサルアプリケーション開発を可能な限り容易にするために特別なキーを追加しています。

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
`asyncData` | 最も重要なキーです。非同期であり、コンテキストを引数として受け取ります。どのように動作するかは、[async data](/guide/async-data) を参照してください。
`fetch` | ページをレンダリングする前にストアを満たすために使用されます。`data` メソッドに似ていますが、コンポーネントデータは設定しません。[`fetch` メソッド](/api/pages-fetch)を参照してください。
`head` | 現在のページに対して特定の `<meta>` タグを設定します。[`head` メソッド](/api/pages-head)を参照してください。
`layout` | `layouts` ディレクトリに定義されているレイアウトを指定します。 [`layout` プロパティ](/api/pages-layout)を参照してください。
`loading` | `false` に設定すると、ページへ遷移してきた際に `this.$nuxt.$loading.finish()` が呼び出されなくなり、ページから離れる際に `this.$nuxt.$loading.start()` が呼び出されなくなります。これによりローディングの振る舞いを **手動で** 制御ができるようになります。この動作は、[example](/examples/custom-page-loading)から確認できます。`loading` は `nuxt.config.js` で設定されている場合のみ適用されます。[`loading` プロパティ](/api/configuration-loading)を参照してください。
`transition` | ページの特定のトランジションを設定します。[`transition` プロパティ](/api/pages-transition)を参照してください。
`scrollToTop` | Boolean 型（デフォルト値：`false`）で、ページをレンダリングする前にページを一番上にスクロールするかどうかを指定します。これは[ネストされたルート](/guide/routing#nested-routes)に使用されます。
`validate` | [動的なルーティング](/guide/routing#dynamic-routes)に対する検証関数です。
`middleware` | このページのミドルウェアを設定します。ミドルウェアは、ページをレンダリングする前に呼び出されます。[ミドルウェアに関するドキュメント](/guide/routing#middleware)を参照してください。

ページプロパティの使用についてより多くの情報: [ページに関するドキュメント](/api)をご覧ください。

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

Nuxt.js では、`nuxt.config.js` 内にデフォルトの `<meta>` タグを全て定義することができます。`head` プロパティを使用し、デフォルトのメタタグを定義します:

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

`head` で利用できるオプションの詳細については、[メタ情報プロパティの認識](https://github.com/declandewet/vue-meta#recognized-metainfo-properties)を参照してください。

`head` メソッドに関するより多くの情報:  <a href="/api/configuration-head" data-md-type="link">`head` プロパティ</a>を参照してください。

### ページに対するカスタムメタタグ

head メソッドに関するより多くの情報:  [`head` プロパティ](/api/pages-head)を参照してください。

<div class="Alert">

子コンポーネント使用で重複を避けるために、`hid` キーにはユニークな識別子を与えてください。[更に詳しく](https://github.com/declandewet/vue-meta#lists-of-tags)

</div>
