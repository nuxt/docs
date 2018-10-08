---
title: アセット
description: デフォルトでは、Nuxt は vue-loader、file-loader、url-loader webpack ローダーを使用して、強力なアセットを提供します。静的アセットには静的ディレクトリを使用することもできます。
---

> デフォルトでは、Nuxt は vue-loader、file-loader、url-loader webpack ローダーを使用して、強力なアセットを提供します。 静的アセットには静的ディレクトリを使用することもできます。

## Webpack で取り扱う

デフォルトでは [vue-loader](http://vue-loader.vuejs.org/) は css-loader および vue-template-compiler を用いて、スタイルやテンプレートファイルを自動的に処理します。このコンパイル処理の中で、`<img src="...">` や `background: url(...)` や CSS `@import` などのすべてのアセット URL はモジュールの依存関係として解決されます。

例えば、次のようなファイル構成があるとします:

```bash
-| assets/
----| image.png
-| pages/
----| index.vue
```

CSS で `url('~assets/image.png')` と書いた場合、それは `require('~/assets/image.png')` に変換されます。

> css-loader のアップグレードにより、Nuxt 2.0 から CSS のデータ型 <url> では、`~assets`（スラッシュなし）を使わなければなりません。例：background: url("~assets/banner.svg")

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

`.png` は JavaScript ファイルではないため、Nuxt.js は [file-loader](https://github.com/webpack/file-loader) と [url-loader](https://github.com/webpack/url-loader) を使ってそれらを処理できるよう webpack を設定します。

file-loader と url-loader を使用する利点:

- `file-loader` は、アセットファイルをコピー・配置する場所と、キャッシュ改善のためにバージョンハッシュを用いてファイル名を指定することができます。
- `url-loader` は、指定した閾値よりも小さい場合に、Base64 データ URL として条件付きでファイルに埋め込むことができます。これにより、小さなファイル取得のための HTTP リクエスト数を減らすことができます。もし閾値よりも大きい場合は、file-loader に自動的にフォールバックします。

実際に、Nuxt.js のデフォルトアセットローダーの設定は次のようになっています:

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

これらのローダーの設定を更新したり、ローダーを使わないようにするには、[build.extend](/api/configuration-build#extend) を使用してください。

## Static

`assets` ディレクトリで webpack したくないアセットがある場合は、プロジェクトのルートディレクトリに `static` ディレクトリを作成して利用することができます。

これらのファイルは Nuxt によって自動的に提供され、プロジェクトのルートURLからアクセスできます。

このオプションは `robots.txt` や `sitemap.xml`、`CNAME`（GitHub Pages などで使う）などのファイルの扱いに役立ちます。

それらのファイルを `/` の URL で参照することができます:

```html
<!-- 静的ディレクトリにある静的イメージ  -->
<img src="/my-image.png"/>

<!-- assets ディレクトリにある webpack されたイメージ -->
<img src="~/assets/my-image-2.png"/>
```
