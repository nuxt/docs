---
title: "API: rootDir プロパティ"
description: Nuxt.js アプリケーションのワークスペースを指定します。
---

# rootDir プロパティ

- 型: `文字列`
- デフォルト: `process.cwd()`

> Nuxt.js アプリケーションのワークスペースを指定します。

このプロパティは [nuxt コマンド](/guide/commands) により上書きされ、そのコマンドの引数がセットされます（例: `nuxt my-app/` を実行すると `rootDir` に `my-app/` が絶対パス付きでセットされます）

このプロパティは [Nuxt.js をプログラムで使う](/api/nuxt) ときに用いると良いです。

<p class="Alert Alert--blue">このオプションは `node_modules` ディレクトリが `rootDir` フォルダ内にあることを求めるという側面もあります。もしアプリケーションのパスを node_modules なしで設定したいときは [`srcDir` オプション](/api/configuration-srcdir) を使ってください。</p>
