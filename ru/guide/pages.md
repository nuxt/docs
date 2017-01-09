---
title: Страницы
description: The pages directory lets you create every kind of routes simply by creating Vue files. These components comes with a set of features to let you bootstrap and maintain your application with ease.
---

> The `pages` directory lets you create every kind of routes simply by creating Vue files. These components comes with a set of features to let you bootsrap and maintain your isomorphic application with ease.

## Special Keys

Every page component is a Vue component, but nuxt.js adds special keys to make the development of your universal application the easiest way possible.

List of all the available keys

| Attribute | Description |
|-----------|-------------|
| data | The most important key, it has the same purpose as [Vue data](https://vuejs.org/v2/api/#Options-Data) but it can be asynchronous and receives the context as argument, please read the [async data documentation](/guide/async-data) to learn how it works. |
| fetch | Used to fill the store before rendering the page, it's like the data method except it doesn't set the component data. See the [fetch method documentation](/guide/vuex-store#the-fetch-method). |
| layout | Specify a layout defined in the `layouts` directory, see [layouts documentation](/guide/layouts). |
| transition | Set a specific transition for the page, see [routes transitions](/guide/routes-transitions). |
| scrollToTop | Boolean, by default: `false`. Specify if you want the page to scroll to the top before rendering the page, it's used for [nested routes](/guide/nested-routes). |
| validate | Validator function for a [dynamic route](/guide/dynamic-routes#validate-route-params). |
| middleware | Set a middleware for this page, the middleware will be called before rendering the page, see [routes middleware](/guide/routes-middleware). |


## A Simple Page

A page component is a Vue component with some superpowers, first, let's have a simple component displaying a red title "Hello World!".

We create our first page `pages/index.vue`:

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

## Using Pre-Processors

Thanks to [vue-loader](http://vue-loader.vuejs.org/en/configurations/pre-processors.html), you can use any kind of pre-processors for your `<template>`, `<script>` or `<style>`: simply use the `lang` attribute.

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

## Using JSX

If you want to use JSX in your components, first, you need to install the Babel plugins for JSX:

```bash
npm install --save-dev babel-plugin-syntax-jsx babel-plugin-transform-vue-jsx babel-helper-vue-jsx-merge-props
```

Then, in your `nuxt.config.js`, tell nuxt.js to use the [transform-vue-jsx](https://github.com/vuejs/babel-plugin-transform-vue-jsx) plugin:

```js
module.exports = {
  build: {
    babel: {
      plugins: ['transform-vue-jsx']
    }
  }
}
```

To learn more about the babel option, take a look at the [build config documentation](/api/configuration-build).

You can now use JSX in your `render` method of your components:

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

You can learn more how to use it in the [JSX section](https://vuejs.org/v2/guide/render-function.html#JSX) of the Vue.js documentation.
