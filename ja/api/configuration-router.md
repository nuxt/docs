---
title: "API: router プロパティ"
description: router プロパティを使って Nuxt.js のルーターをカスタマイズできます。
---

# router プロパティ

> router プロパティを使って Nuxt.js のルーター（[vue-router](https://router.vuejs.org/en/)）をカスタマイズできます。

## base

- 型: `String`
- デフォルト: `'/'`

アプリケーションのベース URL です。例えばシングルページアプリケーション全体を `/app/` 配下で配信したい場合は base に `'/app/'` を設定します。

これは、より大きな Web サイト内から Nuxt を異なったコンテキストルートとして提供する必要がある場合に便利です。フロントプロキシ Web サーバーを設定してもしなくても構いません。

`router.base` にリダイレクトしたい場合は、そうすることもできます。 [フックを設定し、 _root でない場合は router.base にリダイレクトさせる_ ](/api/configuration-hooks#root-でない場合は-router-base-にリダイレクトさせる) を参照してください。

例（`nuxt.config.js`）:

```js
export default {
  router: {
    base: '/app/'
  }
}
```

<div class="Alert Alert-blue">

`base` がセットされているときは Nuxt.js はドキュメントのヘッダーに `<base href="{{ router.base }}"/>` を追加します。

</div>

> このオプションは vue-router の [base](https://router.vuejs.org/ja/api/#base) に直接付与されます。

## routeNameSplitter

- 型: `String`
- デフォルト: `'-'`

Nuxt.js が使うルート名の区切り文字を変更したい場合があるでしょう。設定ファイル内の `routeNameSplitter` オプションを使用して変更することが可能です。
`pages/posts/_id.vue` というページファイルがあるとします。Nuxt はプログラムに従ってルート名を生成します。この場合は `posts-id` です。`routeNameSplitter` の設定を `/` に変更することによって `posts/id` へ変更されます。

例 (`nuxt.config.js`):
```js
export default {
  router: {
    routeNameSplitter: '/'
  }
}
```

## extendRoutes

- 型: `Function`

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

## fallback

- 型: `Boolean`
- デフォルト: `false`

history.pushState がサポートされていないブラウザにおいて、モードが history に設定されているとき、ルーターを hash モードにフォールバックするかどうか制御します。

これを false に設定すると、本質的に全ての router-link ナビゲーションが IE9 においてフルページリフレッシュになります。これは、アプリケーションがサーバサイドレンダリングされ、 IE9 で動作する必要がある場合に便利です。なぜなら、サーバーサイドレンダリングではハッシュモードの URL が機能しないためです。

> このオプションは vue-router の [fallback](https://router.vuejs.org/ja/api/#fallback) に直接付与されます。

## linkActiveClass

- 型: `String`
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

- 型 `String`
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

## linkPrefetchedClass

- 型: `String`
- デフォルト: `false`

[`<nuxt-link>`](/api/components-nuxt-link) の prefetch クラスをグローバルに設定する（デフォルトでは無効の機能）

例 (`nuxt.config.js`):

```js
export default {
  router: {
    linkPrefetchedClass: 'nuxt-link-prefetched'
  }
}
```

## middleware

- 型: `String` または `Array`
  - 要素: `String`

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
  context.userAgent = process.server ? context.req.headers['user-agent'] : navigator.userAgent
}
```

ミドルウェアについてより深く理解するには [ミドルウェア](/guide/routing#ミドルウェア) ガイドを参照してください。

## mode

- 型: `String`
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

## parseQuery / stringifyQuery

- 型: `Function`

カスタムクエリ構文解析関数 / 文字列化関数を提供します。デフォルトを上書きします。

> このオプションは vue-router の [parseQuery / stringifyQuery](https://router.vuejs.org/ja/api/#parsequery-stringifyquery) に直接付与されます。

## prefetchLinks

> この機能は Nuxt.js v2.4.0 で追加されました

- 型: `Boolean`
- デフォルト: `true`

viewport（ブラウザの表示領域）内にリンクが表示されたとき *コード分割された* ページを先読みする `<nuxt-link>` の設定をします。
[IntersectionObserver](https://developer.mozilla.org/ja/docs/Web/API/Intersection_Observer_API) がサポートされている必要があります ([CanIUse](https://caniuse.com/#feat=intersectionobserver)を御覧ください）。

この機能を [Polyfill.io](https://polyfill.io) のようなサービスで条件付きで埋め込むことをお勧めします:

`nuxt.config.js`

```js
export default {
  head: {
    script: [
      { src: 'https://polyfill.io/v2/polyfill.min.js?features=IntersectionObserver', body: true }
    ]
  }
}
```

特定のリンクで先読みを無効にしたい場合は、`no-prefetch` 属性を使用します:

```html
<nuxt-link to="/about" no-prefetch>About page not pre-fetched</nuxt-link>
```

全てのリンクで先読みを無効にしたい場合は、`prefetchLinks` を `false` に設定してください:

```js
// nuxt.config.js
export default {
  router: {
    prefetchLinks: false
  }
}
```

## scrollBehavior

- 型: `Function`

`scrollBehavior` オプションを使って、ページ間のスクロール位置についての独自の振る舞いを定義できます。このメソッドはページがレンダリングされるたびに毎回呼び出されます。

デフォルトでは scrollBehavior オプションは次のようにセットされています:

```js
const scrollBehavior = function (to, from, savedPosition) {
  // 返された位置が falsy な値や空のオブジェクトだったときは、
  // 現在のスクロール位置を保持します
  let position = false

  // 子のオブジェクトが検出されず、scrollToTop が明示的に無効になっていない場合
  if (
    to.matched.length < 2 &&
    to.matched.every(r => r.components.default.options.scrollToTop !== false)
  ) {
    // ページのトップへスクロールします
    position = { x: 0, y: 0 }
  } else if (to.matched.some(r => r.components.default.options.scrollToTop)) {
    // 子のオブジェクトの1つが scrollToTop オプションを true に設定している場合
    position = { x: 0, y: 0 }
  }

  // savedPosition は popState ナビゲーションでのみ利用できます（戻るボタン）
  if (savedPosition) {
    position = savedPosition
  }

  return new Promise((resolve) => {
    // （必要であれば）out トランジションが完了するのを待ちます
    window.$nuxt.$once('triggerScroll', () => {
      // セレクタが提供されていない場合またはセレクタがどの要素とも一致しなかった場合は
      // 座標が使用されます
      if (to.hash) {
        let hash = to.hash
        // CSS.escape() は IE および Edge ではサポートされていません
        if (typeof window.CSS !== 'undefined' && typeof window.CSS.escape !== 'undefined') {
          hash = '#' + window.CSS.escape(hash.substr(1))
        }
        try {
          if (document.querySelector(hash)) {
            // セレクタを返すことでアンカーまでスクロールします
            position = { selector: hash }
          }
        } catch (e) {
          console.warn('スクロール位置を保存できませんでした。 CSS.escape() polyfill (https://github.com/mathiasbynens/CSS.escape) を追加してください。')
        }
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
