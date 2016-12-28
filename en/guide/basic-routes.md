---
title: Basic Routes
description: Nuxt.js generates automatically the vue-router configuration according to your file tree of .vue files inside the pages directory.
---

> Nuxt.js generates automatically the `vue-router` configuration according to your file tree of `.vue` files inside the `pages/` directory.

This file tree:

```bash
pages/
--| team/
-----| index.vue
-----| about.vue
--| index.vue
```

will automatically generate:

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
