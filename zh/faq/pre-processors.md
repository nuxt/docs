---
title: 预处理器
description: 如何在 Nuxt.js 中使用预处理器？
---

# 如何在 Nuxt.js 中使用预处理器？

得益于 [vue-loader](http://vue-loader.vuejs.org/en/configurations/pre-processors.html), 我们可以通过 `lang` 属性在组件中的`<template>`， `<script>` 或 `<style>` 上使用各种预处理器。

举个例子，我们在 `pages/index.vue` 组件中使用 [Pug](https://github.com/pugjs/pug)， [CoffeeScript](http://coffeescript.org) 和 [Sass](http://sass-lang.com/)：

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
