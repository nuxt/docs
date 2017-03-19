---
title: "API: data メソッド"
description: Nuxt.js は Vue.js の data メソッドに手を加えて、コンポーネントのデータがセットされる前に非同期処理を行えるようにしています。
---

<!-- title: "API: The data Method" -->
<!-- description: Nuxt.js supercharges the data method from vue.js to let you handle async operation before setting the component data. -->

<!-- # The data Method -->

# data メソッド

<!-- \> Nuxt.js *supercharges* the `data` method from vue.js to let you handle async operation before setting the component data. -->

> Nuxt.js は Vue.js の `data` メソッドに手を加えて、コンポーネントのデータがセットされる前に非同期処理を行えるようにしています。

<!-- - **Type:** `Function` -->

- **タイプ:** `関数`

<!-- `data` is called every time before loading the component (**only for pages components**). It can be called from the server-side or before navigating to the corresponding route. This method receives the **context** as the first argument, you can use it to fetch some data and return the component data. -->

`data` はコンポーネントがローディングされる前に毎回呼び出されます（ページコンポーネントに限ります）。サーバーサイドもしくは（訳注: クライアントサイドでは）ユーザーがページ遷移する前に呼び出されます。このメソッドは第一引数として **コンテキスト** を受け取り、コンテキストを使ってデータを取得してコンポーネントのデータを返すことができます。

```js
export default {
  data (context) {
    return { foo: 'bar' }
  }
}
```

<!-- <div class="Alert Alert--orange">You do **NOT** have access of the component instance through `this` inside `data` because it is called **before initiating** the component.</div> -->

<div class="Alert Alert--orange">`data` メソッド内で、コンポーネントのインスタンスに `this` を経由してアクセスしては**いけません**。なぜなら `data` メソッドはコンポーネントが **インスタンス化される前に** 呼び出されるためです。</div>

<!-- ## Context -->

## コンテキスト

<!-- List of all the available keys in `context`: -->

`context` 内の利用できるキーの一覧:

<!-- | Key | Type | Available | Description | -->
<!-- |-----|------|--------------|-------------| -->
<!-- | `isClient` | Boolean | Client & Server | Boolean to let you know if you're actually renderer from the client-side | -->
<!-- | `isServer` | Boolean | Client & Server | Boolean to let you know if you're actually renderer from the server-side | -->
<!-- | `isDev` | Boolean | Client & Server | Boolean to let you know if you're in dev mode, can be useful for caching some data in production | -->
<!-- | `route` | [vue-router route](https://router.vuejs.org/en/api/route-object.html) | Client & Server | `vue-router` route instance. | -->
<!-- | `store` | [vuex store](http://vuex.vuejs.org/en/api.html#vuexstore-instance-properties) | Client & Server | `Vuex.Store` instance. **Available only if the [vuex store](/guide/vuex-store) is set.** | -->
<!-- | `env` | Object | Client & Server | Environment variables set in `nuxt.config.js`, see [env api](/api/configuration-env)  | -->
<!-- | `params` | Object | Client & Server | Alias of route.params | -->
<!-- | `query` | Object | Client & Server | Alias of route.query | -->
<!-- | `req` | [http.Request](https://nodejs.org/api/http.html#http_class_http_incomingmessage) | Server | Request from the node.js server. If nuxt is used as a middleware, the req object might be different depending of the framework you're using. *Not available via `nuxt generate`*. | -->
<!-- | `res` | [http.Response](https://nodejs.org/api/http.html#http_class_http_serverresponse) | Server | Response from the node.js server. If nuxt is used as a middleware, the res object might be different depending of the framework you're using. *Not available via `nuxt generate`*. | -->
<!-- | `redirect` | Function | Client & Server | Use this method to redirect the user to another route, the status code is used on the server-side, default to 302. `redirect([status,] path [, query])` | -->
<!-- | `error` | Function | Client & Server | Use this method to show the error page: `error(params)`. The `params` should have the fields `statusCode` and `message`. | -->

| キー | タイプ | どこで利用できるか | 説明 |
|-----|------|--------------|-------------|
| `isClient` | ブーリアン | クライアント＆サーバー | クライアントサイドでレンダリングしているか否か |
| `isServer` | ブーリアン | クライアント＆サーバー | サーバーサイドでレンダリングしているか否か |
| `isDev` | ブーリアン | クライアント＆サーバー | 開発モードか否か。このキーはプロダクションモードでデータをキャッシュさせるときに役立ちます |
| `route` | [vue-router のルート](https://router.vuejs.org/en/api/route-object.html) | クライアント＆サーバー | `vue-router` のルートインスタンス |
| `store` | [Vuex ストア](http://vuex.vuejs.org/en/api.html#vuexstore-instance-properties) | クライアント＆サーバー | `Vuex` のストアインスタンス。**[Vuex ストア](/guide/vuex-store) が設定されている場合のみ利用できます** |
| `env` | オブジェクト | クライアント＆サーバー | `nuxt.config.js` でセットされた環境変数。詳細は [env API](/api/configuration-env) を参照してください |
| `params` | オブジェクト | クライアント＆サーバー | route.params のエイリアス |
| `query` | オブジェクト | クライアント＆サーバー | route.query のエイリアス |
| `req` | [http.Request](https://nodejs.org/api/http.html#http_class_http_incomingmessage) | サーバー | Node.js サーバーのリクエスト。Nuxt.js をミドルウェアとして使っているとき、req オブジェクトは利用しているフレームワークによって異なります。*`nuxt generate` からは利用できません* |
| `res` | [http.Response](https://nodejs.org/api/http.html#http_class_http_serverresponse) | サーバー | Node.js サーバーのレスポンス。Nuxt.js をミドルウェアとして使っているとき、res オブジェクトは利用しているフレームワークによって異なります。*`nuxt generate` からは利用できません* |
| `redirect` | 関数 | クライアント＆サーバー | 別のルートにリダイレクトさせたいときに使います。サーバーサイドで使われるステータスコードはデフォルトで 302 です: `redirect([status,] path [, query])` |
| `error` | 関数 | クライアント＆サーバー | エラーページを表示させたいときに使います: `error(params)`。`params` は `statusCode` と `message` というフィールドを持っている必要があります |
