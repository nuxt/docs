---
title: プラグイン
description: Nuxt.js では js プラグインを定義することができ、それはルートの Vue.js アプリケーションがインスタンス化される前に実行されます。プラグインとして自前のライブラリを指定することも、外部のモジュールを指定することもできます。
---

> Nuxt.js では js プラグインを定義することができ、それはルートの Vue.js アプリケーションがインスタンス化される前に実行されます。プラグインとして自前のライブラリを指定することも、外部のモジュールを指定することもできます。

<div class="Alert">Vue インスタンスの [ライフサイクル](https://vuejs.org/v2/guide/instance.html#Lifecycle-Diagram) において、`beforeCreate` と `created` フックのみが **クライアントサイドとサーバーサイドの両方** で呼び出されることに注意してください。それ以外のすべてのフックはクライアントサイドでのみ呼び出されます。</div>

## 外部パッケージの利用

アプリケーションに外部パッケージ/モジュールを使いたいときがあるでしょう。例えばサーバーでもクライアントでも HTTP リクエストを送れる [axios](https://github.com/mzabriskie/axios) などが良い例です。

外部パッケージは npm でインストールします:

```bash
npm install --save axios
```

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

ただしここで **ひとつ問題があり**、もし別のページでも import axios と書くと、axios は重複してバンドルファイルに含まれてしまいます。そこで `axios` をアプリケーション内で一度だけインクルードするには `nuxt.config.js` 内で `build.vendor` キーを使います:

```js
module.exports = {
  build: {
    vendor: ['axios']
  }
}
```

こうすれば、バンドルファイルが膨れ上がることなく、どの場所にも `import axios` と書くことができます。

## Vue プラグイン

アプリケーション内で通知を表示するために [vue-notifications](https://github.com/se-panfilov/vue-notifications) を使いたいときには、アプリケーションを起動する前にプラグインをセットアップする必要があります。

そのためには `plugins/vue-notifications.js` ファイルを次のように記述します:

```js
import Vue from 'vue'
import VueNotifications from 'vue-notifications'

Vue.use(VueNotifications)
```

それから `nuxt.config.js` の `plugins` キーにファイルを記述します:

```js
module.exports = {
  plugins: ['~plugins/vue-notifications']
}
```

`plugins` 設定キーについてより深く理解するには [plugins API](/api/configuration-plugins) を参照してください。

さて、上の書き方では、実は `vue-notifications` は app というバンドルファイルに含まれます。しかし `vue-notifications` はライブラリなので、vendor というバンドルファイルに含めて、うまくキャッシュさせたいと考えます。

そうするには `nuxt.config.js` を更新して vendor というバンドルファイルの設定の中に `vue-notifications` を入れます:

```js
module.exports = {
  build: {
    vendor: ['vue-notifications']
  },
  plugins: ['~plugins/vue-notifications']
}
```

## クライアントサイド限定のプラグイン利用

プラグインのいくつかは **ブラウザでのみ** 動かしたいとします。その場合は `plugins` 内の `ssr: false` オプションを使うと、プラグインをクライアントサイドでのみ実行させるが可能です。

例:

`nuxt.config.js`:

```js
module.exports = {
  plugins: [
    { src: '~plugins/vue-notifications', ssr: false }
  ]
}
```

`plugins/vue-notifications.js`:

```js
import Vue from 'vue'
import VueNotifications from 'vue-notifications'

Vue.use(VueNotifications)
```

逆に、サーバーサイドでのみライブラリを読み込む必要がある場合は、`process.server` 変数を使うことができます。これは Webpack が `server.bundle.js` ファイルを作成するタイミングで `true` がセットされる変数です。
