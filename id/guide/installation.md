---
title: Instalasi
description: Memulai Nuxt.js itu ternyata sangat mudah. Satu proyek sederhana hanya memerlukan dependency `nuxt`
---

> Memulai Nuxt.js itu ternyata sangat mudah. Satu proyek sederhana hanya memerlukan dependency `nuxt`.

## Menggunakan templat awal Nuxt.js

Untuk memulai dengan cepat, tim Nuxt.js telah membuat [templat awal](https://github.com/nuxt-community/starter-template).

[Unduh .zip](https://github.com/nuxt-community/starter-template/archive/master.zip) templat awal atau instal dengan vue-cli:

```bash
$ vue init nuxt-community/starter-template <nama-proyek>
```

> Jika [vue-cli](https://github.com/vuejs/vue-cli) tidak terinstal, silakan instal dengan `npm install -g vue-cli`

lalu instal the dependencies:

```bash
$ cd <nama-proyek>
$ npm install
```

dan jalankan proyek dengan:

```bash
$ npm run dev
```

Kini aplikasi berjalan pada http://localhost:3000.

<p class="Alert">Nuxt.js will listen for file changes inside the <code>pages</code> directory, so there is no need to restart the application when adding new pages.</p>

To discover more about the directory structure of the project: [Directory Structure Documentation](/guide/directory-structure).

## Mulai dari awal

Membuat aplikasi Nuxt.js dari awal juga sangat mudah, hanya memerlukan *1 file dan 1 direktori*. Mari kita buat satu direktori kosong untuk mulai membuat aplikasinya: 

```bash
$ mkdir <nama-proyek>
$ cd <nama-proyek>
```

<p class="Alert Alert--nuxt-green"><b>Info:</b> tukar <code>&lt;nama-proyek&gt;</nom-du-projet></code> dengan nama proyek yang diinginkan.</p>

### package.json

The project needs a `package.json` file to specify how to start `nuxt`:
Proyek memerlukan file `package.json` untuk memperinci bagaimana untuk memulai `nuxt`:

```json
{
  "name": "my-app",
  "scripts": {
    "dev": "nuxt"
  }
}
```

`scripts` akan menjalankan Nuxt.js melalui `npm run dev`.

### Memasang `nuxt`

Setelah `package.json` selesai dibuat, tambahkan `nuxt` ke dalam proyek melalui npm:

```bash
npm install --save nuxt
```

### Direktori `pages`

Nuxt.js akan mengubah setiap file `*.vue` di dalam direktori `pages` sebagai rute untuk aplikasi.

Buat direktori `pages`:

```bash
$ mkdir pages
```

lalu buat halaman pertama dalam `pages/index.vue`:

```html
<template>
  <h1>Hello world!</h1>
</template>
```

dan jalankan proyek dengan:

```bash
$ npm run dev
```

Kini aplikasi berjalan pada http://localhost:3000.

<p class="Alert">Nuxt.js will listen for file changes inside the <code>pages</code> directory, so there is no need to restart the application when adding new pages.</p>

Untuk mengetahui lebih lanjut tentang struktur direktori pada proyek: [Dokumentasi Struktur Direktori](/guide/directory-structure).
