---
title: 'API: '
description: Menghubungkan antar halaman menggunakan nuxt-link.
---

# Komponen <nuxt-link>

> Komponen ini digunakan sebagai penghubung antar halaman.

At the moment, `<nuxt-link>` is the same as [`<router-link>`](https://router.vuejs.org/en/api/router-link.html), so we recommend you to see how to use it on the [Vue Router documentation](https://router.vuejs.org/en/api/router-link.html).

Contoh (`pages/index.vue`):

```html
<template>
  <div>
    <h1>Home page</h1>
    <nuxt-link to="/about">About</nuxt-link>
  </div>
</template>
```

In the future, we will add features to the `<nuxt-link>` component, like pre-fetching on the background for improving the responsiveness of Nuxt.js Applications.
