---
title: Assets
description: Nuxt uses vue-loader, file-loader and url-loader for Webpack by default for strong assets serving, but you can also use Static directory for static assets.
---

> Nuxt uses vue-loader, file-loader and url-loader for Webpack by default for strong assets serving, but you can also use Static directory for static assets.

## Webpacked

By default, [vue-loader](http://vue-loader.vuejs.org/en/) automatically processes your style and template files with `css-loader` and the Vue template compiler. In this compilation process, all asset URLs such as `<img src="...">`, `background: url(...)` and CSS `@import` are resolved as module dependencies.

For example, we have this file tree:

```bash
-| assets/
----| image.png
-| pages/
----| index.vue
```

In my CSS, if I use `url('~/assets/image.png')`, it will be translated into `require('~/assets/image.png')`.

Or if in my `pages/index.vue`, I use:
```html
<template>
  <img src="~/assets/image.png">
</template>
```

It will be compiled into:

```js
createElement('img', { attrs: { src: require('~/assets/image.png') }})
```

Because `.png` is not a JavaScript file, nuxt.js configures Webpack to use [file-loader](https://github.com/webpack/file-loader) and [url-loader](https://github.com/webpack/url-loader) to handle them for you.

The benefits of them are:
- `file-loader` lets you designate where to copy and place the asset file, and how to name it using version hashes for better caching.
- `url-loader` allows you to conditionally inline a file as base-64 data URL if they are smaller than a given threshold. This can reduce a number of HTTP requests for trivial files. If the file is larger than the threshold, it automatically falls back to `file-loader`.

Actually, Nuxt.js default assets loaders configuration is:

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

Which means that every file below 1 KO will be inlined as base-64 data URL. Otherwise, the image/font will be copied in its corresponding folder (under the `.nuxt` directory) with a name containing a version hashes for better caching.

When launching our application with `nuxt`, our template in `pages/index.vue`:

```html
<template>
  <img src="~/assets/image.png">
</template>
```

Will be generated into:
```html
<img src="/_nuxt/img/image.0c61159.png">
```

If you want to update these loaders or disable them, please use [build.extend](/api/configuration-build#extend).

## Static

If you don't want to use Webpacked Assets from the `assets` directory, you can create and use the `static` directory in your project root directory.

These files will be automatically serve by Nuxt and accessible in your project root URL.

This option is helpful for files like `robots.txt`, `sitemap.xml` or `CNAME` (for like GitHub Pages).

From your code you can then reference those files with `/` URLs:

```html
<!-- Static image from static directory -->
<img src="/my-image.png"/>
~
<!-- Webpacked image from assets directory -->
<img src="~/assets/my-image-2.png"/>
```
