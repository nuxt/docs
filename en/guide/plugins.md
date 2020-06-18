---
title: Plugins
description: Nuxt.js allows you to define JavaScript plugins to be run before instantiating the root Vue.js Application. This is especially helpful when using Vue libraries, external modules or your own plugins.
---

> Nuxt.js allows you to define JavaScript plugins to be run before instantiating the root Vue.js Application. This is especially helpful when using Vue libraries, external modules or your own plugins.

<div class="Alert">

It is important to know that in any Vue [instance lifecycle](https://vuejs.org/v2/guide/instance.html#Lifecycle-Diagram), only `beforeCreate` and `created` hooks are called **both, from client-side and server-side**. All other hooks are called only from the client-side.

</div>

## External Packages

We may want to use external packages/modules in our application (one great example is [axios](https://github.com/mzabriskie/axios)) for making HTTP request for both server and client.

First, we should install it via npm:

```bash
npm install --save axios
```

Then we can use it directly in our page components:

```html
<template>
  <h1>{{ title }}</h1>
</template>

<script>
import axios from 'axios'

export default {
  async asyncData ({ params }) {
    let { data } = await axios.get(`https://my-api/posts/${params.id}`)
    return { title: data.title }
  }
}
</script>
```

## Vue Plugins

If we want to use Vue plugins, like [vue-notifications](https://github.com/se-panfilov/vue-notifications) to display notification in our application, we need to setup the plugin before launching the app.

We create the file `plugins/vue-notifications.js`:

```js
import Vue from 'vue'
import VueNotifications from 'vue-notifications'

Vue.use(VueNotifications)
```

Then we add the file path inside the `plugins` key of our `nuxt.config.js`:

```js
export default {
  plugins: ['~/plugins/vue-notifications']
}
```

To learn more about the `plugins` configuration key, check out the [plugins api](/api/configuration-plugins).

### ES6 plugins

If the plugin is located in `node_modules` and exports an ES6 module, you may need to add it to the `transpile` build option:

```js
module.exports = {
  build: {
    transpile: ['vue-notifications']
  }
}
```
You can refer to the [configuration build](/api/configuration-build/#transpile) docs for more build options.

## Inject in $root & context

Sometimes you want to make functions or values available across the app.
You can inject those variables into Vue instances (client side), the context (server side) and even in the Vuex store.
It is a convention to prefix those functions with a `$`.

Nuxt provides you an `inject(key, value)` method to do easily, it given as the second parameter when exporting a function. The `$` will be prepended automatically to the key.

`plugins/hello.js`:

```js
export default ({ app }, inject) => {
  // Inject $hello(msg) in Vue, context and store.
  inject('hello', (msg) => console.log(`Hello ${msg}!`))
}
```

`nuxt.config.js`:

```js
export default {
  plugins: ['~/plugins/hello.js']
}
```

Now `$hello(msg)` can be used from `context`, via `this` in Vue instances and via `this` in store `actions`/`mutations`.

`example-component.vue`:

```js
export default {
  mounted () {
    this.$hello('mounted')
    // will console.log 'Hello mounted!'
  },
  asyncData (context) {
    context.$hello('asyncData')
    // If using Nuxt <= 2.12, use 👇
    context.app.$hello('asyncData')
  }
}
```

`store/index.js`:

```js
export const state = () => ({
  someValue: ''
})

export const mutations = {
  changeSomeValue (state, newValue) {
    this.$hello('store mutation')
    state.someValue = newValue
  }
}

export const actions = {
  setSomeValueToWhatever ({ commit }) {
    this.$hello('store action')
    const newValue = 'whatever'
    commit('changeSomeValue', newValue)
  }
}
```

## Client or server side only

Some plugins might work **only in the browser** because they lack SSR support.

### Name conventional plugin

If plugin is assumed to be run only in client or server side, `.client.js` or `.server.js` can be applied as extension of plugin file, the file will be automatically included in corresponding side.

Example:

`nuxt.config.js`:

```js
export default {
  plugins: [
    '~/plugins/foo.client.js', // only in client side
    '~/plugins/bar.server.js', // only in server side
    '~/plugins/baz.js' // both client & server
  ]
}
```

### Object syntax

You can also use the object syntax with the `mode` property (`'client'` or `'server'`) in `plugins`.

Example:

`nuxt.config.js`:

```js
export default {
  plugins: [
    { src: '~/plugins/both-sides.js' },
    { src: '~/plugins/client-only.js', mode: 'client' }, // only on client side
    { src: '~/plugins/server-only.js', mode: 'server' } // only on server side
  ]
}
```

### Using process flags

In case you need to import some libraries in a plugin only on *server-side*, you can check if the `process.server` variable is set to `true`.

Also, if you need to know if you are inside a static app (via `nuxt generate` or `nuxt export`), you can check if `process.static` is set to `true`. This is only the case during and after the generation.

You can also combine both options to hit the spot when a page is being server-rendered by `nuxt build && nuxt export` or `nuxt generate` before being saved (`process.static && process.server`).
