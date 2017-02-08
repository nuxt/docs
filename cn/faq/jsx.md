---
title: JSX
description: 如何在 Nuxt.js 中使用 JSX？
---

# 如何在 Nuxt.js 中使用 JSX？

想在组件中使用 `JSX`，首先你需要安装 `JSX` 的各种 `babel` 插件：

```bash
npm install --save-dev babel-plugin-syntax-jsx babel-plugin-transform-vue-jsx babel-helper-vue-jsx-merge-props
```

然后，在 `nuxt.config.js` 中， 告诉 Nuxt.js 使用 [transform-vue-jsx](https://github.com/vuejs/babel-plugin-transform-vue-jsx) 插件：

```js
module.exports = {
  build: {
    babel: {
      plugins: ['transform-vue-jsx']
    }
  }
}
```

想了解更多关于 `babel` 的配置信息，请参考 [build 配置文档](/api/configuration-build)。

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

更多关于 `JSX` 的使用信息，请移步 Vue.js 官方文档的 [JSX 章节](https://vuejs.org/v2/guide/render-function.html#JSX)
