---
title: Vuex Store
description: Using a store to manage the state is important to every big application, that's why nuxt.js implement Vuex in its core.
---

> Using a store to manage the state is important to every big application, that's why nuxt.js implement [vuex]()https://github.com/vuejs/vuex in its core.

## Activate the Store

Nuxt.js will try to `require('./store/index.js')`, if exists, it will:

1. Import Vuex
2. Add `vuex` module in the vendors bundle
3. Add the `store` option to the root `Vue` instance.

To activate the store, we create the `store/index.js` file:

```js
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    counter: 0
  },
  mutations: {
    increment (state) {
      state.counter++
    }
  }
})

export default store
```

> We don't need to install `vuex` since it's shipped with nuxt.js

We can now use `this.$store` inside our components:

```html
<template>
  <button @click="$store.commit('increment')">{{ $store.state.counter }}</button>
</template>
```

## The fetch Method

> The fetch method is used to fill the store before rendering the page, it's like the data method except it doesn't set the component data.

The `fetch` method, *if set*, is called every time before loading the component (**only for pages components**). It can be called from the server-side or before navigating to the corresponding route.

The `fetch` method receives [the context](/api/pages-context) as the first argument, we can use it to fetch some data and fill the store. To make the fetch method asynchronous, **return a Promise**, nuxt.js will wait for the promise to be resolved before rendering the Component.

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

## The Context

To see the list of available keys in `context`, take a look at the [pages context api](/api/pages-context).

## The nuxtServerInit Action

If the action `nuxtServerInit` is defined in the store, nuxt.js will call it with the context (only from the server-side). It's useful when we have some data on the server we want to give directly to the client-side.

For example, let's say we have a session store and we can access the connected user trough `req.authUser`. To give the authenticated user to our store, we update our `store/index.js` to the following:

```js
actions: {
  nuxtServerInit ({ commit }, { req }) {
    if (req.authUser) {
      commit('user', req.authUser)
    }
  }
}
```

The context is given to `nuxtServerInit` as the 2nd argument, it is the same as the `data` or `fetch` method except that `context.redirect()` and `context.error()` are omitted.
