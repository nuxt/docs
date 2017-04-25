---
title: "API: asyncData メソッド"
description: サーバーサイドでデータを取得し、それをレンダリングしたいことがあるでしょう。Nuxt.js はコンポーネントのデータをセットする前に非同期の処理を行えるようにするために `asyncData` メソッドを追加しています。
---

# asyncData メソッド

> サーバーサイドでデータを取得し、それをレンダリングしたいことがあるでしょう。Nuxt.js はコンポーネントのデータをセットする前に非同期の処理を行えるようにするために `asyncData` メソッドを追加しています。

- **タイプ:** `関数`

`asyncData` はコンポーネント（**ページコンポーネントに限ります**）がロードされる前に毎回呼び出されます。サーバーサイドレンダリングや、ユーザーがページを遷移する前にも呼び出されます。そしてこのメソッドは第一引数として **コンテキスト**（オブジェクト）を受け取り、コンテキストを使ってデータを取得してコンポーネントのデータとマージすることができます。

```js
export default {
  data () {
    return { project: 'default' }
  },
  asyncData (context) {
    return { project: 'nuxt' }
  }
}
```

<div class="Alert Alert--orange">`data` メソッド内で、コンポーネントのインスタンスに `this` を経由してアクセスしては**いけません**。なぜなら `data` メソッドはコンポーネントが **インスタンス化される前に** 呼び出されるためです。</div>

## コンテキスト

`context` 内の利用できるキーの一覧:

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
