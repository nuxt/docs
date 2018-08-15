---
title: Assets
description: By default, Nuxt uses vue-loader, file-loader and url-loader webpack loaders for strong assets serving. You can also use Static directory for static assets.
---

> By default, Nuxt uses vue-loader, file-loader and url-loader webpack loaders for strong assets serving. You can also use Static directory for static assets.

## webpacked

By default, [vue-loader](http://vue-loader.vuejs.org/) automatically processes your style and template files with css-loader and the Vue template compiler. In this compilation process, all asset URLs such as `<img src="...">`, `background: url(...)` and CSS `@import` are resolved as module dependencies.

For example, we have this file tree:

```bash
-| assets/
----| image.png
-| pages/
----| index.vue
```

In your CSS, if you use `url('~/assets/image.png')`, it will be translated into `require('~/assets/image.png')`.

Or if in your `pages/index.vue` you use:

```html
<template>
  <img src="~/assets/image.png">
</template>
```

It will be compiled into:

```js
createElement('img', { attrs: { src: require('~/assets/image.png') }})
```

Because `.png` is not a JavaScript file, Nuxt.js configures webpack to use [file-loader](https://github.com/webpack/file-loader) and [url-loader](https://github.com/webpack/url-loader) to handle them for you.

The benefits of using file-loader and url-loader are:

- file-loader lets you designate where to copy and place the asset file, and how to name it using version hashes for better caching.
- url-loader allows you to conditionally inline a file as base-64 data URL if they are smaller than a given threshold. This can reduce a number of HTTP requests for trivial files. If the file is larger than the threshold, it automatically falls back to file-loader.

Actually, Nuxt.js default assets loaders configuration is:

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

Which means that every file below 1 KB will be inlined as base-64 data URL. Otherwise, the image/font will be copied in its corresponding folder (under the `.nuxt` directory) with a name containing a version hashes for better caching.

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

If you don't want to use webpacked Assets from the `assets` directory, you can create and use the `static` directory in your project root directory.

These files will be automatically served by Nuxt and accessible in your project root URL.

This option is helpful for files like `robots.txt`, `sitemap.xml` or `CNAME` (for like GitHub Pages).

From your code you can then reference those files with `/` URLs:

```html
<!-- Static image from static directory -->
<img src="/my-image.png"/>

<!-- webpacked image from assets directory -->
<img src="~/assets/my-image-2.png"/>
```
