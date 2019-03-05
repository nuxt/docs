---
title: ディレクトリ構造
description: デフォルトの Nuxt.js アプリケーションの構造は、小規模のアプリケーションと大規模のアプリケーションのどちらにも適しています。
---

> デフォルトの Nuxt.js アプリケーションの構造は、小規模のアプリケーションと大規模のアプリケーションのどちらにも適しています。もちろん、好きなように構成することもできます。

## ディレクトリ

### assets ディレクトリ

The `assets` directory contains your un-compiled assets such as Stylus or Sass files, images, or fonts.

アセットの取り扱いについてより深く理解するには [アセットに関するドキュメント](/guide/assets) を参照してください。

### components ディレクトリ

`components` ディレクトリには Vue.js のコンポーネントファイルを入れます。You can't use either `asyncData` or `fetch` in these components.

### layouts ディレクトリ

The `layouts` directory includes your application layouts. Layouts are used to change the look and feel of your page (for example by including a sidebar).

レイアウトの取り扱いついてより深く理解するには [レイアウトに関するドキュメント](/guide/views#レイアウト) を参照してください。

_This directory cannot be renamed without extra configuration._

### middleware ディレクトリ

`middleware` ディレクトリにはアプリケーションのミドルウェアを入れます。ミドルウェアを使って、ページやページグループ（レイアウト）をレンダリングするよりも前に実行されるカスタム関数を定義できます。

ミドルウェアについてより深く理解するには [ミドルウェアに関するドキュメント](/guide/routing#ミドルウェア) を参照してください。

### pages ディレクトリ

`pages` ディレクトリにはアプリケーションのビュー及びルーティングファイルを入れます。Nuxt.js フレームワークはこのディレクトリ内のすべての `*.vue` ファイルを読み込み、アプリケーションのルーターを作成します。

_This directory cannot be renamed without extra configuration._

ページの取り扱いについてより深く理解するには [ページに関するドキュメント](/guide/views) を参照してください。

### plugins ディレクトリ

`plugins` ディレクトリには、ルートの Vue.js アプリケーションをインスタンス化する前に実行したい JavaScript プラグインを入れます。 This is the place to register components globally and to inject functions or constants.

プラグインについてより深く理解するには [プラグインに関するドキュメント](/guide/plugins) を参照してください。

### static ディレクトリ

The `static` directory is directly mapped to the server root (`/static/robots.txt` is accessible under `http://localhost:3000/robots.txt`) and contains files that likely won't be changed (i.e. the favicon)

**例:** /static/robots.txt は /robots.txt に配置されます。

_This directory cannot be renamed without extra configuration._

静的ファイルの取り扱いについてより深く理解するには [静的ファイルに関するドキュメント](/guide/assets#webpack-で扱わない静的ファイル) を参照してください。

### store ディレクトリ

`store` ディレクトリには [Vuex ストア](http://vuex.vuejs.org) のファイルを入れます。The Vuex Store comes with Nuxt.js out of the box but is disabled by default. Creating an `index.js` file in this directory enables the store.

_This directory cannot be renamed without extra configuration._

ストアの取り扱いについてより深く理解するには [ストアに関するドキュメント](/guide/vuex-store) を参照してください。

### nuxt.config.js ファイル

`nuxt.config.js` ファイルには Nuxt.js のカスタム設定を記述します。

_This directory cannot be renamed without extra configuration._

nuxt.config.js についてより深く理解するには [nuxt.config.js に関するドキュメント](/guide/configuration) を参照してください。

### package.json ファイル

`package.json` ファイルにはアプリケーションが依存するパッケージやスクリプトを記述します。

_このファイル名は変更できません。_

## エイリアス（別名）

| エイリアス | ディレクトリ |
|-----|------|
| `~` or `@` | [srcDir](/api/configuration-srcdir) |
| `~~` or `@@` | [rootDir](/api/configuration-rootdir) |

デフォルトでは `srcDir` は `rootDir` と同じです。

<div class="Alert Alert--nuxt-green">

<b>情報:</b> `vue` テンプレート内で `assets` または `static` ディレクトリへのリンクが必要なときは `~/assets/your_image.png` や `~/static/your_image.png` などを使ってください。

</div>
