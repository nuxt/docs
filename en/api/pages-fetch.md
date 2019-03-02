---
title: "API: The fetch Method"
description: The `fetch` method is used to fill the store before rendering the page, it's like the `asyncData` method except it doesn't set the component data.
---

# The fetch Method

> The fetch method is used to fill the store before rendering the page, it's like the `asyncData` method except it doesn't set the component data.

- **Type:** `Function`

The `fetch` method, *if set*, is called every time before loading the component (**only for page components**). It will be called server-side once (on the first request to the Nuxt app) and client-side when navigating to further routes. 

The `fetch` method receives [the `context`](/api/context) object as the first argument, we can use it to fetch some data and fill the store. To make the `fetch` method asynchronous, **return a Promise**, Nuxt.js will wait for the promise to be resolved before rendering the component.


<div class="Alert Alert--orange">

**Warning**: You **don't** have access of the component instance through `this` inside `fetch` because it is called **before initiating** the component.

</div>


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

You can also use `async`/`await` to make your code cleaner:

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

## Vuex

If you want to call a store action, use `store.dispatch` inside `fetch`, make sure to wait for the end of the action by using `async`/`await` inside:

```html
<script>
export default {
  async fetch ({ store, params }) {
    await store.dispatch('GET_STARS');
  }
}
</script>
```

`store/index.js`

```js
// ...
export const actions = {
  async GET_STARS ({ commit }) {
    const { data } = await axios.get('http://my-api/stars')
    commit('SET_STARS', data)
  }
}
```

## Listening to query string changes

The `fetch` method **is not called** on query string changes by default. If you want to change this behavior, for example when building a pagination component, you can setup parameters that should be listened to through the `watchQuery` property of your page component. Learn more on the [API `watchQuery` page](/api/pages-watchquery).
