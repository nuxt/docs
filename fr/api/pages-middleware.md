---
title: "API: La propriété middleware"
description: Définit le middleware pour une page spécifique de l'application.
---

# La propriété middleware

- Type: `String` ou `Array`
  - Items: `String`

Définit le middleware pour une page spécifique de l'application.

Exemple:

`pages/secret.vue`
```html
<template>
  <h1>Page secrète</h1>
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
  // Si l'utilisateur n'est pas authentifié
  if (!store.state.authenticated) {
    return redirect('/login')
  }
}
```

Pour en savoir plus sur les middleware, voir le [guide middleware](/guide/routing#middleware).
