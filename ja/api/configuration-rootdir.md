---
title: "API: rootDir プロパティ"
description: Nuxt.js アプリケーションのワークスペースを指定します。
---

- 型: `String`
- デフォルト: `process.cwd()`

> Nuxt.js アプリケーションのワークスペースディレクトリを指定します。

引数が渡された場合、このプロパティは [nuxt commands](/guide/commands) によって上書きされます。(例: `nuxt my-app/` を実行すると `rootDir` が current/working ディレクトリから `./my-app/` の絶対パスに設定されます。

[Nuxt.js をプログラムで使う](/api/nuxt)を使用しない限り、このオプションを指定する必要は通常ありません。

<div class="Alert Alert--blue">
[依存関係を解決](https://nodejs.org/api/modules.html#modules_all_together)できるようにするには、 `node_modules` ディレクトリを含むパッケージルート両方の `rootDir` が同じディレクトリツリー内にある必要があります。
そうでない場合のディレクトリ構造の例については、[`srcDir` オプション](/api/configuration-srcdir)を参照してください。
</div>
