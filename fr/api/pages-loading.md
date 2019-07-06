---
title: "API: The loading Property (EN)"
description: The `loading` property gives you the option to disable the default loading progress bar on a specific page.
---

# The loading Property (EN)

> The loading property gives you the option to disable the default loading progress bar on a specific page.

- **Type:** `Boolean` (default: `true`)

By default, Nuxt.js uses its own component to show a progress bar between the routes.

You can disable or customize it globally through the [Configuration's loading option](/api/configuration-loading), but also disable it for specific pages by setting the `loading` property to `false` :

```html
<template>
  <h1>My page</h1>
</template>

<script>
export default {
  loading: false
}
</script>
```

You can find an official example using this property [here](/examples/custom-page-loading).

<p style="width: 294px;position: fixed; top : 64px; right: 4px;" class="Alert Alert--orange"><strong>⚠Cette page est actuellement en cours de traduction française. Vous pouvez repasser plus tard ou <a href="https://github.com/vuejs-fr/nuxt" target="_blank">participer à la traduction</a> de celle-ci dès maintenant !</strong></p>
