---
title: インストール
description: Nuxt.js はとても簡単に始められます。シンプルなプロジェクトでは必要な依存パッケージは `nuxt` だけです。
---

> Nuxt.js はとても簡単に始められます。シンプルなプロジェクトでは、必要になる依存パッケージは `nuxt` のみです。

## Nuxt.js を使ったスターターテンプレート

Nuxtを素早く開始するため、 Nuxt.js チームは [スターターテンプレート](https://github.com/nuxt-community/starter-template) を用意しました。

[ZIP をダウンロード](https://github.com/nuxt-community/starter-template/archive/master.zip) するか、vue-cli を使ってインストールしてください:

```bash
$ vue init nuxt-community/starter-template <project-name>
```

> もし [vue-cli](https://github.com/vuejs/vue-cli) をインストールしていなければ、`npm install -g vue-cli` でインストールしてください。

次に、依存するパッケージをインストールしてください:

```bash
$ cd <project-name>
$ npm install
```

その後プロジェクトを起動してください:

```bash
$ npm run dev
```

起動したアプリケーションには http://localhost:3000 でアクセスする事ができます。

<p class="Alert">Nuxt.js は `pages` ディレクトリ内のファイルの更新を監視します。そのため、新しいページを追加したときにアプリケーションを再起動する必要はありません。</p>

プロジェクトのディレクトリ構造についてより深く理解するには [ディレクトリ構造のドキュメント](/guide/directory-structure) を参照してください。

## スクラッチから始める

Nuxt.js アプリケーションをスクラッチから作ることもとても簡単で、必要なものは *1つのファイルと 1つのディレクトリ* だけです。まずはアプリケーションで動かす空のディレクトリを作りましょう:

```bash
$ mkdir <project-name>
$ cd <project-name>
```

*メモ: `<project-name>` の箇所は任意のプロジェクト名に置き換えてください。*

### package.json

`nuxt` コマンドを使うように指定する `package.json` ファイルが必要です（訳注: Nuxt.js は開発サーバーを起動する `nuxt` コマンドを用意しています）:

```json
{
  "name": "my-app",
  "scripts": {
    "dev": "nuxt"
  }
}
```

上のように書いておけば `npm run dev` で Nuxt.js を起動することができます。

### `nuxt` のインストール

`package.json` を作成したら `nuxt` を npm でプロジェクトに追加しましょう:

```bash
npm install --save nuxt
```

### `pages` ディレクトリ

Nuxt.js は `pages` ディレクトリ内の `*.vue` ファイルについて、各ファイルがアプリケーションのひとつのルートに対応するものとして変換します。

`pages` ディレクトリを作ります:

```bash
$ mkdir pages
```

次に、最初のページを `pages/index.vue` に作ります:

```html
<template>
  <h1>Hello world!</h1>
</template>
```

その後、プロジェクトを起動してください:

```bash
$ npm run dev
```

起動したアプリケーションには http://localhost:3000 でアクセスする事ができます。

<p class="Alert">Nuxt.js は `pages` ディレクトリ内のファイルの更新を監視します。そのため新しいページを追加した場合にアプリケーションを再起動する必要はありません。</p>

プロジェクトのディレクトリ構造についてより深く理解するには [ディレクトリ構造のドキュメント](/guide/directory-structure) を参照してください。
