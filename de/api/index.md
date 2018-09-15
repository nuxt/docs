---
title: "API: The asyncData Method"
description: You may want to fetch data and render it on the server-side. Nuxt.js adds an `asyncData` method that lets you handle async operations before setting the component data.
---

# The asyncData Method

> You may want to fetch data and render it on the server-side. Nuxt.js adds an `asyncData` method that lets you handle async operations before setting the component data.

- **Type:** `Function`

`asyncData` is called every time before loading the component (**only for page components**). It can be called from the server-side or before navigating to the corresponding route. This method receives the [`context`](/api/context) object as the first argument, you can use it to fetch some data and return the component data.

The result from asyncData will be **merged** with data.

```js
export default {
  data () {
    return { project: 'default' }
  },
  asyncData (context) {
    return { project: 'nuxt' }
  }
}
```

<div class="Alert Alert--orange">You do **NOT** have access of the component instance through `this` inside `asyncData` because it is called **before initiating** the component.</div>
