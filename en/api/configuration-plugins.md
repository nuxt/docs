---
title: 'API: The plugins Property'
description: 'Use vue.js plugins with the plugins option of Nuxt.js.'
---

# The plugins Property

- Type: `Array`
  - Items: `String` or `Object`

If the item is an object, the properties are:

  - src: `String` (path of the file)
  - ssr: `Boolean` (default to `true`) *If false, the file will be included only on the client-side.*

> The plugins property lets you add vue.js plugins easily to your main application.


UI framework example (`nuxt.config.js`):

```js
export default {
  plugins: ['@/plugins/ant-design-vue']
}
```

This refers to a file in `plugins/ant-design-vue.js`:

```js
import Vue from 'vue'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css' // Per Ant Design's docs

Vue.use(Antd)
```

Note that the css was [imported as per Ant Design Documentation](https://vue.ant.design/docs/vue/getting-started/#3.-Use-antd's-Components "External tip relevant to building plugins")


All the paths defined in the `plugins` property will be **imported** before initializing the main application.

## When do I use plugins?

Every time you need to use `Vue.use()`, you should create a file in `plugins/` and add its path to `plugins` in `nuxt.config.js`.

To learn more how to use the plugins, see the [guide documentation](/guide/plugins#vue-plugins).
