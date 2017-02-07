---
title: JSX
description: How to use JSX with Nuxt.js?
---

# How to use JSX?

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
