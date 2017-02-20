---
title: 設定
description: Nuxt.js ではデフォルトの設定でほとんどのユースケースをカバーしています。しかし nuxt.config.js で設定を上書きすることができます。
---

<!-- title: Configuration -->
<!-- description: The Nuxt.js default configuration covers most of usages. However, the nuxt.config.js file lets you overwrite it. -->

<!-- \> The Nuxt.js default configuration covers most of usages. However, the nuxt.config.js file lets you overwrite it. -->

> Nuxt.js ではデフォルトの設定でほとんどのユースケースをカバーしています。しかし nuxt.config.js で設定を上書きすることができます。

### build

<!-- This option lets you add modules inside the vendor.bundle.js file generated to reduce the size of the app bundle. It's really useful when using external modules -->

このオプションで、アプリケーションのバンドルファイルのサイズを削減するために生成される vendor.bundle.js ファイル内にモジュールを追加できます。外部のモジュールを使うときに役に立ちます。

<!-- [Documentation about build integration](/api/configuration-build) -->

[build オプションに関するドキュメント](/api/configuration-build)

### cache

<!-- This option lets you enable cached components for better render performances. -->

このオプションで、レンダリングのパフォーマンスを向上させるためにコンポーネントをキャッシュできます。

<!-- [Documentation about cache integration](/api/configuration-cache) -->

[cache オプションに関するドキュメント](/api/configuration-cache)

### css

<!-- This option lets you define the CSS files/modules/libraries you want to set as globals (included in every pages). -->

このオプションで、グローバルに利用したい（どのファイルにもインクルードしたい）CSS ファイル/モジュール/ライブラリを指定できます。

<!-- [Documentation about css integration](/api/configuration-css) -->

[css オプションに関するドキュメント](/api/configuration-css)

### dev

<!-- This option lets you define the development or production mode of nuxt.js -->

このオプションで、Nuxt.js の開発モードまたはプロダクションモードを定義できます。

<!-- [Documentation about dev integration](/api/configuration-dev) -->

[dev オプションに関するドキュメント](/api/configuration-css)

### env

<!-- This option lets you define environment variables available both client and server side. -->

このオプションで、クライアントサイドでもサーバーサイドでも使える環境変数を指定できます。

<!-- [Documentation about env integration](/api/configuration-env) -->

[env オプションに関するドキュメント](/api/configuration-env)

### generate

<!-- This option lets you to define each params value for every dynamic routes in your application that Nuxt.js transforms into HTML files. -->

このオプションで、Nuxt.js が HTML ファイルに変換するアプリケーション内の動的なルーティングのためのパラメータを指定できます。（訳に自信なし。原文は This option lets you to define each params value for every dynamic routes in your application that Nuxt.js transforms into HTML files.）

<!-- [Documentation about generate integration](/api/configuration-generate) -->

[generate オプションに関するドキュメント](/api/configuration-generate)

### head

<!-- This option lets you to define all the defaults metas for your application. -->

このオプションで、アプリケーションのデフォルトのメタ情報（訳注: head タグ内のメタタグの情報）を指定できます。

<!-- [Documentation about head integration](/api/configuration-head) -->

[head オプションに関するドキュメント](/api/configuration-head)

### loading

<!-- This option lets you to customize the loading component load by default with Nuxt.js. -->

このオプションで、Nuxt.js のデフォルトのローディングコンポーネントをカスタマイズできます。

<!-- [Documentation about loading integration](/api/configuration-loading) -->

[loading オプションに関するドキュメント](/api/configuration-loading)

### plugins

<!-- This option lets you to define Javascript plugins to be ran before instantiating the root vue.js application. -->

このオプションで、ルートの vue.js アプリケーションをインスタンス化する前に実行したい Javascript plugin を指定できます。

<!-- [Documentation about plugins integration](/api/configuration-plugins) -->

[plugings オプションに関するドキュメント](/api/configuration-plugins)

### rootDir

<!-- This option lets you define the workspace of your nuxt.js application. -->

このオプションで、Nuxt.js アプリケーションのワークスペースを指定できます。

<!-- [Documentation about rootDir integration](/api/configuration-rootdir) -->

[rootDir オプションに関するドキュメント](/api/configuration-rootdir)

### router

<!-- This option lets you to overwrite the default Nuxt.js configuration of vue-router. -->

このオプションで、Nuxt.js のデフォルトの vue-router 設定を上書きできます。

<!-- [Documentation about router integration](/api/configuration-router) -->

[router オプションに関するドキュメント](/api/configuration-router)

### srcDir

<!-- This option lets you define the source directory of your nuxt.js application. -->

このオプションで、Nuxt.js のソースディレクトリを指定できます。

<!-- [Documentation about srcDir integration](/api/configuration-srcdir) -->

[srcDir オプションに関するドキュメント](/api/configuration-srcdir)

### transition

<!-- This option lets you define the default properties of the pages transitions. -->

このオプションで、ページ間の遷移のデフォルト設定を指定できます。

<!-- [Documentation about transition integration](/api/configuration-transition) -->

[transition オプションに関するドキュメント](/api/configuration-transition)
