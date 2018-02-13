---
title: 'API: Kelas ModuleContainer'
description: Kelas ModuleContainer Nuxt
---

# Kelas ModuleContainer

- Sumber: **[core/module.js](https://github.com/nuxt/nuxt.js/blob/dev/lib/core/module.js)**

All [modules](/guide/modules) will be called within context of `ModuleContainer` instance.

## Tapable plugins

We can register hooks on certain life cycle events.

```js
nuxt.moduleContainer.plugin('ready', async moduleContainer => {
    // Lakukan hal ini setelah semua modul siap
})
```

Inside [modules](/guide/modules) context we can use this instead:

```js
this.plugin('ready', async moduleContainer => {
    // Lakukan hal ini setelah semua modul siap
})
```

Plugin | Argumen | When
--- | --- | ---
`ready` | moduleContainer | Semua modul di `nuxt.config.js` telah diinisialisasi

## Metode

### addVendor (vendor)

Menambahkan ke `options.build.vendor` dan menerapkan filter yang unik.

### addTemplate (template)

- **template**: `String` ou `Object`
    - `src`
    - `options`
    - `fileName`

Renders given template using [lodash template](https://lodash.com/docs/4.17.4#template) during build into project `buildDir` (`.nuxt`).

Jika `fileName` tidak tersedia atau `template` adalah string, nama default target berkas (file) menjadi `[dirName].[fileName].[pathHash].[ext]`.

Metode ini mengembalikan objek akhir `{ dist, src, options }`.

### addPlugin (template)

Mendaftarkan (register) plugin menggunakan `addTemplate` dan menambahkannya ke opsi pertama `plugins[]`.

Anda dapat menggunakan `template.ssr: false` untuk menonaktifkan plugin yang termasuk dalam paket (bundle) SSR.

### addServerMiddleware (middleware)

Memasukkan middleware ke [options.serverMiddleware](/api/configuration-servermiddleware).

### extendBuild (fn)

Memungkinkan menambahkan/mengubah konfigurasi webpack build dengan mudah, dengan menghubungkannya pada fungsi [options.build.extend](/api/configuration-build#extend).

### extendRoutes (fn)

Memungkinkan menambah/mengubah rute dengan mudah, dengan menghubungkannya pada fungsi [options.build.extendRoutes](/api/configuration-router#extendroutes).

### addModule (moduleOpts, requireOnce)

Mendaftarkan (register) modul. `moduleOpts` dapat berupa string atau `[src, options]`. Jika `requireOnce` bernilai `true` dan modul yang ditemukan (resolved) mengekspor `meta` dapat mencegah pendaftaran modul yang sama dua kali.

### requireModule (moduleOpts)

Sebuah jalan pintas untuk `addModule(moduleOpts, true)`
