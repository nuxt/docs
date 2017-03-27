---
title: はじめに
description: "2016年10月25日 zeit.co のチームが React アプリケーションをサーバーサイドレンダリングするためのフレームワーク Next.js を発表しました。そしてその発表から数時間後、Next.js と同じやり方で、しかし今度は Vue.js をサーバーサイドレンダリングするアプリケーションを構築するアイディアが生まれました。すなわち Nuxt.js の誕生です。"
---

<!-- title: Introduction -->
<!-- description: "The 25th of October 2016, the team behind zeit.co, announced Next.js, a framework for server-rendered React applications. Few hours after the announcement, the idea of creating server-rendered Vue.js applications the same way as Next.js was obvious: Nuxt.js was born." -->

<!-- \> The 25th of October 2016, the team behind [zeit.co](https://zeit.co/), announced [Next.js](https://zeit.co/blog/next), a framework for server-rendered React applications. Few hours after the announcement, the idea of creating server-rendered [Vue.js](https://vuejs.org) applications the same way as Next.js was obvious: **Nuxt.js** was born. -->

> 2016年10月25日 [zeit.co](https://zeit.co/) のチームが React アプリケーションをサーバーサイドレンダリングするためのフレームワーク [Next.js](https://zeit.co/blog/next) を発表しました。そしてその発表からわずか数時間後、Next.js と同じやり方で、しかし今度は [Vue.js](https://vuejs.org) をサーバーサイドレンダリングするアプリケーションを構築するアイディアが生まれました。すなわち **Nuxt.js** の誕生です。

<!-- ## What is Nuxt.js ? -->

## Nuxt.js とは何か？

<!-- Nuxt.js is a framework for creating Universal Vue.js Applications. -->

Nuxt.js とはユニバーサルな Vue.js アプリケーションを構築するためのフレームワークです。

<!-- Its main scope is **UI rendering** while abstracting away the client/server distribution. -->

クライアントサイド用のディストリビューションと、サーバーサイド用のディストリビューションとを分離して生成している間に行う **UI レンダリング** に焦点を当てています。

<!-- Our goal is to create a framework flexible enough so that you can use it as a main project base or in addition to your current project based on Node.js. -->

私たちのゴールは、あるプロジェクトの基礎として利用したり、あるいは既に進行中の Node.js ベースのプロジェクトに追加できる、柔軟なフレームワークを作成することです。

<!-- Nuxt.js presets all the configuration needed to make your development of a Vue.js Application **Server Rendered** more enjoyable. -->

Nuxt.js は **サーバーサイドレンダリング** する Vue.js アプリケーションの開発をもっと楽しくするために必要な設定を、あらかじめセットしています。

<!-- In addition, we also provide another deployment option called: *nuxt generate*. It will build a **Static Generated** Vue.js Application. -->
<!-- We believe that option could be the next big step in the development of Web Applications with microservices. -->

それに加えて *nuxt generate* と呼ばれる別の開発オプションも提供します。これは **静的に生成された** Vue.js アプリケーションを構築するためのものです。私たちはこのオプションが、マイクロサービスでウェブアプリケーションを開発するための次の大きな一歩になり得ると信じています。

<!-- As a framework, Nuxt.js comes with a lot of features to help you in your development between the client side and the server side such as Asynchronous Data, Middleware, Layouts, etc. -->

Nuxt.js はフレームワークとして、クライアントサイドとサーバーサイド間にまたがる開発を手助けする、たくさんの機能を備えています。例えば、非同期でのデータのやり取りや、Nuxt.js をミドルウェアとして利用することや、レイアウト機能などです。

<!-- ## How it Works -->

## どのように動作するか？

![Vue with Webpack and Babel](https://i.imgur.com/avEUftE.png)

<!-- Nuxt.js includes the following to create a rich web application development: -->

Nuxt.js はリッチなウェブアプリケーションを構築するために下記のものを含んでいます:

- [Vue 2](https://github.com/vuejs/vue)
- [Vue-Router](https://github.com/vuejs/vue-router)
- [Vuex](https://github.com/vuejs/vuex)（[Vuex ストアのオプション](/guide/vuex-store) を利用しているときに限ります）
- [Vue-Meta](https://github.com/declandewet/vue-meta)

<!-- A total of only **28kb min+gzip** (31kb with vuex). -->

すべて合わせてもわずか **28kb min+gzip** です（Vuex 利用時は 31kb）

<!-- Under the hood we use [Webpack](https://github.com/webpack/webpack) with [vue-loader](https://github.com/vuejs/vue-loader) and [babel-loader](https://github.com/babel/babel-loader) to bundle, code-split and minify your code. -->

また、ソースコードのバンドルや分割及びミニファイするために [Webpack](https://github.com/webpack/webpack) を使います。[vue-loader](https://github.com/vuejs/vue-loader) と [babel-loader](https://github.com/babel/babel-loader) も合わせて使います。

<!-- ## Features -->

## 主な機能

<!-- - Write Vue Files -->
<!-- - Automatic Code Splitting -->
<!-- - Server-Side Rendering -->
<!-- - Powerful Routing System with Asynchronous Data -->
<!-- - Static File Serving -->
<!-- - ES6/ES7 Transpilation -->
<!-- - Bundling and minifying of your JS & CSS -->
<!-- - Managing Head Elements -->
<!-- - Hot reloading in Development -->
<!-- - Pre-processor: SASS, LESS, Stylus, etc -->

- Vue ファイルで記述できること
- コードを自動的に分割すること
- サーバーサイドレンダリング
- 非同期データをハンドリングするパワフルなルーティング
- 静的ファイルの配信
- ES6/ES7 のトランスパイレーション
- JS と CSS のバンドル及びミニファイ
- Head 要素の管理
- 開発モードにおけるホットリローディング
- SASS, LESS, Stylus などのプリプロセッサのサポート

<!-- ## Schema -->

## 図解

<!-- This schema shows what is called by nuxt.js when the server is called or when the user navigate through the app via `<nuxt-link>`: -->

下の図は、サーバーサイドで処理が実行されたときや、ユーザーが `<nuxt-link>` を通して遷移したときに、Nuxt.js によって何が呼び出されるかを表しています:

![nuxt-schema](/nuxt-schema.png)

<!-- ## Server Rendered -->

## サーバーサイドレンダリング

<!-- You can use nuxt.js as a framework to handle all the UI rendering of your project. -->

Nuxt.js をプロジェクトの UI レンダリング全体を担うフレームワークとして使うことができます。

<!-- When launching `nuxt`, it will start a development server with hot-reloading and vue-server-renderer configured to automatically server-render your application. -->

`nuxt` コマンドを実行すると開発サーバーが起動されます。このサーバーはホットリローディング及び vue-server-render を備えており、vue-server-render は自動的にアプリケーションをサーバーサイドレンダリングするよう設定されています。

<!-- Take a look at [the commands](/guide/commands) to learn more about it. -->

コマンドについてより深く理解するには [コマンド](/guide/commands) を参照してください。

<!-- If you already have a server, you can plug nuxt.js by using it as a middleware, there is no restriction at all when using nuxt.js for developing your Universal Web Applications, see the [Using Nuxt.js Programmatically](/api/nuxt) guide. -->

既にサーバーがあるならば Nuxt.js をミドルウェアとして追加ことができます。ユニバーサルなウェブアプリケーションを開発するために Nuxt.js を利用するにあたって何も制限はありません。[Nuxt.js](/api/nuxt) ガイドを見てみてください。

<!-- ## Static Generated -->

## 静的ファイルの生成

<!-- The big innovation of nuxt.js comes here: `nuxt generate` -->

Nuxt.js による大きなイノベーションがやってきました。それが `nuxt generate` です。

<!-- When building your application it will generate the HTML of every of your routes to store it in a file. -->

`nuxt generate` はアプリケーションをビルドする際に、各ルートごとの HTML を生成します。

<!-- Example: -->

例えば、下記のファイル群がある場合:

```bash
-| pages/
----| about.vue
----| index.vue
```

<!-- Will generate: -->

次のファイルが生成されます:

```
-| dist/
----| about/
------| index.html
----| index.html
```

<!-- This way, you can host your generated web application on any static hosting! -->

このやり方により、静的ファイルをホスティングするサービスであっても、生成されたウェブアプリケーションをホストできます。

<!-- The best example is this website. It is generated and hosted on Github Pages: -->

最も良い例はこのウェブサイト自体です。このサイトは生成され GitHub Pages でホストされています:

<!-- - [Source code](https://github.com/nuxt/nuxtjs.org) -->
<!-- - [Generated code](https://github.com/nuxt/nuxtjs.org/tree/gh-pages) -->

- [ソースコード](https://github.com/nuxt/nuxtjs.org)
- [生成されたコード](https://github.com/nuxt/nuxtjs.org/tree/gh-pages)

<!-- We don't want to manually generate the application every time we update the [docs repository](https://github.com/nuxt/docs), so each push made calls an AWS Lambda function which: -->

私たちは [docs リポジトリ](https://github.com/nuxt/docs) を更新するたびに毎回手動でアプリケーションを生成するのは面倒だったので、AWS Lambda function から生成機能を実行しています:

<!-- 1. Clone the [nuxtjs.org repository](https://github.com/nuxt/nuxtjs.org) -->
<!-- 2. Install the dependencies via `npm install` -->
<!-- 3. Run `nuxt generate` -->
<!-- 4. Push the `dist` folder to the `gh-pages` Branch -->

1. [nuxtjs.org リポジトリ](https://github.com/nuxt/nuxtjs.org) をクローンする
2. `npm install` で依存しているパッケージをインストールする
3. `nuxt generate` を実行する
4. `dist` フォルダーを `gh-pages` ブランチにプッシュする

<!-- We now have a **Serverless Static Generated Web Application** :) -->

こうして私たちは **サーバーレスで静的に生成されたウェブアプリケーション** を手に入れたのでした。:)

<!-- We can go further by thinking of an e-commerce web application made with `nuxt generate` and hosted on a CDN, and every time a product is out of stock or back in stock, we regenerate the web app. But if the user navigates through the web app in the meantime, it will be up to date thanks to the API calls made to the e-commerce API. No need to have multiple instances of a server + a cache anymore! -->

さらに進めて `nuxt generate` で生成された E コマースのウェブアプリケーションを考えてみましょう。そのアプリケーションは CDN でホストされ、商品が在庫切れになったり入荷されたりするたびにアプリケーションが再生成されます。ユーザーがアプリケーション遷移している間に、在庫の状態が（再生成のおかげで）最新の状態になるのです。つまり、サーバーでいろいろなインスタンスを起動したり、キャッシュを持ったりする必要はもうないのです！
