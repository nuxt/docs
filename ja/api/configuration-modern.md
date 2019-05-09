---
title: "API: modern プロパティ"
description: モダンバンドルをビルドして配信する
---

# modern プロパティ

> この機能は [vue-cli modern モード](https://cli.vuejs.org/guide/browser-compatibility.html#modern-mode) にインスパイアされています

- 型: `String` または `Boolean`
  - デフォルト: false
  - 受け取ることができる値:
    - `'client'`: モダンバンドルの `<script type="module">` とレガシーバンドルの `<script nomodule>` のスクリプトを両方配信し、 また `<link rel="modulepreload">` をモダンバンドルのために提供します。 古いブラウザがレガシー（トランスパイルされた）なバンドルにフォールバックしている間に、 `module` タイプを理解するすべてのブラウザはモダンバンドルを読み込むでしょう。
    - `'server'` または `true`: Node.js サーバがユーザエージェントをベースにブラウザのバージョンをチェックして、対応したモダンかレガシーどちらかのバンドルを配信するでしょう。
    - `false`: モダンビルドを無効化します。

2つのバージョンのバンドルについて:

1. モダンバンドル: ES modules をサポートするモダンブラウザを対象にしています。
2. レガシーバンドル: babel config（デフォルトでは IE9 互換）をベースにした古いブラウザを対象にしています。

**情報:** `nuxt build/start --modern=[type]` か `nuxt build/start -m=[type]` のコマンドを利用することでモダンバンドルでビルド/スタートし、`package.json` の scripts の中ではこのように modern コマンドを指定することができます:

```json
{
  "scripts": {
    "build:modern": "nuxt build --modern=server",
    "start:modern": "nuxt start --modern=server"
  }
}
```
***nuxt generate* に関する注記:** `modern` プロパティは `nuxt generate` コマンドでも動作しますが、このケースでは `client` オプションだけが優先されて `nuxt generate --modern` コマンドを値無しで起動した時に自動で選択されるでしょう。

> モダンビルドについてもっと詳しくは [Phillip Walton's excellent post](https://philipwalton.com/articles/deploying-es2015-code-in-production-today/) を参照してください。
