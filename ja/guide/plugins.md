---
title: プラグイン
description: Nuxt.js では js プラグインを定義することができ、それはルートの Vue.js アプリケーションがインスタンス化される前に実行されます。プラグインとして自前のライブラリを指定することも、外部のモジュールを指定することもできます。
---

> Nuxt.js では js プラグインを定義することができ、それはルートの Vue.js アプリケーションがインスタンス化される前に実行されます。プラグインとして自前のライブラリを指定することも、外部のモジュールを指定することもできます。


<div class="Alert">

Vue インスタンスの [ライフサイクル](https://vuejs.org/v2/guide/instance.html#Lifecycle-Diagram) において、`beforeCreate` と `created` フックのみが **クライアントサイドとサーバーサイドの両方** で呼び出されることに注意してください。それ以外のすべてのフックはクライアントサイドでのみ呼び出されます。

</div>

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
  plugins: ['~/plugins/vue-notifications']
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

## アプリケーションのルートや context に挿入する

関数や値をアプリケーション全体で利用できるようにしたい場合もあるでしょう。
そのような変数を Vue インスタンス (クライアントサイド) やコンテキスト (サーバーサイド) 、さらに Vuex ストアへ挿入することが可能です。
それらの関数の前には `$` を付けるのが一般的です。

### Vue インスタンスに挿入する

Vue インスタンスへのコンテンツの挿入は、通常の Vue アプリケーションと同様に動作します。

`plugins/vue-inject.js`:

```js
import Vue from 'vue'

Vue.prototype.$myInjectedFunction = (string) => console.log("This is an example", string)
```

`nuxt.config.js`:

```js
module.exports = {
  plugins: ['~/plugins/vue-inject.js']
}
```

これで全ての Vue コンポーネントで関数を使用することが出来ます。

`example-component.vue`:

```js
export default {
  mounted(){
    this.$myInjectedFunction('test')
  }
}
```

### コンテキストに挿入する

Vue インスタンスへのコンテンツの挿入は、通常の Vue アプリケーションと同様に動作します。

`plugins/ctx-inject.js`:

```js
export default ({ app }, inject) => {
  // context.app オブジェクトへ関数を直接セットします
  app.myInjectedFunction = (string) => console.log('Okay, another function', string)
}
```

`nuxt.config.js`:

```js
module.exports = {
  plugins: ['~/plugins/ctx-inject.js']
}
```

コンテキストへアクセスするときには、いつでも関数を使用することが出来ます (例えば、 `asyncData` や `fetch` 関数内などです) 。

`ctx-example-component.vue`:

```js
export default {
  asyncData(context){
    context.app.myInjectedFunction('ctx!')
  }
}
```

### 統合された挿入

コンテキスト内で関数が必要な場合、Vue インスタンスだけでなく Vuex ストア内であっても、`inject` 関数を使用することが出来ます。この関数は、プラグインで公開された関数の第 2 引数です。

Vue インスタンスへのコンテンツの挿入は、通常の Vue アプリケーションと同様に動作します。関数の先頭へ自動的に `$` が追加されます。

`plugins/combined-inject.js`:

```js
export default ({ app }, inject) => {
  inject('myInjectedFunction', (string) => console.log('That was easy!', string))
}
```

`nuxt.config.js`:

```js
module.exports = {
  plugins: ['~/plugins/combined-inject.js']
}
```

Vue インスタンス内での `this` 、及びストアの `actions` / `mutations` 内での `this` を通して、コンテキストから関数を使用することが出来ます。

`ctx-example-component.vue`:

```js
export default {
  mounted(){
      this.$myInjectedFunction('works in mounted')
  },
  asyncData(context){
    context.app.$myInjectedFunction('works with context')
  }
}
```

`store/index.js`:

```js
export const state = () => ({
  someValue: ''
})

export const mutations = {
  changeSomeValue(state, newValue) {
    this.$myInjectedFunction('accessible in mutations')
    state.someValue = newValue
  }
}

export const actions = {
  setSomeValueToWhatever ({ commit }) {
    this.$myInjectedFunction('accessible in actions')
    const newValue = "whatever"
    commit('changeSomeValue', newValue)
  }
}
```

## クライアントサイド限定のプラグイン利用

プラグインのいくつかは **ブラウザでのみ** 動かしたいとします。その場合は `plugins` 内の `ssr: false` オプションを使うと、プラグインをクライアントサイドでのみ実行させることが可能です。

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

また、もしあなたが生成されたアプリケーション (`nuxt generate` コマンドによって) の中にいるかどうか知る必要がある場合は、生成から以降ずっと `process.static` 変数に `true` がセットされているかでチェックできます。保存前に `nuxt generate` コマンドによって、ページがサーバレンダリングされている時の状態を知るには、`process.static && process.server` を使うことができます。
