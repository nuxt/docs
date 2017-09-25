---
title: 异步数据
description: Nuxt.js 扩展了 Vue.js，增加了一个叫 `asyncData` 的方法，使得我们可以在设置组件的数据之前能异步获取或处理数据。
---

> Nuxt.js 扩展了 Vue.js，增加了一个叫 `asyncData` 的方法，使得我们可以在设置组件的数据之前能异步获取或处理数据。

## asyncData 方法

`asyncData`方法会在组件（**限于页面组件**）每次加载之前被调用。它可以在服务端或路由更新之前被调用。
在这个方法被调用的时候，第一个参数被设定为当前页面的[上下文对象](/api#上下文对象)，你可以利用 `asyncData`方法来获取数据，Nuxt.js 会将 `asyncData` 返回的数据融合组件 `data` 方法返回的数据一并返回给当前组件。

<div class="Alert Alert--orange">注意：由于`asyncData`方法是在组件 **初始化** 前被调用的，所以在方法内是没有办法通过 `this` 来引用组件的实例对象。</div>

Nuxt.js 提供了几种不同的方法来使用 `asyncData` 方法，你可以选择自己熟悉的一种来用：

1. 返回一个 `Promise`, nuxt.js会等待该`Promise`被解析之后才会设置组件的数据，从而渲染组件.
2. 使用 [async 或 await](https://github.com/lukehoban/ecmascript-asyncawait) ([了解更多](https://zeit.co/blog/async-and-await))
3. 为第二个参数指定一个回调函数. 注：该回调函数需符合通用的 NodeJs 回调函数的形式: `callback(err, data)`

### 返回 Promise
```js
export default {
  asyncData ({ params }) {
    return axios.get(`https://my-api/posts/${params.id}`)
    .then((res) => {
      return { title: res.data.title }
    })
  }
}
```

### 使用 async或await
```js
export default {
  async asyncData ({ params }) {
    let { data } = await axios.get(`https://my-api/posts/${params.id}`)
    return { title: data.title }
  }
}
```

### 使用 回调函数
```js
export default {
  asyncData ({ params }, callback) {
    axios.get(`https://my-api/posts/${params.id}`)
    .then((res) => {
      callback(null, { title: res.data.title })
    })
  }
}
```

### 返回 对象

如果组件的数据不需要异步获取或处理，可以直接返回指定的字面对象作为组件的数据。

```js
export default {
  data () {
    return { foo: 'bar' }
  }
}
```

### 数据的展示

`asyncData` 方法返回的数据在融合 `data` 方法返回的数据后，一并返回给模板进行展示，如：

```html
<template>
  <h1>{{ title }}</h1>
</template>
```

## 上下文对象

可通过 [页面数据API](/api) 来了解该对象的所有属性和方法。

## 错误处理

Nuxt.js 在上下文对象`context`中提供了一个 `error(params)` 方法，你可以通过调用该方法来显示错误信息页面。`params.statusCode` 可用于指定服务端返回的请求状态码。

以返回 `Promise` 的方式举个例子：
```js
export default {
  asyncData ({ params, error }) {
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

如果你使用 `回调函数` 的方式, 你可以将错误的信息对象直接传给该回调函数， Nuxt.js 内部会自动调用 `error` 方法：
```js
export default {
  asyncData ({ params }, callback) {
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

如果你想定制 Nuxt.js 默认的错误提示页面，请参考 [页面布局](/guide/views#布局)。
