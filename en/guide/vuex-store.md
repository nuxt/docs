---
title: Vuex Store
description: Using a store to manage the state is important for every big application, that's why Nuxt.js implements Vuex in its core.
---

> Using a store to manage the state is important to every big application, that's why nuxt.js implement [Vuex](https://vuex.vuejs.org/en/) in its core.

## Activate the Store

Nuxt.js will look for the `store` directory, if it exists, it will:

1. Import Vuex,
2. Add `vuex` module in the vendors bundle,
3. Add the `store` option to the root Vue instance.

Nuxt.js lets you have **2 modes of store**, choose the one you prefer:

- **Classic:** `store/index.js` returns a store instance.
- **Modules:** every `.js` file inside the `store` directory is transformed as a [namespaced module](http://vuex.vuejs.org/en/modules.html) (`index` being the root module).

## Classic mode

To activate the store with the classic mode, we create the `store/index.js` file which should export a method which returns a Vuex instance:

```js
import Vuex from 'vuex'

const createStore = () => {
  return new Vuex.Store({
    state: {
      counter: 0
    },
    mutations: {
      increment (state) {
        state.counter++
      }
    }
  })
}

export default createStore
```

> We don't need to install `vuex` since it's shipped with Nuxt.js.

We can now use `this.$store` inside our components:

```html
<template>
  <button @click="$store.commit('increment')">{{ $store.state.counter }}</button>
</template>
```

## Modules mode

> Nuxt.js lets you have a `store` directory with every file corresponding to a module.

If you want this option, export the state as a function, and the mutations and actions as objects in `store/index.js` instead of a store instance:

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

Then, you can have a `store/todos.js` file:

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

The store will be as such:

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

And in your `pages/todos.vue`, using the `todos` module:

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

<div class="Alert">You can also have modules by exporting a store instance, you will have to add them manually on your store.</div>

### Plugins

You can add additional plugin to the store (in Modules Mode) putting it into the `store/index.js` file:

```js
import myPlugin from 'myPlugin'

export const plugins = [ myPlugin ]

export const state = () => ({
  counter: 0
})

export const mutations = {
  increment (state) {
    state.counter++
  }
}
```

More information about the plugins: [Vuex documentation](https://vuex.vuejs.org/en/plugins.html).

## The fetch Method

> The `fetch` method is used to fill the store before rendering the page, it's like the `data` method except it doesn't set the component data.

More information about the fetch method: [API Pages fetch](/api/pages-fetch).

## The nuxtServerInit Action

If the action `nuxtServerInit` is defined in the store, Nuxt.js will call it with the context (only from the server-side). It's useful when we have some data on the server we want to give directly to the client-side.

For example, let's say we have sessions on the server-side and we can access the connected user through `req.session.user`. To give the authenticated user to our store, we update our `store/index.js` to the following:

```js
actions: {
  nuxtServerInit ({ commit }, { req }) {
    if (req.session.user) {
      commit('user', req.session.user)
    }
  }
}
```

> If you are using the _Modules_ mode of the Vuex store, only the primary module (in `store/index.js`) will receive this action. You'll need to chain your module actions from there.

The context is given to `nuxtServerInit` as the 2nd argument, it is the same as the `data` or `fetch` method except that `context.redirect()` and `context.error()` are omitted.

> Note: Asynchronous `nuxtServerInit` actions must return a Promise to allow the `nuxt` server to wait on them.
