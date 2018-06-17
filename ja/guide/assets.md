---
title: アセット
description: デフォルトでは、Nuxt は vue-loader、file-loader、url-loader webpack ローダーを使用して、強力なアセットを提供します。
  静的アセットには静的ディレクトリを使用することもできます。
---

> デフォルトでは、Nuxt は vue-loader、file-loader、url-loader webpack ローダーを使用して、強力なアセットを提供します。 静的アセットには静的ディレクトリを使用することもできます。

## Webpack で取り扱う

デフォルトでは [vue-loader](http://vue-loader.vuejs.org/en/) は css-loader および vue-template-compiler を用いて、スタイルやテンプレートファイルを処理します。このコンパイル処理の中で、`<img src="...">` や `background: url(...)` や CSS `@import` などのすべての URL はモジュールの依存関係のように解決されます。

例えば、次のようなファイルがあるとします:

```bash
-| assets/
----| image.png
-| pages/
----| index.vue
```

CSS で `url('~/assets/image.png')` と書いていたら、それは `require('~/assets/image.png')` に変換されます。

あるいは `pages/index.vue` の中で下記のように書いていたとします:

```html
<template>
  <img src="~/assets/image.png">
</template>
```

それは次のようにコンパイルされます:

```js
createElement('img', { attrs: { src: require('~/assets/image.png') }})
```

`.png` は JavaScript ファイルではないため、Nuxt.js は Webpack が PNG ファイルを扱えるように [file-loader](https://github.com/webpack/file-loader) と [url-loader](https://github.com/webpack/url-loader) を使う設定を行います。

file-loader と url-loader を使用する利点:

- `file-loader` はアセットファイルをどこにコピーし配置すべきか、また、ファイル名をどうすべきかを決定します。ファイル名は上手にキャッシュするためにバージョンのハッシュ値を含める等を行います。
- `url-loader` はもしファイルサイズが閾値よりも小さければ、ファイルの内容を Base64 エンコードして埋め込みます。こうすると小さなファイルを取得するための HTTP リクエストの数を減らすことができます。一方で、もしファイルサイズが閾値よりも大きければ、自動的に `file-loader` にフォールバックします。

実際には Nuxt.js のデフォルトのローダー設定は次のようになっています:

```js
[
  {
    test: /\.(png|jpe?g|gif|svg)$/,
    loader: 'url-loader',
    query: {
      limit: 1000, // 1kB
      name: 'img/[name].[hash:7].[ext]'
    }
  },
  {
    test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
    loader: 'url-loader',
    query: {
      limit: 1000, // 1kB
      name: 'fonts/[name].[hash:7].[ext]'
    }
  }
]
```

つまり、1 KB 未満のすべてのファイルは Base64 データ URL としてインライン化されます。 それ以外の場合、画像/フォントは、対応するフォルダ（`.nuxt` ディレクトリ下）にコピーされ、より良いキャッシュのためにバージョンハッシュを含む名前が付けられます。

アプリケーションを `nuxt` コマンドで起動するとき、`pages/index.vue` 内のテンプレートは下記のようになっており:

```html
<template>
  <img src="~/assets/image.png">
</template>
```

そこから次のように生成されます:

```html
<img src="/_nuxt/img/image.0c61159.png">
```

これらのローダーの設定を更新したり、ローダーを使わないようにするには、[ローダー設定](/api/configuration-build#loaders) を参照してください。

## Webpack で扱わない静的ファイル

Webpack で扱う対象となる `assets` ディレクトリを使いたくない場合は、プロジェクトのルートディレクトリに `static` ディレクトリを作成して利用することができます。

これらのファイルは Nuxt によって自動的に提供され、プロジェクトのルートURLからアクセスできます。

このオプションは `robots.txt` や `sitemap.xml`、`CNAME`（GitHub Pages などで使う）などのファイルの扱いに役立ちます。

`/` URL からそれらのファイルを参照できます:

```html
<!-- static ディレクトリの（Webpack で扱わない）静的な画像 -->
<img src="/my-image.png"/>

<!-- assets ディレクトリの Webpack で扱われた画像 -->
<img src="~/assets/my-image-2.png"/>
```
