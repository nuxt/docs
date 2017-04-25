---
title: JSX
description: 如何在 Nuxt.js 中使用 JSX？
---

# 如何在 Nuxt.js 中使用 JSX？

Nuxt.js 使用 Vue.js 官方的 [babel-preset-vue-app](https://github.com/vuejs/babel-preset-vue-app) 做 babel 的默认配置。

你可以在组件的 `render` 方法中直接使用 `JSX` 而不需要做额外的配置：

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

<p class="Alert Alert--info">这里的`h` 为 `createElement` 的简化别名，这是 Vue.js 使用 JSX 的惯例用法，且不能省略。 如果 `h` 参数被省略，应用在构建编译的时候会报错。</p>

更多关于 `JSX` 的使用信息，请移步 Vue.js 官方文档的 [JSX 章节](https://vuejs.org/v2/guide/render-function.html#JSX)
