---
title: 'API: Properti css'
description: Nuxt.js memungkinkan Anda menentukan file/modul/librari CSS yang ingin
  Anda atur secara global (disertakan pada setiap halaman).
---

# Properti css

> Nuxt.js memungkinkan Anda menentukan file/modul/librari CSS yang ingin Anda atur secara global (disertakan pada setiap halaman).

Jika Anda ingin menggunakan `sass` pastikan Anda telah menginstal paket `node-sass` dan `sass-loader`. Jika belum, instal saja:

```sh
npm install --save-dev node-sass sass-loader
```

- Type: `Array`
- Items: `String`

Di dalam `nuxt.config.js`, tambahkan source CSS:

```js
module.exports = {
  css: [
    // Masukan node module secara langsung (di sini adalah file SASS)
    'bulma',
    // file CSS di dalam proyek
    '@/assets/css/main.css',
    // file SCSS di dalam proyek
    '@/assets/css/main.scss'
  ]
}
```

Nuxt.js akan secara otomatis membaca jenis file dengan ekstensi tersebut dan menggunakan pemroses pre-processor yang sesuai untuk webpack. Anda masih perlu menginstal loader yang diperlukan jika Anda perlu menggunakannya.
