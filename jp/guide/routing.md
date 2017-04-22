---
title: ルーティング
description: Nuxt.js はウェブアプリケーションのルーティングを生成するためにファイルシステムを利用します。それは PHP がルーティングを生成するようにシンプルです。
---

> Nuxt.js は `pages` ディレクトリ内の Vue ファイルの木構造に沿って、自動的に [vue-router](https://github.com/vuejs/vue-router) の設定を生成します。

## ルーティングの基礎

下記のようなファイルの木構造のとき:

```bash
pages/
--| user/
-----| index.vue
-----| one.vue
--| index.vue
```

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

## 動的なルーティング

パラメータを使って動的なルーティングを定義するには .vue ファイル名またはディレクトリ名に **アンダースコアのプレフィックス** を付ける必要があります。

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

`user-id` と名付けられたルートに `:id?` というパスがありますが、これはこの `:id` が必須ではないことを表します。もし必須にしたい場合は `users/_id` ディレクトリ内に `index.vue` ファイルを作成してください。

### ルーティングのパラメータのバリデーション

Nuxt.js では、動的なルーティングをするコンポーネント内に、パラメータをバリデーションするメソッドを定義することができます。

例えば `pages/users/_id.vue` 内にこのように書きます:

```js
export default {
  validate ({ params }) {
    // 数値でなければならない
    return /^\d+$/.test(params.id)
  }
}
```

もしバリデーションのメソッドが `true` を返さなかった場合は、Nuxt.js は自動的に 404 エラーページをロードします。

バリデーションのメソッドについてより深く理解したい場合は [ページバリデーションの API](/api/pages-validate) を参照してください。

## ネストされたルート

Nuxt.js では vue-router の子ルートを使ってルートをネストさせることができます。

ネストされたルートの親コンポーネントを定義するには、子ビューを含む **ディレクトリと同じ名前** の Vue ファイルを作成する必要があります。

<p class="Alert Alert--info">親コンポーネント（.vue ファイル）内に `<nuxt-child/>` を書くことを覚えておいてください。</p>

下記のようなファイルの木構造のとき:

```bash
pages/
--| users/
-----| _id.vue
-----| index.vue
--| users.vue
```

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

## 動的でネストされたルート

あまり頻繁に使うべきではありませんが、Nuxt.js では動的な親ルーティングの中に動的な子ルーティングを持つことが可能です。

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

## トランジション

Nuxt.js では [&lt;transition&gt;](http://vuejs.org/v2/guide/transitions.html#Transitioning-Single-Elements-Components) コンポーネントを使って、ページ間を遷移する際のトランジション/アニメーションを行うことができます。

### グローバルな設定

<p class="Alert Alert--info">Nuxt.js のデフォルトのトランジション名は `"page"` です。</p>

アプリケーションのすべてのページでフェードさせるトランジションを定義には、ルーティング全体に適用されている CSS ファイルが必要です。まずは `assets` ディレクトリ内にファイルを作成するところから始めます:

`assets/main.css` 内にグローバルな CSS を書きます:

```css
.page-enter-active, .page-leave-active {
  transition: opacity .5s;
}
.page-enter, .page-leave-active {
  opacity: 0;
}
```

`nuxt.config.js` ファイルに CSS ファイルのパスを指定します:

```js
module.exports = {
  css: [
    'assets/main.css'
  ]
}
```

トランジションについてより深く理解したい場合は [トランジション設定 API](/api/pages-transition) を参照してください。

### 特定のページに対する設定

`transition` プロパティを使うことで、特定のページのみに対してカスタムトランジションを定義することもできます。

`assets/main.css` 内に新しい CSS 定義を追加します:

```css
.test-enter-active, .test-leave-active {
  transition: opacity .5s;
}
.test-enter, .test-leave-active {
  opacity: 0;
}
```

それから、このページトランジションを利用するためのクラス名を transition プロパティで指定します:

```js
export default {
  transition: 'test'
}
```

トランジションプロパティについてより深く理解したい場合は [ページトランジション API](/api/pages-transition) を参照してください。

## ミドルウェア

> ミドルウェアを使って、あるページまたはあるページのグループがレンダリングされる前に実行される関数を定義することができます。

**ミドルウェアは `middleware/` ディレクトリに入れます。** ファイル名はミドルウェアの名前となります（`middleware/auth.js` は `auth` ミドルウェアになります）

ミドルウェアは第一引数として [コンテキスト](/api#コンテキスト) を受け取ります:

```js
export default function (context) {
  context.userAgent = context.isServer ? context.req.headers['user-agent'] : navigator.userAgent
}
```

ミドルウェアは下記の順に実行されます:

1. `nuxt.config.js`
2. マッチしたレイアウト
3. マッチしたページ

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

そして `nuxt.config.js` やレイアウトもしくはページ内で `middleware` キーを使います:

`nuxt.config.js`

```js
module.exports = {
  router: {
    middleware: 'stats'
  }  
}
```

`stats` ミドルウェアはすべてのルート変更時に呼び出されるようになります。

ミドルウェアを使った実際の例を見たい場合は GitHub 上にある [example-auth0](https://github.com/nuxt/example-auth0) を見てみてください。
