---
title: プラグイン
description: Nuxt.js ではルートの Vue.js アプリケーションがインスタンス化される前に実行される js プラグインを定義することができます。プラグインとして自前のライブラリや外部モジュールを使うことができます。
---

<!-- title: Plugins -->
<!-- description: Nuxt.js allows you to define js plugins to be ran before instantiating the root vue.js application, it can be to use your own library or external modules. -->

<!-- \> Nuxt.js allows you to define js plugins to be ran before instantiating the root vue.js application, it can be to use your own library or external modules. -->

> Nuxt.js ではルートの Vue.js アプリケーションがインスタンス化される前に実行される js プラグインを定義することができます。プラグインとして自前のライブラリや外部モジュールを使うことができます。

<!-- <div class="Alert">It is important to know that in any Vue [instance lifecycle](https://vuejs.org/v2/guide/instance.html#Lifecycle-Diagram), only `beforeCreate` and `created` hooks are called **both from client-side and server-side**. All other hooks are called only from the client-side.</div> -->

<div class="Alert">どの Vue [インスタンスのライフサイクル](https://vuejs.org/v2/guide/instance.html#Lifecycle-Diagram) においても、`beforeCreate` と `created` フックのみが **クライアントサイドとサーバーサイドの両方** で呼び出されることを知っておくことはとても重要です。それ以外の全てのフックはクライアントサイドでのみ呼び出されます。</div>

<!-- ## External Packages -->

## 外部パッケージ

<!-- We may want to use external packages/modules in our application, one great example is [axios](https://github.com/mzabriskie/axios) for making HTTP request for both server and client. -->

アプリケーションに外部パッケージ/モジュールを使いたいときがあるかもしれません。例えばサーバーでもクライアントでも HTTP リクエストを送れるようにするための [axios](https://github.com/mzabriskie/axios) が良い例です。

<!-- We install it via NPM: -->

NPM 経由でインストールします:

```bash
npm install --save axios
```

<!-- Then, we can use it directly in our pages: -->

そしてページ内で直接それを使うことができます:

```html
<template>
  <h1>{{ title }}</h1>
</template>

<script>
import axios from 'axios'

export default {
  async data ({ params }) {
    let { data } = await axios.get(`https://my-api/posts/${params.id}`)
    return { title: data.title }
  }
}
</script>
```

<!-- But there is **one problem here**, if we import axios in another page, it will be included again for the page bundle. We want to include `axios` only once in our application, for this, we use the `build.vendor` key in our `nuxt.config.Js`: -->

しかし、**ひとつ問題があって**、仮に別のページで axios をインポートすると、そのページでもまたインクルードされてしまいます。この問題に対して、`axios` をアプリケーション内で一度だけインクルードしたいと思い、`nuxt.config.js` 内で `build.vendor` キーを使うようにしました。

```js
module.exports = {
  build: {
    vendor: ['axios']
  }
}
```

<!-- Then, I can import `axios` anywhere without having to worry about making the bundle bigger! -->

こうするとバンドルファイルが膨れ上がる心配なしに `axios` をどこでもインポートできます。

<!-- ## Vue Plugins -->

## Vue プラグイン

<!-- If we want to use [vue-notifications](https://github.com/se-panfilov/vue-notifications) to display notification in our application, we need to setup the plugin before launching the app. -->

アプリケーション内で通知を表示するために [vue-notifications](https://github.com/se-panfilov/vue-notifications) を使いたいときには、アプリケーションを起動する前にプラグインをセットアップする必要があります。

<!-- File `plugins/vue-notifications.js`: -->

`plugins/vue-notifications.js` ファイルを次のようにします:

```js
import Vue from 'vue'
import VueNotifications from 'vue-notifications'

Vue.use(VueNotifications)
```

<!-- Then, we add the file inside the `plugins` key of `nuxt.config.js`: -->

それから `nuxt.config.js` の `plugins` キーにファイルを記述します:

```js
module.exports = {
  plugins: ['~plugins/vue-notifications']
}
```

<!-- To learn more about the `plugins` configuration key, check out the [plugins api](/api/configuration-plugins). -->

`plugins` 設定キーについてより深く理解するには [plugins API](/api/configuration-plugins) を参照してください。

<!-- Actually, `vue-notifications` will be included in the app bundle, but because it's a library, we want to include it in the vendor bundle for better caching. -->

実は `vue-notifications` は app bundle ファイルに含まれます。しかしライブラリなので、うまくキャッシュさせるために vendor bundle ファイルに含めたいとします。

<!-- We can update our `nuxt.config.js` to add `vue-notifications` in the vendor bundle: -->

`nuxt.config.js` を更新して vendor bundle の中に `vue-notifications` を入れます:

```js
module.exports = {
  build: {
    vendor: ['vue-notifications']
  },
  plugins: ['~plugins/vue-notifications']
}
```

<!-- ## Client-side only -->

## クライアントサイドのみ

<!-- Some plugins might work **only for the browser**, you can use the `process.BROWSER_BUILD` variable to check if the plugin will run from the client-side. -->

いくつかのプラグインは **ブラウザでのみ** 動作します。`process.BROWSER_BUILD` 変数を使って、そのプラグインがクライアントサイドで動作するか確認することができます。

Example:

```js
import Vue from 'vue'
import VueNotifications from 'vue-notifications'

if (process.BROWSER_BUILD) {
  Vue.use(VueNotifications)
}
```

<!-- In case you need to require some libraries only for the server, you can use the `process.SERVER_BUILD` variable set to `true` when webpack is creating the `server.bundle.js` file. -->

もしサーバーサイドでのみライブラリを読み込む必要がある場合は、Webpack が `server.bundle.js` ファイルを作成するときに `true` がセットされる `process.SERVER_BUILD` 変数を使うことができます。
