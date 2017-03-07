---
title: "API: The validate Method"
description: Nuxt.js lets you define a validator method inside your dynamic route component.
---

# The validate Method

> Nuxt.js lets you define a validator method inside your dynamic route component.

- **Type:** `Function`

```js
validate({ params, query }) {
  return true // if the params are valid
  return false // will stop Nuxt.js to render the route and display the error page
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
