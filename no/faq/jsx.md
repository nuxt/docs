---
title: JSX
description: How to use JSX with Nuxt.js?
---

# How to use JSX?

Nuxt.js uses the official [babel-preset-vue-app](https://github.com/vuejs/babel-preset-vue-app) for babel default configuration, so you can use JSX in your components.

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

<p class="Alert Alert--info">Aliasing `createElement` to `h` is a common convention you’ll see in the Vue ecosystem but is actually optional for JSX since it [automatically injects](https://github.com/vuejs/babel-plugin-transform-vue-jsx#h-auto-injection) `const h = this.$createElement` in any method and getter (not functions or arrow functions) declared in ES2015 syntax that has JSX so you can drop the (h) parameter.</p>

You can learn more how to use it in the [JSX section](https://vuejs.org/v2/guide/render-function.html#JSX) of the Vue.js documentation.
