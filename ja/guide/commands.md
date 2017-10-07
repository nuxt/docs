---
title: コマンド
description: Nuxt.js は便利コマンドのセットを備えています。開発時に役立つものも、プロダクション用途のものもあります。
---

> Nuxt.js は便利コマンドのセットを備えています。開発時に役立つものも、プロダクション用途のものもあります。

## コマンド一覧

コマンド | 説明
--- | ---
nuxt | 開発サーバーを [localhost:3000](http://localhost:3000) で起動します。このサーバーはホットリローディングします
nuxt build | アプリケーションを Webpack でビルドし、JS と CSS をプロダクション向けにミニファイします
nuxt start | プロダクションモードでサーバーを起動します（`nuxt build` 後に実行してください）
nuxt generate | アプリケーションをビルドして、ルートごとに HTML ファイルを生成します（静的ファイルのホスティングに用います）

#### 引数

各コマンドに対して`--help`を使うと詳細な使用方法を入手できます。共通の引数は下記の通りです:

- **`--config-file` または `-c`:** `nuxt.config.js` ファイルへのパスを明記します。
- **`--spa` または `-s`:** サーバサイドレンダリングモードを不可にすることにより、SPA でコマンドを実行します。

#### package.jsonで使用する

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


<p class="Alert Alert--nuxt-green"><b>上級者用の Tips:</b> npm コマンドへ引数を渡すためには <code>--</code> スクリプト名を付ける必要があります（例: <code>npm run dev -- --spa</code>）</p>

## 開発環境

Nuxt.js をホットリローディングする開発モードで起動するには:

```bash
nuxt
// または
npm run dev
```

## プロダクションのデプロイ

Nuxt.js では 3つのモードからアプリケーションのデプロイを選択できます。サーバレンダリング、SPA、そして静的生成です。

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

プロジェクトで [動的なルーティング](/guide/routing#dynamic-routes) を使っている場合は、Nuxt.js に動的なルーティングを生成させるために [generate 設定](/api/configuration-generate) に目を通してください。


<div class="Alert">`nuxt generate` でウェブアプリケーションを生成するときは、[data()](/guide/async-data#the-data-method) や [fetch()](/guide/vuex-store#the-fetch-method) に渡される [context](/api#context) は `req` 及び `res` を持たなくなります。</div>

### シングルページアプリケーションデプロイ(SPA)

`nuxt generate` もビルド/生成の際に SSR エンジンを必要とします。全てのページがプリレンダリングされ高い SEO スコアとページロードスコアを持つという利点がありますが、一方でコンテンツは*ビルド時*に生成されるため、 例えば、（少なくとも初回のロードで）ユーザー認証やリアルタイム API に依存するアプリケーションでは使えません。

SPA のアイデアは単純です！`mode: 'spa'` または `--spa` フラグを使って spa モードを有効にしビルドを実行すると、 ビルド後に自動的に生成が開始します。しかしこの時にはページコンテンツはなく、共通のメタとリソースリンクだけがあります。

SPAデプロイ:

- `nuxt.config.js` 内の `mode` を `spa` に変更する
- `npm run build` を実行する
- 生成された `dist/` フォルダを、surge、GitHub Pages、あるいは nginx のような静的ファイルのホスティングサービスにデプロイする

もうひとつ、`spa` モードの間ずっと Nuxt をフレームワークの中でミドルウェアとして使うことができるというデプロイが可能です。これはサーバ負荷を減らすことを助け、SSR が不可能なプロジェクトで nuxt を使うことに役立ちます。


<div class="Alert">ポピュラーなホストへデプロイする例は [How to deploy on Heroku?](/faq/heroku-deployment) を参照してください。</div>
