---
title: アセット
description: デフォルトでは、Nuxt は vue-loader、file-loader、url-loader webpack ローダーを使用して、強力なアセットを提供します。静的アセットには静的ディレクトリを使用することもできます。
---

> By default, Nuxt uses vue-loader, file-loader and url-loader webpack loaders for strong assets serving. You can also use the `static` directory for static assets.

## Webpack

[vue-loader](http://vue-loader.vuejs.org/) automatically processes your style and template files with `css-loader` and the Vue template compiler out of the box.
In this compilation process, all asset URLs such as `<img src="...">`, `background: url(...)` and CSS `@import` are resolved as module dependencies.

例えば、次のようなファイル構成があるとします:

```bash
-| assets/
----| image.png
-| pages/
----| index.vue
```

If you use `url('~assets/image.png')` in your CSS, it will be *translated* into `require('~/assets/image.png')`.

<div class="Alert Alert--orange">

**Warning:** Starting from Nuxt 2.0 the `~/` alias won't be resolved correctly in your CSS files.
You must use `~assets` (without a slash) or the `@` alias in `url` CSS references, i.e. `background: url("~assets/banner.svg")`

</div>


Or if you reference that image in your `pages/index.vue`:

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

The benefits of these loaders are:

- `file-loader` lets you designate where to copy and place the asset file, and how to name it using version hashes for better caching. In production, you will benefit from long-term caching by default!
- `url-loader` allows you to conditionally inline a file as base-64 data URL if they are smaller than a given threshold. This can reduce a number of HTTP requests for trivial files. If the file is larger than the threshold, it automatically falls back to file-loader.

For those two loaders, the default configuration is:

```js
// https://github.com/nuxt/nuxt.js/blob/dev/packages/webpack/src/config/base.js#L297-L316
[
  {
    test: /\.(png|jpe?g|gif|svg|webp)$/,
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

Which means that every file below 1 KB will be inlined as base-64 data URL.
Otherwise, the image/font will be copied in its corresponding folder (under the `.nuxt` directory)
with a name containing a version hash for better caching.

アプリケーションを `nuxt` コマンドで起動するとき、`pages/index.vue` 内のテンプレートは下記のようになっており:

```html
<template>
  <img src="~/assets/image.png">
</template>
```

Will be transformed into:

```html
<img src="/_nuxt/img/image.0c61159.png">
```

If you want to change the loader configurations, please use [build.extend](/api/configuration-build#extend).


## Static

If you don't want to use Webpack assets from the `assets` directory, you can create and use the `static` directory (in your project root folder).

All included files will be automatically served by Nuxt and are accessible through your project root URL. (`static/favicon.ico` will be available at `localhost:3000/favicon.ico`)

このオプションは `robots.txt` や `sitemap.xml`、`CNAME`（GitHub Pages などで使う）などのファイルの扱いに役立ちます。

In your code, you can then reference these files relative to the root (`/`):

```html
<!-- 静的ディレクトリにある静的イメージ  -->
<img src="/my-image.png"/>

<!-- assets ディレクトリにある webpack されたイメージ -->
<img src="~/assets/my-image-2.png"/>
```
