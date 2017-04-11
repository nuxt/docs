---
title: プリプロセッサ
description: Nuxt.js でプリプロセッサを使うには？
---

<!-- title: Pre-processors -->
<!-- description: How to use pre-processors with Nuxt.js? -->

<!-- # How to use pre-processors? -->

# プリプロセッサを使うには？

<!-- Thanks to [vue-loader](http://vue-loader.vuejs.org/en/configurations/pre-processors.html), you can use any kind of pre-processors for your `<template>`, `<script>` or `<style>`: simply use the `lang` attribute. -->

[vue-loader](http://vue-loader.vuejs.org/en/configurations/pre-processors.html) のおかげで、ただ `lang` 属性を使うだけで `<template>` や `<script>` あるいは `<style>` などのためのプリプロセッサを使うことができます。

<!-- Example of our `pages/index.vue` using [Pug](https://github.com/pugjs/pug), [CoffeeScript](http://coffeescript.org) and [Sass](http://sass-lang.com/): -->

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
```

<!-- To be able to use these pre-processors, we need to install their webpack loaders: -->

これらのプリプロセッサを使うために Webpack のローダーをインストールする必要があります。

```bash
npm install --save-dev pug@2.0.0-beta6 pug-loader coffee-script coffee-loader node-sass sass-loader
```
