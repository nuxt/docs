---
title: Assets
description: Nuxt is configured to use vue-loader, file-loader and url-loader with Webpack by default.
---

> Nuxt is configured to use vue-loader, file-loader and url-loader with Webpack by default.

Nuxt includes [vue-loader](http://vue-loader.vuejs.org/en/configurations/asset-url.html) **Asset URL Handling** by default.

For example, url(./image.png) will be translated into require('./image.png'), and

```html
<img src="../image.png">
```

will be compiled into:

```js
createElement('img', { attrs: { src: require('../image.png') }})
```

Nuxt has also configured Webpack to use [file-loader](https://github.com/webpack/file-loader) and [url-loader](https://github.com/webpack/url-loader) by default.

The benefits of all this are:
- `file-loader` allows you to designate where to copy and place the asset file, and how to name it using version hashes for better caching. Moreover, this also means **you can just place images next to your `*.vue` files and use relative paths based on the folder structure instead of worrying about deployment URLs**. With proper config, Webpack will auto-rewrite the file paths into correct URLs in the bundled output.
- `url-loader` allows you to conditionally inline a file as base-64 data URL if they are smaller than a given threshold. This can reduce the amount of HTTP requests for trivial files. If the file is larger than the threshold, it automatically falls back to `file-loader`.
