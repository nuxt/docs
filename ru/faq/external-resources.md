---
title: Внешние ресурсы
description: Как использовать внешние ресурсы с Nuxt.js?
---

# Как использовать внешние ресурсы?

## Глобальная настройка

Укажите необходимые файлы ресурсов в файле `nuxt.config.js`:

```js
module.exports = {
  head: {
    script: [
      { src: 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js' }
    ],
    link: [
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto' }
    ]
  }
}
```

## Локальная настройка

Укажите необходимые файлы ресурсов в файле `.vue` находящемся в каталоге `pages/`:

```html
<template>
  <h1>Страница на которой подключены jQuery и шрифт Roboto</h1>
</template>

<script>
export default {
  head: {
    script: [
      { src: 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js' }
    ],
    link: [
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto' }
    ]
  }
}
</script>

<style scoped>
h1 {
  font-family: Roboto, sans-serif;
}
</style>
```
