---
title: page.fetch
---

# Pages fetch

<p class="info">This method is advised to be used with the `store` and *only* for dispatching store actions.</p>

The `fetch` option, *if set*, is called every time before loading the component. It is called from the server-side or before navigating to the corresponding route.

## fetch(context)

- **Type:** `Function`
- **Arguments:**
  - `Object`, see [context](/api/pages-context)
- **Return:** `Promise`

### Details

The fetch method receives the context as the first argument, we can use it to fetch some data and fill the store. To make the fetch method asynchronous, simply **return a Promise**, Nuxt.js will wait for the promise to be resolved before rendering the Component.

### Example

```js
export default {
  fetch ({ store }}) {
    return store.dispatch('fetchPosts')
  }
}
```

In `store/index.js`:

```js
// ...
actions: {
  fetchPosts ({ commit }) {
    return axios.get('https//my-api/posts')
    .then((res) => {
      commit('SET_POSTS', res.data)
    })
  }
}
// ...
```

When the page will be rendered, the store will be filled and we will be able to show the `$store.state` inside the template.
