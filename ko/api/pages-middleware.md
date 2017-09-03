---
title: "API: middleware 프로퍼티"
description: 어플리케이션의 특정 페이지에 대한 미들웨어 설정.
---

# middleware 프로퍼티

- 타입: `String` 또는 `Array`
  - Items: `String`

어플리케이션의 특정 페이지에 대한 미들웨어 설정.

예제:

`pages/secret.vue`
```html
<template>
  <h1>비밀 페이지</h1>
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
  // 사용자가 인증을 하지 않은 경우.
  if (!store.state.authenticated) {
    return redirect('/login')
  }
}
```

더 많은 middleware에 대해 배우고 싶으시다면, [middleware 가이드](/guide/routing#middleware)를 참고해주시기 바랍니다.
