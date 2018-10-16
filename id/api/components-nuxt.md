---
title: 'API: '
description: Menampilkan komponen halaman di dalam layout
---

# Komponen <nuxt>

> Komponen ini hanya digunakan di dalam [layouts](/guide/views#layouts) untuk menampilkan komponen halaman.

**Props**:

- nuxtChildKey: `string`
    - Prop ini di-set ke `<router-view/>`, berguna untuk membuat transisi di dalam halaman yang dinamis dan rute yang berbeda.
    - Default: `$route.fullPath`

Contoh (`layouts/default.vue`):

```html
<template>
  <div>
    <div>My nav bar</div>
    <nuxt/>
    <div>My footer</div>
  </div>
</template>
```

Untuk melihat contoh, silakan lihat [contoh layouts](/examples/layouts).
