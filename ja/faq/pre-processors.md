---
title: プリプロセッサ
description: Nuxt.js でプリプロセッサを使うには？
---

# プリプロセッサを使うには？

[vue-loader](http://vue-loader.vuejs.org/en/configurations/pre-processors.html) のおかげで、ただ `lang` 属性を使うだけで `<template>` や `<script>` あるいは `<style>` などのためのプリプロセッサを使うことができます。

[Pug](https://github.com/pugjs/pug)、[CoffeeScript](http://coffeescript.org)、及び [Sass](http://sass-lang.com/) を使った `pages/index.vue` の例:

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

<style lang="scss">
.red {
  color: red
}
</style>
```

これらのプリプロセッサを使うために Webpack のローダーをインストールする必要があります。

```bash
npm install --save-dev pug@2.0.3 pug-plain-loader coffeescript coffee-loader node-sass sass-loader
```
