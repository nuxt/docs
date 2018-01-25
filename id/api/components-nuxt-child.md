---
title: 'API: '
description: Menampilkan halaman saat ini
---

# Komponen <nuxt-child>

> Komponen ini digunakan untuk menampilkan "children" komponen pada [nested route](/guide/routing#nested-routes)

Contoh:

```bash
-| pages/
---| parent/
------| child.vue
---| parent.vue
```

File tree di atas akan menghasilkan routes sebagai berikut:

```js
[
  {
    path: '/parent',
    component: '~/pages/parent.vue',
    name: 'parent',
    children: [
      {
        path: 'child',
        component: '~/pages/parent/child.vue',
        name: 'parent-child'
      }
    ]
  }
]
```

Untuk menampilkan komponen `child.vue`, kita harus memasukan `<nuxt-child/>` ke dalam `pages/parent.vue`:

```html
<template>
  <div>
    <h1>I am the parent view</h1>
    <nuxt-child/>
  </div>
</template>
```

Untuk melihat contoh, silahkan lihat [contoh nested-routes](/examples/nested-routes).
