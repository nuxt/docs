---
title: Повторяющиеся meta-теги
description: Повторяются мета-теги в Nuxt.js?
---

# Повторяющиеся meta-теги?

Это «особенность» плагина [vue-meta](https://github.com/declandewet/vue-meta), пожалуйста посмотрите [документацию элементов head](/guide/views#html-head).

> Для избежания дублирования, при использовании в дочерних компонентах, указывайте уникальный идентификатор `hid`. [Подробнее](https://github.com/declandewet/vue-meta#lists-of-tags) об этом.

Для meta-тега description, вам нужно добавить уникальный идентификатор `hid`, чтобы vue-meta смогла определить необходимость перезписи тега по умолчанию.

Ваш `nuxt.config.js`:
```js
...head: {
    title: 'starter',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'keywords', content: 'keyword 1, keyword 2'},
      { hid: 'description', name: 'description', content: 'Это описание для страниц по умолчанию.'}
    ],
  },
...
```

А затем на необходимой странице:
```js
export default {
  head () {
    return {
      title: `Страница 1 (${this.name}-side)`,
      meta: [
        { hid: 'description', name: 'description', content: 'Описание для Страницы 1' }
      ]
    }
  }
}
```

Подробнее как использовать свойство `head` на ваших страницах можно изучить в [документации HTML head](/guide/views#html-head).
