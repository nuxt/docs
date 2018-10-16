---
title: 'API: コンテキスト'
description: "`context`は、従来 Vue コンポーネントが使用できないオブジェクト/パラメータを Nuxt から追加で提供します。`context`は`
  asyncData`、 `plugins`、 'middlewares'、 'modules' や 'store / nuxtServerInit` といった
  nuxt の特別なライフサイクル内で使用できます。"
---

## コンテキスト

`context` で使用可能なキーのリスト:

キー | 型 | 使用可能な環境 | 説明
--- | --- | --- | ---
`app` | ルートの Vue インスタンス | クライアント及びサーバー | すべてのプラグインを含むルートの Vue インスタンス。 たとえば、`axios` を使用する場合、`context.app.$axios` から `$axios` にアクセスすることができます。
`isClient` | `ブーリアン` | クライアント及びサーバー | クライアントサイド からレンダリングしているかどうかを知らせます(*廃止予定*。`process.client` を使用してください）。
`isServer` | `ブーリアン` | クライアント及びサーバー | サーバーサイド からレンダリングしているかどうかを知らせます(*廃止予定*。`process.server` を使用してください）。
`isStatic` | `ブーリアン` | クライアント及びサーバー | `nuxt generate` 経由で生成された静的アプリ内か否かを知らせます（このキーは *deprecated* です。`process.static` を使ってください）
`isDev` | `ブーリアン` | クライアント及びサーバー | 開発モードであるかどうかを知らせます。このキーはプロダクションの一部のデータをキャッシュさせるのに便利です。
`isHMR` | `ブーリアン` | クライアント及びサーバー | メソッド/ミドルウェアが webpack の hot module replacement（*開発モードでのクライアントサイドに限る*）から呼び出されたかどうかを知らせます。
`route` | [Vue Router Route](https://router.vuejs.org/en/api/route-object.html) | クライアント及びサーバー | Vue Router のルートインスタンス
`store` | [Vuex ストア](https://vuex.vuejs.org/en/api.html#vuexstore-instance-properties) | クライアント及びサーバー | Vuex ストアのインスタンス。**[vuex ストア](/guide/vuex-store)を設定している場合にのみ使用可能**。
`env` | `オブジェクト` | クライアント及びサーバー | `nuxt.config.js` で設定された環境変数。[env api](/api/configuration-env) を参照してください。
`params` | `オブジェクト` | クライアント及びサーバー | `route.params` のエイリアス
`query` | `オブジェクト` | クライアント及びサーバー | `route.query` のエイリアス
`req` | [`http.Request`](https://nodejs.org/api/http.html#http_class_http_incomingmessage) | サーバー | Node.js サーバーからのリクエスト。Nuxt がミドルウェアとして使用されている場合、使用しているフレームワークによってリクエストオブジェクトが異なることがあります。<br>**`nuxt generate` からは使用できません**。
`res` | [`http.Response`](https://nodejs.org/api/http.html#http_class_http_serverresponse) | サーバー | Node.js サーバーからのレスポンス。 Nuxtがミドルウェアとして使用されている場合、使用しているフレームワークによってレスポンスオブジェクトが異なることがあります。<br>**`nuxt generate` からは使用できません**。
`redirect` | `関数` | クライアント及びサーバー | このメソッドを使用するとユーザーを別のルートにリダイレクトさせます。ステータスコードはサーバーサイドで使用され、デフォルトは `302` です。`redirect([status,] path [, query])`
`error` | `関数` | クライアント及びサーバー | このメソッドを使用するとエラーページ:`error(params)`を表示します。`params` は `statusCode` と `message` の2つのプロパティを持つ必要があります。
`nuxtState` | `オブジェクト` | クライアント | Nuxt の状態は、`beforeNuxtRender` を使ってクライアントサイドの nuxt の状態を取得するプラグインに便利です。**`universal` モードでのみ使用できます**。
`beforeNuxtRender(fn)` | `関数` | サーバー | このメソッドを使用するとクライアントサイドでレンダリングされた `__NUXT__` 変数がアップデートされます。`fn`（非同期にすることができます）は `{ Components, nuxtState }` と共に呼ばれます。詳細は[例](https://github.com/nuxt/nuxt.js/blob/cf6b0df45f678c5ac35535d49710c606ab34787d/test/fixtures/basic/pages/special-state.vue)を参照してください。
