---
title: "API: The router Property"
description: The router property lets you customize nuxt.js router.
---

# The router Property

> The router property lets you customize nuxt.js router ([vue-router](https://router.vuejs.org/en/)).

## base

- Type: `String`
- Default: `'/'`

The base URL of the app. For example, if the entire single page application is served under `/app/`, then base should use the value `'/app/'`.

Example (`nuxt.config.js`):
```js
module.exports = {
  router: {
    base: '/app/'
  }
}
```

<p class="Alert Alert-blue">When `base` is set, nuxt.js will also add in the document header `<base href="{{ router.base }}"/>`.</p>

> This option is given directly to the vue-router [base](https://router.vuejs.org/api/#base).

## extendRoutes

- Type: `Function`

You may want to extend the routes created by nuxt.js. You can do it via the `extendRoutes` option.

Example of adding a custom route:

`nuxt.config.js`
```js
module.exports = {
  router: {
    extendRoutes (routes, resolve) {
      routes.push({
        name: 'custom',
        path: '*',
        component: resolve(__dirname, 'pages/404.vue')
      })
    }
  }
}
```

The schema of the route should respect the [vue-router](https://router.vuejs.org/en/) schema.

## linkActiveClass

- Type: `String`
- Default: `'nuxt-link-active'`

Globally configure [`<nuxt-link>`](/api/components-nuxt-link) default active class.

Example (`nuxt.config.js`):
```js
module.exports = {
  router: {
    linkActiveClass: 'active-link'
  }
}
```

> This option is given directly to the vue-router [linkactiveclass](https://router.vuejs.org/api/#linkactiveclass).

## linkExactActiveClass

- Type: `String`
- Default: `'nuxt-link-exact-active'`

Globally configure [`<nuxt-link>`](/api/components-nuxt-link) default exact active class.

Example (`nuxt.config.js`):
```js
module.exports = {
  router: {
    linkExactActiveClass: 'exact-active-link'
  }
}
```

> This option is given directly to the vue-router [linkexactactiveclass](https://router.vuejs.org/api/#linkexactactiveclass).

## middleware

- Type: `String` or `Array`
  - Items: `String`

Set the default(s) middleware for every pages of the application.

Example:

`nuxt.config.js`
```js
module.exports = {
  router: {
    // Run the middleware/user-agent.js on every pages
    middleware: 'user-agent'
  }
}
```

`middleware/user-agent.js`
```js
export default function (context) {
  // Add the userAgent property in the context (available in `data` and `fetch`)
  context.userAgent = context.isServer ? context.req.headers['user-agent'] : navigator.userAgent
}
```

To learn more about the middleware, see the [middleware guide](/guide/routing#middleware).

## mode

- Type: `String`
- Default: `'history'`

Configure the router mode, this is not recommended to change it due to server-side rendering.

Example (`nuxt.config.js`):
```js
module.exports = {
  router: {
    mode: 'hash'
  }
}
```

> This option is given directly to the vue-router [mode](https://router.vuejs.org/api/#mode).

## scrollBehavior

- Type: `Function`

The `scrollBehavior` option lets you define a custom behavior for the scroll position between the routes. This method is called every time a page is rendered.

By default, the scrollBehavior option is set to:

```js
const scrollBehavior = function (to, from, savedPosition) {
  // if the returned position is falsy or an empty object,
  // will retain current scroll position.
  let position = false

  // if no children detected
  if (to.matched.length < 2) {
    // scroll to the top of the page
    position = { x: 0, y: 0 }
  } else if (to.matched.some((r) => r.components.default.options.scrollToTop)) {
    // if one of the children has scrollToTop option set to true
    position = { x: 0, y: 0 }
  }

  // savedPosition is only available for popstate navigations (back button)
  if (savedPosition) {
    position = savedPosition
  }

  return new Promise(resolve => {
    // wait for the out transition to complete (if necessary)
    window.$nuxt.$once('triggerScroll', () => {
      // coords will be used if no selector is provided,
      // or if the selector didn't match any element.
      if (to.hash && document.querySelector(to.hash)) {
        // scroll to anchor by returning the selector
        position = { selector: to.hash }
      }
      resolve(position)
    })
  })
}
```

Example of forcing the scroll position to the top for every routes:

`nuxt.config.js`
```js
module.exports = {
  router: {
    scrollBehavior: function (to, from, savedPosition) {
      return { x: 0, y: 0 }
    }
  }
}
```

## parseQuery / stringifyQuery

- Type: `Function`

Provide custom query string parse / stringify functions. Overrides the default.

> This option is given directly to the vue-router [parseQuery / stringifyQuery](https://router.vuejs.org/api/#parsequery-stringifyquery).

## fallback

- Type: `boolean`
- Default: `false`

Controls whether the router should fallback to hash mode when the browser does not support history.pushState but mode is set to history.

Setting this to false essentially makes every router-link navigation a full page refresh in IE9. This is useful when the app is server-rendered and needs to work in IE9, because a hash mode URL does not work with SSR.

> This option is given directly to the vue-router [fallback](https://router.vuejs.org/api/#fallback).
