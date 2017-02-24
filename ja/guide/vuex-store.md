---
title: Vuex ストア
description: 状態を管理してくれる Vuex ストアは、あらゆる大規模アプリケーションにとても役に立ちます。Nuxt.js が Vuex をコアに組み入れたのはそのような理由からです。
---

<!-- title: Vuex Store -->
<!-- description: Using a store to manage the state is important for every big application, that's why nuxt.js implement Vuex in its core. -->

<!-- \> Using a store to manage the state is important to every big application, that's why nuxt.js implement [vuex](https://github.com/vuejs/vuex) in its core. -->

> 状態を管理してくれる Vuex ストアは、あらゆる大規模アプリケーションにとても役に立ちます。Nuxt.js が [Vuex](https://github.com/vuejs/vuex) をコアに組み入れたのはそのような理由からです。

<!-- ## Activate the Store -->

## ストアを有効にする

<!-- Nuxt.js will look for the `store` directory, if it exists, it will: -->

Nuxt.js は `store` ディレクトが存在するときにはそちらを探索します:

<!-- 1. Import Vuex -->
<!-- 2. Add `vuex` module in the vendors bundle -->
<!-- 3. Add the `store` option to the root `Vue` instance. -->

1. Vuex をインポートします
2. `vuex` モジュールを vendor のバンドルファイルに追加します
3. `store` オプションをルートの `Vue` インスタンスに追加します

<!-- Nuxt.js lets you have **2 modes of store**, choose the one you prefer: -->

Nuxt.js では **2つのモードのストア** があります。どちらか好みのほうを選んで使ってください:

<!-- - **Classic:** `store/index.js` returns a store instance -->
<!-- - **Modules:** every `.js` file inside the `store` directory is transformed as a [namespaced module](http://vuex.vuejs.org/en/modules.html) (`index` being the root module) -->

- **クラシックモード:** `store/index.js` がストアインスタンスを返します
- **モジュールモード:** `store` ディレクトリ内のすべての `.js` ファイルが [モジュール](http://vuex.vuejs.org/en/modules.html) に変換されます（`index` はルートモジュールとして存在します）

<!-- ## Classic mode -->

## クラシックモード

<!-- To activate the store with the classic mode, we create the `store/index.js` file and export the store instance: -->

ストアをクラシックモードで有効にするには `store/index.js` ファイルを作成し、ストアインスタンスをエクスポートします:

```js
import Vuex from 'vuex'

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

<!-- \> We don't need to install `vuex` since it's shipped with nuxt.js -->

> `vuex` は Nuxt.js によって取り込まれているため、別途インストールする必要はありません

<!-- We can now use `this.$store` inside our components: -->

クラシックモードを有効にすると、コンポーネント内で `this.$store` を使うことができます:

```html
<template>
  <button @click="$store.commit('increment')">{{ $store.state.counter }}</button>
</template>
```

<!-- ## Modules mode -->

## モジュールモード

<!-- \> Nuxt.js lets you have a `store` directory with every file corresponding to a module. -->

> Nuxt.js では `store` ディレクトリ内にモジュールと対応するファイルを持つことができます。

<!-- If you want this option, export the state, mutations and actions in `store/index.js` instead of a store instance: -->

このオプションを使いたいときは、ストアインスタンスの代わりに、`store/index.js` 内のストア、ミューテーション、アクションをエクスポートします:

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

<!-- Then, you can have a `store/todos.js` file: -->

また、次のような `store/todos.js` ファイルを作成できます:

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
  delete (state, { todo }) {
    state.list.splice(state.list.indexOf(todo), 1)
  },
  toggle (state, todo) {
    todo.done = !todo.done
  }
}
```

<!-- The store will be as such: -->

ストアは下記のようになります:

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
        delete (state, { todo }) {
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

<!-- And in your `pages/todos.vue`, using the `todos` module: -->

そして `pages/todos.vue` 内で `todos` モジュールを下記のように使うことができます:

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

<!-- <div class="Alert">You can also have modules by exporting a store instance, you will have to add them manually on your store.</div> -->

<div class="Alert">ストアインスタンスをエクスポートすることでモジュールを持つこともできます。その際にはモジュールをストアに手動で追加する必要があります。</div>

<!-- ## The fetch Method -->

## fetch メソッド

<!-- \> The fetch method is used to fill the store before rendering the page, it's like the data method except it doesn't set the component data. -->

fetch メソッドは、ページがレンダリングされる前に、データをストアに入れるために使われます。コンポーネントのデータをセットしないという点を除いては data メソッドとよく似ています。

<!-- More information about the fetch method: [API Pages fetch](/api/pages-fetch) -->

fetch メソッドについてより深く理解するためには [ページの fetch メソッド API](/api/pages-fetch) を参照してください。

<!-- ## The nuxtServerInit Action -->

## nuxtServerInit アクション

<!-- If the action `nuxtServerInit` is defined in the store, nuxt.js will call it with the context (only from the server-side). It's useful when we have some data on the server we want to give directly to the client-side. -->

`nuxtServerInit` というアクションがストア内に定義されているときは、Nuxt.js はそれを context とともに呼び出します（ただしサーバーサイドに限ります）。サーバー上に、クライアントサイドに直接渡したいデータがあるときに便利です。

<!-- For example, let's say we have sessions on the server-side and we can access the connected user trough `req.session.user`. To give the authenticated user to our store, we update our `store/index.js` to the following: -->

例えば、サーバーサイドでセッションを持っていて、接続しているユーザーに `req.session.user` を通じてアクセスできるとします。認証されたユーザーにストアを渡すために `store/index.js` 下記のように書き換えます:

```js
actions: {
  nuxtServerInit ({ commit }, { req }) {
    if (req.session.user) {
      commit('user', req.session.user)
    }
  }
}
```

<!-- \> If you are using the _Modules_ mode of the Vuex store, only the primary module (in `store/index.js`) will receive this action. You'll need to chain your module actions from there. -->

> もし Vuex ストアの _モジュール_ モードを使っているなら、（`store/index.js` 内の）プライマリモードのみ、このアクションを受け取ることができます。そこからモジュールのアクションをつなぐ必要があります。（訳注: 訳に自信なし。原文は If you are using the _Modules_ mode of the Vuex store, only the primary module (in `store/index.js`) will receive this action. You'll need to chain your module actions from there.）

<!-- The context is given to `nuxtServerInit` as the 2nd argument, it is the same as the `data` or `fetch` method except that `context.redirect()` and `context.error()` are omitted. -->

context は `nuxtServerInit` へ第二引数として渡されます。`context.redirect()` や `context.error()` が除外される点を除いては `data` メソッドや `fetch` メソッドと共通しています。
