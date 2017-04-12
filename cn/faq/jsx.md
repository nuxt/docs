---
title: JSX
description: 如何在 Nuxt.js 中使用 JSX？
---

# 如何在 Nuxt.js 中使用 JSX？

Nuxt.js 使用官方 [babel-preset-vue-app](https://github.com/vuejs/babel-preset-vue-app) 设置 babel 预设值，所以你可以在你的组件中使用 JSX。
 

现在，你可以在组件的 `render` 方法中使用 `JSX` 了：

```html
<script>
export default {
  data () {
    return { name: 'World' }
  },
  render (h) {
    return <h1 class="red">{this.name}</h1>
  }
}
</script>
```
<p class="Alert Alert--info">`createElement` 别名为 `h`
是您在 Vue 系统中看到的常见约定，他是 JSX 所必需的。如果 `h` 无法在范围内使用, **你的应用程式将会抛出错误**.</p>

更多关于 `JSX` 的使用信息，请移步 Vue.js 官方文档的 [JSX 章节](https://vuejs.org/v2/guide/render-function.html#JSX)
