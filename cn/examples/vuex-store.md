---
title: Vuex 状态树
description: Nuxt.js 的 Vuex 状态树示例
github: vuex-store
---

## 文档

> 对于每个大项目来说，使用状态树 (store) 管理状态 (state) 十分有必要。这就是为什么 nuxt.js 内核实现了 Vuex。

### 使用状态树 (store)

Nuxt.js 会试着 `require('./store/index.js')`。如果该文件存在，它会引入 `Vuex`，加到 vendors 中去并在 `Vue` 根实例中添加 `store` 变量。

### 新建状态树 (store) 目录

我们来新建 `store/index.js` 文件：

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

> 我们不需要安装 `Vuex` 因为 nuxt.js 已经自带了

### 就是这样！

现在我们可以在 `.vue` 文件中使用 `this.$store` 变量啦。

```html
<template>
  <button @click="$store.commit('increment')">{{ $store.state.counter }}</button>
</template>
```

### fetch (context)

> 会在渲染页面前被调用，作用是填充状态树 (store) 数据

如果设置 `fetch` 函数的话，它就会在组件加载前被调用（*前提是被绑定到一个路由上*）。它可能会被服务端调用，或者在跳转到相对应的路由前被调用。

这个 `fetch` 函数接收的第一个参数是上下文对象 (context)，我们可以用它来获取一些数据并填充状态树 (store)。为了让获取过程可以异步，你需要**返回一个 Promise**，nuxt.js 会等这个 promise 完成后再渲染组件。

示例：
```js
export default {
  fetch ({ store, params }) {
    return axios.get('http://my-url')
    .then((res) => {
      store.commit('setUser', res.data)
    })
  }
}
```

### 上下文

想了解 `context` 变量的所有属性的话，请查阅 [这个示例](examples/async-datas)。

### Action `nuxtServerInit`

如果我们在 store 文件中定义一个 `nuxtServerInit` action 的话，Nuxt.js 就会带着上下文 (context) 调用这个函数。当我们想要把服务端的一些数据传递给客户端，比如已登录的用户对象，就可以这么做：
```js
// store/index.js
actions: {
  nuxtServerInit ({ commit }, { req }) {
    if (req.authUser) {
      commit('user', req.authUser)
    }
  }
}
```

`nuxtServerInit` 函数接收的上下文对象和 `fetch` 的一样，但不包括 `context.redirect()` 和 `context.error()`。
