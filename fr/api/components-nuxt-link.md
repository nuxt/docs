---
title: "API: The <nuxt-link> Component"
description: Link the pages between them with nuxt-link.
---

# The &lt;nuxt-link&gt; Component (En)

> This component is used to link the page components between them.

<p style="width: 294px;position: fixed; top : 64px; right: 4px;" class="Alert Alert--orange"><strong>⚠Cette page est actuellement en cours de traduction française. Vous pouvez repasser plus tard ou <a href="https://github.com/vuejs-fr/nuxt" target="_blank">participer à la traduction</a> de celle-ci dès maintenant !</strong></p><p>At the moment, `<nuxt-link>` is the same as [`<router-link>`](https://router.vuejs.org/en/api/router-link.html), so we recommend you to see how to use it on the [vue-router documentation](https://router.vuejs.org/en/api/router-link.html).</p>

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
