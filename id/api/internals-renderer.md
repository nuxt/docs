---
title: 'API: Kelas Renderer'
description: Kelas Renderer Nuxt
---

# Kelas Renderer

- Sumber: **[core/renderer.js](https://github.com/nuxt/nuxt.js/tree/dev/packages/core/src/renderer.js)**

Kelas ini mengekspor middleware koneksi yang menangani dan menyajikan semua permintaan SSR dan aset.

## Plugin yang dapat ditukar (Tapable plugins)

Kita bisa mendaftarkan kait (hooks) pada peristiwa siklus hidup (life cycle) tertentu.

```js
nuxt.plugin('renderer', renderer => {
    renderer.plugin('setupMiddleware', app => {
        // ...
    })
})
```

Plugin | Argumen | Keterangan
--- | --- | ---
`ready` | renderer | SSR Middleware dan semua sumbernya sudah siap
`setupMiddleware` | sambungkan instansi (app) | Sebelum Nuxt menambahkan tumpukan middleware itu. Kita bisa menggunakannya untuk mendaftarkan middleware sisi-server kustom
