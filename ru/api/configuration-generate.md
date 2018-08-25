---
title: 'API: свойство `generate`'
описание: Настройте генерацию статического веб-приложение из универсального веб-приложения.
---

# Свойство generate

- Тип: `Object`

> Настройте генерацию статического веб-приложение из универсального веб-приложения.

При запуске `nuxt generate` или вызове `nuxt.generate()`, Nuxt.js будет использовать конфигурацию, определенную в свойстве `generate`.

## dir

- Тип: `String`
- По умолчанию:  `'dist'`

Имя папки создаваемой `nuxt generate`.

## fallback

- Тип: `String` или `Boolean`
- По умолчанию:  `'200.html'`

Путь к SPA fallback. Этот файл можно использовать при развертывании сайтов на статическом хостинге. Он возвращается к режиму «spa», когда маршрут не сгенерирован.

## interval

- Тип: `Number`
- По умолчанию:  `0`

Интервал между двумя циклами рендеринга, чтобы избежать убийства API вызовами из веб-приложения.

## minify

- Тип: `Object`
- По умолчанию: 

```js
minify: {
  collapseBooleanAttributes: true,
  collapseWhitespace: false,
  decodeEntities: true,
  minifyCSS: true,
  minifyJS: true,
  processConditionalComments: true,
  removeAttributeQuotes: false,
  removeComments: false,
  removeEmptyAttributes: true,
  removeOptionalTags: true,
  removeRedundantAttributes: true,
  removeScriptTypeAttributes: false,
  removeStyleLinkTypeAttributes: false,
  removeTagWhitespace: false,
  sortAttributes: true,
  sortClassName: false,
  trimCustomFragments: true,
  useShortDocТип: true
}
```

Вы можете изменить конфигурацию [html-minifier](https://github.com/kangax/html-minifier), используемую Nuxt.js для минимизации HTML-файлов, созданных во время генерации.

## routes

- Тип: `Array`

[Dynamic routes](/guide/routing#dynamic-routes) игнорируются командой `generate`.

Example:

```bash
-| pages/
---| index.vue
---| users/
-----| _id.vue
```

Nuxt.js сгенерирует только маршрут `/`.

Если вы хотите, чтобы Nuxt.js генерировал маршруты с динамическими параметрами, вам необходимо подать Array динамических маршрутов.

Добавляем маршруты для `/users/:id` в `nuxt.config.js`:

```js
module.exports = {
  generate: {
    routes: ['/users/1', '/users/2', '/users/3']
  }
}
```

Затем, когда мы запускаем `nuxt generate`:

```bash
[nuxt] Generating...
[...]
nuxt:render Rendering url / +154ms
nuxt:render Rendering url /users/1 +12ms
nuxt:render Rendering url /users/2 +33ms
nuxt:render Rendering url /users/3 +7ms
nuxt:generate Generate file: /index.html +21ms
nuxt:generate Generate file: /users/1/index.html +31ms
nuxt:generate Generate file: /users/2/index.html +15ms
nuxt:generate Generate file: /users/3/index.html +23ms
nuxt:generate HTML Files generated in 7.6s +6ms
[nuxt] Generate done
```

Отлично, но что, если у нас есть **динамические параметры**?

1. Подайте `Function`, который возвращает `Promise`.
2. Подайте `Function` который принимает первым аргументом `callback(err, params)`.

### Функция, которая возвращает Promise

`nuxt.config.js`

```js
const axios = require('axios')

module.exports = {
  generate: {
    routes: () =>
      axios
        .get('https://my-api/users')
        .then(res => res.data.map(user => '/users/' + user.id))
  }
}
```

### Функция с обратным вызовом

`nuxt.config.js`

```js
const axios = require('axios')

module.exports = {
  generate: {
    routes: callback =>
      axios
        .get('https://my-api/users')
        .then(res => {
          const routes = res.data.map(user => '/users/' + user.id)
          callback(null, routes)
        })
        .catch(callback)
  }
}
```

### Ускорение создания динамических маршрутов с помощью `payload`

В приведенном выше примере мы используем `user.id` с сервера для генерации маршрутов, но отбрасываем остальную часть данных. Обычно, нам нужно получить данные заново снова изнутри страницы-компонента `/users/_id.vue`. Хотя мы могли-бы это сделать, нам, вероятно, прийдется установить `generate.interval` на что-то вроде `100`, чтобы не зжечь API-сервер до тла. Поскольку это увеличит время генерации, было бы веселее передать весь доступный объект `user` в контекст `_id.vue`. Мы делаем это, модифицируя приведенный выше код:

`nuxt.config.js`

```js
const axios = require('axios')

module.exports = {
  generate: {
    routes: () =>
      axios.get('https://my-api/users').then(res =>
        res.data.map(user => ({
          route: '/users/' + user.id,
          payload: user
        }))
      )
  }
}
```

Теперь мы можем наслаждаться обьектом `payload` внутри `/users /_id.vue` следующим образом:

```js
asyncData: async ({ params, error, payload }) =>
  payload
  ? { user: payload }
  : { user: await backend.fetchUser(params.id) }
```

## subFolders

- Тип: `Boolean`
- По умолчанию:  `true`

По умолчанию запуск `nuxt generate` будет создавать для каждого маршрута по папке с `index.html`.

Example:

```bash
-| dist/
---| index.html
---| about/
-----| index.html
---| products/
-----| item/
-------| index.html
```

Если установлено значение false, в соответствии с путем маршрута генерируются HTML файлы:

```bash
-| dist/
---| index.html
---| about.html
---| products/
-----| item.html
```

_Примечание: этот параметр может быть полезен для развертываний на [Netlify](https://netlify.com) или другого статический хостинг, использущий HTML fallbacks._

## concurrency

- Тип: `Number`
- По умолчанию:  `500`

Генерация маршрутов является параллельной, `generate.concurrency` указывает количество маршрутов, которые запускаются в одном куске.
