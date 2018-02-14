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

### 普通方式

使用普通方式的状态树，需要添加 `store/index.js` 文件，并对外暴露一个 Vuex.Store 实例：

```js
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = () => new Vuex.Store({

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

### 模块方式

> 状态树还可以拆分成为模块，`store` 目录下的每个 `.js` 文件会被转换成为状态树[指定命名的子模块](http://vuex.vuejs.org/en/modules.html)

使用**状态树模块化**的方式，`store/index.js` 不需要返回 Vuex.Store 实例，而应该直接将 `state`、`mutations` 和 `actions` 暴露出来：

```js
export const state = () => ({
  counter: 0
})

export const mutations = {
  increment (state) {
    state.counter++
  }
}
```

其他的模块文件也需要采用类似的方式，如 `store/todos.js` 文件：

```js
export const state = () => ({
  list: []
})

export const mutations = {
  add (state, text) {
    state.list.push({
      text: text,
      done: false
    })
  },
  remove (state, { todo }) {
    state.list.splice(state.list.indexOf(todo), 1)
  },
  toggle (state, todo) {
    todo.done = !todo.done
  }
}
```

最终的状态树大概如下：

```js
new Vuex.Store({
  state: { counter: 0 },
  mutations: {
    increment (state) {
      state.counter++
    }
  },
  modules: {
    todos: {
      state: {
        list: []
      },
      mutations: {
        add (state, { text }) {
          state.list.push({
            text,
            done: false
          })
        },
        remove (state, { todo }) {
          state.list.splice(state.list.indexOf(todo), 1)
        },
        toggle (state, { todo }) {
          todo.done = !todo.done
        }
      }
    }
  }
})
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

> fetch 方法会在渲染页面前被调用，作用是填充状态树 (store) 数据，与 asyncData 方法类似，不同的是它不会设置组件的数据。

关于 `fetch` 方法的更多信息，请参考 [页面 fetch 方法API](/api/pages-fetch)。

## nuxtServerInit 方法

如果在状态树中指定了 `nuxtServerInit` 方法，Nuxt.js 调用它的时候会将页面的上下文对象作为第2个参数传给它（服务端调用时才会酱紫哟）。当我们想将服务端的一些数据传到客户端时，这个方法是灰常好用的。

举个例子，假设我们服务端的会话状态树里可以通过 `req.session.user` 来访问当前登录的用户。将该登录用户信息传给客户端的状态树，我们只需更新 `store/index.js` 如下：

```js
actions: {
  nuxtServerInit ({ commit }, { req }) {
    if (req.session.user) {
      commit('user', req.session.user)
    }
  }
}
```

> 如果你使用_状态树模块化_的模式，只有主模块（即 `store/index.js`）适用设置该方法（其他模块设置了也不会被调用）。

`nuxtServerInit` 方法接收的上下文对象和 `fetch` 的一样，但不包括 `context.redirect()` 和 `context.error()`。
