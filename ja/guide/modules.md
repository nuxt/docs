---
title: モジュール
description: モジュールとは Nuxt.js のコアを機能的に拡張し、限りなく柔軟な統合を可能にする Nuxt.js の拡張です。
---

> モジュールとは Nuxt.js のコアを機能的に拡張し、限りなく柔軟な統合を可能にする Nuxt.js の拡張です。

## はじめに

Nuxt を使ってプロダクションレベルのアプリケーションを開発していると、Nuxt のコア機能が十分ではないことに すぐに気が付くでしょう。そしてプロジェクトの度に設定やプラグインを書くことは、繰り返される、退屈で時間を浪費する作業だと悟るでしょう。また一方で Nuxt にあらゆる機能を盛り込んでしまうと、たちまちファットなフレームワークになってしまうため、それも不可能なのです。

これが Nuxt が、コア機能を簡単に拡張できるようにするために、より高度なモジュールシステムを導入する理由でした。モジュールは基本的に**関数**です。モジュールは Nuxt が起動され、コアが Nuxt のすべてが完了するのを待機中でかつ Nuxt が仕事を続けるよりも前に、順番に呼び出されます。そのため、モジュールは Nuxt のほとんどすべての項目をカスタマイズできるチャンスを持ちます。また Nuxt 自身及び Webpack の [Tapable](https://github.com/webpack/tapable) の仕組みによって、モジュールは例えばビルドの初期化のような特定のエントリーポイントにフックを登録できるのです。

モジュールの利用についてもうひとつ重要な点は、モジュールをリファクタリングしてプロジェクトから切り出し、npm パッケージとしてリリースすることがっできるということです。したがってモジュールをシェアしたり、高品質のインテグレーションや Nuxt コミュニティのソリューションを問題なく利用できます！もしあなたが下記に該当するならば、モジュールはきっと興味深いものでしょう:

- プロジェクトを即座にセットアップしたい、また、新しいプロジェクトのたびに Gooogle Analytics のお決まりのタスクをするような**車輪の再発明**を避けたい、と願う**アジャイル・チーム**のメンバーである。
- あなたのプロジェクトにとって**品質**と**再利用**が重視される**エンタープライズ** である。
- 愛すべき**オープンソース**熱狂者であり、あなたの成果を簡単な方法でコミュニティと**シェア**することに関心がある。 
- 面倒くさがりなプログラマーであり、新しいライブラリをセットアップしたり統合するたびに詳細まで調べたくない（あなたがコミュニティに対していつも何か作ることをお願いできるのでなければ、他の誰かがモジュールを提供しているべき）。
- 低レベルな API が壊れたり、仕様の変更にうんざりしていて、**とにかく動く**ものを必要としている。

## 基本的なモジュールを書く

既に言及されているように、モジュールはただの関数です。npm モジュールとしてパッケージングしたり、あるいはプロジェクトのソースコードに直接インクルードすることができます。

**modules/simple.js**

```js
module.exports = function SimpleModule (moduleOptions) {
  // ここにあなたのコードを書く
}

// npm パッケージとして公開するのであれば必須
// module.exports.meta = require('./package.json')
```

**`moduleOptions`**

これは `modules` の配列を利用するために、モジュールの利用者から渡されるオブジェクトです。これを使うことで modules のふるまいをカスタマイズすることができます。

**`this.options`**

この参照を利用して Nuxt options へ直接アクセスすることができます。これは `nuxt.config.js` であり、すべてのデフォルトのオプションがアサインされています。モジュール間で共有されるオプションとして利用できます。

**`this.nuxt`**

現在の Nuxt インスタンスへの参照です。利用可能なメソッドは [Nuxt クラスのドキュメント](/api/internals-nuxt) を参照してください。

**`this`**

モジュールのコンテキストです。利用可能なメソッドは [モジュールコンテナ](/api/internals-module-container) クラスのドキュメントを参照してください。

**`module.exports.meta`**

この行は npm パッケージとして公開するときは**必須**です。Nuxt はあなたのパッケージをより良く機能させるために、内部でメタ情報を利用します。

**nuxt.config.js**

```js
module.exports = {
  modules: [
    // シンプルな使い方
    '~/modules/simple'

    // オプションを渡す
    ['~/modules/simple', { token: '123' }]
  ]
}
```

それから Nuxt にプロジェクトでいくつかの特定のモジュールをロードするよう伝えます。その際に任意のパラメーターを options として渡すようにします。詳しくは [モジュール設定](/api/configuration-modules) を参照してください。

## 非同期モジュール

すべてのモジュールが同期的に処理を行うわけではありません。例えばどこかの API からフェッチしたり IO を非同期的に扱うモジュールを開発したい場合もあるでしょう。このような場合のために Nuxt は Promise を返したりコールバックを呼び出す非同期モジュールをサポートしています。

### async/await を利用する


<p class="Alert Alert--orange">`async`/`await` は Node.js では 7.2 より上のバージョンでしかサポートされていないことに注意してください。したがって、あなたがモジュール開発者であれば `async`/`await` を利用しているかどうかをユーザーに知らせてください。大きめの非同期モジュールを作成したり、レガシーサポートを行いやすくするため、バンドラを利用して、古めの Nuxt.js でも動くように変換するか、Promise メソッドを使うように変換するか選ぶことができます。

</p>

```js
const fse = require('fs-extra')

module.exports = async function asyncModule() {
  // `async`/`await` を使って非同期処理ができる
  let pages = await fse.readJson('./pages.json')
}
```

### Promise を返す

```js
const axios = require('axios')

module.exports = function asyncModule() {
  return axios.get('https://jsonplaceholder.typicode.com/users')
    .then(res => res.data.map(user => '/users/' + user.username))
    .then(routes => {
      // Nuxt のルートを拡張して何かの処理を行う
    })
}
```

### コールバックを利用する

```js
const axios = require('axios')

module.exports = function asyncModule(callback) {
  axios.get('https://jsonplaceholder.typicode.com/users')
    .then(res => res.data.map(user => '/users/' + user.username))
    .then(routes => {
      callback()
    })
}
```

## 共通のスニペット

### トップレベルのオプション

モジュールを `nuxt.config.js` に登録するときに、トップレベルのオプションを利用できれば便利な場合があるため、複数のオプションを結合できるようになっています。

**nuxt.config.js**

```js
module.exports = {
  modules: [
    '@nuxtjs/axios'
  ],

  // axios モジュールは下記のオプションを `this.options.axios` で利用できることを知っている
  axios: {
    option1,
    option2
  }
}
```

**module.js**

```js
module.exports = function (moduleOptions) {
  const options = Object.assign({}, this.options.axios, moduleOptions)
  // ...
}
```

### プラグインを提供する

モジュールが追加されるときに、ひとつ以上のプラグインを提供することは一般的です。例えば [bootstrap-vue](https://bootstrap-vue.js.org) モジュールは bootstrap-vue モジュール自身を Vue に登録することを求めます。このようなケースのため `this.addPlugin` ヘルパーが用意されています。

**plugin.js**

```js
import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue/dist/bootstrap-vue.esm'

Vue.use(BootstrapVue)
```

**module.js**

```js
const path = require('path')

module.exports = function nuxtBootstrapVue (moduleOptions) {
  // `plugin.js` テンプレートを登録する
  this.addPlugin(path.resolve(__dirname, 'plugin.js'))
}
```

### テンプレートプラグイン

登録されたテンプレートやプラグインは、登録されたプラグインの出力を条件に応じて変更するために [lodash templates](https://lodash.com/docs/4.17.4#template) を利用できます。

**plugin.js**

```js
// Google Analytics UA をセットする
ga('create', '<%= options.ua %>', 'auto')

<% if (options.debug) { %>
// 開発時のみのコード
<% } %>
```

**module.js**

```js
const path = require('path')

module.exports = function nuxtBootstrapVue (moduleOptions) {
  // `plugin.js` テンプレートを登録する
  this.addPlugin({
    src: path.resolve(__dirname, 'plugin.js'),
    options: {
      // Nuxt はプラグインをプロジェクトにコピーする際に `options.ua` を `123` に置き換える
      ua: 123,

      // 開発時のみ有効な部分であり、プロダクションビルド時にはプラグインのコードから取り除かれる
      debug: this.options.dev
    }
  })
}
```

### CSS ライブラリを追加する

重複して同じライブラリを追加してしまうことを避けるために、ユーザーが既に当該ライブラリを利用しているか否かチェックすることが推奨されています。また、モジュールが CSS ファイルを追加**しないようにするオプション**を持たせることも常に検討してみてください。

**module.js**

```js
module.exports = function (moduleOptions) {
  if (moduleOptions.fontAwesome !== false) {
    // Font Awesome を追加する
    this.options.css.push('font-awesome/css/font-awesome.css')
  }
}
```

### assets を出力する

ビルド時にアセットを出力するために Webpack のプラグインを登録することができます。

**module.js**

```js
module.exports = function (moduleOptions) {
  const info = 'Built by awesome module - 1.3 alpha on ' + Date.now()

  this.options.build.plugins.push({
    apply (compiler) {
      compiler.plugin('emit', (compilation, cb) => {

        // info 変数の内容を用いて `.nuxt/dist/info.txt' を生成する
        // source はバッファとなる
        compilation.assets['info.txt'] = { source: () => info, size: () => info.length }

        cb()
      })
    }
  })
}
```

### カスタムローダーを登録する

`nuxt.config.js` 内の `build.extend` と同じように `this.extendBuild` を使うことができます。

**module.js**

```js
module.exports = function (moduleOptions) {
    this.extendBuild((config, { isClient, isServer }) => {
      // `.foo` ローダー
      config.module.rules.push({
        test: /\.foo$/,
        use: [...]
      })

      // 既存のローダーをカスタマイズする
      // 詳しくは Nuxt 内部のソースコードを参照:
      // https://github.com/nuxt/nuxt.js/blob/dev/lib/builder/webpack/base.config.js
      const barLoader = config.module.rules.find(rule => rule.loader === 'bar-loader')
  })
}
```

## 特定のフックでタスクを実行する

単に Nuxt の初期化処理時だけではなく、特定の条件下でのみ、モジュールにある処理を実行させたいこともあるでしょう。特定のイベント時にタスクを行うため、パワフルな [Tapable](https://github.com/webpack/tapable) プラグインシステムを使うことができます。フックが Promise を返すか `async` として定義されている場合は Nuxt は待機します。

```js
module.exports = function () {
  // モジュールにフックを追加する
  this.nuxt.plugin('module', moduleContainer => {
    // ここはすべてのモジュールがロードし終わったときに呼び出される
  })

  // レンダラーにフックを追加する
  this.nuxt.plugin('renderer', renderer => {
    // ここはレンダラーが作成されたときに呼び出される
  })

  // ビルドにフックを追加する
  this.nuxt.plugin('build', async builder => {
    // ここはビルダーが作成されたときに一度呼び出される

    // ここに内部的なフックも登録できる
    builder.plugin('compile', ({compiler}) => {
        // ここは Webpack のコンパイラが処理を開始する直前に実行される
    })
  })

  // generate にフックを追加する
  this.nuxt.plugin('generate', async generator => {
    // ここは Nuxt generate が開始されたときに呼び出される
  })
}
```


<p class="Alert">モジュールには他にも多くのフックがあり、また他にももっとできることがあります。Nuxt の内部 API については [Nuxt Internals](/api/internals) を参照してください。

</p>
