---
title: アセット
description: Nuxt.js はアセットファイルを配信するために（デフォルトでは）Webpack のローダーとして vue-loader、file-loader 及び url-loader を使います。しかし Webpack の取り扱う対象としない静的ファイル専用のディレクトリを使うこともできます。
---

<!-- title: Assets -->
<!-- description: Nuxt uses vue-loader, file-loader and url-loader for Webpack by default for strong assets serving, but you can also use Static directory for static assets. -->

<!-- \> Nuxt uses vue-loader, file-loader and url-loader for Webpack by default for strong assets serving, but you can also use Static directory for static assets. -->

> Nuxt.js はアセットファイルを配信するために（デフォルトでは）Webpack のローダーとして vue-loader、file-loader 及び url-loader を使います。しかし Webpack の取り扱う対象としない静的ファイル専用のディレクトリを使うこともできます。

<!-- ## Webpacked -->

## Webpack で取り扱う

<!-- By default, [vue-loader](http://vue-loader.vuejs.org/en/) automatically processes your style and template files with `css-loader` and the Vue template compiler. In this compilation process, all asset URLs such as `<img src="...">`, `background: url(...)` and CSS `@import` are resolved as module dependencies. -->

デフォルトでは [vue-loader](http://vue-loader.vuejs.org/en/) は `css-loader` 及び Vue テンプレートコンパイラを用いて、スタイルやテンプレートファイルを処理します。このコンパイル処理の中で、`<img src="...">` や `background: url(...)` や CSS `@import` などのすべての URL はモジュールの依存関係のように解決されます。

<!-- For example, we have this file tree: -->

例えば、このようなファイルがあるとします:

```bash
-| assets/
----| image.png
-| pages/
----| index.vue
```

<!-- In my CSS, if I use `url('~assets/image.png')`, it will be translated into `require('~assets/image.png')`. -->

CSS で `url('~assets/image.png')` と書いていたら、それは `require('~assets/image.png')` に変換されます。

<!-- Or if in my `pages/index.vue`, I use: -->

あるいは `pages/index.vue` の中で下記のように書いていたとします:

```html
<template>
  <img src="~assets/image.png">
</template>
```

<!-- It will be compiled into: -->

それは次のようにコンパイルされます:

```js
createElement('img', { attrs: { src: require('~assets/image.png') }})
```

<!-- Because `.png` is not a JavaScript file, nuxt.js configures Webpack to use [file-loader](https://github.com/webpack/file-loader) and [url-loader](https://github.com/webpack/url-loader) to handle them for you. -->

PNG ファイル JavaScript ファイルではないため、Nuxt.js は Webpack が PNG ファイルを扱えるように [file-loader](https://github.com/webpack/file-loader) と [url-loader](https://github.com/webpack/url-loader) を使う設定を行います。

<!-- The benefits of them are: -->

file-loader と url-loader の役割:

<!-- - `file-loader` lets you designate where to copy and place the asset file, and how to name it using version hashes for better caching. -->
<!-- - `url-loader` allows you to conditionally inline a file as base-64 data URL if they are smaller than a given threshold. This can reduce a number of HTTP requests for trivial files. If the file is larger than the threshold, it automatically falls back to `file-loader`. -->

- `file-loader` はアセットファイルをどこにコピーし配置すべきか、また、ファイル名をどうすべきかを決定します。ファイル名は上手にキャッシュするためにバージョンのハッシュ値を含める等を行います。
- `url-loader` はもしファイルサイズが閾値よりも小さければ、ファイルの内容を Base64 エンコードして埋め込みます。こうすると小さなファイルを取得するための HTTP リクエストの数を減らすことができます。一方で、もしファイルサイズが閾値よりも大きければ、自動的に `file-loader` にフォールバックします。

<!-- Actually, Nuxt.js default loaders configuration is: -->

実際には Nuxt.js のデフォルトのローダー設定は次のようになっています:

```js
[
  {
    test: /\.(png|jpe?g|gif|svg)$/,
    loader: 'url-loader',
    query: {
      limit: 1000, // 1KO
      name: 'img/[name].[hash:7].[ext]'
    }
  },
  {
    test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
    loader: 'url-loader',
    query: {
      limit: 1000, // 1 KO
      name: 'fonts/[name].[hash:7].[ext]'
    }
  }
]
```

<!-- Which means that every file below 1 KO will be inlined as base-64 data URL. Otherwise, the image/font will be copied in its corresponding folder (under the `.nuxt` directory) with a name containing a version hashes for better caching. -->

ファイルサイズが 1KB を下回るファイルはすべて Base64 エンコードされて埋め込まれます。反対に 1KB を上回る画像やフォントは（`.nuxt` ディレクトリ配下の）対応するディレクトリにコピーされます。このときファイル名はうまくキャッシュさせるためにバージョンのハッシュ値を含んだものになります。

<!-- When launching our application with `nuxt`, our template in `pages/index.vue`: -->

アプリケーションを `nuxt` コマンドで起動するとき、`pages/index.vue` 内のテンプレートは下記のようになっており:

```html
<template>
  <img src="~assets/image.png">
</template>
```

<!-- Will be generated into: -->

そこから次のように生成されます:

```html
<img src="/_nuxt/img/image.0c61159.png">
```

<!-- If you want to update these loaders or disable them, please take a look at the [loaders configuration](/api/configuration-build#loaders). -->

これらのローダーの設定を更新したり、ローダーを使わないようにするには、[ローダー設定](/api/configuration-build#loaders) を参照してください。

<!-- ## Static -->

## Webpack で扱わない静的ファイル

<!-- If you don't want to use Webpacked Assets from the `assets` directory, you can create and use the `static` directory in your project root directory. -->

もし Webpack で扱う対象となる `assets` ディレクトリを使いたくない場合は、プロジェクトのルートディレクトリに `static` ディレクトリを作成して利用することができます。

<!-- These files will be automatically serve by Nuxt and accessible in your project root URL. -->

これらのファイルは自動的に Nuxt.js により配信され、またプロジェクトのルート URL からアクセス可能になります。

<!-- This option is helpful for files like `robots.txt` or `sitemap.xml`. -->

このオプションは `robots.txt` や `sitemap.xml` などのファイルに役に立ちます。

<!-- From your code you can then reference those files with `/` URLs: -->

`/` URL からそれらのファイルを参照できます:

<!-- ```html -->
<!-- <\!-- Static image from static directory -\-> -->
<!-- <img src="/my-image.png"/> -->

<!-- <\!-- Webpacked image from assets directory -\-> -->
<!-- <img src="/assets/my-image-2.png"/> -->
<!-- ``` -->

```html
<!-- static ディレクトリの静的な画像 -->
<img src="/my-image.png"/>

<!-- Webpack が扱う対象となる assets ディレクトリの画像 -->
<img src="/assets/my-image-2.png"/>
```
