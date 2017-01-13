---
title: Основы маршрутизации
description: Nuxt.js использует файловую систему для генерации маршрутов веб-приложения, это так же просто, как в PHP.
---

Nuxt.js автоматически генерирует конфигурацию [vue-router](https://github.com/vuejs/vue-router) согласно структуре файлов в папке `pages`.

Структура файлов:

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
