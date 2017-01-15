---
title: Страницы
description: Папка pages позволяет создавать любой вид маршрута, просто создавая Vue-файлы. Эти компоненты обладают свойствами, с помощью которых можно легко создавать и поддерживать приложение.
---

> Папка `pages` позволяет создавать любой вид маршрута, просто создавая Vue-файлы. Эти компоненты обладают свойствами, с помощью которых можно легко создавать и поддерживать приложение.

## Специальные атрибуты

Каждая страница — это компонент Vue, но Nuxt.js ещё добавляет и специальные ключи, чтобы сделать процесс разработки приложения как можно проще.

Список всех доступных атрибутов

| Атрибут | Описание |
|-----------|-------------|
| data | Самый важный ключ, с тем же предназначением, что и [Vue data](https://vuejs.org/v2/api/#Options-Data), но может быть асинхронным и принимать контекст в виде аргумента. Пожалуйста, прочитайте про [асинхронные данные](/guide/async-data), чтобы понять, как именно это работает. |
| fetch | Используется для заполнения хранилища перед рендерингом страницы. Примерно как метод data, за исключением того, что значение data у компонента в данном случае не устанавливается. См. [метод fetch](/guide/vuex-store#the-fetch-method). |
| layout | Назначает шаблон, определённый в папке `layouts`. См. [шаблоны](/guide/layouts). |
| transition | Устанавливает переход для страницы. См. [переходы маршрутов](/guide/routes-transitions). |
| scrollToTop | Булевское значение, по-умолчанию — `false`. Используйте, если страница должна проскроллиться наверх перед рендерингом. Используется для [вложенных маршрутов](/guide/nested-routes). |
| validate | Функция-валидатор для [динамического маршрута](/guide/dynamic-routes#validate-route-params). |
| middleware | Устанавливает промежуточный код для конкретной страницы, который выполняется перед рендерингом страницы. См [промежуточный код маршрутов](/guide/routes-middleware). |


## Простая страница

Компонент страницы — это компонент Vue с дополнительной супер-силой. Сперва, давайте создадим простой компонент, показывающий красный заголовок "Hello World!"

Назовём первую страницу `pages/index.vue`:

```html
<template>
  <h1 class="red">Hello {{ name }}!</h1>
</template>

<script>
export default {
  data () {
    return { name: 'World' }
  }
}
</script>

<style>
.red {
  color: red;
}
</style>
```

## Использование пре-процессоров

Благодаря [vue-loader](http://vue-loader.vuejs.org/en/configurations/pre-processors.html) вы можете использовать любой тип пре-процессоров для `<template>`, `<script>` or `<style>`, просто добавив к ним атрибут `lang`.

Например, наша страница `pages/index.vue` будет использовать [Pug](https://github.com/pugjs/pug),
[CoffeeScript](http://coffeescript.org) и [Sass](http://sass-lang.com/):

```html
<template lang="pug">
  h1.red Hello {{ name }}!
</template>

<script lang="coffee">
module.exports = data: ->
  { name: 'World' }
</script>

<style lang="sass">
.red
  color: red
</style>
```

Чтобы использовать пре-процессоры, нужно просто установить их загрузчики для webpack:
```bash
npm install --save-dev pug@2.0.0-beta6 pug-loader coffee-script coffee-loader node-sass sass-loader
```

## Использование JSX

Чтобы использовать JSX в компонентах, установите плагин Babel для JSX:
```bash
npm install --save-dev babel-plugin-syntax-jsx babel-plugin-transform-vue-jsx babel-helper-vue-jsx-merge-props
```

Затем добавьте название плагина [transform-vue-jsx](https://github.com/vuejs/babel-plugin-transform-vue-jsx) в `nuxt.config.js`:
```js
module.exports = {
  build: {
    babel: {
      plugins: ['transform-vue-jsx']
    }
  }
}
```

Чтобы узнать больше об опции babel, прочитайте [конфигурацию build](/api/configuration-build).

Теперь вы можете использовать JSX в методе `render` у компонентов.

```html
<script>
export default {
  data () {
    return { name: 'World' }
  },
  render (h) {
    return <h1 class="red">{this.name}</h1>
  }
}
</script>
```

Узнайте больше в [разделе JSX](https://vuejs.org/v2/guide/render-function.html#JSX) документации к Vue.js.
