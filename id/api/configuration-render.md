---
title: 'API: Properti render'
description: Nuxt.js memungkinkan Anda menyesuaikan opsi runtime untuk me-render halaman
---

# The render Property

> Nuxt.js memungkinkan Anda menyesuaikan opsi runtime untuk me-render halaman

## bundleRenderer

- Type: `object`

> Use this option to customize vue SSR bundle renderer. This option is skipped for spa mode.

```js
module.exports = {
  render: {
    bundleRenderer: {
      directives: {
        custom1: function (el, dir) {
          // something ...
        }
      }
    }
  }
}
```

Learn more about available options on [Vue SSR API Reference](https://ssr.vuejs.org/en/api.html#renderer-options).
It is recommended to not use this option as Nuxt.js is already providing best SSR defaults and misconfiguration might lead to SSR problems.

## etag

- Type: `object`
    - Default: `{ weak: true }`

To disable etag for pages set `etag: false`

See [etag](https://www.npmjs.com/package/etag) docs for possible options.

### gzip

- Type `object`
    - Default: `{ threshold: 0 }`

See [compression](https://www.npmjs.com/package/compression) docs for possible options.

### http2

- Type `object`
    - Default: `{ push: false }`

Activate HTTP2 push headers.

## resourceHints

- Type: `boolean`
    - Default: `true`

> Adds `prefetch` and `preload` links for faster initial page load time.

You may want to only disable this option if have many pages and routes.

## ssr

- Type: `boolean`
    - Default: `true` pada mode universal dan `false` pada mode spa

> Enable SSR rendering

Pilihan ini diatur secara otomatis berdasarkan nilai `mode` jika tidak ditentukan. Ini bisa berguna untuk mengaktifkan/menonaktifkan SSR secara dinamis pada saat runtime setelah build image. (Dengan docker misalnya)

## static

- Type: `object`
    - Default: `{}`

See [serve-static](https://www.npmjs.com/package/serve-static) docs for possible options.
