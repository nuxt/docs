---
title: Modul-modul
description: Modul-modul adalah ekstensi Nuxt.js yang dapat memperluas fungsionalitas inti dan menambahkan integrasi tanpa akhir.
---

> Modules are Nuxt.js extensions which can extend its core functionality and add endless integrations.

## Introduction

Saat mengembangkan aplikasi tingkat produksi dengan Nuxt, Anda akan segera menemukan bahwa inti dari kerangka (framework)
itu tidak hanya fungsi. Nuxt dapat diperluas menggunakan opsi konfigurasi dan plugin, tetapi mempertahankan penyesuaian ini di berbagai proyek itu membosankan, berulang-ulang dan memakan waktu.
Di sisi lain, mendukung kebutuhan setiap proyek secara langsung akan membuat Nuxt sangat kompleks dan sulit digunakan.

Ini adalah salah satu alasan mengapa Nuxt menyediakan sistem modul tingkat tinggi yang membuatnya mudah untuk memperluas inti.
Modul adalah **fungsi** sederhana yang disebut berurutan ketika mem-boot Nuxt.
Kerangka kerja (framework) akan menunggu masing-masing modul selesai sebelum dilanjutkan.
Dengan cara tersebut, modul dapat menyesuaikan hampir semua aspek Nuxt.
Terimakasih untuk design modular Nuxt's (berbasis webpack [Tapable](https://github.com/webpack/tapable)),
modul dapat dengan mudah mendaftarkan hooks sebagai entri-poin tertentu seperti inisialisasi build.
Modul juga dapat mengesampingkan templat, mengkonfigurasi webpack-loader, menambahkan librari CSS, dan melakukan banyak tugas bermanfaat lainnya.

Yang terbaik dari semuanya, modul Nuxt dapat dimasukkan ke dalam paket npm.
Ini membuatnya mudah untuk digunakan kembali di seluruh proyek dan untuk berbagi dengan komunitas Nuxt,
membantu menciptakan ekosistem pengaya Nuxt berkualitas tinggi.

Modul akan bagus jika Anda:

- Anggota dari **tim agile** yang perlu mem-bootstrap proyek baru dengan cepat.
- Sudah lelah **membuat ulang** pengerjaan tugas-tugas umum seperti mengintegrasikan Google Analytics.
- Adalah penggila **Open Source** yang ingin dengan mudah **berbagi** pekerjaan anda dengan komunitas.
- Adalah anggota suatu perusahaan **enterprise** yang menjunjung nilai **kualitas** dan **dapat digunakan kembali**.
- Sering menghadapi tenggat waktu pendek dan tidak punya waktu untuk menggali rincian setiap perpustakaan atau integrasi baru.
- Bosan berurusan dengan pemecahan perubahan antarmuka tingkat rendah, dan hanya membutuhkan untuk **sekedar bekerja™**.

## Daftar modul-modul Nuxt.js

Tim Nuxt.js menawarkan modul-modul **resmi** sebagai berikut:
- [@nuxt/http](https://http.nuxtjs.org): Cara ringan dan universal untuk membuat request HTTP, berbasis [ky-universal](https://github.com/sindresorhus/ky-universal)
- [@nuxtjs/axios](https://axios.nuxtjs.org): Integrasi Axios yang Aman dan Mudah dengan Nuxt.js untuk membuat request HTTP
- [@nuxtjs/pwa](https://pwa.nuxtjs.org): Supercharge Nuxt dengan solusi PWA yang sangat teruji, terbarukan dan stabil
- [@nuxtjs/auth](https://auth.nuxtjs.org): Modul otentikasi untuk Nuxt.js, menawarkan skema dan strategi yang berbeda

Daftar modul-modul Nuxt.js yang dibuat oleh komunitas, tersedia di https://github.com/topics/nuxt-module

## Menulis modul dasar

Seperti yang telah disebutkan diatas, modul hanyalah fungsi sederhana. Mereka dapat dikemas sebagai modul npm atau langsung dimasukkan dalam kode sumber proyek.

**modules/simple.js**

```js
export default function SimpleModule (moduleOptions) {
  // Tulis kode anda disini
}

// DIBUTUHKAN jika menerbitkan modul sebagai paket npm
// module.exports.meta = require('./package.json')
```

**`moduleOptions`**

Ini adalah objek yang menggunakan array `modules` oleh pengguna, kita dapat menggunakannya untuk menyesuaikan sebuah perilaku.

**`this.options`**

Anda dapat langsung mengakses opsi Nuxt menggunakan referensi ini. Ini adalah konten `nuxt.config.js` pengguna dengan semua opsi default yang ditetapkan. Dapat digunakan sebagai opsi bersama antar modul.

**`this.nuxt`**

Ini adalah referensi ke instance Nuxt saat ini. Lihat [Dokumentasi kelas pada Nuxt yang tersedia](/api/internals-nuxt).

**`this`**

Konteks pada modul-modul. Silahkan lihat dokumentasi kelas [ModuleContainer](/api/internals-module-container) untuk metode yang tersedia.

**`module.exports.meta`**

Baris ini **dibutuhkan** jika Anda menerbitkan modul sebagai paket di npm. Secara internal, Nuxt menggunakan meta untuk bekerja lebih baik dengan paket Anda.

**nuxt.config.js**

```js
export default {
  modules: [
    // Penggunaan secara mudah
    '~/modules/simple'

    // Opsi secara langsung
      ['~/modules/simple', { token: '123' }]
  ]
}
```

Kami kemudian memberitahu Nuxt untuk memuat beberapa modul spesifik untuk proyek dengan parameter opsional sebagai opsi.
Silahkan lihat dokumentasi [pengaturan modul-modul](/api/configuration-modules) untuk informasi lebih detail!

## Modul-modul Async

Tidak semua modul akan melakukan semuanya secara synchronous. Misalnya Anda mungkin ingin mengembangkan modul yang perlu mengambil beberapa API atau melakukan async IO. Untuk ini, Nuxt mendukung modul async yang dapat mengembalikan Promise atau callback.

### Gunakan async/await

<div class="Alert Alert--orange">

Sadarilah bahwa `async`/`await` hanya didukung di Node.js > 7.2. Jadi, jika Anda seorang pengembang modul, setidaknya peringatkan pengguna anda tentang hal itu ketika menggunakannya. Untuk modul async yang berat atau dukungan lawas yang lebih baik, Anda dapat menggunakan bundler untuk mengubahnya mengikuti kompatibilitas versi Node.js yang lebih lama atau metode promise.

</div>

```js
import fse from 'fs-extra'

export default async function asyncModule () {
  // Anda dapat melakukan pekerjaan async di sini menggunakan `async`/`await`
  const pages = await fse.readJson('./pages.json')
}
```

### Mengembalikan Promise

```js
import axios from 'axios'

export default function asyncModule () {
  return axios.get('https://jsonplaceholder.typicode.com/users')
    .then(res => res.data.map(user => '/users/' + user.username))
    .then((routes) => {
      // Lakukan sesuatu dengan memperluas rute Nuxt
    })
}
```

## Cuplikan umum

### Opsi tingkat atas

Terkadang lebih nyaman jika kita dapat menggunakan opsi tingkat atas ketika mendaftarkan modul pada `nuxt.config.js`.
Ini memungkinkan kita untuk menggabungkan beberapa sumber opsi.

**nuxt.config.js**

```js
export default {
  modules: [
    ['@nuxtjs/axios', { anotherOption: true }]
  ],

  // modul axios mengetahui hal ini dengan menggunakan `this.options.axios`
  axios: {
    option1,
    option2
  }
}
```

**module.js**

```js
export default function (moduleOptions) {
  // `options` akan berisi option1, option2 dan anotherOption
  const options = Object.assign({}, this.options.axios, moduleOptions)

  // ...
}
```

### Menyediakan plugin-plugin

Adalah umum bahwa modul menyediakan satu atau lebih plugin ketika ditambahkan.
Sebagai contoh pada modul [bootstrap-vue](https://bootstrap-vue.js.org) memerlukan register sendiri ke Vue.
Dalam situasi seperti itu kita dapat menggunakan bantuan `this.addPlugin`.

**plugin.js**

```js
import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue/dist/bootstrap-vue.esm'

Vue.use(BootstrapVue)
```

**module.js**

```js
import path from 'path'

export default function nuxtBootstrapVue (moduleOptions) {
  // Register `plugin.js` template
  this.addPlugin(path.resolve(__dirname, 'plugin.js'))
}
```

### Plugin Templat

Templat dan plugin yang sudah terdaftar dapat meningkatkan [templat-templat lodash](https://lodash.com/docs/4.17.4#template) untuk secara kondisional mengubah output plugin yang sudah terdaftar.

**plugin.js**

```js
// Set Google Analytics UA
ga('create', '<%= options.ua %>', 'auto')

<% if (options.debug) { %>
// Dev only code
<% } %>
```

**module.js**

```js
import path from 'path'

export default function nuxtBootstrapVue (moduleOptions) {
  // Daftarkan templat `plugin.js`
  this.addPlugin({
    src: path.resolve(__dirname, 'plugin.js'),
    options: {
      // Nuxt akan mengganti `options.ua` dengan` 123` saat menyalin plugin ke proyek
      ua: 123,

      // bagian kondisional dengan dev akan dicopot dari kode plugin pada saat build produksi
      debug: this.options.dev
    }
  })
}
```

### Menambahkan pustaka CSS

Jika modul Anda akan menyediakan pustaka CSS, pastikan untuk melakukan pemeriksaan jika pengguna sudah memasukkannya untuk menghindari duplikasi, dan tambahkan **opsi untuk menonaktifkan** pustaka css pada modul.

**module.js**

```js
export default function (moduleOptions) {
  if (moduleOptions.fontAwesome !== false) {
    // Tambahkan Font Awesome
    this.options.css.push('font-awesome/css/font-awesome.css')
  }
}
```

### Emit assets

<!-- todo: up2date? -->

Kita dapat mendaftarkan plugin webpack untuk melakukan emit aset ketika build.

**module.js**

```js
export default function (moduleOptions) {
  const info = 'Dibangun dengan modul yang luar biasa - 1.3 alpha pada ' + Date.now()

  this.options.build.plugins.push({
    apply (compiler) {
      compiler.plugin('emit', (compilation, cb) => {
        // Ini akan menghasilkan `.nuxt / dist / info.txt 'dengan isi variabel info.
        // Sumber juga bisa menjadi penyangga (buffer)
        compilation.assets['info.txt'] = { source: () => info, size: () => info.length }

        cb()
      })
    }
  })
}
```

### Daftarkan loader webpack custom

Kita dapat melakukan hal yang sama seperti `build.extend` pada `nuxt.config.js` menggunakan `this.extendBuild`.

**module.js**

```js
export default function (moduleOptions) {
    this.extendBuild((config, { isClient, isServer }) => {
      // `.foo` Loader
      config.module.rules.push({
        test: /\.foo$/,
        use: [...]
      })

      // Kustomisasi loader yang sudah ada
      // Lihat kode sumber untuk internal Nuxt:
      // https://github.com/nuxt/nuxt.js/tree/dev/packages/builder/src/webpack/base.js
      const barLoader = config.module.rules.find(rule => rule.loader === 'bar-loader')
  })
}
```

## Jalankan Tugas pada hooks tertentu

Modul Anda mungkin perlu melakukan hal-hal pada kondisi tertentu dan tidak hanya ketika inisialisasi Nuxt.
Kita bisa menggunakan [Hookable](https://github.com/nuxt/nuxt.js/blob/dev/packages/core/src/hookable.js) Nuxt.js sistem untuk melakukan tugas pada events spesifik.
Nuxt akan menunggu fungsi Anda jika mengembalikan Promise atau didefinisikan sebagai `async`.

Berikut beberapa contoh dasar:

```js
export default function myModule () {
  this.nuxt.hook('modules:done', (moduleContainer) => {
    // Ini akan dipanggil ketika semua modul selesai memuat
  })

  this.nuxt.hook('render:before', (renderer) => {
    // Dipanggil setelah penyaji dibuat
  })

  this.nuxt.hook('build:compile', async ({ name, compiler }) => {
    // Dipanggil sebelum kompiler (default: webpack) dimulai
  })

  this.nuxt.hook('generate:before', async (generator) => {
    // Ini akan dipanggil sebelum Nuxt meng-generate halaman Anda
  })
}
```

## Perintah-perintah pada paket modul

**Percobaan**

Dimulai pada versi `v2.4.0`, Anda dapat menambahkan perintah nuxt khusus melalui paket modul Nuxt. Untuk melakukannya, Anda harus mengikuti API `NuxtCommand` pada saat mendefinisikan perintah Anda. Contoh sederhana yang secara hipotetis ditempatkan di `my-module/bin/command.js` akan terlihat seperti ini:

```js
#!/usr/bin/env node

const consola = require('consola')
const { NuxtCommand } = require('@nuxt/cli')

NuxtCommand.run({
  name: 'command',
  description: 'Perintah Modul Saya',
  usage: 'command <foobar>',
  options: {
    foobar: {
      alias: 'fb',
      type: 'string',
      description: 'Test string sederhana'
    }
  },
  run (cmd) {
    consola.info(cmd.argv)
  }
})
```

Beberapa hal yang perlu diperhatikan di sini. Pertama, perhatikan panggilan ke `/usr/bin/env` untuk mengambil Node yang dapat dieksekusi. Perhatikan juga bahwa sintaks modul ES tidak dapat digunakan untuk perintah kecuali Anda secara manual memasukkan [`esm`](https://github.com/standard-things/esm) kedalam kode anda.

Selanjutnya, Anda akan melihat bagaimana `NuxtCommand.run()` digunakan untuk menentukan pengaturan dan perilaku perintah.Opsi didefinisikan dalam `options`, yang bisa diurai melalui [`minimist`](https://github.com/substack/minimist).
Setelah argumen diuraikan, `run()` secara otomatis dipanggil dengan instance `NuxtCommand` sebagai parameter pertama.

Pada contoh diatas, `cmd.argv` digunakan untuk mengambil uraian argumen baris perintah. Ada lebih banyak metode dan properti pada `NuxtCommand` -- dokumentasi tentang itu semua akan diberikan nanti karena fitur ini masih diuji lebih lanjut dan diperbaiki.

Untuk membuat perintah Anda dikenali oleh Nuxt CLI, masukan dibawah bagian `bin` pada package.json anda, menggunakan konvensi `nuxt-module`, dimana `module` berhubungan dengan nama paket. Dengan ini, Anda dapat menggunakan `argv` untuk mem-parsing lebih banyak `subcommands` untuk perintah Anda jika Anda mau.

```js
{
  "bin": {
    "nuxt-foobar": "./bin/command.js"
  }
}
```

Setelah paket Anda diinstal (melalui NPM atau Yarn), Anda akan dapat mengeksekusi `nuxt foobar ...` pada baris perintah.

<div class="Alert">

Ada banyak cara hooks dan kemungkinan untuk modul. Silahkan baca [Nuxt Internal](/api/internals) untuk mengetahui lebih lanjut tentang API nuxt-internal.

</div>
