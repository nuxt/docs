---
title: コマンド
description: Nuxt.js は便利コマンドのセットを備えています。開発用途のものもプロダクション用途のものも含まれています。
---

<!-- title: Commands -->
<!-- description: Nuxt.js comes with a set of useful commands, both for development and production purpose. -->

<!-- \> Nuxt.js comes with a set of useful commands, both for development and production purpose. -->

> Nuxt.js は便利コマンドのセットを備えています。開発用途のものもプロダクション用途のものも含まれています。

<!-- ## List of Commands -->

## コマンド一覧

<!-- | Command | Description | -->
<!-- |---------|-------------| -->
<!-- | nuxt | Launch a development server on [localhost:3000](http://localhost:3000) with hot-reloading. | -->
<!-- | nuxt build | Build your application with webpack and minify the JS & CSS (for production). | -->
<!-- | nuxt start | Start the server in production mode (After running `nuxt build`). | -->
<!-- | nuxt generate | Build the application and generate every route as a HTML file (used for static hosting). | -->

| コマンド | 説明 |
|---------|-------------|
| nuxt | 開発サーバーを [localhost:3000](http://localhost:3000) で起動します。このサーバーはホットリローディングします |
| nuxt build | アプリケーションを Webpack でビルドし、JS と CSS をプロダクション向けにミニファイします |
| nuxt start | プロダクションモードでサーバーを起動します（`nuxt build` 後に実行してください） |
| nuxt generate | アプリケーションをビルドして、ルートごとに HTML ファイルを生成します（静的ファイルのホスティングに用います） |

<!-- You should put these commands in the `package.json`: -->

これらのコマンドを `package.json` に書いておくと良いでしょう:

```json
"scripts": {
  "dev": "nuxt",
  "build": "nuxt build",
  "start": "nuxt start",
  "generate": "nuxt generate"
}
```

<!-- Then, you can launch your commands via `npm run <command>` (example: `npm run dev`). -->

そうすれば、`npm run <command>` 経由で Nuxt.js のコマンドを実行することができます（例: `npm run dev`）

<!-- ## Development Environment -->

## 開発環境

<!-- To launch Nuxt in development mode with the hot reloading: -->

Nuxt.js をホットリローディングする開発モードで起動するには:

<!-- ```bash -->
<!-- nuxt -->
<!-- // OR -->
<!-- npm run dev -->
<!-- ``` -->

```bash
nuxt
// または
npm run dev
```

<!-- ## Production Deployment -->

## プロダクションのデプロイ

<!-- Nuxt.js lets your choose between 2 modes to deploy your application: Server Rendered or Static Generated. -->

Nuxt.js ではアプリケーションをデプロイするための 2つのモードから選べます: サーバーサイドレンダリングするモードと静的ファイルを生成するモードです。

<!-- ### Server Rendered Deployment -->

### サーバーサイドレンダリングモードのデプロイ

<!-- To deploy, instead of running nuxt, you probably want to build ahead of time. Therefore, building and starting are separate commands: -->

デプロイするために、nuxt コマンドを実行するのではなく、前もってビルドしておきたいと思われるでしょう。そのような理由から、ビルドコマンドとサーバー起動のコマンドは分かれています:

```bash
nuxt build
nuxt start
```

<!-- The `package.json` like follows is recommended: -->

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

<!-- Note: we recommend putting `.nuxt` in `.npmignore` or `.gitignore`. -->

メモ: `.npmignore` または `.gitignore` 内に `.nuxt` を書いておくと良いでしょう。

<!-- ### Static Generated Deployment -->

### 静的に生成されたファイルのデプロイ

<!-- Nuxt.js gives you the possibility to host your web application on any static hosting. -->

Nuxt.js を使うと、静的ファイルのホスティングサービスでも、ウェブアプリケーションをホストすることができます。

<!-- To generate our web application into static files: -->

アプリケーションから静的ファイルを生成するには:

```bash
npm run generate
```

<!-- It will create a `dist` folder with everything inside ready to be deployed on a static hosting. -->

`dist` フォルダが作成され、その中に静的ファイルのホスティングサービスにデプロイされるべきものがすべて入ります。

<!-- If you have a project with [dynamic routes](/guide/routing#dynamic-routes), take a look at the [generate configuration](/api/configuration-generate) to tell nuxt.js how to generate these dynamic routes. -->

プロジェクトで [動的なルーティング](/guide/routing#動的なルーティング) を使っている場合は、Nuxt.js に動的なルーティングを生成させるために [generate 設定](/api/configuration-generate) に目を通してください。

<!-- <div class="Alert">When generating your web application with `nuxt generate`, [the context](/api#context) given to [data()](/guide/async-data#the-data-method) and [fetch()](/guide/vuex-store#the-fetch-method) will not have `req` and `res`.</div> -->

<div class="Alert">`nuxt generate` でウェブアプリケーションを生成するときは、[data()](/guide/async-data#the-data-method) や [fetch()](/guide/vuex-store#the-fetch-method) に渡される [context](/api#context) は `req` 及び `res` を持たなくなります。</div>
