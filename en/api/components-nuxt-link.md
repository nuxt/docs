---
title: "API: The <nuxt-link> Component"
description: Link the pages between them with nuxt-link.
---

# The &lt;nuxt-link&gt; Component

> This component is used to provide navigations between page components.

The `<nuxt-link>` component is an essential of Nuxt. It **should be used to navigate** through your application, similar to the `<router-link>` component in a traditional Vue App. In fact, `<nuxt-link>` is a wrapper component for [`<router-link>`](https://router.vuejs.org/api/#router-link). That means it takes the same properties and can be used in the same manner. Read the [Vue Router documentation](https://router.vuejs.org/api/#router-link) for more information.

Example (`pages/index.vue`):

```html
<template>
  <div>
    <h1>Home page</h1>
    <nuxt-link to="/about">About (internal link that belongs to the Nuxt App)</nuxt-link>
    <a href="https://nuxtjs.org">External Link to another page</a>
  </div>
</template>
```

In the future, we will add features to the `<nuxt-link>` component, like pre-fetching on the background for improving the responsiveness of Nuxt.js Applications.
