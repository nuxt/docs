---
title: Caching Components
description: Bagaimana cara men-cache sebuah komponen?
---

# Bagaimana cara men-cache komponen-komponen Vue?

> Meskipun SSR di Vue cukup cepat, dalam hal performa masih kalah cepat jika dibandingkan dengan templat berbasis-string tulen, hal ini dikarenakan beban pembuatan instansi di komponen dan node DOM Virtual. Dalam kasus di mana performa SSR sangatlah penting, maka kita harus bijaksana dalam memanfaatkan strategi caching yang tepat agar mampu meningkatkan waktu respon dan mengurangi beban yang terjadi di server.

Untuk menghindari boilerplate, gunakan [modul Component Cache](https://github.com/nuxt-community/modules/tree/master/packages/component-cache) untuk Nuxt.js. Modul ini menggunakan vue-server-renderer untuk menambahkan dukungan cache LRU pada komponen Vue.

## Usage

- Tambahkan `@nuxtjs/component-cache` menggunakan  `Yarn` atau `npm` di proyek Anda.
- Tambahkan `@nuxtjs/component-cache` ke bagian `modules` pada `nuxt.config.js`

```js
{
  modules: [
    // Simple usage
    '@nuxtjs/component-cache',

    // With options
    ['@nuxtjs/component-cache', {
      max: 10000,
      maxAge: 1000 * 60 * 60
    }],
  ]
}
```

See [component-level caching](http://ssr.vuejs.org/en/caching.html#component-level-caching) for more information.

## Don't forget, that

- Komponen yang bisa di-cache **harus didefinisikan dengan `name` yang unik**.
- Anda ***DILARANG*** menggunakan cache komponen, jika
    - Mempunyai "child-component" yang bergantung pada global state.
    - Mempunyai "child-component" yang menimbulkan efek samping ketika me-render `context`.
