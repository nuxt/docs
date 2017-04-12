---
title: 异步数据
description: 也许你想要在 server-side 获取资料并且渲染，Nuxt.js 增加了 `asyncData` 方法让你能异步获取或处理数据在完成设定组件资料之前。
---

> 也许你想要在 server-side 获取资料并且渲染，Nuxt.js 增加了 `asyncData` 方法让你能异步获取或处理数据在完成设定组件资料之前。

## asyncData 方法


有时候你不想要使用 store (vuex)组件时，但你想要获取一些资料并且在 server-side 渲染。
`asyncData` 每次载入组件时都会执行 (**仅有在 pages 组件**)
它将会于 server-side 或是路由导向相对应的路由时被执行。
这个方法将会接收上下文 [the context](/api#context) 在第一个传入参数，你可以从它获取一些资料，Nuxt.js 将会合并 asyncData 与 data 资料。

<div class="Alert Alert--orange">注意：由于`data`方法是在组件 **初始化** 前被调用的，所以在方法内是没有办法通过 `this` 来引用组件的实例对象。</div>

nuxt.js提供了几种不同的方法来让`data`方法异步化，你可以选择自己熟悉的一种来用：

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


### 数据的展示

asyncData 回傳值將會與 data 的回傳值**合併**。
可以顯示回傳值在你文件中的 template 區塊，就像你習慣的 Vue.js 語法。

```html
<template>
  <h1>{{ title }}</h1>
</template>
```

## 上下文对象

`data`方法的第一个参数指向当前页面的上下文对象 `context`，可通过 [页面数据API](/api) 来了解该对象的所有属性和方法。

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
