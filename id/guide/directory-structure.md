---
title: Struktur Direktori
description: Struktur aplikasi Nuxt.js default dimaksudkan untuk memberikan titik awal yang bagus untuk aplikasi kecil dan besar.
---

> Struktur aplikasi Nuxt.js default dimaksudkan untuk memberikan titik awal yang bagus untuk aplikasi kecil dan besar. Tentu saja, Anda bebas mengatur aplikasi sesuka Anda.

<div class="Promo__Video">
  <a href="https://vueschool.io/lessons/guided-nuxtjs-project-tour?friend=nuxt" target="_blank">
    <p class="Promo__Video__Icon">
      Tonton pelajaran gratis tentang <strong>struktur direktori Nuxt.js</strong> di Vue School 
    </p>
  </a>
</div>

## Direktori

### Direktori Assets

Direktori `assets` berisi compiled Anda seperti berkas Stylus atau Sass, gambar, atau font.

[Dokumentasi lebih lanjut tentang integrasi assets](/guide/assets)

### Direktori Components

Direktori `components` berisi Vue.js Komponen Anda. 

<div class="Alert Alert--orange">

Komponen dalam direktori ini tidak akan memiliki akses ke [asyncData](/guide/async-data).

</div>

### Direktori Layouts

Direktori `layouts` termasuk layout aplikasi Anda. Layouts digunakan untuk mengubah tampilan dan nuansa halaman Anda (misalnya dengan menyertakan sisi sidebar).

[Dokumentasi lebih lanjut tentang integrasi Layouts](/guide/views#layouts)

_Direktori ini tidak dapat diganti namanya tanpa konfigurasi tambahan._

### Direktori Middleware

Direktori `middleware` berisi Middleware Aplikasi Anda. Middleware memungkinkan Anda menentukan fungsi khusus yang dapat dijalankan sebelum merender halaman atau grup halaman (layout).

[Dokumentasi lebih lanjut tentang integrasi Middleware](/guide/routing#middleware)

### Direktori Pages

Direktori `pages` berisi Tampilan Aplikasi dan rute Anda. Kerangka kerja membaca semua file `.vue` di dalam direktori ini dan membuat aplikasi router. Jika Anda ingin membuat rute secara manual bisa coba menggunakan package [@nuxtjs/router](https://github.com/nuxt-community/router-module).

_Direktori ini tidak dapat diganti namanya tanpa konfigurasi tambahan._

[Dokumentasi lebih lanjut tentang integrasi Pages](/guide/views)

### Direktori Plugins

Direktori `plugins` berisi plugin Javascript Anda bahwa Anda ingin menjalankan sebelum instantiating akar Aplikasi Vue.js. Ini adalah tempat untuk mendaftarkan komponen secara global dan untuk menyuntikkan fungsi atau konstanta.

[Dokumentasi lebih lanjut tentang integrasi Plugins](/guide/plugins)

### Direktori Static

Direktori `static` langsung dipetakan ke root server (`/static/robots.txt` dapat diakses di bawah `http://localhost:3000/robots.txt`) dan berisi file yang kemungkinan besar tidak akan berubah (misalnya favicon)

**Contoh:** `/static/robots.txt` mejadi `/robots.txt`

_Direktori ini tidak dapat diganti namanya tanpa konfigurasi tambahan._

[Dokumentasi lebih lanjut tentang integrasi Static](/guide/assets#static)

### Direktori Store

Direktori `store` berisi file [Vuex Store](http://vuex.vuejs.org/en/) Anda. Vuex Store hadir dengan Nuxt.js di luar kotak tetapi dinonaktifkan secara default. Tambahkan file `index.js` untuk mengatifkan direktori store.

_Direktori ini tidak dapat diganti namanya tanpa konfigurasi tambahan._

[Dokumentasi lebih lanjut tentang integrasi Store](/guide/vuex-store)

### File nuxt.config.js

File `nuxt.config.js` berisi konfigurasi kustom Nuxt.js Anda.

_File ini tidak dapat diganti namanya tanpa konfigurasi tambahan._

[Dokumentasi lebih lanjut tentang integrasi `nuxt.config.js`](/guide/configuration)

### File package.json

File `package.json` berisi dependensi Aplikasi dan skrip yang Anda gunakan.

_File ini tidak dapat diganti namanya._

## Alias

| Alias | Direktori |
|-----|------|
| `~` or `@` | [srcDir](/api/configuration-srcdir) |
| `~~` or `@@` | [rootDir](/api/configuration-rootdir) |

Secara default, `srcDir` sama dengan `rootDir`.

<div class="Alert Alert--nuxt-green">

<b>Info:</b> Didalam `vue` templat Anda, jika Anda perlu menautkan ke `assets` atau direktori `static` Anda, gunakan `~/assets/your_image.png` dan `~/static/your_image.png`.

</div>
