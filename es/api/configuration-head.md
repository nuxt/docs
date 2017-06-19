---
title: "API: The head Property"
description: Nuxt.js let you define all default meta for your application inside nuxt.config.js.
---

# The head Property

> Nuxt.js let you define all default meta for your application inside `nuxt.config.js`, use the same `head` property:

- Type: `Object`

```js
module.exports = {
  head: {
    titleTemplate: '%s - Nuxt.js',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Meta description' }
    ]
  }
}
```

To know the list of options you can give to `head`, take a look at [vue-meta documentation](https://github.com/declandewet/vue-meta#recognized-metainfo-properties).

<p class="Alert Alert--teal"><b>INFO:</b> You can also use `head` in the page components and access to the component data through `this`, see [component head property](/api/pages-head).</p>
