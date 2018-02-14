---
title: 設定
description: Nuxt.js ではデフォルトの設定でほとんどのユースケースをカバーしていますが `nuxt.config.js` で設定を上書きすることができます。
---

> Nuxt.js ではデフォルトの設定でほとんどのユースケースをカバーしていますが `nuxt.config.js` で設定を上書きすることができます。

### build

このオプションで vendor.bundle.js ファイルにモジュールを追加できます。vendor.bundle.js は app バンドルファイルのサイズを削減するために生成されるものです。外部のモジュールを使うときに役立ちます。

[build オプションに関するドキュメント](/api/configuration-build)

### css

このオプションで、グローバルに利用したい（どのファイルにもインクルードしたい）CSS ファイル/モジュール/ライブラリを指定できます。

[css オプションに関するドキュメント](/api/configuration-css)

### dev

このオプションで、Nuxt.js の開発モードまたはプロダクションモードを定義できます。

[dev オプションに関するドキュメント](/api/configuration-dev)

### env

このオプションで、クライアントサイドでもサーバーサイドでも使える環境変数を指定できます。

[`env` オプションに関するドキュメント](/api/configuration-env)

### generate

このオプションは、動的なルーティングをしているアプリケーションを Nuxt.js で HTML ファイルに変換するときに使います。動的なルーティングに用いるパラメータを指定できます。

[generate オプションに関するドキュメント](/api/configuration-generate)

### head

このオプションで、アプリケーションのデフォルトのメタ情報（訳注: head タグ内のメタタグの情報）を指定できます。

[head オプションに関するドキュメント](/api/configuration-head)

### loading

このオプションで、Nuxt.js のデフォルトのローディングコンポーネントをカスタマイズできます。

[`loading` オプションに関するドキュメント](/api/configuration-loading)

### modules

このオプションで、プロジェクトにnuxtモジュールを追加できます。

[`modules` オプションに関するドキュメント](/api/configuration-modules)

### plugins

このオプションで、ルートの vue.js アプリケーションをインスタンス化する前に実行したい JavaScript plugin を指定できます。

[`plugins` オプションに関するドキュメント](/api/configuration-plugins)

### rootDir

このオプションで、Nuxt.js アプリケーションのワークスペースを指定できます。

[`rootDir` オプションに関するドキュメント](/api/configuration-rootdir)

### router

このオプションで、Nuxt.js のデフォルトの vue-router 設定を上書きできます。

[`router` オプションに関するドキュメント](/api/configuration-router)

### srcDir

このオプションで、アプリケーションのソースディレクトリを指定できます。

[srcDir オプションに関するドキュメント](/api/configuration-srcdir)

### transition

このオプションで、ページ間のトランジションのデフォルト設定を指定できます。

[transition オプションに関するドキュメント](/api/configuration-transition)
