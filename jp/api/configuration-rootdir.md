---
title: "API: rootDir プロパティ"
description: Nuxt.js アプリケーションのワークスペースを指定します。
---

<!-- title: "API: The rootDir Property" -->
<!-- description: Define the workspace of nuxt.js application -->

<!-- # The rootDir Property -->

# rootDir プロパティ

<!-- - Type: `String` -->
<!-- - Default: `process.cwd()` -->

- タイプ: `文字列`
- デフォルト: `process.cwd()`

<!-- \> Define the workspace of your nuxt.js application. -->

Nuxt.js アプリケーションのワークスペースを指定します。

<!-- This property is overwritten by [nuxt commands](/guide/commands) and set to the argument of the command (example: `nuxt my-app/` will set the `rootDir` to `my-app/` with its absolute path). -->

このプロパティは [nuxt コマンド](/guide/commands) により上書きされ、そのコマンドの引数がセットされます（例: `nuxt my-app/` を実行すると `rootDir` に `my-app/` が絶対パス付きでセットされます）

<!-- This property should be used when using [nuxt.js programmatically](/api/nuxt). -->

このプロパティは [Nuxt.js をプログラムで使う](/api/nuxt) ときに用いると良いです。

<!-- <p class="Alert Alert--blue">The downside of this option is that your `node_modules` directory should be inside the `rootDir` folder. If you want to set the path of the application without the node_modules, use the [`srcDir` option](/api/configuration-srcdir).</p> -->

<p class="Alert Alert--blue">このオプションは `node_modules` ディレクトリが `rootDir` フォルダ内にあることを求めるという側面もあります。もしアプリケーションのパスを node_modules なしで設定したいときは [`srcDir` オプション](/api/configuration-srcdir) を使ってください。</p>
