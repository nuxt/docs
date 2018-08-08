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

> This option is given directly to the vue-router [Router constructor](https://router.vuejs.org/en/api/options.html).

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

> This option is given directly to the [vue-router Router constructor](https://router.vuejs.org/en/api/options.html).

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

> This option is given directly to the [vue-router Router constructor](https://router.vuejs.org/en/api/options.html).

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

> This option is given directly to the vue-router [Router constructor](https://router.vuejs.org/en/api/options.html).

## scrollBehavior

- Type: `Function`

The `scrollBehavior` option lets you define a custom behavior for the scroll position between the routes. This method is called every time a page is rendered.

By default, the scrollBehavior option is set to:
```js
const scrollBehavior = (to, from, savedPosition) => {
  // savedPosition is only available for popstate navigations.
  if (savedPosition) {
    return savedPosition
  } else {
    let position = {}
    // if no children detected
    if (to.matched.length < 2) {
      // scroll to the top of the page
      position = { x: 0, y: 0 }
    }
    else if (to.matched.some((r) => r.components.default.options.scrollToTop)) {
      // if one of the children has scrollToTop option set to true
      position = { x: 0, y: 0 }
    }
    // if link has anchor,  scroll to anchor by returning the selector
    if (to.hash) {
      position = { selector: to.hash }
    }
    return position
  }
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

> This option is given directly to the vue-router [Router constructor](https://router.vuejs.org/en/api/options.html).
