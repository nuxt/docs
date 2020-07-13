---
title: Хранилище Vuex
description: Использование хранилища для управления состоянием приложения важно для любого крупного проекта, поэтому Nuxt.js использует Vuex в своём ядре. 
---

> Использование хранилища для управления состоянием приложения важно для любого крупного проекта, поэтому Nuxt.js использует [Vuex](https://vuex.vuejs.org/en/) в своём ядре.

<div class="Promo__Video">
  <a href="https://vueschool.io/lessons/utilising-the-vuex-store-nuxtjs?friend=nuxt" target="_blank">
    <p class="Promo__Video__Icon">
      Смотрите бесплатные уроки <strong>Nuxt.js и Vuex</strong> на Vue School 
    </p>
  </a>
</div>

## Активация хранилища

Nuxt.js будет искать директорию `store`, если она существует - происходит следующее:

1. Импортируется Vuex,
2. Опция  `store` добавляется к корневому экземпляру Vue.

Nuxt.js предлагает **2 режима** работы с хранилищем, вы можете выбрать более подходящий для себя:

- **Модульный:** каждый `.js` файл внутри директории `store` превращается в [модуль с пространством имён](http://vuex.vuejs.org/en/modules.html) (`index` - корневой модуль).
- **Классический (__устаревший__):** `store/index.js` возвращает метод для создания экземпляра хранилища.

Независимо от режима, ваше значение `state` должно **всегда быть функцией**, чтобы избежать нежелательного *общего* состояния на стороне сервера.

## Модульный режим

> Nuxt.js позволяет вам иметь директорию `store` с каждым файлом соответствующим модулю.

Для начала, экспортируем состояние как функцию, а мутации и действия - как объекты в `store/index.js`:

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

Теперь мы можем использовать файл `store/todos.js`:

```js
export const state = () => ({
  list: []
})

export const mutations = {
  add (state, text) {
    state.list.push({
      text,
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

Создадим хранилище:

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
    todos: {
      namespaced: true,
      state: () => ({
        list: []
      }),
      mutations: {
        add (state, { text }) {
          state.list.push({
            text,
            done: false,
            id: Date.now()
          })
        },
        remove (state, { todo }) {
          state.list = state.list.filter(item => item.id !== todo.id)
        },
        toggle (state, { todo }) {
          todo.done = !todo.done
        }
      }
    }
  }
})
```

И в нашем `pages/todos.vue`, используя модуль `todos`:

```html
<template>
  <ul>
    <li v-for="todo in todos" :key="todo.id">
      <input :checked="todo.done" @change="toggle(todo)" type="checkbox">
      <span :class="{ done: todo.done }">{{ todo.text }}</span>
      <button @click="removeTodo(todo)">удалить</button>
    </li>
    <li><input @keyup.enter="addTodo" placeholder="Что нужно сделать?"></li>
  </ul>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  computed: {
    todos () {
      return this.$store.state.todos.list
    }
  },
  methods: {
    addTodo (e) {
      this.$store.commit('todos/add', e.target.value)
      e.target.value = ''
    },
    ...mapMutations({
      toggle: 'todos/toggle'
    }),
    removeTodo (todo){
      this.$store.commit('todos/remove', todo)
    }
  }
}
</script>

<style>
.done {
  text-decoration: line-through;
}
</style>
```

> Модульный метод также работает и для определений верхнего уровня без реализации под-директории в директории `store`

Пример для хранилища: мы создали файл `store/state.js` и добавляем следующее

```js
export default () => ({
  counter: 0
})
```

Соответствующие мутации могут быть в файле `store/mutations.js`

```js
export default {
  increment (state) {
    state.counter++
  }
}
```

### Файлы модулей

При желании можно разбить файл модуля на отдельные файлы: `state.js`,` actions.js`, `mutations.js` и `getters.js`. Отдельный файл для действий также будет правильно распознан если содержать файл `index.js` с состоянием, геттерами и мутациями.

> Примечание: при использовании модулей с разделенными файлами нужно помнить, что при использовании стрелочных функций ```this``` доступен только лексически.  Лексическая область видимости подразумевает что ```this``` всегда будет указывать на контекст вызова стрелочной функции. Если контекст вызова отсутствует -  ```this``` будет undefined. Решение состоит в том, чтобы использовать "нормальную" функцию, которая создает свою собственную область видимости и, следовательно, имеет ```this```.

### Плагины

В хранилище можно добавить дополнительные плагины (в модульном режиме), просто добавляя их в `store/index.js` файл:

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

Больше о плагинах: [документация Vuex](https://vuex.vuejs.org/en/plugins.html).

## Метод fetch

> Метод `fetch` используется для заполнения хранилища перед рендерингом страницы, он похож на метод `asyncData`, но он не устанавливает данные компонента.

Больше о fetch методе: [API Страницы fetch](/api/pages-fetch).

## Действие nuxtServerInit

Если действие `nuxtServerInit` определено для хранилища (в режиме `universal`) Nuxt.js вызовет его в рамках контекста (только на сервере). Это может быть полезным, если у нас есть данные на сервере, которые мы хотим передать клиентскому приложению напрямую.

Например, предположим что у нас есть хранилище сессий и мы можем получить доступ к пользователю через `req.session.user`. Чтобы указать данные о пользователе в хранилище, добавьте в `store/index.js` следующий код: 

```js
actions: {
  nuxtServerInit ({ commit }, { req }) {
    if (req.session.user) {
      commit('user', req.session.user)
    }
  }
}
```

> При использовании режима _Modules_ в хранилище Vuex, только основной модуль (в `store / index.js`) получит это действие. Нужно будет связать действия модуля оттуда.

[Контекст](/api/context) передаётся в `nuxtServerInit` в качестве второго параметра. В целом метод работает так же как `asyncData` или `fetch`.

Если запущен `nuxt generate`,` nuxtServerInit` будет выполняться для каждого сгенерированного динамического маршрута.

> Примечание: Асинхронные действия `nuxtServerInit` должны возвращать Promise или использовать async / await, чтобы позволить серверу` nuxt` ожидать их.

```js
actions: {
  async nuxtServerInit({ dispatch }) {
    await dispatch('core/load')
  }
}
```

## Строгий режим Vuex

Для режима разработки строгий режим включен по умолчанию, и выключен для продакшн режима. Пример выключения строгого режима для разработки в `store/index.js`:

`export const strict = false`

## Классический режим

> Эта функция устарела, и будет удалена в Nuxt 3.

Чтобы активировать хранилище в классическом режиме, мы создаем файл `store / index.js`, который должен экспортировать метод, который возвращает экземпляр Vuex:

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

> Не нужно устанавливать `vuex`, поскольку он уже есть в Nuxt.js

Теперь можно использовать `this.$store` внутри компонентов:

```html
<template>
  <button @click="$store.commit('increment')">{{ $store.state.counter }}</button>
</template>
```
