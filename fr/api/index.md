---
title: "API: The asyncData Method"
description: You may want to fetch data and render it on the server-side. Nuxt.js add an `asyncData` method let you handle async operation before setting the component data.
---

# The asyncData Method (En)

> You may want to fetch data and render it on the server-side.
Nuxt.js add an `asyncData` method let you handle async operation before setting the component data.

- **Type:** `Function`

<p style="width: 294px;position: fixed; top : 64px; right: 4px;" class="Alert Alert--orange"><strong>⚠Cette page est actuellement en cours de traduction française. Vous pouvez repasser plus tard ou <a href="https://github.com/vuejs-fr/nuxt" target="_blank">participer à la traduction</a> de celle-ci dès maintenant !</strong></p><p>`asyncData` is called every time before loading the component (**only for pages components**). It can be called from the server-side or before navigating to the corresponding route. This method receives the [context](/api/context) (object) as the first argument, you can use it to fetch some data and return the component data.</p>

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
