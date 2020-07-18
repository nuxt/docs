---
title: "API: Properti layout"
description: Setiap file (tingkat pertama) di direktori layout akan membuat layout khusus yang dapat diakses dengan properti layout di komponen halaman.
---

> Setiap file (tingkat pertama) di direktori layout akan membuat layout khusus yang dapat diakses dengan properti layout di komponen halaman.

- **Tipe:** `String` atau `Function` (bawaan: `'default'`)

Gunakan `layout` sebagai kunci dalam komponen halaman Anda untuk menentukan layout mana yang akan digunakan:

```js
export default {
  layout: 'blog',
  // OR
  layout (context) {
    return 'blog'
  }
}
```

Dalam contoh ini, Nuxt.js akan menyertakan `layouts/blog.vue` file sebagai layout untuk komponen halaman ini.

Periksa [video demonstrasi](https://www.youtube.com/watch?v=YOKnSTp7d38) untuk melihatnya beraksi.

Untuk memahami cara kerja tata letak dengan Nuxt.js, lihat [dokumentasi layout](/guide/views#layouts).
