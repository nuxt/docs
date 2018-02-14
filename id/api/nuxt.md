---
title: 'API: Nuxt(pilihan)'
description: You can use Nuxt.js programmatically to use it as a middleware giving
  you the freedom of creating your own server for rendering your web applications.
---

# Using Nuxt.js Programmatically

You might want to use your own server with your middleware and your API. That's why you can use Nuxt.js programmatically.

Anda bisa require Nuxt.js seperti ini:

```js
const { Nuxt, Builder } = require('nuxt')
```

## Konstruktor Nuxt

Untuk melihat daftar pilihan yang dapat diberikan ke Nuxt.js, lihat bagian konfigurasi.

```js
// Require modul `Nuxt` dan `Builder`
const { Nuxt, Builder } = require('nuxt')

// Require konfig Nuxt
const config = require('./nuxt.config.js')

// Membuat sebuah instance Nuxt baru
const nuxt = new Nuxt(config)

// Mengaktifkan pembangunan langsung (live build) & pemuatan ulang (reloading) di dev
if (nuxt.options.dev) {
  new Builder(nuxt).build()
}

// Kita dapat menggunakan `nuxt.render(req, res)` atau `nuxt.renderRoute(route, context)`
```

Anda dapat melihat/menggunakan [nuxt-express](https://github.com/nuxt/express) dan [adonuxt](https://github.com/nuxt/adonuxt) untuk memulai dengan cepat.

### Debug log

If you want to display nuxt.js logs, you can add to the top of your file:

```js
process.env.DEBUG = 'nuxt:*'
```
