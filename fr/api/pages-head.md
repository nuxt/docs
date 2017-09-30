---
title: "API: The head Method"
description: Nuxt.js uses vue-meta to update the `headers` and `html attributes` of your application.
---

# The head Method (En)

> Nuxt.js uses [vue-meta](https://github.com/declandewet/vue-meta) to update the `headers` and `html attributes` of your application.

- **Type:** `Object` or `Function`

<p style="width: 294px;position: fixed; top : 64px; right: 4px;" class="Alert Alert--orange"><strong>⚠Cette page est actuellement en cours de traduction française. Vous pouvez repasser plus tard ou <a href="https://github.com/vuejs-fr/nuxt" target="_blank">participer à la traduction</a> de celle-ci dès maintenant !</strong></p><p>Use the `head` method to set the HTML Head tags for the current page.</p>

Your component data are available with `this` in the `head` method, you can use set custom meta tags with the page data.

```html
<template>
  <h1>{{ title }}</h1>
</template>

<script>
export default {
  data () {
    return {
      title: 'Hello World!'
    }
  },
  head () {
    return {
      title: this.title,
      meta: [
        { hid: 'description', name: 'description', content: 'My custom description' }
      ]
    }
  }
}
</script>
```

<p class="Alert">To avoid any duplication when used in child component, please give a unique identifier with the `hid` key, please [read more about it](https://github.com/declandewet/vue-meta#lists-of-tags).</p>
