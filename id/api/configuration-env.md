---
title: 'API: The env Property'
description: Berbagi variabel lingkungan (environment) antara klien dan server.
---

# The env Property

- Type: `Object`

> Nuxt.js memungkinkan Anda membuat variabel lingkungan (environment) yang akan dibagikan untuk klien dan sisi-server.

Example (`nuxt.config.js`):

```js
module.exports = {
  env: {
    baseUrl: process.env.BASE_URL || 'http://localhost:3000'
  }
}
```

Ini memungkinkan kita membuat properti `baseUrl` yang akan sama dengan variabel lingkungan (environment) `BASE_URL` jika terdefinisi, tetapi jika tidak, properti baseUrl akan sama dengan `http://localhost:3000`.

Kemudian, kita bisa mengakses variabel `baseUrl` di atas dengan 2 cara:

1. Melalui `process.env.baseUrl`, atau
2. Via `context.env.baseUrl`, see [context api](/api/context)

Anda dapat menggunakan properti `env` untuk memberikan "public token" sebagai contoh.

For the example above, we can use it to configure [axios](https://github.com/mzabriskie/axios).

`plugins/axios.js`:

```js
import axios from 'axios'

export default axios.create({
  baseURL: process.env.baseUrl
})
```

Kemudian, Anda dapat melakukan impor axios seperti: `import axios from '~/plugins/axios'` pada halaman anda

## process.env == {}

Perhatikan bahwa nuxt menggunakan Webpack ini `definePlugin` untuk mendefinisikan variabel lingkungan (environment). Ini berarti bahwa, `process` atau `process.env` dari node tidak tersedia dan tidak terdefinisi. Masing-masing properti env yang terdefinisi di dalam file nuxt.config.js secara terpisah dipetakan ke process.env.xxxx dan akan terkonversi selama kompilasi.

Artinya, `console.log(process.env)` akan menampilkan `{}`, tetapi `console.log(process.env.you_var)` masih akan menghasilkan nilai yang sudah Anda tetapkan sebelumnya. Saat webpack menyusun kode milik Anda, ia akan mengganti semua instansi `process.env.your_var` menjadi nilai yang Anda tetapkan. Yaitu: `env.test = 'testing123'` . Jika Anda menggunakan `process.env.test` di dalam kode Anda pada suatu tempat, itu sebenarnya diterjemahkan ke 'testing123'.

before

```
if (process.env.test == 'testing123')
```

after

```
if ('testing123' == 'testing123')
```
