---
title: "API: generate プロパティ"
description: ユニバーサルなウェブアプリケーションから静的なウェブアプリケーションの生成について設定します。
---

# generate プロパティ

- 型: `オブジェクト`

> ユニバーサルなウェブアプリケーションから静的なウェブアプリケーションの生成について設定します。

`nuxt generate` コマンドを実行するか `nuxt.generate()` を呼び出したとき、Nuxt.js は `generate` プロパティで定義された設定を使います。

## dir

- 型: `文字列`
- デフォルト: `'dist'`

`nuxt generate` で作成されるディレクトリ名です。

## fallback

- Type: `String` or `Boolean`
- Default: `'200.html'`

The path to the SPA fallback. This file can be used when doing deploys of generated sites to static hosting. It falls back to `mode: 'spa'` when a route isn't generated.

## interval

- 型: `数値`
- デフォルト: `0`

２つのレンダーの間でのインターバルで、ウェブアプリケーションからの潜在的な API に対して溢れでないようにするためのものです。

## minify

- **Deprecated!**
- Use [build.html.minify](/api/configuration-build#html-minify) instead

## routes

- 型: `配列`

generate コマンドでは [動的なルーティング](/guide/routing#動的なルーティング) は無視されます。

例:

```bash
-| pages/
---| index.vue
---| users/
-----| _id.vue
```

ルート `/` のみが Nuxt.js によって生成されます。

動的なパラメーターを用いたルートを生成させたい場合は、動的なルーティングの配列をセットする必要があります。

`nuxt.config.js` 内に `/users/:id` のルーティングを追加します:

```js
module.exports = {
  generate: {
    routes: [
      '/users/1',
      '/users/2',
      '/users/3'
    ]
  }
}
```

そして `nuxt generate` を実行します:

```bash
[nuxt] Generating...
[...]
nuxt:render Rendering url / +154ms
nuxt:render Rendering url /users/1 +12ms
nuxt:render Rendering url /users/2 +33ms
nuxt:render Rendering url /users/3 +7ms
nuxt:generate Generate file: /index.html +21ms
nuxt:generate Generate file: /users/1/index.html +31ms
nuxt:generate Generate file: /users/2/index.html +15ms
nuxt:generate Generate file: /users/3/index.html +23ms
nuxt:generate HTML Files generated in 7.6s +6ms
[nuxt] Generate done
```

いいですね。しかし、もし **動的なパラメータ** が必要な場合はどうでしょう？

1. `Promise` を返す `関数` を使う
2. `コールバック` と一緒に `関数` を使う

### Promise を返す関数を使う

`nuxt.config.js`

```js
import axios from 'axios'

export default {
  generate: {
    routes: function () {
      return axios.get('https://my-api/users')
      .then((res) => {
        return res.data.map((user) => {
          return '/users/' + user.id
        })
      })
    }
  }
}
```

### コールバックと一緒に関数を使う

`nuxt.config.js`

```js
import axios from 'axios'

export default {
  generate: {
    routes: function (callback) {
      axios.get('https://my-api/users')
      .then((res) => {
        var routes = res.data.map((user) => {
          return '/users/' + user.id
        })
        callback(null, routes)
      })
      .catch(callback)
    }
  }
}
```

### Speeding up dynamic route generation with `payload`

In the example above, we're using the `user.id` from the server to generate the routes but tossing out the rest of the data. Typically, we need to fetch it again from inside the `/users/_id.vue`. While we can do that, we'll probably need to set the `generate.interval` to something like `100` in order not to flood the server with calls. Because this will increase the run time of the generate script, it would be preferable to pass along the entire `user` object to the context in `_id.vue`. We do that by modifying the code above to this:

`nuxt.config.js`

```js
import axios from 'axios'

export default {
  generate: {
    routes: function () {
      return axios.get('https://my-api/users')
      .then((res) => {
        return res.data.map((user) => {
          return {
            route: '/users/' + user.id,
            payload: user
          }
        })
      })
    }
  }
}
```

Now we can access the `payload` from `/users/_id.vue` like so:

```js
async asyncData ({ params, error, payload }) {
  if (payload) return { user: payload }
  else return { user: await backend.fetchUser(params.id) }
}
```

## subFolders

- Type: `Boolean`
- Default: `true`

By default, running `nuxt generate` will create a directory for each route & serve an `index.html` file.

Example:

```bash
-| dist/
---| index.html
---| about/
-----| index.html
---| products/
-----| item/
-------| index.html
```

When set to false, HTML files are generated according to the route path:

```bash
-| dist/
---| index.html
---| about.html
---| products/
-----| item.html
```

_Note: this option could be useful using [Netlify](https://netlify.com) or any static hosting using HTML fallbacks._

## concurrency

- Type: `Number`
- Default: `500`

The generation of routes are concurrent, `generate.concurrency` specifies the amount of routes that run in one thread.
