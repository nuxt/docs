---
title: Custom Routes
---

# Custom Routes

To define a dynamic route with a param, you need to define a `.vue` file **prefixed by an underscore**.

This file tree:

```bash
pages/
--| users/
-----| _id.vue
-----| index.vue
```

will automatically generate:

```js
router: {
  routes: [
    {
      name: 'users',
      path: '/users',
      component: 'pages/users/index.vue'
    },
    {
      name: 'users-id',
      path: '/users/:id',
      component: 'pages/users/_id.vue'
    }
  ]
}
```

### Additional feature: validate (optional)

Nuxt.js lets you define a validator function inside your dynamic route component (In this example: `pages/users/_id.vue`).

If the validate method does not return `true`, Nuxt.js will automatically load the 404 error page.

```js
<script>
export default {
  validate ({ params }) {
    return /^\d+$/.test(params.id)
  }
}
</script>
```
