---
title: "API: The validate Method"
description: Nuxt.js lets you define a validator method inside your dynamic route component.
---

# The validate Method

> Nuxt.js lets you define a validator method inside your dynamic route component.

- **Type:** `Function` or `Async Function`

```js
validate({ params, query, store }) {
  return true // if the params are valid
  return false // will stop Nuxt.js to render the route and display the error page
}
```

```js
async validate({ params, query, store }) {
  // await operations
  return true // if the params are valid
  return false // will stop Nuxt.js to render the route and display the error page
}
```

You can also return promises:

```js
validate({ params, query, store }) {
  return new Promise((resolve) => setTimeout(() => resolve()))
}
```

Nuxt.js lets you define a validator method inside your dynamic route component (In this example: `pages/users/_id.vue`).

If the validate method does not return `true`, Nuxt.js will automatically load the 404 error page.

```js
export default {
  validate ({ params }) {
    // Must be a number
    return /^\d+$/.test(params.id)
  }
}
```

You can also check some data in your [store](/guide/vuex-store) for example (filled by [`nuxtServerInit`](/guide/vuex-store#the-nuxtserverinit-action) before action):

```js
export default {
  validate ({ params, store }) {
    // Check if `params.id` is an existing category
    return store.state.categories.some((category) => category.id === params.id)
  }
}
```

You can also throw expected or unexpected errors during validate function executation:

```js
export default {
  async validate ({ params, store }) {
    // Throws a 500 internal server error with custom message
    throw new Error('Under Construction!')
  }
}
```
