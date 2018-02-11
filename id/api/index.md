---
title: 'API: The asyncData Method'
description: Anda mungkin ingin mengambil data dan me-render-nya di sisi-server. Nuxt.js
  menambahkan metode `asyncData` yang memungkinkan Anda menangani operasi async sebelum
  mengatur data komponen.
---

# The asyncData Method

> Anda mungkin ingin mengambil data dan me-render-nya di sisi-server. Nuxt.js menambahkan metode `asyncData` yang memungkinkan Anda menangani operasi async sebelum mengatur data komponen.

- **Type:** `Function`

`asyncData` dipanggil setiap saat sebelum memuat komponen (**hanya untuk komponen halaman**). Ini bisa dipanggil dari sisi-server atau sebelum menavigasi ke rute yang sesuai. Metode ini menerima objek [`context`](/api/context) sebagai argumen pertama, Anda dapat menggunakannya untuk mengambil beberapa data dan mengembalikan data komponen.

The result from asyncData will be **merged** with data.

```js
export default {
  data () {
    return { project: 'default' }
  },
  asyncData (context) {
    return { project: 'nuxt' }
  }
}
```

<div class="Alert Alert--orange">Anda **TIDAK** memiliki akses instansi komponen menggunakan `this` di dalam `asyncData` karena dia dipanggil **sebelum memulai (initiating)** komponennya.</div>
