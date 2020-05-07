---
title: Асинхронные данные
description: Возможно вы захотите получить данные и выполнить их отрисовку на стороне сервера. Nuxt.js добавляет метод `asyncData`, который позволяет вам выполнить асинхронные операции перед установкой `data` компонента.
---

> Возможно вы захотите получить данные и выполнить их отрисовку на стороне сервера. Nuxt.js добавляет метод `asyncData`, который позволяет вам выполнить асинхронные операции перед инициализацией компонента.

<div>
  <a href="https://vueschool.io/courses/async-data-with-nuxtjs?friend=nuxt" target="_blank" class="Promote">
    <img src="/async-data-with-nuxtjs.png" srcset="/async-data-with-nuxtjs-2x.png 2x" alt="AsyncData от vueschool"/>
    <div class="Promote__Content">
      <h4 class="Promote__Content__Title">Асинхронные данные в Nuxt.js</h4>
      <p class="Promote__Content__Description">Научитесь управлять асинхронными данными в Nuxt.js.</p>
      <p class="Promote__Content__Signature">Видео курсы созданные VueSchool для поддержки разработки Nuxt.js.</p>
    </div>
  </a>
</div>

## Метод asyncData

Иногда вам нужно получить данные и выполнить их предварительную отрисовку на стороне сервера без использования хранилища. 
`asyncData` вызывается каждый раз перед загрузкой компонента **страницы**.
Метод будет вызван единожды на стороне сервера (при первом запросе к Nuxt приложению) и на стороне клиента при переходе по маршрутам. 
Этот метод принимает [context](/api/context) как первый аргумент, вы можете использовать его для получения нужных данных и Nuxt.js объединит их с `data` компонента.

Nuxt.js автоматически объединит возвращаемый объект с `data` компонента.

<div class="Alert Alert--orange">

Вы **НЕ** имеете доступ к корневому экземпляру через `this` внутри `asyncData` так как он вызывается **перед инициализацией** компонента.

</div>

Nuxt.js предлагает несколько вариантов использования `asyncData`. Выберите наиболее знакомый:

1. Возвращая `Promise`. Nuxt.js будет ожидать его состояния resolved перед тем, как выполнить отрисовку компонента.
2. Используя директивы [async/await](https://javascript.info/async-await) ([подробнее об этом](https://zeit.co/blog/async-and-await))

<div class="Alert Alert--grey">

Мы используем [axios](https://github.com/mzabriskie/axios) для выполнения изоморфных HTTP запросов, мы <strong>очень рекомендуем</strong> использовать наш [модуль axios](https://axios.nuxtjs.org/) для ваших проектов на Nuxt.

</div>

Если вы подключаете `axios` прямо из `node_modules` и используете `axios.interceptors` для добавления перехватчиков для обработки данных, убедитесь, что создали экземпляр перед добавлением перехватчиков. Если этого не сделать, то при обновлении страницы на сервере перехватчики будут добавляться несколько раз, что приведет к ошибке данных.

```js
import axios from 'axios'
const myaxios = axios.create({
  // ...
})
myaxios.interceptors.response.use(function (response) {
  return response.data
}, function (error) {
  // ...
})
```

### Возвращая Promise

```js
export default {
  asyncData ({ params }) {
    return axios.get(`https://my-api/posts/${params.id}`)
      .then((res) => {
        return { title: res.data.title }
      })
  }
}
```

### Используя async/await

```js
export default {
  async asyncData ({ params }) {
    const { data } = await axios.get(`https://my-api/posts/${params.id}`)
    return { title: data.title }
  }
}
```


### Отображение данных

Результат asyncData будет **объединён** с `data`.
Вы можете отображать данные внутри вашего шаблона как обычно:

```html
<template>
  <h1>{{ title }}</h1>
</template>
```

## Аргумент `Context`

Чтобы увидеть список доступных ключей `context`, взгляните на [API контекста страниц](/api/context).

### Используя объекты `req`/`res`

Когда `asyncData` вызывается на стороне сервера, вы имеете доступ к объектам `req` и `res` пользовательского запроса.

```js
export default {
  async asyncData ({ req, res }) {
    // Проверьте на стороне сервера прежде, чем использовать req и res
    if (process.server) {
      return { host: req.headers.host }
    }

    return {}
  }
}
```

### Доступ к данным динамического маршрута

Вы также можете использовать параметр `context` для доступа к данным динамического маршрута!
К примеру, параметры динамического маршрута могут быть получены с использованием имени файла или папки.
Если вы создаете файл с именем `_slug.vue` в папке`pages`, вы можете получить доступ к значениям через `context.params.slug`:

```js
export default {
  async asyncData ({ params }) {
    const slug = params.slug // Когда вызываем /abc slug будет "abc"
    return { slug }
  }
}
```


### Отслеживание изменений query-параметров

Метод `asyncData` по умолчанию **не вызывается** при изменении query-параметра.
Если вы хотите изменить это поведение, например, для постраничной навигации, то
вы можете настроить параметры, которые должны отслеживаться в свойстве `watchQuery` вашего компонента страницы.
Узнайте больше на странице [API `watchQuery` страницы](/api/pages-watchquery).

## Обработка ошибок

Nuxt.js добавляет метод `error(params)` в `context`, который вы можете вызвать для отображения страницы ошибки. `params.statusCode` также будет использоваться для визуализации подходящего кода ошибки со стороны сервера.

Пример с `Promise`:

```js
export default {
  asyncData ({ params, error }) {
    return axios.get(`https://my-api/posts/${params.id}`)
      .then((res) => {
        return { title: res.data.title }
      })
      .catch((e) => {
        error({ statusCode: 404, message: 'Post not found' })
      })
  }
}
```


Для изменения вида страницы ошибки взгляните на [руководство по представлениям](/guide/views#layouts) .
