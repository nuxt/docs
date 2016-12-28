---
title: Nested Routes
description: Nuxt.js lets you create nested route by using the children routes of vue-router.
---

> Nuxt.js lets you create nested route by using the children routes of vue-router.

## Directory Structure

To define a nested route, you need to create a Vue file with the **same name as the directory** which contain your children views.
> Don't forget to write `<nuxt-child></nuxt-child>` inside your parent Vue file.

This file tree:

```bash
pages/
--| users/
-----| _id.vue
--| users.vue
```

will automatically generate:

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

As you can see the children has the path `:id?` which makes it optional, if you want to make it required, create an `index.vue` file in the `users` directory:

```bash
pages/
--| users/
-----| _id.vue
-----| index.vue
--| users.vue
```

Nuxt.js will generate:

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

## Dynamic Nested Routes

> This scenario should not often append, but it is possible with Nuxt.js: having dynamic children inside dynamic parents.

This file tree:

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

will automatically generate:

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
