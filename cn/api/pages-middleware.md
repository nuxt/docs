---
title: "API: middleware 属性"
description: Documentation is coming soon.
---

# middleware 属性

类型: String 或 Array
Items: String 

在应用中的特定页面设置中间件 

例子: 
`pages/secret.vue` 
```vue
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
```javascript
export default function ({ store, redirect }) {
  // If the user is not authenticated
  if (!store.state.authenticated) {
    return redirect('/login')
  }
}
``` 

想了解更多关于使用中间件的信息，请移步 [中间件指引](https://nuxtjs.org/guide/routing#middleware)。
