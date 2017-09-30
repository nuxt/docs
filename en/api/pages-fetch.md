---
title: "API: The fetch Method"
description: The fetch method is used to fill the store before rendering the page, it's like the asyncData method except it doesn't set the component data.
---

# The fetch Method (En)

> The fetch method is used to fill the store before rendering the page, it's like the asyncData method except it doesn't set the component data.

- **Type:** `Function`

<p style="width: 294px;position: fixed; top : 64px; right: 4px;" class="Alert Alert--orange"><strong>⚠Cette page est actuellement en cours de traduction française. Vous pouvez repasser plus tard ou <a href="https://github.com/vuejs-fr/nuxt" target="_blank">participer à la traduction</a> de celle-ci dès maintenant !</strong></p><p>The `fetch` method, *if set*, is called every time before loading the component (**only for pages components**). It can be called from the server-side or before navigating to the corresponding route.</p>

The `fetch` method receives [the context](/api/context) as the first argument, we can use it to fetch some data and fill the store. To make the fetch method asynchronous, **return a Promise**, nuxt.js will wait for the promise to be resolved before rendering the Component.

Example of `pages/index.vue`:
```html
<template>
  <h1>Stars: {{ $store.state.stars }}</h1>
</template>

<script>
export default {
  fetch ({ store, params }) {
    return axios.get('http://my-api/stars')
    .then((res) => {
      store.commit('setStars', res.data)
    })
  }
}
</script>
```

You can also use async/await to make your code cleaner:

```html
<template>
  <h1>Stars: {{ $store.state.stars }}</h1>
</template>

<script>
export default {
  async fetch ({ store, params }) {
    let { data } = await axios.get('http://my-api/stars')
    store.commit('setStars', data)
  }
}
</script>
```
