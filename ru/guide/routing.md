---
title: Routing
description: Nuxt.js использует файловую систему для генерирования маршрутов вашего веб-приложения.
---

> Nuxt.js автоматически генерирует конфигурацию [vue-router](https://github.com/vuejs/vue-router) базируясь на древовидной структуре ваших Vue файлов внутри папки`pages` .

<div class="Alert Alert--grey">

Для навигации между страницами мы рекомендуем использовать компонент [`<nuxt-link>`](/api/components-nuxt-link) .

</div>

Пример:

```html
<template>
  <nuxt-link to="/">Домашняя страница</nuxt-link>
</template>
```

## Простые пути

Древовидная структура файловой системы:

```bash
pages/
--| user/
-----| index.vue
-----| one.vue
--| index.vue
```

Будет сгенерировано в:

```js
router: {
  routes: [
    {
      name: 'index',
      path: '/',
      component: 'pages/index.vue'
    },
    {
      name: 'user',
      path: '/user',
      component: 'pages/user/index.vue'
    },
    {
      name: 'user-one',
      path: '/user/one',
      component: 'pages/user/one.vue'
    }
  ]
}
```

## Динамические пути

Чтобы обьявить динамический маршрут как параметр - вам необходимо обьявить файл .vue ИЛИ папку **с нижним подчеркиванием в роли префикса (_)**.

Древовидная структура файловой системы:

```bash
pages/
--| _slug/
-----| comments.vue
-----| index.vue
--| users/
-----| _id.vue
--| index.vue
```

Будет сгенерировано в:

```js
router: {
  routes: [
    {
      name: 'index',
      path: '/',
      component: 'pages/index.vue'
    },
    {
      name: 'users-id',
      path: '/users/:id?',
      component: 'pages/users/_id.vue'
    },
    {
      name: 'slug',
      path: '/:slug',
      component: 'pages/_slug/index.vue'
    },
    {
      name: 'slug-comments',
      path: '/:slug/comments',
      component: 'pages/_slug/comments.vue'
    }
  ]
}
```

Как вы могли заметить, маршрут с названием `users-id` имеет путь `:id?`, что делает его необязательным. Если вы хотите сделать его обязательным - создайте файл `index.vue` внутри директории `users/_id`.

<div class="Alert Alert-blue">

Начиная с Nuxt >= v2.13 установлен сканер, который теперь будет сканировать ваши теги ссылок и генерировать маршруты при использовании команды `nuxt build && nuxt export` на основе этих ссылок. 

</div>

<div class="Alert Alert--orange">

**Внимание:** Если вы используете Nuxt >= v2.13 и у вас есть страницы которые не имеют ссылок, как скрытые страницы, и вы хотите сгенерировать и их тоже - вы можете использовать свойство `generate.routes`. 

**Внимание:** При использовании Nuxt <= v2.12 команда `generate` игнорирует динамические маршруты.

[API Конфигурация generate](/api/configuration-generate#routes)

</div>

### Валидация параметров маршрута 

Nuxt.js позволяет вам определять метод валидации внутри вашего компанента динамеческого маршрута.

Пример: `pages/users/_id.vue`

```js
export default {
  validate ({ params }) {
    // Must be a number
    return /^\d+$/.test(params.id)
  }
}
```

Если метод validate не возвращает `true` или `Promise`, который преобразуется в `true` или выдаст ошибку - Nuxt.js автоматически загрузит страницу ошибки 404 или страницу ошибки 500 в случае ошибки.

Больше информации о методе валидации: [API Валидация страниц](/api/pages-validate)

## Вложенные маршруты 

Nuxt.js позволяет вам создавать вложенные маршруты с помощью дочерних маршрутов vue-router.

Чтобы определить родительский компонент вложенного маршрута, вам нужно создать файл Vue с **таким же именем как у директории**, которая содержит ваши дочерние представления.

<div class="Alert Alert--orange">

<b>Внимание:</b> не забудьте добавить `<nuxt-child/>` внутрь родительского компонента (<code>.vue</code> файл).

</div>

Древовидная структура файловой системы:

```bash
pages/
--| users/
-----| _id.vue
-----| index.vue
--| users.vue
```

Будет сгенерировано в:

```js
router: {
  routes: [
    {
      path: '/users',
      component: 'pages/users.vue',
      children: [
        {
          path: '',
          component: 'pages/users/index.vue',
          name: 'users'
        },
        {
          path: ':id',
          component: 'pages/users/_id.vue',
          name: 'users-id'
        }
      ]
    }
  ]
}
```

## Динамические вложенные маршруты

Этот сценарий не должен происходить часто, но это возможно с Nuxt.js: наличие динамических дочерних маршрутов внутри динамических родительских.

Древовидная структура файловой системы:

```bash
pages/
--| _category/
-----| _subCategory/
--------| _id.vue
--------| index.vue
-----| _subCategory.vue
-----| index.vue
--| _category.vue
--| index.vue
```

Будет сгенерировано в:

```js
router: {
  routes: [
    {
      path: '/',
      component: 'pages/index.vue',
      name: 'index'
    },
    {
      path: '/:category',
      component: 'pages/_category.vue',
      children: [
        {
          path: '',
          component: 'pages/_category/index.vue',
          name: 'category'
        },
        {
          path: ':subCategory',
          component: 'pages/_category/_subCategory.vue',
          children: [
            {
              path: '',
              component: 'pages/_category/_subCategory/index.vue',
              name: 'category-subCategory'
            },
            {
              path: ':id',
              component: 'pages/_category/_subCategory/_id.vue',
              name: 'category-subCategory-id'
            }
          ]
        }
      ]
    }
  ]
}
```

### Неизвестные динамические вложенные маршруты

Если вы не знаете глубину своей структуры URL, вы можете использовать `_.vue`для динамического сопоставления вложенных путей.
Таким образом будут обработаны те запросы, которые не соответствуют _более конкретному_ запросу.

Древовидная структура файловой системы:

```bash
pages/
--| people/
-----| _id.vue
-----| index.vue
--| _.vue
--| index.vue
```

Будет сгенерировано в:

Путь | Файл
--- | ---
`/` | `index.vue`
`/people` | `people/index.vue`
`/people/123` | `people/_id.vue`
`/about` | `_.vue`
`/about/careers` | `_.vue`
`/about/careers/chicago` | `_.vue`

__Заметка:__ Обработка 404 страниц теперь соответствует логике страницы `_.vue`. [Больше о 404 можно найти здесь](/guide/async-data#handling-errors).

## Расширение маршрута 

Тут указано несколько способов расширить маршрутизацию с Nuxt:

- [router-extras-module](https://github.com/nuxt-community/router-extras-module) настройка параметров маршрута в компоненте страницы
- [@nuxtjs/router](https://github.com/nuxt-community/router-module) перезаписать маршрутизатор Nuxt и записать свой `router.js` файл
- Используйте [router.extendRoutes](https://nuxtjs.org/api/configuration-router#extendroutes) свойства в вашем `nuxt.config.js`

## Именованные представления

Для отображения именованных представлений вы можете использовать компоненты `<nuxt name="top"/>` или `<nuxt-child name="top"/>` в ваших шаблонах/страницах. Чтобы указать именованное представление страницы нам нужно расширить конфигурацию в файле `nuxt.config.js`:
  
``` js
export default {
  router: {
    extendRoutes (routes, resolve) {
      const index = routes.findIndex(route => route.name === 'main')
      routes[index] = {
        ...routes[index],
        components: {
          default: routes[index].component,
          top: resolve(__dirname, 'components/mainTop.vue')
        },
        chunkNames: {
          top: 'components/mainTop'
        }
      }
    }
  }
}
```
Требуется расширить интересующий нас маршрут двумя свойствами: `components` и `chunkNames`. Именованное представление в этом примере конфигурации имеет название `top`.

Посмотреть пример именованного представления: [пример именованных представлений](/examples/named-views).

### SPA fallback

Вы также можете включить SPA fallbacks для динамических маршрутов. Nuxt.js выведет дополнительный файл, такой же как `index.html`, который будет использоватся в `mode: 'spa'`. Большинство сервисов статического хостинга могут быть настроены на использование шаблона SPA, если ни один файл не подошел. Он не будет содержать в себе `head` или какой-либо HTML, но он все равно будет запускаться и загружать данные с API.

Мы включили это в нашем `nuxt.config.js` файле:

``` js
export default {
  generate: {
    fallback: true, // if you want to use '404.html' вместо стандартного '200.html'
    fallback: 'my-fallback/file.html' // если вашемо хостингу нужно нестандартное местоположение
  }
}
```

### Локальный доступ к параметрам маршрута 

Вы можете получить доступ к текущим параметрам маршрута на своих локальных страницах или компонентах ссылаясь на `this.$route.params.{parameterName}`. Например, если у вас была динамическая страница пользователей (`users\_id.vue`) и вы хотели получить доступ к параметру `id` для загрузки информации о пользователе или процессе parameter, доступ к переменной можно получить таким способом: `this.$route.params.id`.

#### Имплементация для Surge

Surge [может обрабатывать](https://surge.sh/help/adding-a-custom-404-not-found-page) как `200.html` так и `404.html`. `generate.fallback` по умолчанию имеет значение `200.html` поэтому менять его не нужно.

#### Имплементация для GitHub Pages и Netlify

GitHub Pages и Netlify автоматически распознают файл `404.html`, поэтому все что нам нужно сделать - установить `generate.fallback` в значение `true`!

#### Имплементация для Firebase Hosting

Firebase Hosting [может обрабатывать](https://firebase.google.com/docs/hosting/full-config#404) файл `404.html` автоматически, поэтому `generate.fallback` со значением `true` отобразит страницу ошибки с кодом ответа по умолчанию 404.

## Переходы

Nuxt.js использует компонент [`<transition>`](http://vuejs.org/v2/guide/transitions.html#Transitioning-Single-Elements-Components) чтобы позволить вам создавать красивые переходы/анимации между вашими маршрутами.

### Глобальные настройки

<div class="Alert Alert--nuxt-green">

<b>Информация:</b> Nuxt.js навзание перехода по умолчанию: `"страница"`.

</div>

To add a fade transition to every page of your application, we need a CSS file that is shared across all our routes, so we start by creating a file in the `assets` folder.

Наш глобальный css в `assets/main.css`:

```css
.page-enter-active, .page-leave-active {
  transition: opacity .5s;
}
.page-enter, .page-leave-to {
  opacity: 0;
}
```

Затем мы добавляем его путь в `css` массив в наш файл `nuxt.config.js`:

```js
export default {
  css: [
    '~/assets/main.css'
  ]
}
```

Большое о transition key: [API Конфигурация перехода](/api/pages-transition)

### Настройки страницы

Вы также можете определить пользовательский переход для отдельной страницы с помощью свойства `transition`.

Мы добавили новый клас в наш глобальный css в `assets/main.css`:

```css
.test-enter-active, .test-leave-active {
  transition: opacity .5s;
}
.test-enter, .test-leave-active {
  opacity: 0;
}
```

Затем мы используем свойство transition, чтобы определить имя класса, которое будет использоваться для этого перехода страницы:

```js
export default {
  transition: 'test'
}
```

Больше о свойстве transition: [API Pages transition](/api/pages-transition)

## Middleware

> Свойство промежуточной обработки (middleware) позволяет определять пользовательские функции, которые можно запускать перед отображением страницы или группы страниц.

**Общее middleware должно быть помещено в `middleware/` директории.** Имя файла будет именем свойства промежуточной обработки (middleware) (`middleware/auth.js` будет `auth` middleware). Вы так же можете определить middleware для конкретной страницы, используя функцию напрямую: [anonymous middleware](/api/pages-middleware#anonymous-middleware).

В качестве первого аргумента middleware получает [the context](/api/context) :

```js
export default function (context) {
  context.userAgent = process.server ? context.req.headers['user-agent'] : navigator.userAgent
}
```
В универсальном режиме, middleware будет вызыватся на стороне сервера один раз (при первом запросе к приложению Nuxt или при обновлении страницы) и на стороне клиента при переходе к дальнейшим маршрутам. При статическом генерировании страниц middleware будет вызываться один раз во время сборки вместо вызовов на стороне сервера. В режиме SPA, будет вызываться на стороне клиента при первом запросе и при переходе к дальнейшим маршрутам.

Middleware будет выполнено последовательно в следующем порядке::

1. `nuxt.config.js` (в порядке в файле)
2. Совпадающие макеты
3. Совпадающие страницы

Middleware может быть асинхронным. Для этого просто верните `Promise` или используйте второй аргумент `callback`:

`middleware/stats.js`

```js
import axios from 'axios'

export default function ({ route }) {
  return axios.post('http://my-stats-api.com', {
    url: route.fullPath
  })
}
```

Затем, в вашем `nuxt.config.js`, используйте ключ `router.middleware`:

`nuxt.config.js`

```js
export default {
  router: {
    middleware: 'stats'
  }
}
```

Теперь `stats` middleware будет вызываться для каждого изменения маршрута.

Вы также можете добавить свое middleware (даже несколько) к определенному макету или странице:

`pages/index.vue` or `layouts/default.vue`

```js
export default {
  middleware: ['auth', 'stats']
}
```

Чтобы увидеть реальный пример использования свойства промежуточной обработки (middleware), см [пример авторизации](https://github.com/nuxt/example-auth0) на GitHub.
