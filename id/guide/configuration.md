---
title: Configuration
description: Secara umum, Nuxt.js dikonfigurasi untuk menutupi sebagian besar kasus
  penggunaan. Konfigurasi default ini dapat ditimpa dengan menggunakan file `nuxt.config.js`.
---

> Secara umum, Nuxt.js dikonfigurasi untuk menutupi sebagian besar kasus penggunaan. Konfigurasi default ini dapat ditimpa dengan memodifikasi file `nuxt.config.js`.

### build

This option lets you add modules inside the `vendor.bundle.js` file to reduce the size of the application bundle. This is especially helpful when using external modules.

[Dokumentasi tentang integrasi `build` ](/api/configuration-build)

### css

This option lets you define the CSS files/modules/libraries you want to set as globals (included in every page).

[Documentation about `css` integration](/api/configuration-css)

### dev

Pilihan ini memungkinkan Anda menentukan mode `development` atau `production` Nuxt.js

[Documentation about `dev` integration](/api/configuration-dev)

### env

This option lets you define environment variables available to both the client and the server.

[Documentation about `env` integration](/api/configuration-env)

### generate

Opsi ini memungkinkan Anda menentukan nilai parameter untuk setiap rute dinamis di aplikasi Anda yang akan diubah menjadi file HTML oleh Nuxt.js.

[Documentation about generate integration](/api/configuration-generate)

### head

Opsi ini memungkinkan Anda menentukan semua tag meta default untuk aplikasi Anda.

[Documentation about head integration](/api/configuration-head)

### loading

Opsi ini memungkinkan Anda menyesuaikan komponen loading Nuxt.js secara default.

[Documentation about `loading` integration](/api/configuration-loading)

### modules

Pilihan ini memungkinkan Anda menambahkan modul Nuxt ke proyek Anda.

[Documentation about `modules` integration](/api/configuration-modules)

### plugins

Pilihan ini memungkinkan Anda menentukan plugin JavaScript yang akan dijalankan sebelum menginstal aplikasi root Vue.js.

[Documentation about `plugins` integration](/api/configuration-plugins)

### rootDir

Pilihan ini memungkinkan Anda menentukan ruang kerja Aplikasi Nuxt.js Anda.

[Documentation about `rootDir` integration](/api/configuration-rootdir)

### router

Pilihan ini memungkinkan Anda menimpa konfigurasi Nuxt.js default dari Vue Router.

[Documentation about `router` integration](/api/configuration-router)

### srcDir

This option lets you define the source directory of your Nuxt.js Application.

[Documentation about `srcDir` integration](/api/configuration-srcdir)

### transition

Pilihan ini memungkinkan Anda menentukan properti default dari transisi halaman.

[Documentation about `transition` integration](/api/configuration-transition)
