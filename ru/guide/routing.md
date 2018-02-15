---
title: Routing
description: Nuxt.js use the file-system to generate the routes of your web applications, it's as simple as PHP to create routes.
---

> Nuxt.js generates automatically the [vue-router](https://github.com/vuejs/vue-router) configuration according to your file tree of Vue files inside the `pages` directory.

## Basic Routes

This file tree:

```bash
pages/
--| user/
-----| index.vue
-----| one.vue
--| index.vue
```

will automatically generate:

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

## Dynamic Routes

To define a dynamic route with a param, you need to define a .vue file OR a directory **prefixed by an underscore**.

This file tree:

```bash
pages/
--| _slug/
-----| comments.vue
-----| index.vue
--| users/
-----| _id.vue
--| index.vue
```

will automatically generate:

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

As you can see the route named `users-id` has the path `:id?` which makes it optional, if you want to make it required, create an `index.vue` file in the `users/_id` directory.

<p class="Alert Alert--info">Warning: dynamic routes are ignored by the `generate` command: [API Configuration generate](/api/configuration-generate#routes)</p>

### Validate Route Params

Nuxt.js lets you define a validator method inside your dynamic route component.

In this example: `pages/users/_id.vue`

```js
export default {
  validate ({ params }) {
    // Must be a number
    return /^\d+$/.test(params.id)
  }
}
```

If the validate method does not return `true`, Nuxt.js will automatically load the 404 error page.

More information about the validate method: [API Pages validate](/api/pages-validate)

## Nested Routes

Nuxt.js lets you create nested route by using the children routes of vue-router.

To define the parent component of a nested route, you need to create a Vue file with the **same name as the directory** which contain your children views.

<p class="Alert Alert--info">Don't forget to write `<nuxt-child/>` inside the parent component (.vue file).</p>

This file tree:

```bash
pages/
--| users/
-----| _id.vue
-----| index.vue
--| users.vue
```

will automatically generate:

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

## Dynamic Nested Routes

This scenario should not often happen, but it is possible with Nuxt.js: having dynamic children inside dynamic parents.

This file tree:

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

will automatically generate:

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

## Transitions

Nuxt.js uses the  [&lt;transition&gt;](http://vuejs.org/v2/guide/transitions.html#Transitioning-Single-Elements-Components) component to let you create amazing transitions/animations between your routes.

### Global Settings

<p class="Alert Alert--info">Nuxt.js default transition name is `"page"`.</p>

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

We add its path in our `nuxt.config.js` file:
```js
module.exports = {
  css: [
    'assets/main.css'
  ]
}
```

More information about the transition key: [API Configuration transition](/api/pages-transition)

### Page Settings

You can also define a custom transition for only one page with the `transition` property.

We add a new class in our global css in `assets/main.css`:
```css
.test-enter-active, .test-leave-active {
  transition: opacity .5s;
}
.test-enter, .test-leave-active {
  opacity: 0;
}
```

then, we use the transition property to define the class name to use for this page transition:
```js
export default {
  transition: 'test'
}
```

More information about the transition property: [API Pages transition](/api/pages-transition)

## Middleware

> Middleware lets you define custom functions that can be run before rendering either a page or a group of pages.

**Every middleware should be placed in the `middleware/` directory.** The filename will be the name of the middleware (`middleware/auth.js` will be the `auth` middleware).

A middleware receives [the context](/api/context) as first argument:

```js
export default function (context) {
  context.userAgent = context.isServer ? context.req.headers['user-agent'] : navigator.userAgent
}
```

The middleware will be executed in series in this order:
1. `nuxt.config.js`
2. Matched layouts
3. Matched pages

A middleware can be asynchronous, simply return a `Promise` or use the 2nd `callback` argument:

`middleware/stats.js`
```js
import axios from 'axios'

export default function ({ route }) {
  return axios.post('http://my-stats-api.com', {
    url: route.fullPath
  })
}
```

Then, in your `nuxt.config.js`, layout or page, use the `middleware` key:

`nuxt.config.js`
```js
module.exports = {
  router: {
    middleware: 'stats'
  }
}
```

The `stats` middleware will be called for every route changes.

To see a real-life example using the middleware, please see [example-auth0](https://github.com/nuxt/example-auth0) on GitHub.
