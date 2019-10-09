---
title: "API:key 属性"
description: 设置内部`<router-view>`组件的`key`属性
---

# key 属性

> 设置内部`<router-view>`组件的`key`属性
- **类型:** `String` 或 `Function`

`key`属性会传递给`<router-view>`，这对于在动态路由页面和不同路由切换时（数据准确性、性能优化及用户体验提升）很有用。不同的`key`会使页面组件重新渲染。

有几种方法可以设置`key`。有关更多详细信息，请参阅[nuxt组件](/api/components-nuxt)中的`nuxtChildKey`属性。

```js
export default {
  key(route) {
    return route.fullPath
  }
}
```
