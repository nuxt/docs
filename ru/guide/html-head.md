---
title: HTML мета-теги
description: Nuxt.js использует vue-meta для обновления заголовков и html-атрибутов приложения.
---

Nuxt.js использует [vue-meta](https://github.com/nuxt/vue-meta) заголовков и html-атрибутов приложения.

Nuxt.js конфигурирует `vue-meta` с такими опциями:
```js
{
  keyName: 'head', // название опции в компоненте, в котором vue-meta ищет информацию для meta
  attribute: 'n-head', // название атрибута vue-meta, добавляемое к тегам, за которыми он наблюдает
  ssrAttribute: 'n-head-ssr', // название атрибута, которое позволяет vue-meta определить, что meta информация уже была установлена сервером
  tagIDKeyName: 'hid' // название свойства, которое позволяет vue-meta определить, перезаписать или добавить тег
}
```

## Заголовок `title`

Для установки заголовка страницы просто добавьте 'head.title' в компонент страницы.

Установим название для страницы 'pages/index.vue':

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

## Мета-теги

Для просмотра полного списка параметров для `head`, пожалуйста, прочитайте [документацию по vue-meta](https://vue-meta.nuxtjs.org/api/#metainfo-properties).

К примеру, установим свой viewport и шрифт Google:
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

## Использование данных страницы

Вероятно, вы захотите использовать данные компонента, чтобы динамически менять заголовки. Например, используя название статьи для заголовка страницы. В этом случае просто используйте `head` как функцию, тогда вы сможете использовать `this` внутри этой функции, чтобы получить доступ к `data`.

Пример вывода заголовка статьи:
```html
<script>
export default {
  async data ({ params }) {
    // загрузит статью из API
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

## Базовые значения заголовков
Nuxt.js позволяет определить базовое значение meta-тегов для всего приложения в 'nuxt.config.js', используя свойство 'head':

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

<div class="Alert">

Чтобы избежать любого дублирования в дочерних компонентах, создайте уникальный идентификатор со свойством `hid`, [читать подробнее](https://vue-meta.nuxtjs.org/api/#tagidkeyname).

</div>
