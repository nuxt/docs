---
title: "API: The router Property"
description: The router property lets you customize Nuxt.js router.
---

# The router Property

> The router property lets you customize Nuxt.js router ([vue-router](https://router.vuejs.org/en/)).

## base

- Type: `String`
- Default: `'/'`

The base URL of the app. For example, if the entire single page application is served under `/app/`, then base should use the value `'/app/'`.

This can be useful if you need to serve Nuxt as a different context root, from within a bigger Web site. Notice that you may, or may not set up a Front Proxy Web Server.

If you want to have a redirect to `router.base`, you can do so [using a Hook, see *Redirect to router.base when not on root*](/api/configuration-hooks#redirect-to-router-base-when-not-on-root).

Example (`nuxt.config.js`):
```js
export default {
  router: {
    base: '/app/'
  }
}
```

<div class="Alert Alert-blue">

When `base` is set, Nuxt.js will also add in the document header `<base href="{{ router.base }}"/>`.

</div>

> This option is given directly to the vue-router [base](https://router.vuejs.org/api/#base).

## routeNameSplitter

- Type: `String`
- Default: `'-'`

You may want to change the separator between route names that Nuxt.js uses. You can do so via the `routeNameSplitter` option in your configuration file.
Imagine we have the page file `pages/posts/_id.vue`. Nuxt will generate the route name programatically, in this case `posts-id`. Changing the `routeNameSplitter` config to `/` the name will therefore change to `posts/id`.

Example (`nuxt.config.js`):
```js
export default {
  router: {
    routeNameSplitter: '/'
  }
}
```

## extendRoutes

- Type: `Function`

You may want to extend the routes created by Nuxt.js. You can do so via the `extendRoutes` option.

Example of adding a custom route:

`nuxt.config.js`
```js
export default {
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

## fallback

- Type: `boolean`
- Default: `false`

Controls whether the router should fallback to hash mode when the browser does not support history.pushState but mode is set to history.

Setting this to false essentially makes every router-link navigation a full page refresh in IE9. This is useful when the app is server-rendered and needs to work in IE9, because a hash mode URL does not work with SSR.

> This option is given directly to the vue-router [fallback](https://router.vuejs.org/api/#fallback).

## linkActiveClass

- Type: `String`
- Default: `'nuxt-link-active'`

Globally configure [`<nuxt-link>`](/api/components-nuxt-link) default active class.

Example (`nuxt.config.js`):

```js
export default {
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
export default {
  router: {
    linkExactActiveClass: 'exact-active-link'
  }
}
```

> This option is given directly to the vue-router [linkexactactiveclass](https://router.vuejs.org/api/#linkexactactiveclass).

## linkPrefetchedClass

- Type: `String`
- Default: `false`

Globally configure [`<nuxt-link>`](/api/components-nuxt-link) default prefetch class (feature disabled by default)

Example (`nuxt.config.js`):

```js
export default {
  router: {
    linkPrefetchedClass: 'nuxt-link-prefetched'
  }
}
```

## middleware

- Type: `String` or `Array`
  - Items: `String`

Set the default(s) middleware for every page of the application.

Example:

`nuxt.config.js`

```js
export default {
  router: {
    // Run the middleware/user-agent.js on every page
    middleware: 'user-agent'
  }
}
```

`middleware/user-agent.js`
```js
export default function (context) {
  // Add the userAgent property in the context (available in `asyncData` and `fetch`)
  context.userAgent = process.server ? context.req.headers['user-agent'] : navigator.userAgent
}
```

To learn more about the middleware, see the [middleware guide](/guide/routing#middleware).

## mode

- Type: `String`
- Default: `'history'`

Configure the router mode, this is not recommended to change it due to server-side rendering.

Example (`nuxt.config.js`):

```js
export default {
  router: {
    mode: 'hash'
  }
}
```

> This option is given directly to the vue-router [mode](https://router.vuejs.org/api/#mode).

## parseQuery / stringifyQuery

- Type: `Function`

Provide custom query string parse / stringify functions. Overrides the default.

> This option is given directly to the vue-router [parseQuery / stringifyQuery](https://router.vuejs.org/api/#parsequery-stringifyquery).

## prefetchLinks

> Added with Nuxt v2.4.0

- Type: `Boolean`
- Default: `true`

Configure `<nuxt-link>` to prefetch the *code-splitted* page when detected within the viewport.
Requires [IntersectionObserver](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) to be supported (see [CanIUse](https://caniuse.com/#feat=intersectionobserver)).

We recommend conditionally polyfilling this feature with a service like [Polyfill.io](https://polyfill.io):

`nuxt.config.js`

```js
export default {
  head: {
    script: [
      { src: 'https://polyfill.io/v2/polyfill.min.js?features=IntersectionObserver', body: true }
    ]
  }
}
```

To disable the prefetching on a specific link, you can use the `no-prefetch` prop:

```html
<nuxt-link to="/about" no-prefetch>About page not pre-fetched</nuxt-link>
```

To disable the prefetching on all links, set the `prefetchLinks` to `false`:

```js
// nuxt.config.js
export default {
  router: {
    prefetchLinks: false
  }
}
```

## scrollBehavior

- Type: `Function`

The `scrollBehavior` option lets you define a custom behavior for the scroll position between the routes. This method is called every time a page is rendered.

By default, the scrollBehavior option is set to:

```js
const scrollBehavior = function (to, from, savedPosition) {
  // if the returned position is falsy or an empty object,
  // will retain current scroll position.
  let position = false

  // if no children detected and scrollToTop is not explicitly disabled
  if (
    to.matched.length < 2 &&
    to.matched.every(r => r.components.default.options.scrollToTop !== false)
  ) {
    // scroll to the top of the page
    position = { x: 0, y: 0 }
  } else if (to.matched.some(r => r.components.default.options.scrollToTop)) {
    // if one of the children has scrollToTop option set to true
    position = { x: 0, y: 0 }
  }

  // savedPosition is only available for popstate navigations (back button)
  if (savedPosition) {
    position = savedPosition
  }

  return new Promise((resolve) => {
    // wait for the out transition to complete (if necessary)
    window.$nuxt.$once('triggerScroll', () => {
      // coords will be used if no selector is provided,
      // or if the selector didn't match any element.
      if (to.hash) {
        let hash = to.hash
        // CSS.escape() is not supported with IE and Edge.
        if (typeof window.CSS !== 'undefined' && typeof window.CSS.escape !== 'undefined') {
          hash = '#' + window.CSS.escape(hash.substr(1))
        }
        try {
          if (document.querySelector(hash)) {
            // scroll to anchor by returning the selector
            position = { selector: hash }
          }
        } catch (e) {
          console.warn('Failed to save scroll position. Please add CSS.escape() polyfill (https://github.com/mathiasbynens/CSS.escape).')
        }
      }
      resolve(position)
    })
  })
}
```

Example of forcing the scroll position to the top for every routes:

`nuxt.config.js`
```js
export default {
  router: {
    scrollBehavior: function (to, from, savedPosition) {
      return { x: 0, y: 0 }
    }
  }
}
```
