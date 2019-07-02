---
title: "API: The head Method"
description: Nuxt.js uses vue-meta to update the `headers` and `html attributes` of your application.
---

# The head Method

> Nuxt.js uses [vue-meta](https://github.com/nuxt/vue-meta) to update the `headers` and `html attributes` of your application.

- **Type:** `Object` or `Function`

Use the `head` method to set the HTML Head tags for the current page.

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

<div class="Alert">

To avoid any duplication when used in child component, please give a unique identifier with the `hid` key, please [read more about it](https://vue-meta.nuxtjs.org/api/#tagidkeyname).

</div>
