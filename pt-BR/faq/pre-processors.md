---
title: Pre-processors
description: How to use pre-processors with Nuxt.js?
---

# How to use pre-processors?

Thanks to [Vue Loader](http://vue-loader.vuejs.org/en/configurations/pre-processors.html), you can use any kind of pre-processors for your `<template>`, `<script>` or `<style>`: simply use the `lang` attribute.

Example of our `pages/index.vue` using [Pug](https://github.com/pugjs/pug), [CoffeeScript](http://coffeescript.org) and [Sass](http://sass-lang.com/):

```html
<template lang="pug">
  h1.red Hello {{ name }}!
</template>

<script lang="coffee">
export default data: ->
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

To be able to use these pre-processors, we need to install their webpack loaders:

```bash
npm install --save-dev pug@2.0.3 pug-plain-loader coffeescript coffee-loader node-sass sass-loader
```
