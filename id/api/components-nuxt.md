---
title: 'API: The '
description: Menampilkan komponen halaman di dalam layout
---

# The <nuxt> Component

> Komponen ini hanya digunakan di dalam [layout](/guide/views#layouts) untuk menampilkan komponen halaman.

**Props**:

- nuxtChildKey: `string`
    - Prop ini diset ke `<router-view/>`, berguna untuk membuat transisi di dalam halaman yang dinamis dan route yang berbeda.
    - Default: `$route.fullPath`

Example (`layouts/default.vue`):

```html
<template>
  <div>
    <div>My nav bar</div>
    <nuxt/>
    <div>My footer</div>
  </div>
</template>
```

Untuk melihat contoh, silakan lihat [contoh nested-routes](/examples/layouts).
