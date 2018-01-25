---
title: 'API: The '
description: Display the current page.
---

# The <nuxt-child> Component

> Komponen ini digunakan untuk menampilkan "children" komponen pada [nested route](/guide/routing#nested-routes)

Example:

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

To see an example, take a look at the [nested-routes example](/examples/nested-routes).
