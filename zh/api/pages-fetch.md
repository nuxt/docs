---
title: "API: fetch 方法"
description: fetch 方法用于在渲染页面前填充应用的状态树（store）数据， 与 asyncData 方法类似，不同的是它不会设置组件的数据。
---

# fetch 方法

> fetch 方法用于在渲染页面前填充应用的状态树（store）数据， 与 asyncData 方法类似，不同的是它不会设置组件的数据。

- **类型：** `Function`

如果页面组件设置了 `fetch` 方法，它会在组件每次加载前被调用（在服务端或切换至目标路由之前）。

`fetch` 方法的第一个参数是页面组件的[上下文对象](/api/#上下文对象) `context`，我们可以用 `fetch` 方法来获取数据填充应用的状态树。为了让获取过程可以异步，你需要**返回一个 Promise**，Nuxt.js 会等这个 promise 完成后再渲染组件。

例如 `pages/index.vue`：
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

你也可以使用 `async` 或 `await` 的模式简化代码如下：

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
