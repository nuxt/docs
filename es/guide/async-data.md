---
title: Async Data
description: Nuxt.js supercharges the data method from vue.js to let you handle async operation before setting the component data.
---

> Nuxt.js *supercharges* the `data` method from vue.js to let you handle async operation before setting the component data.

## The data Method

`data` is called every time before loading the component (**only for pages components**). It can be called from the server-side or before navigating to the corresponding route. This method receives [the context](/api#context) as the first argument, you can use it to fetch some data and return the component data.

<div class="Alert Alert--orange">You do **NOT** have access of the component instance trough `this` inside `data` because it is called **before initiating** the component.</div>

To make the data method asynchronous, nuxt.js offers you different ways, choose the one you're the most familiar with:

1. returning a `Promise`, nuxt.js will wait for the promise to be resolved before rendering the component.
2. Using the [async/await proposal](https://github.com/lukehoban/ecmascript-asyncawait) ([learn more about it](https://zeit.co/blog/async-and-await))
3. Define a callback as second argument. It has to be called like this: `callback(err, data)`

### Returning a Promise
```js
export default {
  data ({ params }) {
    return axios.get(`https://my-api/posts/${params.id}`)
    .then((res) => {
      return { title: res.data.title }
    })
  }
}
```

### Using async/await
```js
export default {
  async data ({ params }) {
    let { data } = await axios.get(`https://my-api/posts/${params.id}`)
    return { title: data.title }
  }
}
```

### Using a callback
```js
export default {
  data ({ params }, callback) {
    axios.get(`https://my-api/posts/${params.id}`)
    .then((res) => {
      callback(null, { title: res.data.title })
    })
  }
}
```

### Returning an Object

If you don't need to do any asynchronous call, you can simply return an object:

```js
export default {
  data (context) {
    return { foo: 'bar' }
  }
}
```

### Displaying the data

When the data method set, you can display the data inside your template like you used to do:

```html
<template>
  <h1>{{ title }}</h1>
</template>
```

## The Context

To see the list of available keys in `context`, take a look at the [API Pages data](/api).

## Handling Errors

Nuxt.js add the `error(params)` method in the `context`, you can call it to display the error page. `params.statusCode` will be also used to render the proper status code form the server-side.

Example with a `Promise`:
```js
export default {
  data ({ params, error }) {
    return axios.get(`https://my-api/posts/${params.id}`)
    .then((res) => {
      return { title: res.data.title }
    })
    .catch((e) => {
      error({ statusCode: 404, message: 'Post not found' })
    })
  }
}
```

If you're using the `callback` argument, you can call it directly with the error, nuxt.js will call the `error` method for you:
```js
export default {
  data ({ params }, callback) {
    axios.get(`https://my-api/posts/${params.id}`)
    .then((res) => {
      callback(null, { title: res.data.title })
    })
    .catch((e) => {
      callback({ statusCode: 404, message: 'Post not found' })
    })
  }
}
```

To customize the error page, take a look at the [VIEWS layouts section](/guide/views#layouts).
