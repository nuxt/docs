---
title: Vuex Store
description: Usar un almacén(store) para manejar el estado(state) es importante para cada aplicación grande, es por eso que nuxt.js implementa Vuex en su núcleo.
---

> Usar un almacén(store) para manejar el estado(state) es importante para cada aplicación grande, es por eso que nuxt.js implementa [vuex](https://github.com/vuejs/vuex) en su núcleo.

## Activar el Almacén(store)

Nuxt.js buscará el directorio del `almacén`, si existe, entonces:

1. Importa Vuex
2. Agrega el módulo `vuex` en la agrupación de proveedores
3. Agrega la opción de `almacén` a la instanacia `Vue` de la raíz.

Nuxt.js te permite tener **2 modos de almacén**, elige el que prefieras:
- **Clásico:** `store/index.js` devuelve una instancia de almacén
- **Módulos:** cada archivo `.js` dentro del directorio `store` es transformado como un [módulo con prefijo](http://vuex.vuejs.org/en/modules.html) (`index` viene a ser el módulo raíz)

## Modo clásico

Para activar el almacén en el modo clásico, creamos el archivo `store/index.js` y exportamos la instancia del almacén:

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

> No necesitamos instalas `vuex` ya que este viene con nuxt.js

Ahora podemos usar `this.$store`dentro de nuestro componentes:

```html
<template>
  <button @click="$store.commit('increment')">{{ $store.state.counter }}</button>
</template>
```

## Modo Módulos

> Nuxt.js te permite tener un directorio `store` con cada archivo correspondiente a un módulo.

Si quieres esta opción, exporta el estado, mutaciónes, y acciónes en `store/index.js` en vez de una instancia de almacén:

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

Luego, puedes tener un archivo `store/todos.js`:
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

El almacén sería:
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

Y en tu `pages/todos.vue`, usando el módulo `todos`:

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

<div class="Alert">También puedes tener módulos exportando una instanacia de almácen, tendrías que agregarlos manualmente en tu almacén.</div>

## El Método fetch

> El método fetch es usado para rellenar el almacén antes de que la página se arenderizada, es como el método data excepto que no establece el componente data.

Más información sobre el método fetch: [API Pages fetch](/api/pages-fetch)

## La Acción nuxtServerInit

Si la acción `nuxtServerInit` es definida en el almacén, nuxt.js la llamará junto con el contexto (solo desde el lado del servidor). Es útil cuando tenemos algunos datos en el servidor que queremos llevar directamente al lado del cliente.

Por ejemplo, digamos que tenemos sesiones en el lado del servidor y podemos acceder a los usuarios conectados a través de `req.session.user`. Para llevar al usuario autentificado a nuestro almacén, actualizamos nuestro `store/index.js` con lo siguiente:

```js
actions: {
  nuxtServerInit ({ commit }, { req }) {
    if (req.session.user) {
      commit('user', req.session.user)
    }
  }
}
```

> Si estas usando el modo _Modules_ de Vuex store, solo el módulo primario (en`store/index.js`) recibirá esta acción. Necesitarás encadenar tus acciones de módulo desde ahí.

El contexto es dado a `nuxtServerInit` como el segundo argumento, es el mismo que con el método `data` o `fetch` excepto que `context.redirect()` and `context.error()` son omitidos.
