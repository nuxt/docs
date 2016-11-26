---
title: page.data
---

# Pages data

Nuxt.js supercharges the pages component by overwriting the [Vue.js data](https://vuejs.org/v2/api/#data) option. This way, the page component can make asynchronous operations before returning the component real data.

<div class="Alert Alert--blue">The `data` option is called every time before loading the component. It is called from the server-side or before navigating to the corresponding route.</div>

## data(context)

- **Type:** `Function`
- **Arguments:**
  - `Object`, see [context](/api/pages-context)
- **Return:** `Object | Promise`

### Details

<div class="Alert Alert--orange">You do **not** have access to `this` (component instance) inside `data` because it is called before initiating the page component.</div>

The data method receives the context as the first argument, you can use it to fetch some data and return the component data. To make the data method asynchronous, Nuxt.js offers you 2 ways, choose the one you're the most familiar with:

1. Returning a `Promise`, Nuxt.js will wait for the promise to be resolved before rendering the Component
2. Define a second argument which is a `callback` method to be called like this: `callback(err, data)`

### Returning an Object

You can use `data` like the Vue.js way if you don't need to do any asynchronous call:

```js
export default {
  data (context) {
    return { foo: 'bar' }
  }
}
```

### Returning a Promise

Nuxt.js can wait before setting the component data, simply return a `Promise` and Nuxt.js will wait for it to be resolved:

```js
import axios from 'axios'

export default {
  data ({ params }) {
    return axios.get(`https://my-api/posts/${params.id}`)
    .then((res) => {
      return { title: res.data.title }
    })
  }
}
```

### Using the callback argument

If you are not familiar of using the promises, you can use the callback argument:

```js
import axios from 'axios'

export default {
  data ({ params }, callback) {
    axios.get(`https://my-api/posts/${params.id}`)
    .then((res) => {
      callback(null, { title: res.data.title })
    })
  }
}
```

## Handling Errors

Nuxt.js add the `error(params)` method in the context, you can call it to display the error page (`pages/_error.vue`).

Params:
- `statusCode` (`Number`): status code used to render the proper status code form the server-side
- `message` (`String`): message displayed in the error page

Example with a Promise:
```js
export default {
  data ({ params, error }) {
    return axios.get(`https://my-api/posts/${params.id}`)
    .then((res) => ...)
    .catch((e) => {
      error({ statusCode: 404, message: 'Post not found' })
    })
  }
}
```
If you're using the callback argument, you can call it directly with the error, Nuxt.js will call the error method for you:
```js
export default {
  data ({ params }, callback) {
    axios.get(`https://my-api/posts/${params.id}`)
    .then((res) => ...)
    .catch((e) => {
      callback({ statusCode: 404, message: 'Post not found' })
    })
  }
}
```
