---
title: "API: validate 方法"
description: Nuxt.js 可以让你在动态路由对应的页面组件中配置一个校验方法用于校验动态路由参数的有效性。
---

# validate 方法

> Nuxt.js 可以让你在动态路由对应的页面组件中配置一个校验方法用于校验动态路由参数的有效性。

- **类型：** `Function`

```js
validate({ params, query }) {
  return true // 如果参数有效
  return false // 参数无效，Nuxt.js 停止渲染当前页面并显示错误页面
}
```

Nuxt.js 可以让你在动态路由对应的页面组件（本例为： `pages/users/_id.vue`）中配置一个校验方法。

如果校验方法返回的值不为 `true`， Nuxt.js 将自动加载显示 404 错误页面。

```js
export default {
  validate ({ params }) {
    // Must be a number
    return /^\d+$/.test(params.id)
  }
}
```

你也可以在validate 方法中校验 [store](/guide/vuex-store) 的数据 (如果 store 此前在 [nuxtServerInit 方法](/guide/vuex-store#nuxtServerInit-方法) 中被设置了的话):

```js
export default {
  validate ({ params, store }) {
    // 校验 `params.id` 是否存在
    return store.state.categories.some((category) => category.id === params.id)
  }
}
```
