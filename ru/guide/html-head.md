---
title: HTML Мета теги
description: Nuxt.js использует vue-meta для обновления содержимого headers и html атрибутов приложения.
---

Nuxt.js использует [vue-meta](https://github.com/declandewet/vue-meta) для обновления содержимого headers и html атрибутов приложения.

Nuxt.js конфигурирует `vue-meta` с такими опциями:
```js
{
  keyName: 'head', // имя опции указанное в компоненте, в котором vue-meta ищет meta информацию.
  attribute: 'n-head', // название атрибута vue-meta добавляемое к тегам, за которыми он наблюдает
  ssrAttribute: 'n-head-ssr', // название атрибута, которое позволяет vue-meta понимать, что meta информация уже была представлена сервером
  tagIDKeyName: 'hid' // имя свойства, на основе которого vue-meta определит, перезаписать или добавить тег (Аналог id)
}
```

## Заголовок (title)

Чтобы обновить заголовок страницы, просто добавьте 'head.title' в своем компоненте страницы.

Установим название страницы 'pages/index.vue':

```html
<template>
  <h1>Домашнаяя страница</h1>
</template>

<script>
export default {
  head: {
    title: 'Домашнаяя страница'
  }
}
</script>
```

## Мета теги

Чтобы понять весь список опций кдоступных для `head` прочтите [vue-meta документацию](https://github.com/declandewet/vue-meta#recognized-metainfo-properties).

К примеру установим свой viewport и шрифт из Google font:
```js
head: {
  meta: [
    { charset: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' }
  ],
  link: [
    { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto' }
  ]
}
```

## Используя `data` компонента

Можно использовать `data` компонента, чтобы выводить на экран различные динамические заголовки, например такой как заголовок статьи. Просто используйте 'head' как функцию, и Вы можете использовать 'this' внутри этой функции чтобы получить доступ к `data`.

Пример вывода заголовка статьи:
```html
<script>
export default {
  async data ({ params }) {
    // возъмем статью из API
    let { data } = await axios.get(`https://my-api/posts/${params.id}`)
    return { title: data.title }
  },
  head () {
    return {
      title: this.title
    }
  }
}
</script>
```

## Meta - базовые значения
Nuxt.js позволяет определить базовое значение meta для всего приложения в 'nuxt.config.js', используя свойство 'head':

```js
module.exports = {
  head: {
    titleTemplate: '%s - Nuxt.js',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Мета описание' }
    ]
  }
}
```

<p class="Alert">Чтобы избежать любого дублирования, в дочернем компоненте, дайте уникальный идентификатор со 'скрытым' ключом, [читать подробнее](https://github.com/declandewet/vue-meta#lists-of-tags).</p>
