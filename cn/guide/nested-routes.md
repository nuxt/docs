---
title: 内套子路由
description: 你可以通过 vue-router 的子路由创建 Nuxt.js 应用的内嵌子路由。
---

> 你可以通过 vue-router 的子路由创建 Nuxt.js 应用的内嵌子路由。

## 目录结构

创建内嵌子路由，你需要添加一个 Vue 文件，同时添加一个**与该文件同名**的目录用来存放子视图。

> 别忘了在父级 Vue 文件内增加 `<nuxt-child></nuxt-child>`。

文件结构如：

```bash
pages/
--| users/
-----| _id.vue
--| users.vue
```

Nuxt.js 生成对应的路由配置如下：

```js
router: {
  routes: [
    {
      path: '/users',
      component: 'pages/users.vue',
      children: [
        {
          path: ':id?',
          component: 'pages/users/_id.vue',
          name: 'users-id'
        }
      ]
    }
  ]
}
```

如你所见，子路由配置里的 `:id?` 表示该子路由是可选的，如何你想设置成必选的，可以在 `users` 目录下添加一个 `index.vue` 文件。

文件结构变成：
```bash
pages/
--| users/
-----| _id.vue
-----| index.vue
--| users.vue
```

Nuxt.js 生成对应的路由配置如下：

```js
router: {
  routes: [
    {
      path: '/users',
      component: 'pages/users.vue',
      children: [
        {
          path: '',
          component: 'pages/users/index.vue',
          name: 'users'
        },
        {
          path: ':id',
          component: 'pages/users/_id.vue',
          name: 'users-id'
        }
      ]
    }
  ]
}
```

## 动态内嵌子路由

> 这个应用场景比较少见，但是 Nuxt.js 仍然支持：在动态路由下配置动态子路由。

举个栗子，假设页面的文件目录结构如下：

```bash
pages/
--| _category/
-----| _subCategory/
--------| _id.vue
--------| index.vue
-----| _subCategory.vue
-----| index.vue
--| _category.vue
--| index.vue
```

Nuxt.js 生成对应的路由配置为：

```js
router: {
  routes: [
    {
      path: '/',
      component: 'pages/index.vue',
      name: 'index'
    },
    {
      path: '/:category',
      component: 'pages/_category.vue',
      children: [
        {
          path: '',
          component: 'pages/_category/index.vue',
          name: 'category'
        },
        {
          path: ':subCategory',
          component: 'pages/_category/_subCategory.vue',
          children: [
            {
              path: '',
              component: 'pages/_category/_subCategory/index.vue',
              name: 'category-subCategory'
            },
            {
              path: ':id',
              component: 'pages/_category/_subCategory/_id.vue',
              name: 'category-subCategory-id'
            }
          ]
        }
      ]
    }
  ]
}
```
