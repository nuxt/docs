---
title: Vuex Store
description: nuxt.js가 Vuex를 구현하는 핵심 이유는, 저장소를 사용하여 상태를 관리하는 것은 모든 대형 애플리케이션에서 중요하기 때문입니다.
---

> nuxt.js가 [Vuex](https://github.com/vuejs/vuex) 구현하는 핵심 이유는, 저장소를 사용하여 상태를 관리하는 것은 모든 대형 애플리케이션에서 중요하기 때문입니다.

## Store 활성화하기

Nuxt.js는 store 디렉토리를 바라보고 있습니다. 만약 `store` 디렉토리가 존재한다면:

1. Vuex를 불러옵니다.
2. 벤더 번들에 `vuex` 모듈을 추가합니다.
3. 루트 `Vue` 인스턴스에 `store` 옵션을 추가합니다.

Nuxt.js에서는 **2가지 store 모드** 를 지원하며, 선호하는 모드를 사용합니다:
- **클래식:** `store/index.js`에서 store 인스턴스를 return 합니다.
- **모듈:** store 디렉토리 내의 모든 .js 파일이 [같은 이름의 모듈](http://vuex.vuejs.org/en/modules.html)로 변환됩니다. (`index`는 루트 모듈이 됩니다.)

## 클래식 모드

클래식 모드를 사용하려면 `store/index.js` 파일을 만들고 store 인스턴스를 export 하면 됩니다:

```js
import Vuex from 'vuex'

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

> nuxt.js에 `vuex`가 포함되어 있기 때문에 따로 설치할 필요 없습니다.

이제 컴포넌트에서 `this.$store`를 사용할 수 있습니다:

```html
<template>
  <button @click="$store.commit('increment')">{{ $store.state.counter }}</button>
</template>
```

## 모듈 모드

> Nuxt.js는 `store` 디렉토리에서 모든 모듈을 관리할 수 있도록 해줍니다.

만약 모듈 모드를 원한다면 `store/index.js` 파일에 store 인스턴스 대신 state와 mutaions, actions를 export 합니다:

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

이제 `store/todos.js` 파일을 만들 수 있습니다:
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

store는 아래와 같이 생성될 것입니다:
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

이제 `pages/todos.vue` 컴포넌트에서 `todos` 모듈을 사용해보겠습니다:

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

<div class="Alert">각 파일에서 store 인스턴스를 export할 수 있지만, 이 경우 수동으로 store에 추가해줘야 합니다.</div>

## fetch 메소드

> fetch 메소드는 페이지를 렌더링하기 전에 store를 채우기 위해서 사용됩니다. 컴포넌트의 data를 설정하지 않는다는 점을 빼고는 data 메소드와 비슷합니다.

fetch 메소드에 대한 더 많은 정보: [API 페이지 fetch](/api/pages-fetch)

## nuxtServerInit 액션

만약 store에 `nuxtServerInit`가 정의되면, nuxt.js는 서버사이드에서 context와 함께 이 함수를 호출합니다. 이는 서버에서 받은 데이터를 클라이언트로 직접 전달할 때 유용합니다.

예를 들어, 서버에서 세션을 가지고 있다면 `req.session.user`로 접근이 가능합니다. store로 유저의 인증 정보를 전달하기 위해서는 `store/index.js`를 아래와 같이 수정합니다:

```js
actions: {
  nuxtServerInit ({ commit }, { req }) {
    if (req.session.user) {
      commit('user', req.session.user)
    }
  }
}
```

> 만약 _모듈_ 모드를 사용한다면 최상위 모듈(`store/index.js`)에서만 이 함수가 호출되기 때문에 다른 모듈에 대한 액션을 이곳에서 같이 처리해야 합니다.

context는 `nuxtServerInit` 함수의 두 번째 인자로 주어지는데, `context.redirect()`와 `context.error()` 메소드를 빼고는 `data`나 `fetch` 메소드와 같습니다.
