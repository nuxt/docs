---
title: Динамическая маршрутизация
description: Чтобы объявить динамический маршрут с параметром (param) в Nuxt.js, необходимо создать Vue файл с префиксом: _
---

> Чтобы объявить динамический маршрут с param, Вы должны определить файл Vue **с префиксом нижнее подчеркивание**.

## Структура директорий

Структура файлов:

```bash
pages/
--| users/
-----| _id.vue
-----| index.vue
```

автоматически сгенерирует:

```js
router: {
  routes: [
    {
      name: 'users',
      path: '/users',
      component: 'pages/users/index.vue'
    },
    {
      name: 'users-id',
      path: '/users/:id',
      component: 'pages/users/_id.vue'
    }
  ]
}
```

## Валидация параметров пути

```js
validate({ params, query }) {
  return true // если этот параметр валиден
  return false // остановит Nuxt.js, чтобы отобразить маршрут и вывести на экран страницу ошибки
}
```

Nuxt.js позволяет Вам определять метод проверки валидности в своем динамическом компоненте пути (В этом примере: `pages/users/_id.vue`).
Если метод валидации не возвратит `true`, Nuxt.js автоматически отобразит страницу с ошибкой 404.

```js
<script>
export default {
  validate ({ params }) {
    // Должен быть номером
    return /^\d+$/.test(params.id)
  }
}
</script>
```
