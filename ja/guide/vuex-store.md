---
title: Vuex ストア
description: 状態を管理してくれる Vuex ストアは、あらゆる大規模アプリケーションにとても役に立ちます。Nuxt.js が Vuex をコアに組み入れたのはそのような理由からです。
---

> 状態を管理してくれる Vuex ストアは、あらゆる大規模アプリケーションにとても役に立ちます。Nuxt.js が [Vuex](https://vuex.vuejs.org/ja/) をコアに組み入れたのはそのような理由からです。

## ストアを有効にする

Nuxt.js は `store` ディレクトリを探索し存在するときには以下を実行します:

1. Vuex をインポートします
2. `store` オプションをルートの Vue インスタンスに追加します

Nuxt.js では **2つのモードのストア** があります。どちらか好みのほうを選んで使ってください:

- **クラシックモード:** `store/index.js` がストアインスタンスを返します
- **モジュールモード:** `store` ディレクトリ内のすべての `*.js` ファイルが [モジュール](https://vuex.vuejs.org/ja/guide/modules.html) に変換されます（`index` はルートモジュールとして存在します）

モードに関わらず、サーバーサイドで不要な*共有*状態を避けるため、`state` の値は**常に `function`** でなければなりません。

## クラシックモード

ストアをクラシックモードで有効にするには、Vuex インスタンスを返すメソッドをエクスポートする `store/index.js` ファイルを作成します:

```js
import Vuex from 'vuex'

const createStore = () => {
  return new Vuex.Store({
    state: () => ({
      counter: 0
    }),
    mutations: {
      increment (state) {
        state.counter++
      }
    }
  })
}

export default createStore
```

> `vuex` は Nuxt.js によって取り込まれているため、別途インストールする必要はありません。

クラシックモードを有効にすると、コンポーネント内で `this.$store` を使うことができます:

```html
<template>
  <button @click="$store.commit('increment')">{{ $store.state.counter }}</button>
</template>
```

## モジュールモード

> Nuxt.js では `store` ディレクトリ内にモジュールと対応するファイルを持つことができます。

このオプションを使いたいときは、ストアインスタンスの代わりに、`store/index.js` 内でステート、ミューテーション、アクションをエクスポートします:

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

また、次のような `store/todos.js` ファイルを作成できます:

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

ストアは下記のようになります:

```js
new Vuex.Store({
  state: () => ({
    counter: 0
  }),
  mutations: {
    increment (state) {
      state.counter++
    }
  },
  modules: {
    namespaced: true,
    todos: {
      state: () => ({
        list: []
      }),
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

> モジュールメソッドは、 `store` ディレクトリにあるサブディレクトリの実装なしにトップレベルの定義に対しても機能します。

ステートの例です。`store/state.js` を作成し、以下の行を追加します。

```js
export default () => ({
  counter: 0
})
```

対応するミューテーションは `store/mutations.js` にあります。

```js
export default {
  increment (state) {
    state.counter++
  }
}
```

<div class="Alert">ストアインスタンスをエクスポートすることでモジュールを持つこともできます。その際にはモジュールをストアに手動で追加する必要があります。</div>

### モジュールファイル

オプションでモジュールファイルを `state.js`、` actions.js`、 `mutations.js`、` getters.js` といった別々のファイルに分離することができます。`index.js` ファイルで状態やゲッター、ミューテーションを持ちながら、アクションを別のファイルを分けた場合もまた適切に認識されます。

### プラグイン

プラグインを `store/index.js` ファイルに置くことで、ストア（モジュールモード）に追加できます:

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

プラグインについてのさらに詳しい情報は [Vuex ドキュメント](https://vuex.vuejs.org/ja/guide/plugins.html) を参照してください。

## fetch メソッド

> fetch メソッドは、ページがレンダリングされる前に、データをストアに入れるために使われます。コンポーネントのデータをセットしないという点を除いては data メソッドとよく似ています。

fetch メソッドについてより深く理解するためには [ページの fetch メソッド API](/api/pages-fetch) を参照してください。

## nuxtServerInit アクション

`nuxtServerInit` というアクションがストア内に定義されているときは、Nuxt.js はそれをコンテキストとともに呼び出します（ただしサーバーサイドに限ります）。サーバーサイドからクライアントサイドに直接渡したいデータがあるときに便利です。

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

> Vuex ストアの *モジュール* モードを使っている場合はなら、プライマリモジュール（`store/index.js`）のみ、このアクションを受け取ることができます。その他のモジュールのアクションでも使いたい場合は、プライマリモジュールからチェインする必要があります。

[コンテキスト](/api/context)は、`asyncData`や `fetch` メソッドと同様に`nuxtServerInit` に第二引数として渡されます。

> 注意: 非同期の nuxtServerInit アクションは nuxt サーバーの待機を可能にするために Promise を返さなければなりません

```js
actions: {
  async nuxtServerInit({ dispatch }) {
    await dispatch('core/load')
  }
}
```

## Vuex Strict モード

Strict モードは dev モードではデフォルトで有効化されており、production モードでは無効化されています。strict モードを dev で無効化するには、以下の例を参照してください。

### モジュールモード

`export const strict = false`

### クラシックモード

```
import Vuex from 'vuex'

const createStore = () => {
  return new Vuex.Store({
    strict: false,
    state: () => ({
      counter: 0
    }),
    mutations: {
      increment (state) {
        state.counter++
      }
    }
  })
}

export default createStore
```
