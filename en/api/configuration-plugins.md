---
title: "API: The plugins Property"
description: Use vue.js plugins with the plugins option of nuxt.js.
---

# The plugins Property (En)

- Type: `Array`
  - Items: `String` or `Object`

<p style="width: 294px;position: fixed; top : 64px; right: 4px;" class="Alert Alert--orange"><strong>⚠Cette page est actuellement en cours de traduction française. Vous pouvez repasser plus tard ou <a href="https://github.com/vuejs-fr/nuxt" target="_blank">participer à la traduction</a> de celle-ci dès maintenant !</strong></p><p>If the item is an object, the properties are:</p>

  - src: `String` (path of the file)
  - ssr: `Boolean` (default to `true`) *If false, the file will be included only on the client-side.*

> The plugins property lets you add vue.js plugins easily to your main application.

Example (`nuxt.config.js`):
```js
module.exports = {
  plugins: ['~/plugins/vue-notifications']
}
```

Then, we need to create a file in `plugins/vue-notifications.js`:
```js
import Vue from 'vue'
import VueNotifications from 'vue-notifications'

Vue.use(VueNotifications)
```

All the paths defined in the `plugins` property will be **imported** before initializing the main application.

Every time you need to use `Vue.use()`, you should create a file in `plugins/` and add its path to `plugins` in `nuxt.config.js`.

To learn more how to use the plugins, see the [guide documentation](/guide/plugins#vue-plugins).
