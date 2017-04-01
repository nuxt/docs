---
title: インストール
description: Nuxt.js はとても簡単に始められます。シンプルなプロジェクトでは必要な依存パッケージは `nuxt` だけです。
---

<!-- title: Installation -->
<!-- description: Nuxt.js is really easy to get started with. A simple project only need the `nuxt` dependency. -->

<!-- \> Nuxt.js is really easy to get started with. A simple project only need the `nuxt` dependency. -->

Nuxt.js はとても簡単に始められます。シンプルなプロジェクトでは必要な依存パッケージは `nuxt` だけです。

<!-- ## Using Nuxt.js starter template -->

## Nuxt.js を使ったスターターテンプレート

<!-- To start quickly, the Nuxt.js team has created a [starter template](https://github.com/nuxt/starter). -->

素早くスタートできるようにするため、Nuxt.js チームは [スターターテンプレート](https://github.com/nuxt/starter) を用意しました。

<!-- [Download the .zip](https://github.com/nuxt/starter/archive/source.zip) starter template or install it with vue-cli: -->

[ZIP をダウンロード](https://github.com/nuxt/starter/archive/source.zip) するか、vue-cli を使ってインストールしてください:

```bash
$ vue init nuxt/starter <project-name>
```

<!-- \> If [vue-cli](https://github.com/vuejs/vue-cli) is not installed, please install it with `npm install -g vue-cli` -->

> もし [vue-cli](https://github.com/vuejs/vue-cli) をインストールしていなければ、`npm install -g vue-cli` でインストールしてください。

<!-- then install the dependencies: -->

それから依存するパッケージをインストールしてください:

```bash
$ cd <project-name>
$ npm install
```

<!-- and launch the project with: -->

そしてプロジェクトを起動してください:

```bash
$ npm run dev
```

<!-- The application is now running on http://localhost:3000 -->

するとアプリケーションは http://localhost:3000 で動いています。

<!-- <p class="Alert">Nuxt.js will listen on the files changes inside the `pages` directory, so no need to restart the application when adding new pages</p> -->

<p class="Alert">Nuxt.js は `pages` ディレクトリ内のファイルの更新を監視します。そのため、新しいページを追加したときにアプリケーションを再起動する必要はありません。</p>

<!-- To discover more about the directory structure of the project: [Directory Structure Documentation](/guide/directory-structure). -->

プロジェクトのディレクトリ構造についてより深く理解するには [ディレクトリ構造のドキュメント](/guide/directory-structure) を参照してください。

<!-- ## Starting from scratch -->

## スクラッチから始める

<!-- Creating a Nuxt.js application from scratch is also really easy, it only needs *1 file and 1 directory*. Let's create an empty directory to start working on the application: -->

Nuxt.js アプリケーションをスクラッチから作ることもとても簡単で、必要なものは *1つのファイルと 1つのディレクトリ* だけです。まずはアプリケーションで動かす空のディレクトリを作りましょう:

```bash
$ mkdir <project-name>
$ cd <project-name>
```

<!-- *Info: replace project-name by the name of the project.* -->

*メモ: `<project-name>` の箇所は置き換えてください。*

<!-- ### The package.json -->

### package.json

<!-- The project needs a `package.json` file to specify how to start `nuxt`: -->

`nuxt` コマンドを使うように指定する `package.json` ファイルが必要です（訳注: Nuxt.js は開発サーバーを起動する `nuxt` コマンドを用意しています）:

```json
{
  "name": "my-app",
  "scripts": {
    "dev": "nuxt"
  }
}
```

<!-- `scripts` will launch Nuxt.js via `npm run dev`. -->

上のように書いておけば `npm run dev` で Nuxt.js を起動できます。

<!-- ### Installing `nuxt` -->

### `nuxt` のインストール

<!-- Once the `package.json` has been created, add `nuxt` to the project via npm: -->

`package.json` を作成したら `nuxt` を npm でプロジェクトに追加しましょう:

```bash
npm install --save nuxt
```

<!-- ### The `pages` directory -->

### `pages` ディレクトリ

<!-- Nuxt.js will transform every `*.vue` file inside the `pages` directory as a route for the application. -->

Nuxt.js は `pages` ディレクトリ内の `*.vue` ファイルについて、各ファイルがアプリケーションのひとつのルートに対応するものとして変換します。

<!-- Create the `pages` directory: -->

`pages` ディレクトリを作ります:

```bash
$ mkdir pages
```

<!-- then create the first page in `pages/index.vue`: -->

それから最初のページを `pages/index.vue` に作ります:

```html
<template>
  <h1>Hello world!</h1>
</template>
```

<!-- and launch the project with: -->

そして、プロジェクトを起動します:

```bash
$ npm run dev
```

<!-- The application is now running on http://localhost:3000 -->

すると、アプリケーションは http://localhost:3000 で動いています。

<!-- <p class="Alert">Nuxt.js will listen on the files changes inside the `pages` directory, so no need to restart the application when adding new pages</p> -->

<p class="Alert">Nuxt.js は `pages` ディレクトリ内のファイルの更新を監視します。そのため新しいページを追加した場合にアプリケーションを再起動する必要はありません。</p>

<!-- To discover more about the directory structure of the project: [Directory Structure Documentation](/guide/directory-structure). -->

プロジェクトのディレクトリ構造についてより深く理解するには [ディレクトリ構造のドキュメント](/guide/directory-structure) を参照してください。
