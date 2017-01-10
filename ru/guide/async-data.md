---
title: Асинхронные данные
description: Nuxt.js supercharges the data method from vue.js to let you handle async operation before setting the component data.
description: Nuxt.js перехватывает метод data от vue.js, чтобы позволить обрабатать асинхронные задачи прежде, чем установить data.
---

>Nuxt.js *перехватывает* метод 'data' от vue.js, чтобы позволить обрабатывать асинхронные задачи прежде, чем установить data

## Метод `data`

`data` is called every time before loading the component (**only for pages components**). It can be called from the server-side or before navigating to the corresponding route. This method receives [the context](/api/pages-context) as the first argument, you can use it to fetch some data and return the component data.
`data` будет вызван каждый раз прежде, чем загрузить компонент (**только для компонентов страниц (pages)**). Это будет вызвано со стороны сервера или перед тем, как переместиться к соответствующему маршруту. Этот метод получает [контекст](/api/pages-context) как первый параметр, Вы можете использовать его, чтобы выбрать некоторые данные и возвратить составляющие данные.

<div class="Alert Alert--orange">**НЕЛЬЗЯ** получить доступ к полноценному контексту `this` внутри `data` потому что это вызывается **перед инициализацией** текущего компонента, т.е в самом начале.</div>

Чтобы сделать метод `data` асинхронным, nuxt.js предлагает Вам различные пути, выберите тот, который более знаком:

1. вернуть `Promise`, nuxt.js  будет ожидать обещания, которое будет resolved (разрешено) прежде, чем отобразить компонент.
2. Используйте [async/await](https://github.com/lukehoban/ecmascript-asyncawait) ([Подробности](https://zeit.co/blog/async-and-await))
3. Указать callback как второй параметр. Callback будет вызван как: `callback(err, data)`

### Вернуть Promise
```js
export default {
  data ({ params }) {
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
  async data ({ params }) {
    let { data } = await axios.get(`https://my-api/posts/${params.id}`)
    return { title: data.title }
  }
}
```

### Используя callback
```js
export default {
  data ({ params }, callback) {
    axios.get(`https://my-api/posts/${params.id}`)
    .then((res) => {
      callback(null, { title: res.data.title })
    })
  }
}
```

### Возврат объекта

Если не надо делать никакого асинхронного вызова, то можно просто возвратить объект:

```js
export default {
  data (context) {
    return { foo: 'bar' }
  }
}
```

### Отображение данных

Когда метод `data` установлен, можно отобразить данные внутри вашего шаблона также как и раньше:

```html
<template>
  <h1>{{ title }}</h1>
</template>
```

## Контекст

Для просмотра списка доступных ключей в 'контексте', смотрите на [API контекста страниц](/api/pages-context).

## Обработка ошибок

Nuxt.js добавит `error(params)` метод в `контекст`, и Вы сможете отобразить ошибки на странице. Также `params.statusCode` будет использован сервером чтобы указать реальный статус в заголовках ответа

Пример с `Promise`:
```js
export default {
  data ({ params, error }) {
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

Если Вы используете параметр 'callback', Вы можете вызвать его непосредственно с нужной ошибкой, и тогда nuxt.js вызовет 'ошибочный' метод:
```js
export default {
  data ({ params }, callback) {
    axios.get(`https://my-api/posts/${params.id}`)
    .then((res) => {
      callback(null, { title: res.data.title })
    })
    .catch((e) => {
      callback({ statusCode: 404, message: 'Post not found' })
    })
  }
}
```

Чтобы настроить ошибочную страницу, смотрите на [раздел Layout](/guide/layouts#error-page).
