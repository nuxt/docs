---
title: API: свойство промежуточной обработки (middleware)
description: Установите промежуточную обработку для конкретной страницы приложения.
---

- Тип: `String`, `Array` или `Function`
    - Элементы: `String` или `Function`

Установите промежуточную обработку для конкретной страницы приложения.

## Именованная промежуточная обработка

Вы можете создать промежуточную обработку, создав файл в каталоге `middleware/` , имя файла будет именем промежуточной обработки.

`middleware/authenticated.js`:

```js
export default function ({ store, redirect }) {
  // Если пользователь не аутентифицирован
  if (!store.state.authenticated) {
    return redirect('/login')
  }
}
```

`pages/secret.vue`:

```html
<template>
  <h1>Secret page</h1>
</template>

<script>
export default {
  middleware: 'authenticated'
}
</script>
```

## Анонимная промежуточная обработка

Если вам нужно использовать промежуточную обработку только для конкретной страницы, вы можете напрямую использовать функцию для нее (или массив функций):

`pages/secret.vue`:

```html
<template>
  <h1>Secret page</h1>
</template>

<script>
export default {
  middleware ({ store, redirect }) {
    // Если пользователь не аутентифицирован
    if (!store.state.authenticated) {
      return redirect('/login')
    }
  }
}
</script>
```

Чтобы узнать больше о промежуточной обработке, см. [руководство по middleware](/guide/routing#middleware).
