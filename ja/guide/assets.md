---
title: アセット
description: Nuxt.js はアセットファイルを配信するために（デフォルトでは）Webpack のローダーとして vue-loader、file-loader 及び url-loader を使います。しかし Webpack の取り扱う対象としない静的ファイル専用のディレクトリを使うこともできます。
---

> Nuxt.js はアセットファイルを配信するために（デフォルトでは）Webpack のローダーとして vue-loader、file-loader 及び url-loader を使います。しかし Webpack の取り扱う対象としない静的ファイル専用のディレクトリを使うこともできます。

## Webpack で取り扱う

デフォルトでは [vue-loader](http://vue-loader.vuejs.org/en/) は `css-loader` 及び `vue-template-compiler` を用いて、スタイルやテンプレートファイルを処理します。このコンパイル処理の中で、`<img src="...">` や `background: url(...)` や CSS `@import` などのすべての URL はモジュールの依存関係のように解決されます。

例えば、次のようなファイルがあるとします:

```bash
-| assets/
----| image.png
-| pages/
----| index.vue
```

CSS で `url('~assets/image.png')` と書いていたら、それは `require('~assets/image.png')` に変換されます。

あるいは `pages/index.vue` の中で下記のように書いていたとします:

```html
<template>
  <img src="~assets/image.png">
</template>
```

それは次のようにコンパイルされます:

```js
createElement('img', { attrs: { src: require('~assets/image.png') }})
```

PNG ファイル JavaScript ファイルではないため、Nuxt.js は Webpack が PNG ファイルを扱えるように [file-loader](https://github.com/webpack/file-loader) と [url-loader](https://github.com/webpack/url-loader) を使う設定を行います。

file-loader と url-loader の役割:

- `file-loader` はアセットファイルをどこにコピーし配置すべきか、また、ファイル名をどうすべきかを決定します。ファイル名は上手にキャッシュするためにバージョンのハッシュ値を含める等を行います。
- `url-loader` はもしファイルサイズが閾値よりも小さければ、ファイルの内容を Base64 エンコードして埋め込みます。こうすると小さなファイルを取得するための HTTP リクエストの数を減らすことができます。一方で、もしファイルサイズが閾値よりも大きければ、自動的に `file-loader` にフォールバックします。

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

ファイルサイズが 1KB を下回るファイルはすべて Base64 エンコードされて埋め込まれます。反対に 1KB を上回る画像やフォントは（`.nuxt` ディレクトリ配下の）対応するディレクトリにコピーされます。このときファイル名はうまくキャッシュさせるためにバージョンのハッシュ値を含んだものになります。

アプリケーションを `nuxt` コマンドで起動するとき、`pages/index.vue` 内のテンプレートは下記のようになっており:

```html
<template>
  <img src="~assets/image.png">
</template>
```

そこから次のように生成されます:

```html
<img src="/_nuxt/img/image.0c61159.png">
```

これらのローダーの設定を更新したり、ローダーを使わないようにするには、[ローダー設定](/api/configuration-build#loaders) を参照してください。

## Webpack で扱わない静的ファイル

Webpack で扱う対象となる `assets` ディレクトリを使いたくない場合は、プロジェクトのルートディレクトリに `static` ディレクトリを作成して利用することができます。

これらのファイルは自動的に Nuxt.js により配信され、またプロジェクトのルート URL からアクセス可能になります。

このオプションは `robots.txt` や `sitemap.xml`、`CNAME`（GitHub Pages などで使う）などのファイルの扱いに役立ちます。

`/` URL からそれらのファイルを参照できます:

```html

<img src="/my-image.png"/>

<img src="/assets/my-image-2.png"/>
```
