---
title: 'API: Properti head'
description: Anda bisa menentukan semua meta default untuk aplikasi Nuxt.js Anda di
  dalam nuxt.config.js.
---

# Properti head

> Anda bisa menentukan semua meta default untuk aplikasi Nuxt.js Anda di dalam `nuxt.config.js`, gunakan properti `head` yang sama:

- Type: `Object`

```js
module.exports = {
  head: {
    titleTemplate: '%s - Nuxt.js',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Meta description' }
    ]
  }
}
```

Untuk mengetahui daftar pilihan yang dapat Anda berikan pada `head`, lihat [dokumentasi vue-meta](https://github.com/declandewet/vue-meta#recognized-metainfo-properties).

<p class="Alert Alert--teal"><b>INFO:</b> Anda juga dapat menggunakan `head` di komponen halaman dan mengakses data komponen melalui `this`, lihat [component head property](/api/pages-head).</p>
