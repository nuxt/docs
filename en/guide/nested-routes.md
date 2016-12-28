---
title: Nested Routes
description: To define a nested route, you need to create a .vue file with the same name as the directory which contain your children views.
---

To define a nested route, you need to create a `.vue` file with the **same name as the directory** which contain your children views.
> Don't forget to put `<nuxt-child></nuxt-child>` inside your parent `.vue` file.

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

## Dynamic Nested Routes

This file tree:

```bash
pages/
--| posts/
-----| _slug/
--------| _name.vue
--------| comments.vue
-----| _slug.vue
-----| index.vue
--| posts.vue
```

will automatically generate:

```js
router: {
  routes: [
    {
      path: '/posts',
      component: 'pages/posts.vue',
      children: [
        {
          path '',
          component: 'pages/posts/index.vue',
          name: 'posts'
        },
        {
          path: ':slug',
          component: 'pages/posts/_slug.vue',
          children: [
            {
              path: 'comments',
              component: 'pages/posts/_slug/comments.vue',
              name: 'posts-slug-comments'
            },
            {
              path: ':name',
              component: 'pages/posts/_slug/_name.vue',
              name: 'posts-slug-name'
            }
          ]
        }
      ]
    }
  ]
}
```
