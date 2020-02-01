---
title: "API: rootDir プロパティ"
description: Nuxt.js アプリケーションのワークスペースを指定します。
---

- 型: `String`
- デフォルト: `process.cwd()`

> Nuxt.js アプリケーションのワークスペースを指定します。
> Define the workspace directory of your Nuxt.js application.

このプロパティは [nuxt コマンド](/guide/commands) により上書きされ、そのコマンドの引数がセットされます（例: `nuxt my-app/` を実行すると `rootDir` に `my-app/` が絶対パス付きでセットされます）
This property will be overwritten by [nuxt commands](/guide/commands) if an argument is passed to them. Eg running `nuxt ./my-app/` will set the `rootDir` to the absolute path of `./my-app/` from the current/working directory

このプロパティは [Nuxt.js をプログラムで使う](/api/nuxt) ときに用いると良いです。
Because of that its normally not needed to configure this option unless you will use [Nuxt.js programmatically](/api/nuxt).

<div class="Alert Alert--blue">

このオプションは `node_modules` ディレクトリが `rootDir` フォルダ内にあることを求めるという側面もあります。もしアプリケーションのパスを node_modules なしで設定したいときは [`srcDir` オプション](/api/configuration-srcdir) を使ってください。

Both `rootDir` as the package root containing the `node_modules` directory need to be within the same directory tree to be able to [resolve dependencies](https://nodejs.org/api/modules.html#modules_all_together).
See the [`srcDir` option](/api/configuration-srcdir) for examples of directory structure when thats not the case
</div>
