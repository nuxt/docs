---
title: Pré-processeurs
description: Comment utiliser des pré-processeurs avec Nuxt.js?
---

# Comment utiliser des pré-processeurs?

Grâce à [vue-loader](http://vue-loader.vuejs.org/en/configurations/pre-processors.html), vous pouvez utiliser n'importe quel pré-processeur pour vos `<template>`, `<script>` or `<style>`: il suffit d'utiliser l'attribut `lang`.

Exemple d'une `pages/index.vue` utilisant [Pug](https://github.com/pugjs/pug), [CoffeeScript](http://coffeescript.org) et [Sass](http://sass-lang.com/):

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

Pour ête en mesure d'utiliser ces pré-processeurs, nous devons installer leurs loaders webpack:
```bash
npm install --save-dev pug@2.0.0-beta6 pug-loader coffee-script coffee-loader node-sass sass-loader
```
