---
title: ディレクトリ構造
description: デフォルトの Nuxt.js アプリケーションの構造は、小規模のアプリケーションと大規模のアプリケーションのどちらにも適しています。
---

<!-- title: Directory Structure -->
<!-- description: The default Nuxt.js application structure is intended to provide a great starting point for both large and small applications. -->

<!-- \> The default Nuxt.js application structure is intended to provide a great starting point for both small and large applications. Of course, you are free to organize your application however you like. -->

> デフォルトの Nuxt.js アプリケーションの構造は、小規模のアプリケーションと大規模のアプリケーションのどちらにも適しています。もちろん、好きなように構成することもできます。

<!-- ## Directories -->

## ディレクトリ

<!-- ### The Assets Directory -->

### assets ディレクトリ

<!-- The `assets` directory contains your un-compiled assets such as LESS, SASS, or JavaScript. -->

`assets` ディレクトリには LESS や SASS、JavaScript のようなコンパイルされていないファイルを入れます。

<!-- [More documentation about Assets integration](/guide/assets) -->

アセットの取り扱いについてより深く理解するには [アセットに関するドキュメント](/guide/assets) を参照してください。

<!-- ### The Components Directory -->

### components ディレクトリ

<!-- The `components` directory contains your Vue.js Components. Nuxt.js doesn't supercharge the data method on these components. -->

`components` ディレクトリには Vue.js のコンポーネントファイルを入れます。Nuxt.js は `components` ディレクトリ内のコンポーネントの data メソッドについては手を加えません。

<!-- ### The Layouts Directory -->

### layouts ディレクトリ

<!-- The `layouts` directory contains your Application Layouts. -->

`layouts` ディレクトリにはアプリケーションのレイアウトファイルを入れます。

<!-- _This directory can not be renamed._ -->

_このディレクトリ名は変更できません。_

<!-- [More documentation about Layouts integration](/guide/views#layouts) -->

レイアウトの取り扱いついてより深く理解するには [レイアウトに関するドキュメント](/guide/views#レイアウト) を参照してください。

<!-- ### The Middleware Directory -->

### middleware ディレクトリ

_Coming soon_

<!-- ### The Pages Directory -->

### pages ディレクトリ

<!-- The `pages` directory contains your Application Views and Routes. The framework reads all the `.vue` files inside this directory and create the router of your application. -->

`pages` ディレクトリにはアプリケーションのビュー及びルーティングファイルを入れます。Nuxt.js フレームワークはこのディレクトリ内のすべての `.vue` ファイルを読み込み、アプリケーションのルーターを作成します。

<!-- _This directory can not be renamed._ -->

_このディレクトリ名は変更できません。_

<!-- [More documentation about Pages integration](/guide/views) -->

ページの取り扱いについてより深く理解するには [ページに関するドキュメント](/guide/views) を参照してください。

<!-- ### The Plugins Directory -->

### plugins ディレクトリ

<!-- The `plugins` directory contains your Javascript plugins that you want to run before instantiating the root vue.js application. -->

`plugins` ディレクトリには、ルートの vue.js アプリケーションをインスタンス化する前に実行したい Javascript プラグインを入れます。

<!-- [More documentation about Plugins integration](/guide/plugins) -->

プラグインについてより深く理解するには [プラグインに関するドキュメント](/guide/plugins) を参照してください。

<!-- ### The Static Directory -->

### static ディレクトリ

<!-- The `static` directory contains your static files. Each files inside this directory is mapped to /. -->

`static` ディレクトリには静的なファイルを入れます。このディレクトリ内のファイルはいずれも `/` に配置されます。

<!-- **Example:** /static/robots.txt is mapped as /robots.txt -->

**例:** /static/robots.txt は /robots.txt に配置されます。

<!-- _This directory can not be renamed._ -->

_このディレクトリ名は変更できません。_

<!-- [More documentation about Static integration](/guide/assets#static) -->

静的なファイルの取り扱いについてより深く理解するには [静的なファイルに関するドキュメント](/guide/assets#webpack-で扱わない静的ファイル) を参照してください。

<!-- ### The Store Directory -->

### store ディレクトリ

<!-- The `store` directory contains your [Vuex Store](http://vuex.vuejs.org) files. Vuex Store option is implemented in the Nuxt.js framework. Creating a `index.js` file in this directory activate the option in the framework automatically. -->

`store` ディレクトリには [Vuex ストア](http://vuex.vuejs.org) のファイルを入れます。Vuex ストアは Nuxt.js フレームワークではオプションとして実装されています。このディレクトリ内に `index.js` ファイルを作成すると、Nuxt.js フレームワーク内でこのオプションが自動的に有効になります。

<!-- _This directory can not be renamed._ -->

_このディレクトリ名は変更できません。_

<!-- [More documentation about Store integration](/guide/vuex-store) -->

ストアの取り扱いについてより深く理解するには [ストアに関するドキュメント](/guide/vuex-store) を参照してください。

<!-- ### The nuxt.config.js File -->

### nuxt.config.js ファイル

<!-- The `nuxt.config.js` file contains your Nuxt.js custom configuration. -->

`nuxt.config.js` ファイルには Nuxt.js のカスタム設定を記述します。

<!-- _This file can not be renamed._ -->

_このファイル名は変更できません。_

<!-- [More documentation about nuxt.config.js integration](/guide/configuration) -->

nuxt.config.js についてより深く理解するには [nuxt.config.js に関するドキュメント](/guide/configuration) を参照してください。

<!-- ### The package.json File -->

### package.json ファイル

<!-- The `package.json` file contains your Application dependencies and scripts. -->

`package.json` ファイルにはアプリケーションが依存するパッケージやスクリプトを記述します。

<!-- _This file can not be renamed._ -->

_このファイル名は変更できません。_

<!-- ## Aliases -->

## エイリアス（別名）

<!-- | Alias | Directory | -->
<!-- |-----|------| -->
<!-- | ~ | / | -->
<!-- | ~assets | /assets | -->
<!-- | ~components | /components | -->
<!-- | ~pages | /pages | -->
<!-- | ~plugins | /plugins | -->
<!-- | ~static | /static | -->

| エイリアス | ディレクトリ |
|-----|------|
| ~ | / |
| ~assets | /assets |
| ~components | /components |
| ~pages | /pages |
| ~plugins | /plugins |
| ~static | /static |

<!-- Aliases which link to files: -->

ファイルへリンクするエイリアス:

<!-- | Alias | Usage | Description | -->
<!-- |-------|------|--------------| -->
<!-- | ~store | `const store = require('~store')` | Import the `vuex` store instance. | -->
<!-- | ~router | `const router = require('~router')`| Import the `vue-router` instance. | -->

| エイリアス | 使い方 | 説明 |
|-------|------|--------------|
| ~store | `const store = require('~store')` | `vuex` ストアのインスタンスをインポートします |
| ~router | `const router = require('~router')`| `vue-router` のインスタンスをインポートします |
