---
title: "API: The <nuxt-link> Component"
description: Link the pages between them with nuxt-link.
---

# The &lt;nuxt-link&gt; Component

> This component is used to link the page components between them.

At the moment, `<nuxt-link>` is the same as [`<router-link>`](https://router.vuejs.org/en/api/router-link.html), so we recommend you to see how to use it on the [vue-router documentation](https://router.vuejs.org/en/api/router-link.html).

Example (`pages/index.vue`):

```html
<template>
  <div>
    <h1>Home page</h1>
    <nuxt-link to="/about">About</nuxt-link>
  </div>
</template>
```

In the future, we will add features to the nuxt-link component, like pre-fetching on the background for improving the responsiveness of nuxt.js applications.
