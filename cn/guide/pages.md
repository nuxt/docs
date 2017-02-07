---
title: 页面
description: 你可以在 pages 目录下创建各种 Vue 文件（页面组件），Nuxt.js 会自动依据文件目录结构生成对应的页面路由配置。同时 Nuxt.js 为这些页面组件提供了一系列的功能特性以便你能快速搭建应用的基础架构。
---

> 你可以在 `pages` 目录下创建各种 Vue 文件（页面组件），Nuxt.js 会自动依据文件目录结构生成对应的页面路由配置。同时 Nuxt.js 为这些页面组件提供了一系列的功能特性以便你能快速搭建应用的基础架构。

## 页面组件特殊的键

页面组件实际上是 Vue 组件，只不过 Nuxt.js 为这些组件添加了一些特殊的键（对应 Nuxt.js 提供的功能特性）以便你能快速开发通用应用。

Nuxt.js 提供的特殊的键：

| 属性名 | 描述 |
|-----------|-------------|
| data | 最重要的一个键, 和 [Vue data](https://vuejs.org/v2/api/#Options-Data) 具有相同的作用，除此之外它支持 [异步数据处理](/guide/async-data)，另外 `data` 方法的第一个参数为当前页面组件的 [上下文对象](/api/pages-context)。|
| fetch | 与 `data` 方法类似，用于在渲染页面之前获取数据填充应用的状态树（store）。不同的是 `fetch` 方法不会设置组件的数据。详情请参考 [关于fetch方法的文档](/guide/vuex-store#the-fetch-method)。 |
| layout | 指定当前页面使用的布局（`layouts` 根目录下的布局文件）。详情请参考 [关于 布局 的文档](/guide/layouts)。 |
| transition | 指定页面切换的过渡动效, 详情请参考 [路由动效](/guide/routes-transitions)。 |
| scrollToTop | 布尔值，默认: `false`。 用于判定渲染页面前是否需要将当前页面滚动至顶部。这个配置用于 [内嵌子路由](/guide/nested-routes)的应用场景。 |
| validate | 校验方法用于校验 [动态路由](/guide/dynamic-routes#validate-route-params)的参数。 |
| middleware | 指定页面的中间件，中间件会在页面渲染之前被调用， 请参考 [路由中间件](/guide/routes-middleware)。|


## 一个简单的页面

页面组件实际上是增强版的 Vue 组件。下面我们新建一个简单的页面显示一个红色的标题 『Hello World！』。

在 `pages` 目录下新增 `pages/index.vue`：

```html
<template>
  <h1 class="red">Hello {{ name }}!</h1>
</template>

<script>
export default {
  data () {
    return { name: 'World' }
  }
}
</script>

<style>
.red {
  color: red;
}
</style>
```

## 预处理器

得益于 [vue-loader](http://vue-loader.vuejs.org/en/configurations/pre-processors.html)， 我们可以在页面组件的 `<template>`、 `<script>` 或 `<style>` 上通过指定 `lang` 属性来使用各种预处理器。

举个栗子，在 `pages/index.vue` 中使用 [Pug](https://github.com/pugjs/pug)、 [CoffeeScript](http://coffeescript.org) 和 [Sass](http://sass-lang.com/)：

```html
<template lang="pug">
  h1.red Hello {{ name }}!
</template>

<script lang="coffee">
module.exports = data: ->
  { name: 'World' }
</script>

<style lang="sass">
.red
  color: red
</style>
```

当然，使用这些预处理器需要安装对应的 Webpack 加载器。
```bash
npm install --save-dev pug@2.0.0-beta6 pug-loader coffee-script coffee-loader node-sass sass-loader
```

## 使用 JSX

如果想在组件里使用 JSX，首先你需要安装 JSX 的Babel插件：

```bash
npm install --save-dev babel-plugin-syntax-jsx babel-plugin-transform-vue-jsx babel-helper-vue-jsx-merge-props
```

然后, 在 `nuxt.config.js` 中配置 nuxt.js 使用 [transform-vue-jsx](https://github.com/vuejs/babel-plugin-transform-vue-jsx) 插件：

```js
module.exports = {
  build: {
    babel: {
      plugins: ['transform-vue-jsx']
    }
  }
}
```

提示：想了解 Babel 配置项的更多信息，请参考 [关于 build 配置的文档](/api/configuration-build)。

现在，你可以在组件的 `render` 方法里使用 JSX 啦：

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

关于 JSX 的详细使用信息，可在参考 [在Vue.js 里面使用 JSX](https://vuejs.org/v2/guide/render-function.html#JSX)。
