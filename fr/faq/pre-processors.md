---
title: Pre-processors
description: How to use pre-processors with Nuxt.js?
---

# How to use pre-processors? (En)

<p style="width: 294px;position: fixed; top : 64px; right: 4px;" class="Alert Alert--orange"><strong>⚠Cette page est actuellement en cours de traduction française. Vous pouvez repasser plus tard ou <a href="https://github.com/vuejs-fr/nuxt" target="_blank">participer à la traduction</a> de celle-ci dès maintenant !</strong></p><p>Thanks to [vue-loader](http://vue-loader.vuejs.org/en/configurations/pre-processors.html), you can use any kind of pre-processors for your `<template>`, `<script>` or `<style>`: simply use the `lang` attribute.</p>

Example of our `pages/index.vue` using [Pug](https://github.com/pugjs/pug), [CoffeeScript](http://coffeescript.org) and [Sass](http://sass-lang.com/):

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

To be able to use these pre-processors, we need to install their webpack loaders:
```bash
npm install --save-dev pug@2.0.0-beta6 pug-loader coffee-script coffee-loader node-sass sass-loader
```
