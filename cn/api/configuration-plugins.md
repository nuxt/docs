---
title: "API: plugins 属性配置"
description: plugins 属性使得你可以轻易地为 Nuxt.js 配置使用 Vue.js 插件。
---

# plugins 属性配置

- 类型： `Array`
  - 数组元素类型： `String` or `Object`

如果传入的数组元素为 Object ，其属性为:
  - src: `String` (档案路径)
  - ssr: `Boolean` (默认值 `true`) *如果 false, 该档案只会在 client-side 加载*

> `plugins` 属性使得你可以轻易地为 Nuxt.js 配置使用 Vue.js 插件。

例如 (`nuxt.config.js`)：
```js
module.exports = {
  plugins: ['~plugins/vue-notifications']
}
```

然后, 我们需要创建 `plugins/vue-notifications.js` 文件：
```js
import Vue from 'vue'
import VueNotifications from 'vue-notifications'

Vue.use(VueNotifications)
```

`plugins` 属性配置的所有插件会在 Nuxt.js 应用初始化之前被加载**导入**。

每次你需要使用 `Vue.use()` 时，你需要在 `plugins/` 目录下创建相应的插件文件，并在 `nuxt.config.js` 中的 `plugins` 配置项中配置插件的路径。

想了解更多关于使用插件的信息，请移步 [插件使用指引](/guide/plugins#使用-vue-插件)。
