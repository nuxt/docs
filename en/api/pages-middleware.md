---
title: "API: The middleware Property"
description: Set the middleware for a specific page of the application.
---

# The middleware Property

- Type: `String` or `Array`
  - Items: `String`

Set the middleware for a specific page of the application.

Example:

`pages/secret.vue`:

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

`middleware/authenticated.js`:

```js
export default function ({ store, redirect }) {
  // If the user is not authenticated
  if (!store.state.authenticated) {
    return redirect('/login')
  }
}
```

To learn more about the middleware, see the [middleware guide](/guide/routing#middleware).
