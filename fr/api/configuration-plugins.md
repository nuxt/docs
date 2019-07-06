---
title: 'API: The plugins Property (EN)'
description: 'Use vue.js plugins with the plugins option of Nuxt.js.'
---

# The plugins Property (EN)

**Note**: Since Nuxt.js 2.4, `mode` has been introduced as option of `plugins` to specify plugin type, possible value are: `client` or `server`. `ssr: false` will be adapted to `mode: 'client'` and deprecated in next major release.

- Type: `Array`
  - Items: `String` or `Object`

If the item is an object, the properties are:

  - src: `String` (path of the file)
  - mode: `String` (can be `client` or `server`) *If defined, the file will be included only on the respective (client or server) side.*

**Note**: Old version

- Type: `Array`
  - Items: `String` or `Object`

If the item is an object, the properties are:

  - src: `String` (path of the file)
  - ssr: `Boolean` (default to `true`) *If false, the file will be included only on the client-side.*

> The plugins property lets you add vue.js plugins easily to your main application.

Example (`nuxt.config.js`):

```js
export default {
  plugins: [
    { src: '~/plugins/both-sides.js' },
    { src: '~/plugins/client-only.js', mode: 'client' },
    { src: '~/plugins/server-only.js', mode: 'server' }
  ]
}
```

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

<p style="width: 294px;position: fixed; top : 64px; right: 4px;" class="Alert Alert--orange"><strong>⚠Cette page est actuellement en cours de traduction française. Vous pouvez repasser plus tard ou <a href="https://github.com/vuejs-fr/nuxt" target="_blank">participer à la traduction</a> de celle-ci dès maintenant !</strong></p>
