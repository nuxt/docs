---
title: プラグイン
description: Nuxt.js では js プラグインを定義することができ、それはルートの Vue.js アプリケーションがインスタンス化される前に実行されます。プラグインとして自前のライブラリを指定することも、外部のモジュールを指定することもできます。
---

<!-- title: Plugins -->
<!-- description: Nuxt.js allows you to define js plugins to be ran before instantiating the root vue.js application, it can be to use your own library or external modules. -->

<!-- \> Nuxt.js allows you to define js plugins to be ran before instantiating the root vue.js application, it can be to use your own library or external modules. -->

> Nuxt.js では js プラグインを定義することができ、それはルートの Vue.js アプリケーションがインスタンス化される前に実行されます。プラグインとして自前のライブラリを指定することも、外部のモジュールを指定することもできます。

<!-- <div class="Alert">It is important to know that in any Vue [instance lifecycle](https://vuejs.org/v2/guide/instance.html#Lifecycle-Diagram), only `beforeCreate` and `created` hooks are called **both from client-side and server-side**. All other hooks are called only from the client-side.</div> -->

<div class="Alert">Vue インスタンスの [ライフサイクル](https://vuejs.org/v2/guide/instance.html#Lifecycle-Diagram) において、`beforeCreate` と `created` フックのみが **クライアントサイドとサーバーサイドの両方** で呼び出されることに注意してください。それ以外のすべてのフックはクライアントサイドでのみ呼び出されます。</div>

<!-- ## External Packages -->

## 外部パッケージの利用

<!-- We may want to use external packages/modules in our application, one great example is [axios](https://github.com/mzabriskie/axios) for making HTTP request for both server and client. -->

アプリケーションに外部パッケージ/モジュールを使いたいときがあるでしょう。例えばサーバーでもクライアントでも HTTP リクエストを送れる [axios](https://github.com/mzabriskie/axios) などが良い例です。

<!-- We install it via NPM: -->

外部パッケージは NPM 経由でインストールします:

```bash
npm install --save axios
```

<!-- Then, we can use it directly in our pages: -->

そうすると次のようにページ内で直接それを使うことができます:

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

ただしここで **ひとつ問題があり**、もし別のページでも import axios と書くと、axios は重複してバンドルファイルに含まれてしまいます。そこで `axios` をアプリケーション内で一度だけインクルードするには `nuxt.config.js` 内で `build.vendor` キーを使います:

```js
module.exports = {
  build: {
    vendor: ['axios']
  }
}
```

<!-- Then, I can import `axios` anywhere without having to worry about making the bundle bigger! -->

こうすれば、バンドルファイルが膨れ上がることなく、どの場所にも `import axios` と書くことができます。

<!-- ## Vue Plugins -->

## Vue プラグイン

<!-- If we want to use [vue-notifications](https://github.com/se-panfilov/vue-notifications) to display notification in our application, we need to setup the plugin before launching the app. -->

アプリケーション内で通知を表示するために [vue-notifications](https://github.com/se-panfilov/vue-notifications) を使いたいときには、アプリケーションを起動する前にプラグインをセットアップする必要があります。

<!-- File `plugins/vue-notifications.js`: -->

そのためには `plugins/vue-notifications.js` ファイルを次のように記述します:

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

さて、上の書き方では、実は `vue-notifications` は app というバンドルファイルに含まれます。しかし `vue-notifications` はライブラリなので、vendor というバンドルファイルに含めて、うまくキャッシュさせたいと考えます。

<!-- We can update our `nuxt.config.js` to add `vue-notifications` in the vendor bundle: -->

そうするには `nuxt.config.js` を更新して vendor というバンドルファイルの設定の中に `vue-notifications` を入れます:

```js
module.exports = {
  build: {
    vendor: ['vue-notifications']
  },
  plugins: ['~plugins/vue-notifications']
}
```

<!-- ## Client-side only -->

## クライアントサイド限定のプラグイン利用

<!-- Some plugins might work **only for the browser**, you can use the `process.BROWSER_BUILD` variable to check if the plugin will run from the client-side. -->

プラグインのいくつかは **ブラウザでのみ** 動かしたいとします。その場合は `process.BROWSER_BUILD` 変数を使って、あるプラグインをクライアントサイドで動作させることが可能です。

<!-- Example: -->

例:

```js
import Vue from 'vue'
import VueNotifications from 'vue-notifications'

if (process.BROWSER_BUILD) {
  Vue.use(VueNotifications)
}
```

<!-- In case you need to require some libraries only for the server, you can use the `process.SERVER_BUILD` variable set to `true` when webpack is creating the `server.bundle.js` file. -->

逆に、サーバーサイドでのみライブラリを読み込む必要がある場合は、`process.SERVER_BUILD` 変数を使うことができます。これは Webpack が `server.bundle.js` ファイルを作成するタイミングで `true` がセットされる変数です。
