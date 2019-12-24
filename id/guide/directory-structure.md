---
title: Directory Structure
description: Struktur aplikasi Nuxt.js bawaan dimaksudkan untuk memberikan titik awal yang bagus untuk aplikasi besar dan kecil.
---

> Struktur aplikasi Nuxt.js bawaan dimaksudkan untuk memberikan titik awal yang bagus untuk aplikasi besar dan kecil. Tentu saja, Anda bebas mengatur aplikasi sesuka Anda.

<div class="Promo__Video">
  <a href="https://vueschool.io/lessons/guided-nuxtjs-project-tour?friend=nuxt" target="_blank">
    <p class="Promo__Video__Icon">
      Tonton pelajaran gratis tentang <strong>struktur direktori Nuxt.js</strong> di Vue School 
    </p>
  </a>
</div>

## Direktori

### Direktori Aset

Direktori `assets` berisi aset Anda yang belum dikompilasi seperti file Stylus atau Sass, gambar, atau font.

[Dokumentasi lebih lanjut tentang integrasi Aset](/guide/assets)

### Direktori Komponen

Direktori `components` berisi Komponen Vue.js Anda. Anda tidak dapat menggunakan `asyncData` atau `fetch` dalam komponen-komponen ini.

### Direktori Tata Letak

Direktori `layouts` termasuk tata letak aplikasi Anda. Tata letak digunakan untuk mengubah tampilan dan nuansa halaman Anda (misalnya dengan menyertakan bilah sisi).

[Dokumentasi lebih lanjut tentang integrasi Tata Letak](/guide/views#layouts)

_Direktori ini tidak dapat diganti namanya tanpa konfigurasi tambahan._

### Direktori Middleware

Direktori `middleware` berisi Aplikasi Middleware Anda. Middleware memungkinkan Anda menentukan fungsi khusus yang dapat dijalankan sebelum merender halaman atau grup halaman (tata letak).

[Dokumentasi lebih lanjut tentang integrasi Middleware](/guide/routing#middleware)

### Direktori Halaman

Direktori `pages` berisi Tampilan Aplikasi dan Rute Anda. Kerangka kerja membaca semua file `.vue` di dalam direktori ini dan membuat aplikasi router.

_Direktori ini tidak dapat diganti namanya tanpa konfigurasi tambahan._

[Dokumentasi lebih lanjut tentang integrasi Halaman](/guide/views)

### Direktori Plugin

Direktori `plugins` berisi plugins Javascript yang ingin Anda jalankan sebelum instantiating Aplikasi root Vue.js. Ini adalah tempat untuk mendaftarkan komponen secara global dan untuk menyuntikkan fungsi atau konstanta.

[Dokumentasi lebih lanjut tentang integrasi Plugin](/guide/plugins)

### Direktori Statis

Direktori `static` secara langsung dipetakan ke root server (`/static/robots.txt` dapat diakses di bawah `http://localhost:3000/robots.txt`) dan berisi file yang kemungkinan tidak akan diubah (mis. favicon)

**Contoh:** `/static/robots.txt` dipetakan sebagai `/ robots.txt`

_Direktori ini tidak dapat diganti namanya tanpa konfigurasi tambahan._

[Dokumentasi lebih lanjut tentang integrasi statis](/guide/assets#static)

### Direktori Store

Direktori `store` berisi file [Vuex Store] (http://vuex.vuejs.org/en/) Anda. Vuex Store hadir dengan Nuxt.js di luar kotak tetapi dinonaktifkan secara default. Membuat file `index.js` dalam direktori ini memungkinkan toko.

_Direktori ini tidak dapat diganti namanya tanpa konfigurasi tambahan._

[Dokumentasi lebih lanjut tentang integrasi Toko](/guide/vuex-store)

### File nuxt.config.js

File `nuxt.config.js` berisi konfigurasi khusus Nuxt.js Anda.

_File ini tidak dapat diganti namanya tanpa konfigurasi tambahan._

[Dokumentasi lebih lanjut tentang integrasi `nuxt.config.js`](/guide/configuration)

### File package.json

File `package.json` berisi dependensi dan skrip Aplikasi Anda.

_File ini tidak dapat diganti nama._

## Alias

| Alias | Direktori |
|-----|------|
| `~` or `@` | [srcDir](/api/configuration-srcdir) |
| `~~` or `@@` | [rootDir](/api/configuration-rootdir) |

Secara default, `srcDir` adalah sama dengan `rootDir`.

<div class="Alert Alert--nuxt-green">

<b>Info:</b> Di dalam templat `vue` Anda, jika Anda perlu menautkan ke direktori` assets` atau `static` Anda, gunakan` ~ / assets / your_image.png` dan `~ / static / your_image.png`.

</div>