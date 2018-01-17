---
title: Caching Components
description: How to cache components?
---

# How to cache Vue components?

> Although Vue's SSR is quite fast, it can't match the performance of pure string-based templating due to the cost of creating component instances and Virtual DOM nodes. In cases where SSR performance is critical, wisely leveraging caching strategies can greatly improve response time and reduce server load.

To avoid boilerplate, use [Component Cache module](https://github.com/nuxt-community/modules/tree/master/packages/component-cache) for Nuxt.js. This module uses vue-server-renderer to add LRU cache support for Vue components.

## Usage

- Add `@nuxtjs/component-cache` dependency using Yarn or npm to your project
- Add `@nuxtjs/component-cache` to `modules` section of `nuxt.config.js`

```js
{
  modules: [
    // Simple usage
    '@nuxtjs/component-cache',

    // With options
    ['@nuxtjs/component-cache', {
      max: 10000,
      maxAge: 1000 * 60 * 60
    }],
  ]
}
```

See [component-level caching](http://ssr.vuejs.org/en/caching.html#component-level-caching) for more information.

## Don't forget, that

- Cache-able component **must define a unique `name` option**.
- You should ***NOT*** cache components, that
  - has child components that may rely on global state.
  - has child components that produces side effects on the render `context`.
