---
title: Vuex Store
description: L'utilisation d'un store pour gérer l'état est important pour toutes les applications de taille importante, c'est pourquoi nuxt.js met en œuvre Vuex dans son cœur.
---

> L'utilisation d'un store pour gérer l'état est important pour toutes les applications de taille importante, c'est pourquoi nuxt.js met en œuvre [vuex](https://github.com/vuejs/vuex) dans son cœur.

## Activer le Store

Nuxt.js recherchera le répertoire `store`; si il existe il:

1. Importera Vuex
2. Ajoutera le module `vuex` dans le vendors bundle
3. Ajoutera l'option `store` à l'instance racine de `Vue`.

Nuxt.js vous laisse le choix entre **2 modes de store**, choisissez celui qui vous convient le mieux:
- **Classique:** `store/index.js` retourne une instance
- **Modules:** chaque fichier `.js` dans le répertoire `store` est transformé en tant que [module avec son propre espace de nom](http://vuex.vuejs.org/en/modules.html) (`index` étant le module racine)

## Mode classique

Pour activer le store avec le mode classique, nous créons `store/index.js` dans lequel nous exportons l'instance du store:

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

> Pas besoin d'installer `vuex` étant livré avec nuxt.js

Nous pouvons alors utiliser `this.$store` dans nos composants:

```html
<template>
  <button @click="$store.commit('increment')">{{ $store.state.counter }}</button>
</template>
```

## Mode modules

> Nuxt.js vous permet d'avoir un répertoire `store` dans lequel chaque fichier correspond à un module.

Si vous voulez cette option, exportez le `state`, les mutations et les actions dans `store/index.js` au lieu de l'instance `store`:

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

Puis, vous pouvez avoir `store/todos.js`:
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

Le store sera comme suit:
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

Et dans votre `pages/todos.vue`, utiliser le module `todos`:

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

<div class="Alert">Vous pouvez également avoir des modules en exportant une instance store; vous devrez les ajouter manuellement sur votre store.

## La méthode fetch

> La méthode fetch est utilisée pour remplir le store avant de faire le rendu de la page, c'est comme la méthode data sauf qu'elle ne définit pas les données du composant.

Plus d'informations à propos de la méthode fetch: [API Pages fetch](/api/pages-fetch)

## L'action nuxtServerInit

Si l'action `nuxtServerInit` est définie dans le store, nuxt.js l'appellera avec le contexte (uniquement côté serveur). C'est utile lorsque nous disposons de données sur le serveur que nous voulons donner directement au client.

Par exemple, disons que nous avons des sessions côté serveur et nous pouvons accéder à l'utilisateur connecté grâce à `req.session.user`. Pour donner l'utilisateur authentifié à notre store, nous mettons à jour notre `store/index.js` comme suit:

```js
actions: {
  nuxtServerInit ({ commit }, { req }) {
    if (req.session.user) {
      commit('user', req.session.user)
    }
  }
}
```

> Si vous utilisez le mode _Modules_ du store Vuex, seul le module principal (dans `store/index.js`) recevra cette action. Vous devrez chainer vos actions de module à partir de là.

Le contexte est fourni par `nuxtServerInit` comme 2ème argument. C'est le même que pour les méthodes `data` et `fetch` excepté que `context.redirect()` et `context.error()` sont omis.
