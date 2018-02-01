---
title: 'API: The css Property'
description: Nuxt.js memungkinkan Anda menentukan file/modules/libraries CSS yang
  ingin Anda atur secara global (disertakan pada setiap halaman).
---

# The css Property

> Nuxt.js memungkinkan Anda menentukan file/modules/libraries CSS yang ingin Anda atur secara global (disertakan pada setiap halaman).

Jika Anda ingin menggunakan `sass` pastikan Anda telah menginstal paket `node-sass` dan `sass-loader`. Jika belum, instal saja:

```sh
npm install --save-dev node-sass sass-loader
```

- Type: `Array`
- Items: `String`

In `nuxt.config.js`, add the CSS resources:

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

Nuxt.js will automatically guess the file type by it's extension and use the appropriate pre-processor loader for webpack. You will still need to install the required loader if you need to use them.
