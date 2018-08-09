---
title: Plugins
description: Nuxt.js allows you to define JavaScript plugins to be run before instantiating the root Vue.js Application. This is especially helpful when using your own libraries or external modules.
---

> Nuxt.js allows you to define JavaScript plugins to be run before instantiating the root vue.js application. This is especially helpful when using your own libraries or external modules.

<div class="Alert">It is important to know that in any Vue [instance lifecycle](https://vuejs.org/v2/guide/instance.html#Lifecycle-Diagram), only `beforeCreate` and `created` hooks are called **both from client-side and server-side**. All other hooks are called only from the client-side.</div>

## External Packages

We may want to use external packages/modules in our application, one great example is [axios](https://github.com/mzabriskie/axios) for making HTTP request for both server and client.

We install it via npm:

```bash
npm install --save axios
```

Then, we can use it directly in our pages:

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

But there is **one problem here**. If we import axios in another page, it will be included again for the page bundle. We want to include `axios` only once in our application. To do this, we use the `build.vendor` key in our `nuxt.config.js`:

```js
module.exports = {
  build: {
    vendor: ['axios']
  }
}
```

Then, we can import `axios` anywhere without having to worry about making the bundle bigger!

## Vue Plugins

If we want to use [vue-notifications](https://github.com/se-panfilov/vue-notifications) to display notification in our application, we need to setup the plugin before launching the app.

File `plugins/vue-notifications.js`:

```js
import Vue from 'vue'
import VueNotifications from 'vue-notifications'

Vue.use(VueNotifications)
```

Then, we add the file inside the `plugins` key of `nuxt.config.js`:

```js
module.exports = {
  plugins: ['~/plugins/vue-notifications']
}
```

To learn more about the `plugins` configuration key, check out the [plugins api](/api/configuration-plugins).

Actually, `vue-notifications` will be included in the app bundle, but because it's a library, we want to include it in the vendor bundle for better caching.

We can update our `nuxt.config.js` to add `vue-notifications` in the vendor bundle:

```js
module.exports = {
  build: {
    vendor: ['vue-notifications']
  },
  plugins: ['~/plugins/vue-notifications']
}
```

## Inject in $root & context

Sometimes you want to make functions or values available across the app.
You can inject those variables into Vue instances (client side), the context (server side) and even in the Vuex store.
It is a convention to prefix those functions with a `$`.

### Inject into Vue instances

Injecting content into Vue instances works similar to when doing this in standard Vue apps.

`plugins/vue-inject.js`:

```js
import Vue from 'vue'

Vue.prototype.$myInjectedFunction = (string) => console.log("This is an example", string)
```

`nuxt.config.js`:

```js
module.exports = {
  plugins: ['~/plugins/vue-inject.js']
}
```

You can now use the function in all your Vue components.

`example-component.vue`:

```js
export default {
  mounted(){
    this.$myInjectedFunction('test')
  }
}
```


### Inject into context

Injecting content into Vue instances works similar to when doing this in standard Vue apps.

`plugins/ctx-inject.js`:

```js
export default ({ app }, inject) => {
  // Set the function directly on the context.app object
  app.myInjectedFunction = (string) => console.log('Okay, another function', string)
}
```

`nuxt.config.js`:

```js
module.exports = {
  plugins: ['~/plugins/ctx-inject.js']
}
```

The function is now available whenever you have access to the `context` (for example in `asyncData` and `fetch`).

`ctx-example-component.vue`:

```js
export default {
  asyncData(context){
    context.app.myInjectedFunction('ctx!')
  }
}
```

### Combined inject

If you need the function in the `context`, Vue instances and maybe even in the Vuex store, you can use the `inject` function, which is the second parameter of the plugins exported function.

Injecting content into Vue instances works similar to when doing this in standard Vue apps.

`plugins/combined-inject.js`:

```js
export default ({ app }, inject) => {
  inject('myInjectedFunction', (string) => console.log('That was easy!', string))
}
```

`nuxt.config.js`:

```js
module.exports = {
  plugins: ['~/plugins/combined-inject.js']
}
```

Now the function can be used from `context`, via `this` in Vue instances and via `this` in store `actions`/`mutations`.

`ctx-example-component.vue`:

```js
export default {
  mounted(){
      this.$myInjectedFunction('works in mounted')
  },
  asyncData(context){
    context.app.myInjectedFunction('works with context')
  }
}
```

`store/index.js`:

```js
export const state = () => ({
  someValue: ''
})

export const mutations = {
  changeSomeValue(state, new) {
    this.$myInjectedFunction('accessible in mutations')
    state.someValue = new
  }
}

export const actions = {
  setSomeValueToWhatever ({ commit }) {
    this.$myInjectedFunction('accessible in actions')
    const new = "whatever"
    commit('changeSomeValue', new)
  }
}

```



## Client-side only

Some plugins might work **only for the browser**, you can use the `ssr: false` option in `plugins` to run the file only on the client-side.

Example:

`nuxt.config.js`:

```js
module.exports = {
  plugins: [
    { src: '~/plugins/vue-notifications', ssr: false }
  ]
}
```

`plugins/vue-notifications.js`:

```js
import Vue from 'vue'
import VueNotifications from 'vue-notifications'

Vue.use(VueNotifications)
```

In case you need to require some libraries only for the server, you can use the `process.server` variable set to `true` when webpack is creating the `server.bundle.js` file.

Also, if you need to know if you are inside a generated app (via `nuxt generate`), you can check `process.static`, set to `true` during generation and after. To know the state when a page is being server-rendered by `nuxt generate` before being saved, you can use `process.static && process.server`.
