---
title: JSX
description: How to use JSX with Nuxt.js?
---

# How to use JSX? (En)

<p style="width: 294px;position: fixed; top : 64px; right: 4px;" class="Alert Alert--orange"><strong>⚠Cette page est actuellement en cours de traduction française. Vous pouvez repasser plus tard ou <a href="https://github.com/vuejs-fr/nuxt" target="_blank">participer à la traduction</a> de celle-ci dès maintenant !</strong></p><p>Nuxt.js use the official [babel-preset-vue-app](https://github.com/vuejs/babel-preset-vue-app) for babel default configuration, so you can use JSX in your components.</p>

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

<p class="Alert Alert--info">Aliasing `createElement` to `h` is a common convention you’ll see in the Vue ecosystem but is actually optional for JSX since it [automatically injects](https://github.com/vuejs/babel-plugin-transform-vue-jsx#h-auto-injection) `const h = this.$createElement` in any method and getter (not functions or arrow functions) declared in ES2015 syntax that has JSX so you can drop the (h) parameter</p>

You can learn more how to use it in the [JSX section](https://vuejs.org/v2/guide/render-function.html#JSX) of the Vue.js documentation.
