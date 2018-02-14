---
title: 'API: Properti router'
description: Properti router memungkinkan Anda menyesuaikan router Nuxt.js.
---

# Properti router

> Properti router memungkinkan Anda menyesuaikan router Nuxt.js ([vue-router](https://router.vuejs.org/en/)).

## base

- Tipe: `String`
- Default: `'/'`

URL `base` pada aplikasi. Misalnya, jika seluruh aplikasi satu halaman disajikan di bawah `/app/`, maka `base` harus menggunakan nilai `'/app/'`.

Contoh (`nuxt.config.js`):

```js
module.exports = {
  router: {
    base: '/app/'
  }
}
```

<p class="Alert Alert-blue">Ketika `base` di-set, Nuxt.js juga akan menambahkan dalam header dokumen `<base href="%7B%7B%20router.base%20%7D%7D">`.</p>

> Pilihan ini diberikan langsung ke vue-router [Router constructor](https://router.vuejs.org/en/api/options.html).

## extendRoutes

- Tipe: `Function`

Anda mungkin ingin mengembangkan rute yang dibuat oleh Nuxt.js. Anda bisa melakukannya melalui opsi `extendRoutes`.

Contoh menambahkan rute khusus:

`nuxt.config.js`

```js
module.exports = {
  router: {
    extendRoutes (routes, resolve) {
      routes.push({
        name: 'custom',
        path: '*',
        component: resolve(__dirname, 'pages/404.vue')
      })
    }
  }
}
```

Skema rute harus mematuhi skema [vue-router](https://router.vuejs.org/en/).

## linkActiveClass

- Tipe: `String`
- Default: `'nuxt-link-active'`

Secara global mengkonfigurasikan [`<nuxt-link>`](/api/components-nuxt-link) kelas aktif default.

Contoh (`nuxt.config.js`):

```js
module.exports = {
  router: {
    linkActiveClass: 'active-link'
  }
}
```

> Pilihan ini diberikan langsung ke [vue-router Router constructor](https://router.vuejs.org/en/api/options.html).

## linkExactActiveClass

- Tipe: `String`
- Default: `'nuxt-link-exact-active'`

Secara global mengkonfigurasikan [`<nuxt-link>`](/api/components-nuxt-link) kelas aktif default yang sebenarnya.

Contoh (`nuxt.config.js`):

```js
module.exports = {
  router: {
    linkExactActiveClass: 'exact-active-link'
  }
}
```

> Pilihan ini diberikan langsung ke [vue-router Router constructor](https://router.vuejs.org/en/api/options.html).

## middleware

- Tipe: `String` atau `Array`
    - Items: `String`

Menetapkan middleware default untuk setiap halaman aplikasi.

Contoh:

`nuxt.config.js`

```js
module.exports = {
  router: {
    // Jalankan middleware/user-agent.js pada setiap halaman
    middleware: 'user-agent'
  }
}
```

`middleware/user-agent.js`

```js
export default function (context) {
  // Tambah properti userAgent dalam konteks (tersedia dalam `data` dan `fetch`)
  context.userAgent = context.isServer ? context.req.headers['user-agent'] : navigator.userAgent
}
```

Untuk mempelajari lebih lanjut tentang middleware, lihat [panduan middleware](/guide/routing#middleware).

## mode

- Tipe: `String`
- Default: `'history'`

Mengkonfigurasi mode router, ini tidak disarankan untuk diubah karena berkaitan dengan `rendering` sisi-server (SSR).

Contoh (`nuxt.config.js`):

```js
module.exports = {
  router: {
    mode: 'hash'
  }
}
```

> Pilihan ini diberikan langsung ke vue-router [Router constructor](https://router.vuejs.org/en/api/options.html).

## scrollBehavior

- Tipe: `Function`

Pilihan `scrollBehavior` memungkinkan Anda menentukan perilaku khusus untuk posisi gulir (scroll position) di antara rute. Metode ini dipanggil setiap kali sebuah halaman di-render.

Secara default, pilihan scrollBehavior diatur ke:

```js
const scrollBehavior = function (to, from, savedPosition) {
  // Jika posisi yang dikembalikan itu salah atau objek kosong,
  // akan tetap pada posisi gulir yang sekarang.
  let position = false

  // Jika tidak ada `children` terdeteksi
  if (to.matched.length < 2) {
    // gulir ke paling atas
    position = { x: 0, y: 0 }
  } else if (to.matched.some((r) => r.components.default.options.scrollToTop)) {
    // Jika salah satu `children` mempunyai opsi scrollTop yang di-set true
    position = { x: 0, y: 0 }
  }

  // savedPosition hanya tersedia untuk navigasi popstate (tombol kembali)
  if (savedPosition) {
    position = savedPosition
  }

  return new Promise(resolve => {
    // menunggu transisi keluar selesai (jika perlu)
    window.$nuxt.$once('triggerScroll', () => {
      // coords akan digunakan jika tidak ada selector yang tersedia,
      // atau jika selector tidak cocok dengan elemen mana pun.
      if (to.hash && document.querySelector(to.hash)) {
        // gulir ke `anchor` dengan mengembalikan selector
        position = { selector: to.hash }
      }
      resolve(position)
    })
  })
}
```

Contoh memaksa posisi gulir (scroll position) ke atas untuk setiap rute:

`nuxt.config.js`

```js
module.exports = {
  router: {
    scrollBehavior: function (to, from, savedPosition) {
      return { x: 0, y: 0 }
    }
  }
}
```

> Pilihan ini diberikan langsung ke vue-router [Router constructor](https://router.vuejs.org/en/api/options.html).
