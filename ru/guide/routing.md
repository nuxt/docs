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

Автоматически сгенерирует:

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

Автоматически сгенерирует:

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

**Внимание:** При использовании Nuxt <= v2.12 динамические маршруты игнорируются командой `generate`.

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

Автоматически сгенерирует:

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

Автоматически сгенерирует:

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

### Unknown Dynamic Nested Routes

If you do not know the depth of your URL structure, you can use `_.vue` to dynamically match nested paths.
This will handle requests that do not match a _more specific_ request.

This file tree:

```bash
pages/
--| people/
-----| _id.vue
-----| index.vue
--| _.vue
--| index.vue
```

Will handle requests like this:

Path | File
--- | ---
`/` | `index.vue`
`/people` | `people/index.vue`
`/people/123` | `people/_id.vue`
`/about` | `_.vue`
`/about/careers` | `_.vue`
`/about/careers/chicago` | `_.vue`

__Note:__ Handling 404 pages is now up to the logic of the `_.vue` page. [More on 404 redirecting can be found here](/guide/async-data#handling-errors).

## Extending the router

There are multiple ways to extend the routing with Nuxt:

- [router-extras-module](https://github.com/nuxt-community/router-extras-module) to customise the route parameters in the page component
- [@nuxtjs/router](https://github.com/nuxt-community/router-module) to overwrite the Nuxt router and write your own `router.js` file
- Use the [router.extendRoutes](https://nuxtjs.org/api/configuration-router#extendroutes) property in your `nuxt.config.js`

## Named Views

To render named views you can use `<nuxt name="top"/>` or `<nuxt-child name="top"/>` components in your layout/page. To specify named view of page we need to extend router config in `nuxt.config.js` file:
  
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
It require to extend interested route with 2 properties `components` and `chunkNames`. Named view in this config example has name `top`.

To see an example, take a look at the [named-views example](/examples/named-views).

### SPA fallback

You can enable SPA fallbacks for dynamic routes too. Nuxt.js will output an extra file that is the same as the `index.html` that would be used in `mode: 'spa'`. Most static hosting services can be configured to use the SPA template if no file matches. It won't include the `head` info or any HTML, but it will still resolve and load the data from the API.

We enable this in our `nuxt.config.js` file:

``` js
export default {
  generate: {
    fallback: true, // if you want to use '404.html' instead of the default '200.html'
    fallback: 'my-fallback/file.html' // if your hosting needs a custom location
  }
}
```

### Locally Accessing Route Params

You can access the current route parameters within your local page or component by referencing `this.$route.params.{parameterName}`. For example, if you had a dynamic users page (`users\_id.vue`) and wanted to access the `id` parameter to load the user or process information, you could access the variable like this: `this.$route.params.id`.

#### Implementation for Surge

Surge [can handle](https://surge.sh/help/adding-a-custom-404-not-found-page) both `200.html` and `404.html`. `generate.fallback` is set to `200.html` by default, so no need to change it.

#### Implementation for GitHub Pages and Netlify

GitHub Pages and Netlify recognize the `404.html` file automatically, so setting `generate.fallback` to `true` is all we have to do!

#### Implementation for Firebase Hosting

Firebase Hosting [can handle](https://firebase.google.com/docs/hosting/full-config#404) the `404.html` file automatically, so setting `generate.fallback` to `true` will render the error page with a default response code of 404.

## Transitions

Nuxt.js uses the [`<transition>`](http://vuejs.org/v2/guide/transitions.html#Transitioning-Single-Elements-Components) component to let you create amazing transitions/animations between your routes.

### Global Settings

<div class="Alert Alert--nuxt-green">

<b>Info:</b> Nuxt.js default transition name is `"page"`.

</div>

To add a fade transition to every page of your application, we need a CSS file that is shared across all our routes, so we start by creating a file in the `assets` folder.

Our global css in `assets/main.css`:

```css
.page-enter-active, .page-leave-active {
  transition: opacity .5s;
}
.page-enter, .page-leave-to {
  opacity: 0;
}
```

Then we add its path to the `css` array in our `nuxt.config.js` file:

```js
export default {
  css: [
    '~/assets/main.css'
  ]
}
```

More information about the transition key: [API Configuration transition](/api/pages-transition)

### Page Settings

You can also define a custom transition for a specific page with the `transition` property.

We add a new class in our global css in `assets/main.css`:

```css
.test-enter-active, .test-leave-active {
  transition: opacity .5s;
}
.test-enter, .test-leave-active {
  opacity: 0;
}
```

Then we use the transition property to define the class name to use for this page transition:

```js
export default {
  transition: 'test'
}
```

More information about the transition property: [API Pages transition](/api/pages-transition)

## Middleware

> Middleware lets you define custom functions that can be run before rendering either a page or a group of pages.

**Shared middleware should be placed in the `middleware/` directory.** The filename will be the name of the middleware (`middleware/auth.js` will be the `auth` middleware). You can also defined page-specific middleware by using a function directly, see [anonymous middleware](/api/pages-middleware#anonymous-middleware).

A middleware receives [the context](/api/context) as first argument:

```js
export default function (context) {
  context.userAgent = process.server ? context.req.headers['user-agent'] : navigator.userAgent
}
```
In universal mode, middlewares will be called server-side once (on the first request to the Nuxt app or when page refreshes) and client-side when navigating to further routes. While generating the pages statically the middlewares will be called once on build time instead of the server-side calls. In SPA mode, middlewares will be called client-side on the first request and when navigating to further routes.

The middleware will be executed in series in this order:

1. `nuxt.config.js` (in the order within the file)
2. Matched layouts
3. Matched pages

A middleware can be asynchronous. To do this, simply return a `Promise` or use the 2nd `callback` argument:

`middleware/stats.js`

```js
import axios from 'axios'

export default function ({ route }) {
  return axios.post('http://my-stats-api.com', {
    url: route.fullPath
  })
}
```

Then, in your `nuxt.config.js`, use the `router.middleware` key:

`nuxt.config.js`

```js
export default {
  router: {
    middleware: 'stats'
  }
}
```

Now the `stats` middleware will be called for every route change.

You can add your middleware (even multiple) to a specific layout or page as well:


`pages/index.vue` or `layouts/default.vue`

```js
export default {
  middleware: ['auth', 'stats']
}
```

To see a real-life example using the middleware, please see [example-auth0](https://github.com/nuxt/example-auth0) on GitHub.
