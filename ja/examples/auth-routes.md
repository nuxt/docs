---
title: 認証ルート
description: Nuxt.js を使った認証ルートの例
github: auth-routes
livedemo: https://nuxt-auth-routes.gomix.me
liveedit: https://gomix.com/#!/project/nuxt-auth-routes
---

<!-- title: Auth Routes -->
<!-- description: Authenticated routes example with Nuxt.js -->
<!-- github: auth-routes -->
<!-- livedemo: https://nuxt-auth-routes.gomix.me -->
<!-- liveedit: https://gomix.com/#!/project/nuxt-auth-routes -->

<!-- # Documentation -->

# ドキュメント

<!-- \> Nuxt.js can be used to create authenticated routes easily. -->

> Nuxt.js を使うと認証が必要なルートを簡単に作成できます。

<!-- ## Using Express and Sessions -->

## express とセッションを使う

<!-- To add the sessions feature in our application, we will use `express` and `express-session`, for this, we need to use Nuxt.js programmatically. -->

アプリケーションにセッション機能を追加するために `express` と `express-session` を使います。そのために Nuxt.js をプログラムで使う必要があります。

<!-- First, we install the dependencies: -->

まず依存パッケージをインストールします:

```bash
yarn add express express-session body-parser whatwg-fetch
```

<!-- *We will talk about `whatwg-fetch` later.* -->

*`whatwg-fetch` については後ほど述べます。*

<!-- Then we create our `server.js`: -->

それから `server.js` ファイルを作成します:

<!-- ```js -->
<!-- const Nuxt = require('nuxt') -->
<!-- const bodyParser = require('body-parser') -->
<!-- const session = require('express-session') -->
<!-- const app = require('express')() -->

<!-- // Body parser, to access req.body -->
<!-- app.use(bodyParser.json()) -->

<!-- // Sessions to create req.session -->
<!-- app.use(session({ -->
<!--   secret: 'super-secret-key', -->
<!--   resave: false, -->
<!--   saveUninitialized: false, -->
<!--   cookie: { maxAge: 60000 } -->
<!-- })) -->

<!-- // POST /api/login to log in the user and add him to the req.session.authUser -->
<!-- app.post('/api/login', function (req, res) { -->
<!--   if (req.body.username === 'demo' && req.body.password === 'demo') { -->
<!--     req.session.authUser = { username: 'demo' } -->
<!--     return res.json({ username: 'demo' }) -->
<!--   } -->
<!--   res.status(401).json({ error: 'Bad credentials' }) -->
<!-- }) -->

<!-- // POST /api/logout to log out the user and remove it from the req.session -->
<!-- app.post('/api/logout', function (req, res) { -->
<!--   delete req.session.authUser -->
<!--   res.json({ ok: true }) -->
<!-- }) -->

<!-- // We instantiate Nuxt.js with the options -->
<!-- const isProd = process.env.NODE_ENV === 'production' -->
<!-- const nuxt = new Nuxt({ dev: !isProd }) -->
<!-- // No build in production -->
<!-- const promise = (isProd ? Promise.resolve() : nuxt.build()) -->
<!-- promise.then(() => { -->
<!--   app.use(nuxt.render) -->
<!--   app.listen(3000) -->
<!--   console.log('Server is listening on http://localhost:3000') -->
<!-- }) -->
<!-- .catch((error) => { -->
<!--   console.error(error) -->
<!--   process.exit(1) -->
<!-- }) -->
<!-- ``` -->

```js
const Nuxt = require('nuxt')
const bodyParser = require('body-parser')
const session = require('express-session')
const app = require('express')()

// req.body へアクセスするために body-parser を使う
app.use(bodyParser.json())

// req.session を作成します
app.use(session({
  secret: 'super-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 60000 }
}))

// POST /api/login してログインし、認証されたユーザーを req.session.authUser に追加
app.post('/api/login', function (req, res) {
  if (req.body.username === 'demo' && req.body.password === 'demo') {
    req.session.authUser = { username: 'demo' }
    return res.json({ username: 'demo' })
  }
  res.status(401).json({ error: 'Bad credentials' })
})

// POST /api/logout してログアウトし、ログアウトしたユーザーを req.session から削除
app.post('/api/logout', function (req, res) {
  delete req.session.authUser
  res.json({ ok: true })
})

// オプションとともに Nuxt.js をインスタンス化
const isProd = process.env.NODE_ENV === 'production'
const nuxt = new Nuxt({ dev: !isProd })

// プロダクション環境ではビルドしない
const promise = (isProd ? Promise.resolve() : nuxt.build())
promise.then(() => {
  app.use(nuxt.render)
  app.listen(3000)
  console.log('Server is listening on http://localhost:3000')
})
.catch((error) => {
  console.error(error)
  process.exit(1)
})
```

<!-- And we update our `package.json` scripts: -->

また `package.json` scripts を更新します:

```json
// ...
"scripts": {
  "dev": "node server.js",
  "build": "nuxt build",
  "start": "NODE_ENV=production node server.js"
}
// ...
```

<!-- ## Using the store -->

## ストアを使う

<!-- We need a global state to let our application know if the user is connected **across the pages**. -->

アプリケーションが、ユーザーが認証されているか否かを **ページをまたいで** 知るためには、グローバルなステート（状態）が必要です。

<!-- To let Nuxt.js use Vuex, we create a `store/index.js` file: -->

Nuxt.js が Vuex を使うよう `store/index.js` ファイルを作成します:

<!-- ```js -->
<!-- import Vue from 'vue' -->
<!-- import Vuex from 'vuex' -->

<!-- Vue.use(Vuex) -->

<!-- // Polyfill for window.fetch() -->
<!-- require('whatwg-fetch') -->

<!-- const store = new Vuex.Store({ -->
<!--   state: { -->
<!--     authUser: null -->
<!--   }, -->

<!--   mutations: { -->
<!--     SET_USER: function (state, user) { -->
<!--       state.authUser = user -->
<!--     } -->
<!--   }, -->

<!--   actions: { -->
<!--     // ... -->
<!--   } -->
<!-- }) -->

<!-- export default store -->
<!-- ``` -->

```js
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// window.fetch() のためのポリフィル
require('whatwg-fetch')

const store = new Vuex.Store({
  state: {
    authUser: null
  },

  mutations: {
    SET_USER: function (state, user) {
      state.authUser = user
    }
  },

  actions: {
    // ...
  }
})

export default store
```

<!-- 1. We import `Vue` and `Vuex` (included in Nuxt.js) and we tell Vue to use Vuex to let us use `$store` in our components -->
<!-- 2. We `require('whatwg-fetch')` to polyfill the `fetch()` method across all browsers (see [fetch repo](https://github.com/github/fetch)) -->
<!-- 3. We create our `SET_USER` mutation which will set the `state.authUser` to the connected user -->
<!-- 4. We export our store instance to Nuxt.js can inject it to our main application -->

1. `Vue` 及び `Vuex` をインポートし（これらは Nuxt.js 内でインクルードされています）、コンポーネント内で `$store` を使うために Vuex を使うことを Vue に伝えます
2. すべてのブラウザで `fetch()` メソッドをポリフィルするために `require('whatwg-fetch')` します（詳しくは [fetch リポジトリ](https://github.com/github/fetch) 参照）
3. `SET_USER` ミューテーションを作成します。これは認証されたユーザーを `state.authUser` にセットします
4. Nuxt.js がストアインスタンスをメインアプリケーションに注入できるようにするため、ストアインスタンスをエクスポートします

<!-- ### nuxtServerInit() action -->

### nuxtServerInit() アクション

<!-- Nuxt.js will call a specific action called `nuxtServerInit` with the context in argument, so when the app will be loaded, the store will be already filled with some data we can get from the server. -->

Nuxt.js は `nuxtServerInit` と呼ばれる特定のアクションを、引数でコンテキストを渡して呼び出します。したがって、アプリケーションがロードされたとき、サーバーから取得できるデータがストアに既には入れられています。

<!-- In our `store/index.js`, we can add the `nuxtServerInit` action: -->

`store/index.js` 内に `nuxtServerInit` アクションを追加できます:

```js
nuxtServerInit ({ commit }, { req }) {
  if (req.session && req.session.authUser) {
    commit('SET_USER', req.session.authUser)
  }
}
```

<!-- ### login() action -->

### login() アクション

<!-- We add a `login` action which will be called from our pages component to log in the user: -->

`login` アクションを追加できます。このアクションはログインするためにページコンポーネントから呼び出されます:

ログインするためにページコンポーネントから呼び出される `login` アクションを追加します:

<!-- ```js -->
<!-- login ({ commit }, { username, password }) { -->
<!--   return fetch('/api/login', { -->
<!--     // Send the client cookies to the server -->
<!--     credentials: 'same-origin', -->
<!--     method: 'POST', -->
<!--     headers: { -->
<!--       'Content-Type': 'application/json' -->
<!--     }, -->
<!--     body: JSON.stringify({ -->
<!--       username, -->
<!--       password -->
<!--     }) -->
<!--   }) -->
<!--   .then((res) => { -->
<!--     if (res.status === 401) { -->
<!--       throw new Error('Bad credentials') -->
<!--     } else { -->
<!--       return res.json() -->
<!--     } -->
<!--   }) -->
<!--   .then((authUser) => { -->
<!--     commit('SET_USER', authUser) -->
<!--   }) -->
<!-- } -->
<!-- ``` -->

```js
login ({ commit }, { username, password }) {
  return fetch('/api/login', {
    // クライアントのクッキーをサーバーに送信
    credentials: 'same-origin',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username,
      password
    })
  })
  .then((res) => {
    if (res.status === 401) {
      throw new Error('Bad credentials')
    } else {
      return res.json()
    }
  })
  .then((authUser) => {
    commit('SET_USER', authUser)
  })
}
```

<!-- ### logout() method -->

### logout() メソッド

<!-- ```js -->
<!-- logout ({ commit }) { -->
<!--   return fetch('/api/logout', { -->
<!--     // Send the client cookies to the server -->
<!--     credentials: 'same-origin', -->
<!--     method: 'POST' -->
<!--   }) -->
<!--   .then(() => { -->
<!--     commit('SET_USER', null) -->
<!--   }) -->
<!-- } -->
<!-- ``` -->

```js
logout ({ commit }) {
  return fetch('/api/logout', {
    // クライアントのクッキーをサーバーに送信
    credentials: 'same-origin',
    method: 'POST'
  })
  .then(() => {
    commit('SET_USER', null)
  })
}
```

<!-- ## Pages components -->

## ページコンポーネント

<!-- Then we can use `$store.state.authUser` in our pages components to check if the user is connected in our application or not. -->

ユーザーがアプリケーションで認証されているか否かをチェックするために、ページコンポーネント内で `$store.state.authUser` を使うことができます。

<!-- ### Redirect user if not connected -->

### ユーザーが認証されていないときはリダイレクトする

<!-- Let's add a `/secret` route where only the connected user can see its content: -->

認証されたユーザーのみがコンテンツを閲覧できる `/secret` ルートを追加してみましょう:

<!-- ```html -->
<!-- <template> -->
<!--   <div> -->
<!--     <h1>Super secret page</h1> -->
<!--     <router-link to="/">Back to the home page</router-link> -->
<!--   </div> -->
<!-- </template> -->

<!-- <script> -->
<!-- export default { -->
<!--   // we use fetch() because we do not need to set data to this component -->
<!--   fetch ({ store, redirect }) { -->
<!--     if (!store.state.authUser) { -->
<!--       return redirect('/') -->
<!--     } -->
<!--   } -->
<!-- } -->
<!-- </script> -->
<!-- ``` -->

```html
<template>
  <div>
    <h1>Super secret page</h1>
    <router-link to="/">Back to the home page</router-link>
  </div>
</template>

<script>
export default {
  // データをこのコンポーネントにセットする必要がないため fetch() を使う
  fetch ({ store, redirect }) {
    if (!store.state.authUser) {
      return redirect('/')
    }
  }
}
</script>
```

<!-- We can see in the `fetch` method that we call `redirect('/')` when our user is not connected. -->

ユーザーが認証されていなかったときは `fetch` メソッド内で `redirect('/')` が呼び出されます。
