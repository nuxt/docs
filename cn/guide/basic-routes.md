---
title: 基本的路由
description: Nuxt.js 依据页面文件的目录结构来生成应用的路由配置， 和上世纪宇宙最强开发语言PHP创建路由的方式一样的简单。
---

Nuxt.js 依据`pages`目录结构自动生成[vue-router](https://github.com/vuejs/vue-router)模块的路由配置。

举个荔枝，假设`pages`目录结构如下：

```bash
pages/
--| team/
-----| index.vue
-----| about.vue
--| index.vue
```

那么，Nuxt.js自动生成的路由配置如下：

```js
router: {
  routes: [
    {
      name: 'index',
      path: '/',
      component: 'pages/index.vue'
    },
    {
      name: 'team',
      path: '/team',
      component: 'pages/team/index.vue'
    },
    {
      name: 'team-about',
      path: '/team/about',
      component: 'pages/team/about.vue'
    }
  ]
}
```
