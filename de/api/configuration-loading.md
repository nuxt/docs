---
title: "API: The loading Property"
description: Nuxt.js uses its own component to show a progress bar between the routes. You can customize it, disable it or create your own component.
---

# The loading Property

- Type: `Boolean` or `Object` or `String`

> Nuxt.js uses its own component to show a progress bar between the routes. You can customize it, disable it or create your own component.

In your component you can use `this.$nuxt.$loading.start()` to start the loading bar and `this.$nuxt.$loading.finish()` to finish it.

```javascript
export default {
  mounted () {
    this.$nextTick(() => {
      this.$nuxt.$loading.start()

      setTimeout(() => this.$nuxt.$loading.finish(), 500)
    })
  }
 }
```

> If you want to start it in the `mounted` method, make sure to use ` this.$nextTick`, because $loading may not be available immediately. 

## Disable the Progress Bar

- Type: `Boolean`

If you don't want to display the progress bar between the routes, simply add `loading: false` in your `nuxt.config.js` file:

```js
module.exports = {
  loading: false
}
```

## Customize the Progress Bar

- Type: `Object`

List of properties to customize the progress bar.

| Key | Type | Default | Description |
|-----|------|---------|-------------|
| `color` | String | `'black'` | CSS color of the progress bar |
| `failedColor` | String | `'red'` | CSS color of the progress bar when an error appended while rendering the route (if `data` or `fetch` sent back an error for example). |
| `height` | String | `'2px'` | Height of the progress bar (used in the `style` property of the progress bar) |
| `duration` | Number | `5000` | In ms, the maximum duration of the progress bar, Nuxt.js assumes that the route will be rendered before 5 seconds. |
| `rtl` | Boolean | `false` | Set the direction of the progress bar from right to left. |

For a blue progress bar with 5px of height, we update the `nuxt.config.js` to the following:

```js
module.exports = {
  loading: {
    color: 'blue',
    height: '5px'
  }
}
```

## Use a Custom Loading Component

- Type: `String`

You can create your own component that Nuxt.js will call instead of its default component. To do so, you need to give a path to your component in the `loading` option. Then, your component will be called directly by Nuxt.js.

**Your component has to expose some of these methods:**

| Method | Required | Description |
|--------|----------|-------------|
| `start()` | Required | Called when a route changes, this is here where you display your component. |
| `finish()` | Required | Called when a route is loaded (and data fetched), this is here where you hide your component. |
| `fail()` | *Optional* | Called when a route couldn't be loaded (failed to fetch data for example). |
| `increase(num)` | *Optional* | Called during loading the route component, `num` is an Integer < 100. |

We can create our custom component in `components/loading.vue`:
```html
<template lang="html">
  <div class="loading-page" v-if="loading">
    <p>Loading...</p>
  </div>
</template>

<script>
export default {
  data: () => ({
    loading: false
  }),
  methods: {
    start () {
      this.loading = true
    },
    finish () {
      this.loading = false
    }
  }
}
</script>

<style scoped>
.loading-page {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.8);
  text-align: center;
  padding-top: 200px;
  font-size: 30px;
  font-family: sans-serif;
}
</style>
```

Then, we update our `nuxt.config.js` to tell Nuxt.js to use our component:

```js
module.exports = {
  loading: '~/components/loading.vue'
}
```
