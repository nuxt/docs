---
title: ルーティング
description: Nuxt.js はウェブアプリケーションのルーティングを生成するためにファイルシステムを利用します。それは PHP がルーティングを生成するようにシンプルです。
---

<!-- title: Routing -->
<!-- description: Nuxt.js use the file-system to generate the routes of your web applications, it's as simple as PHP to create routes. -->

<!-- \> Nuxt.js generates automatically the [vue-router](https://github.com/vuejs/vue-router) configuration according to your file tree of Vue files inside the `pages` directory. -->

> Nuxt.js は `pages` ディレクトリ内の Vue ファイルの木構造に沿って、自動的に [vue-router](https://github.com/vuejs/vue-router) の設定を生成します。

<!-- ## Basic Routes -->

## ルーティングの基礎

<!-- This file tree: -->

下記のようなファイルの木構造のとき:

```bash
pages/
--| user/
-----| index.vue
-----| one.vue
--| index.vue
```

<!-- will automatically generate: -->

自動的に以下が生成されます:

```js
router: {
  routes: [
    {
      name: 'index',
      path: '/',
      component: 'pages/index.vue'
    },
    {
      name: 'user',
      path: '/user',
      component: 'pages/user/index.vue'
    },
    {
      name: 'user-one',
      path: '/user/one',
      component: 'pages/user/one.vue'
    }
  ]
}
```

<!-- ## Dynamic Routes -->

## 動的なルーティング

<!-- To define a dynamic route with a param, you need to define a .vue file OR a directory **prefixed by an underscore**. -->

パラメータを使って動的なルーティングを定義するには .vue ファイル名またはディレクトリ名に **アンダースコアのプレフィックス** を付ける必要があります。

<!-- This file tree: -->

下記のような木構造のとき:

```bash
pages/
--| _slug/
-----| comments.vue
-----| index.vue
--| users/
-----| _id.vue
--| index.vue
```

<!-- will automatically generate: -->

自動的に以下が生成されます:

```js
router: {
  routes: [
    {
      name: 'index',
      path: '/',
      component: 'pages/index.vue'
    },
    {
      name: 'users-id',
      path: '/users/:id?',
      component: 'pages/users/_id.vue'
    },
    {
      name: 'slug',
      path: '/:slug',
      component: 'pages/_slug/index.vue'
    },
    {
      name: 'slug-comments',
      path: '/:slug/comments',
      component: 'pages/_slug/comments.vue'
    }
  ]
}
```

<!-- As you can see the route named `users-id` has the path `:id?` which makes it optional, if you want to make it required, create an `index.vue` file in the `users` directory. -->

`user-id` と名付けられたルートに `:id?` というパスがありますが、これはこの `:id` が必須ではないことを表します。もし必須にしたい場合は `users/_id` ディレクトリ内に `index.vue` ファイルを作成してください。

<!-- ### Validate Route params -->

### ルーティングのパラメータのバリデーション

<!-- Nuxt.js lets you define a validator method inside your dynamic route component. -->

Nuxt.js では、動的なルーティングをするコンポーネント内に、パラメータをバリデーションするメソッドを定義することができます。

<!-- In this example: `pages/users/_id.vue` -->

例えば `pages/users/_id.vue` 内にこのように書きます:

<!-- ```js -->
<!-- export default { -->
<!--   validate ({ params }) { -->
<!--     // Must be a number -->
<!--     return /^\d+$/.test(params.id) -->
<!--   } -->
<!-- } -->
<!-- ``` -->

```js
export default {
  validate ({ params }) {
    // 数値でなければならない
    return /^\d+$/.test(params.id)
  }
}
```

<!-- If the validate method does not return `true`, Nuxt.js will automatically load the 404 error page. -->

もしバリデーションのメソッドが `true` を返さなかった場合は、Nuxt.js は自動的に 404 エラーページをロードします。

<!-- More information about the validate method: [API Pages validate](/api/pages-validate) -->

バリデーションのメソッドについてより深く理解したい場合は [ページバリデーションの API](/api/pages-validate) を参照してください。

<!-- ## Nested Routes -->

## ネストされたルート

<!-- Nuxt.js lets you create nested route by using the children routes of vue-router. -->

Nuxt.js では vue-router の子ルートを使ってルートをネストさせることができます。

<!-- To define the parent component of a nested route, you need to create a Vue file with the **same name as the directory** which contain your children views. -->

ネストされたルートの親コンポーネントを定義するには、子ビューを含む **ディレクトリと同じ名前** の Vue ファイルを作成する必要があります。

<!-- <p class="Alert Alert--info">Don't forget to write `<nuxt-child/>` inside the parent component (.vue file).</p> -->

<p class="Alert Alert--info">親コンポーネント（.vue ファイル）内に `<nuxt-child/>` を書くことを覚えておいてください。</p>

<!-- This file tree: -->

下記のようなファイルの木構造のとき:

```bash
pages/
--| users/
-----| _id.vue
-----| index.vue
--| users.vue
```

<!-- will automatically generate: -->

自動的に以下が生成されます:

```js
router: {
  routes: [
    {
      path: '/users',
      component: 'pages/users.vue',
      children: [
        {
          path: '',
          component: 'pages/users/index.vue',
          name: 'users'
        },
        {
          path: ':id',
          component: 'pages/users/_id.vue',
          name: 'users-id'
        }
      ]
    }
  ]
}
```

<!-- ## Dynamic Nested Routes -->

## 動的でネストされたルート

<!-- This scenario should not often append, but it is possible with Nuxt.js: having dynamic children inside dynamic parents. -->

あまり頻繁に使うべきではありませんが、Nuxt.js では動的な親ルーティングの中に動的な子ルーティングを持つことが可能です。

<!-- This file tree: -->

下記のようなファイルの木構造のとき:

```bash
pages/
--| _category/
-----| _subCategory/
--------| _id.vue
--------| index.vue
-----| _subCategory.vue
-----| index.vue
--| _category.vue
--| index.vue
```

<!-- will automatically generate: -->

自動的に以下が生成されます:

```js
router: {
  routes: [
    {
      path: '/',
      component: 'pages/index.vue',
      name: 'index'
    },
    {
      path: '/:category',
      component: 'pages/_category.vue',
      children: [
        {
          path: '',
          component: 'pages/_category/index.vue',
          name: 'category'
        },
        {
          path: ':subCategory',
          component: 'pages/_category/_subCategory.vue',
          children: [
            {
              path: '',
              component: 'pages/_category/_subCategory/index.vue',
              name: 'category-subCategory'
            },
            {
              path: ':id',
              component: 'pages/_category/_subCategory/_id.vue',
              name: 'category-subCategory-id'
            }
          ]
        }
      ]
    }
  ]
}
```

<!-- ## Transitions -->

## トランジション

<!-- Nuxt.js uses the [&lt;transition&gt;](http://vuejs.org/v2/guide/transitions.html#Transitioning-Single-Elements-Components) component to let you create amazing transitions/animations between your routes. -->

Nuxt.js では [&lt;transition&gt;](http://vuejs.org/v2/guide/transitions.html#Transitioning-Single-Elements-Components) コンポーネントを使って、ページ間を遷移する際のトランジション/アニメーションを行うことができます。

<!-- ### Global Settings -->

### グローバルな設定

<!-- <p class="Alert Alert--info">Nuxt.js default transition name is `"page"`.</p> -->

<p class="Alert Alert--info">Nuxt.js のデフォルトのトランジション名は `"page"` です。</p>

<!-- To add a fade transition to every page of your application, we need a CSS file that is shared across all our routes, so we start by creating a file in the `assets` folder. -->

アプリケーションのすべてのページでフェードさせるトランジションを定義には、ルーティング全体に適用されている CSS ファイルが必要です。まずは `assets` ディレクトリ内にファイルを作成するところから始めます:

<!-- Our global css in `assets/main.css`: -->

`assets/main.css` 内にグローバルな CSS を書きます:

```css
.page-enter-active, .page-leave-active {
  transition: opacity .5s;
}
.page-enter, .page-leave-active {
  opacity: 0;
}
```

<!-- We add its path in our `nuxt.config.js` file: -->

`nuxt.config.js` ファイルに CSS ファイルのパスを指定します:

```js
module.exports = {
  css: [
    'assets/main.css'
  ]
}
```

<!-- More information about the transition key: [API Configuration transition](/api/pages-transition) -->

トランジションについてより深く理解したい場合は [トランジション設定 API](/api/pages-transition) を参照してください。

<!-- ### Page Settings -->

### 特定のページに対する設定

<!-- You can also define a custom transition for only one page with the `transition` property. -->

`transition` プロパティを使うことで、特定のページのみに対してカスタムトランジションを定義することもできます。

<!-- We add a new class in our global css in `assets/main.css`: -->

`assets/main.css` 内に新しい CSS 定義を追加します:

```css
.test-enter-active, .test-leave-active {
  transition: opacity .5s;
}
.test-enter, .test-leave-active {
  opacity: 0;
}
```

<!-- then, we use the transition property to define the class name to use for this page transition: -->

それから、このページトランジションを利用するためのクラス名を transition プロパティで指定します:

```js
export default {
  transition: 'test'
}
```

<!-- More information about the transition property: [API Pages transition](/api/pages-transition) -->

トランジションプロパティについてより深く理解したい場合は [ページトランジション API](/api/pages-transition) を参照してください。

<!-- ## Middleware -->

## ミドルウェア

<!-- \> The middleware lets you define custom function to be ran before rendering a page or a group of pages. -->

> ミドルウェアを使って、あるページまたはあるページのグループがレンダリングされる前に実行される関数を定義することができます。

<!-- **Every middleware should be placed in the `middleware/` directory.** The filename will be the name of the middleware (`middleware/auth.js` will be the `auth` middleware). -->

**ミドルウェアは `middleware/` ディレクトリに入れます。** ファイル名はミドルウェアの名前となります（`middleware/auth.js` は `auth` ミドルウェアになります）

<!-- A middleware receive [the context](/api#context) as first argument: -->

ミドルウェアは第一引数として [コンテキスト](/api#コンテキスト) を受け取ります:

```js
export default function (context) {
  context.userAgent = context.isServer ? context.req.headers['user-agent'] : navigator.userAgent
}
```

<!-- The middleware will be executed in series in this order: -->
<!-- 1. `nuxt.config.js` -->
<!-- 2. Matched layouts -->
<!-- 3. Matched pages -->

ミドルウェアは下記の順に実行されます:

1. `nuxt.config.js`
2. マッチしたレイアウト
3. マッチしたページ

<!-- A middleware can be asynchronous, simply return a `Promise` or use the 2nd `callback` argument: -->

ミドルウェアは、`Promise` を返すようにするか、もしくは第二引数の `callback` を使って、非同期に実行することができます:

`middleware/stats.js`

```js
import axios from 'axios'

export default function ({ route }) {
  return axios.post('http://my-stats-api.com', {
    url: route.fullPath
  })
}
```

<!-- Then, in your `nuxt.config.js`, layout or page, use the `middleware` key: -->

そして `nuxt.config.js` やレイアウトもしくはページ内で `middleware` キーを使います:

`nuxt.config.js`

```js
module.exports = {
  router: {
    middleware: 'stats'
  }  
}
```

<!-- The `stats` middleware will be called for every route changes. -->

`stats` ミドルウェアはすべてのルート変更時に呼び出されるようになります。

<!-- To see a real-life example using the middleware, please see [example-auth0](https://github.com/nuxt/example-auth0) on GitHub. -->

ミドルウェアを使った実際の例を見たい場合は GitHub 上にある [example-auth0](https://github.com/nuxt/example-auth0) を見てみてください。
