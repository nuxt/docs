---
title: "API: middleware 프로퍼티"
description: 어플리케이션의 특정 페이지에 대한 미들웨어 설정.
---

# middleware 프로퍼티

- 타입: `String` 또는 `Array`
  - Items: `String`

어플리케이션의 특정 페이지에 대한 미들웨어 설정.


## Named middleware

You can create named middleware by creating a file inside the `middleware/` directory, the file name will be the middleware name.

`middleware/authenticated.js`:

```js
export default function ({ store, redirect }) {
  // If the user is not authenticated
  if (!store.state.authenticated) {
    return redirect('/login')
  }
}
```

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

## Anonymous middleware

If you need to use a middleware only for a specific page, you can directly use a function for it (or an array of functions):

`pages/secret.vue`:

```html
<template>
  <h1>Secret page</h1>
</template>

<script>
export default {
  middleware ({ store, redirect }) {
    // 유저가 인증되지 않았다면
    if (!store.state.authenticated) {
      return redirect('/login')
    }
  }
}
</script>
```

To learn more about the middleware, see the [middleware guide](/guide/routing#middleware).

