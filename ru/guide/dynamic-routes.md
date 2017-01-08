---
title: Динамический роутинг
description: Чтобы объвить денимический роуты с параметром (param) в Nuxt.js, вам необходимо создать Vue файл с префиксом: _
---

> Чтобы определить динамический маршрут с помощью param, Вы должны определить файл Vue **prefixed by an underscore**.

## Directory Structure

Это струтура файлов:

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

## Валидация параметров роута

```js
validate({ params, query }) {
  return true // если этот параметр валиден
  return false // остановит Nuxt.js, чтобы представить маршрут и вывести на экран ошибочную страницу
}
```

Nuxt.js позволяет Вам определять метод проверки валидности в своем динамическом компоненте маршрута (В этом примере: `pages/users/_id.vue`).
Если метод валидации не возвратит `true`, Nuxt.js автоматически отобразит 404 страницу ошибки.

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
