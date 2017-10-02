---
title: "API: The middleware Property"
description: Set the middleware for a specific page of the application.
---

# The middleware Property (En)

- Type: `String` or `Array`
  - Items: `String`

<p style="width: 294px;position: fixed; top : 64px; right: 4px;" class="Alert Alert--orange"><strong>⚠Cette page est actuellement en cours de traduction française. Vous pouvez repasser plus tard ou <a href="https://github.com/vuejs-fr/nuxt" target="_blank">participer à la traduction</a> de celle-ci dès maintenant !</strong></p><p>Set the middleware for a specific page of the application.</p>

Example:

`pages/secret.vue`
```html
<template>
  <h1>Secret page</h1>
</template>

<script>
export default {
  middleware: 'authenticated'
}
</script>
```

`middleware/authenticated.js`
```js
export default function ({ store, redirect }) {
  // If the user is not authenticated
  if (!store.state.authenticated) {
    return redirect('/login')
  }
}
```

To learn more about the middleware, see the [middleware guide](/guide/routing#middleware).
