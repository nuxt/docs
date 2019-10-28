---
title: Pengenalan
description: "Pada tanggal 25 Oktober 2016, tim dibelakang zeit.co, mengumumkan Next.js, sebagai framework server-rendering aplikasi React. Beberapa jam setelah pengumuman tersebut, muncul ide untuk membuat server-rendering aplikas Vue.js seperti Next.js: maka lahirlah Nuxt.js."
---

> Pada tanggal 25 Oktober 2016, tim dibelakang [zeit.co](https://zeit.co/), mengumumkan [Next.js](https://zeit.co/blog/next), framework untuk server-rendering aplikasi React. Beberapa jam kemudian setelah pengumuman tersebut, muncul ide untuk membuat server-rendering aplikasi [Vue.js](https://vuejs.org) seperti Next.js: maka lahirlah **Nuxt.js**.

## Apa itu Nuxt.js ?

Nuxt.js adalah framework untuk membuat aplikasi Universal Vue.js.

Lingkup utamanya adalah **UI rendering** sembari mengabstraksi distribusi klien / server.

Tujuan kami adalah membuat kerangka kerja yang cukup fleksibel sehingga Anda dapat menggunakannya sebagai basis proyek utama atau sebagai tambahan untuk proyek Anda saat ini berbasis Node.js.

Nuxt.js mengatur semua konfigurasi yang diperlukan untuk membuat pengembangan Aplikasi Vue.js Anda **Server Rendering** menjadi lebih menyenangkan.

Selain itu, kami juga menyediakan opsi penempatan lain yang disebut: *nuxt generate*. Ini akan membangun Aplikasi **Statis** Vue.js.
Kami percaya bahwa opsi ini dapat menjadi langkah besar berikutnya dalam pengembangan Aplikasi Web dengan layanan microservis.


Sebagai kerangka kerja, Nuxt.js hadir dengan banyak fitur untuk membantu Anda dalam pengembangan Anda antara sisi klien dan sisi server seperti Asynchronous Data, Middleware, Tata letak, dll.

## Bagaimana itu bekerja ?

![Vue with webpack and Babel](https://i.imgur.com/avEUftE.png)

Nuxt.js meliputi yang berikut ini untuk membuat pengembangan aplikasi web yang kaya:

- [Vue 2](https://vuejs.org/)
- [Vue Router](https://router.vuejs.org/en/)
- [Vuex](https://vuex.vuejs.org/en/) (dimsaukan ketika menggunakan [opsi store](/guide/vuex-store))
- [Vue Server Renderer](https://ssr.vuejs.org/en/) (tidak dimasukan ketika [`mode: 'spa'`](/api/configuration-mode))
- [vue-meta](https://github.com/nuxt/vue-meta)

Dengan total hanya **57kB min+gzip** (53kB with Vuex).

Kami menggunakan [webpack](https://github.com/webpack/webpack) dengan [vue-loader](https://github.com/vuejs/vue-loader) dan [babel-loader](https://github.com/babel/babel-loader) untuk bundle, code-split dan kode minify.

## Fitur-fitur

- Menulis file Vue (`*.vue`)
- Spliting Kode Otomatis
- Render Server-Side
- Sistem Powerful Routing dengan Asynchronous Data
- Penyajian File Statis
- ES2015+ Transpilasi
- Bundling dan minifying JS & CSS Anda
- Mengatur elemen `<head>` (`<title>`, `<meta>`, dll.)
- Penggantian hot-module ketika Pengembangan
- Pre-processor: Sass, Less, Stylus, dll.
- Sudah tersedia HTTP/2 push headers
- Memperluas dengan arsitektur Modular

## Skema

Skema adalah apa yang disebut oleh Nuxt.js ketika server dipanggil atau ketika pengguna menavigasi aplikasi melalui `<nuxt-link>`:

![nuxt-schema](/nuxt-schema.svg)

## Server Rendered (Universal SSR)

Anda dapat menggunakan Nuxt.js sebagai kerangka kerja untuk menangani semua rendering UI proyek Anda.

Ketika mengetikan `nuxt`, itu akan memulai server pengembangan dengan hot-reload dan [Vue Server Renderer](https://ssr.vuejs.org/en/) terkonfigurasi server-render secara otomatis aplikasi Anda.

### Aplikasi Halaman Tunggal (SPA)

Jika karena alasan apa pun, Anda memilih untuk tidak menggunakan rendering server atau memerlukan hosting statis untuk aplikasi Anda, Anda cukup menggunakan mode SPA `nuxt --spa`. Dikombinasikan dengan fitur *generate*, itu memberi Anda mekanisme penyebaran SPA yang kokoh tanpa perlu menggunakan runtime Node.js atau penanganan server khusus.

Lihatlah [perintah ini](/guide/commands) untuk mempelajari cara penggunaan.

Jika Anda sudah memiliki server, Anda dapat memasang Nuxt.js dengan menggunakannya sebagai middleware. Tidak ada batasan sama sekali ketika menggunakan Nuxt.js untuk mengembangkan Aplikasi Web Universal Anda. Lihat panduan [Menggunakan Nuxt.js Secara Programatis](/api/nuxt).

## Generate secara Statis (Pre Rendering)

Inovasi besar Nuxt.js hadir dengan perintah `nuxt generate`.

Saat membangun aplikasi Anda, itu akan menghasilkan HTML untuk setiap rute Anda dan menyimpannya dalam file.

Sebagai contoh, struktur file berikut ini:

```bash
-| pages/
----| about.vue
----| index.vue
```

Akan meng-generate:

```
-| dist/
----| about/
------| index.html
----| index.html
```

Dengan ini, anda dapat langsung menyimpan aplikasi pada hosting statis manapun!

Contoh terbaik adalah situs web ini yang dihasilkan dan dihosting di Halaman GitHub:

- [Kode Sumber](https://github.com/nuxt/nuxtjs.org)
- [Kode yang sudah di generate](https://github.com/nuxt/nuxtjs.org/tree/gh-pages)

Kami tidak ingin membuat aplikasi secara manual setiap kali kami memperbarui [docs repository](https://github.com/nuxt/docs), jadi setiap push yang dibuat akan memanggil fungsi AWS Lambda yang mana:

1. Melakukan clone [repositori nuxtjs.org](https://github.com/nuxt/nuxtjs.org)
2. Install dependensi `npm install`
3. Jalankan `nuxt generate`
4. Push folder `dist` ke branch `gh-pages`

Sekarang kita punya **Aplikasi Web Yang Dihasilkan secara Serverless Statis** :)

Kita dapat melangkah lebih jauh dengan memikirkan aplikasi web e-commerce yang dibuat dengan `nuxt generate` yang kemudian dihosting di CDN. Setiap kali produk kehabisan stok atau melakukan re-stok kembali, kita akan membuat ulang aplikasi web. Tetapi jika pengguna melakukan navigasi melalui aplikasi web, itu akan diperbarui dengan panggilan API yang dibuat ke API e-commerce. Sehingga tidak perlu lagi memiliki banyak instance dari server + cache!

<div class="Alert">

Lihat [Bagaimana cara melakukan penyebaran (deploy) ke Halaman GitHub?](/faq/github-pages) untuk detail lebih lanjut tentang cara melakukan penyebaran ke Halaman GitHub.

</div>
