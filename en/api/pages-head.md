---
title: "API: The head Method"
description: Nuxt.js uses vue-meta to update the `headers` and `html attributes` of your application.
---

# The head Method

> Nuxt.js uses [vue-meta](https://github.com/declandewet/vue-meta) to update the `headers` and `html attributes` of your application.

Use the `head` method to set the HTML Head tags for the current page.

Your component data are available with `this` in the `head` method, you can use it to display different headers.

```js
export default {
  head () {
    return {
      title: 'My custom title',
      meta: [
        { hid: 'description', name: 'description', content: 'My custom description' }
      ]
    }
  }
}
```

<p class="Alert">To avoid any duplication when used in child component, please give a unique identifier with the `hid` key, please [read more about it](https://github.com/declandewet/vue-meta#lists-of-tags).</p>
