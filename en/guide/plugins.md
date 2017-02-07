---
title: Plugins
description: Nuxt.js allows you to define js plugins to be ran before instantiating the root vue.js application, it can be to use your own library or external modules.
---

> Nuxt.js allows you to define js plugins to be ran before instantiating the root vue.js application, it can be to use your own library or external modules.

<div class="Alert">It is important to know that in any Vue [instance lifecycle](https://vuejs.org/v2/guide/instance.html#Lifecycle-Diagram), only `beforeCreate` and `created` hooks are called **both from client-side and server-side**. All other hooks are called only from the client-side.</div>

## External Packages

We may want to use external packages/modules in our application, one great example is [axios](https://github.com/mzabriskie/axios) for making HTTP request for both server and client.

We install it via NPM:

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
  async data ({ params }) {
    let { data } = await axios.get(`https://my-api/posts/${params.id}`)
    return { title: data.title }
  }
}
</script>
```

But there is **one problem here**, if we import axios in another page, it will be included again for the page bundle. We want to include `axios` only once in our application, for this, we use the `build.vendor` key in our `nuxt.config.js`:

```js
module.exports = {
  build: {
    vendor: ['axios']
  }
}
```

Then, I can import `axios` anywhere without having to worry about making the bundle bigger!

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
  plugins: ['~plugins/vue-notifications']
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
  plugins: ['~plugins/vue-notifications']
}
```

## Client-side only

Some plugins might work **only for the browser**, you can use the `process.BROWSER_BUILD` variable to check if the plugin will run from the client-side.

Example:
```js
import Vue from 'vue'
import VueNotifications from 'vue-notifications'

if (process.BROWSER_BUILD) {
  Vue.use(VueNotifications)
}
```

In case you need to require some libraries only for the server, you can use the `process.SERVER_BUILD` variable set to `true` when webpack is creating the `server.bundle.js` file.
