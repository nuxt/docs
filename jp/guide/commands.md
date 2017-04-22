---
title: コマンド
description: Nuxt.js は便利コマンドのセットを備えています。開発時に役立つものも、プロダクション用途のものもあります。
---

> Nuxt.js は便利コマンドのセットを備えています。開発時に役立つものも、プロダクション用途のものもあります。

## コマンド一覧

| コマンド | 説明 |
|---------|-------------|
| nuxt | 開発サーバーを [localhost:3000](http://localhost:3000) で起動します。このサーバーはホットリローディングします |
| nuxt build | アプリケーションを Webpack でビルドし、JS と CSS をプロダクション向けにミニファイします |
| nuxt start | プロダクションモードでサーバーを起動します（`nuxt build` 後に実行してください） |
| nuxt generate | アプリケーションをビルドして、ルートごとに HTML ファイルを生成します（静的ファイルのホスティングに用います） |

これらのコマンドを `package.json` に書いておくと良いでしょう:

```json
"scripts": {
  "dev": "nuxt",
  "build": "nuxt build",
  "start": "nuxt start",
  "generate": "nuxt generate"
}
```

そうすれば、`npm run <command>` 経由で Nuxt.js のコマンドを実行することができます（例: `npm run dev`）

## 開発環境

Nuxt.js をホットリローディングする開発モードで起動するには:

```bash
nuxt
// または
npm run dev
```

## プロダクションのデプロイ

Nuxt.js ではアプリケーションをデプロイするための 2つのモードから選べます。サーバーサイドレンダリングするモードと、静的ファイルを生成するモードです。

### サーバーサイドレンダリングモードのデプロイ

デプロイするために、nuxt コマンドを実行するのではなく、前もってビルドしておきたいと思われるでしょう。そのような理由から、ビルドコマンドとサーバー起動のコマンドは分かれています:

```bash
nuxt build
nuxt start
```

`package.json` では下記のように記述することが推奨されています:

```json
{
  "name": "my-app",
  "dependencies": {
    "nuxt": "latest"
  },
  "scripts": {
    "dev": "nuxt",
    "build": "nuxt build",
    "start": "nuxt start"
  }
}
```

メモ: `.npmignore` または `.gitignore` 内に `.nuxt` を書いておくと良いでしょう。

### 静的に生成されたファイルのデプロイ

Nuxt.js を使うと、静的ファイルのホスティングサービスでも、ウェブアプリケーションをホストすることができます。

アプリケーションから静的ファイルを生成するには:

```bash
npm run generate
```

`dist` フォルダが作成され、その中に静的ファイルのホスティングサービスにデプロイされるべきものがすべて入ります。

プロジェクトで [動的なルーティング](/guide/routing#動的なルーティング) を使っている場合は、Nuxt.js に動的なルーティングを生成させるために [generate 設定](/api/configuration-generate) に目を通してください。

<div class="Alert">`nuxt generate` でウェブアプリケーションを生成するときは、[data()](/guide/async-data#the-data-method) や [fetch()](/guide/vuex-store#the-fetch-method) に渡される [context](/api#context) は `req` 及び `res` を持たなくなります。</div>
