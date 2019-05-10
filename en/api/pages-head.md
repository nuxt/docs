---
title: "API: The head Method"
description: Nuxt.js uses vue-meta to update the headers and HTML attributes of your application.
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
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        { hid: 'description', name: 'description', content: 'My custom description' }
      ]
    }
  }
}
</script>
```

<div class="Alert Alert--teal">

<b>Info:</b> To avoid duplicated meta tags when used in child component, set up an unique identifier with the `hid` key for your meta elements ([read more](https://vue-meta.nuxtjs.org/api/#tagidkeyname)).

</div>
