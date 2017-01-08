---
title: Basic Routes
description: Nuxt.js use the file-system to generate the routes of your web applications, it's as simple as PHP to create routes.
---
Nuxt.js автоматически генерирует конфигурацию [vue-router](https://github.com/vuejs/vue-router) согласно структуре файлов и каталогов в директории `pages`

Стрктура:

```bash
pages/
--| team/
-----| index.vue
-----| about.vue
--| index.vue
```

автоматически сгенерирует:

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
