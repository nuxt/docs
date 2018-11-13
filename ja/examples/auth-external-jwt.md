---
title: 外部認証API (JWT)
description: Nuxt.js で jsonwebtoken を使った外部認証の例
github: auth-jwt
code: https://github.com/ahadyekta/nuxt-auth-external-jwt
---

# ドキュメント

auth-routes の例では、 api と nuxt の両方を同時に起動し、1つの Node.js サーバインスタンスを使用していました。
しかし、時には jsonWebToken を使って外部 API を使う必要が出てきます。ここでは簡単に説明します。

## 仕組み

Nuxt.js はサーバとクライアントの両方のレンダリングをしており、ブラウザのクッキーは Node.js のサーバサイドのクッキーとは異なるため、トークンのデータを双方からアクセスできる場所に保存する必要があります。

### サーバーサイドレンダリングの場合

ログイン後にトークンをセッションブラウザのクッキーに保存し、ミドルウェアファイルの `req.headers.cookie` 、 `nuxtServerInit` 関数、または `req` を介してどこからでもアクセスできます。

### クライアントサイドレンダリングの場合

store にトークンを直接保存します。ページが閉じられたり再読み込みされない限り、トークンが保たれます。

まず依存パッケージをインストールします:

```bash
npm install js-cookie --save
npm install cookieparser --save
```

## ログインページ

次に、ページディレクトリ以下に `login.vue`ファイルを作り、 script 部分に以下のコードを追加します:

```js
import Cookie from 'js-cookie'

export default {
  middleware: 'notAuthenticated',
  methods: {
    postLogin () {
      setTimeout(() => {
        const auth = {
          accessToken: 'someStringGotFromApiServiceWithAjax'
        }
        this.$store.commit('update', auth) // クライアントレンダリング用に変更する
        Cookie.set('auth', auth) // サーバサイドレンダリングのためにクッキーにトークンを保存する
        this.$router.push('/')
      }, 1000)
    }
  }
}
```

> 注意: この例では非同期のリクエストをタイムアウトを使って再現しています。

## storeを使った例

その後、 `store` ディレクトリ内に `index.js` をこのように作成します:

```javascript
import Vuex from 'vuex'

var cookieparser = require('cookieparser')

const createStore = () => {
  return new Vuex.Store({
    state: {
      auth: null
    },
    mutations: {
      update (state, data) {
        state.auth = data
      }
    },
    actions: {
      nuxtServerInit ({ commit }, { req }) {
        let accessToken = null
        if (req.headers.cookie) {
          var parsed = cookieparser.parse(req.headers.cookie)
          accessToken = JSON.parse(parsed.auth)
        }
        commit('update', accessToken)
      }
    }
  })
}

export default createStore
```

> 注意: `nuxtServerInit` 関数はサーバサイドでレンダリングされるたびに実行されます。これを使ってストア内のセッションブラウザのクッキーを更新します。
その後、 `req.headers.cookie` を使ってそのクッキーを取得して、 `cookieparser` を使ってパースすることができます。

## 認証用ミドルウェアによる検証

アクセス制限が必要な全ページで、アクセストークンを持っているかどうかを store を使って検証できます。middleware のディレクトリに `authenticated.js` を作成します:

```javascript
export default function ({ store, redirect }) {
  // ユーザが認証されていない場合
  if (!store.state.auth) {
    return redirect('/login')
  }
}
```

次に、 middleware のディレクトリに login ページ用の `notAuthenticated.js` を作成します:

```javascript
export default function ({ store, redirect }) {
  // ユーザが認証されてホームページにリダイレクトされた場合
  if (store.state.auth) {
    return redirect('/')
  }
}
```

> 注意: 認証が必要なページには `authenticated` ミドルウェアを使用し、 login/register などのページには `notAuthenticated` ミドルウェアを使います。