---
title: 自定义路由
description: Nuxt.js 的路由自定义示例
github: custom-routes
livedemo: https://custom-routes.nuxtjs.org
---

## 文档

> Nuxt.js 基于 vue-router，因此你可以自定义路由。:rocket:

### 使用

在 `nuxt.config.js` 里添加你自定义的路由：
```js
module.exports = {
  router: {
    routes: [
      { path: '/users/:id', component: 'pages/user' }
    ]
  }
}
```

| 属性字段 | 可选？ | 定义 |
|------|------------|-----------|
| `path` | **必填项** | 路由的路径。它支持动态映射，可以参考 [vue-router 使用文档](https://router.vuejs.org/en/essentials/dynamic-matching.html)。 |
| `component` | **必填项** | `.vue` 组件的文件路径。如果是相对地址的话，请从 app 目录开始。 |
| `name` | 可选 | 路由的名称。使用 `<router-link>` 链接路由时有用，可以参考 [vue-router 使用文档](https://router.vuejs.org/en/essentials/named-routes.html)。 |
| `meta` | 可选 | 让你能定义一些字段值，在被路由的组件内使用（可以在 `data` 和 `fetch` 的上下文参数的 `route.meta` 访问得到）。参考 [vue-router 使用文档](https://router.vuejs.org/en/advanced/meta.html)。 |
| `children` | 可选 | *不支持* |

### 隐藏页面

>如果你不想 nuxt.js 给某个页面创建路由的话，你只需重命名该页面文件，**在文件名的最前面加下划线 _ 即可**。

比如我有一个页面 `pages/user.vue`，但我不想 nuxt.js 给它创建 `/user` 路由。做法就是重命名成 `pages/_user.vue` 就可以啦！

然后你可以在 `nuxt.config.js` 更改组件的路径：
```js
// ...
  { path: '/users/:id', component: 'pages/_user' }
// ...
```
