---
title: "API: router プロパティ"
description: router プロパティを使って Nuxt.js のルーターをカスタマイズできます。
---

# router プロパティ

> router プロパティを使って Nuxt.js のルーター（[vue-router](https://router.vuejs.org/en/)）をカスタマイズできます。

## base

- 型: `文字列`
- デフォルト: `'/'`

アプリケーションのベース URL です。例えばシングルページアプリケーション全体を `/app/` 配下で配信したい場合は base に `'/app/'` を設定します。

例（`nuxt.config.js`）:

```js
export default {
  router: {
    base: '/app/'
  }
}
```

<p class="Alert Alert-blue">

`base` がセットされているときは Nuxt.js はドキュメントのヘッダーに `<base href="{{ router.base }}"/>` を追加します。

</p>

> このオプションは vue-router の [base](https://router.vuejs.org/ja/api/#base) に直接付与されます。

## extendRoutes

- 型: `関数`

Nuxt.js によって作成されるルーティングを拡張したいことがあるかもしれません。それは `extendRoutes` オプションで実現できます。

独自のルートを追加する例:

`nuxt.config.js`

```js
export default {
  router: {
    extendRoutes (routes, resolve) {
      routes.push({
        name: 'custom',
        path: '*',
        component: resolve(__dirname, 'pages/404.vue')
      })
    }
  }
}
```

ルートのスキーマは [vue-router](https://router.vuejs.org/en/) のスキーマを尊重すべきです。

## linkActiveClass

- 型: `文字列`
- デフォルト: `'nuxt-link-active'`

[`<nuxt-link>`](/api/components-nuxt-link) のデフォルトの active class をグローバルに設定します。

例（`nuxt.config.js`）:

```js
export default {
  router: {
    linkActiveClass: 'active-link'
  }
}
```

> このオプションは vue-router の [linkactiveclass](https://router.vuejs.org/ja/api/#linkactiveclass) に直接付与されます。

## linkExactActiveClass

- 型 `文字列`
- デフォルト: `'nuxt-link-exact-active'`

[`<nuxt-link>`](/api/components-nuxt-link) のデフォルトの active class をグローバルに設定します。

例 (`nuxt.config.js`):

```js
export default {
  router: {
    linkExactActiveClass: 'exact-active-link'
  }
}
```

> このオプションは [linkexactactiveclass](https://router.vuejs.org/ja/api/#linkexactactiveclass) に直接付与されます.

## middleware

- 型: `文字列` または `配列`
  - 要素: `文字列`

アプリケーションのすべてのページに対してデフォルトのミドルウェアをセットします。

例:

`nuxt.config.js`

```js
export default {
  router: {
    // すべてのページで middleware/user-agent.js を実行します
    middleware: 'user-agent'
  }
}
```

`middleware/user-agent.js`

```js
export default function (context) {
  // userAgent プロパティを context 内に追加します（context は `data` メソッドや `fetch` メソッド内で利用できます）
  context.userAgent = context.isServer ? context.req.headers['user-agent'] : navigator.userAgent
}
```

ミドルウェアについてより深く理解するには [ミドルウェア](/guide/routing#ミドルウェア) ガイドを参照してください。

## mode

- 型: `文字列`
- デフォルト: `'history'`

ルーティングのモードを設定します。サーバーサイドレンダリングのため、この設定を変更することは非推奨です。

例（`nuxt.config.js`）:

```js
export default {
  router: {
    mode: 'hash'
  }
}
```

> このオプションは直接 vue-router の [mode](https://router.vuejs.org/ja/api/#mode) に渡されます。

## scrollBehavior

- 型: `関数`

`scrollBehavior` オプションを使って、ページ間のスクロール位置についての独自の振る舞いを定義できます。このメソッドはページがレンダリングされるたびに毎回呼び出されます。  

デフォルトでは scrollBehavior オプションは次のようにセットされています:

```js
const scrollBehavior = function (to, from, savedPosition) {
  // 返された位置が偽または空のオブジェクトだったときは、
  // 現在のスクロール位置を保持する
  let position = false

  // 子パスが見つからないとき
  if (to.matched.length < 2) {
    // ページのトップへスクロールする
    position = { x: 0, y: 0 }
  } else if (to.matched.some((r) => r.components.default.options.scrollToTop)) {
    // 子パスのひとつが scrollToTop オプションが true にセットされているとき
    position = { x: 0, y: 0 }
  }

  // savedPosition は popState ナビゲーションでのみ利用できます（戻るボタン）
  if (savedPosition) {
    position = savedPosition
  }

  return new Promise(resolve => {
    //（必要であれば）out トランジションが完了するのを待つ
    window.$nuxt.$once('triggerScroll', () => {
      // セレクタが渡されなかったとき、
      // または、セレクタがどの要素にもマッチしなかったときは、座標が用いられる
      if (to.hash && document.querySelector(to.hash)) {
        // セレクタを返すことでアンカーまでスクロールする
        position = { selector: to.hash }
      }
      resolve(position)
    })
  })
}
```

すべてのルートにおいて強制的にトップまでスクロールさせる例:

`nuxt.config.js`

```js
export default {
  router: {
    scrollBehavior: function (to, from, savedPosition) {
      return { x: 0, y: 0 }
    }
  }
}
```

## parseQuery / stringifyQuery

- 型: `関数`

カスタムクエリ構文解析関数 / 文字列化関数を提供します。デフォルトを上書きします。

> このオプションは vue-router の [parseQuery / stringifyQuery](https://router.vuejs.org/ja/api/#parsequery-stringifyquery) に直接付与されます。

## fallback

- 型: `ブーリアン`
- デフォルト: `false`

history.pushState がサポートされていないブラウザにおいて、モードが history に設定されているとき、ルーターを hash モードにフォールバックするかどうか制御します。

これを false に設定すると、本質的に全ての router-link ナビゲーションが IE9 においてフルページリフレッシュになります。これは、アプリケーションがサーバサイドレンダリングされ、 IE9 で動作する必要がある場合に便利です。なぜなら、サーバーサイドレンダリングではハッシュモードの URL が機能しないためです。

> このオプションは vue-router の [fallback](https://router.vuejs.org/ja/api/#fallback) に直接付与されます。
