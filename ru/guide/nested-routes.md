---
title: Вложеные маршруты
description: Nuxt.js позволяет вам создавать вложенные маршруты при помощи дочерних путей vue-router.
---

> Nuxt.js позволяет Вам создавать вложенные маршруты при помощи дочерних путей vue-router.

## Структура директорий
Чтобы определить вложенный маршрут, Вы должны создать файл Vue **с таким же имеменем как каталог** которые содержат Ваши дочерние представления.
> Не забывайте писать `<nuxt-child></nuxt-child>` в Вашем родительском файле Vue.

Эта струтура файлов:

```bash
pages/
--| users/
-----| _id.vue
--| users.vue
```
автоматически сгенерирует:

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
Сейчас Вы видите, что у дочерних элементов есть путь ':id?' который является дополнительным, но если Вы хотите сделать его обязательным, создайте 'index.vue' в каталоге 'users':

```bash
pages/
--| users/
-----| _id.vue
-----| index.vue
--| users.vue
```

Nuxt.js сгенерирует:

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

## Динамические вложенные пути
> Этот сценарий не так распространен, но с Nuxt.js он тоже возможен: наличие динамических дочерних элементов в динамических родителях.

Эта структура файлов:

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

автоматически сгенерирует:

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
