---
title: Vuex 状态树
description: 对于每个大项目来说，使用状态树 (store) 管理状态 (state) 十分有必要。这就是为什么 Nuxt.js 内核实现了 Vuex。
---

> 对于每个大项目来说，使用状态树 (store) 管理状态 (state) 十分有必要。这就是为什么 Nuxt.js 内核实现了 [Vuex](https://github.com/vuejs/vuex)。

## 使用状态树

Nuxt.js 会尝试找到应用根目录下的 `store` 目录，如果该目录存在，它将做以下的事情：

1. 引用 `vuex` 模块
2. 将 `vuex` 模块 加到 vendors 构建配置中去
3. 设置 `Vue` 根实例的 `store` 配置项

Nuxt.js 支持两种使用 `store` 的方式，你可以择一使用：
- **普通方式：** `store/index.js` 返回一个 Vuex.Store 实例
- **模块方式：** `store` 目录下的每个 `.js` 文件会被转换成为状态树[指定命名的子模块](http://vuex.vuejs.org/en/modules.html) （当然，`index` 是根模块）

使用普通方式的状态树，需要要添加 `store/index.js` 文件，并对外暴露一个 Vuex.Store 实例：

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

> Nuxt.js 内置引用了 `vuex` 模块，所以不需要额外安装。

现在我们可以在组件里面通过 `this.$store` 来使用状态树：

```html
<template>
  <button @click="$store.commit('increment')">{{ $store.state.counter }}</button>
</template>
```

## 状态树模块化

> 状态树还可以拆分成为模块，`store` 目录下的每个 `.js` 文件会被转换成为状态树[指定命名的子模块](http://vuex.vuejs.org/en/modules.html)

使用**状态树模块化**的方式，`store/index.js` 不需要返回 Vuex.Store 实例，而应该直接将 `state`、`mutations` 和 `actions` 暴露出来：

```js
export const state = {
  counter: 0
}

export const mutations = {
  increment (state) {
    state.counter++
  }
}
```

其他的模块文件也需要采用类似的方式，如 `store/todos.js` 文件：
```js
export const state = {
  list: []
}

export const mutations = {
  add (state, text) {
    state.list.push({
      text: text,
      done: false
    })
  },
  toggle (state, todo) {
    todo.done = !todo.done
  }
}
```

在页面组件 `pages/todos.vue`， 可以像下面这样使用 `todos` 模块：

```html
<template>
  <ul>
    <li v-for="todo in todos">
      <input type="checkbox" :checked="todo.done" @change="toggle(todo)">
      <span :class="{ done: todo.done }">{{ todo.text }}</span>
    </li>
    <li><input placeholder="What needs to be done?" @keyup.enter="addTodo"></li>
  </ul>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  computed: {
    todos () { return this.$store.state.todos.list }
  },
  methods: {
    addTodo (e) {
      this.$store.commit('todos/add', e.target.value)
      e.target.value = ''
    },
    ...mapMutations({
      toggle: 'todos/toggle'
    })
  }
}
</script>

<style>
.done {
  text-decoration: line-through;
}
</style>
```

<div class="Alert">你也可以在模块文件里返回 Vuex.Store 实例，但是这种情况下你需要手工设置应用的状态树。</div>

## fetch 方法

> fetch 方法会在渲染页面前被调用，作用是填充状态树 (store) 数据，与 data 方法类似，不同的是它不会设置组件的数据。

如果页面组件设置了 `fetch` 方法，它会在组件每次加载前被调用（在服务端或切换至目标路由之前）。

`fetch` 方法的第一个参数是页面组件的[上下文对象](/api/pages-context) `context`，我们可以用 `fetch` 方法来获取数据填充应用的状态树。为了让获取过程可以异步，你需要**返回一个 Promise**，Nuxt.js 会等这个 promise 完成后再渲染组件。

举个栗子 `pages/index.vue`：
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

## 上下文对象

想了解 `context` 变量的所有属性的话，请查阅 [页面上下文对象API](/api/pages-context)。

## nuxtServerInit 方法

如果在状态树中指定了 `nuxtServerInit` 方法，Nuxt.js 调用它的时候会将页面的上下文对象作为第2个参数传给它（服务端调用时才会酱紫哟）。当我们想将服务端的一些数据传到客户端时，这个方法是灰常好用的。

举个栗子，假设我们服务端的会话状态树里可以通过 `req.authUser` 来访问当前登录的用户。将该登录用户信息传给客户端的状态树，我们只需更新 `store/index.js` 如下：

```js
actions: {
  nuxtServerInit ({ commit }, { req }) {
    if (req.authUser) {
      commit('user', req.authUser)
    }
  }
}
```
`nuxtServerInit` 方法接收的上下文对象和 `fetch` 的一样，但不包括 `context.redirect()` 和 `context.error()`。
