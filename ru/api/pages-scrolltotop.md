---
title: "API: The scrollToTop Property"
description: The scrollToTop property lets you tell nuxt.js to scroll to the top before rendering the page.
---

# The scrollToTop Property

> The scrollToTop property lets you tell nuxt.js to scroll to the top before rendering the page.

- **Type:** `Boolean` (default: `false`)

By default, nuxt.js scrolls to the top when you go to another page, but with children routes, nuxt.js keeps the scroll position. If you want to tell nuxt.js to scroll to the top when rendering your child route, set `scrollToTop: true`:

```html
<template>
  <h1>My child component</h1>
</template>

<script>
export default {
  scrollToTop: true
}
</script>
```

If you want to overwrite the default scroll behavior of nuxt.js, take a look at the [scrollBehavior option](/api/configuration-router#scrollBehavior).
